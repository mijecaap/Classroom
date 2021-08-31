import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "../firebase/context";

const useProfesores = () => {
  const [profesores, guardarProfesores] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const productsQuery = firebase.db
      .collection("profesor")
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
    const profesores = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarProfesores(profesores);
  }

  return {
    profesores,
  };
};

export default useProfesores;
