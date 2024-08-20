function compiler(input) {
  let tokens = tokenizer(input); //生成token
  let ast = parser(tokens); //生成ast
  let newAst = transformer(ast); //拿到转换后的ast
  let output = codeGenerator(newAst); //生成代码
  return output;
}
