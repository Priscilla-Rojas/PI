import img from '../assets/img/recetas.jpg'
import Nav from './nav'

export default function Home(){
  return (
    <div>
      {/* <Nav/> */}
      <img src={img} alt="Logo" />
      <div>Listado recetas</div>
    </div>
  )
} 