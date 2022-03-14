import img from '../assets/img/recetas.jpg'
import { Link } from 'react-router-dom'

export default function Inicial(){
  return (
    <div>
      <img src={img} alt="Estas en la vista inicial" />
      <Link to='/home'>
        <button>Iniciar</button>
      </Link>
    </div>
  )
} 