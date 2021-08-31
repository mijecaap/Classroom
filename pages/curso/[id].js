import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import FirebaseContext from "../../firebase/context";
import Layout from "../../components/layout/Layout";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Row,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { HomeOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const Curso = () => {
  // state del componente
  const [curso, guardarCurso] = useState({});
  const [error, guardarError] = useState(false);
  //const [comentario, guardarComentario] = useState({});
  const [consultarDB, guardarConsultarDB] = useState(true);

  // Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  console.log(id);

  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerCurso = async () => {
        const productoQuery = await firebase.db.collection("cursos").doc(id);
        const curso = await productoQuery.get();
        if (curso.exists) {
          guardarCurso(curso.data());
          guardarConsultarDB(false);
        } else {
          guardarError(true);
          guardarConsultarDB(false);
        }
      };
      obtenerCurso();
    }
  }, [id, consultarDB]);

  if (Object.keys(curso).length === 0 && !error)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          lineHeight: "100vh",
          textAlign: "center",
          background: "rgba(0,0,0,0.05)",
        }}
      >
        <Spin size="large" />
      </div>
    );

  const { creator, date, description, link, title, type, urlimagen } = curso;

  // función que revisa que el creador del producto sea el mismo que esta autenticado
  const puedeBorrar = () => {
    if (!usuario) return false;

    if (creator.id === usuario.uid) {
      return true;
    }
  };

  // elimina un producto de la bd
  const eliminarCurso = async () => {
    if (!usuario) {
      return router.push("/login");
    }

    if (creator.id !== usuario.uid) {
      return router.push("/");
    }

    try {
      await firebase.db.collection("cursos").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <h1>Error404</h1>
        ) : (
          <>
            <Row justify="center" align="center">
              <Card style={{ width: "80%", marginTop: 32, marginBottom: 32 }}>
                <Row justify="start">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/">
                      <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{type}</Breadcrumb.Item>
                  </Breadcrumb>
                </Row>
                <Row>
                  <Col span={24}>
                    <Typography.Title level={2} style={{ textAlign: "center" }}>
                      {title}
                    </Typography.Title>
                  </Col>
                </Row>
                <Row style={{ margin: "16px 0" }} gutter={24} align="middle">
                  <Col span={12}>
                    {/* ---------------------- CREADO POR ------------------- */}
                    <Row>
                      <Col span={24}>
                        <Typography.Text>Creado por:</Typography.Text>
                      </Col>
                      <Col span={24}>
                        <Typography.Title level={3}>
                          {creator.name}
                        </Typography.Title>
                      </Col>
                    </Row>
                    {/* ---------------------- DESCRIPCIÓN ------------------- */}
                    <Row>
                      <Col span={24}>
                        <Typography.Text>Descripción:</Typography.Text>
                      </Col>
                      <Col span={24}>
                        <Typography.Title level={4}>
                          {description}
                        </Typography.Title>
                      </Col>
                    </Row>
                    {/* ---------------------- FECHA ------------------- */}
                    <Row>
                      <Col span={24}>
                        <Typography.Text>Publicado hace </Typography.Text>
                        <Typography.Text>
                          {formatDistanceToNow(new Date(date), { locale: es })}
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <ReactPlayer
                      url={link}
                      width={"100%"}
                      height={300}
                      controls={true}
                    />
                  </Col>
                </Row>
              </Card>
            </Row>
            {puedeBorrar() ? (
              <div style={{ position: "fixed", right: 32, bottom: 32 }}>
                <Tooltip placement="left" title={"Borrar Curso"}>
                  <Button
                    type="primary"
                    shape="circle"
                    style={{ width: 80, height: 80 }}
                    onClick={eliminarCurso}
                    icon={<DeleteOutlined style={{ fontSize: 36 }} />}
                    danger
                  />
                </Tooltip>
              </div>
            ) : null}
          </>
        )}
      </>
    </Layout>
  );
};

export default Curso;
