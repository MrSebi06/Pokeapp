import "../style/pokedex.css";
import { useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import ListNavigation from "./ListNavigation";

function Pokedex() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [limit, setLimit] = useState(9*3);
    const [offset, setOffset] = useState(1);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + (offset-1)*limit)
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
        const val = Number(event.target.value);
        setOffset(val);
        setIsLoaded(false);
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + (val-1)*limit)
        .then(res => res.json())
        .then(data => {
            setIsLoaded(true);
            setPokemons(data.results);   
        });
    };

    const pokemonList = pokemons
    .map((pokemon, index) => (
        <Pokemon
            id={((offset-1)*limit)+index+1}
            key={index}
            name={pokemon.name}
            url={pokemon.url}
        />
    ))    

    if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="pokedex">
                    <h1>Pokedex</h1>
                    <div className="pokemonList">
                        Loading...
                    </div>
                </div>
            );
        } else {
            return (
                <div className="pokedex">
                    <h1>Pokedex</h1>
                    <ListNavigation className="listNav" offset={Number(offset)} handleChange={handleChange}/>
                    <div className="pokemonList">
                        {pokemonList}
                    </div>
                    {/* <input type="number" min="1" value="1" onChange={handleChange}/>  */}
                </div>
            );
        }
}

export default Pokedex;