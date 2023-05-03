import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import AppProvider from '../context/AppProvider';
import userEvent from '@testing-library/user-event';
import data from '../helpers/index';

describe('Verifica se a aplicação tem os comportamentos esperados', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (data)
    })
  })
  test('Verifica se é renderizado os campos de filtro', async () => {
    render(<AppProvider><App /></AppProvider>);
    const inputTextEl = screen.getByRole('textbox');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectNumberEl = screen.getByTestId('value-filter');
    const columnSortEl = screen.getByTestId('column-sort');
    const radioAscEl = screen.getByTestId('column-sort-input-asc');
    const radioDescEl = screen.getByTestId('column-sort-input-desc');
    const btnEl = screen.getByRole('button', { name: /filtrar/i });
    const btnOrderEl = screen.getByRole('button', { name: /ordernar/i });
    const btnRemoveEl = screen.getByRole('button', { name: /remover filtros/i });
    
    expect(inputTextEl).toBeInTheDocument();
    expect(selectColumn).toBeInTheDocument();
    expect(selectComparison).toBeInTheDocument();
    expect(selectNumberEl).toBeInTheDocument();
    expect(columnSortEl).toBeInTheDocument();
    expect(radioAscEl).toBeInTheDocument();
    expect(radioDescEl).toBeInTheDocument();
    expect(btnEl).toBeInTheDocument();
    expect(btnOrderEl).toBeInTheDocument();
    expect(btnRemoveEl).toBeInTheDocument();

    await waitFor(() => {
      const titleTable = screen.getAllByRole('row')
      expect(titleTable).toHaveLength(11);
    })
  });
  test('Verifica se é possível digitar no campos select', async () => {
    render(<AppProvider><App /></AppProvider>);
    
    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
     const rows =  screen.getAllByRole('row');
     expect(rows).toHaveLength(11);
    })
    const inputEl = screen.getByRole('textbox');
    userEvent.type(inputEl, 'Tato');

    const rows =  screen.getAllByRole('row');
     expect(rows).toHaveLength(2);
  });
  test('Verifica se é possível digitar "population"', async () => {
    render(<AppProvider><App /></AppProvider>);

    await waitFor(() => {
     const rows =  screen.getAllByRole('row');
     expect(rows).toHaveLength(11);
    })
    
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectNumberEl = screen.getByTestId('value-filter');
    const btnEl = screen.getByRole('button', { name: /filtrar/i });
    const beforeOptions = screen.getAllByRole('option');

    expect(beforeOptions).toHaveLength(13);
    userEvent.selectOptions(selectColumn, 'population');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(selectNumberEl, '1000000000000');
    userEvent.click(btnEl)
    
    const planetNameFilter = screen.getByRole('columnheader', {  name: /yavin iv/i});
    const rows =  screen.getAllByRole('row');
    const afterOptions = screen.getAllByRole('option');
    const listFilters = screen.getAllByTestId('filter');

    expect(listFilters).toHaveLength(1);
    expect(afterOptions).toHaveLength(12);
    expect(planetNameFilter).toBeInTheDocument();
    expect(rows).toHaveLength(8);

    userEvent.selectOptions(selectColumn, 'orbital_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(selectNumberEl, '5000');
    userEvent.click(btnEl)

    const listFilters1 = screen.getAllByTestId('filter');
    expect(listFilters1).toHaveLength(2);

    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.type(selectNumberEl, '5000');
    userEvent.click(btnEl)

    const listFilters2 = screen.getAllByTestId('filter');
    expect(listFilters2).toHaveLength(3);

    const btnRemoveFilters = screen.getByRole('button', {  name: /remover filtros/i});

    userEvent.click(btnRemoveFilters)

    const listFilters3 = screen.queryAllByTestId('filter');
    expect(listFilters3).toHaveLength(0);
    await waitFor(() => {
      const rows =  screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    })
  });
  test('Verifica se é possível digitar "orbital_period"', async () => {
    render(<AppProvider><App /></AppProvider>);

    await waitFor(() => {
      const rows =  screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    })
  
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectNumberEl = screen.getByTestId('value-filter');
    const btnEl = screen.getByRole('button', { name: /filtrar/i });
    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.clear(selectNumberEl);
    userEvent.type(selectNumberEl, '20');
    userEvent.click(btnEl)

    const rows =  screen.getAllByRole('row');
    expect(rows).toHaveLength(3);

    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.clear(selectNumberEl);
    userEvent.type(selectNumberEl, '8');
    userEvent.selectOptions(selectColumn, 'surface_water');
    userEvent.click(btnEl)

    
    const newRows =  screen.getAllByRole('row');
    expect(newRows).toHaveLength(2);
  });
  test('Testando o button "excluir" filtro', async () => {
    render(<AppProvider><App /></AppProvider>);

    await waitFor(() => {
      const rows =  screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    })
  
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectNumberEl = screen.getByTestId('value-filter');
    const btnEl = screen.getByRole('button', { name: /filtrar/i });
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.clear(selectNumberEl);
    userEvent.type(selectNumberEl, '10000');
    userEvent.click(btnEl)

    const rows =  screen.getAllByRole('row');
    expect(rows).toHaveLength(4);

    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.selectOptions(selectColumn, 'population');
    userEvent.clear(selectNumberEl);
    userEvent.type(selectNumberEl, '30000000');
    userEvent.click(btnEl)

    
    const newRows =  screen.getAllByRole('row');
    expect(newRows).toHaveLength(2);

    const btnsDel = screen.getAllByRole('button', { name: /excluir/i });
    expect(btnsDel).toHaveLength(2);

    userEvent.click(btnsDel[1]);

    const PreviousRows = screen.getAllByRole('row');
    expect(PreviousRows).toHaveLength(4);
  })
  test('Testando a ordenação crescente e decrescente', async () => {
    render(<AppProvider><App /></AppProvider>);

    await waitFor(() => {
      const rows =  screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    })
    const planetsName = screen.getAllByTestId('planet-name');

    expect(planetsName).toHaveLength(10);
    expect(planetsName[0]).toHaveTextContent('Tatooine')

    const columnSort = screen.getByTestId('column-sort');
    const radioAsc = screen.getByTestId('column-sort-input-asc');
    const radioDesc = screen.getByTestId('column-sort-input-desc');
    const btnEl = screen.getByRole('button', { name: /ordernar/i });

    userEvent.selectOptions(columnSort, 'diameter');
    userEvent.click(radioAsc);
    userEvent.click(btnEl)

    
    const planetsNames = screen.getAllByTestId('planet-name');

    expect(planetsNames).toHaveLength(10);
    expect(planetsNames[0]).toHaveTextContent('Endor')
    expect(planetsNames[4]).toHaveTextContent('Tatooine')

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(radioDesc);
    userEvent.click(btnEl)

    const planetsNames1 = screen.getAllByTestId('planet-name');
    expect(planetsNames1).toHaveLength(10);
    expect(planetsNames1[0]).toHaveTextContent('Coruscant');
    expect(planetsNames1[9]).toHaveTextContent('Dagobah');
  })
  test('Testando se ao digitar no textbox um name e depois apagar se é feita uma nova atualização na tabela', async () => {
    render(<AppProvider><App /></AppProvider>);

    await waitFor(() => {
      const rows =  screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    })
    const filterName = screen.getByRole('textbox');

    userEvent.type(filterName, 'tatoo');

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);

    userEvent.clear(filterName);
    await waitFor(() => {
      const rows =  screen.getAllByRole('row');
      expect(rows).toHaveLength(11);
    })
  })
});

describe('Testando a falha da API', () => {
  test('', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Error de requisição'));
    console.log = jest.fn()
    render(<AppProvider><App /></AppProvider>);

    
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      expect(console.log).toBeCalledWith('Error de requisição');
    })
  })
})