//https://craigtaub.dev/source-maps-from-top-to-bottom
// Part A: Intro to source maps and compilers
// 1. What is a source map and why are they useful?
// First let us look at some reason why people write JavaScript which needs transpilation into native JavaScript:

// Using a type system,
// Using the latest ES 8–9–10 features,
// Code optimising (e.g minification)
// Bundle optimising (e.g. vendor vs app bundles)
// The modern compiler architecture looks like this:

//Modules -----> Compiler -----> Assets
// The problem is that in the process of turning your modules into assets, the code itself becomes un-readable for 
// humans as its emphasis is put on the computer (usually a browser or server) to read.

// Some example code which has been put through a compiler is below. It becomes near impossible to reason about 
// and even harder to debug if there is an issue.

// This is where Source Maps come in !!

// A basic definition for a Source Map would be:

//A source map provides a way of mapping code within a compressed file back to it's original position in a source file

// So fairly straight forward in its purpose. Modern browsers will parse the source map automatically and make it appear as 
// though you’re running un-minified or uncombined files.

// An example below shows debugging TypeScript in the browser, something which is only possible due to Source Maps.

// 2. Using source maps with popular tools
// Connecting the browser to the source map
// There are 2 ways to notify the Browser there is a source map available.

// At the footer of a JavaScript file add

//# sourceMappingURL=/path/to/file.js.map

//n the “Header” of a JavaScript file add
X-SourceMap: /path/tofile.js.map

// Couple of points to note

// Chrome will only download a source map if DevTools is open (as they can be huge in size)
// Source maps will not appear as a network request (inside the network tab)
// Once you have your source map you can add breakpoints inside the “source” code (found under sources tab).

// Source map spec
// Current source maps must follow the latest version of the source map spec. That is version 3 and can be found in full here, 
// it is written by mostly Mozilla and Google engineers. Version 3 comes with improvements to its overall size that will 
// speed up its downloading and parsing.

// The below shows an example source map, an important point is the “mappings”,
//  these are Base64 VLQ strings which contain the actual mappings from source to generated code. More on this
//   later as we will be producing our own.



// Usage in popular tools:
// Node.js
// Via the flag — enable-source-maps

// Source maps cached and used for stack traces when an exception occurs.

// Babel
// By default Babel will add a source map location to the bottom of every generated bundle e.g.

//# sourceMappingURL = file.map.js

// But via the flag — source-maps — inline you can tell Babel to use an inline source map, 
// which looks like below (i.e. base64 encode string of contents).

//# sourceMappingURL=data:application/json;charset=utf-8;base64,...

// Webpack
// Via the config property devtool: ‘source-map’

// It is worth noting that because tools like Webpack often carry out multiple transformations using many processors at once
//  (e.g. Babel and TypeScript) it can still produce a single source map. Each processor will produce its own source map
//   but there are libraries available which can concatenate JavaScript files while consolidating corresponding source map files. 
//   An example is called mapcat.

// AST stands for “Abstract Syntax Tree”, it is basically a tree of “Nodes” representing a Program of code. 
// A “Node” is the smallest possible unit and is basically a POJO (i.e. plain old js object) with “type” and “location” properties. 
// All Nodes have these 2 properties, but based on the “type” they can have various other properties as well.

// In AST form code is very easy to manipulate, so operations like adding, removing or even replacing.

// An example is the below code:

funtion add(number){
    return number +1;
}

//will become the following AST:
program:Program{
    type:"Program",
    sourceType:"module"
    body:[
        FunctionDeclaration{
            type:"FunctionDeclaration"
            id:Identifier
            generator:false
            async:false
            pramas:[]
            body:BlockStatement{
                type:"BlockStatement"
                body:[
                    ReturnStatement
                ]
                directives:[]
            }
        }
    ]
    directives:[]
}

// There are websites such as https://astexplorer.net which are great at letting you write JavaScript code and immediately see its AST.

// Tree traversal
// The most important part of processing the AST is understanding that there are different approaches 
// and each has pros and cons.

// An example of a popular type (and the type we will use today) is called “Depth-first search” and it works 
// by starting at the root and exploring as far left as possible along each branch before backtracking. 
// So it would process a tree in the below order:

// 4. Steps in transforming JavaScript
// There are 3 steps in transforming JavaScript:

// 1) Parse source code into AST
// Lexical analysis -> Turn string of code into a stream (i.e. an array) of tokens.
// Syntactic analysis -> Turn stream of tokens into its AST representation
// 2) Transform nodes on AST
// Manipulate AST nodes (any library plugins would operate here e.g. Babel)
// 3) Generate source code
// Turn AST into string of JavaScript source code
// TODAY we are going to focus on the jobs of a generator !!

// Libraries differ between doing just step 1 to doing all 3 steps.

// Examples of libraries which do all 3:


// 5. How compilers build source maps
// There are 3 parts to producing a source map, all of which a compiler has to do:

// Transform code and note the new generated source location
// Check for a difference in location between the original and generated code
// Using these mapping build a source map
// This is an over-simplification and we will get more into the nuts and bolts of it in Part B below.

// THE PROCESS
// There are a couple of steps our compiler must perform:

// 1. Parse the code to AST
// As this article is not focusing on parsing, we will use a basic 3rd party tool for this (esprima or escodegen)

// 2. Add a shallow clone of each node onto the AST
// This idea was borrowed from recast. The idea is that each Node will hold itself as well as a clone of itself (i.e. the original). The clone is used to check if the Node has changed. More about this later.

// 3. Transformation
// We will manually be doing this. We could have used a library such as ast-types or @babel/types as they have useful APIs.

// 4. Generate source code
// Turn our AST into JavaScript.

// 5. Add source map support
// 4 and 5 are done at the same time as above. This will involve traversing the tree and detecting where the AST node has changed with its “original” property. For those instances store a mapping between the “original” and the “generated” code.

// 6. Write to build/
// Finally write our generated source code and its source map to the appropriate file.

// THE CODE
// Let us look at these steps again, but this time in more detail.

// 1. Parse the code to AST
// Using a basic 3rd party tool (I went for a simple one called ast), we grab our file contents and pass them into the libraries parser.


import fs from "fs"
import path from "path"
import ast from "abstract-syntax-tree"

const file = "./src/index.es6.js"
const fullPath = path.resolve(file)
const fileContents = fs.readFileSync(fullPath, "utf8")
const sourceAst = ast.parse(fileContents, { loc: true })

// 2. Add a shallow clone of each node onto the AST
// First we define a function called “visit” with the job of traversing the tree and executing our callback 
// function on every single Node.
export function visit(ast, callback) {
    callback(ast)
  
    const keys = Object.keys(ast)
    for (let i = 0; i < keys.length; i++) {
      const keyName = keys[i]
      const child = ast[keyName]
      if (keyName === "loc") return
      if (Array.isArray(child)) {
        for (let j = 0; j < child.length; j++) {
          visit(child[j], callback)
        }
      } else if (isNode(child)) {
        visit(child, callback)
      }
    }
  }
  function isNode(node) {
    return typeof node === "object" && node.type
  }

//   Here we are doing a “depth-first search” as mentioned above. For a given Node it will:

// Execute the callback
// Check for the location property, if so return early
// Check for any properties which are arrays, if so call itself with each child
// Check For any properties which are AST Nodes, if so call itself with the node.
// Next we move onto producing our clones.

export const cloneOriginalOnAst = ast => {
    visit(ast, node => {
      const clone = Object.assign({}, node)
      node.original = clone
    })
  }