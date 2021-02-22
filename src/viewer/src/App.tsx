import React from 'react';
import './App.css';
import MapGrid from './map-grid/MapGrid';

/** Main App Component */
export default function App() {
  const planets = [
    {x: 3, y: 5},{x: 11, y: 2},{x: 24, y: 8},{x: 29, y: 24},{x: 7, y: 15},
    {x: 11, y: 21},{x: 18, y: 13},{x: 3, y: 21},{x: 6, y: 28},{x: 9, y: 18}
  ];

  return (
    <div className="App">
      <MapGrid planets={planets}/>
    </div>
  );
}
