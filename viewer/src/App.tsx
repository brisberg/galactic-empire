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

  const update = useForceUpdate();

  return (
    <div className="App">
      <MapGrid planets={game.getAllPlanets()} onSelectPlanet={setPlanet} />
      <div>
        StarDate: {game.stardate}
        <PlanetStatus planet={planet} />
        <FleetStatus fleet={game.playerFleet} />
        <ActionsPanel fleet={game.playerFleet} planet={planet} controller={controller} onUpdate={update} />
      </div>
    </div>
  );
}

/** Custom React Hook to trigger a re-render of the component */
function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
