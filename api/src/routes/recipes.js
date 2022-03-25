var express = require ('express');
var app = express();
var router = express.Router();
const axios = require('axios');

const { Recipe, TypeDiet, Op } = require('../db.js');
const { json } = require('body-parser');
const { API_KEY, API_KEY1, API_KEY2, API_KEY_temp, API_KEY_temp2 } = process.env;

let recipesApi;



router.use(json(express.json()))

router.get('/getall', ( req, res, next)=>{

      let recipesPromesApi =  axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${API_KEY}`)
      let recipesFindBD = Recipe.findAll({
        include: {
            model: TypeDiet,
            // as: 'diets',
            attributes: ["name"],
            through: {
                attributes: []
            } 
        }
      })

      Promise.all([recipesPromesApi, recipesFindBD])
            .then(response => {
              const [recipesApis, recipesFindBD] = response;
              recipesApi = recipesApis.data.results.map( r => {
                return{
                  id: r.id,
                  title: r.title,
                  spoonacularScore:r.spoonacularScore ,
                  healthScore: r.healthScore,
                  summary: r.summary,
                  image:r.image,
                  diets: r.diets,
                  steps: r.analyzedInstructions.length > 0 ? r.analyzedInstructions[0].steps : []
                }
              })
              
              let result = recipesApi.length > 0 ? [...recipesFindBD, ...recipesApi] : [...recipesFindBD];

              res.send(result)
            })
            .catch( e => next(e))
    
})

// .then
router.get('/', ( req, res, next)=>{
  const { name } = req.query;

  if(name){
    if(recipesApi){
      let filterApi = recipesApi.filter( r => r.title.toLowerCase().includes(name.toLocaleLowerCase())) 
      let recipesFindBD =  Recipe.findAll({ where: { title: { [Op.substring]: `%${name}%` } } })

      recipesFindBD.then(response => {
        let recipeDB = response;
        let result = filterApi ? [...recipeDB, ...filterApi] : [...recipeDB]    
        result.length > 0 ? res.send(result) : res.status(404).send('No encontramos la receta en nuestra base de Datos')
      })
      
    }
    else{

      let recipesPromesApi =  axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=1&addRecipeInformation=true&apiKey=${API_KEY}`)
      let recipesFindBD =  Recipe.findAll({ where: { title: { [Op.iLike]: `%${name}%` } } });

      Promise.all([recipesPromesApi, recipesFindBD])
            .then(response => {
              const [recipesApis, recipesFindBD] = response;
              recipesApi = recipesApis.data.results.map( r => {
                return{
                  id: r.id,
                  title: r.title,
                  puntuacion:r.spoonacularScore ,
                  saludable: r.healthScore,
                  summary: r.summary,
                  image:r.image,
                  diets: r.diets,
                  pasos: r.analyzedInstructions.length > 0 ? r.analyzedInstructions.steps : []
                }
              })
              let filterApi = recipesApi.filter( r => (r.title).toLowerCase().includes(name.toLowerCase())) 
              let result = filterApi ? [...recipesFindBD, ...filterApi] : [...recipesFindBD]
              result.length > 0 ? res.send(result) : res.status(404).send('No encontramos la receta en nuestra base de Datos');
            })
            .catch( e => next(e))
    };
    
  }
  else{
    res.status(404).send('No has ingresado ningun nombre')
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
            
    result.length > 1 ? res.send(result) : res.status(404).send('No encontramos la receta en nuestra base de Datos');

  } catch (error) {
    next(e)
  }
}) */


router.get('/:idRecetas', async (req, res, next)=>{
  const { idRecetas } = req.params;

  try {
    // if(idRecetas.length > 8 ){
    if(idRecetas.includes('-')){
      const receta = await Recipe.findByPk(idRecetas, {
        include: {
          model: TypeDiet,
          // as: 'diets',
          attributes: ["name"],
          through: {
              attributes: []
          }
    }})
      return receta ? res.json(receta) : res.status(404).send('No se encontro ninguna receta con el Id especificado')

    }
    else{
      let recipe = await axios.get(`https://api.spoonacular.com/recipes/${parseInt(idRecetas)}/information/?apiKey=${API_KEY}`)
      
      let recipeApi = {
        id: recipe.data.id,
        title: recipe.data.title,
        spoonacularScore:recipe.data.spoonacularScore ,
        healthScore: recipe.data.healthScore,
        diets: recipe.data.diets,
        summary: recipe.data.summary,
        image:recipe.data.image,
        steps: recipe.data.analyzedInstructions.length > 0 ? recipe.data.analyzedInstructions[0].steps : []
      }
      recipeApi ? res.send(recipeApi) : res.status(404).send('No se encontro ninguna receta con el Id especificado')
    }
  } catch (error) {
    next(error)
  }
  
})


router.post('/', async (req, res, next) =>{
  const { title, spoonacularScore, healthScore, summary, image, diets, steps } = req.body;

  try {
    
    const newRecipe = await Recipe.create({
      title, spoonacularScore, healthScore, summary, image, diets, steps
    })
    const idsDiets= diets.map( diet => TypeDiet.findOne({
      attributes: ['id'],
      where: {
        name: diet,
      },
      
    }))
    const response = await Promise.all(idsDiets);

    await newRecipe.addTypeDiets(response)


    res.status(200).send({mesage: 'Dietsa agregada correctamente'})

  } catch (error) {
    res.send(error);
  }
})

module.exports =  router;