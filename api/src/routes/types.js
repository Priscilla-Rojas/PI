var { Router} = require ('express');
var router = Router()

const { TypeDiet } = require('../db.js')

router.get('/', async (req, res, next)=>{

  const diets = await TypeDiet.findAll()

  if(diets.length < 1){
    const diets = [
      {name:'Gluten Free'}, 
      {name:'Ketogenic'}, 
      {name:'Vegetarian'},
      {name:'Lacto-Vegetarian'},
      {name:'Ovo-Vegetarian'}, 
      {name:'Vegan'}, 
      {name:'Pescetarian'}, 
      {name:'Paleo'},  
      {name:'Primal'}, 
      {name:'Low FODMAP'}, 
      {name:'Whole30'}, 
    ]

    await TypeDiet.bulkCreate(diets)

    const dietsprecargadas = await TypeDiet.findAll()
    return res.json({mesage: 'dietas precargadas', data: dietsprecargadas})
  }

  return res.json(diets);
})

module.exports =  router;