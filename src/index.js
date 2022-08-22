import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './components/pages/product-page/ProductPage';
import CartModal from './components/cart_modal/CartModal';
import CartPage from './components/pages/cart-page/CartPage';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path="/:id" element={<ProductPage/>}/>
            <Route path="/:item" element={<CartModal/>}/>
          </Routes>
    </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);  