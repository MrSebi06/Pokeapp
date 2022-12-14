import { useEffect, useState } from "react";
import "../style/pokemon.css"

function Pokemon(props){
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);
    const [sprite, setSprite] = useState("");
    const [stats, setStats] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetch(props.url)
        .then((res) => res.json())
        .then((data) => {
            setIsLoaded(true);
            setSprite(data.sprites.front_default);
            setStats(data.stats);
            setTypes(data.types);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);    
        });
    }, []);


    const statList = stats
    .map(stat => (
        <p>{stat.base_stat}</p>
    ));

    const typesList = types
    .map(type => (
        <img key={props.name + "_" + type.type.name} className="type" src={"assets/types/" + type.type.name + "_type.svg"} alt={type.type.name}/>
    ));


    const statValues = stats.map((stat) => (stat.base_stat));

    statValues.splice(5, 1);
    statValues.splice(0, 1);

    const max = Math.max(...statValues);

    console.log(props.name, statValues, max);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="pokemon">Loading...</div>;
    } else {
        return (
            <div className="pokemon">
                <h3>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h3>
                <img className="sprite" src={sprite} alt={props.name} />
                <div className="stats">
                    <label>Stats</label>

                    <div className="types">
                        {typesList}
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <div className="hp">
                                        <h4>HP : </h4>
                                        {statList[0]}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className={(statValues[0] === max) ? "attack max" : "attack"}>
                                        <h4>ATK : </h4>
                                        {statList[1]}
                                    </div>
                                </td>

                                <td>
                                    <div className={(statValues[1] === max) ? "defense max" : "defense"}>
                                        <h4>DEF : </h4>
                                        {statList[2]}
                                    </div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <div className={(statValues[2] === max) ? "special-attack max" : "special-attack"}>
                                        <h4>SP. A : </h4>
                                        {statList[3]}
                                    </div>
                                </td>

                                <td>
                                    <div className={(statValues[3] === max) ? "special-defense max" : "special-defense"}>
                                        <h4>SP. D : </h4>
                                        {statList[4]}
                                    </div>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <label>{props.id}</label>
            </div>
        );
    }
}
export default Pokemon;