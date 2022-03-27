import { Link } from 'react-router-dom'
import styles from '../css/card.module.css'

function Card({img, name, score, typeDiet, id}){

  let diets;
  if( typeDiet.length && typeDiet[0].name) diets = typeDiet.map( diet => diet.name); 
  else diets = typeDiet;

  
  return (
    <Link to={`/recipes/${id}`}  className = {styles.container}>
      <img className={styles.img} src={img} alt="Imagen Receta" />
      <h2 className={styles.title}>{name}</h2>
      <h2 className={styles.score}>Score: {score} 🌟</h2>
      <p className={styles.text} >Tipo de Dieta: {diets.length > 0 ? diets.join(', ') : diets}</p>
  
    </Link>
  )
} 


export default Card