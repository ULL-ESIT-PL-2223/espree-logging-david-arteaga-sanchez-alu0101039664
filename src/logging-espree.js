import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8')
  let output = addLogging(input);
  if (outputFile === undefined) {
      console.log(output);
      return;
  }
  await fs.writeFile(outputFile, output);
}

export function addLogging(code) {
  const ast = espree.parse(code, {ecmaVersion:12, loc:true});
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (
        node.type === "FunctionDeclaration" ||
        node.type === "FunctionExpression" ||
        node.type === "ArrowFunctionExpression"
      ) {
        addBeforeCode(node);
      }
    }
  });
  return escodegen.generate(ast);
}

function addBeforeCode(node) {
  const name = node.id ? node.id.name : "<anonymous function>";
  const parameters = node.params.map(param => `\$\{${param.name}\}`);
  const beforeCode = `console.log(\`Entering ${name}(${parameters}) at line ${node.loc.start.line}\`);`;
  const beforeNode = espree.parse(beforeCode, {ecmaVersion:12, loc:true}).body;
  node.body.body = beforeNode.concat(node.body.body);
}
