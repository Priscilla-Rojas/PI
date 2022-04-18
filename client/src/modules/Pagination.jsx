import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Cards from "./cards";
import NumberPagination from './NumberPagination.jsx';
import style from '../css/pagination.module.css'

function Pagination({recipes, recipesByName, orderScore, filterByDiet, recipesFilter, orderAbc }){

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(9);

  useEffect( ()=> {
    (orderAbc.length > 0 ) ?  setPosts(orderAbc) :
    (orderScore.length > 0 ) ?  setPosts(orderScore) :
    (recipesFilter.length > 0)  ? setPosts(recipesFilter) : 
    (recipesByName.length > 0) ? setPosts(recipesByName): 
    setPosts(recipes)
    setCurrentPage(1)
  },[recipesFilter, orderAbc, orderScore, recipes, recipesByName])

  
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = (number) => {
    setCurrentPage(number)
  }
  const next = () =>{
    setCurrentPage(currentPage + 1)
  }
  const prev = () =>{
    setCurrentPage(currentPage - 1)
  }

  return (
    <main className={style.main} >
      <NumberPagination postPerPage = {postPerPage} totalPost = {posts.length} paginate = {paginate} currentPage = {currentPage} next = {next} prev = {prev}/>
      <Cards recipes={currentPost}/>
      {/* <NumberPagination postPerPage = {postPerPage} totalPost = {posts.length} paginate = {paginate} currentPage = {currentPage} next = {next} prev = {prev}/> */}
      
    </main>
  )

}

const mapStateToProps = (state)=>{
  return {
    recipes: state.recipes,
    recipesByName: state.recipesByName,
    filterByDiet: state.filterByDiet,
    recipesFilter: state.recipesFilter,
    orderAbc: state.orderAbc,
    orderScore: state.orderScore,
  }
}
export default connect(mapStateToProps, null)(Pagination)