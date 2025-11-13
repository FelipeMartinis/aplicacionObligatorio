import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import "../../styles.css";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Grafico = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No hay token, no se hace el fetch");
    return;
  }
    const fetchJugadores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://obligatoriofsbackend.vercel.app/v1/jugadores', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Error al cargar jugadores');
        const data = await response.json();
        setDatos(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJugadores();
  }, []);

  const contarPorPosicion = () => {
    const conteo = {};
    datos.forEach((j) => {
      const pos = j.posicion || 'Desconocido';
      conteo[pos] = (conteo[pos] || 0) + 1;
    });
    return conteo;
  };

  const datosPorPosicion = contarPorPosicion();

  const data = {
    labels: Object.keys(datosPorPosicion),
    datasets: [
      {
        label: 'Jugadores por posición',
        data: Object.values(datosPorPosicion),
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',   // azul
          'rgba(16, 185, 129, 0.6)',   // verde
          'rgba(245, 158, 11, 0.6)',   // dorado
          'rgba(239, 68, 68, 0.6)',    // rojo
          'rgba(139, 92, 246, 0.6)',   // violeta
        ],
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Cantidad de Jugadores por Posición',
        color: '#1f2937',
        font: {
          size: 30,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#374151',
          font: { size: 14 },
        },
      },
      y: {
        ticks: {
          color: '#374151',
          font: { size: 14 },
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)',
        },
      },
    },
  };

  if (loading) return <p className="grafico-loading">Cargando gráfico...</p>;
  if (error) return <p className="grafico-error">Error: {error}</p>;

  return (
    <div className="grafico-contenedor">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Grafico;

