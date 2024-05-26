import './App.css';
import { Quib, Transcriber, useVad } from "@fadedrifleman/web-sdk";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef } from 'react';
import { useQueue } from "@uidotdev/usehooks";

function App() {
  const transcriberRef = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const { add, remove, first, size, queue, clear } = useQueue([]);
  const [uMedia, setUMedia] = useState(null);

  useEffect(() => {
    const transcriber = new Transcriber({ apiKey: '' });
    transcriber.on('transcription', (text) => {
      console.log(text);
    });
    transcriberRef.current = transcriber;
  }, []);

  const { start, pause } = useVad({
    userMedia: uMedia,
    onSpeechStart: () => {
      console.log('Speech started');
    },
    onSpeechEnd: () => {
      console.log('Speech ended');
    },
  });

  useEffect(() => {
    if (buttonClicked) {
      const quib = new Quib({ host: 'quibbleai.io:8888', uid: uuidv4() });

      quib.on('connected', () => {
        console.log('Connected to Quib');
        quib.start();
        quib.send('hello');
      });

      quib.on('media', (data) => {
        console.log(data);
      });
    }
  }, [buttonClicked]);

  async function microphone() {
    const userMedia = await navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });

    const microphone = new MediaRecorder(userMedia);
    setUMedia(userMedia);

    microphone.start(500);

    microphone.onstart = () => {
      console.log("Now Call Started.");
      setButtonClicked(true);
    };
    microphone.ondataavailable = (e) => {
      console.log(e.data);
      console.log('dataa');

      transcriberRef.current.send(e.data);
    };
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={microphone}>Start Call</button>
      </header>
    </div>
  );
}

export default App;
