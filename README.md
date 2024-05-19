
# Interpreter for a Simple Language

This project is an interpreter for a simple programming language, built using JavaScript. It includes the following components:

- **Tokenizer:** Converts the input source code into tokens.
- **Parser:** Constructs an Abstract Syntax Tree (AST) from the tokens.
- **Evaluator:** Executes the AST and produces the output.

## Features

- Supports variable assignment and basic arithmetic operations.
- Includes support for `let` and `print` statements.
- Implements recursive descent parsing.

## Example

Given the input:
```javascript
let x = 5;
print(x + 2);
```

The interpreter will output:
```
7
```

## Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/interpreter.git
   cd interpreter
   ```

2. **Install Node.js**
   Make sure you have [Node.js](https://nodejs.org/) installed.

3. **Run the Interpreter**
   ```sh
   node index.js
   ```

## Files

- **index.js:** Entry point of the interpreter. Tokenizes the input, parses it into an AST, and evaluates it.
- **tokenizer.js:** Contains the `Tokenizer` class, which converts the input source code into tokens.
- **parser.js:** Contains the `Parser` class, which constructs an AST from the tokens.
- **evaluator.js:** Contains the `Evaluator` class, which executes the AST and produces the output.

## How to Use

1. **Modify the Input Code**
   Open `index.js` and modify the `input` variable with the code you want to interpret.

2. **Run the Interpreter**
   ```sh
   node index.js
   ```

## Example Usage

The `index.js` file contains the following code:

```javascript
import Tokenizer from './tokenizer.js';
import Parser from './parser.js';
import Evaluator from './evaluator.js';

const input = `let x = 5;
print(x + 2);`;

const tokenizer = new Tokenizer(input);
const tokens = tokenizer.tokenize();
console.log('Tokens:', tokens);

const parser = new Parser(tokens);
const ast = parser.parse();
console.log('AST:', JSON.stringify(ast, null, 2));

const evaluator = new Evaluator(ast);
evaluator.evaluate();
```

Running `node index.js` will produce the following output:

```
Tokens: [
  { type: 'KEYWORD', value: 'let' },
  { type: 'IDENTIFIER', value: 'x' },
  { type: 'OPERATOR', value: '=' },
  { type: 'NUMBER', value: '5' },
  { type: 'OPERATOR', value: ';' },
  { type: 'KEYWORD', value: 'print' },
  { type: 'IDENTIFIER', value: 'x' },
  { type: 'OPERATOR', value: '+' },
  { type: 'NUMBER', value: '2' },
  { type: 'OPERATOR', value: ';' }
]
AST: [
  {
    "type": "LetStatement",
    "identifier": "x",
    "expression": {
      "type": "Literal",
      "value": 5
    }
  },
  {
    "type": "PrintStatement",
    "expression": {
      "type": "BinaryExpression",
      "operator": "+",
      "left": {
        "type": "Identifier",
        "name": "x"
      },
      "right": {
        "type": "Literal",
        "value": 2
      }
    }
  }
]
7
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.