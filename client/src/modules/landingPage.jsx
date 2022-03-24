import img from '../assets/img/buscadorRecetas.jpg'
import { Link } from 'react-router-dom'
import style from '../css/landingPage.module.css'

export default function Inicial(){
  return (
    <div className={style.container}>
      <figure>
        <img src={img} alt="Estas en la vista inicial" />
      </figure>
      <div>
        <p>Welcome to</p>
        <p>My Recipes Project App !</p> 
        <Link to='/recipes' className={style.button}>
          Iniciar
        </Link>
      </div>
      
    </div>
  )
} 