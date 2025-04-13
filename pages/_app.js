import React from "react";
import firebase from "../firebase/firebase";
import FirebaseContext from "../firebase/context";
import useAutenticacion from "../hooks/useAutenticacion";
import { useRouter } from "next/router";
import { Spin } from "antd";

const publicRoutes = ["/login"];

const MyApp = ({ Component, pageProps }) => {
  const usuario = useAutenticacion();
  const router = useRouter();

  // Mostrar loader mientras se verifica la autenticación
  if (usuario === undefined && !publicRoutes.includes(router.pathname)) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // Redirigir solo cuando estamos seguros de que no hay usuario
  if (usuario === null && !publicRoutes.includes(router.pathname)) {
    router.replace("/login");
    return null;
  }

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
