/* Sistema Domótico */

window.onload = menuPrincipal;

 /**
  * Menu principal do Sistema Domótico.
  Este menu contém todos os elementos que vão sevir de layout principal para todo o site.
  É constituído por 3 div's que vão estar dentro da div principal que tem como identificador "sistema":
   - Uma div para os títulos;
   - Uma div para a lista (ou todo o conteúdo do sistema;
   - Uma div para os botões. 
  */
 function menuPrincipal() {
    var sistema = document.getElementById("sistema");

    var titulos = document.createElement("div");
    var lista = document.createElement("div");
    var botoes = document.createElement("div");

    var h1 = document.createElement("h1");
    var h2 = document.createElement("h2");

    var botaoCriar = document.createElement("input");
    var botaoEliminar = document.createElement("input");
    var botaoEntrar = document.createElement("input");

    while(sistema.firstChild != undefined){
        sistema.removeChild(sistema.firstChild);
    }

    titulos.id="titulos";

    h1.appendChild(document.createTextNode("Sistema Domótico"));
    h2.appendChild(document.createTextNode("Consolas: "));
    
    titulos.appendChild(h1);
    titulos.appendChild(h2);

    lista.id="lista";

    botaoCriar.type="button";
    botaoCriar.value="Criar piso";
    botaoCriar.id="criar";
    botaoCriar.addEventListener("click", function(event) {
        adicionarPiso();
    });

    botaoEliminar.type="button";
    botaoEliminar.value="Eliminar piso";
    botaoEliminar.id="eliminar";
    botaoEliminar.addEventListener("click", function(event) {
        removerPiso();
    });

    botaoEntrar.type="button";
    botaoEntrar.value="Entrar no piso";
    botaoEntrar.id="entrar";
    botaoEntrar.addEventListener("click", function(event) {
        entrarNoPiso();
    });

    botoes.id="botoes";
    botoes.appendChild(botaoCriar);
    botoes.appendChild(botaoEliminar);
    botoes.appendChild(botaoEntrar); 

    sistema.appendChild(titulos);
    sistema.appendChild(lista);
    sistema.appendChild(botoes);

    listarPisos();
}

var pisos = [];
var onclick = (typeof onclick === "function") ? onclick : function(){};

/**
 * Função responsável por adicionar um piso ao sistema domótico.
 * Será pedido para inserir um nome para o piso, esse nome é verificado e depois adicionado ao array de pisos através do método push.
 * Feito isto, serão listados os pisos, já com este acrescentado.
 */
function adicionarPiso() {
    var nomePiso = prompt("Insira o nome do piso: ");
    
    if(nomePiso === "" || nomePiso === undefined || nomePiso === null){
        alert("Por favor insira um nome!!");
        return;
    }

    for(var i=0; i < pisos.length; i++){
        if(pisos[i].nome === nomePiso){
            alert("Este nome já foi inserido, insira um nome diferente!");
            return;
        }
    }
    var novoPiso = new Piso(nomePiso);
    pisos.push(novoPiso);
    listarPisos();
}

/**
 * Função que irá remover um/vários piso/s do array e consequentemente do sistema domótico.
 * Será verificado se o checkbox deste/s foi/foram selecionados e feita essa confirmação, irão ser removidos os pisos.
 * Depois disto, será listado novamente o sistema domótico, mas sem os pisos. 
 */
function removerPiso() {
    for(var i=pisos.length - 1; i>=0; i--){
        if(pisos[i].checkbox.checked == true){
            var piso=Object.create(pisos[i]);
            pisos.splice(i,1);
            listarPisos();
        }
    }
}

/**
 * Função que irá listar todos os pisos contidos na div "lista" que está no sistema domótico.
 */
function listarPisos() {
    var lista = document.getElementById("lista");
    var ul = document.createElement("ul");
    ul.id="ul";

    for(var i=0; i < pisos.length; i++){
        pisos.sort(compararEquipamentos);
        var li = document.createElement("li");
        var a = document.createElement("a");

        var piso=pisos[i];

        a.appendChild(document.createTextNode(pisos[i].nome));
        /**
         * Função para entrar no piso da lista ao clicar sobre o nome
         */
        a.onclick=(function(posicao, onclick){
            return function(){
            onclick(Piso.prototype.apresentarCompartimentos(posicao));
        };
    })(piso, this.onclick);
        
        li.appendChild(pisos[i].checkbox);
        li.appendChild(a);
        ul.appendChild(li);
    }
    
    while(lista.firstChild != undefined){
        lista.removeChild(lista.firstChild);
    }
    lista.appendChild(ul);
}

/**
 * Função que verifica se está selecionado alguma checkbox correspondente ao piso e depois entrará nesse piso.
 * Se for selecionado mais do que um item, o sistema irá entrar naquele que tem o "i" maior.  
 */
function entrarNoPiso() {
    for(var i = 0; i < pisos.length; i++){
        if(pisos[i].checkbox.checked == true){
            pisos[i].checkbox.checked = false;
            Piso.prototype.apresentarCompartimentos(pisos[i]);
        }
    }
}

/* Pisos */

/**
 * Função representativa duma classe construtora do Piso (ou Consola).
 * @constructor
 * @param {String} nome
 */
function Piso(nome){
    this.nome = nome;
    this.checkbox = document.createElement("input");
    this.checkbox.type="checkbox";
    this.compartimentos = [];
    this.onclick = (typeof onclick === "function") ? onclick : function(){};
}
Piso.prototype.constructor = Piso;

/**
 * Método apresentarCompartimentos que é adicionado à classe construtora Piso (ao prototype existente) que irá apresentar todo o conteúdo do piso. 
 * Irá mostrar todos os compartimentos do piso.
 * Este irá usar todo o layout construído na função menuPrincipal.
 * 
 * @param {Compartimento} compartimento
 */
Piso.prototype.apresentarCompartimentos = function(compartimento) {
   var sistema = document.getElementById("sistema");
   while(sistema.firstChild != undefined){
        sistema.removeChild(sistema.firstChild);
    }

   var titulos = document.createElement("div");
   var lista = document.createElement("div");
   var botoes = document.createElement("div");
   
   var titulo1 = document.createElement("h1");
   var criarTitulo = document.createTextNode(compartimento.nome);
   var subtitulo1 = document.createElement("h2");
   var criarSubTitulo = document.createTextNode("Compartimentos: ");
   
   var botaoCriar = document.createElement("input");
   var botaoEliminar = document.createElement("input");
   var botaoVoltar = document.createElement("input");
   var botaoEntrar = document.createElement("input");
   var nome = compartimento.nome;
   titulo1.appendChild(criarTitulo);
   titulo1.addEventListener("click", function() {
      var novoNome = prompt("Insira um nome novo para o piso: ");
      
    if(novoNome === "" || novoNome === null || novoNome === undefined){
        alert("Não introduziu nenhum nome, introduza um nome diferente!");
        return;
    }
    
    for(var i = 0; i < pisos.length; i++){
        if(pisos[i].nome.toUpperCase() === novoNome.toUpperCase()){
            alert("Nome igual. Introduza um nome diferente");
            return;
        }
    }
    
    compartimento.nome = novoNome;
    Piso.prototype.apresentarCompartimentos(compartimento);
   
   }, false);
   subtitulo1.appendChild(criarSubTitulo);
   
   titulos.id="titulos";   
   titulos.appendChild(titulo1);
   titulos.appendChild(subtitulo1);   
   
   lista.id="lista";
   lista.addEventListener("onclick", function () {
       var ul = document.getElementById("ul");
       entrar(ul);
   });
   
   botaoCriar.type="button";
   botaoCriar.value="Criar";
   botaoCriar.id="criarCompartimento";
   botaoCriar.addEventListener("click", function(event){
      compartimento.adicionarCompartimento();
    });

   botaoEliminar.type="button";
   botaoEliminar.value="Eliminar";
   botaoEliminar.id="eliminarCompartimento";
   botaoEliminar.addEventListener("click",function (){
      compartimento.removerCompartimento();
    });
    botaoEntrar.type="button";
    botaoEntrar.value="Entrar no compartimento";
    botaoEntrar.id="entrarCompartimento";
    botaoEntrar.addEventListener("click",function (){
            compartimento.entrarNoCompartimento();
    });
    botaoVoltar.type="button";
    botaoVoltar.value="Voltar";
    botaoVoltar.id="voltarSistemaDomotico";
    botaoVoltar.addEventListener("click", function(){
    menuPrincipal();
    });
    
   botoes.id="botoes"; 
   botoes.appendChild(botaoCriar);
   botoes.appendChild(botaoEliminar);
   botoes.appendChild(botaoEntrar);
   botoes.appendChild(botaoVoltar);
    
   sistema.appendChild(titulos);
   sistema.appendChild(lista);
   sistema.appendChild(botoes);
   
   compartimento.listarCompartimentos();
};

