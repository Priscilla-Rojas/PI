import { useState } from "react"

export default function Search(){

  const [state, setState] = useState('');

  const handleState = (e)=>{
    setState(e.target.value)
  }

  console.log(state)

  return (
    <form>
      <input type="text" onChange={handleState} placeholder="Buscar Receta ..."/>
      <input type="submit" value='Burcar'/>
    </form>
  )
} 