function Cobra() {
    this.x = 0;
    this.y = 0;
    this.velocidadeX = 1;
    this.velocidadeY = 0;
    this.total = 0;
    this.cauda = [];

    this.dir = function (x, y) {
        this.velocidadeX = x;
        this.velocidadeY = y;
    }

    this.comer = function (posicao) {
        var distancia = dist(this.x, this.y, posicao.x, posicao.y);

        if (distancia < 1) {
            this.total++;
            return true;
        }
        else { return false; }
    }

    this.perder = function () {
        for (var i = 0; i < this.cauda.length; i++) {
            var pos = this.cauda[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                alert("começar novamente");
                this.total = 0;
                this.cauda = [];
            }
        }
    }

    this.update = function () {
        /*for(var i=0; i<this.total-1; i++){
            this.cauda[i] = this.cauda[i-1];
        }
        this.cauda[this.total-1]=createVector(this.x, this.y);*/
        if (this.total === this.cauda.length) {
            for (var i = 0; i < this.cauda.length - 1; i++) {
                this.cauda[i] = this.cauda[i + 1];
            }
        }
        this.cauda[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.velocidadeX * escala;
        this.y = this.y + this.velocidadeY * escala;

        this.x = constrain(this.x, 0, width - escala);
        this.y = constrain(this.y, 0, height - escala);

    }

    this.show = function () {
        fill(255);
        for (var i = 0; i < this.cauda.length - 1; i++) {
            rect(this.cauda[i].x, this.cauda[i].y, escala, escala);
        }

        rect(this.x, this.y, escala, escala);
    }
}

