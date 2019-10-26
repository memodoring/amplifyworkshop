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

