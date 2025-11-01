import type { FC } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { Lamp } from "../types";

export const LampCard: FC<Lamp> = ({
  id,
  title,
  luminous_flux_lm,
  image_url,
}) => {
  const stockLampImageURL = "/lamp-stock.jpg";

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    if (e.currentTarget.src.endsWith(stockLampImageURL)) return;
    e.currentTarget.src = stockLampImageURL;
  };

  return (
    <Card className="lamp-card lamp-card_vertical">
      <a className="lamp-card__a" href={`/lamps/${id}`}>
        <Card.Img
          className="lamp-card__image"
          variant="top"
          src={image_url || stockLampImageURL}
          onError={handleImageError}
        />
      </a>
      <Container className="lamp-card__body-wrapper">
        <Card.Body className="lamp-card__body">
          <a className="lamp-card__a" href={`/lamps/${id}`}>
            <Card.Title className="lamp-card__title">{title}</Card.Title>
          </a>
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