/**
 * Método adicionarCompartimento do prototype piso, que irá adicionar um compartimento ao piso, depois de feitas as respectivas verificações do texto, referente à igualdade de nomes ou se está vazio. 
 * 
 */
Piso.prototype.adicionarCompartimento = function() {
    var nomeCompartimento = prompt("Insira o nome do compartimento: ");
    
    if(nomeCompartimento === "" || nomeCompartimento === undefined || nomeCompartimento === null){
        alert("Por favor insira um nome!!");
        return;
    }

    for(var i=0; i < this.compartimentos.length; i++){
        if(this.compartimentos[i].nome === nomeCompartimento){
            alert("Este nome já foi inserido, insira um nome diferente!");
            return;
        }
    }
    var novoCompartimento = new Compartimento(nomeCompartimento);
    this.compartimentos.push(novoCompartimento);
    this.listarCompartimentos();
};

/**
 * Método removerCompartimento do prototype piso, que irá remover um compartimento do piso, depois de verificado se algum compartimento foi selecionado. 
 */
Piso.prototype.removerCompartimento = function() {
    for(var i=this.compartimentos.length - 1; i>=0; i--){
        if(this.compartimentos[i].checkbox.checked == true){
            var compartimento=Object.create(this.compartimentos[i]);
            this.compartimentos.splice(i,1);
            this.listarCompartimentos();
        }
    }
};

/**
 * Método listarCompartimentos do prototype piso, que irá listar ordenadamente todos os compartimentos do piso.
 */
Piso.prototype.listarCompartimentos = function() {
    var lista = document.getElementById("lista");
    var ul = document.createElement("ul");
    ul.id="ul";

    for(var i=0; i < this.compartimentos.length; i++){
        this.compartimentos.sort(compararEquipamentos);
        var li = document.createElement("li");
        var a = document.createElement("a");
        var compartimento=this.compartimentos[i];
        
        a.appendChild(document.createTextNode(this.compartimentos[i].nome));
        /**
         * Função para entrar no compartimento da lista ao clicar sobre o nome
         */
        a.onclick=(function(piso, posicao, onclick){
            return function(){
            onclick(Compartimento.prototype.apresentarEquipamentos(piso, posicao));
        };
            })(this, compartimento, this.onclick);

        li.appendChild(this.compartimentos[i].checkbox);
        li.appendChild(a);
        ul.appendChild(li);
    }
    while(lista.firstChild != undefined){
        lista.removeChild(lista.firstChild);
    }
    lista.appendChild(ul);
};

/**
 * Método entrarNoCompartimento do prototype piso, que irá verificar se está selecionado alguma checkbox correspondente ao compartimento e depois entrará nesse compartimento.
 * Se for selecionado mais do que um item, o sistema irá entrar naquele que tem o "i" maior.  
 */
Piso.prototype.entrarNoCompartimento = function() {
    for(var i = 0; i < this.compartimentos.length; i++){
        if(this.compartimentos[i].checkbox.checked == true){
            this.compartimentos[i].checkbox.checked = false;
            Compartimento.prototype.apresentarEquipamentos(this, this.compartimentos[i]);
        }
    }
};

/* Compartimentos */

    var numeroArCondicionado=0;
    var numeroDetetoresDeEstoreEletrico=0;
    var numeroDetetoresDeFecho=0;
    var numeroDetetoresDeMovimento=0;
    var numeroDeTrincosEletricos=0;
    var numeroGeradoresDeMovimento=0;
    var numeroMotoresEletricos=0;
    var numeroTermometros=0;
    
/**
 * Função representativa duma classe construtora do Compartimento.
 * @constructor
 * @param {String} nome
 */
function Compartimento(nome){
    this.nome = nome;
    this.equipamentos = [];
    this.checkbox = document.createElement("input");
    this.checkbox.type="checkbox";
    
}
Compartimento.prototype.constructor = Compartimento;

/**
 * Método apresentarEquipamentos que é adicionado à classe construtora Compartimento (ao prototype existente) que irá apresentar todo o conteúdo do compartimento. 
 * Irá mostrar todos os equipamentos do compartimento.
 * Este irá usar todo o layout construído na função menuPrincipal.
 * 
 * @param {Piso} piso
 * @param {Compartimento} compartimento
 */
Compartimento.prototype.apresentarEquipamentos = function(piso, compartimento) {
   var sistema = document.getElementById("sistema");
   while(sistema.firstChild != undefined){
        sistema.removeChild(sistema.firstChild);
    }

   var titulos = document.createElement("div");
   var lista = document.createElement("div");
   var botoes = document.createElement("div");
   
   var titulo1 = document.createElement("h1");
   var subtitulo1 = document.createElement("h2");
   var criarSubTitulo = document.createTextNode("Equipamentos: ");
   
   var botaoCriar = document.createElement("input");
   var botaoEliminar = document.createElement("input");
   var botaoVoltar = document.createElement("input");
   var botaoVoltarPiso = document.createElement("input");
   var botaoMonitorizar = document.createElement("input");
   
   titulo1.appendChild(document.createTextNode(compartimento.nome));
   titulo1.addEventListener("click", function() {
      var novoNome = prompt("Insira um nome novo para o compartimento: ");

    if(novoNome == null || novoNome == undefined){
        alert("Não é possivel efetuar a operacão");
    }
    
    for(var i = 0; i < piso.compartimentos.length; i++){
        if(piso.compartimentos[i].nome.toUpperCase() == novoNome.toUpperCase()){
            alert("Não é possivel efetuar a operação");
            break;
        }
    }
    
    compartimento.nome = novoNome;
    Compartimento.prototype.apresentarEquipamentos(piso, compartimento);
   });
   
   subtitulo1.appendChild(criarSubTitulo);
      
   titulos.appendChild(titulo1);
   titulos.appendChild(subtitulo1);   
   
   lista.id="lista";
   
   botaoCriar.type="button";
   botaoCriar.value="Criar";
   botaoCriar.id="criarEquipamento";
   botaoCriar.addEventListener("click", function(event){
      compartimento.adicionarEquipamento();
    });

   botaoEliminar.type="button";
   botaoEliminar.value="Eliminar";
   botaoEliminar.id="eliminarCompartimento";
   botaoEliminar.addEventListener("click",function (){
      compartimento.removerEquipamento();
    });
    botaoVoltarPiso.type="button";
    botaoVoltarPiso.value="Voltar ao "+piso.nome;
    botaoVoltarPiso.id="voltarPiso";
    botaoVoltarPiso.addEventListener("click", function(){
        Piso.prototype.apresentarCompartimentos(piso);
    });
    botaoVoltar.type="button";
    botaoVoltar.value="Voltar ao menu principal";
    botaoVoltar.id="voltarSistemaDomotico";
    botaoVoltar.addEventListener("click", function(){
        menuPrincipal();
    });
    botaoMonitorizar.type="button";
    botaoMonitorizar.value="Monitorizar";
    botaoMonitorizar.id="monitorizarEquipamentos";
    /**
     * Ao clicar no botão monitorizar, ele irá entrar no método monitorizar do compartimento.
     */
    botaoMonitorizar.onclick=function(){compartimento.monitorizar(piso);};
    
   botoes.id="botoes"; 
   botoes.appendChild(botaoCriar);
   botoes.appendChild(botaoEliminar);
   botoes.appendChild(botaoVoltarPiso);
   botoes.appendChild(botaoVoltar);
   botoes.appendChild(botaoMonitorizar);
    
   sistema.appendChild(titulos);
   sistema.appendChild(lista);
   sistema.appendChild(botoes);
   
   compartimento.listarEquipamentos();
   
};

