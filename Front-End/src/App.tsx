import './App.css';
import UserContextProvider from './context/UserContext';
import TaskContextProvider from './context/TaskContext';
import TabContextProvider from './context/TabContext';
import { Provider } from "./components/ui/provider";
import AppRoutes from './services/routes';

function App() {
  return (
    <Provider>
      <UserContextProvider>
        <TabContextProvider>
          <TaskContextProvider>
            <AppRoutes />
          </TaskContextProvider>
        </TabContextProvider>
      </UserContextProvider>
    </Provider>
  );
}

export default App;