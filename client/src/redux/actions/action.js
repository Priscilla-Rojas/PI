import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_BYNAME = 'GET_RECIPES_BYNAME';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const ADD_RECIPE = 'ADD_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const ORDER_ABC = 'ORDER_ABC';
export const ORDER_SCORE = 'ORDER_SCORE';
export const DETAIL_RECIPE = 'DETAIL_RECIPE';


export function getRecipes(){
  return function (dispatch){
    return axios.get(`http://localhost:3001/recipes/getall`)
    
    .then( data => {
      dispatch({ type: GET_RECIPES, payload: data.data })
    })
  }
}

export function getRecipesByName(name){
  if(name.length > 0){
    return function (dispatch){
      return axios.get(`http://localhost:3001/recipes?name=${name}`)
      .then( data => {
        dispatch({ type: GET_RECIPES_BYNAME, payload: data.data })
      })
      // .catch(e => console.log(e) )
      .catch(e => alert(`No se ha encontrado ninguna receta con los caracteres enviados`))
    }
  }else{
    return {
      type: GET_RECIPES_BYNAME,
      payload: [],
    }
  }
}
export function getDiets(){
  return function (dispatch){
    return axios.get(`http://localhost:3001/types`)
    
    .then( data => {
      dispatch({ type: GET_DIETS, payload: data.data})
    })
  }
}

export function addRecipe(recipe){
  return function (dispatch){
    return axios.post('http://localhost:3001/recipes', recipe)
    .then( data => {
      dispatch({ type: ADD_RECIPE, payload: data })
    })
  }
}
export function filterByDiet(diet){
  return {
    type: FILTER_BY_DIET,
    payload: diet,
  }
}
export function orderABC(diet){
  return {
    type: ORDER_ABC,
    payload: diet,
  }
}
export function orderScore(diet){
  return {
    type: ORDER_SCORE,
    payload: diet,
  }
}
export function detailRecipe(id){
  return function (dispatch){
    return axios.get(`http://localhost:3001/recipes/${id}`)
    .then( data => {
      console.log(data)
      dispatch({ type: DETAIL_RECIPE, payload: data.data })
    })
    .catch(e => {
      dispatch({ type: DETAIL_RECIPE, payload: 'No Found' })
    })
  }
}
