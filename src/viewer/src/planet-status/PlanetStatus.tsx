/** Temporary fleet structure. */
export interface Planet {
  name: string;
  techlevel: string;
  status: string;
  population: number;
  position: { x: number, y: number };
}

export default function PlanetStatus({ planet }: { planet: Planet }): JSX.Element {
  return (
    <div className="planet-status-panel">
      <h3>Planet Status Panel</h3>
      <ul>
        <li>Name: {planet.name}</li>
        <li>Technology: {planet.techlevel}</li>
        <li>Status: {planet.status}</li>
        <li>Population: {planet.population}</li>
      </ul>
    </div>
  );
}
