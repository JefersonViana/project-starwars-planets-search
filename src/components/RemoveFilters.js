import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

function RemoveFilters() {
  const { setFilters, setIsValid, fetchData } = useContext(AppContext);
  const newValues = {
    population: false,
    orbital_period: false,
    diameter: false,
    rotation_period: false,
    surface_water: false,
  };
  const handleClick = () => {
    setFilters([]);
    setIsValid(newValues);
    fetchData();
  };

  return (
    <button
      type="button"
      data-testid="button-remove-filters"
      onClick={ handleClick }
    >
      Remover filtros
    </button>
  );
}

export default RemoveFilters;
