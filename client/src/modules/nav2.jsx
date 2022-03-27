import { Link } from 'react-router-dom';
import chef from '../assets/img/chef.png'
import style from '../css/nav.module.css'

export default function Nav2(){
  return (
    <nav className={style.nav}>
      <Link to='/recipes'><img src={chef} alt="logo"/></Link>
    </nav>
  )
} 