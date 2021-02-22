/** Temporary fleet structure. */
export interface Fleet {
  supply: number;
  supplyMax: number;
  fuel: number;
  fuelMax: number;
  credits: number;
  fighters: number;
  transports: number;
  mTransports: number;
}

export default function FleetStatus({ fleet }: { fleet: Fleet }): JSX.Element {
  return (
    <div className="fleet-status-panel">
      <h3>Fleet Status Panel</h3>
      <ul>
        <li>Resources:</li>
        <li>Credits: {fleet.credits}</li>
        <li>Supply: {fleet.supply}/{fleet.supplyMax}</li>
        <li>Fuel: {fleet.fuel}/{fleet.fuelMax}</li>
        <li>Ships:</li>
        <li>Fighters: {fleet.fighters}</li>
        <li>Transports: {fleet.transports}</li>
        <li>M-Transports: {fleet.mTransports}</li>
      </ul>
    </div>
  );
}
