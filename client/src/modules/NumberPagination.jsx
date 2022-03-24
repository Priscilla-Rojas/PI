import style from '../css/numberPagination.module.css';

const NumberPagination = ({postPerPage, totalPost, paginate}) => {

  
  const numbersPages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    numbersPages.push(i)
  }
  return (
    <nav className={style.nav}>
        {
          numbersPages.map( number => (
            <button key={number} onClick={()=> paginate(number)}> {number}</button>
          ))
        }
      
    </nav>
  )

}
export default NumberPagination;