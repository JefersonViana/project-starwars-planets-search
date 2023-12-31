import { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';

function SearchByName() {
  const { planets, setPlanets, fetchData } = useContext(AppContext);
  const [name, setName] = useState('');

  const handleChange = ({ target }) => {
    if (target.value === '' || target.value === ' ') {
      fetchData();
    }
    setName(target.value);
    const filtro = planets.filter((planet) => planet.name
      .toLowerCase().includes(target.value.toLowerCase()));
    setPlanets(filtro);
  };

  return (
    <label>
      <input
        type="text"
        value={ name }
        placeholder="filtrar por nome"
        onChange={ (event) => handleChange(event) }
        data-testid="name-filter"
      />
    </label>
  );
}

export default SearchByName;
