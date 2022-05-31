import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";


const PokemonEvolution = (data) => {
  const [pokiData, setPokiData] = useState();


  const urlSimpleData = "https://pokeapi.co/api/v2/pokemon/";


  const getPucturOfPockemon = async (data) => {
    var evo = [];
    for (var d of data.data) {
      const res = await axios.get(urlSimpleData + d);
      evo = [...evo, res.data];
    }
     setPokiData(evo);
    return pokiData
  };
  
  useEffect(() => {
    getPucturOfPockemon(data);
  }, [pokiData]);

  return (
    <div>
      {pokiData == null? (
        <div>Null</div>
      ) : (pokiData.map( pokiData =>(
        <Col key ={pokiData.id}  className="d-inline-block m-2 " xs={12} sm={12} md={3} lg={3} xl={3}>
        <Card className='my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white rounded '  style={{ border: 'none' }}>
                  <Card.Img style={{ width: '8rem' }} src={pokiData.sprites.front_default} variant='top'/>
              <Card.Body className={`${pokiData.types[0].type.name} rounded text-white`}>
                  <Card.Title as='div'><strong>#{pokiData.id} {pokiData.name.charAt(0).toUpperCase() + pokiData.name.slice(1)}</strong></Card.Title>
              </Card.Body>
          </Card>
        </Col>
      ))
      )}
    </div>
  );
};

export default PokemonEvolution;
