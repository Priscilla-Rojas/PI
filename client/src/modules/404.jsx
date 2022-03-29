import { Link } from 'react-router-dom'
import Nav2 from './nav2'
import styles from '../css/eror.module.css'

function Error(){
  
  return (
    <div className={styles.containerError}>
      <Nav2/>
      <article className = {styles.containerInfo}>
        <p className={styles.text} >Recipe not found.</p>
        <h2>404</h2>
        <p>Don't worry, you can return to the main page by clicking on the following button</p>
        <Link to='/recipes'>
          Back to home
        </Link>
      </article>
    </div>
  )
} 


export default Error