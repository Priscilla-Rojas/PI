import { useState, useEffect } from "react";
import { connect } from "react-redux"
import { orderScore } from "../redux/actions/action"
import style from "../css/filters.module.css"

function OrderScore({orderScore, recipesFilter, recipes, recipesByName}){

  const [state, setState] = useState('');

  const handleSelect = (e) => {
    setState( e.target.value)
  }

  function Order(recipes, typeOrder){
    let order = typeOrder === 'ascendente' ? recipes.sort( (a, b) => {
      return b.spoonacularScore - a.spoonacularScore;
    }) : typeOrder === 'descendente' ? recipes.sort( (a, b) => {
      return a.spoonacularScore - b.spoonacularScore;
    }) : [];
    return order;
  }
  let recipesOrder;


  if( recipesFilter.length ) recipesOrder = Order(recipesFilter, state) 
  else if(recipesByName.length) recipesOrder = Order(recipesByName, state) 
  else recipesOrder = Order(recipes, state) 

  useEffect( ()=> {
    return ()=>{
      orderScore(recipesOrder)
    }
  },[orderScore, recipesOrder, state])

  return (
    <form className={style.filter} >
      <label>Sort</label>
      <div>
        <select defaultValue={state} onChange={handleSelect}>
          <option value="" > Score </option>
          <option value="descendente" > Lowest score </option>
          <option value="ascendente" > Higthsts score </option>
        </select>
      </div>
  </form>
  )
}
const mapStateToProps = (state)=>{
  return {
    recipes: state.recipes,
    recipesByName: state.recipesByName,
    recipesFilter: state.recipesFilter,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    orderScore: (name) => dispatch(orderScore(name))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderScore)