
import { DataConsumer, DataProvider } from './data/context';
import Main from './page/main';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/navbar';
import Character from './page/character';
import Gear from './page/gear';
import Inventory from './page/inventory';
import Splash from './page/splash';
import SignUp from './page/signUp';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Splash/>}/>
          <Route path='/signup' element={<SignUp/>}/>
         {/* /main/* 는 main을 포함하는 모든 경로에 navbar를 렌더링 */}
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
