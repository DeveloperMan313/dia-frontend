import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Lamp } from "../types";
import { apiService } from "../services/api";

const LampDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lamp, setLamp] = useState<Lamp | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      loadLamp(parseInt(id));
    }
  }, [id]);

  const loadLamp = async (lampId: number) => {
    try {
      setLoading(true);
      setError("");
      const lampData = await apiService.getLampById(lampId);
      setLamp(lampData);
    } catch (err) {
      setError("Ошибка при загрузке данных лампы");
      console.error("Error loading lamp:", err);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultImage = () => {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNjAiIGZpbGw9IiNERUUwRjMiLz4KPHJlY3QgeD0iMTIwIiB5PSIyMDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iODAiIHJ4PSIxMCIgZmlsbD0iI0YwRjBGMCIgc3Ryb2tlPSIjREVFMEYzIiBzdHJva2Utd2lkdGg9IjMiLz4KPC9zdmc+Cg==";
  };

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
            <Spinner animation="border" role="status" className="mt-5">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Row>
          <Col>
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!lamp) {
    return (
      <Container>
        <Row>
          <Col>
            <Alert variant="warning" className="mt-3">
              Лампа не найдена
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Главная</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/lamps">Услуги (Лампы)</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {lamp.title}
              </li>
            </ol>
          </nav>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={lamp.image_url || getDefaultImage()}
              style={{ height: "400px", objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getDefaultImage();
              }}
            />
          </Card>
        </Col>

        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title className="h2 mb-3">{lamp.title}</Card.Title>

              <div className="mb-4">
                <Badge bg="primary" className="me-2 mb-2 p-2">
                  LED технология
                </Badge>
                <Badge bg="success" className="me-2 mb-2 p-2">
                  Энергоэффективная
                </Badge>
              </div>

              <Row className="mb-4">
                <Col>
                  <h5 className="text-primary mb-3">
                    Технические характеристики
                  </h5>
                  <div className="d-grid gap-3">
                    <div className="d-flex justify-content-between border-bottom pb-2">
                      <strong>Световой поток:</strong>
                      <span className="text-end">
                        {lamp.luminous_flux_lm.toLocaleString()} лм
                      </span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom pb-2">
                      <strong>Мощность:</strong>
                      <span className="text-end">{lamp.power_w} Вт</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom pb-2">
                      <strong>Угол рассеивания:</strong>
                      <span className="text-end">
                        {lamp.scattering_angle_deg}°
                      </span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom pb-2">
                      <strong>Эффективность:</strong>
                      <span className="text-end">
                        {Math.round(lamp.luminous_flux_lm / lamp.power_w)} лм/Вт
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <h5 className="text-primary mb-3">Применение</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Жилые помещения</li>
                    <li className="mb-2">✓ Офисные пространства</li>
                    <li className="mb-2">✓ Торговые залы</li>
                    <li className="mb-2">✓ Промышленные объекты</li>
                  </ul>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h5 className="text-primary mb-3">Преимущества</h5>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <div className="text-center">
                        <div className="h4 text-success mb-1">85%</div>
                        <small className="text-muted">Экономия энергии</small>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="text-center">
                        <div className="h4 text-success mb-1">50k</div>
                        <small className="text-muted">Часов работы</small>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="mt-4">
                <div className="d-grid gap-2">
                  <Link to="/lamps" className="btn btn-outline-primary">
                    ← Назад к каталогу
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Расчет освещения</Card.Title>
              <Card.Text>
                Для расчета необходимого количества ламп данного типа для вашего
                помещения, перейдите в раздел расчета освещения. Наша система
                автоматически определит оптимальное количество светильников на
                основе площади помещения, высоты потолков и требуемого уровня
                освещенности.
              </Card.Text>
              <div className="alert alert-info">
                <strong>Совет:</strong> Для жилых помещений рекомендуется
                освещенность 150-300 лк, для офисов - 300-500 лк, для торговых
                залов - 500-1000 лк.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LampDetailPage;
