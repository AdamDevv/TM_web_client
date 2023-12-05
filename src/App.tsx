import { Component } from 'react';
import './App.css';
import Layout from './components/Layout';
import CustomersManagement from './pages/customers/CustomersManagement';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TranslatorsManagement from './pages/translators/TranslatorsManagement';
import TranslationContractsManagement from './pages/contracts/TranslationContractsManagement';
import Index from './pages/Index';
import CustomersEditor from './pages/customers/CustomersEditor';
import TranslatorsEditor from './pages/translators/TranslatorsEditor';
import TranslationContractsEditor from './pages/contracts/TranslationContractsEditor';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="translators" element={<TranslatorsManagement />} />
            <Route path='translators/new' element={<TranslatorsEditor />}/>
            <Route path='translators/:uid' element={<TranslatorsEditor />}/>

            <Route path="customers" element={<CustomersManagement />} />
            <Route path='customers/new' element={<CustomersEditor />}/>
            <Route path='customers/:uid' element={<CustomersEditor />}/>

            <Route path="contracts" element={<TranslationContractsManagement />} />
            <Route path='contracts/new' element={<TranslationContractsEditor />}/>
            <Route path='contracts/:uid' element={<TranslationContractsEditor />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
