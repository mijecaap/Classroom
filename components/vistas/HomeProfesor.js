import { Col, Row, Tooltip, Typography, Button, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import Carrousel from "../ui/Carrousel";
import Link from "next/link";
import { useContext } from "react";
import FirebaseContext from "../../firebase/context";
import { useState } from "react";

const HomeProfesor = ({ cursos }) => {
  const { usuario } = useContext(FirebaseContext);

  console.log(cursos);

  const senias = cursos.filter(
    (curso) =>
      curso.type === "Lenguaje de Señas" && curso.creator.id === usuario.uid
  );
  const braille = cursos.filter(
    (curso) => curso.type === "Braille" && curso.creator.id === usuario.uid
  );
  const morse = cursos.filter(
    (curso) => curso.type === "Morse" && curso.creator.id === usuario.uid
  );

  return (
    <>
      <Col span={24} style={{ marginBottom: 32 }}>
        <Row style={{ marginTop: 32 }}>
          <Col span={24}>
            <Typography.Title level={1}>Mis cursos:</Typography.Title>
          </Col>
        </Row>
        {/* -------------------------- SEÑAS --------------------------- */}
        {senias.length > 0 ? (
          <Carrousel titulo={"Lenguaje de señas"} cursos={senias} />
        ) : null}
        {/* -------------------------- BRAILER --------------------------- */}
        {braille.length > 0 ? (
          <Carrousel titulo={"Braille"} cursos={braille} />
        ) : null}
        {/* -------------------------- MORSE --------------------------- */}
        {morse.length > 0 ? (
          <Carrousel titulo={"Morse"} cursos={morse} />
        ) : null}
        {/* -------------------------- VACÍO --------------------------- */}
        {senias.length === 0 && braille.length === 0 && morse.length === 0 ? (
          <Empty />
        ) : null}
      </Col>
      <div style={{ position: "fixed", right: 32, bottom: 32 }}>
        <Link href="/crear-curso">
          <Tooltip placement="left" title={"Crear curso nuevo"}>
            <Button
              type="primary"
              shape="circle"
              style={{ width: 80, height: 80 }}
              icon={<PlusOutlined style={{ fontSize: 48 }} />}
            />
          </Tooltip>
        </Link>
      </div>
    </>
  );
};

export default HomeProfesor;
