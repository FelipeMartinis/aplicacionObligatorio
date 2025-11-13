import { configureStore } from "@reduxjs/toolkit";
import jugadoresReducer from "../features/jugadores.slice"


export const store = configureStore({
  reducer: {
    jugadores: jugadoresReducer,
    
  },

});