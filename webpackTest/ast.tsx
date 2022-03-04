// 1. What is a "web bundler"
// We should first ask the question "Its 2020, why bundle in the first place?". There are many answers to this question:

// Performance: 3rd party code is expensive, we can use static code analysis to optimise it 
// (things like cherry picking and tree shaking). We can also simplify what is shipped by turning 100 files into 1,
//  limiting the data and resource expense on the user
// Support: the web has so many different environments and you want your code to run in as many as possible, 
// while only writing it once (e.g. adding Polyfills where necessary)
// User experience: Utilise browser caching with separate bundles (e.g. vendor for all your libraries and app 
//     for your application itself) Separate concerns: Manage how you serve fonts, css, images as well as JS.
// The basic architecture of a web bundler is:

// Modules ----> Compiler ----> Assests

// Basically we put modules through a compiler to produce assets.

// There are many concepts involved in the compiler. It is one of the reasons why I feel it is such an interesting topic, 
// as there is so much in such a small amount of space.

// These concepts are:

// IIFE
// Pass by ref
// Dependency graphs (as we traverse our application files)
// Defining custom import/export system (which can run on any environment)
// Recursive functions
// AST parsing and generation (turning source code into its tokenized form)
// Hashing
// Native ESM (ESM manages cyclic dependencies well due to its compile-time checks)
// We will be ignoring non-js assets in our compiler; so no fonts, css or images.


// 2. Building a compiler for a "web bundler"
// This will be a massive oversimplification of how Webpack works, as there are many different ways to solve the problem,
//  hopefully this way will offer some insight into the mechanisms involved.

// The overview of a compiler is below, we will be breaking down each phase.


// PHASE 1
// Using a 3rd party tool for AST parsing we (see code below):

// Determine files full path (very important so its clear if we are dealing with the same file again)
// Grab files contents
// Parse into AST
// Store both contents and AST onto a "module" object.
// Process the dependencies inside the contents (using the AST "ImportDeclaration" value), recursively calling this function
//  with the value
// Finally add that function to the depsArray, so we can build up our tree with the first file appearing last (this is important)


const depsArray = [];
const depsGraph=file=>{
    const fullPath = path.resolve(file);
    
    //return early if exist
    if(!!depsArray.find(item=>item.name===fullPath)) return;

    //store path + parsed source as module
    const fileContents = fs.readFileSync(fullPath,'utf-8');
    const source = ast.parse(fileContents);
    const module = {
        name:fullPath,
        source
    }

    //process deps
    source.body.map(current=>{
        if(current.type==='ImportDeclaration'){
            //process module for each dep.
            depsGraph(current.source.value)
        }
    });

    depsArray.push(module);
    return depsArray;
}


// fileA -> fileB
//       -> fileC -> fileD
//SO our tree now looks like the below right array:


//---------- Tree
[
    {
        name:'/root/our_app/src/fileB.mjs',
        source:{type:'Program',sourceType:'module',body:[Array]}
    },
    {
        name:'/root/our_app/src/fileD.mjs',
        source:{type:'Program',sourceType:'module',body:[Array]}
    },
    {
        name:'/root/our_app/src/fileC.mjs',
        source:{type:'Program',sourceType:'module',body:[Array]}
    },
    {
        name:'/root/our_app/src/fileA.mjs',
        source:{type:'Program',sourceType:'module',body:[Array]}
    }
]

// A compilers job is to "Execute code which will produce executable code". 
// This means we will have 2 levels of code so we will review them 1 at a time. 
// First we will review what the compiler builds, then review the built/outputted code (run by the browser).

// First the built code
// Templates:
// Module template: Its job is to convert a given module into a module our compiler can use.

// We hand it the module code and an index (Webpack also does this with the index).

// We want the code to be as compatible in as many environments as possible. ES6 modules support strict mode natively,
//  but ES5 modules do not so we explicitly define strict mode in our module templates.

// In NodeJS all ES modules are internally wrapped in a function attaching runtime details (i.e. exports), 
// here we are using the same. Again Webpack does this.

