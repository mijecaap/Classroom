import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../firebase/context";
import Layout from "../components/layout/Layout";
import HomePrincipal from "../components/vistas/HomePrincipal";
import useEstudiantes from "../hooks/useEstudiantes";

const Home = () => {
  const [type, setType] = useState("");
  const { usuario, firebase } = useContext(FirebaseContext);
  const { estudiantes } = useEstudiantes();

  // Si no hay usuario, no renderizamos nada
  if (!usuario || usuario === undefined) return null;

  // Solo hacemos la búsqueda del tipo si tenemos usuario y estudiantes
  if (usuario && estudiantes.length > 0 && !type) {
    const findEstudiante = estudiantes.find(
      (estudiante) => estudiante.uid === usuario.uid
    );
    setType(findEstudiante ? "estudiante" : "profesor");
  }

  return (
    <Layout>
      <HomePrincipal type={type} />
    </Layout>
  );
};

export default Home;
