// Registro.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Registro = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
  const navigate = useNavigate();

  // Condición que habilita el botón: usuario no vacío y contraseñas no vacías y coinciden
  const puedeEnviar =
    usuario.trim().length > 0 &&
    contraseña.length > 0 &&
    contraseña === repetirContraseña;

  const registrar = async (e) => {
    e.preventDefault();

    if (!puedeEnviar) {
      toast.error("Completa los campos correctamente antes de registrarte.");
      return;
    }

    try {
      const response = await fetch(
        "https://obligatoriofsbackend.vercel.app/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usuario,
            password: contraseña,
            confirmPassword: repetirContraseña,
            rol: "agente",
            plan: "plus",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Usuario registrado correctamente");
        navigate("/");
      } else if(response.status === 409){
        toast.error( "Nombre de ususario ya existe, por favor ingrese uno distinto");
        
      }else{
        toast.error("El ususario debe tener al menos 3 caracteres y la contraseña 6, por favor intente nuevamente ");
        return

      }
    } catch (error) {
      console.error("Error:", error);
      toast.warning("Error al conectar con el servidor");
    }
  };

  return (
    <div className="registro-container">
      <h1>Bienvenido a la Aplicación</h1>
      <h1>Registro</h1>

      <label htmlFor="txtUser">Usuario:</label>
      <input
        id="txtUser"
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        autoComplete="username"
      />

      <label htmlFor="txtPassword">Contraseña:</label>
      <input
        id="txtPassword"
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        autoComplete="new-password"
      />

      <label htmlFor="txtPassword2">Repetir Contraseña:</label>
      <input
        id="txtPassword2"
        type="password"
        value={repetirContraseña}
        onChange={(e) => setRepetirContraseña(e.target.value)}
        autoComplete="new-password"
      />

      {/* Mensaje de ayuda/validación en tiempo real */}
      {contraseña !== "" || repetirContraseña !== "" ? (
        contraseña === repetirContraseña ? (
          <p style={{ color: "green" }}>Las contraseñas coinciden</p>
        ) : (
          <p style={{ color: "red" }}>Las contraseñas no coinciden</p>
        )
      ) : null}

      <button
        onClick={registrar}
        disabled={!puedeEnviar}
        style={{
          opacity: puedeEnviar ? 1 : 0.5,
          cursor: puedeEnviar ? "pointer" : "not-allowed",
          padding: "10px 16px",
          borderRadius: 6,
        }}
      >
        Registrarme
      </button>

      <p>
        ¿Ya tenés cuenta? <Link to="/">Ingresá</Link>
      </p>
    </div>
  );
};

export default Registro;
