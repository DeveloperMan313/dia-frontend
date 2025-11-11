import React, { useState, useEffect } from "react";
import { Row, Col, Alert, Spinner, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
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

  const stockLampImageURL = "/lamp-stock.jpg";

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    if (e.currentTarget.src.endsWith(stockLampImageURL)) return;
    e.currentTarget.src = stockLampImageURL;
  };

  if (loading) {
    return (
      <div className="page-lamp">
        <Row className="justify-content-center">
          <Col className="text-center">
            <Spinner animation="border" role="status" className="mt-5">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
          </Col>
        </Row>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-lamp">
        <Row>
          <Col>
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          </Col>
        </Row>
      </div>
    );
  }

  if (!lamp) {
    return (
      <div className="page-lamp">
        <Row>
          <Col>
            <Alert variant="warning" className="mt-3">
              Лампа не найдена
            </Alert>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="page-lamp">
      <h1>О приборе</h1>
      <div className="page-lamp__main">
        <Image
          className="page-lamp__image"
          src={lamp.image_url || stockLampImageURL}
          onError={handleImageError}
        />
        <div className="page-lamp__info">
          <h2>{lamp.title}</h2>
          <div>
            <p className="page-lamp__property">
              <span>Мощность</span>
              <span>{lamp.power_w} вт</span>
            </p>
            <p className="page-lamp__property">
              <span>Световой поток</span>
              <span>{lamp.luminous_flux_lm} лм</span>
            </p>
            <p className="page-lamp__property">
              <span>Угол рассеивания</span>
              <span>{lamp.scattering_angle_deg} °</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LampDetailPage;
