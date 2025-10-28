import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Lamp, LampFilters } from "../types";
import { apiService } from "../services/api";

const LampsPage: React.FC = () => {
  const [lamps, setLamps] = useState<Lamp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [filters, setFilters] = useState<LampFilters>({
    title: "",
    minPower: undefined,
    maxPower: undefined,
  });

  useEffect(() => {
    loadLamps();
  }, []);

  const loadLamps = async () => {
    try {
      setLoading(true);
      setError("");
      const lampsData = await apiService.getLamps(filters);
      setLamps(lampsData);
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error("Error loading lamps:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (
    field: keyof LampFilters,
    value: string | number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value === "" ? undefined : value,
    }));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadLamps();
  };

  const handleResetFilters = () => {
    setFilters({
      title: "",
      minPower: undefined,
      maxPower: undefined,
    });
  };

  const getDefaultImage = () => {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0RFRTBGMyIvPgo8cmVjdCB4PSI2MCIgeT0iMTIwIiB3aWR0aD0iODAiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSIjRjBGMEYwIiBzdHJva2U9IiNERUUwRjMiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K";
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Каталог ламп</h1>
          <p className="text-muted">
            Выберите подходящие лампы для расчета освещения
          </p>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Фильтры</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleFilterSubmit}>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Название лампы</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Введите название..."
                        value={filters.title || ""}
                        onChange={(e) =>
                          handleFilterChange("title", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Мощность от (Вт)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Мин. мощность"
                        value={filters.minPower || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            "minPower",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Мощность до (Вт)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Макс. мощность"
                        value={filters.maxPower || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            "maxPower",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex align-items-end">
                    <div className="d-grid gap-2 w-100">
                      <Button variant="primary" type="submit">
                        Применить
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={handleResetFilters}
                      >
                        Сбросить
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Error Alert */}
      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {/* Loading Spinner */}
      {loading && (
        <Row className="mb-3">
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
          </Col>
        </Row>
      )}

      {/* Lamps Grid */}
      {!loading && (
        <Row>
          {lamps.length === 0 ? (
            <Col>
              <Alert variant="info" className="text-center">
                Лампы не найдены. Попробуйте изменить параметры фильтра.
              </Alert>
            </Col>
          ) : (
            lamps.map((lamp) => (
              <Col key={lamp.id} lg={4} md={6} className="mb-4">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={lamp.image_url || getDefaultImage()}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = getDefaultImage();
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{lamp.title}</Card.Title>
                    <Card.Text>
                      <strong>Световой поток:</strong> {lamp.luminous_flux_lm}{" "}
                      лм
                      <br />
                      <strong>Мощность:</strong> {lamp.power_w} Вт
                      <br />
                      <strong>Угол рассеивания:</strong>{" "}
                      {lamp.scattering_angle_deg}°
                    </Card.Text>
                    <div className="mt-auto">
                      <Button
                        variant="primary"
                        href={`/lamps/${lamp.id}`}
                        className="w-100"
                      >
                        Подробнее
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
    </Container>
  );
};

export default LampsPage;
