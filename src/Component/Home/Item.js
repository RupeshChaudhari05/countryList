import React from 'react';
import { Card } from "react-bootstrap";

const Item = ({ data }) => {
  const { name, flag, rank, continent } = data;
  return <>
    <Card className='custome-margin'>
      <Card.Body>
        <Card.Title>Country: {name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Continent: {continent}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Rank: {rank}</Card.Subtitle>
        <Card.Text>
          <img src={flag} alt={name} width={125} height={75} />
        </Card.Text>
      </Card.Body>
    </Card>
  </>;
};

export default Item;
