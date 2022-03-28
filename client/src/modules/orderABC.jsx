import { useState, useEffect } from "react";
import { connect } from "react-redux"
import { orderABC } from "../redux/actions/action"
import style from "../css/filters.module.css"

function OrderABC({ orderABC, recipes, recipesByName, recipesFilter }){

  const [state, setState] = useState('');

  const handleSelect = (e) => {
    setState( e.target.value)
  }

  function Order(recipes, typeOrder){
    let order = typeOrder === 'ascendente' ? recipes.sort( (a, b) => {
      if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
      if(b.title.toLowerCase() > a.title.toLowerCase()) return -1
      return 0
    }) : typeOrder === 'descendente' ? recipes.sort( (a, b) => {
      if(a.title.toLowerCase() > b.title.toLowerCase()) return -1
      if(b.title.toLowerCase() > a.title.toLowerCase()) return 1
      return 0
    }) : [];
    return order;
  }
  let recipesOrder;


  if(recipesFilter.length > 0) recipesOrder = Order(recipesFilter, state) 
  else if(recipesByName.length) recipesOrder = Order(recipesByName, state) 
  else recipesOrder = Order(recipes, state) 
      
  useEffect( ()=> {

    return () =>{
      orderABC(recipesOrder)
      setState('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state])

  return (
    <form className={style.filter} >
      <label>Sort</label>
      <div>
        <select defaultValue="" onChange={handleSelect}>
          <option value="" > Alphabetically </option>
          <option value="ascendente" > A - Z </option>
          <option value="descendente" > Z - A </option>
        </select>
      </div>
  </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    orderABC: (name) => dispatch(orderABC(name))
  }
}
const mapStateToProps = (state)=>{
  return {
    recipes: state.recipes,
    recipesByName: state.recipesByName,
    recipesFilter: state.recipesFilter,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderABC)