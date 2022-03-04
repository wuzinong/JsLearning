
Using a 3rd party tool for AST parsing (ast.tsx)
1. Determine files full path(very important so its clear if we are dealingwith the same file again)
2. Grab files contents
3. Parse into AST
4. Store both contents and AST onto a "module" object
5. Process the dependencies inside the contents(using the AST "ImportDeclaration" value),recursively calling this function with the value
6. Finally add that function to the dpsArray, so we can build up our tree with the first file appearing last(this is important)
