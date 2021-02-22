import { PlayerController } from '../engine/controller/controller';
import { Resource } from '../engine/data/industry';
import { Fleet } from '../engine/fleet/fleet';
import { Allegience, Planet } from '../engine/planet/planet';
import './ActionsPanel.css'

export default function ActionsPanel({ fleet, planet, controller, onUpdate }: { fleet: Fleet, planet: Planet, controller: PlayerController, onUpdate: () => void }): JSX.Element {

  const embarkDisabled = planet.name === fleet.planet.name;
  const taxesDisabled = planet.allegience !== Allegience.EMPIRE;
  const suppliesDisabled = planet.allegience !== Allegience.EMPIRE || fleet.getResource(Resource.CREDIT) <= 0 || fleet.getResource(Resource.SUPPLY) >= fleet.getCapacity(Resource.SUPPLY);
  const fuelDisabled = planet.allegience !== Allegience.EMPIRE || fleet.getResource(Resource.CREDIT) <= 0 || fleet.getResource(Resource.FUEL) >= fleet.getCapacity(Resource.FUEL);

  return (
    <div className="list">
      <button onClick={() => { controller.embark(planet); onUpdate(); }} disabled={embarkDisabled}>Embark</button>
      <button onClick={() => { controller.collectTaxes(); onUpdate(); }} disabled={taxesDisabled}>Collect Taxes</button>
      <button onClick={() => { controller.purchaseResource(Resource.SUPPLY, 100); onUpdate(); }} disabled={suppliesDisabled}>Buy Supplies (100)</button>
      <button onClick={() => { controller.purchaseResource(Resource.FUEL, 100); onUpdate(); }} disabled={fuelDisabled}>Buy Fuel (100)</button>
    </div>
  );
}
