import {  useEffect } from 'react';
import { connect } from 'react-redux'
import { getRecipes, getDiets} from '../redux/actions/action';

import Nav from './nav';
// import FilterBy from './filterBy';
// import OrderABC from './orderABC';
// import OrderScore from './orderScore.jsx';
import Pagination from './Pagination.jsx';
import gifLibro from '../assets/img/libro.gif'
import styles from '../css/home.module.css'

export function Home({getRecipes, getDiets, orderAbc, recipes, recipesByName, recipesFilter}){

  useEffect( () => {
    getRecipes();
  },[getRecipes])
  useEffect( () => {
    getDiets();
  },[getDiets, recipes])

  return (
    <div className={styles.contaier}>
      <Nav/>
      {/* <section className={styles.filters}>
        <FilterBy/>
        <OrderABC/>
        <OrderScore/>
      </section> */}
      
      {
        recipes.length ? <Pagination/> : 
        <section className={styles.containerLoader}>
          <img className={styles.img} src={gifLibro} alt="Cargando Receta" />
          <h2>Loading recipes ...</h2>
        </section>
      }
      
    </div>
  )
} 
const mapStateToProps = (state)=>{
  return {
    recipes: state.recipes,
    recipesByName: state.recipesByName,
    recipesFilter: state.recipesFilter,
    orderAbc: state.orderAbc,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRecipes: () => dispatch(getRecipes()),
    getDiets: (name) => dispatch(getDiets(name))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Home)