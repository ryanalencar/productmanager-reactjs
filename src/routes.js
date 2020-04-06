import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} exact />

                <Route path="/products" component={Products} />
            </Switch>
        </BrowserRouter>
    );
}