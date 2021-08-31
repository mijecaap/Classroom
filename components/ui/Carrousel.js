import { Card, Carousel, Col, Row, Typography } from "antd";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Curso from "./Curso";

const Carrousel = ({ titulo, cursos }) => {
  const [four, setFour] = useState([]);

  const LONGITUD_CARROUSEL = 4;
  const cursoSplit = [];

  useEffect(() => {
    for (let i = 0; i < cursos.length; i += LONGITUD_CARROUSEL) {
      let split = cursos.slice(i, i + LONGITUD_CARROUSEL);
      console.log(split);
      cursoSplit.push(split);
    }
    setFour(cursoSplit);
    // console.log(cursoSplit);
  }, [cursos]);

  return (
    <>
      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <Typography.Title level={2}>Cursos de {titulo}</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Carousel>
            {four.map((cursos, i) => (
              <div key={i}>
                <Row
                  gutter={16}
                  style={{
                    backgroundColor: "#364d79",
                    padding: "15px 15px 60px 15px",
                  }}
                >
                  {cursos.map((curso, i) => (
                    <Curso curso={curso} key={i} />
                  ))}
                </Row>
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default Carrousel;
