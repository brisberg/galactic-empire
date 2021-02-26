import { PlayerController } from '../engine/controller/controller';
import { Resource } from '../engine/data/industry';
import { Fleet } from '../engine/fleet/fleet';
import { Allegience, Planet } from '../engine/planet/planet';
import './ActionsPanel.css'

export default function ActionsPanel({ fleet, planet, controller, onUpdate }: { fleet: Fleet, planet: Planet, controller: PlayerController, onUpdate: () => void }): JSX.Element {

  const embarkDisabled = planet === fleet.planet;
  const taxesDisabled = fleet.planet !== planet || planet.allegience !== Allegience.EMPIRE;
  const suppliesDisabled = fleet.planet !== planet || planet.allegience !== Allegience.EMPIRE || fleet.getResource(Resource.CREDIT) <= 0 || fleet.getResource(Resource.SUPPLY) >= fleet.getCapacity(Resource.SUPPLY);
  const fuelDisabled = fleet.planet !== planet || planet.allegience !== Allegience.EMPIRE || fleet.getResource(Resource.CREDIT) <= 0 || fleet.getResource(Resource.FUEL) >= fleet.getCapacity(Resource.FUEL);

  const maxSupplyPurchase = Math.min(100, planet.getResource(Resource.SUPPLY), fleet.getCapacity(Resource.SUPPLY) - fleet.getResource(Resource.SUPPLY));
  const maxFuelPurchase = Math.min(100, planet.getResource(Resource.FUEL), fleet.getCapacity(Resource.FUEL) - fleet.getResource(Resource.FUEL));

  const execute = (command: Function): void => {
    try {
      command();
    } catch (err) {
      console.log(err.toString())
    }
    onUpdate();
  }

  return (
    <div className="list">
      <button onClick={() => { execute(() => controller.embark(planet)) }} disabled={embarkDisabled}>Embark</button>
      <button onClick={() => { execute(() => controller.collectTaxes()) }} disabled={taxesDisabled}>Collect Taxes</button>
      <button onClick={() => { execute(() => controller.purchaseResource(Resource.SUPPLY, maxSupplyPurchase)) }} disabled={suppliesDisabled}>Buy Supplies (100)</button>
      <button onClick={() => { execute(() => controller.purchaseResource(Resource.FUEL, maxFuelPurchase)) }} disabled={fuelDisabled}>Buy Fuel (100)</button>
    </div>
  );
}
