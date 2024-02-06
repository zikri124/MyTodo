import Navbar from './components/ui/Header';
import Home from './components/home-page/Home'
import { AppStateProvider } from './components/AppStateProvider';
import { TasksProvider } from './components/TasksProvider';

function App() {
  return (
    <div className="App">
      <AppStateProvider>
        <TasksProvider>
          <Navbar />
          <Home />
        </TasksProvider>
      </AppStateProvider>
    </div>
  );
}

export default App;
