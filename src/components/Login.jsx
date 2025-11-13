import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const ingresar = async (e) => {
    e.preventDefault();

    // Si por alguna razón el botón no se deshabilitó, también chequeamos acá
    if (!usuario.trim() || !contraseña.trim()) {
      toast.warning("Completa ambos campos antes de continuar");
      return;
    }

    try {
      const response = await fetch("https://obligatoriofsbackend.vercel.app/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password: contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userNameLog", data.username);
        localStorage.setItem("idLogueado", data.userId);
        navigate("/dashboard");
        toast.success("Ingreso exitoso");
      } else {
        toast.error("Usuario o contraseña incorrectos");
        return
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al conectar al servidor");
      return
    }
  };

  const camposCompletos = usuario.trim() !== "" && contraseña.trim() !== "";

  return (
    <div className="login-container">
      <h1>Bienvenido a la Aplicación</h1>
      <h1>Login</h1>

      <label htmlFor="txtUser" className="label-input">Usuario</label>
      <input
        type="text"
        id="txtUser"
        className="input-field"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <label htmlFor="txtPassword" className="label-input">Contraseña</label>
      <input
        type="password"
        id="txtPassword"
        className="input-field"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />

      <button
        className="btn-primary"
        onClick={ingresar}
        disabled={!camposCompletos}
        style={{
          opacity: camposCompletos ? 1 : 0.5,
          cursor: camposCompletos ? "pointer" : "not-allowed",
        }}
      >
        Ingresar
      </button>

      <p>¿No tenés cuenta? <Link to="/registro">Registrate</Link></p>
    </div>
  );
};

export default Login;
