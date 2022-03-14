import Nav from './nav';
import Card from './card';
import FilterBy from './filterBy';
import OrderBy from './orderBy'

export default function Home(){
  return (
    <div>
      <Nav/>
      <hr />
      <FilterBy/>
      <OrderBy/>
      <hr />
      <p>Aca inicia el home</p> 

      <div>Paginado</div>

      <hr />
      <div>LISTADO DE RECETAS
        <Card/>
      </div>
      <hr />
    </div>
  )
} 