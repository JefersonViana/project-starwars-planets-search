import PropTypes from 'prop-types';
import React, { useState, useMemo, createContext, useCallback, useEffect } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const results = data.results.map((planet) => ({
        climate: planet.climate,
        created: planet.created,
        diameter: planet.diameter,
        edited: planet.edited,
        films: planet.films,
        gravity: planet.gravity,
        name: planet.name,
        orbital: planet.orbital_period,
        population: planet.population,
        rotation: planet.rotation_period,
        surface: planet.surface_water,
        terrain: planet.terrain,
        url: planet.url,
      }));
      setPlanets(results);
    } catch (error) {
      throw new Error();
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const values = useMemo(() => ({
    planets, setPlanets, fetchData,
  }), [planets, setPlanets, fetchData]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default AppProvider;
