import { Routes, Route } from 'react-router-dom';
import Home from './modules/Home';
import Inicial from './modules/Inicial';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Inicial/>}/>
        <Route path='/home' element={<Home/>}/>

      </Routes>
    </div>
  );
}

export default App;
