import Tokenizer from './tokenizer.mjs';
import Parser from './parser.mjs';
import Evaluator from './evaluator.mjs';

// Sample
const input = `let x = 5 + 3 * 2;
print(x);`;

// Tokenize the input
const tokenizer = new Tokenizer(input);
const tokens = tokenizer.tokenize();
console.log('Tokens:', tokens);

// Parse the tokens into an AST
const parser = new Parser(tokens);
const ast = parser.parse();
console.log('AST:', JSON.stringify(ast, null, 2));

// Evaluate the AST
const evaluator = new Evaluator(ast);
evaluator.evaluate();

