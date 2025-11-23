import { useState, type FC } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { Lamp } from "../types";
import { Link } from "react-router-dom";
import LampIcon from "./LampIcon";

export const LampCard: FC<Lamp> = ({
  id,
  title,
  luminous_flux_lm,
  image_url,
}) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.onerror = null;
    setImageError(true);
  };

  let [imageError, setImageError] = useState(false);

  return (
    <Card className="lamp-card lamp-card_vertical">
      <Link className="lamp-card__a" to={`/lamps/${id}`}>
        {image_url && !imageError ? (
          <Card.Img
            className="lamp-card__image"
            variant="top"
            src={image_url}
            onError={handleImageError}
          />
        ) : (
          <LampIcon className="lamp-card__placeholder" color="#989898" />
        )}
      </Link>
      <Container className="lamp-card__body-wrapper">
        <Card.Body className="lamp-card__body">
          <Link className="lamp-card__a" to={`/lamps/${id}`}>
            <Card.Title className="lamp-card__title">{title}</Card.Title>
          </Link>
          <Card.Text className="lamp-card__about">
            {luminous_flux_lm} лм
          </Card.Text>
          <Button className="button button_primary lamp-card__add-btn">
            В заявку
          </Button>
        </Card.Body>
      </Container>
    </Card>
  );
};
