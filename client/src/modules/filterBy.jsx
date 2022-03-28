import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { filterByDiet } from "../redux/actions/action";
import style from "../css/filters.module.css"

function FilterBy({filterByDiet, typesDiets, recipesFilter, filters}){

  const [state, setState] = useState('');

  const handleSelect = (e) => {
      setState( e.target.value)
  }
  useEffect( ()=> {
      filterByDiet(state.toLowerCase())
  },[filterByDiet, state])

  return (
    <section>
      <form className={style.filter}>
        <label>Filter by </label>
          <select value={ state} onChange={handleSelect}>
          <option value="">All diets</option>
            {
              typesDiets.map( (diet, index)=> {
                return (
                  <option key={index} value={diet.name}>{diet.name}</option>
                )
              })
            }
          </select>
      </form>
    </section>
  )
} 


const mapStateToProps = (state)=>{
  return {
    typesDiets: state.typesDiets,
    recipesFilter: state.recipesFilter,
    filters: state.filters,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    filterByDiet: (name) => dispatch(filterByDiet(name)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterBy)