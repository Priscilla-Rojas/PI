import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { detailRecipe } from "../redux/actions/action"
import gifLibro from '../assets/img/libro.gif'

function DetailRecipe({recipeDetail, detailRecipe}){  

  const { idRecipe } = useParams()

  useEffect( () => {
    console.log('ejecutando use efcet')
      detailRecipe(idRecipe)
  },[detailRecipe, idRecipe])

  function createMarkup(text) {
    return {__html: text};
  }

  return (
    <>
      {recipeDetail === null || recipeDetail.id !== parseInt(idRecipe) ? <div><img src={gifLibro} alt="Cargando Receta" /></div> :  
      <main>
        <h2>{recipeDetail.title}</h2>
        <img src={recipeDetail.image}alt="Imagen de la receta" /> 
        <p>Tipo de plato</p>
        <p>Tipo de dieta: {recipeDetail.diets.join(', ')}</p>
        <p>summary:</p>
        <p dangerouslySetInnerHTML={createMarkup(recipeDetail.summary)}></p>
        <p>Puntuacion del palto: {recipeDetail.spoonacularScore}</p>
        <p>Nivel de comida saludable: {recipeDetail.healthScore}</p>
        <p>Paso a paso 
          <ul>{recipeDetail.steps.map((step)=>{
          return <li>Step {step.number}: {step.step}</li>
          })}
          </ul>
        </p>
      </main>}
    </>
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