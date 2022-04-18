var express = require ('express');
var app = express();
var router = express.Router();
const axios = require('axios');

const { Recipe, TypeDiet, Op } = require('../db.js');
const { json } = require('body-parser');
const { API_KEY, API_KEY1, API_KEY2, API_KEY_temp, API_KEY_temp2, API_KEY33, API_KEY_temp1 } = process.env;

let recipesApi;

router.use(json(express.json()))

router.get('/getall', ( req, res, next)=>{

      let recipesPromesApi =  axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY33}`)
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
      let recipesFindBD =  Recipe.findAll({ 
        where: { 
          title: { [Op.substring]: `%${name}%` } }, 
          include: {
            model: TypeDiet,
            // as: 'diets',
            attributes: ["name"],
            through: {
                attributes: []
            } 
    } })

      recipesFindBD.then(response => {
        let recipeDB = response;
        let result = filterApi ? [...recipeDB, ...filterApi] : [...recipeDB]    
        result.length > 0 ? res.status(200).json(result) : res.status(404).json({mesage: 'No encontramos la receta en nuestra base de Datos'})
      })
    }
  }
  else{
    res.status(404).json('No has ingresado ningun nombre')
  }
})


router.get('/:idRecetas', async (req, res, next)=>{
  const { idRecetas } = req.params;

  try {
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
      return receta ? res.json(receta) : res.status(404).json({mesage: 'No se encontro ninguna receta con el Id especificado'})
    }
    else {
      let recipe = await axios.get(`https://api.spoonacular.com/recipes/${parseInt(idRecetas)}/information/?apiKey=${API_KEY33}`)
      
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
      recipeApi ? res.status(200).json(recipeApi) : res.status(404).json({mesage: 'No se encontro ninguna receta con el Id especificado'})
    }
  } catch (error) {
    next(error)
  }
})


router.post('/', async (req, res, next) =>{
  const { title, spoonacularScore, healthScore, summary, image, diets, steps } = req.body;

  try {
    if(title && summary ){
      const newRecipe = await Recipe.create({
        title, 
        spoonacularScore, 
        healthScore, 
        summary, 
        diets, 
        steps,
        image: image.length ? image : undefined
      })
      const idsDiets= diets.map( diet => TypeDiet.findOne({
        attributes: ['id'],
        where: {
          name: diet,
        },
        
      }))
      const response = await Promise.all(idsDiets);
  
      await newRecipe.addTypeDiets(response)
  
      res.status(200).json({mesage: 'Dieta agregada correctamente'})
    }else{
      res.status(404).json({mesage: 'Los campos Title y sumary son obligatorios '})
    }

    

  } catch (error) {
    res.send(error);
  }
})


module.exports =  router;