/**
 * Método adicionarEquipamento do prototype Compartimento, que irá adicionar um equipamento ao compartimento, depois de feitas as respectivas verificações do numero escolhido ou se não foi inserido nada. 
 * 
 */
Compartimento.prototype.adicionarEquipamento = function() {
    var numeroEquipamento = prompt("Escolha o equipamento que quer adicionar: \nSensores 1-Termometro, 2-Detetor de Movimento, 3-Detetor de Fecho de Porta, 4-Detetor de Posicao Em Estore Eletrico. \nAtuadores: 5-Ar Condicionado, 6-Gerador de Movimento, 7-Trinco Eletrico, 8-Motor Eletrico Estore");
    
    if(numeroEquipamento === "" || numeroEquipamento === null || numeroEquipamento===undefined){
        alert("Por favor insira um nome!!");
        return;
    }

    switch(numeroEquipamento){
        case "1":
            if(Equipamento.prototype.existemEquipamentosLigados(this.equipamentos, ArCondicionado)){
                var termometro = new Termometro(TipoDeSensores.Termómetro, numeroTermometros, ArCondicionado.prototype.calcularMedia(this.equipamentos));
                this.equipamentos.push(termometro);
            }else{
                var termometro = new Termometro(TipoDeSensores.Termómetro, numeroTermometros);
                this.equipamentos.push(termometro);
            
            }
            numeroTermometros++;
            this.listarEquipamentos();
            break;
        case "2":
            var detetorDeMovimento = new DetetorDeMovimento(TipoDeSensores.DetetorDeMovimento, numeroDetetoresDeMovimento);
            this.equipamentos.push(detetorDeMovimento);
            numeroDetetoresDeMovimento++;
            this.listarEquipamentos();
            break;
        case "3":
            var detetorDeFecho = new DetetorDeFechoEmPorta(TipoDeSensores.DetetorDeFechoEmPorta, numeroDetetoresDeFecho);
            this.equipamentos.push(detetorDeFecho);
            numeroDetetoresDeFecho++;
            this.listarEquipamentos();
            break;
        case "4":
            var detetorDeEstoreEletrico = new DetetorDePosicaoEstoreEletrico(TipoDeSensores.DetetorDePosiçãoEmEstoreElétrico, numeroDetetoresDeEstoreEletrico);
            this.equipamentos.push(detetorDeEstoreEletrico);
            numeroDetetoresDeEstoreEletrico++;
            this.listarEquipamentos();
            break;
        case "5":
            var arCondicionado = new ArCondicionado(TipoDeAtuadores.ArCondicionado, numeroArCondicionado);
            this.equipamentos.push(arCondicionado);
            numeroArCondicionado++;
            this.listarEquipamentos();
            break;
        case "6":
            var geradorDeMovimento = new GeradorDeMovimento(TipoDeAtuadores.GeradorDeMovimento, numeroGeradoresDeMovimento);
            this.equipamentos.push(geradorDeMovimento);
            numeroGeradoresDeMovimento++;
            this.listarEquipamentos();
            break;
        case "7":
            var trincoEletrico = new TrincoEletrico(TipoDeAtuadores.TrincoEletrico, numeroDeTrincosEletricos);
            this.equipamentos.push(trincoEletrico);
            numeroDeTrincosEletricos++;
            this.listarEquipamentos();
            break;
        case "8":
            var motorEletricoEstore = new MotorEletricoDeEstore(TipoDeAtuadores.MotorEletricoDeEstore, numeroMotoresEletricos);
            this.equipamentos.push(motorEletricoEstore);
            numeroMotoresEletricos++;
            this.listarEquipamentos();
            break;
        default:
            alert("Por favor escolha o número correspondente ao equipamento!");
            this.listarEquipamentos();
            break;                                    
    }
};

/**
 * Método removerEquipamento do prototype Compartimento, que irá remover um equipamento do compartimento, depois de verificado se algum equipamento foi selecionado.
 * Se forem selecionados mais equipamentos, irá remover todos os selecionados. 
 */
Compartimento.prototype.removerEquipamento = function() {
    for(var i = this.equipamentos.length - 1; i>=0; i--){
        if(this.equipamentos[i].checkbox.checked == true){
            var equipamento=Object.create(this.equipamentos[i]);
            this.equipamentos.splice(i,1);
            this.listarEquipamentos();
        }
    }
};

/**
 * Método listarEquipamentos do prototype Compartimento, que irá listar ordenadamente todos os equipamentos do piso.
 */
Compartimento.prototype.listarEquipamentos = function() {
    var lista = document.getElementById("lista");
    var ol = document.createElement("ol");

    for(var i=0; i < this.equipamentos.length; i++){
        this.equipamentos.sort(compararEquipamentos);
        var li = document.createElement("li");
        var a = document.createElement("label");
        var checkbox = this.equipamentos[i].checkbox;
        var nome = document.createTextNode(this.equipamentos[i].nome);

        a.appendChild(nome);
        li.appendChild(checkbox);
        li.appendChild(a);
        ol.appendChild(li);        
    }

    while(lista.firstChild != undefined){
        lista.removeChild(lista.firstChild);
    }

    lista.appendChild(ol);
};

/**
 * Método monitorizar do prototype Compartimento que irá mudar os equipamentos listados para uma visão em painel,
 * onde estarão as imagens dos equipamentos e em que iremos fazer a interação entre eles.
 * Tem também um botão para voltar para a lista de equipamentos.
 * 
 * @param {Piso} piso
 */
