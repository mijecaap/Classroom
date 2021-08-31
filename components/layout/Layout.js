import React, { useContext } from "react";
import { Button, Col, Layout, Row, Typography } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import FirebaseContext from "../../firebase/context";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

const LayoutMain = (props) => {
  const router = useRouter();
  const { usuario, firebase } = useContext(FirebaseContext);

  return (
    <>
      <Head>
        <title>Taller Sistema</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          className="site-layout-background"
          style={{ position: "fixed", zIndex: 1, width: "100%" }}
        >
          <Row justify="space-between" align="middle">
            <Col span={18}>
              <Typography.Title
                style={{
                  color: "white",
                  lineHeight: 0,
                  marginTop: "15px",
                  marginLeft: "15px",
                }}
              >
                Bienvenido {usuario.displayName}
              </Typography.Title>
            </Col>
            <Col span={4}>
              <Row justify="center">
                <Col>
                  <Typography.Paragraph>Tipo:</Typography.Paragraph>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      firebase.cerrarSesion();
                      router.push("/login");
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <main>{props.children}</main>
        </Content>
      </Layout>
    </>
  );
};

export default LayoutMain;
