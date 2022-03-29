import { useState, useEffect } from "react"
import { addRecipe, getDiets } from "../redux/actions/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import chef from '../assets/img/chef.png'
// import Nav2 from "./nav2";

import style from '../css/createRecipe.module.css'

function CreateRecipe({addRecipe, getDiets, typesDiets}){
  const [newRecipe, setNewRecipe] = useState({
    title: '', 
    spoonacularScore: false, 
    healthScore: false, 
    summary: '',
    image:'', 
    diets: [], 
    steps:''
  })
  const [diets, setDiets] = useState('')
  const [danger, setDanger] = useState({
    title: undefined, 
    spoonacularScore: false, 
    healthScore: undefined, 
    summary: undefined,
    image:false, 
    diets: undefined, 
    steps: undefined
  })


  const validateAddInfo = (key , value)=>{
    if (key === 'title' && value.trim().length < 3) return setDanger({...danger, [key]: true});
    if ((key === 'spoonacularScore' || key === 'healthScore')&& (value > 100 || value < 0)) return setDanger({...danger, [key]: true})
    if ( key === 'summary' && value.trim().length < 20) return setDanger({...danger, [key]: true})
    if ( key === 'steps' && value.trim().length < 30) return setDanger({...danger, [key]: true})
    if ( key === 'diets' && value.length < 1) return setDanger({...danger, [key]: true})
    // if ( key === 'image' && value === (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)?(jpg|jpeg|png)/)) return setDanger({...danger, [key]: true})
    return setDanger({...danger, [key]: false})
  }

  const handleNewRecipe = async (e)=> {
    let name = e.target.name;
    let value = e.target.value;
    validateAddInfo(name, value);
    // if(!validate) {
      setNewRecipe({
        ...newRecipe,
        [name]: value,
      })
  }
  const handleDiets = (e)=>{
    if (e.target.value !== " "){
      if(!newRecipe.diets.includes(e.target.value)){
        setNewRecipe({
          ...newRecipe,
          diets: [...newRecipe.diets, e.target.value]
        })
        let dietsVerif = [...newRecipe.diets, e.target.value];
        validateAddInfo('diets', dietsVerif)
      }
      setDiets('');
    }
  }

  function close(e){
    const deletedDiet = newRecipe.diets.filter( diet => diet !== e.target.title);
    
    validateAddInfo('diets', deletedDiet);
    setNewRecipe({
      ...newRecipe,
      diets: [...deletedDiet]
    })
  }
  useEffect( ()=>{
    getDiets()
  }, [getDiets])

  return (
    <main className={style.main}>
      {/* <Nav2/> */}
      <form className={style.form} onSubmit={(e)=>{
        e.preventDefault()
        addRecipe(newRecipe)
        alert('receta creada correctamente: ', newRecipe)
        console.log(newRecipe)
        setNewRecipe({
          ...newRecipe,
          title: '',
          spoonacularScore: 0 ,
          healthScore: 0,
          summary: '',
          image:'' ,
          diets: [] ,
          steps:'',
        }) 
      }}>
        <div className={style.header}>
          <h2>Create Recipe<p>Items marked with * are required</p></h2>
          <Link to='/recipes'><img src={chef} alt="logo"/></Link>
        </div>
        
        <div>
          <label name='title' aria-required>Name *</label>
          <input className={danger.title && style.error} value={newRecipe.title} type="text" name="title" placeholder="Name your recipe" onChange={handleNewRecipe} />
          {danger.title ? <span className={style.dangerActive}>* The title is required</span>: false} 
        </div>
        <div>
          <label name='puntuacion'>Score</label>
          <input placeholder="0"  className={danger.spoonacularScore && style.error} value={newRecipe.spoonacularScore} type="number" name="spoonacularScore" title="spoonacularScore" min="0" max="100" onChange={handleNewRecipe} />
          {danger.spoonacularScore ? <span className={style.dangerActive}>* Score must be greater than 0 and less than 100</span>: false} 
        </div>
        <div>
          <label name='saludable'>Healthy food score *</label>
          <input placeholder="0" className={danger.healthScore && style.error} value={newRecipe.healthScore} type="number" name="healthScore" title="healthScore" min="0" max="100" onChange={handleNewRecipe}/>
          {danger.healthScore ? <span className={style.dangerActive}>* Score must be greater than 0 and less than 100</span>: false}
        </div>
          {danger.diets ? <span className={style.dangerActive}>* The recipe must contain at least one type of diet</span>: false}
        <div>
          <label name='diets'>Add Diets *</label>
          <select className={danger.diets && style.error} name="diets" value={diets} id="diets" onChange={handleDiets}>
          <option value="" >Types of diets</option>
          {
            typesDiets.map( (diet, index)=> {
              return (
                <option key={index} value={diet.name}>{diet.name}</option>
                )
              })
            }
          </select>
          <div className={style.containerdiets}>
          {
            newRecipe.diets.map( (diet, index) => (
              <article key={index} > 
                <span>{diet}</span>
                <span className={style.close} title= {diet} onClick={close}>x</span>
              </article>
            ))
          }
          </div>
        </div>
        <div>
          <label name='image'>Image</label>
          <input value={newRecipe.image} type="text" name="image" title="image" onChange={handleNewRecipe}/>
        </div>
        {danger.image ? <span className={style.dangerActive}>Image must be a url of an image</span>: false}
        <div>
          <label  name='summary' >Sumary *</label>
          {danger.summary ? <span className={style.dangerActive}>The recipe summary must contain at least 20 characters</span>: false}
          <textarea value={newRecipe.summary} className={danger.summary && style.error}  name="summary" title="summary" cols="30" rows="5" onChange={handleNewRecipe}></textarea>
        </div>
        
        
        <div>
        <label name='steps'>Steps *</label>
        {danger.steps ? <span className={style.dangerActive}>The recipe steps must contain at least 30 characters</span>: false}
        <textarea className={danger.steps && style.error} value={newRecipe.steps} name="steps" cols="60" rows="10" title="steps" onChange={handleNewRecipe}></textarea>
        </div>
        <input disabled={( (danger.title || danger.healthScore || danger.summary || danger.diets || danger.steps) ||(danger.title === undefined || danger.healthScore === undefined || danger.summary === undefined || danger.diets === undefined || danger.steps === undefined )) ? true : false} type="submit" value='Create Recipe' />
    </form>
    </main>
  )
} 
const mapStateToProps = (state)=>{
  return {
    typesDiets: state.typesDiets,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addRecipe: (name) => dispatch(addRecipe(name)),
    getDiets: () => dispatch(getDiets()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe)

// (ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)?(jpg|jpeg|png)

