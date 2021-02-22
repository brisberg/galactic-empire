import { Planet } from '../planet-status/PlanetStatus';
import './MapGrid.css';

/** Renders a spacial grid describing the game Map. Renders in planets and points of interest for selection. */
export default function MapGrid({ planets }: { planets: Planet[] }): JSX.Element {

  const gridItems = [];

  for (const planet of planets) {
    gridItems.push(GridItem(planet));
  }

  return (
    <div className="grid border map-grid">
      {gridItems}
    </div>
  );
}

/** Renders a single map element. */
function GridItem(planet: Planet): JSX.Element {
  const position = planet.position;
  const classes = ["planet", planet.status];
  return (
    <div className={classes.join(' ')} style={{ gridColumnStart: position.x, gridRowStart: position.y }}></div>
  );
}
