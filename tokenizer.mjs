class Tokenizer {
    constructor(input) {
        this.input = input;
        this.position = 0;
    }

    getNextToken() {
        while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
            this.position++;
        }

        if (this.position >= this.input.length) {
            return null; // End of input
        }

        const currentChar = this.input[this.position];

        if (/[a-zA-Z_]/.test(currentChar)) {
            let start = this.position;
            while (this.position < this.input.length && /[a-zA-Z0-9_]/.test(this.input[this.position])) {
                this.position++;
            }
            const value = this.input.slice(start, this.position);
            return { type: this.isKeyword(value) ? 'KEYWORD' : 'IDENTIFIER', value: value };
        }

        if (/\d/.test(currentChar)) {
            let start = this.position;
            while (this.position < this.input.length && /\d/.test(this.input[this.position])) {
                this.position++;
            }
            const value = this.input.slice(start, this.position);
            return { type: 'NUMBER', value: value };
        }

        const operators = ['=', '+', '-', '*', '/', '(', ')', ';'];
        if (operators.includes(currentChar)) {
            this.position++;
            return { type: 'OPERATOR', value: currentChar };
        }

        throw new Error(`Unexpected character: ${currentChar}`);
    }

    isKeyword(word) {
        const keywords = ['let', 'print'];
        return keywords.includes(word);
    }

    tokenize() {
        const tokens = [];
        let token;
        while ((token = this.getNextToken()) !== null) {
            tokens.push(token);
        }
        return tokens;
    }
}

export default Tokenizer;
