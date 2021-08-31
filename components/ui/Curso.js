import { Card, Col } from "antd";
import Link from "next/link";
import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const Curso = ({ curso }) => {
  const { id, title, description, urlimagen, date } = curso;
  const dateNow = "Hace " + formatDistanceToNow(new Date(date), { locale: es });
  return (
    <Link href="/curso/[id]" as={`/curso/${id}`}>
      <Col span={6}>
        <Card
          hoverable={true}
          cover={
            <img
              alt="example"
              src={urlimagen}
              style={{ height: 150, objectFit: "cover" }}
            />
          }
        >
          <Card.Meta title={title} description={dateNow} />
        </Card>
      </Col>
    </Link>
  );
};

export default Curso;
