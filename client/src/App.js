import { Routes, Route} from 'react-router-dom';
import Home from './modules/Home';
import Inicial from './modules/landingPage';
import CreateRecipe from './modules/createRecipe';
import DetailRecipe from './modules/DetailRecipe';
import Nav2 from './modules/nav2';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Inicial/>}/>
        <Route path='/recipes' element={<Home/>}/>
        <Route path='/recipes/create-recipe' element={ <CreateRecipe/> }/>
        
        <Route path='/recipes/:idRecipe' element={<DetailRecipe/>}/>
        {/* <Route path='*' element={}/> */}
      </Routes>
    </div>
  );
}

export default App;
