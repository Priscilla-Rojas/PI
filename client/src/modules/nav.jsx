import { Link } from 'react-router-dom';
import chef from '../assets/img/chef.png'
import filter from '../assets/img/filtrar.png'
import Search from './search'
import style from '../css/nav.module.css'
import FilterBy from './filterBy';
import OrderABC from './orderABC';
import OrderScore from './orderScore.jsx'

export default function Nav(){
  return (
    <nav className={style.nav}>
      <img src={chef} alt="logo"/>
      <Link className={style.create} to='/recipes/create-recipe'>Create Receta</Link>
      <Search className={style.search}/>
      <div className={style.containerFilters}>
        <Link to='#' className={style.iconFilter}>
        <img  src={filter} alt="" />
        </Link>
        <section className={style.filters}>
          <FilterBy/>
          <OrderABC/>
          <OrderScore/>
        </section>
      </div>
    </nav>
  )
} 