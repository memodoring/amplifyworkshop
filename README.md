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


