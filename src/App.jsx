import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './components/AppContent'; // Import AppContent

function App() {
  return (
    <Router>
      <AppContent /> {/* Render AppContent inside Router */}
    </Router>
  );
}

export default App;