/*
 *Template to be used for each module.
 *module: load exports onto
 *_ourReuire: import system 
*/

const buildModuleTemplateString = (moduleCode,index)=>`
    /* index/id ${index}*/
    (function(module,_ourRequire){
        "use strict";
        ${moduleCode}
    })
`


// Runtime template: Its job is to load our modules and give a id of the starting module.

// We will review this more later, once we have the modules code inside it.

const buildRuntimeTemplateString = (allModules,indexLocation)=>`
    (
        function(modules){
            //Define runtime.
            const installedModules = {}; //id/index + exports
            function _our_require_(module_id){
                //Module in cache?
                if(installedModules[moduleId]){
                   return installedModules[moduleId].exports;
                }
                

                //Build module, store exports against this ref.
                const module = {
                    i:moduleId,
                    exports:{}
                }

                //Excecute module template function, Add exports to ref.
                module[moduleId].call({}, module, _our_reuire_);

                //cache exports of module
                const exports = module.exports;
                installedModules[moduleId] = exports;

                //Return exports of module
                return exports;
            }

            //Load entry module via id + return exports

            return _our_reuire_(${indexLocation})
        })
        /*Dep tree*/
        ([
            ${allModules}
        ])
`


// Custom import/export:
// With our import statement we will be replacing the instance of "importing" with our own.
// It will look like the middle comment.

/**
 * Replacing ESM import with our function
 * `const someImport = _ourRequire("{ID}");`
 * `console.log("Import AST:",ast.parse(program).body[0])`
 */

const getImport = (item,allDeps)=>{
    //get variable we import onto
    const importFunctionName = item.specifiers[0].imported.name;
    //get files full path and find index in deps array.
    const fileImported = item.source.value;
    const fullFile = path.resolve(fileImported);
    const itemId = allDeps.findIndex(item=> item.name === fillFile);

    return {
        type:'VariableDeclaration',
        kind:'const',
        declarations:[
            {
                type:'VariableDeclarator',
                init:{
                    type:'CallExpression',
                    callee:{
                        type:'Identifier',
                        name:'_ourRequire'
                    },
                    arguments:[
                        {
                            type:'Literal',
                            value:itemId
                        }
                    ]
                },
                id:{
                    type:'Identifier',
                    name:importFunctionName
                }
            }
        ]
    }
}

// Our export will do something similar to the import, except replace any "exports" with our own. See bottom comment.
/**
 * Replacing ESM export with our function.
 * Use below code snippet to confirm structure:
 * `module.exports = someFunction`
*/

const getExport = item=>{
    //get export functions name
    const moduleName = item.specifiers[0].exported.name;
    return {
        type:"ExpressionStatement",
        expression:{
            type:"AssighmentExpression",
            left:{
                type:"MemberExpression",
                object:{type:"Identifier",name:"module"},
                computed:false,
                property:{type:"Identifier",name:"exports"}
            },
            operator:"=",
            right:{
                type:"Identifier",
                name:moduleName
            }
        }
    }
}

// It is worth noting Webpack stores dependency IDs on the module earlier. It has its own "dependency template"
//  which replaces the imports and exports usage with custom variables. Mine swaps just the import itself 
//  (theirs swaps the entire line and all usages of it). One of MANY things which aren’t exactly the same as the real Webpack.

// Transform
// Our transform function iterates through the dependencies. Replaces each import and export it finds with our own. 
// Then turns the AST back into source code and builds a module string. Finally we join all the module strings together 
// and hand them into the runtime template, 
// and give the index location of the last item in the dependency array as this is our "entry point".

