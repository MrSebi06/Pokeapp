import "../style/pokedex.css";
import { useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import ListNavigation from "./ListNavigation";

function Pokedex() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [limit, setLimit] = useState(9);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + offset*limit)
        .then(res => res.json())
        .then(data => {
            setIsLoaded(true);
            setPokemons(data.results);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);    
        });
        }, []
    );


    const handleChange = (event) => {
        console.log(event.target.value);
        // fetch('https://pokeapi.co/api/v2/pokemon/?offset=' + event.target.textContent)
        // .then(res => res.json())
        // // .then(data => {
        //     setIsLoaded(true);
        //     setPokemons(data.results);   
        // });
        setOffset(event.target.value);
    };

    const pokemonList = pokemons
    .map((pokemon, index) => (
        <Pokemon
            id={index+1}
            name={pokemon.name}
            url={pokemon.url}
        />
    ))    

    if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="pokedex">
                    <h1>Pokedex</h1>
                    <div className="pokemonList">
                        <ListNavigation offset={offset} handleChange={handleChange}/>
                        {pokemonList}
                    </div>
                    {/* <input type="number" min="1" value="1" onChange={handleChange}/>  */}
                </div>
            );
        }
}

export default Pokedex;