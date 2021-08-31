import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "../firebase/context";

const useCursos = (orden) => {
  const [cursos, guardarCursos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const productsQuery = firebase.db
      .collection("cursos")
      .orderBy(orden, "desc")
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
    const cursos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarCursos(cursos);
  }

  return {
    cursos,
  };
};

export default useCursos;
