

export default function CreateRecipe(){
  return (
    <form>
      <label name='name'>Nombre</label>
      <input type="text" placeholder="Ingresa tu nombre" /><br/><br/>
      <label name='resumen'>Resumen del plato</label>
      <textarea name="resumen" id="" cols="30" rows="5"></textarea><br/><br/>
      <label name='puntuacion'>Puntaje</label>
      <input type="number" name="puntuacion" id="" /><br/><br/>
      <label name='saludable'>Nivel de 'Comida saludable'</label>
      <input type="number" name="saludable" id="" /><br/><br/>
      <label name='pasos'>Paso a Paso</label>
      <textarea name="pasos" cols="60" rows="10"></textarea>
      
    </form>
  )
} 