import { Link } from 'react-router-dom';
import chef from '../assets/img/chef.png'
import Search from './search'
import style from '../css/nav.module.css'

export default function Nav(){
  return (
    <nav className={style.nav}>
      <img src={chef} alt="logo"/>
      <Link className={style.create} to='/recipes/create-recipe'>Crear Receta</Link>
      <Search/>
    </nav>
  )
} 