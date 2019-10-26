import React, {useState} from 'react';
import './App.css';
import Amplify, {Predictions} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react';
import {AmazonAIPredictionsProvider} from '@aws-amplify/predictions';
import config from './aws-exports';
Amplify.configure(config);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function TranslateTextComponent(){
  const [originalText, setOriginalText] = useState('Escriba aqui para traducir');
  const [translation, setTranslation] = useState(`La traduccion aparecera aqui`);
  
  function setChar(event){
    setOriginalText(event.target.value);
  };
  
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
  };;

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

  return(<div>
    <input value={originalText} onChange={setChar}></input>
    <button onClick={generateTranslation}>Traducir</button>
    <h3>{translation}</h3>
    <button onClick={generateSpeech}>Escuchar Traduccion</button>
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
