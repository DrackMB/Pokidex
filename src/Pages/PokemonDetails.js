import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import Loader from "../Components/Loader";
import PokemonEvolution from "./PokemonEvolution";

const PokemonDetails = () => {
  
  const matchs = useParams();
  const [pokemonDetails, setPokemonDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [pokemonEvolution, setPokemonEvolution] = useState();

  const id = matchs.id;
  const urlSimpleData = "https://pokeapi.co/api/v2/pokemon/";

  const getPokemon = async (id) => {
    const details = await getPokemonData(id, urlSimpleData);
    setPokemonDetails(details.data);
    
    setLoading(false);
  };

  const getPokemonEvolution = async (id) => {
    const details = await getPokemonData(id, urlSimpleData);
    const species = details.data.species.url;
    const evolution_chain = await axios.get(species);
    const evolution = await axios.get(evolution_chain.data.evolution_chain.url);

    //setPokemonEvolution(evolution.data.chain.evolves_to);
    let dataees = evolution.data.chain;
    let test = [dataees.species.name];
    while (Object.keys(dataees).length > 0) {
      if (dataees.evolves_to != null) {
        if (Object.keys(dataees.evolves_to).length > 0) {
          dataees = dataees.evolves_to[0];
          test = [dataees.species.name, ...test];
        } else {
          return setPokemonEvolution(test);
        }
      } else {
        console.log("data 3 : " + dataees.evolves_to);
        test = [dataees.species, ...test];
        return console.log(test);
      }
    }
  };

  const getPokemonData = async (id, url) => {
    const res = await axios.get(url + id);
    return res;
  };

  useEffect(() => {
    getPokemon(id);
  }, []);
  useEffect(() => {
    getPokemonEvolution(id);
  });
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card
              className="my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white"
              style={{ border: "none" }}
            >
              <Link to={`/pokemon/${pokemonDetails.id}`}>
                <Card.Img
                  style={{ width: "15rem" }}
                  src={pokemonDetails.sprites.front_default}
                  variant="top"
                />
              </Link>
              <Card.Body
                className={`${pokemonDetails.types[0].type.name} rounded text-white`}
              >
                <Link
                  to={`/pokemon/${pokemonDetails.name}`}
                  className="link-name"
                >
                  <Card.Title as="div">
                    <strong>
                      #{pokemonDetails.id}{" "}
                      {pokemonDetails.name.charAt(0).toUpperCase() +
                        pokemonDetails.name.slice(1)}
                    </strong>
                  </Card.Title>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card
              className="p-3 rounded text-center shadow p-3 mb-5 bg-white"
              style={{ border: "none" }}
            >
              <Card.Body>
                <Card.Text>
                  <Row>
                    {pokemonDetails.types.map((t) => (
                      <Col key={t.type.name}>
                        <div
                          className={`${t.type.name} rounded px-4 py-1`}
                          style={{ color: "white" }}
                        >
                          {t.type.name.toUpperCase()}
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    <Col>
                      <Card.Img
                        style={{ width: "15rem" }}
                        src={pokemonDetails.sprites.front_default}
                      />
                      <Card.Text>Normal Form</Card.Text>
                    </Col>
                    <Col>
                      <Card.Img
                        style={{ width: "15rem" }}
                        src={pokemonDetails.sprites.front_shiny}
                      />
                      <Card.Text>Shiny Form</Card.Text>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div
                        className="px-4 py-1 rounded"
                        style={{ border: "1px black solid" }}
                      >
                        Abilities
                      </div>
                    </Col>
                  </Row>
                  <Row className="text-center">
                    {pokemonDetails.abilities.map((a) => (
                      <Col
                        key={a.ability.name}
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <div className={`rounded px-4 py-1`}>
                          {a.ability.name.toUpperCase()}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card>
              {pokemonDetails.types.map((t) => (
                <Card.Header key={t.type.name}
                  className={`${t.type.name} rounded px-4 py-1 head-text `}
                  style={{ color: "white" }}
                >
                  Evolution
                </Card.Header>
              ))}

              {pokemonEvolution != null ? (
                <PokemonEvolution data={pokemonEvolution} />
              ) : (
                <div>test</div>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PokemonDetails;
