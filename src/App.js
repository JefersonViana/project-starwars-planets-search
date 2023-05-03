import './App.css';
import ListFilters from './components/ListFilters';
import RemoveFilters from './components/RemoveFilters';
import SearchByName from './components/SearchByName';
import SearchBySelection from './components/SearchBySelection';
import Table from './components/Table';

function App() {
  return (
    <div>
      <SearchByName />
      <SearchBySelection />
      <RemoveFilters />
      <ListFilters />
      <Table />
    </div>
  );
}

export default App;
