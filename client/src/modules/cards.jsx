// import { connect } from 'react-redux'
import Card from './card';
import styles from '../css/cards.module.css'

export default function Cards({ recipes }){
  return (
    <div className= {styles.container}>
      {  recipes.map( recipe => {
        console.log(recipe)
          return <Card
          key={recipe.id}
          id={recipe.id}
          img = {recipe.image}
          name = {recipe.title}
          typeDiet = {recipe.TypeDiets ? recipe.TypeDiets : recipe.diets}
          score = {recipe.spoonacularScore}
          />
        })
      }  
    </div>
  )
}