import './App.css';
import axios from 'axios';
import { DisplayConds } from './DisplayConds';
import { useEffect, useState } from 'react';

function App() {

  const [conds, setConds] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/measurements", {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(res => {
        console.log("RESPONSE");
        console.log(res);
        console.log(res.data);
        setConds(res.data);
        // setAllConds(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },[]);

  console.log(conds);

  return (
    <div className="App">
      <h1> Kunio Hirata </h1>
      <DisplayConds conds={conds}/>
    </div>
  );
}

export default App;


