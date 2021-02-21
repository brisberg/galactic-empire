import './MapGrid.css';

function MapGrid() {
  return (
    <div className="grid border map-grid">
      <div className="planet" style={{gridColumnStart: 3,gridRowStart:3}}></div>
      <div className="planet" style={{gridColumnStart: 5,gridRowStart:8}}></div>
      <div className="planet" style={{gridColumnStart: 12,gridRowStart:2}}></div>
      <div className="planet" style={{gridColumnStart: 28,gridRowStart:28}}></div>
      <div className="planet" style={{gridColumnStart: 19,gridRowStart:12}}></div>
      <div className="planet" style={{gridColumnStart: 21,gridRowStart:10}}></div>
    </div>
  );
}

export default MapGrid;
