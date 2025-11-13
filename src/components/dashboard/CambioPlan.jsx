import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CambioPlan = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const userId = localStorage.getItem('idLogueado');

  // Fetch al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No hay token, no se hace el fetch");
    return;
  }
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`https://obligatoriofsbackend.vercel.app/v1/usuarios/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Error al cargar usuario');
        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, []);

  const handleCambiarAPremium = async () => {
    if (!usuario) return; 
    try {
      const res = await fetch(`https://obligatoriofsbackend.vercel.app/v1/usuarios/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...usuario, plan: 'premium' }), 
      });
      if (!res.ok) throw new Error('Error al actualizar plan');

      const dataActualizada = await res.json();
      setUsuario(dataActualizada); 
      toast.success("Tu plan a sido actualizado a Premium")
    } catch (err) {
      console.error(err);
      toast.error("no se pudo cambiar el plan");
    }
  };

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p>Error: {error}</p>;

  const yaEsPremium = usuario?.plan === 'premium';

  return (
    <div className="cambiar-plan">
  <h3>Cambiar a plan Premium</h3>
  <p>Accede al plan premium y registrá jugadores sin límite</p>
  <button 
    onClick={handleCambiarAPremium} 
    disabled={yaEsPremium}
  >
    {yaEsPremium ? 'Ya es plan premium' : 'Convertirse en premium'}
  </button>
</div>

  );
};

export default CambioPlan;
