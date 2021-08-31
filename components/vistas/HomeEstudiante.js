import { Col, Empty } from "antd";
import React from "react";
import Carrousel from "../ui/Carrousel";

const HomeEstudiante = ({ cursos }) => {
  const senias = cursos.filter((curso) => curso.type === "Lenguaje de Señas");
  const braille = cursos.filter((curso) => curso.type === "Braille");
  const morse = cursos.filter((curso) => curso.type === "Morse");

  return (
    <Col span={24} style={{ marginBottom: 32 }}>
      {/* -------------------------- SEÑAS --------------------------- */}
      {senias.length > 0 ? (
        <Carrousel titulo={"Lenguaje de señas"} cursos={senias} />
      ) : null}
      {/* -------------------------- BRAILER --------------------------- */}
      {braille.length > 0 ? (
        <Carrousel titulo={"Braille"} cursos={braille} />
      ) : null}
      {/* -------------------------- MORSE --------------------------- */}
      {morse.length > 0 ? <Carrousel titulo={"Morse"} cursos={morse} /> : null}
      {/* -------------------------- VACÍO --------------------------- */}
      {senias.length === 0 && braille.length === 0 && morse.length === 0 ? (
        <Empty style={{ marginTop: 32 }} />
      ) : null}
    </Col>
  );
};

export default HomeEstudiante;
