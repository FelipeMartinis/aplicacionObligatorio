import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Jugador from "./jugador";
import { guardarJugadores } from "../../features/jugadores.slice";
import { useState } from 'react';

const Jugadores = () => {
    const dispatch = useDispatch();
    const jugadores = useSelector(state => state.jugadores.Jugadores);
    const usernameLogueado = localStorage.getItem('userNameLog');
    const token = localStorage.getItem('token');
    

    useEffect(() => {
    // Llamada a la API cuando el componente carga
    const fetchJugadores = async () => {
      try {
        const response = await fetch(`https://obligatoriofsbackend.vercel.app/v1/jugadores/usuario/${usernameLogueado}`, {
            headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(guardarJugadores(data));
        } else {
          console.error("Error al cargar jugadores");
        }
      } catch (error) {
        console.error("Error en fetch:", error);
      }
    };

    if (usernameLogueado) {
      fetchJugadores();
    }
  }, [dispatch, usernameLogueado]);

  
// Filtro Fecha
  const [filtroFecha, setFiltroFecha] = useState("todo");
  const handleFiltroChange = (e) => {
    setFiltroFecha(e.target.value);
  }
  const hoy = new Date();

        const jugadoresFiltrados = jugadores.filter(j => {
        const fechaCreado = new Date(j.fechaCreado); // Asegúrate que cada jugador tenga esta propiedad en tus datos

        

        const diffMs = hoy - fechaCreado; // diferencia en milisegundos
        const diffDias = diffMs / (1000 * 60 * 60 * 24); // convertir a días
  
        if (filtroFecha === "todo") return true;
        if (filtroFecha === "ultimaSemana") return diffDias <= 7;
        if (filtroFecha === "ultimoMes") return diffDias <= 30;
        return true;

});

    return(
            
        <div className="section-jugadores">
  <h2 className="titulo">Mis Jugadores</h2>
  <div className="filtro">
    <select value={filtroFecha} onChange={handleFiltroChange}>
      <option value="todo">Todo el historial</option>
      <option value="ultimaSemana">Última semana</option>
      <option value="ultimoMes">Último mes</option>
    </select>
  </div>
  <div className="lista-jugadores">
    {jugadoresFiltrados.map(j => (<Jugador key={j._id} {...j} />))}
  </div>
</div>
    )
}
export default Jugadores