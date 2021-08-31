import React, { useContext, useEffect, useState } from "react";
//import Layout from "../components/layout/Layout";
import FirebaseContext from "../firebase/context";
import { useRouter } from "next/router";
import { Button, Result } from "antd";

import Layout from "../components/layout/Layout";
import HomePrincipal from "../components/vistas/HomePrincipal";
import useEstudiantes from "../hooks/useEstudiantes";

const Home = () => {
  const [type, setType] = useState("");

  const { usuario, firebase } = useContext(FirebaseContext);

  const { estudiantes } = useEstudiantes();

  useEffect(() => {
    if (usuario && estudiantes.length > 0) {
      const compare = () => {
        const findEstudiante = estudiantes.find(
          (estudiante) => estudiante.uid === usuario.uid
        );
        if (findEstudiante) setType("estudiante");
        else setType("profesor");
      };
      compare();
    }
  }, [usuario, estudiantes]);

  const router = useRouter();

  const onClick = () => {
    router.push("/login");
  };

  return (
    <div>
      {usuario ? (
        <Layout>
          <HomePrincipal type={type} />
        </Layout>
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="Lo sentimos, no está autorizado para acceder a esta página."
          extra={
            <Button type="primary" onClick={onClick}>
              Volver al Login
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Home;
