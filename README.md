# Amplify Workshop

## Descripción

Workshop para crear un cliente de traducción y habla con AWS Amplify.

## Pre-Requisitos
* [CLoud 9](https://github.com/aurbac/nodejs-back-and-angular-front/blob/master/docs/v3-preparing-your-development-environment.md)
* [Cuenta de AWS](https://console.aws.amazon.com)\
* [Amplify CLI](https://aws-amplify.github.io/docs/cli-toolchain/quickstart)
* [Reactjs](https://reactjs.org/docs/create-a-new-react-app.html)

## Primer Paso

Crear un nuevo proyecto usando create-react-app

```
$ npx create-react-app amplify-app
$ cd amplify-app
```

## Segundo Paso

Inicializar projecto con Amplify CLI 

```
$ amplify init
```

Seleccionar los siguientes valores:

   ? Enter a name for the project **amplify-app**
   ? Enter a name for the environment **dev**
   ? Choose your default editor: **Sublime Text**
   ? Choose the type of app that you're building **javascript**
   Please tell us about your project
   ? What javascript framework are you using **react**
   ? Source Directory Path:  **src**
   ? Distribution Directory Path: **build**
   ? Build Command:  **npm run-script build**
   ? Start Command: **npm run-script start**
   Using default provider  awscloudformation

   For more information on AWS Profiles, see:
   https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

   ? Do you want to use an AWS profile? **Yes**
   ? Please choose the profile you want to use **default**

Agregar Autenticacion 

```
$ amplify add auth
```

Seleccionar los siguientes valores:

   Do you want to use the default authentication and security configuration? **Default configuration**
   Warning: you will not be able to edit these selections. 
   How do you want users to be able to sign in? **Username**
   Do you want to configure advanced settings? **No, I am done.**

⌛️

```
$ amplify push
```

   ? Are you sure you want to continue? **Yes**

## Tercer Paso

Instalar cliente de Amplify usando NPM

```
$ npm i --save aws-amplify 
```

Instalar componentes graficos para React de Amplify

```
$ npm i --save aws-amplify-react
``` 

## Cuarto Paso

Abrir el archivo *App.js* 

Importar Paquete de Amplify y configurar usando *aws-exports.js*, archivo con referencias a infraestructura en la nube

```javascript
import Amplify from 'aws-amplify';

import config from './aws-exports'
Amplify.configure(config);
```

## Quinto Paso
Importar elemento grafico de autenticacion de AWS Amplify para React
```javascript
import { withAuthenticator} from 'aws-amplify-react';
```
Decorar componente *App* usando el elemento que importamos
```javascript
export default withAuthenticator(App);
```

## Sexto Paso
Crear nuevo componente usando JSX
```javascript
function TranslateTextComponent(){
  return(<div>
    <input></input>
    <button>Translate</button>
    <h3>Hello World</h3>
  </div>)
}
```
Reemplazar Hello World con el nuevo component dentro de componente *App*
```javascript
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TranslateTextComponent></TranslateTextComponent>
      </header>
    </div>
  );
}
```
Eliminar referencias a archivos no usados (logo)

## Septimo Paso
Agregar el [hook](https://reactjs.org/docs/hooks-intro.html) useState de React
```javascript
import React, {useState} from 'react';
```
Agregar hook al componente *TranslateTextComponent* para vincular texto capturado a la variable *originalText*
```javascript
    const [originalText, setOriginalText] = useState('Escriba aqui para traducir');
  };
```
Crear funcion en el componente *TranslateTextComponent* para llamar a *setOriginalText* (funcion que modifica la variable originalText) con el valor de la tecla presionada
```javascript
function setChar(event){
    setOriginalText(event.target.value);
  };
```
Vincular funcion y variables al input del componente
```javascript
return(<div>
    <input value={originalText} onChange={setChar}></input>
    <button>Translate</button>
    <h3>Traduccion aparecera aqui</h3>
  </div>)
```

## Octavo Paso

Agregar servicio de traduccion a nuestro proyecto de *desde la terminal*, usando Amplify CLI 

```
amplify add predictions
```

Aparecera un wizard. Selecciona las siguientes opciones con el teclado.

   ? Please select from one of the categories below **Convert**
   ? What would you like to convert? **Translate text into a different language**
   ? Provide a friendly name for your resource **translateText0adafb23**
   ? What is the source language? **Spanish**
   ? What is the target language? **Portuguese**
   ? Who should have access? **Auth users only**

Agregar generacion de habla con Amplify CLI, *desde la terminal*
```
amplify add predictions
```
Con las siguientes opciones 

   ? Please select from one of the categories below **Convert**
   ? What would you like to convert? **Generate speech audio from text**
   ? Provide a friendly name for your resource **speechGenerator8c703772**
   ? What is the source language? **Portuguese**
   ? Select a speaker **Inês - Female**
   ? Who should have access? **Auth users only**

Provisionar servicios en la nube

```
$ amplify push
```

   ? Are you sure you want to continue? **Yes**

## Noveno Paso

Importar el cliente & plug-in de Amplify 

```javascript
import Amplify, {Predictions} from 'aws-amplify';
import {AmazonAIPredictionsProvider} from '@aws-amplify/predictions'
```
Usar plugin para configurar el cliente
```javascript
Amplify.addPluggable(new AmazonAIPredictionsProvider());
```

## Decimo Paso

Crear otro hook para manejar el estado del valor de la traduccion

```javascript
    const [translation, setTranslation] = useState(`La traduccion aparecera aqui`);
```

Crear funcion para llamar al cliente de predicciones de [manera asyncrona](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) con el valor capturado por el usuario como parametro.

```javascript
  function generateTranslation(){
    Predictions.convert({
      translateText:{
        source:{
          text:originalText
        }
      }
    })
    .then(data=>setTranslation(JSON.stringify(data)))
    .catch(error=>setTranslation(JSON.stringify(error)));
  };
```

Vincular funcion y variable al componente *TranslateTextComponent*

```javascript
  <div>
    <input value={originalText} onChange={setChar}></input>
    <button onClick={generateTranslation}>Traducir</button>
    <h3>{translation}</h3>
  </div>
```

## Onceavo Paso

Agregar funcion para llamar al servicio de generacion de habla con la traduccion como parametro

```javascript
  function generateSpeech(){
    Predictions.convert({
      textToSpeech:{
        source:{
          text:translation
        }
      }
    })
    .then(result => {
      let AudioContext = window.AudioContext || window.webkitAudioContext;
      console.log({ AudioContext });
      const audioCtx = new AudioContext(); 
      const source = audioCtx.createBufferSource();
      audioCtx.decodeAudioData(result.audioStream, (buffer) => {

        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
      }, (err) => console.log({err}));
    })
    .catch(err => setTranslation(err));
  };
```

Crear nuevo botton en componente *TranslateTextComponent* y vincular nueva funcion al boton 

```javascript
    <div>
    <input value={originalText} onChange={setChar}></input>
    <button onClick={generateTranslation}>Traducir</button>
    <h3>{translation}</h3>
    <button onClick={generateSpeech}>Escuchar Traduccion</button>
  </div>
```

Tu archivo final debe quedar como el siguiente [src/App.js](src/App.js).

# Doceavo Paso

Hospedar la aplicación Web usando Amazon S3.

```
$ amplify add hosting
```

Seleccionar los siguientes valores:

   ? Select the environment setup: **DEV (S3 only with HTTP)**
   ? hosting bucket name **loft-app-20191031053228-hostingbucket (Usar el nombre de bucket asignado)**
   ? index doc for the website **index.html**
   ? error doc for the website **index.html**

Recibiras una URL en la que fue publicada tu aplicación, **al acceder sigue el proceso de registro e inicia sesión.**

Para subir nuevos cambios de la aplicación React al hospedaje en Amazon S3 usa el comando para publicar.

```
$ amplify publish
```

**¡Felicidades, has creado tu primer aplicación usando AWS Amplify!**