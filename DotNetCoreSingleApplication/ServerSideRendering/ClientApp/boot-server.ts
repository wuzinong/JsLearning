import {createServerRenderer} from 'aspnet-prerendering';

export default createServerRenderer(function(params){
    return new Promise(function(resolve,reject){
        var result = `<h1>This is rendered from server</h1>
                     <div>Current time:${new Date()}</div>
                     <div>URL:${params.location.path}</div>
                     <div>IsAdministrator:${params.data.isAdministrator}</div>
                     <div>Number of Cookies:${params.data.cookies.length}</div>
                `;
        resolve({
            html:result
        });
    })
})