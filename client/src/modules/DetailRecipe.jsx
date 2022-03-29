import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { detailRecipe } from "../redux/actions/action"
import gifLibro from '../assets/img/libro.gif';
import Nav2 from "./nav2"
import style from '../css/detailRecipe.module.css'


function DetailRecipe({recipeDetail, detailRecipe}){  

  const { idRecipe } = useParams()

  useEffect( () => {
    detailRecipe(idRecipe)
  },[detailRecipe, idRecipe])

    function createMarkup(text) {
      return {__html: text};
    }
  if(recipeDetail === 'No Found'){
    return (
    <Navigate to='*' replace/>
    )
  }
  return (
    <main className={style.main}>
      <Nav2/>
      {recipeDetail === null ||recipeDetail.id.toString() !== idRecipe.toString() ? <section className={style.containerLoader}>
        <img className={style.img} src={gifLibro} alt="Cargando Receta" />
        <h2>Loading recipes ...</h2>
      </section> :  
      <section className={style.container}>
        <h2>{recipeDetail.title}</h2>
        <figure>
          <img src={recipeDetail.image}alt="Imagen de la receta" /> 
        </figure>
        <section>
          <h3>Type Diet: </h3>
          <p>{recipeDetail.TypeDiets ? recipeDetail.TypeDiets.map( diet => diet.name).join(', ') : recipeDetail.diets.join(', ')}</p>
          <h3>Recipe Score: <span> {recipeDetail.spoonacularScore} 🌟</span></h3>
          <h3>Healthy food score: <span>{recipeDetail.healthScore} ❤️</span></h3>
          <h3>Summary:</h3>
          {
            typeof(!idRecipe.includes('-')) ? <p dangerouslySetInnerHTML={createMarkup(recipeDetail.summary)}></p> :<p>{recipeDetail.summary}</p>
          }          
          { typeof(recipeDetail.steps) === 'string' ? <div><p>Steps</p><p>{recipeDetail.steps}</p> </div>: 
            Array.isArray(recipeDetail.steps) && recipeDetail.steps.length? 
            <div>
              <h3>Steps</h3>
              <ul>{recipeDetail.steps.map((step, index)=>{
                  return <li key={index}>Step {step.number}: {step.step}</li>
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