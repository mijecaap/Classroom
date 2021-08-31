import { Spin } from "antd";
import React from "react";
import { useState } from "react";
import useCursos from "../../hooks/useCursos";
import HomeEstudiante from "../vistas/HomeEstudiante";
import HomeProfesor from "../vistas/HomeProfesor";

const HomePrincipal = ({ type }) => {
  const items = [
    {
      title: "Card title",
      description: "This is the description",
      image:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      alt: "alt",
    },
    {
      title: "Card title",
      description: "This is the description",
      image:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      alt: "alt",
    },
    {
      title: "Card title",
      description: "This is the description",
      image:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      alt: "alt",
    },
    {
      title: "Card title",
      description: "This is the description",
      image:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      alt: "alt",
    },
  ];

  const { cursos } = useCursos("date");

  return (
    <>
      {type === "estudiante" ? <HomeEstudiante cursos={cursos} /> : null}
      {type === "profesor" ? <HomeProfesor cursos={cursos} /> : null}
      {type === "" ? (
        <div
          style={{
            width: "100vw",
            height: "calc(100vh - 64px)",
            lineHeight: "calc(100vh - 64px)",
            textAlign: "center",
            background: "rgba(0,0,0,0.05)",
          }}
        >
          <Spin size="large" />
        </div>
      ) : null}
    </>
  );
};

export default HomePrincipal;
