import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-dashboard-bg">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;