const transform = depsArray=>{
    const updatedModules = depsArray.reduce((acc,dependency,index)=>{
        const updatedAst = dependency.source.body.map(item=>{
            if(item.type==="ImportDeclaration"){
                //replace module imports with ours
                item = getImport(item,depsArray);
            }
            if(item.type=== "ExportNamedDeclaraion"){
                //replaces function name with real exported function
                item = getExport(item);
            }
            return item;
        });
        dependency.source.body = updatedAst;

        //Turn AST back into string
        const updatedSource = ast.generate(dependency.source);

        //Bind module source to module template
        const updatedTemplate = buildModuleTemplateString(updatedSource,index);
        acc.push(updatedTemplate);
        return acc;
    },[]);

    //Add all modules to bundle
    const bundleString = buildRuntimeTemplateString(
        updatedModules.join(','),
        depsArray.length - 1
    );

    return bundleString;
}



///example output code
/*Dep tree*/
/* index/id 0 */
(function(module,_ourRequire){
    "use strict";
    const returnDateTime = ()=>{
        return new Date().toDateString();
    };
    module.exports = returnDateTime;
});

/* index/id 1 */
(function(module,_ourRequire){
    "use strict";
    const logger = text =>{
        console.log(text)
    }
    module.exports = logger
});

/* index/id 2 */
(function(module,_ourRequire){
    "use strict";
    const logger = _ourRequire(1);
    const logDate = text =>{
        logger(`The date is now:${text}`);
    }
    module.exports = logDate
});

/* index/id 3 */
(function(module,_ourRequire){
    "use strict";
    const returnDateTime = _ourRequire(0);
    const logDate = _ourRequire(2);
    const main = ()=>{
        const date = returnDateTime();
        logDate(date)
    }
    main();
});

// What is going on?
// The runtime template IIFE runs immediately handing the modules array as an argument. 
// We define a cache (installedModules) and our import function (ourrequire_). 
// Its job is to execute the module runtime and return the exports for a given module id 
// (the ID correlates to its location in the modules array). The exports are set on the parent module, utilising pass-by-ref,
// and the module is then stored in cache for easier re-use.. Finally we execute the import function for our entry point
//  which will start the application as it does not require calling an export itself.
//  All imports inside our modules will now utilise our custom method.


// 3. Using the output with an application
// Now we have an updated "vendorString" we want to use it (the above code). So we:

// Create a hash of the contents which is to be used in the bundle filename and stored in the manifest
// Write the vendorString into our new bundle

//create hash
const sum = crypto.createHash("md5");
sum.update(vendorString);
const hash = sum.digest("hex");
//write contents to bundle
fs.writeFileSync(`./build/bundle-${hash}.js`,vendorString,"utf8");
//write hash to manifest
fs.writeFileSync(
    "./build/manifest.json",
    `{"bundle":"bundle-${hash}.js"}`
)

// Lastly we run a small express server application which pulls the bundle name from 
// the manifest and exposes the built code (/build) under a /static route.

import express from 'express';
import manifest from './build/manifest.json';
const app = express();
const html_string = `
  <html>
    <script src="/static/${manifest.bunlde}"></script>
    <body>
        Hello world
    </body>
  </html>
`
app.use('/static',express.static("build"))
app.get("/",(req,res)=>{
    res.send(html_string)
})
app.listen(8000,()=>console.log("App listening on port 8000"))


// Not covered
// You might be wondering "so what else does Webpack do which ours does not?"

// Handles non-js assets (css/images/fonts)
// Dev and HMR: this is built into Webpack
// Chunks: Webpack can put different modules into different chunks, and each can have a slightly different runtime and polyfills if necessary. i.e. vendor, dynamic imports
// Multiple exports: Ours could do this but needs a defensive check on the module type so its not worth it for this mess.
// Further optimisations (e.g. minification/code splitting/cherry picking/tree shaking/polyfills)
// Source maps: Webpack uses a mix of preprocessor which all generate their own maps. Webpack manages merging them all together.
// Making it extensible or configurable (e.g. loaders, plugins or lifecycle). Webpack is 80% plugins even internally i.e. the compiler fires hooks on lifecycle events (e.g. "pre-process file") and the loaders listen out for this event and run when appropriate. Additionally we could extend our compiler to support lifecycle events, perhaps using NodeJS event emitter, but again not worth it for this mess.