Compartimento.prototype.monitorizar = function(piso) {
        var compartimento = Object.create(this);
        var lista = document.getElementById("lista");
        var sistema = document.getElementById("sistema");
        var botoes = document.getElementById("botoes");
        var botaoVoltarApresentarCompartimento = document.createElement("input");

        botaoVoltarApresentarCompartimento.type = "button";
        botaoVoltarApresentarCompartimento.value = "Voltar à lista";
        botaoVoltarApresentarCompartimento.addEventListener("click", function(){
            Compartimento.prototype.apresentarEquipamentos(piso, compartimento);
        });

        while(lista.firstChild != undefined){
            lista.removeChild(lista.firstChild);
        }
        
        while(botoes.firstChild != undefined ){
            botoes.removeChild(botoes.firstChild);
        }
        
        botoes.style.display="block";
        painelDeEquipamentos(lista, this.equipamentos);
    
    botoes.appendChild(botaoVoltarApresentarCompartimento);
};

/* Equipamentos */

/**
 * @enum {string} TipoDeSensores - Tipos de Sensores.
 * @readonly
 */
var TipoDeSensores = {
    /** Tipo de Sensor e sigla respectiva para Termómetro */
    Termómetro: "TM",
    /** Tipo de Sensor e sigla respectiva para Detetor De Movimento */
    DetetorDeMovimento: "DM",
    /** Tipo de Sensor e sigla respectiva para Detetor do fecho da porta */
    DetetorDeFechoEmPorta: "DF",
    /** Tipo de Sensor e sigla respectiva para Detetor de posicao do estore elétrico */
    DetetorDePosiçãoEmEstoreElétrico: "EE"
};

/**
 * @enum {string} TipoDeAtuadores - Tipos de Atuadores.
 * @readonly
 */
var TipoDeAtuadores = {
    /** Tipo de Atuador e sigla respectiva para Ar condicionado */
    ArCondicionado: "AC",
    /** Tipo de Atuador e sigla respectiva para Gerador de movimento */
    GeradorDeMovimento: "GM",
    /** Tipo de Atuador e sigla respectiva para Trinco Eletrico */
    TrincoEletrico: "TE",
    /** Tipo de Atuador e sigla respectiva para Motor eletrico do estore */
    MotorEletricoDeEstore: "ME"
};

/**
 * Função construtora Equipamento.
 * 
 * @param {String} nome
 * @param {int} id
 * 
 * @property (int) id - identificador do equipamento
 * @property (String) nome - nome do equipamento
 * @property (checkbox) checkbox - checkbox do equipamento
 */
function Equipamento(nome, id) {
    this.id = id;
    this.nome = nome + this.id;
    this.checkbox = document.createElement("input");
    this.checkbox.type="checkbox";
}
Equipamento.prototype.constructor = Equipamento;

/**
 * Método existemEquipamentosLigados do prototype Equipamento que irá verificar um equipamento do array é dum tipoDeEquipamento específico.
 * Temos apenas dois tipos, mas com a possibilidade de inserir mais tipos de equipamentos.
 * 
 * @param {array} equipamentos
 * @param {Equipamento} tipoDeEquipamento
 * @returns
 */
Equipamento.prototype.existemEquipamentosLigados = function(equipamentos, tipoDeEquipamento){
    for(var i = 0; i < equipamentos.length; i++){
        if(tipoDeEquipamento instanceof ArCondicionado){
            if(equipamentos[i] instanceof ArCondicionado){
                return true;
            }
    }
       else if(tipoDeEquipamento instanceof GeradorDeMovimento){ 
       if(equipamentos[i] instanceof GeradorDeMovimento){
            if(equipamentos[i].estado == true){
                return true;
            }
        }
       }else{
                return false;
                }
        }
        return false;
};

/* Sensores */

/**
 * Função construtora Sensor que também herda propertys de equipamento, por meio do Equipamento.prototype
 * 
 * @param {string} nome
 * @param {int} id
 * @param {any} valorOuEstado
 * @param {img} imagens
 */
function Sensor(nome, id, valorOuEstado, imagens) {
    Equipamento.call(this, nome, id);
    this.imagens=imagens || "Sem imagem" || null;
    this.valorOuEstado=valorOuEstado || null || undefined;
}
Sensor.prototype = Object.create(Equipamento.prototype);
Sensor.prototype.constructor = Sensor;

/**
 * Função construtora Termometro que também herda propertys de Sensor, por meio do Sensor.prototype
 * 
 * @param {string} nome
 * @param {int} id
 * @param {int} temperatura
 */
function Termometro(nome, id, temperatura){
    this.imagem="/images/domotico/termometro.png";
    this.temperatura = temperatura || 25; 
    Sensor.call(this, nome, id, this.temperatura, this.imagem);
}
Termometro.prototype = Object.create(Sensor.prototype);
Termometro.prototype.constructor = Termometro;

/**
 * Método mostrarTermometro do prototype Termometro que irá mostrar a imagem do termometro com o seu id e a temperatura. 
 * 
 * @param {Termometro} termometro
 * @returns div
 */
Termometro.prototype.mostrarTermometro = function(termometro){
    var div = document.createElement("div");
    var nomeTermometro = document.createElement("p");
    var temperatura = document.createElement("label");
    var imagem = document.createElement("img");

    nomeTermometro.appendChild(document.createTextNode(termometro.nome));
    nomeTermometro.style.textIndent="2px";
    nomeTermometro.style.margin="auto";

    temperatura.appendChild(document.createTextNode(termometro.temperatura + "ºC"));
    imagem.setAttribute("src", termometro.imagem);
    imagem.style.display="block";
    imagem.style.margin="auto";
    
    div.style.display="inline";
    div.appendChild(nomeTermometro);
    div.appendChild(temperatura);
    div.appendChild(imagem);
    
    return div;
};

/**
 * Função construtora DetetorDeMovimento que também herda propertys de Sensor, por meio do Sensor.prototype
 * 
 * @param {string} nome
 * @param {int} id
 * @param {boolean} estado
 */
function DetetorDeMovimento(nome, id, estado){
    this.imagem="/images/domotico/movimentoOff.png";
    this.estado = estado || false;
    Sensor.call(this, nome, id, this.estado, this.imagem);
}
DetetorDeMovimento.prototype = Object.create(Sensor.prototype);
DetetorDeMovimento.prototype.constructor = DetetorDeMovimento;

/**
 * Método mostrarDetetorDeMovimento do prototype DetetorDeMovimento que irá mostrar a imagema duma lâmpada apagada e com o identificador do mesmo.
 * 
 * @param {DetetorDeMovimento} detetorDeMovimento
 * @returns div
 */
DetetorDeMovimento.prototype.mostrarDetetorDeMovimento = function(detetorDeMovimento){
    var div = document.createElement("div");
    var nomeDetetorDeMovimento = document.createElement("p");
    var imagem = document.createElement("img");

    nomeDetetorDeMovimento.appendChild(document.createTextNode(detetorDeMovimento.nome));
    nomeDetetorDeMovimento.style.textIndent="2px";
    nomeDetetorDeMovimento.style.margin="auto";

    imagem.setAttribute("src", detetorDeMovimento.imagem);
    imagem.style.display="block";
    imagem.style.margin="auto";
    
    div.style.display="inline";
    div.appendChild(nomeDetetorDeMovimento);
    div.appendChild(imagem);
    return div;
};

/**
 * Função construtora DetetorDeFechoEmPorta que também herda propertys de Sensor, por meio do Sensor.prototype 
 * 
 * @param {string} nome
 * @param {int} id
 * @param {boolean} estado
 */
