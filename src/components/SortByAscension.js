import { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';

function SortByAscension() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [radioFilter, setRadioFilter] = useState('');
  const { planets, setPlanets } = useContext(AppContext);

  const handleClick = () => {
    const newArray = planets.sort((a, b) => {
      const FIX = -1;
      if (Number(a[columnFilter]) > Number(b[columnFilter])) {
        return 1;
      }
      if (Number(a[columnFilter]) < Number(b[columnFilter])) {
        return FIX;
      }
      return 0;
    });
    const arrayUnknown = [];
    const orderedVariety = [];
    newArray.forEach((element) => {
      if (element[columnFilter] === 'unknown') {
        arrayUnknown.push(element);
      } else {
        orderedVariety.push(element);
      }
    });
    if (radioFilter === 'DESC') {
      // console.log('desc');
      const array = orderedVariety.reverse();
      setPlanets([...array, ...arrayUnknown]);
    } else {
      // console.log('asc');
      setPlanets([...orderedVariety, ...arrayUnknown]);
    }
  };

  return (
    <div>
      <label>
        <select
          data-testid="column-sort"
          name="columnFilter"
          value={ columnFilter }
          onChange={ (event) => setColumnFilter(event.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="ascendente">
        <input
          id="ascendente"
          name="radio"
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ (event) => setRadioFilter(event.target.value) }
        />
        Ascendente
      </label>
      <label htmlFor="descendente">
        <input
          id="descendente"
          name="radio"
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ (event) => setRadioFilter(event.target.value) }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Ordernar
      </button>
    </div>
  );
}

export default SortByAscension;
