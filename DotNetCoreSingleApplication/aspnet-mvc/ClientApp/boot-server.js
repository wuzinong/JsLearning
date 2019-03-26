"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aspnet_prerendering_1 = require("aspnet-prerendering");
exports.default = aspnet_prerendering_1.createServerRenderer(function (params) {
    return new Promise(function (resolve, reject) {
        var html = "<h1>This is rendered from server</h2>\n               <div>Current time:" + new Date() + "</div>\n               <div>URL:" + params.location.path + "</div>\n               <div>IsAdministrator:" + params.data.isAdministrator + "</div>\n               <div>Number of cookies:" + params.data.cookies.length + "</div>\n          ";
        resolve({ html: html });
    });
});
//# sourceMappingURL=boot-server.js.map