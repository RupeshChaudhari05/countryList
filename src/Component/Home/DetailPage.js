import React from 'react';
import { Card } from "react-bootstrap";

const DetailPage = ({ state }) => {
  return <>
    <Card className='my-3 '>
      <Card.Body>
        {
          (Object.keys(state.country).length !== 0) ?
            <>
              <div>Continent: <strong>{state.country.continent}</strong></div>
              <div>Country: <strong>{state.country.name}</strong></div>
              <div>Rank: <strong>{state.country.rank}</strong></div>
              <div className='image-row'>Flag: <img src={state.country.flag} alt={state.country.name} width={125} height={75} /></div>
            </>
            : <strong>Please select a country</strong>
        }
      </Card.Body>
    </Card>
  </>;
};

export default React.memo(DetailPage);
