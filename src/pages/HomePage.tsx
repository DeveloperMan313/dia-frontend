import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Container style={{ paddingTop: "8.75rem" }}>
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 mb-4">Let There Be Light</h1>
            <p className="lead">Расчет освещения помещений</p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5 justify-content-center">
        <Col xs="auto">
          <Link to="/lamps">
            <Button className="button button_primary">К каталогу</Button>
          </Link>
        </Col>
      </Row>

      <Card className="h-100 mb-5">
        <Card.Body>
          <Card.Title>О нашем сервисе</Card.Title>
          <Card.Text>
            Мы предоставляем профессиональные услуги по расчету и подбору
            освещения для различных типов помещений. Наша система позволяет
            точно определить необходимое количество светильников для создания
            комфортной и эффективной световой среды.
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="mb-5">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Как это работает</Card.Title>
              <Row>
                <Col md={4} className="text-center mb-3">
                  <div className="h4 text-primary">1</div>
                  <h5>Выбор ламп</h5>
                  <p>
                    Ознакомьтесь с нашим каталогом современных ламп и выберите
                    желаемые модели
                  </p>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div className="h4 text-primary">2</div>
                  <h5>Расчет</h5>
                  <p>
                    Наша система автоматически рассчитает необходимое количество
                    ламп
                  </p>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div className="h4 text-primary">3</div>
                  <h5>Результат</h5>
                  <p>Получите готовое решение</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
