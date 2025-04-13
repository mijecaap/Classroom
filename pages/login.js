import {
  Button,
  Col,
  Input,
  Row,
  Typography,
  Form,
  Modal,
  message,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import "antd/dist/antd.css";

import FirebaseContext from "../firebase/context";
import firebase from "../firebase/firebase";

import { Global, css } from "@emotion/react";
import useEstudiantes from "../hooks/useEstudiantes";
import useProfesores from "../hooks/useProfesores";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const login = () => {
  const [usermain, setUserMain] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState("");
  const [login, setLogin] = useState(true);
  const [textButton, setTextButton] = useState("Crear Cuenta");

  const { usuario } = useContext(FirebaseContext);
  const [form] = Form.useForm();

  const { estudiantes } = useEstudiantes();
  const { profesores } = useProfesores();

  const showModal = (title) => {
    form.resetFields();
    setIsModalVisible(true);
    setType(title);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeButton = () => {
    form.resetFields();
    setLogin(!login);
    if (!login) setTextButton("Crear Cuenta");
    else setTextButton("Iniciar Sesión");
  };

  async function iniciarSesion(values) {
    try {
      const userCredentials = await firebase.login(
        values.email,
        values.password
      );
      if (type === "estudiante") {
        const findEstudiante = estudiantes.find(
          (estudiante) => estudiante.uid === userCredentials.user.uid
        );
        if (findEstudiante) {
          return Router.push("/");
        } else {
          firebase.cerrarSesion();
          message.error("Estudiante no encontrado");
          form.resetFields();
        }
      } else if (type === "profesor") {
        const findProfesor = profesores.find(
          (profesor) => profesor.uid === userCredentials.user.uid
        );
        if (findProfesor) {
          Router.push("/");
        } else {
          firebase.cerrarSesion();
          message.error("Profesor no encontrado");
          form.resetFields();
        }
      } else {
        firebase.cerrarSesion();
        message.error("Usuario no encontrado");
        form.resetFields();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function crearCuenta(values) {
    try {
      console.log("creando cuenta");
      await firebase.registrar(
        values.name,
        values.email,
        values.password,
        type
      );
      Router.push("/");
    } catch (error) {
      console.log("Hubo un error al crear el usuario ", error);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Global
        styles={css`
          .container-class {
            padding: 20px;
            background-color: rgba(0, 0, 0, 0.75);
            border-radius: 5px;
            cursor: pointer;
            &:hover {
              background-color: rgba(0, 0, 0, 0.9);
            }
          }
        `}
      />
      <Head>
        <title>Login</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Modal
        title="Ingresar"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="change" onClick={() => changeButton()} type="primary">
            {textButton}
          </Button>,
        ]}
      >
        {login ? (
          <Col span={24}>
            <Row style={{ marginBottom: 15 }}>
              <Col span={24}>
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                  Iniciar sesión como {type}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form
                  name="basic"
                  form={form}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={iniciarSesion}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message:
                          "Porfavor ingrese un correo electrónico válido",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Email"
                      id="email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Porfavor ingrese su contraseña",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      type="password"
                      placeholder="Contraseña"
                      id="password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Iniciar Sesión
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        ) : (
          <Col span={24}>
            <Row style={{ marginBottom: 15 }}>
              <Col span={24}>
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                  Crear cuenta de {type}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form
                  name="basic"
                  form={form}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={crearCuenta}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Porfavor ingrese su nombre",
                      },
                      {
                        min: 10,
                        message: "Como mínimo 10 caracteres",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Nombre Completo"
                      id="name"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message:
                          "Porfavor ingrese un correo electrónico válido",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Email"
                      id="email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Porfavor ingrese su contraseña",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      type="password"
                      placeholder="Contraseña"
                      id="password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Crear Cuenta
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        )}
      </Modal>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundImage:
            "url(https://images.pexels.com/photos/6321269/pexels-photo-6321269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Row align="middle" style={{ height: "100%" }}>
          <Col span={5} />
          <Col
            span={6}
            className="container-class"
            onClick={() => showModal("estudiante")}
          >
            <Row>
              <Col span={24}>
                <Typography.Title
                  style={{ textAlign: "center", color: "white" }}
                >
                  Estudiante
                </Typography.Title>
              </Col>
              <Col
                span={24}
                style={{
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  shape="square"
                  size={128}
                  src="https://firebasestorage.googleapis.com/v0/b/classroom-inclusive.appspot.com/o/assets%2Fstudent.png?alt=media&token=c40e23c3-97e7-463e-acb6-23fa603024ea"
                />
              </Col>
            </Row>
          </Col>
          <Col span={2} />
          <Col
            span={6}
            className="container-class"
            onClick={() => showModal("profesor")}
          >
            <Row>
              <Col span={24}>
                <Typography.Title
                  style={{ textAlign: "center", color: "white" }}
                >
                  Profesor
                </Typography.Title>
              </Col>
              <Col
                span={24}
                style={{
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  shape="square"
                  size={128}
                  src="https://firebasestorage.googleapis.com/v0/b/classroom-inclusive.appspot.com/o/assets%2Fteacher.png?alt=media&token=a6791e7e-3a68-4c78-8e4d-798422559535"
                />
              </Col>
            </Row>
          </Col>
          <Col span={5} />
        </Row>
      </div>
    </>
  );
};

export default login;
