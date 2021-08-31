import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "../firebase/context";

const useEstudiantes = () => {
  const [estudiantes, guardarEstudiantes] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const productsQuery = firebase.db
      .collection("estudiante")
      .onSnapshot(manejarSnapshot);

    const unsubscribe = productsQuery;

    const getProducts = async () => {
      await productsQuery;
    };

    getProducts();

    return () => {
      unsubscribe();
    };
  }, []);

  function manejarSnapshot(snapshot) {
    const estudiantes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarEstudiantes(estudiantes);
  }

  return {
    estudiantes,
  };
};

export default useEstudiantes;
