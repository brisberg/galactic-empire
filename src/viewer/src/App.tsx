import React from 'react';
import './App.css';
import FleetStatus, { Fleet } from './fleet-status/FleetStatus';
import MapGrid from './map-grid/MapGrid';
import PlanetStatus, { Planet } from './planet-status/PlanetStatus';

/** Main App Component */
export default function App() {
  const fleet: Fleet = {
    credits: 10000, supply: 2983, supplyMax: 3000, fuel: 1732, fuelMax: 2000,
    fighters: 160, transports: 100, mTransports: 50,
  }

  const planet: Planet = {
    name: 'Galactica',
    techlevel: 'Advanced',
    status: 'Empire',
    population: 50.5,
    position: { x: 15, y: 15 },
  };

  const planets = [
    { x: 3, y: 5 }, { x: 11, y: 2 }, { x: 24, y: 8 }, { x: 29, y: 24 }, { x: 7, y: 15 },
    { x: 11, y: 21 }, { x: 18, y: 13 }, { x: 3, y: 21 }, { x: 6, y: 28 }, { x: 9, y: 18 },
  ];

  return (
    <div className="App">
      <MapGrid planets={planets} />
      <div>
        <PlanetStatus planet={planet} />
        <FleetStatus fleet={fleet} />
      </div>
    </div>
  );
}
