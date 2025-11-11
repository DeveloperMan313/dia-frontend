import React, { useState, useEffect } from "react";
import { Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import { Lamp, RequestBin } from "../types";
import { apiService } from "../services/api";
import { LampCard } from "../components/LampCard";
import { TextInput } from "../components/TextInput";
import { RequestBinIcon } from "../components/RequestBinIcon";

const LampsPage: React.FC = () => {
  const [lamps, setLamps] = useState<Lamp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [requestBin, setRequestBin] = useState<RequestBin>({
    request_id: 0,
    item_count: -1,
  });

  useEffect(() => {
    loadLamps();
    loadRequestBin();
  }, []);

  const loadLamps = async () => {
    try {
      setLoading(true);
      setError("");
      const lampsData = await apiService.getLamps(searchTitle);
      setLamps(lampsData);
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error("Error loading lamps:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadRequestBin = async () => {
    try {
      const requestBinData = await apiService.getRequestBin();
      setRequestBin(requestBinData);
    } catch (err) {
      console.error("Error loading request bin:", err);
    }
  };

  const handleSearchEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      loadLamps();
    }
  };

  return (
    <div className="page-lamps">
      <h1>Приборы</h1>
      <div className="page-lamps__search-section">
        <TextInput
          type="text"
          value={searchTitle}
          placeholder="Поиск приборов"
          onChange={(e) => setSearchTitle(e.target.value)}
          onKeyDown={handleSearchEnterKey}
        />
        <Button
          className="button button_primary page-lamps__search-button"
          onClick={loadLamps}
        >
          <svg
            className="page-lamps__search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
            />
          </svg>
        </Button>
      </div>

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
        <div className="page-lamps__lamp-cards">
          {lamps.length === 0 ? (
            <Col>
              <Alert variant="info" className="text-center">
                Лампы не найдены.
              </Alert>
            </Col>
          ) : (
            lamps.map((lamp) => <LampCard {...lamp} key={lamp.id} />)
          )}
        </div>
      )}

      <RequestBinIcon {...requestBin} />
    </div>
  );
};

export default LampsPage;
