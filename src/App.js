import logo from './logo.svg';

import { useEffect, useState } from 'react';

import { DataConsumer, DataProvider } from './data/context';
import Main from './page/main';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import Character from './page/character';
import Gear from './page/gear';
import Inventory from './page/inventory';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='/' element={<Main />}/>
            <Route path='/character' element={<Character/>}/>
            <Route path='/gear' element={<Gear/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
          </Route>
        </Routes>

      </DataProvider>
    </div>
  );
}

export default App;
