import { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';

function SearchBySelection() {
  const {
    planets,
    isValid,
    setPlanets,
    setFilters, setIsValid, setPreviousArray, previousArray } = useContext(AppContext);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);

  const handleClick = () => {
    setIsValid({
      ...isValid,
      [columnFilter]: true,
    });
    switch (columnFilter) {
    case 'population':
      setColumnFilter('orbital_period');
      break;
    case 'orbital_period':
      setColumnFilter('diameter');
      break;
    case 'diameter':
      setColumnFilter('rotation_period');
      break;
    case 'rotation_period':
      setColumnFilter('surface_water');
      break;

    default:
      break;
    }
    setFilters((prev) => (
      [...prev, { columnFilter, comparisonFilter, numberFilter }]
    ));
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
    if (previousArray.length === 0) {
      setPreviousArray((prev) => [...prev, planets]);
    } else {
      setPreviousArray((prev) => [...prev, newArray]);
    }
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
          {!isValid.population && <option value="population">population</option>}
          {!isValid.orbital_period && (
            <option value="orbital_period">orbital_period</option>
          )}
          {!isValid.diameter && <option value="diameter">diameter</option>}
          {!isValid.rotation_period && (
            <option value="rotation_period">rotation_period</option>
          )}
          {!isValid.surface_water && <option value="surface_water">surface_water</option>}
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
