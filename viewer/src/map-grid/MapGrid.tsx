import { Planet } from '../engine/planet/planet';
import './MapGrid.css';

/** Renders a spacial grid describing the game Map. Renders in planets and points of interest for selection. */
export default function MapGrid({ planets, onSelectPlanet }: { planets: Planet[], onSelectPlanet: (planet: Planet) => void }): JSX.Element {
  const gridItems = planets.map((planet: Planet) =>
    <GridItem key={planet.name} planet={planet} onSelectPlanet={onSelectPlanet} />
  );

  return (
    <div className="grid border map-grid">
      {gridItems}
    </div>
  );
}

/** Renders a single map element. */
function GridItem({ planet, onSelectPlanet }: { planet: Planet, onSelectPlanet: (planet: Planet) => void }): JSX.Element {
  const position = planet.position;
  const classes = ["planet", planet.allegience];
  return (
    <div className={classes.join(' ')}
      style={{ gridColumnStart: position.x, gridRowStart: position.y }}
      onClick={() => onSelectPlanet(planet)}></div>
  );
}
