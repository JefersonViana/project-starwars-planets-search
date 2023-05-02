import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import AppProvider from '../context/AppProvider';
import userEvent from '@testing-library/user-event';

const data = {results:[
  {"name":"Tatooine","rotation_period":"23","orbital_period":"304","diameter":"10465","climate":"arid","gravity":"1 standard","terrain":"desert","surface_water":"1","population":"200000","residents":["https://swapi.dev/api/people/1/","https://swapi.dev/api/people/2/","https://swapi.dev/api/people/4/","https://swapi.dev/api/people/6/","https://swapi.dev/api/people/7/","https://swapi.dev/api/people/8/","https://swapi.dev/api/people/9/","https://swapi.dev/api/people/11/","https://swapi.dev/api/people/43/","https://swapi.dev/api/people/62/"],"films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-09T13:50:49.641000Z","edited":"2014-12-20T20:58:18.411000Z","url":"https://swapi.dev/api/planets/1/"},
  {"name":"Alderaan","rotation_period":"24","orbital_period":"364","diameter":"12500","climate":"temperate","gravity":"1 standard","terrain":"grasslands, mountains","surface_water":"40","population":"2000000000","residents":["https://swapi.dev/api/people/5/","https://swapi.dev/api/people/68/","https://swapi.dev/api/people/81/"],"films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:35:48.479000Z","edited":"2014-12-20T20:58:18.420000Z","url":"https://swapi.dev/api/planets/2/"}
]};

describe('Testando o "App.js"', () => {
  xtest('Verifica se é renderizador todos os campos para filtros', () => {
    render(<AppProvider><App /></AppProvider>);
    const inputTextEl = screen.getByRole('textbox');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectNumberEl = screen.getByTestId('value-filter');
    const btnEl = screen.getByRole('button', { name: /filtrar/i });
    const titleTable = screen.getAllByRole('columnheader')

    expect(inputTextEl).toBeInTheDocument();
    expect(selectColumn).toBeInTheDocument();
    expect(selectComparison).toBeInTheDocument();
    expect(selectNumberEl).toBeInTheDocument();
    expect(btnEl).toBeInTheDocument();
    expect(titleTable).toHaveLength(13);
  });
  test('Verifica se é possível digitar no campos criados', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (data)
    })
    render(<AppProvider><App /></AppProvider>);
    
    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
     const rows =  screen.getAllByRole('row');
     expect(rows).toHaveLength(3);
    })
    const inputEl = screen.getByRole('textbox');
    userEvent.type(inputEl, 'Tatooine');
    userEvent.type(inputEl, ' ');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectNumberEl = screen.getByTestId('value-filter');
    const btnEl = screen.getByRole('button', { name: /filtrar/i });
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(selectNumberEl, '11000');
    userEvent.click(btnEl)
  });
});
