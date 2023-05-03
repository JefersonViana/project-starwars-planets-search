import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

function ListFilters() {
  const {
    filters,
    setFilters,
    setIsValid,
    previousArray,
    setPreviousArray,
    setPlanets,
  } = useContext(AppContext);
  const handleClick = (columnSelect) => {
    const newArray = filters.filter((filter) => filter.columnFilter !== columnSelect);
    setFilters(newArray);
    setIsValid((prev) => ({
      ...prev,
      [columnSelect]: false,
    }));
    setPreviousArray(previousArray.slice(0, previousArray.length - 1));
    setPlanets(previousArray[previousArray.length - 2]);
  };
  return (
    <ul>
      {filters.map((filter) => (
        <li key={ filter.columnFilter } data-testid="filter">
          <span>{filter.columnFilter}</span>
          <span>{filter.comparisonFilter}</span>
          <span>{filter.numberFilter}</span>
          <span>
            <button
              type="button"
              onClick={ () => handleClick(filter.columnFilter) }
            >
              Excluir
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ListFilters;
