import { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';

function SearchBySelection() {
  const { planets, setPlanets } = useContext(AppContext);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);

  const handleClick = () => {
    const newArray = planets.filter((planet) => {
      switch (comparisonFilter) {
      case 'maior que':
        return Number(planet[columnFilter]) > Number(numberFilter);
      case 'menor que':
        return Number(planet[columnFilter]) < Number(numberFilter);
      default:
        return Number(planet[columnFilter]) === Number(numberFilter);
      }
    });
    setPlanets(newArray);
  };

  return (
    <div>
      <label>
        <select
          data-testid="column-filter"
          name="columnFilter"
          value={ columnFilter }
          onChange={ (event) => setColumnFilter(event.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation">rotation_period</option>
          <option value="surface">surface_water</option>
        </select>
      </label>
      <label>
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          value={ comparisonFilter }
          onChange={ (event) => setComparisonFilter(event.target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label>
        <input
          type="number"
          name="numberFilter"
          data-testid="value-filter"
          value={ numberFilter }
          min={ 0 }
          onChange={ (event) => setNumberFilter(event.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default SearchBySelection;
