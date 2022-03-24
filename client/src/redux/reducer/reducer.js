import { ADD_RECIPE, GET_DIETS, GET_RECIPES, GET_RECIPES_BYNAME, DETAIL_RECIPE, FILTER_BY_DIET, ORDER_ABC, ORDER_SCORE} from "../actions/action";

const inicialState  = {
  recipes: [],
  recipesByName: [],
  recipesFilter: [],
  recipeDetail: null,
  filters:'',
  orderAbc:[],
  orderScore:[],
  typesDiets: [],
  reciepCreated: null,
}


export default function reducer(state = inicialState, action){

  switch (action.type) {
    case GET_RECIPES: 
      return {
        ...state,
        recipes: [...action.payload],
      }
      
    case GET_RECIPES_BYNAME: 
      return {
        ...state,
        recipesByName: [...action.payload],
        recipesFilter: [],
        filters:'',
        orderAbc:[],
        orderScore:[],
      }
      
    case ADD_RECIPE: 
      return {
        ...state,
        reciepCreated: action.payload

      }
    case GET_DIETS: 
      return {
        ...state,
          typesDiets: action.payload

      }
    case FILTER_BY_DIET: 
      // const recipesTypeDiets = state.recipes.filter( recipe => recipe.TypeDiets) ;
      
      function verificar(recipes){
        const recipesBD = recipes.filter( recipe => recipe.TypeDiets) ;
        let contain = recipes.filter(recipe => recipe.diets ? recipe.diets.includes(action.payload.toLowerCase()): false)
          for (const recipe of recipesBD) {
            for (const diet of recipe.TypeDiets) {
              
              if (diet.name.toLowerCase() === action.payload.toLowerCase()) {
              contain = [...contain, recipe] ;
            }
            }
          }
          return contain ;
      }

      function filtrar(){
        if(state.recipesByName.length > 0){
          return verificar(state.recipesByName)
        }
        else if(state.orderAbc.length > 0) return verificar(state.orderAbc)
        else if(state.orderScore.length > 0) return verificar(state.orderScore)
        else return verificar(state.recipes)
        
    }

      return {
        ...state,
        filters: action.payload,
        recipesFilter: filtrar().length > 0 ? filtrar() : [],
        orderAbc:[],
        orderScore:[],
      }
    case ORDER_ABC: 

      return {
        ...state,
        orderAbc: action.payload,
        orderScore:[]
      }
    case ORDER_SCORE: 

      return {
        ...state,
        orderAbc: [],
        orderScore: action.payload,
      }
    case DETAIL_RECIPE:
      return{
        ...state,
        recipeDetail: action.payload
      }
    

    default:
      return state;
  }
}