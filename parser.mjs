class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.currentTokenIndex = 0;
    }

    parse() {
        const statements = [];
        while (this.currentTokenIndex < this.tokens.length) {
            statements.push(this.parseStatement());
        }
        return statements;
    }

    parseStatement() {
        const token = this.tokens[this.currentTokenIndex];
        if (token.type === 'KEYWORD' && token.value === 'let') {
            return this.parseLetStatement();
        } else if (token.type === 'KEYWORD' && token.value === 'print') {
            return this.parsePrintStatement();
        }
        throw new Error(`Unexpected token: ${token.value}`);
    }

    parseLetStatement() {
        this.consume('KEYWORD', 'let');
        const identifier = this.consume('IDENTIFIER').value;
        this.consume('OPERATOR', '=');
        const expression = this.parseExpression();
        this.consume('OPERATOR', ';');
        return { type: 'LetStatement', identifier, expression };
    }

    parsePrintStatement() {
        this.consume('KEYWORD', 'print');
        const expression = this.parseExpression();
        this.consume('OPERATOR', ';');
        return { type: 'PrintStatement', expression };
    }

    parseExpression() {
        let left = this.parseTerm();
        while (this.match('OPERATOR', '+') || this.match('OPERATOR', '-')) {
            const operator = this.tokens[this.currentTokenIndex].value;
            this.currentTokenIndex++;
            const right = this.parseTerm();
            left = { type: 'BinaryExpression', operator, left, right };
        }
        return left;
    }

    parseTerm() {
        let left = this.parseFactor();
        while (this.match('OPERATOR', '*') || this.match('OPERATOR', '/')) {
            const operator = this.tokens[this.currentTokenIndex].value;
            this.currentTokenIndex++;
            const right = this.parseFactor();
            left = { type: 'BinaryExpression', operator, left, right };
        }
        return left;
    }

    parseFactor() {
        const token = this.tokens[this.currentTokenIndex];
        if (token.type === 'NUMBER') {
            this.currentTokenIndex++;
            return { type: 'Literal', value: parseFloat(token.value) };
        } else if (token.type === 'IDENTIFIER') {
            this.currentTokenIndex++;
            return { type: 'Identifier', name: token.value };
        } else if (this.match('OPERATOR', '(')) {
            this.currentTokenIndex++;
            const expression = this.parseExpression();
            this.consume('OPERATOR', ')');
            return expression;
        }
        throw new Error(`Unexpected token: ${token.value}`);
    }

    consume(type, value) {
        const token = this.tokens[this.currentTokenIndex];
        if (token.type !== type || (value && token.value !== value)) {
            throw new Error(`Expected token ${value}, but got ${token.value}`);
        }
        this.currentTokenIndex++;
        return token;
    }

    match(type, value) {
        const token = this.tokens[this.currentTokenIndex];
        return token.type === type && (!value || token.value === value);
    }
}

export default Parser;
