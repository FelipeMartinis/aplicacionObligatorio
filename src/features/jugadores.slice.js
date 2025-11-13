// src/features/jugadores.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Jugadores: [],
};

const jugadoresSlice = createSlice({
  name: "jugadores",
  initialState,
  reducers: {
    guardarJugadores: (state, action) => {
      state.Jugadores = action.payload;
    },
    eliminarJugador: (state, action) => {
      state.Jugadores = state.Jugadores.filter(j => j._id !== action.payload);
    },
    actualizarJugador: (state, action) => {
      const index = state.Jugadores.findIndex(j => j._id === action.payload._id);
      if (index !== -1) {
        state.Jugadores[index] = action.payload; 
      }},
        agregarJugador: (state, action) => {
        state.Jugadores = [...state.Jugadores, action.payload];
      },
      guardarTotalJugadores: (state, action) => {
      state.Jugadores = action.payload;
    },

  },
});



export const { guardarJugadores, eliminarJugador, actualizarJugador, agregarJugador } = jugadoresSlice.actions;
export default jugadoresSlice.reducer;
