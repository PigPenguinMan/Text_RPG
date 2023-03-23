import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Main from './component/main';
import { DataProvider } from './data/context';

function App() {
  const [name,setName] =useState(null);

  // useEffect(()=>{
  //   fetch('http://localhost:8002/api')
  //   .then(res=>res.json())
  //   .then(data=>console.log(data))
    // .then(data=>setName({name:data.name}))
  // },[])
  return (
    <div className="App">
      <DataProvider>

      <Main></Main>
      </DataProvider>
    </div>
  );
}

export default App;
