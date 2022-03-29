import style from '../css/numberPagination.module.css';

const NumberPagination = ({postPerPage, totalPost, paginate, currentPage, prev, next}) => {

  
  const numbersPages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    numbersPages.push(i)
  }
  const dysplayNummeber = 4
  const indexOfFirstPage = currentPage - dysplayNummeber < 0 ? 0 : currentPage - dysplayNummeber;
  const indexOfLastPage = indexOfFirstPage + dysplayNummeber >= numbersPages.length ? numbersPages.length : indexOfFirstPage + dysplayNummeber;
  const currentPages = numbersPages.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <nav className={style.nav}>
      <button onClick={()=> prev()} className={style.prev} disabled={currentPage === 1 ? true : false}> Prev </button>
      {
        currentPages.map( number => (
          <button to='#' key={number} className={currentPage === number ? style.activo : undefined} onClick={()=> paginate(number)} > {number}</button >))
      }
        <button onClick={()=> next() } className={style.next} disabled={currentPage === numbersPages.length ? true : false}> Next </button>
    </nav>
  )

}
export default NumberPagination;