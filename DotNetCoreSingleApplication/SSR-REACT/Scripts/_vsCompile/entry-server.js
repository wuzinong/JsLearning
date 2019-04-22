"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prerendering = require("aspnet-prerendering");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var redux_thunk_1 = require("redux-thunk");
var redux_reducers_1 = require("./redux-reducers");
var HelloWorld_1 = require("./HelloWorld");
var server_1 = require("react-dom/server");
exports.SR = prerendering.createServerRenderer(function (params) {
    return new Promise(function (resolve, reject) {
        var Store = redux_1.createStore(redux_reducers_1.helloWorld_reducers, redux_1.applyMiddleware(redux_thunk_1.default));
        // Store.dispatch(retrieveData());
        var app = React.createElement(react_redux_1.Provider, { store: Store },
            React.createElement(HelloWorld_1.HelloWorld, null));
        server_1.renderToString(app); // This kick off any async tasks started by React components
        // any async task (has a Promise) should call addTask() to add to domainTasks.
        // only do the actual rendering when all async tasks are done.
        params.domainTasks.then(function () {
            resolve({
                html: server_1.renderToString(app),
                globals: {
                    ReduxInitialState: Store.getState()
                }
            });
        }, reject); // Also propagate any errors back into the host application
    });
});
//# sourceMappingURL=entry-server.js.map