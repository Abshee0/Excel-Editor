import React from 'react';
import ExcelViewer from './components/ExcelViewer';
import ThemeProvider from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <ExcelViewer />
    </ThemeProvider>
  );
}

export default App;