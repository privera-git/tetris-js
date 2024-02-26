class Score {
    constructor(element) {
        this.score = 0;
        this.element = element;
    }

    addRows(rows) {
        let amount = this.getScore(rows);
        console.info(rows + ' rows completed => ' + amount + ' points');
        this.score += amount;
    }

    getScore(rows) {
        switch(rows) {
            case 4: return 10000;
            case 3: return 6000;
            case 2: return 3000;
            case 1: return 1000;
            default: return 0;   
        }     
    }

    draw() {
        this.element.textContent = this.score;
    }
}