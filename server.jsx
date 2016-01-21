import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {RoutingContext, match} from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from 'routes';
import jade from 'jade';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from 'reducers';

import { applyMiddleware } from 'redux';
import promiseMiddleware   from 'lib/promiseMiddleware';

const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

const app = express();
app.set('views', './shared/views');
app.set('view engine', 'jade');

app.use((req,res) => {
    const location = createLocation(req.url);
    const reducer = combineReducers(reducers);
    const store = createStore(reducer);

    match({routes, location}, (err, redirectLocation, renderProps) =>{
        if (err){
            console.log(err);
            return res.status(500).send("Internal Server Error")
        }

        if(!renderProps) return res.status(404).send('Not Found');

        const InitialComponent = (
            <Provider store={store}>
                <RoutingContext {...renderProps}/>
            </Provider>
            );

        const initialState = store.getState();
        console.log(initialState);

        const componentHTML = renderToString(InitialComponent);

        res.render('index', {component: componentHTML, initialState: initialState});

    });
});


export default app;