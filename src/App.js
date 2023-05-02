import './App.css';
import SearchByName from './components/SearchByName';
import SearchBySelection from './components/SearchBySelection';
import Table from './components/Table';

function App() {
  return (
    <div>
      <SearchByName />
      <SearchBySelection />
      <Table />
    </div>
  );
}

export default App;
