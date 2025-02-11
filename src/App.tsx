import './App.css';

function App() {
  return <>{JSON.stringify(import.meta.env.VITE_APP_TITLE)}</>;
}

export default App;
