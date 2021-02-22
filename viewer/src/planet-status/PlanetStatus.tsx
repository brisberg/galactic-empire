import { Planet } from "../engine/planet/planet";

/** Information Display panel for the currently selected Planet */
export default function PlanetStatus({ planet }: { planet: Planet }): JSX.Element {
  return (
    <div className="planet-status-panel">
      <h3>Planet Status Panel</h3>
      <ul>
        <li>Name: {planet.name}</li>
        <li>Technology: {planet.techlevel}</li>
        <li>Status: {planet.allegience}</li>
        <li>Population: {planet.population}</li>
      </ul>
    </div>
  );
}
