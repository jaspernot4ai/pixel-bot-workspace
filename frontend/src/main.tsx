import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Pixel Bot Monitor</h1>
      <p>Waiting for backend...</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