function DetetorDeFechoEmPorta(nome, id, estado){
    this.imagem="/images/domotico/portaFechada.png";
    this.estado = estado || false;
    Sensor.call(this, nome, id, this.estado, this.imagem);
}
DetetorDeFechoEmPorta.prototype = Object.create(Sensor.prototype);
DetetorDeFechoEmPorta.prototype.constructor = DetetorDeFechoEmPorta;

/**
 * Método mostrarDetetorDeFechoEmPorta do prototype DetetorDeFechoEmPorta que irá mostrar a imagem do sensor (uma porta fechada) mais o seu id, tudo dentro duma div
 * 
 * @param {DetetorDeFechoEmPorta} detetorDeFechoPorta
 * @returns div
 */
DetetorDeFechoEmPorta.prototype.mostrarDetetorDeFechoEmPorta = function(detetorDeFechoPorta){
    var div = document.createElement("div");
    var nomeDetetorDeFechoPortao = document.createElement("p");
    var imagem = document.createElement("img");

    nomeDetetorDeFechoPortao.appendChild(document.createTextNode(detetorDeFechoPorta.nome));
    nomeDetetorDeFechoPortao.style.textIndent="2px";
    nomeDetetorDeFechoPortao.style.margin="auto";

    imagem.setAttribute("src", detetorDeFechoPorta.imagem);
    imagem.style.display="block";
    imagem.style.margin="auto";
    
    div.style.display="inline";
    div.appendChild(nomeDetetorDeFechoPortao);
    div.appendChild(imagem);
    
    return div;
};

/**
 * Função construtora DetetorDePosicaoEstoreEletrico que também herda propertys de Sensor, por meio do Sensor.prototype 
 * 
 * @param {string} nome
 * @param {int} id
 */
function DetetorDePosicaoEstoreEletrico(nome, id){
    this.imagem="/images/domotico/aberto.png";
    Sensor.call(this, nome, id, null, this.imagem);
}
DetetorDePosicaoEstoreEletrico.prototype = Object.create(Sensor.prototype);
DetetorDePosicaoEstoreEletrico.prototype.constructor = DetetorDePosicaoEstoreEletrico;

/**
 * Método mostrarDetetorDeMovimento do prototype DetetorDePosicaoEstoreEletrico com o identificador do estore eletrico e a imagem duma janela com o estore aberto
 * 
 * @param {DetetorDePosicaoEstoreEletrico} detetorDePosicaoEstoreEletrico
 * @returns div
 */
DetetorDePosicaoEstoreEletrico.prototype.mostrarDetetorDePosicaoEstoreEletrico = function(detetorDePosicaoEstoreEletrico){
    var div = document.createElement("div");
    var nomeDetetorDePosicaoEstoreEletrico = document.createElement("p");
    var imagem = document.createElement("img");

    nomeDetetorDePosicaoEstoreEletrico.appendChild(document.createTextNode(detetorDePosicaoEstoreEletrico.nome));
    nomeDetetorDePosicaoEstoreEletrico.style.textIndent="2px";
    nomeDetetorDePosicaoEstoreEletrico.style.margin="auto";
    
    imagem.setAttribute("src", detetorDePosicaoEstoreEletrico.imagem);
    imagem.style.display="block";
    imagem.style.margin="auto";
    
    div.style.display="inline";
    div.appendChild(nomeDetetorDePosicaoEstoreEletrico);
    div.appendChild(imagem);
    
    return div;
};

/* Atuadores Locais */

/**
 * Função construtora Sensor que também herda propertys de equipamento, por meio do Equipamento.prototype
 * 
 * @param {string} nome
 * @param {int} id
 * @param {any} estado
 * @param {img} imagens
 * @param {Sensor} conectadoASensor
 */
function AtuadorLocal(nome, id, estado, imagens, conectadoASensor) {
    this.imagens=imagens || "Sem imagem" || null; 
    Equipamento.call(this, nome, id);
    this.estado = estado;
    this.conectadoASensor = conectadoASensor || null;
}
AtuadorLocal.prototype = Object.create(Equipamento.prototype);
AtuadorLocal.prototype.constructor = AtuadorLocal;

/**
 * Método conectarSensor do prototype AtuadorLocal que irá ligar um atuador local (TrincoEletrico ou motorEletricoDeEstore) ao seu respectivo Sensor, depois de verificar se já está ligado a este ou não.
 * 
 * @param {AtuadorLocal} atuadorLocal
 * @param {Sensor} sensor
 */
AtuadorLocal.prototype.conectarSensor = function(atuadorLocal, sensor){
        if(atuadorLocal.conectadoASensor != null){
            atuadorLocal.desconectarSensor(atuadorLocal);
        }
        atuadorLocal.conectadoASensor = sensor;
};

/**
 * Método desconectarSensor do prototype AtuadorLocal que irá desligar um atuador local (TrincoEletrico ou motorEletricoDeEstore).
 * 
 * @param {AtuadorLocal} atuadorLocal
 */
AtuadorLocal.prototype.desconectarSensor = function(atuadorLocal){
        atuadorLocal.conectadoASensor = null;
};

/**
 * Método isConectadoAtuadorLocal do prototype AtuadorLocal que irá verificar se um atuador local (TrincoEletrico ou motorEletricoDeEstore) está ligado ao seu respectivo Sensor.
 * Se estiver ligado, ele irá mostrar a nome (sigla) mais o identificador do sensor que está ligado (incluíndo o do próprio). Caso contrário mostra só o dele.
 * 
 * @param {string} nomeAtuadorLocal
 * @param {AtuadorLocal} atuadorLocal
 */
AtuadorLocal.prototype.isConectadoAtuadorLocal = function(nomeAtuadorLocal, atuadorLocal){
        if(atuadorLocal.conectadoASensor == null){
            nomeAtuadorLocal.appendChild(document.createTextNode(atuadorLocal.nome));
        }else{
            nomeAtuadorLocal.appendChild(document.createTextNode(atuadorLocal.nome + "->" + atuadorLocal.conectadoASensor.nome));
        }
};

/**
 * Método procurarSensor do prototype AtuadorLocal que irá procurar e verificar nos equipamentos do compartimento um sensor específico (indicado pelo nome) e retornar esse Sensor. 
 * 
 * @param {array} equipamentos
 * @param {string} nomeSensor
 * @param {Sensor} sensor
 * @returns Sensor
 */
AtuadorLocal.prototype.procurarSensor = function(equipamentos, nomeSensor, sensor){
    for(var i = 0; i < equipamentos.length; i++){
        if(equipamentos[i] instanceof sensor){
            if(equipamentos[i].nome == nomeSensor){
                return equipamentos[i];
            }
        }
    }
};

/**
 * Método apresentarSensores do prototype AtuadorLocal que irá mostrar num <select>, as options dos sensores específicos dum atuadorLocal.
 * 
 * @param {array} equipamentos
 * @param {select} listaDeAtuadores
 * @param {Sensor} sensor
 */
AtuadorLocal.prototype.apresentarSensores = function(equipamentos, listaDeAtuadores, sensor){
     for(var i = 0; i < equipamentos.length; i++){
            if(equipamentos[i] instanceof sensor){
                var opcao = document.createElement("option");
                opcao.text = equipamentos[i].nome;
                listaDeAtuadores.appendChild(opcao);
            }
        }
};

/**
 * Função construtora TrincoEletrico que também herda propertys de AtuadorLocal, por meio do AtuadorLocal.call e AtuadorLocal.prototype
 * 
 * @param {string} nome
 * @param {int} id
 */
