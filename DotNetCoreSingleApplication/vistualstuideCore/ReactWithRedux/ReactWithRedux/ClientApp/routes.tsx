import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/views/Layout';
import Home from './components/views/Home';
import FetchData from './components/views/FetchData';
import Counter from './components/views/Counter';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
</Layout>;
