import {createServerRenderer} from 'aspnet-prerendering';

export default createServerRenderer( params =>{
     return new Promise(function(resolve,reject){

    
          const html = `<h1>This is rendered from server</h2>
               <div>Current time:${new Date()}</div>
               <div>URL:${params.location.path}</div>
               <div>IsAdministrator:${params.data.isAdministrator}</div>
               <div>Number of cookies:${params.data.cookies.length}</div>
          `;
               
          resolve({html});
      })    
})