function TrincoEletrico(nome, id){
    this.imagem = "/images/domotico/fechoFechado.png";
    AtuadorLocal.call(this, nome, id, false, this.imagem, null);
}
TrincoEletrico.prototype = Object.create(AtuadorLocal.prototype);
TrincoEletrico.prototype.constructor = TrincoEletrico;

/**
 * Método mostrarTrincoEletrico do prototype TrincoEletrico que irá mostrar o nome e identificador do trincoEletrico mais a sua imagem (trincoEletrico desligado)
 * e o <select> dos respetivos sensores que existem no compartimento, mais o botão para se ligar a esse sensor.
 * 
 * @param {TrincoEletrico} trincoEletrico
 * @param {array} equipamentos
 * @returns div
 */
TrincoEletrico.prototype.mostrarTrincoEletrico = function(trincoEletrico, equipamentos){
    var lista = document.getElementById("lista");
    var div = document.createElement("div");
    var nomeTrinco = document.createElement("p");
    var listaDetetoresDeFecho = document.createElement("select");
    var botaoLigarADetetor = document.createElement("input");
    var imagem = document.createElement("img");

    nomeTrinco.style.margin="auto";
    nomeTrinco.style.textIndent="2px";

    trincoEletrico.isConectadoAtuadorLocal(nomeTrinco, trincoEletrico);

    trincoEletrico.apresentarSensores(equipamentos, listaDetetoresDeFecho, DetetorDeFechoEmPorta);

    botaoLigarADetetor.type = "button";
    botaoLigarADetetor.value = "Ligar";
    botaoLigarADetetor.addEventListener("click", function(){
        trincoEletrico.conectarSensor(trincoEletrico, trincoEletrico.procurarSensor(equipamentos, listaDetetoresDeFecho.options[listaDetetoresDeFecho.selectedIndex].text, DetetorDeFechoEmPorta));
        while(lista.firstChild != undefined){
                lista.removeChild(lista.firstChild);
            }
        painelDeEquipamentos(lista, equipamentos);
    });

    imagem.src=trincoEletrico.imagem;
    imagem.style.display="block";
    imagem.style.margin="auto";
    imagem.addEventListener("click", function(){
        trincoEletrico.mudarEstadoDaPorta(trincoEletrico);
        while(lista.firstChild != undefined){
                lista.removeChild(lista.firstChild);
            }
            painelDeEquipamentos(lista, equipamentos);
    });

    div.appendChild(nomeTrinco);
    div.appendChild(imagem);
    div.appendChild(listaDetetoresDeFecho);
    div.appendChild(botaoLigarADetetor);

    return div;
};

/**
 * Método mudarEstadoDaPorta do prototype TrincoEletrico que irá mudar o estado da porta para aberto ou fechado.
 * Ele primeiro irá verificar se está ligado a uma porta ou não. Caso não esteja, mudar só a imagem do trinco.
 * Se estiver ligado a uma porta, vai mudar a sua imagem, o seu estado, a imagem e o estado da porta a que está ligado.
 * 
 * @param {TrincoEletrico} trincoEletrico
 */
TrincoEletrico.prototype.mudarEstadoDaPorta = function(trincoEletrico){
    if(trincoEletrico.conectadoASensor == null){
        if(trincoEletrico.estado == false){
            trincoEletrico.imagem = "/images/domotico/fechoAberto.png";
            trincoEletrico.estado = true;
        }else{
            trincoEletrico.imagem = "/images/domotico/fechoFechado.png";
            trincoEletrico.estado = false;
        }
    }else{
        if(trincoEletrico.estado == false){
            trincoEletrico.imagem = "/images/domotico/fechoAberto.png";
            trincoEletrico.estado = true;
            trincoEletrico.conectadoASensor.imagem = "/images/domotico/portaAberta.png";
            trincoEletrico.conectadoASensor.estado = true;
        }else{
            trincoEletrico.imagem = "/images/domotico/fechoFechado.png";
            trincoEletrico.estado = false;
            trincoEletrico.conectadoASensor.imagem = "/images/domotico/portaFechada.png";
            trincoEletrico.conectadoASensor.estado = false;
        }
    }
};

/**
 * Função construtora TrincoEletrico que também herda propertys de AtuadorLocal, por meio do AtuadorLocal.call e AtuadorLocal.prototype
 * 
 * @param {string} nome
 * @param {int} id
 */
function MotorEletricoDeEstore(nome, id){
    this.imagem = "/images/domotico/start.png";
    this.conectadoADetetorDePosicao = null;
    AtuadorLocal.call(this, nome, id, 1, this.imagem, this.conectadoADetetorDePosicao);
}
MotorEletricoDeEstore.prototype = Object.create(AtuadorLocal.prototype);
MotorEletricoDeEstore.prototype.constructor = MotorEletricoDeEstore;

/**
 * Método mostrarMotorEletricoDeEstore do prototype MotorEletricoDeEstore que irá mostrar o nome e identificador do estore, 
 * a imagem do botão para começar a mudar o estado do estore,
 * o <select> dos respetivos sensores que existem no compartimento, mais o botão para se ligar a esse sensor.
 * 
 * @param {MotorEletricoDeEstore} motorEletricoDeEstore
 * @param {array} equipamentos
 * @returns div
 */
MotorEletricoDeEstore.prototype.mostrarMotorEletricoDeEstore = function(motorEletricoDeEstore, equipamentos){
    var lista = document.getElementById("lista");
    var div = document.createElement("div");
    var nomeMotorEletrico = document.createElement("p");
    var listaDetetoresDeEstore = document.createElement("select");
    var botaoConectar = document.createElement("input");
    var imagem = document.createElement("img");

    nomeMotorEletrico.style.textIndent="9px";
    nomeMotorEletrico.style.margin="auto";

    motorEletricoDeEstore.isConectadoAtuadorLocal(nomeMotorEletrico, motorEletricoDeEstore);

     if(motorEletricoDeEstore.conectadoADetetorDePosicao != null){
        var escolherSensor1 = document.createElement("option");
        escolherSensor1.text = motorEletricoDeEstore.conectadoADetetorDePosicao.nome;
        listaDetetorDeEstore.appendChild(escolherSensor1);
        
        for(var i = 0; i < equipamentos.length; i++){
            if(equipamentos[i] instanceof DetetorDePosicaoEstoreEletrico){
                if(equipamentos[i].nome != motorEletricoDeEstore.conectadoADetetorDePosicao.nome){
                    var escolherSensor2 = document.createElement("option");
                    escolherSensor2.text = equipamentos[i].nome;
                    listaDetetorDeEstore.appendChild(escolherSensor2);
                }
            }
        }
        
    }else if(motorEletricoDeEstore.conectadoADetetorDePosicao == null){
        motorEletricoDeEstore.apresentarSensores(equipamentos, listaDetetoresDeEstore, DetetorDePosicaoEstoreEletrico);
    }

    botaoConectar.type = "button";
    botaoConectar.value = "Ligar";
    botaoConectar.addEventListener("click", function(){
        motorEletricoDeEstore.conectarSensor(motorEletricoDeEstore, motorEletricoDeEstore.procurarSensor(equipamentos, listaDetetoresDeEstore.options[listaDetetoresDeEstore.selectedIndex].text, DetetorDePosicaoEstoreEletrico));
        while(lista.firstChild != undefined){
                lista.removeChild(lista.firstChild);
            }
        painelDeEquipamentos(lista, equipamentos);
    });

    imagem.src=motorEletricoDeEstore.imagem;
    imagem.style.display="block";
    imagem.style.margin="auto";
    imagem.addEventListener("click", function(){
        var posicao = prompt("Introduza a posicao:\n 1-aberto, 2-um terço, 3-dois terços, 4-fechado");
        motorEletricoDeEstore.mudarPosicao(motorEletricoDeEstore, posicao);
        while(lista.firstChild != undefined){
                lista.removeChild(lista.firstChild);
            }
            painelDeEquipamentos(lista, equipamentos);
    });

    div.appendChild(nomeMotorEletrico);
    div.appendChild(imagem);
    div.appendChild(listaDetetoresDeEstore);
    div.appendChild(botaoConectar);
    
    return div;
};

