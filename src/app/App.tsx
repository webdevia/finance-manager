import React from 'react';
import './App.css';
// import { ThemeProvider } from '../shared/common/theme/ThemeProvider';
// import { LanguageProvider } from '../shared/common/language/LanguageProvider';
import { BrowserRouter } from 'react-router-dom';
// import { Layout } from 'src/shared/common/layout/Layout';
import { Routing } from 'src/pages/Routing';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      {/* <LanguageProvider> */}
      {/* <ThemeProvider> */}
      {/* <Layout> */}
      <Routing />
      {/* </Layout> */}
      {/* </ThemeProvider> */}
      {/* </LanguageProvider> */}
    </BrowserRouter>
  );
}

export default App;

