import PropTypes from 'prop-types';
import React, { useState, useMemo, createContext, useCallback, useEffect } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState([]);
  const [previousArray, setPreviousArray] = useState([]);
  const [isValid, setIsValid] = useState(
    {
      population: false,
      orbital_period: false,
      diameter: false,
      rotation_period: false,
      surface_water: false,
    },
  );
  // console.log(previousArray);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      // if (!response.ok) {
      //   throw new Error();
      // }
      const data = await response.json();
      const results = data.results.map((planet) => ({
        climate: planet.climate,
        created: planet.created,
        diameter: planet.diameter,
        edited: planet.edited,
        films: planet.films,
        gravity: planet.gravity,
        name: planet.name,
        orbital_period: planet.orbital_period,
        population: planet.population,
        rotation_period: planet.rotation_period,
        surface_water: planet.surface_water,
        terrain: planet.terrain,
        url: planet.url,
      }));
      setPlanets(results);
      setPreviousArray((prev) => [...prev, results]);
    } catch (error) {
      console.log(error.message);
      // throw new Error();
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const values = useMemo(() => ({
    planets,
    filters,
    isValid,
    previousArray,
    setPlanets,
    fetchData,
    setFilters,
    setIsValid,
    setPreviousArray,
  }), [
    planets,
    filters,
    isValid,
    previousArray,
    setPlanets,
    fetchData,
    setFilters,
    setIsValid,
    setPreviousArray,
  ]);

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
