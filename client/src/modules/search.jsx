import { useState } from "react"
import { connect } from "react-redux";
import { getRecipesByName } from "../redux/actions/action";
import style from "../css/search.module.css"

function Search({getRecipesByName, recipesByName}){

  const [state, setState] = useState('');
  const [name, setName] = useState('');
  

  const handleName =  (e)=>{
    setName('')
    getRecipesByName('');
  }
  const handleState = (e)=>{
    setName(e.target.value)
    setState(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(state.trim().length < 1) return alert('You have not entered any characters.')
    getRecipesByName(state.trim().toLowerCase());
    setState('')
  }
  return (
    <section className={style.container}>
      <form onSubmit={handleSubmit} className={style.search}>
        <input type="text" onChange={handleState} value= {state} placeholder="Buscar Receta ..."/>
        <input type="submit" value='Buscar'/>
      </form>
      {
        name.trim() && recipesByName.length > 0 ? <article className={style.filter}>Recipes name contain: {name} <span className={style.close} onClick={handleName}>x</span></article> : false
      }  
    </section>
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