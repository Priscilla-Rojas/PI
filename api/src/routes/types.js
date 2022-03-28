var { Router} = require ('express');
var router = Router()
const axios = require('axios');

const { TypeDiet } = require('../db.js')
const { API_KEY, API_KEY1, API_KEY2, API_KEY_temp, API_KEY_temp2, API_KEY_temp1 } = process.env;




router.get('/', async (req, res, next)=>{

  // const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY_temp1}`)
  //   const apiDiets = apiInfo.data?.results.map(element => element.diets)
  //   const repeatedDiets = apiDiets.flat()
  //   const finalListOfDiets = [...new Set(repeatedDiets)] 
    
  //   const dietas = finalListOfDiets.map(name => ({ name }));
  //   await TypeDiet.bulkCreate(dietas)

  //   return res.json({mesage: 'dietas ontenidas desde la api', data: dietas})
  

  const diets = await TypeDiet.findAll()

  if(diets.length < 1){
    const diets = [
      {name:'Gluten Free'}, 
      {name:'Ketogenic'}, 
      {name:'Diary free'}, 
      {name:'Vegetarian'},
      {name:'Lacto Vegetarian'},
      {name:'Ovo Vegetarian'}, 
      {name:'Lacto Ovo Vegetarian'},
      {name:'Vegan'}, 
      {name:'Pescetarian'}, 
      {name:'Paleo'},  
      {name:'Paleolithic'},  
      {name:'Primal'}, 
      {name:'Fodmap Friendly'}, 
      {name:'Low FODMAP'}, 
      {name:'Whole 30'}, 
    ]

    await TypeDiet.bulkCreate(diets)

    const dietsprecargadas = await TypeDiet.findAll()
    return res.json({mesage: 'dietas precargadas', data: dietsprecargadas})
  }

  return res.json(diets);
})

module.exports =  router;