# AmplifyWorkshop

## Descripción
Workshop para crear un cliente de traducción y habla con AWS Amplify.

## Pre-Requisitos
* [Python](https://www.python.org/)
* [Node.js](https://nodejs.org)
* [Cuenta de AWS](https://console.aws.amazon.com)
* [AWS CLI](https://aws.amazon.com/cli/)
* [Amplify CLI](https://aws-amplify.github.io/docs/cli-toolchain/quickstart)
* [Reactjs](https://reactjs.org/docs/create-a-new-react-app.html)

## Primer Paso
Crear un nuevo proyecto usando create-react-app
```
$ npx create-react-app
```

## Segundo Paso
Inicializar projecto con Amplify CLI 
```
$ amplify init
```
Agregar Autenticacion 
```
$ amplify add Auth
```
⌛️
```
$ amplify push
```

## Tercer Paso
Instalar cliente de Amplify usando NPM
```
$ npm i --save aws-amplify 
```
Instalar componentes graficos para React de Amplify
```
$ npm i --save aws-amplify
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
Aparecera un wizard.
Selecciona las siguientes opciones con el teclado.
* _Convert_
* _Translate text into a different language_
* Escoge un nombre
* _Spanish_
* _Portuguese_
* _Auth users only_

Agregar generacion de habla con Amplify CLI, *desde la terminal*
```
amplify add predictions
```
Con las siguientes opciones 
* _Convert_
* _Generate speech audio from text_
* Escoge un nombre
* _Portuguese_
* _Inês_
* _Auth users only_

Provisionar servicios en la nube
```
amplify push
```

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
Crear funcion para llamar al cliente de predicciones de [manera asyncrona](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) con el valor capturado por el usuario como parametro
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
    <input value={originalText} onChange={setText}></input>
    <button onClick={doTranslate}>Traducir</button>
    <h3>{translation}</h3>
  </div>
```

