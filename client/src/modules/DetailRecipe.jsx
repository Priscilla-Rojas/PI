import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { detailRecipe } from "../redux/actions/action"
import gifLibro from '../assets/img/libro.gif';
import style from '../css/detailRecipe.module.css'

function DetailRecipe({recipeDetail, detailRecipe}){  

  const { idRecipe } = useParams()

  console.log(idRecipe)

  
  useEffect( () => {
    console.log('ejecutando use efcet')
    detailRecipe(idRecipe)
  },[detailRecipe, idRecipe])

    function createMarkup(text) {
      return {__html: text};
    }

    

  return (
    <main className={style.main}>
      {recipeDetail === null || typeof(parseInt(recipeDetail.id)) !== typeof(parseInt(idRecipe)) || recipeDetail.id === idRecipe ? <section className={style.container}><img src={gifLibro} alt="Cargando Receta" />{console.log( recipeDetail.id !== idRecipe)}</section> :  
      <section className={style.container}>
        {console.log(recipeDetail)}
        <h2>{recipeDetail.title}</h2>
        <figure>
          <img src={recipeDetail.image}alt="Imagen de la receta" /> 
        </figure>
        <section>
          <p>Type Diet: {recipeDetail.TypeDiets ? recipeDetail.TypeDiets.map( diet => diet.name).join(', ') : recipeDetail.diets.join(', ')}</p>
          <p>Summary:</p>
          {
            typeof(!idRecipe.includes('-')) ? <p dangerouslySetInnerHTML={createMarkup(recipeDetail.summary)}></p> :<p>{recipeDetail.summary}</p>
          }
          
          <p>Recipe Score: {recipeDetail.spoonacularScore} 🌟</p>
          <p>Healthy food score: {recipeDetail.healthScore} ❤️</p>
          
          { typeof(recipeDetail.steps) === 'string' ? <div><p>Steps</p><p>{recipeDetail.steps}</p> </div>: 
            Array.isArray(recipeDetail.steps) ? 
            <div>
              <p>Steps</p>
              <ul>{recipeDetail.steps.map((step)=>{
                  return <li>Step {step.number}: {step.step}</li>
                })}
              </ul> 
            </div>
            : false

            
          }
          
        </section>
      </section>}
    </main>
  )


  
} 
const mapStateToProps = (state)=>{
  return {
    recipeDetail: state.recipeDetail,
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    detailRecipe: (name) => dispatch(detailRecipe(name))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailRecipe)