import './MapGrid.css';

/** Renders a spacial grid describing the game Map. Renders in planets and points of interest for selection. */
export default function MapGrid({planets}: {planets: {x: number, y: number}[]}): JSX.Element {

  const gridItems = [];

  for (const planet of planets) {
    gridItems.push(GridItem(planet.x, planet.y));
  }

  return (
    <div className="grid border map-grid">
      {gridItems}
    </div>
  );
}

/** Renders a single map element. */
function GridItem(x: number, y: number): JSX.Element {
  return (<div className="planet" style={{gridColumnStart: x,gridRowStart: y}}></div>)
}
