import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { eliminarJugador, actualizarJugador } from '../../features/jugadores.slice';
import { useState } from 'react';
import { toast } from "react-toastify";



const Jugador = ({_id, nombre, edad, nacionalidad, posicion, habilidadPrincipal, valorDeMercado, salarioEstimado}) => {

    const [editing, setEditing] = useState(false);
    const [newNombre, setNewNombre] = useState(nombre);
    const [newEdad, setNewEdad] = useState(edad);
    const [newNacionalidad, setNewNacionalidad] = useState(nacionalidad);
    const [newPosicion, setNewPosicion] = useState(posicion);
    const [newHabilidadPrincipal, setNewHabilidadPrincipal] = useState(habilidadPrincipal);
    const [newValorDeMercado, setNewValorDeMercado] = useState(valorDeMercado);
    const [newSalarioEstimado, setNewSalarioEstimado] = useState(salarioEstimado);
    const fecha = new Date();
    const fechaISO = fecha.toISOString();


    const token = localStorage.getItem('token');
    const idLogueado = localStorage.getItem('idLogueado')
     const dispatch = useDispatch();
    const navigate = useNavigate();


//Eliminar jugador
    const handleEliminar = async (_id) => {
  try {
    const response = await fetch(`https://obligatoriofsbackend.vercel.app/v1/jugadores/${_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      dispatch(eliminarJugador(_id));
      navigate("/dashboard"),
      toast.success("Jugador Eliminado")
    } else {
      toast.error('Error al eliminar el jugador');
    }
  } catch (error) {
    toast.error('Error al eliminar el jugador');
  }
};

/// editar jugador
    const handleGuardar = async () => {
    try {
      const response = await fetch(`https://obligatoriofsbackend.vercel.app/v1/jugadores/${_id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: newNombre,
          edad: newEdad,
          nacionalidad: newNacionalidad,
          posicion: newPosicion,
          habilidadPrincipal: newHabilidadPrincipal,
          valorDeMercado: newValorDeMercado,
          salarioEstimado: newSalarioEstimado,
          usuario: idLogueado,
          fechaCreado: fechaISO
        })
      });
      if (response.ok) {
        const updatedJugador = await response.json();
        
        dispatch(actualizarJugador(updatedJugador),
        navigate("/dashboard"),
        toast.success("jugador editado correctamente")
        
      );
        setEditing(false);
      } else {
        toast.error('Fallo al editar jugador, verifique los datos e intente nuevamente');
      }
    } catch (error) {
      console.error('Error al actualizar', error);
    }
  };

        
    return (
  <div className="editar jugador">
    {
    
    
    editing ? (
      <>
        <input type="text" value={newNombre} onChange={(e) => setNewNombre(e.target.value)} />
        <input type="number" value={newEdad} onChange={(e) => setNewEdad(e.target.value)} />
        <input type="text" value={newNacionalidad} onChange={(e) => setNewNacionalidad(e.target.value)} />
        <input type="text" value={newPosicion} onChange={(e) => setNewPosicion(e.target.value)} />
        <input type="text" value={newHabilidadPrincipal} onChange={(e) => setNewHabilidadPrincipal(e.target.value)} />
        <input type="text" value={newValorDeMercado} onChange={(e) => setNewValorDeMercado(e.target.value)} />
        <input type="text" value={newSalarioEstimado} onChange={(e) => setNewSalarioEstimado(e.target.value)} />
        <button onClick={handleGuardar}>Guardar</button>
        <button onClick={() => setEditing(false)}>Cancelar</button>
      </>
    ) : (
      <>
        <div className="jugador">
        <p>{nombre}</p>
        <p>Edad: {edad}</p>
        <p>Nacionalidad: {nacionalidad}</p>
        <p>Posición: {posicion}</p>
        <p>Habilidad Principal: {habilidadPrincipal}</p>
        <p>Valor de Mercado: {valorDeMercado}</p>
        <p>Salario estimado: {salarioEstimado}</p>
        <div className="acciones">
        <button className="btn-editar" onClick={() => setEditing(true)}>
            Editar
        </button>
        <button onClick={() => handleEliminar(_id)}>Eliminar</button>
  </div>
</div>
      </>
    )}
  </div>
);

}

export default Jugador