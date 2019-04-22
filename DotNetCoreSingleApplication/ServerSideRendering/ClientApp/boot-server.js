const prerendering = require('aspnet-prerendering');

module.exports = prerendering.createServerRenderer(function(params){
    return new Promise(function(resolve,reject){
        var result = `<h1>This is rendered from server</h1>
                     <div>IsAdministrator:${params.data.isAdministrator}</div>
                     <div>Number of Cookies:${params.data.cookies.length}</div>
                `;
        resolve({
            html:result
        });
    })
})