import React, {useState} from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react';
import config from './aws-exports';
Amplify.configure(config);

function TranslateTextComponent(){
  const [originalText, setOriginalText] = useState('Escriba aqui para traducir');
  function setChar(event){
    setOriginalText(event.target.value);
  };
  return(<div>
    <input value={originalText} onChange={setChar}></input>
    <button>Translate</button>
    <h3>Traduccion aparecera aqui</h3>
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
