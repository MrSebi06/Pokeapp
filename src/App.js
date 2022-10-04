import logo from './assets/logo.svg';
import './style/App.css';

import Pokedex  from "./components/Pokedex.js";

function App() {
  return (
    <div className="Pokeapp">
      <header className="poke-header">
        <img className="poke-logo" src={logo} alt="Pokeapp logo" />
        <h2>Pokeapp</h2>
      </header>

      <main>
          <Pokedex />
      </main>
    </div>
  );
}

export default App;
