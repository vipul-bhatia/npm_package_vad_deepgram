import './App.css';
import { Quib, Transcriber, useVad } from "@fadedrifleman/web-sdk"
// import Transcriber from './classes/dgVad';
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from 'react';


function App() {




  // const { add, remove, first, size, queue, clear } = useQueue([]);

  //const quib = new Quib({ host: 'quibbleai.io:8888', uid: uuidv4() });
  //const transcriber = new Transcriber({ apiKey: '656759acdbd9f56cf70b91f71f38cd2eddacf5c4' });
  const [uMedia, setUMedia] = useState(null)




  const { start, pause } = useVad({
    userMedia: uMedia,
    onSpeechStart: () => {
      console.log('Speech started');
    },
    onSpeechEnd: () => {
      console.log('Speech ended');
    },
  });



  // transcriber.on('transcription', (text) => {
  //   console.log(text)
  // })
  // quib.on('connected', () => {
  //   console.log('Connected to Quib')
  //   quib.start()
  //   quib.send('hello')
  // })

  // quib.on('media', (data) => {
  //   console.log(data)
  // })





  async function microphone() {



    const userMedia = await navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });



    const microphone = new MediaRecorder(userMedia);
    setUMedia(userMedia)

    start()




    microphone.start(500);
    microphone.onstart = () => {
      console.log("Now Call Started.");
    };
    microphone.ondataavailable = (e) => {
      // add(e.data);
      console.log(e.data)
      //  transcriber.send(e.data)

      // remove()

    };

  }

  // useEffect(() => {

  // }, [queue])


  return (
    <div className="App">
      <header className="App-header">

        <button onClick={microphone}>Start Call</button>

      </header>
    </div>
  );
}

export default App;
