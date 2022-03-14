var express = require ('express');
var app = express();
var router = express.Router();
const axios = require('axios');

const { Recipe, Op } = require('../db.js')
const { API_KEY } = process.env;

let recipesApi;

// .then
router.get('/', ( req, res, next)=>{
  const { name } = req.query;

  if(name){
    let recipesPromesApi =  axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=2&addRecipeInformation=true&apiKey=${API_KEY}`)
    let recipesFindBD =  Recipe.findAll({ where: { name: { [Op.substring]: `%${name}%` } } })

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
                  pasos: r.analizedInstructions[0].steps
                }
              })
              let filterApi = recipesApi.filter( r => r.name.includes(name)) 
              let result = [...recipesFindBD, ...filterApi]
              // console.log(recipesApi.data.results)
              
              result.length > 1 ? res.send(result) : res.status(404).send('No encontramos la receta en nuestra base de Datos');
            })
            .catch( e => next(e))
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

  if(idRecetas.length < 10 ){
    const receta = await Recipe.findByPk(idRecetas);
    return res.json(receta);
  }
  else{
    let recipe = await axios.get(`https://api.spoonacular.com/recipes/${idRecetas}/information&apiKey=${API_KEY}`)
  }
  
})


router.get('/:idReceta', (req, res, next)=>{
  res.send('soy get de recipes/:idRecipes')
})

module.exports =  router;