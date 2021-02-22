import React, { useState } from 'react';
import ActionsPanel from './actions-panel/ActionsPanel';
import './App.css';
import FleetStatus from './fleet-status/FleetStatus';
import MapGrid from './map-grid/MapGrid';
import PlanetStatus from './planet-status/PlanetStatus';
import { game, controller } from './game';

/** Main App Component */
export default function App() {
  const [planet, setPlanet] = useState(game.playerFleet.planet);

  const [sim, updateSim] = useState(game);

  const update = () => {
    updateSim(sim);
  };

  return (
    <div className="App">
      <MapGrid planets={sim.getAllPlanets()} onSelectPlanet={setPlanet} />
      <div>
        StarDate: {sim.stardate}
        <PlanetStatus planet={planet} />
        <FleetStatus fleet={sim.playerFleet} />
        <ActionsPanel fleet={sim.playerFleet} planet={planet} controller={controller} onUpdate={update} />
      </div>
    </div>
  );
}
