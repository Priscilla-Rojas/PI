const { Router } = require('express');
const recipesRoute = require ('./recipes.js')
const typesRoute = require ('./types.js')

const router = Router();

// Configurar los routers
router.use('/recipes', recipesRoute);
router.use('/types', typesRoute);






module.exports = router;
