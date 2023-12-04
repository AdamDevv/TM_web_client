import { Component } from 'react';
import './App.css';
import Layout from './components/Layout';
import CustomersManagement from './pages/customers/CustomersManagement';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TranslatorsManagement from './pages/translators/TranslatorsManagement';
import ContractsManagement from './pages/contracts/ContractsManagement';
import Index from './pages/Index';
import CustomersEditor from './pages/customers/CustomersEditor';
import TranslatorsEditor from './pages/translators/TranslatorsEditor';

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

            <Route path="contracts" element={<ContractsManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
