import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { ShowData } from './components/ShowData';
import Login from './components/Login';
import Signup from './components/Signup';
import View from './components/View';

function App() {
  return (
    <>
    
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/update/:id' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/view/:id' element={<View/>}></Route>
        <Route path='/data/:id' element={<ShowData/>}></Route>

     </Routes>

    </BrowserRouter>


    
    </>
  );
}

export default App;
