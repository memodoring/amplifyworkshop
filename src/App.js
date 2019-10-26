import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react';
import config from './aws-exports';
Amplify.configure(config);

function TranslateTextComponent(){
  return(<div>
    <input></input>
    <button>Translate</button>
    <h3>Hello World</h3>
  </div>)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TranslateTextComponent></TranslateTextComponent>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
