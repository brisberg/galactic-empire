import { Resource } from "../engine/data/industry";
import { Fleet } from "../engine/fleet/fleet";
import { Vessle } from "../engine/fleet/ship";

export default function FleetStatus({ fleet }: { fleet: Fleet }): JSX.Element {
  return (
    <div className="fleet-status-panel">
      <h3>Fleet Status Panel</h3>
      <ul>
        <li>Location: {fleet.planet.name}</li>
        <li>Resources:</li>
        <li>Credits: {fleet.getResource(Resource.CREDIT)}</li>
        <li>Supply: {fleet.getResource(Resource.SUPPLY)}/{fleet.getCapacity(Resource.SUPPLY)}</li>
        <li>Fuel: {fleet.getResource(Resource.FUEL)}/{fleet.getCapacity(Resource.FUEL)}</li>
        <li>Ships:</li>
        <li>Fighters: {fleet.getShips(Vessle.FIGHTER)}</li>
        <li>Transports: {fleet.getShips(Vessle.TRANSPORT)}</li>
        <li>M-Transports: {fleet.getShips(Vessle.M_TRANSPORT)}</li>
      </ul>
    </div>
  );
}
