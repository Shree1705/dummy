import React from 'react';
import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
function App() {

  const [data, setdata] = useState(null)

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/getData`)
      setdata(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>{process.env.REACT_APP_BASE_URL}</h1>
      <h2>{data}</h2>
      </header>
    </div>
  );
}

export default App;
