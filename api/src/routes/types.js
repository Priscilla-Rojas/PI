var { Router} = require ('express');
var router = Router()

router.post('/', (req, res, next)=>{

  const { name, } = req.body
  res.send('soy post de /types/')
})

module.exports =  router;