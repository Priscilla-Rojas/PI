import { Routes, Route } from 'react-router-dom';
import Home from './modules/Home';
import Inicial from './modules/Inicial';
import CreateRecipe from './modules/createRecipe';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Inicial/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/create-recipe' element={<CreateRecipe/>}/>

      </Routes>
    </div>
  );
}

export default App;
