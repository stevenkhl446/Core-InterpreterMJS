class Evaluator {
    constructor(ast) {
        this.ast = ast;
        this.environment = {}; // For storing variables
    }

    evaluate() {
        this.ast.forEach(statement => this.evaluateStatement(statement));
    }

    evaluateStatement(statement) {
        switch (statement.type) {
            case 'LetStatement':
                this.environment[statement.identifier] = this.evaluateExpression(statement.expression);
                break;
            case 'PrintStatement':
                console.log(this.evaluateExpression(statement.expression));
                break;
            default:
                throw new Error(`Unknown statement type: ${statement.type}`);
        }
    }

    evaluateExpression(expression) {
        switch (expression.type) {
            case 'Literal':
                return expression.value;
            case 'Identifier':
                if (expression.name in this.environment) {
                    return this.environment[expression.name];
                }
                throw new Error(`Undefined variable: ${expression.name}`);
            case 'BinaryExpression':
                const left = this.evaluateExpression(expression.left);
                const right = this.evaluateExpression(expression.right);
                switch (expression.operator) {
                    case '+':
                        return left + right;
                    case '-':
                        return left - right;
                    case '*':
                        return left * right;
                    case '/':
                        return left / right;
                    default:
                        throw new Error(`Unknown operator: ${expression.operator}`);
                }
            default:
                throw new Error(`Unknown expression type: ${expression.type}`);
        }
    }
}

export default Evaluator;

