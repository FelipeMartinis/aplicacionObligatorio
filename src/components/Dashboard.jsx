import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import  FormCrear  from "./dashboard/FormCrear"
import Jugadores from "./dashboard/Jugadores";
import Informe from "./dashboard/Informe"
import CambioPlan from "./dashboard/CambioPlan";
import Grafico from "./dashboard/Grafico";
import { toast } from "react-toastify";
const Dashboard = () => {

    const navigate = useNavigate();

     useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }

    }, [])

    const cerrarSesion = () => {
        localStorage.clear();
        navigate("/")
        toast.success("Sesion Cerrada")

    }    
    return(
        <div className="container">
            <div className="encabezado">
                <h1>Bienvenido al Dashboard</h1>

                <input type="button" value="Cerrar Sesión" onClick={cerrarSesion} />
                
            </div>
            <Jugadores/>
            <FormCrear/>
            <Informe/>
            <CambioPlan/>
             <Grafico />
        </div>

    
    )
}

export default Dashboard