/**
 * Método mudarEstadoDaPorta do prototype TrincoEletrico que irá mudar o estado do estore para aberto, dois terços, um terço ou fechado.
 * Ele primeiro irá verificar se está ligado a um estore ou não.
 * Se estiver ligado a um estore, vai verificar qual a posição que foi escolhida e só
 * muda a imagem e o estado do estore a que está ligado.
 * 
 * @param {MotorEletricoDeEstore} motorEletricoDeEstore
 * @param {int} posicao
 */
MotorEletricoDeEstore.prototype.mudarPosicao = function(motorEletricoDeEstore, posicao){
    if(motorEletricoDeEstore.conectadoASensor != null){
        switch(posicao){
        case "1":
            motorEletricoDeEstore.conectadoASensor.imagem = "/images/domotico/aberto.png";
            motorEletricoDeEstore.estado = 1;
            break;
        case "2":
            motorEletricoDeEstore.conectadoASensor.imagem = "/images/domotico/doisTercos.png";
            motorEletricoDeEstore.estado = 2;
            break;
        case "3":
            motorEletricoDeEstore.conectadoASensor.imagem = "/images/domotico/umTerco.png";
            motorEletricoDeEstore.estado = 3;
            break;
        case "4":
            motorEletricoDeEstore.conectadoASensor.imagem = "/images/domotico/fechado.png";
            motorEletricoDeEstore.estado = 4;
            break;
        default:
            alert("Posição inválida, por favor, escolha um número para a posição do estore entre 1 e 4.");
            break;
    }
    }
};

/* Atuadores Gerais */

/**
 * Função construtora AtuadorGeral que também herda propertys de Equipamento, por meio do Equipamento.call e Equipamento.prototype
 * 
 * @param {string} nome
 * @param {int} id
 * @param {img} imagens
 */
function AtuadorGeral(nome, id, imagens) {
    this.imagens=imagens || "Sem imagem" || null; 
    Equipamento.call(this, nome, id);
}
AtuadorGeral.prototype = Object.create(Equipamento.prototype);
AtuadorGeral.prototype.constructor = AtuadorGeral;

/**
 * Método mudarEstadoAtuador do prototype AtuadorGeral que irá mudar o estado dum respectivo sensor.
 * Ele primeiro irá ver um equipamento do compartimento, seguido da verificação de algum atuador geral ou não conforme indicado nos parametros. 
 * Caso não esteja, retorna um undefined.
 * Se o atuador geral do parametro for do tipo indicado, vai passar à verificação dentro dessa.
 * Nesta irá verificar se o equipamento é dum respectivo sensor (indicado no parametro). Se for, irá mudar a imagem e o estado do sensor a que está ligado.
 * Se o atuador geral, for doutro tipo, ele passa ao else if e as respectivas verificações e mudar o valor do sensor.
 * 
 * @param {AtuadorGeral} atuadorGeral
 * @param {Sensor} sensor
 * @param {array} equipamentos
 * @param {int} valor
 * @param {img} imagem
 * @returns
 */
AtuadorGeral.prototype.mudarEstadoAtuador = function(atuadorGeral, sensor, equipamentos, valor, imagem){
    for(var i=0; i < equipamentos.length; i++){
        if(atuadorGeral instanceof GeradorDeMovimento){
        if(equipamentos[i] instanceof sensor){
            equipamentos[i].imagem = imagem;
            equipamentos[i].estado = valor;
        }
        }else if(atuadorGeral instanceof ArCondicionado){
            if(equipamentos[i] instanceof sensor){
            equipamentos[i].temperatura = valor;
        }
        }else{return;}
    }
};

/**
 * Função construtora ArCondicionado que também herda propertys de AtuadorGeral, por meio do AtuadorGeral.call e AtuadorGeral.prototype
 * 
 * @param {any} nome
 * @param {any} id
 * @param {any} temperatura
 */
function ArCondicionado(nome, id, temperatura){
    this.imagem = "/images/domotico/arCondicionado.png";
    AtuadorGeral.call(this, nome, id, this.imagem);
    this.temperatura = temperatura || 25;
}
ArCondicionado.prototype = Object.create(AtuadorGeral.prototype);
ArCondicionado.prototype.constructor = ArCondicionado;

/**
 * Método mostrarArCondicionado do prototype ArCondicionado que irá mostrar o nome e identificador do ar condicionado, 
 * a label da temperatura e imagem do ar condicionado.
 * A label da temperatura vai ser um evento que ao ser clicado vai pedir uma temperatura entre -50º e 50º para mudar a label
 * do ar condicionado e de todos os termometros que houver no compartimento. A temperatura que irá aparecer em todos os termometros
 * será a média das temperaturas de todos os ar condicionados no compartimento.
 * 
 * @param {ArCondicionado} arCondicionado
 * @param {array} equipamentos
 * @returns div
 */
ArCondicionado.prototype.mostrarArCondicionado = function(arCondicionado, equipamentos){
    var lista = document.getElementById("lista");
    var div = document.createElement("div");
    var nomeArCondicionado = document.createElement("p");
    var temperatura = document.createElement("label");
    var imagem = document.createElement("img");

    div.style.display="inline";
      
    nomeArCondicionado.appendChild(document.createTextNode(arCondicionado.nome));
    nomeArCondicionado.style.textIndent="2px";
    nomeArCondicionado.style.margin="auto";
    
    imagem.src=arCondicionado.imagem;

    temperatura.appendChild(document.createTextNode(arCondicionado.temperatura + "ºC"));
    temperatura.addEventListener("click", function(){
        var novaTemperatura = prompt("Introduza a temperatura do ar condicionado.\n Valor entre (-50ºC e 50ºC)");
        if(novaTemperatura < -50 || novaTemperatura > 50 || novaTemperatura == null){
            alert("Temperatura inválida! Insira um temperatura entre -50ºC e 50ºC");
            return;
        }

        arCondicionado.temperatura = novaTemperatura;
        var mediaDasTemperaturas = arCondicionado.calcularMedia(equipamentos);
            arCondicionado.mudarEstadoAtuador(arCondicionado,Termometro,equipamentos,mediaDasTemperaturas,imagem);

            while(lista.firstChild != undefined){
                lista.removeChild(lista.firstChild);
            }
            
            painelDeEquipamentos(lista, equipamentos);
    },false);

    imagem.style.display="block";
    imagem.style.margin="auto";  

    div.appendChild(nomeArCondicionado);
    div.appendChild(temperatura);
    div.appendChild(imagem);

    return div;
};

