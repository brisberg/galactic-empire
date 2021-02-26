import { Resource } from "../engine/data/industry";
import { Planet } from "../engine/planet/planet";

/** Information Display panel for the currently selected Planet */
export default function PlanetStatus({ planet }: { planet: Planet }): JSX.Element {
  const industry = planet.getIndustryAllocation();
  const resources = planet.getAllResources();

  return (
    <div className="planet-status-panel">
      <h3>Planet Status Panel</h3>
      <ul>
        <li>Name: {planet.name}</li>
        <li>Technology: {planet.techlevel}</li>
        <li>Status: {planet.allegience}</li>
        <li>Population: {planet.population}</li>
        <li>Industry:   Production:   Resource:</li>
        <li>{Resource.CREDIT}:   {industry[Resource.CREDIT]}:   {resources[Resource.CREDIT]}</li>
        <li>{Resource.SUPPLY}:   {industry[Resource.SUPPLY]}:   {resources[Resource.SUPPLY]}</li>
        <li>{Resource.FUEL}:   {industry[Resource.FUEL]}:   {resources[Resource.FUEL]}</li>
        <li>{Resource.MILITARY}:   {industry[Resource.MILITARY]}:   {resources[Resource.MILITARY]}</li>
        <li>{Resource.SHIPPARTS}:   {industry[Resource.SHIPPARTS]}:   {resources[Resource.SHIPPARTS]}</li>
      </ul>
    </div>
  );
}
