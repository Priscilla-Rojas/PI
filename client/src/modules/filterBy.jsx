import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { filterByDiet } from "../redux/actions/action";
import style from "../css/filters.module.css"

function FilterBy({filterByDiet, typesDiets, recipesFilter}){

  const [state, setState] = useState('');

  const handleSelect = (e) => {
      setState( e.target.value)
    }
    
  useEffect( ()=> {
      filterByDiet(state)
  },[filterByDiet, state])

  
  return (
    <form className={style.filter}>
      <label>Filter by </label>
      <div>
        <select defaultValue=" " onChange={handleSelect}>
        <option value=" ">Diets</option>
          {
            typesDiets.map( (diet, index)=> {
              return (
                <option key={index} value={diet.name}>{diet.name}</option>
              )
            })
          }
        </select>
      </div>
    </form>
  )
} 


const mapStateToProps = (state)=>{
  return {
    typesDiets: state.typesDiets,
    recipesFilter: state.recipesFilter,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    filterByDiet: (name) => dispatch(filterByDiet(name)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterBy)