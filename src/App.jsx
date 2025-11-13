import { Provider } from "react-redux";
import "./styles.css";
import { store } from "./store/store";
import Login from "./components/Login";
import Registro from "./components/Registro"
import Dashboard from "./components/Dashboard"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NoEncontrado from "./components/NoEncontrado";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const App = () => {

  return (

  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/dashboard" element={<Dashboard/>} />


        <Route path="*" element={<NoEncontrado/>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </Provider>
  )
}

export default App