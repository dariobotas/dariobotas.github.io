var c;
var escala = 20;

var comida;

 function Jogo() {
     var game = document.getElementById("game");
    
    /*while(game.firstChild != undefined){
        game.removeChild(game.firstChild);
    }*/
    game.appendChild(setup());
 }

function setup() {
   var canvas = createCanvas(600, 600);
    /*canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.getElementsByTagName("canvas"));
    }*/
    document.getElementById('snake-game').appendChild(canvas);
    c = new Cobra();
    frameRate(10);
    escolheLocalizacao();

}

function escolheLocalizacao() {
    var colunas = floor(width / escala);
    var linhas = floor(height / escala);

    comida = createVector(floor(random(colunas)), floor(random(linhas)));
    comida.mult(escala);
}

function draw() {
    background(51);

    if (c.comer(comida)) { escolheLocalizacao(); }
    c.perder();
    c.update();
    c.show();
    fill(205, 0, 100);
    rect(comida.x, comida.y, escala, escala);
}


function keyPressed() {
    if (keyCode === UP_ARROW) {
        c.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        c.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        c.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        c.dir(-1, 0);
    }
}