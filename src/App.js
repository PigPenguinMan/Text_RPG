import logo from './logo.svg';

import { useEffect, useState } from 'react';

import { DataConsumer, DataProvider } from './data/context';
import Main from './page/main';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import Character from './page/character';
import Gear from './page/gear';
import Inventory from './page/inventory';
import Splash from './page/splash';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Splash/>}/>
          <Route path='/main' element={<Navbar />}>
            <Route path='/main' element={<Main />}/>
            <Route path='/main/character' element={<Character/>}/>
            <Route path='/main/gear' element={<Gear/>}/>
            <Route path='/main/inventory' element={<Inventory/>}/>
          </Route>
        </Routes>

      </DataProvider>
    </div>
  );
}

export default App;
