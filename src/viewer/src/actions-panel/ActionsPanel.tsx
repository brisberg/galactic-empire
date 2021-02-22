import { Fleet } from '../fleet-status/FleetStatus';
import { Planet } from '../planet-status/PlanetStatus';
import './ActionsPanel.css'

export interface PlayerController {
  embark(planet: Planet): void;
  collectTaxes(): void;
  purchaseSupplies(): void;
  purchaseFuel(): void;
}

export default function ActionsPanel({ fleet, planet, controller }: { fleet: Fleet, planet: Planet, controller: PlayerController }): JSX.Element {

  const embarkDisabled = planet.name === 'Galactica';
  const taxesDisabled = planet.status !== 'Empire';
  const suppliesDisabled = planet.status !== 'Empire' || fleet.credits <= 0 || fleet.supply >= fleet.supplyMax;
  const fuelDisabled = planet.status !== 'Empire' || fleet.credits <= 0 || fleet.fuel >= fleet.fuelMax;

  return (
    <div className="list">
      <button onClick={() => controller.embark(planet)} disabled={embarkDisabled}>Embark</button>
      <button onClick={() => controller.collectTaxes()} disabled={taxesDisabled}>Collect Taxes</button>
      <button onClick={() => controller.purchaseSupplies()} disabled={suppliesDisabled}>Buy Supplies (100)</button>
      <button onClick={() => controller.purchaseFuel()} disabled={fuelDisabled}>Buy Fuel (100)</button>
    </div>
  );
}
