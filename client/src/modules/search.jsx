import { useState } from "react"
import { connect } from "react-redux";
import { getRecipesByName } from "../redux/actions/action";
import style from "../css/search.module.css"

function Search({get_recipes, getRecipesByName}){

  const [state, setState] = useState('');

  const handleState = (e)=>{
    setState(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipesByName(state.trim());
    setState('')
  }

  return (
    <form onSubmit={handleSubmit} className={style.search}>
      <input type="text" onChange={handleState} value= {state} placeholder="Buscar Receta ..."/>
      <input type="submit" value='Buscar'/>
    </form>
  )
} 
const mapStateToProps = (state)=>{
  return {
    recipesByName: state.recipesByName,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRecipesByName: (name) => dispatch(getRecipesByName(name))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)