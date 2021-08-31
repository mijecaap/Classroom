import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
  message,
  Card,
  Button,
  Typography,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import FirebaseContext from "../firebase/context";
import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import TextArea from "antd/lib/input/TextArea";
import { v4 as uuid_v4 } from "uuid";
import { Global, css } from "@emotion/react";
import { useRouter } from "next/router";

function getBase64(img, callback) {
  console.log(img);
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Sólo puede cargar archivos JPG/PNG.");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("La imagen debe ser inferior a 2 MB.");
  }
  return isJpgOrPng && isLt2M;
}

const CrearCurso = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
  const [form] = Form.useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageurl] = useState();
  const [imageId, setImageId] = useState("");

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageurl(imageUrl);
        setLoading(false);
      });
    }
  };

  async function subirImagen({ onError, onSuccess, file, onProgress }) {
    const fileId = uuid_v4();
    setImageId(fileId);
    const fileRef = firebase.storage.ref("cursos").child(fileId);
    try {
      const image = fileRef.put(file, {
        customMetadata: {
          uploadedBy: usuario.displayName,
          fileName: file.name,
        },
      });
      onSuccess(null, image);
    } catch (e) {
      onError(e);
    }
  }

  async function crearCurso(values) {
    if (!usuario) {
      return router.push("/login");
    }

    if (!imageUrl) {
      return message.error("Ingrese una foto");
    }

    const { type, title, link, description } = values;
    const urlimagen = await firebase.storage
      .ref("cursos")
      .child(imageId)
      .getDownloadURL();

    const curso = {
      creator: {
        name: usuario.displayName,
        id: usuario.uid,
      },
      type,
      title,
      link,
      description,
      urlimagen,
      date: Date.now(),
    };

    console.log(curso);

    firebase.db.collection("cursos").add(curso);
    setImageurl();

    message.success("Curso Creado");

    form.resetFields();
  }

  return (
    <>
      <Global
        styles={css`
          .ant-upload-picture-card-wrapper {
            height: 100%;
          }
          .ant-upload.ant-upload-select-picture-card {
            width: 100%;
            height: 100%;
          }
        `}
      />
      {usuario ? (
        <Layout>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 6 }}
            size="large"
            initialValues={{ remember: true }}
            onFinish={crearCurso}
            onFinishFailed={() => console.log("Error")}
          >
            <Row justify="center" align="center">
              <Card style={{ width: "80%", marginTop: 32, marginBottom: 32 }}>
                <Row>
                  <Col span={24}>
                    <Typography.Title level={2} style={{ textAlign: "center" }}>
                      Creación de Curso
                    </Typography.Title>
                  </Col>
                </Row>
                <Row style={{ margin: "16px 0" }} gutter={24}>
                  <Col span={12}>
                    {/* ----------------------- TIPO ----------------------- */}
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Tipo"
                          name="type"
                          rules={[
                            {
                              required: true,
                              message: "Seleccione uno",
                            },
                          ]}
                        >
                          <Select placeholder="Escoja uno">
                            <Select.Option value="Lenguaje de Señas">
                              Lenguaje de Señas
                            </Select.Option>
                            <Select.Option value="Braille">
                              Braille
                            </Select.Option>
                            <Select.Option value="Morse">
                              Codigo Morse
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* ----------------------- TITULO ----------------------- */}
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Titulo"
                          name="title"
                          rules={[
                            {
                              required: true,
                              message: "Ingrese un titulo",
                            },
                            {
                              min: 5,
                              message: "Mínimo 5 caracteres",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* ----------------------- LINK ----------------------- */}
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Link video"
                          name="link"
                          rules={[
                            {
                              required: true,
                              message: "Ingrese un link al video",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* ----------------------- DESCRIPCION ----------------------- */}
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Descripción"
                          name="description"
                          rules={[
                            {
                              required: true,
                              message: "Seleccione una descripción",
                            },
                          ]}
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* ----------------------- BUTTON ----------------------- */}
                    <Row justify="end">
                      <Button onClick={() => router.push("/")}>Atrás</Button>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Crear Curso
                        </Button>
                      </Form.Item>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                      customRequest={subirImagen}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Col>
                </Row>
              </Card>
            </Row>
          </Form>
        </Layout>
      ) : null}
    </>
  );
};

export default CrearCurso;
