import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import { formCrearSchema } from "../../validators/FormCrear.Validators"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { agregarJugador } from "../../features/jugadores.slice"


const FormCrear = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(formCrearSchema),
  })

  const token = localStorage.getItem('token');
  const usuarioLogueado = localStorage.getItem('userNameLog');
  const dispatch = useDispatch()
  // const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Agrego las propiedades adicionales
    const fecha = new Date().toISOString();

    try {
      const response = await fetch("https://obligatoriofsbackend.vercel.app/v1/jugadores", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          usuario: usuarioLogueado,
          fechaCreado: fecha
        }),
      });
      const data2 = await response.json();

      if (response.ok) {
        // Dispatch para agregar al store
        dispatch(agregarJugador(data2.nuevoJugador || data2));
        toast.success("Jugador creado con éxito");
        // Limpiar el formulario si quieres
      }else if(response.status === 409){
        toast.error("Ya existe un jugador con ese nombre")
      } else if(response.status === 403) {
        toast.error("Llegaste al limite del plan plus, cambiate al plan premium")
        
      }
      
      else {
        toast.error("Error al crear jugador, revise los datos");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.warning("Error al conectar con el servidor");
    }
  };

  return (
    <div className="agregar-jugador">
      <h3>Agregar Nuevo Jugador</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nombre" {...register('nombre')} />
        <span className="error">{errors.nombre?.message}</span>

        <input type="number" placeholder="Edad" {...register('edad')} />
        <span className="error">{errors.edad?.message}</span>

        <input type="text" placeholder="Nacionalidad" {...register('nacionalidad')} />
        <span className="error">{errors.nacionalidad?.message}</span>

        <select {...register('posicion')}>
          <option value="">Selecciona una posición</option>
          <option value="golero">golero</option>
          <option value="defensa">defensa</option>
          <option value="mediocampista">mediocampista</option>
          <option value="delantero">delantero</option>
        </select>
        <span className="error">{errors.posicion?.message}</span>

        <input type="text" placeholder="Habilidad Principal" {...register('habilidadPrincipal')} />
        <span className="error">{errors.habilidadPrincipal?.message}</span>

        <input type="text" placeholder="Valor de Mercado" {...register('valorDeMercado')} />
        <span className="error">{errors.valorDeMercado?.message}</span>

        <input type="text" placeholder="Salario Estimado" {...register('salarioEstimado')} />
        <span className="error">{errors.salarioEstimado?.message}</span>

        <button type="submit">Crear</button>
      </form>
    </div>
  )
}

export default FormCrear
