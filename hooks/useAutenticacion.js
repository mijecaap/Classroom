import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebase";

function useAutenticacion() {
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(undefined);

  useEffect(() => {
    // Firebase necesita un momento para inicializarse, así que esperamos al evento
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      guardarUsuarioAutenticado(user);
    });
    return () => unsuscribe();
  }, []);

  return usuarioAutenticado;
}
export default useAutenticacion;
