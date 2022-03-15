var express = require ('express');
var app = express();
var router = express.Router();
const axios = require('axios');

const { Recipe, Op } = require('../db.js')
const { API_KEY, API_KEY1 } = process.env;

let recipesApi;

// .then
router.get('/', ( req, res, next)=>{
  const { name } = req.query;

  if(name){
    if(recipesApi){
      console.log('estoy buscando en recipes variable y BD')
      let filterApi = recipesApi.filter( r => r.name.includes(name)) 
      let recipesFindBD =  Recipe.findAll({ where: { name: { [Op.substring]: `%${name}%` } } })
      
      // let recipeDB = recipesFindBD.then(response => response);
      // let result = filterApi ? [...recipeDB, ...filterApi] : [...recipeDB]    
      // result.length > 0 ? res.send(result) : res.status(404).send('No encontramos la receta en nuestra base de Datos')

      recipesFindBD.then(response => {
        let recipeDB = (response)
        console.log(' recetas de la base de datos: ', recipeDB)
        let result = filterApi ? [...recipeDB, ...filterApi] : [...recipeDB]    
        result.length > 0 ? res.send(result) : res.status(404).send('No encontramos la receta en nuestra base de Datos')
      })
      
    }
    else{
      console.log('estoy buscando en recipes Api y BD')

      let recipesPromesApi =  axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=1&addRecipeInformation=true&apiKey=${API_KEY}`)
      let recipesFindBD =  Recipe.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } });

      Promise.all([recipesPromesApi, recipesFindBD])
            .then(response => {
              const [recipesApis, recipesFindBD] = response;
              recipesApi = recipesApis.data.results.map( r => {
                return{
                  id: r.id,
                  name: r.title,
                  puntuacion:r.spoonacularScore ,
                  saludable: r.healthScore,
                  resumen: r.summary,
                  // pasos: r.analyzedInstructions[0] ? r.analizedInstructions[0].steps : ''
                }
              })
              let filterApi = recipesApi.filter( r => (r.name).toLowerCase().includes(name.toLowerCase())) 
              let result = filterApi ? [...recipesFindBD, ...filterApi] : [...recipesFindBD]
              result.length > 0 ? res.send(result) : res.status(404).send('No encontramos la receta en nuestra base de Datos');
            })
            .catch( e => next(e))
    }
    
  }
  else{
    res.send('No has ingresado ningun nombre')
  }
  
})

// async
/*app.get('/', async (req, res, next) => {
  const { name } = req.query;

  try {

    let recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=5&addRecipeInformation=true&apiKey=${API_KEY}`)

    let recipesFindBD =  await Recipe.findAll({ where: { name: { [Op.substring]: `%${name}%` } } })

    const recipesApiDetail = recipesApi.data.results.map( r => {
        return{
          id: r.id,
          name: r.title,
          puntuacion:r.spoonacularScore ,
          saludable: r.healthScore,
          pasos: r.summary
        }
      })

    let filterApi = recipesApiDetail.filter( r => r.name.includes(name)) 
    let result = [...recipesFindBD, ...filterApi]
    // console.log(recipesApi.data.results)
            
    result.length > 1 ? res.send(result) : res.status(404).send('No encontramos la receta en nuestra base de Datos');

  } catch (error) {
    next(e)
  }
}) */


router.get('/:idRecetas', async (req, res, next)=>{
  const { idRecetas } = req.params;

  try {
    console.log('hola antes del if')
    // if(idRecetas.length > 8 ){
    if(idRecetas.includes('-')){
      console.log('entre al if')
      const receta = await Recipe.findByPk(idRecetas)
      console.log('receta: ', receta)
      return receta ? res.json(receta) : res.status(404).send('No se encontro ninguna receta con el Id especificado')
      
    }
    else{
      console.log('entre al else')
      let recipe = await axios.get(`https://api.spoonacular.com/recipes/${parseInt(idRecetas)}/information/?apiKey=${API_KEY}`)
      
      let recipeApi = {
        id: recipe.data.id,
        name: recipe.data.title,
        puntuacion:recipe.data.spoonacularScore ,
        saludable: recipe.data.healthScore,
        resumen: recipe.data.summary,
        // pasos: recipe.data.analizedInstructions[0].steps
      }
      console.log('receta encontrada: ',recipeApi)
      recipeApi ? res.send(recipeApi) : res.status(404).send('No se encontro ninguna receta con el Id especificado')
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
  
})


router.post('/', async (req, res, next) =>{
  const { name, resumen, puntuacion, saludable } = req.body;

  try {
    
    const newRecipe = await Recipe.create({
      name, resumen, puntuacion, saludable,
    })
    console.log('recipes: ', recipesApi)
    res.json(newRecipe)


  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports =  router;