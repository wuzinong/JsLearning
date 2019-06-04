"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("./redux-actions");
var domain_task_1 = require("domain-task");
// export function retrieveData() {
//     return (dispatch: <T>(action: any) => T, getState: () => any) => {
//         fetch('/Home/GetHelloWorldData', { method: 'get' })
//             .then(response => response.json())
//             .then((data: IHelloWorldData) => dispatch(receiveHelloWorldData(data)))
//             .catch(() => { }); // ignore errors in this example
//     }
// }
function retrieveData() {
    return function (dispatch, getState) {
        var p = domain_task_1.fetch('/Home/GetHelloWorldData', { method: 'get' })
            .then(function (response) { return response.json(); })
            .then(function (data) { return dispatch(redux_actions_1.receiveHelloWorldData(data)); })
            .catch(function () { }); // ignore errors in this example
        domain_task_1.addTask(p);
    };
}
exports.retrieveData = retrieveData;
//# sourceMappingURL=async-thunks.js.map