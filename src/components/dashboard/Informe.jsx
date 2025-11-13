import { useEffect, useState, useMemo } from 'react';
import Grafico from './Grafico';

const Informe = () => {
  const token = localStorage.getItem('token');

  const [usuarios, setUsuarios] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No hay token, no se hace el fetch");
    return;
  }
    const fetchDatos = async () => {
      try {
        const [resUsuarios, resJugadores] = await Promise.all([
          fetch('https://obligatoriofsbackend.vercel.app/v1/usuarios', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('https://obligatoriofsbackend.vercel.app/v1/jugadores', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (!resUsuarios.ok || !resJugadores.ok)
          throw new Error('Error al cargar datos');

        const usuariosData = await resUsuarios.json();
        const jugadoresData = await resJugadores.json();

        // ✅ Guardamos datos localmente (no en Redux)
        setUsuarios(usuariosData.usuarios || usuariosData);
        setJugadores(jugadoresData.jugadores || jugadoresData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();

  });

  const informe = useMemo(() => {
    if (!Array.isArray(jugadores) || !Array.isArray(usuarios))
      return { plus: 0, premium: 0, total: 0 };

    let plus = 0;
    let premium = 0;

    jugadores.forEach((j) => {
      const usuario = usuarios.find(
        (u) => u._id === j.usuario || u._id === j.usuario?._id || u._id === j.usuario?.$oid);
      if (usuario?.plan === 'plus') plus++;
      if (usuario?.plan === 'premium') premium++;
    });

    const total = plus + premium;
    return { plus, premium, total };
  }, [jugadores, usuarios]);

  if (loading) return <p>Cargando informe...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='informe'>
      <h2>Informe de uso (Global)</h2>
      <p>Total de jugadores: {jugadores?.length ?? 0}</p>
      <p>
        Jugadores con usuario plan Plus: {informe.plus} (
        {informe.total
          ? ((informe.plus / informe.total) * 100).toFixed(2)
          : 0}
        %)
      </p>
      <p>
        Jugadores con usuario plan Premium: {informe.premium} (
        {informe.total
          ? ((informe.premium / informe.total) * 100).toFixed(2)
          : 0}
        %)
      </p>
      {/* <Grafico datosJugadores={jugadores} /> */}
    </div>
  );
};

export default Informe;
