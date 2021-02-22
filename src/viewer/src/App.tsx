import React, { useState } from 'react';
import ActionsPanel, { PlayerController } from './actions-panel/ActionsPanel';
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

  const planets: Planet[] = [
    { name: 'Galactica', techlevel: 'Advanced', status: 'Empire', population: 50.5, position: { x: 15, y: 15 } },
    { name: 'Winterstone', techlevel: 'Advanced', status: 'Empire', population: 100.5, position: { x: 3, y: 5 } },
    { name: 'Vorex', techlevel: 'Advanced', status: 'Independent', population: 95.5, position: { x: 11, y: 2 } },
    { name: 'Jakle', techlevel: 'Superior', status: 'Empire', population: 34.5, position: { x: 24, y: 8 } },
    { name: 'Bol', techlevel: 'Superior', status: 'Independent', population: 78.5, position: { x: 29, y: 24 } },
    { name: 'Ros\' kel', techlevel: 'Superior', status: 'Independent', population: 23.5, position: { x: 7, y: 15 } },
    { name: 'Spurn', techlevel: 'Limited', status: 'Empire', population: 41.5, position: { x: 11, y: 21 } },
    { name: 'Halifax', techlevel: 'Limited', status: 'Empire', population: 101.5, position: { x: 18, y: 13 } },
    { name: 'Xil\'kar', techlevel: 'Limited', status: 'Independent', population: 110.5, position: { x: 3, y: 21 } },
    { name: 'Terranova', techlevel: 'Limited', status: 'Independent', population: 83.5, position: { x: 6, y: 28 } },
    { name: 'Eventide', techlevel: 'Primitive', status: 'Independent', population: 25.5, position: { x: 9, y: 18 } },
    { name: 'Pak', techlevel: 'Primitive', status: 'Independent', population: 15.5, position: { x: 14, y: 9 } },
  ];

  const controller: PlayerController = {
    embark: () => console.log('embark'),
    collectTaxes: () => console.log('collectTaxes'),
    purchaseSupplies: () => console.log('purchaseSupplies'),
    purchaseFuel: () => console.log('purchaseFuel'),
  }

  const [planet, setPlanet] = useState(planets[0]);

  return (
    <div className="App">
      <MapGrid planets={planets} onSelectPlanet={setPlanet} />
      <div>
        <PlanetStatus planet={planet} />
        <FleetStatus fleet={fleet} />
        <ActionsPanel fleet={fleet} planet={planet} controller={controller} />
      </div>
    </div>
  );
}
