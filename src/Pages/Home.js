import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Form } from "react-bootstrap";

// Components
import Pokemon from "../Components/Pokemon";
import Loader from "../Components/Loader";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPokemonList = async () => {
    let pokemonArray = [];
    for (let i = 1; i <= 151; i++) {
      pokemonArray.push(await getPokemonData(i));
    }

    setPokemon(pokemonArray);
    setLoading(false);
  };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };
  const pokemonName = (e) => {
    const { value } = e.target;
    if (value.length > 0) {
      const result = pokemon.filter((poki) => {
        return poki.data.name.includes(value);
      });
      if (result.length > 0) setPokemon(result);
      else getPokemonList();
    } else {
      getPokemonList();
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3 m-2" controlId="sercheForm.serche1">
                  <Form.Control
                    style={{ width: "50%" }}
                    type="test"
                    placeholder="name pokemon"
                    onChange={pokemonName}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            {pokemon.map((p) => (
              <Col key={p.data.name} xs={12} sm={12} md={4} lg={4} xl={4}>
                <Pokemon pokemon={p.data} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default Home;