/**
 * Método calcularMedia do prototype ArCondicionado que irá a média das temperaturas indicadas pelo ar condicionado.
 * Isto ira servir para o caso de haver mais ar condicionados no compartimento.
 * Se no compartimento houver mais ar condicionados, ele vai somar todas as temperaturas e dividir pelo número de ar condicionados. 
 * 
 * @param {array} equipamentos
 * @returns mediaDasTemperaturas
 */
ArCondicionado.prototype.calcularMedia = function (equipamentos){
                var numeroDeArCondicionados = 0;
                var somaDasTemperaturas = 0;
                var mediaDasTemperaturas;

                for (var i=0; i < equipamentos.length; i++){
                    if(equipamentos[i] instanceof ArCondicionado){
                        numeroDeArCondicionados++;
                        somaDasTemperaturas = somaDasTemperaturas + parseInt(equipamentos[i].temperatura);
                    }
                }
                return mediaDasTemperaturas = somaDasTemperaturas/numeroDeArCondicionados; 
        };

/**
 * Função construtora GeradorDeMovimento que também herda propertys de AtuadorGeral, por meio do AtuadorGeral.call e AtuadorGeral.prototype
 * 
 * @param {string} nome
 * @param {int} id
 */
function GeradorDeMovimento(nome, id){
    this.imagem = "/images/domotico/semMovimento.png";
    AtuadorGeral.call(this, nome, id, this.imagem);
    this.estado = false; 
}
GeradorDeMovimento.prototype = Object.create(AtuadorGeral.prototype);
GeradorDeMovimento.prototype.constructor = GeradorDeMovimento;

/**
 * Método mostrarGeradorDeMovimento do prototype GeradorDeMovimento que irá mostrar o nome, identificador e imagem do geradorDeMovimento.
 * A imagem será um evento que ao ser clicado ira mudar a imagem e estado de todos os sensores de movimento do compartimento.
 * Se houver mais geradores, irá ser verificado se estão ligados. Caso estejam, as luzes não são apagadas enquanto houver geradores de movimento ligados.
 * Se não houver mais geradores de movimento ligados, ele então irá apagar todoas as luzes no compartimento.
 * 
 * @param {GeradorDeMovimento} geradorDeMovimento
 * @param {array} equipamentos
 * @returns div
 */
GeradorDeMovimento.prototype.mostrarGeradorDeMovimento = function(geradorDeMovimento, equipamentos){
    var lista = document.getElementById("lista");
    var div = document.createElement("div");
    var nomeGeradorMovimento = document.createElement("p");
    var imagem = document.createElement("img");

    nomeGeradorMovimento.appendChild(document.createTextNode(geradorDeMovimento.nome));
    nomeGeradorMovimento.style.textIndent="2px";
    nomeGeradorMovimento.style.margin="auto";

    imagem.src=geradorDeMovimento.imagem;
    imagem.style.display="block";
    imagem.style.margin="auto";
    imagem.addEventListener("click", function(){
        if(geradorDeMovimento.estado == false){
            geradorDeMovimento.imagem="/images/domotico/comMovimento.png";
            geradorDeMovimento.estado = true;

            for (var i = 0; i < equipamentos.length; i++){
                if(equipamentos[i] instanceof DetetorDeMovimento){
                    if(equipamentos[i].estado == false){
                        equipamentos[i].imagem = "/images/domotico/movimentoOn.png";
                        equipamentos[i].estado = true;
                    }
                }
            }
        }else{
            geradorDeMovimento.imagem = "/images/domotico/semMovimento.png";
            geradorDeMovimento.estado = false;

            if(Equipamento.prototype.existemEquipamentosLigados(equipamentos,geradorDeMovimento) == false){
                geradorDeMovimento.mudarEstadoAtuador(geradorDeMovimento, DetetorDeMovimento, equipamentos, false, "/images/domotico/movimentoOff.png");
            }
        }

        while(lista.firstChild != undefined){
                lista.removeChild(lista.firstChild);
            }

            painelDeEquipamentos(lista, equipamentos);
    },false);

    div.appendChild(nomeGeradorMovimento);
    div.appendChild(imagem);

    return div;
};

/**
 * Função painelDeEquipamentos onde irão ser apresentados as imagens da lista de equipamentos dum compartimento.
 * 
 * @param {div} lista - local onde irá ficar o painelDeEquipamentos
 * @param {array} listaDeEquipamentos - array dos equipamentos dum compartimento
 */
function painelDeEquipamentos(lista, listaDeEquipamentos){
    lista.style.display="inline-block";
    for(var i=0; i < listaDeEquipamentos.length; i++){
            div = document.createElement("div");
            div.style.cssFloat="left";
            div.style.border="1px solid grey";
            div.style.height = "115px";
         if(listaDeEquipamentos[i] instanceof Termometro){
            div.appendChild(listaDeEquipamentos[i].mostrarTermometro(listaDeEquipamentos[i]));
            lista.appendChild(div);
        }else if(listaDeEquipamentos[i] instanceof DetetorDeMovimento){
            div.appendChild(listaDeEquipamentos[i].mostrarDetetorDeMovimento(listaDeEquipamentos[i]));
            lista.appendChild(div);
        }else if(listaDeEquipamentos[i] instanceof DetetorDeFechoEmPorta){
            div.appendChild(listaDeEquipamentos[i].mostrarDetetorDeFechoEmPorta(listaDeEquipamentos[i]));
            lista.appendChild(div);
        }else if(listaDeEquipamentos[i] instanceof DetetorDePosicaoEstoreEletrico){
            div.appendChild(listaDeEquipamentos[i].mostrarDetetorDePosicaoEstoreEletrico(listaDeEquipamentos[i]));
            lista.appendChild(div);
        }else if(listaDeEquipamentos[i] instanceof ArCondicionado){
            div.appendChild(listaDeEquipamentos[i].mostrarArCondicionado(listaDeEquipamentos[i], listaDeEquipamentos));
            lista.appendChild(div);
        }else if(listaDeEquipamentos[i] instanceof GeradorDeMovimento){
            div.appendChild(listaDeEquipamentos[i].mostrarGeradorDeMovimento(listaDeEquipamentos[i], listaDeEquipamentos));
            lista.appendChild(div);
        }else if(listaDeEquipamentos[i] instanceof TrincoEletrico){
            div.appendChild(listaDeEquipamentos[i].mostrarTrincoEletrico(listaDeEquipamentos[i], listaDeEquipamentos));
            lista.appendChild(div);
        }else if(listaDeEquipamentos[i] instanceof MotorEletricoDeEstore){
            div.appendChild(listaDeEquipamentos[i].mostrarMotorEletricoDeEstore(listaDeEquipamentos[i], listaDeEquipamentos));
            lista.appendChild(div);
        }
    }
}

    /**
     * Função que irá comparar o nome de 2 objetos e ordená-los por ordem alfabética e numérica (no caso dos equipamentos). 
     * 
     * @param {any} equipamento1
     * @param {any} equipamento2
     * @returns
     */
    function compararEquipamentos(equipamento1, equipamento2){
        if(equipamento1.nome < equipamento2.nome){
            return -1;
        }
        else if(equipamento1.nome > equipamento2.nome){
            return 1;
        }
        else {
            if (equipamento1.nome == equipamento2.nome && equipamento1.id < equipamento2.id)
                return -1;
            else if (equipamento1.nome == equipamento2.nome && equipamento1.id > equipamento2.id)
                return 1;
                else
                return 0;
            }
    } 
