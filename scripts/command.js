//"use strict";
const youtube = "https://";
const facebook = "https://www.facebook.com/dario.botas/";
const linkedin = "www.linkedin.com/in/dbotas";
const github = "https://github.com/dariobotas";
const bitbucket = "https://bitbucket.org/dabotas/";
const email = "mailto:darioabotas@gmail.com";
const password = "dbotas";
const year = new Date().getFullYear().toString()
const startTerminal = ['<span class="color2">Starting terminal...</span>'];
const reload = ['<span class="color2">Restarting terminal...</span>'];
//var commands = (function (){
    help = [
    "<br>",
    '<span class="command">whois</span>     Who is DBotas?',
    '<span class="command">whoami</span>    Who are you?',
    '<span class="command">videos</span>    View youtube videos',
    '<span class="command">projects</span>  View coding projects',
    '<span class="command">social</span>    Display social networks',
    '<span class="command">secret</span>    Find my password',
    '<span class="command">clear</span>     Clear everything written before',
    '<span class="command">history</span>   Display previous commands',
    '<span class="command">language</span>  Choose Language',
    '<span class="command">setup</span>     Setup color/font terminal',
    '<span class="command">banner</span>    Display the header',
    "<br>"
];
    /*function Command (name, description){
        this.name = name ? name.toString() : "help";
        this.description = description ? description : help;
};*/

    function Parameter (name, about, description){
        this.name = name ? name.toString() : "";
        this.about = about ? about.toString() : "";
        this.description = description ? description : [""];
    }
    function Command (name, about, description, parameters){
        this.name = name ? name.toString() : "";
        this.about = about ? about.toString() : "";
        this.description = description ? description : [""];
        this.parameters = parameters ? parameters : [];
        //function (parameterDescription) {
          //  this.id = parameter ? parameter : [];
          //  this.description = parameterDescription ? parameterDescription : [];
        //}//(name !== "help") ? parameter : `<span class="inherit">Parameter not found For a list of parameters, type <span class="command">''${name}'' -h</span>`;
    };

    Command.prototype.listParameters = function () {
        if(this.parameters.lenght === 0){
            return "<span class=\"inherit\">No commands available. This is a useless terminal...";
        } else {
            var arrayList = ["<br>"];
            this.parameters.forEach(function (element, index, array) {
                arrayList.push("<span class=\"command\">"+element.name+"</span>     "+element.about);
            });
            arrayList.push("<br>");
            return arrayList;
        }
    };

    Command.prototype.addParameter = function(parameter) {
        this.parameters.push(parameter);
        return this;
    }

    Command.prototype.addParameters = function (parameters) {
        parameters = Array.prototype.slice.call(arguments);
        parameters.forEach(function (currentValue, index, arrau){
            this.addParameter(currentValue);
        },
        this);
        return this;
    }
    function Help(){
        this.commands = [];
    }

    Help.prototype.listCommands = function () {
        if(this.commands.lenght === 0){
            return "<span class=\"inherit\">No commands available. This is a useless terminal...";
        } else {
            var arrayList = ["<br>"];
            this.commands.forEach(function (element, index, array) {
                arrayList.push("<span class=\"command\">"+element.name+"</span>     "+element.about);
            });
            arrayList.push("<br>");
            return arrayList;
        }
    };

    Help.prototype.addCommand = function (command) {
        this.commands.push(command);
        return this;
    };

    Help.prototype.addCommands = function (commands) {
        commands = Array.prototype.slice.call(arguments); //Transformar o "arguments" num array para poder usar o forEach
        commands.forEach(function (currentValue, index, array) {
            this.addCommand(currentValue);
        },
        this); //Indicar que o comando 'Help' atual será o this dentro de cada chamada à função anterior
    return this;
    }

    Help.defaultEn = (new Help()).addCommands(
        new Command("whois","   Who is DBotas?"),
        new Command("whoami","  Who are you?"),
        new Command("banner", "  Display a random header").addParameters(
                new Parameter("-1", "Banner 1",
                [
                    "<br>",
                    '<span class="index">DBotas (DB) Not A Corporation. </span>',
                    "<br>",                                                                                         
                    "8 888888888o.      8 888888888o       ,o888888o. 8888888 8888888888   .8.            d888888o.   ",
                    "8 8888    `^888.   8 8888    `88.  . 8888     `88.     8 8888        .888.         .`8888:' `88. ",
                    "8 8888        `88. 8 8888     `88 ,8 8888       `8b    8 8888       :88888.        8.`8888.   Y8 ",
                    "8 8888         `88 8 8888     ,88 88 8888        `8b   8 8888      . `88888.       `8.`8888.     ",
                    "8 8888          88 8 8888.   ,88' 88 8888         88   8 8888     .8. `88888.       `8.`8888.    ",
                    "8 8888          88 8 8888888888   88 8888         88   8 8888    .8`8. `88888.       `8.`8888.   ",
                    "8 8888         ,88 8 8888    `88. 88 8888        ,8P   8 8888   .8' `8. `88888.       `8.`8888.  ",
                    "8 8888        ,88' 8 8888      88 `8 8888       ,8P    8 8888  .8'   `8. `88888.  8b   `8.`8888. ",
                    "8 8888    ,o88P'   8 8888    ,88'  ` 8888     ,88'     8 8888 .888888888. `88888. `8b.  ;8.`8888 ",
                    "8 888888888P'      8 888888888P       `8888888P'       8 8888.8'       `8. `88888. `Y8888P ,88P' ",
                    "                                                                                          © "+year,
                    "<br>",
                    "<span class=\"color3\">Welcome to my interactive web terminal.</span>",
                    "<span class=\"color3\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color3\">.</span>",
                    "<br>"
                ]),
                new Parameter("-2", "Banner 2",
            [
                "<br>",
                '<span class="index">DBotas (DB) Not A Corporation. </span>',
                "<br>",
                "&nbsp;_______ _______ _______ _______ _______ _______ ",
                "|\      /|\\     /|\\     /|\\     /|\\     /|\\     /|",
                "| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
                "| |   | | |   | | |   | | |   | | |   | | |   | |",
                "| |D  | | |B  | | |o  | | |t  | | |a  | | |s  | |",
                "| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
                "|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|",
                "                                           © "+year+"       ",
                "<br>",
                '<span class="color3">Welcome to my interactive web terminal.</span>',
                "<span class=\"color3\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color3\">.</span>",
                "<br>"
            ]),
            new Parameter("-3", "Banner 3",
            [
                "<br>",
                '<span class="index">DBotas (DB) Not A Corporation. </span>',
                '________ __________        __                 ',
                '\\______ \\\\______   \\ _____/  |______    ______',
                '&nbsp;|    |  \\|    |  _//  _ \\   __\\__  \\  /  ___/',
                '&nbsp;|    `   \\    |   (  <_> )  |  / __ \\_\\___ \\ ',
                '/_______  /______  /\\____/|__| (____  /____  >',
                '        \\/       \\/                 \\/     \\/ ',
                "                                        © <span id=\"yearb2\">"+year+"</span>",
                "<br>",
                '<span class="color3">Welcome to my interactive web terminal.</span>',
                  "<span class=\"color3\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color3\">.</span>",
                  "<br>"
                ]),
            new Parameter("-4","Banner 4",
            [
                "<br>",
                '<span class="index">DBotas (DB) Not A Corporation. </span>',
                '    ',
                '██████╗░██████╗░░█████╗░████████╗░█████╗░░██████╗',
                '██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔════╝',
                '██║░░██║██████╦╝██║░░██║░░░██║░░░███████║╚█████╗░',
                '██║░░██║██╔══██╗██║░░██║░░░██║░░░██╔══██║░╚═══██╗',
                '██████╔╝██████╦╝╚█████╔╝░░░██║░░░██║░░██║██████╔╝',
                '╚═════╝░╚═════╝░░╚════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═════╝░',
                "                                           © <span id=\"yearb2\">"+year+"</span>",
                "<br>",
                '<span class="color3">Welcome to my interactive web terminal.</span>',
                "<span class=\"color3\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color3\">.</span>",
                "<br>"
                ])
            ),
        new Command("clear","   Clear everything written before"),
        new Command("history", " Display previous commands"),
        new Command("videos","  View youtube videos"),
        new Command("projects","View coding projects").addParameters(
            new Parameter("-p", "Personal projects"),
            new Parameter("-s","School projects")
            ),
        new Command("social","  Display social networks"),
        new Command("secret","  Find my password"),
        new Command("language", "Choose a different language for the terminal"),
        new Command("setup", "   Setup different color/font terminal"),
        new Command("date", "    Display date in different formats"),
        new Command("game","    Play a game"),
        new Command("tools","   Check these tools")
        );
//}());

ajuda = [
    "<br>",
    '<span class="command">queme</span>      Quem é o DBotas?',
    '<span class="command">quemsou</span>    Quem és tu?',
    '<span class="command">videos</span>     Ver os meus vídeos do Youtube',
    '<span class="command">projetos</span>   Os meus projetos de programação',
    '<span class="command">social</span>     Redes sociais onde me podem encontrar',
    '<span class="command">senha</span>      Encontra a senha',
    '<span class="command">limpa</span>      Limpar o terminal',
    '<span class="command">historia</span>   Ver todos os commands inseridos antes',
    '<span class="command">lingua</span>     Escolher a língua',
    '<span class="command">setup</span>      Mudança do formato/cores do terminal',
    '<span class="command">banner</span>     Ecrã inicial',
    "<br>"
];

languages = [
    '<span class="command">en</span>        English Language',
    '<span class="command">pt</span>        Portuguese Language'
];

linguas = [
    '<span class="command">en</span>        Língua Inglesa',
    '<span class="command">pt</span>        Língua Portuguesa'
];

whois = [
    "<br>",
    "Hey, I'm DBotas!👋",
    "I'm a software developer (but currently working as a Tester) and content creator",
    "that's responsible for a blog and makes YouTube videos about computer science & software engineering.",
    "After graduating with a Bachelor's in Computer Science, I worked professionally",
    "as a software engineer building enterprise web applications for Fortune 500 companies.",
    "While doing all of that, I documentned my coding journey on YouTube - trying to enlighten",
    "the next generation of developers and help them navigate the crazy world that is software", "development & computer science.",
    "Before I knew it, that online presence took on a life of its own, to the point where I knew",
    "I needed to make the jump from software engineering to full time content creator, and it's",
    "the best decision I ever made.",
    "Now, I make videos about creating cool shit like this terminal website, and hosting my",
    "podcast 'Decoded w/ Forrest Knight.' What most people don't know, and will only know",
    "because they're reading this right now, is that I also run a creative & media agency.",
    "We partner with clients to drive their business outcomes using modern marketing strategies.",
  
    "<br>"
];

whoami = [
    "<br>",
    "I don't know about you, but i'm a new creature (in Christ):", 
    'old things are passed away; behold, all things are become new.',
    '2 Corinthians 5:17',
    "<br>"
];

projetos = [
    "<br>",
    '<span class="command">faculdade</span>  ',
    '<span class="command">pessoais</span>   ',
    "<br>"
];

projects = [
    "<br>",
    '<span class="command">school</span>     ',
    '<span class="command">personal</span>   ',
    "<br>"
];

social = [
    "<br>",
    "<br>"
];

secret = [
    "<br>",
    '<span class="command">sudo</span>           Only use if you\'re admin',
    "<br>"
];

senha = [
    "<br>",
    "<br>"
];

setupPt = [
    "<br>",
    "<br>"
];

setupEn = [
    "<br>",
    "<br>"
];

banner0 = [
    "<br>",
    '<span class="index">DBotas (DB) Not A Corporation. </span>',
        "<br>",                                                                                         
"8 888888888o.      8 888888888o       ,o888888o. 8888888 8888888888   .8.            d888888o.   ",
"8 8888    `^888.   8 8888    `88.  . 8888     `88.     8 8888        .888.         .`8888:' `88. ",
"8 8888        `88. 8 8888     `88 ,8 8888       `8b    8 8888       :88888.        8.`8888.   Y8 ",
"8 8888         `88 8 8888     ,88 88 8888        `8b   8 8888      . `88888.       `8.`8888.     ",
"8 8888          88 8 8888.   ,88' 88 8888         88   8 8888     .8. `88888.       `8.`8888.    ",
"8 8888          88 8 8888888888   88 8888         88   8 8888    .8`8. `88888.       `8.`8888.   ",
"8 8888         ,88 8 8888    `88. 88 8888        ,8P   8 8888   .8' `8. `88888.       `8.`8888.  ",
"8 8888        ,88' 8 8888      88 `8 8888       ,8P    8 8888  .8'   `8. `88888.  8b   `8.`8888. ",
"8 8888    ,o88P'   8 8888    ,88'  ` 8888     ,88'     8 8888 .888888888. `88888. `8b.  ;8.`8888 ",
"8 888888888P'      8 888888888P       `8888888P'       8 8888.8'       `8. `88888. `Y8888P ,88P' ",
"                                                                                          © 2022 ",
"<br>",
'<span class="color3">Welcome to my interactive web terminal.</span>',
  "<span class=\"color3\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color3\">.</span>",
  "<br>"
];

banner1 = [
    "<br>",
    '<span class="index">DBotas (DB) Not A Corporation. </span>',
        "<br>",
"&nbsp;_______ _______ _______ _______ _______ _______ ",
"|\      /|\\     /|\\     /|\\     /|\\     /|\\     /|",
"| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
"| |   | | |   | | |   | | |   | | |   | | |   | |",
"| |D  | | |B  | | |o  | | |t  | | |a  | | |s  | |",
"| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
"|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|",
"                                          © 2022       ",
"<br>",
'<span class="color3">Welcome to my interactive web terminal.</span>',
  "<span class=\"color3\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color3\">.</span>",
  "<br>"
];

banner2 = [
"<br>",
'<span class="index">DBotas (DB) Not A Corporation. </span>',
'________ __________        __                 ',
'\\______ \\\\______   \\ _____/  |______    ______',
'&nbsp;|    |  \\|    |  _//  _ \\   __\\__  \\  /  ___/',
'&nbsp;|    `   \\    |   (  <_> )  |  / __ \\_\\___ \\ ',
'/_______  /______  /\\____/|__| (____  /____  >',
'        \\/       \\/                 \\/     \\/ ',
'                                        © <span id="yearb2">2022</span>',
"<br>",
'<span class="color3">Welcome to my interactive web terminal.</span>',
  "<span class=\"color3\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color3\">.</span>",
  "<br>"
];
//<span id="year"></span>
//'<script>const year = new Date().getFullYear();document.getElementById("year").innerHTML = year;</script>'

banner3 = [
    "<br>",
'<span class="index">DBotas (DB) Not A Corporation. </span>',
'    ',
'██████╗░██████╗░░█████╗░████████╗░█████╗░░██████╗',
'██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔════╝',
'██║░░██║██████╦╝██║░░██║░░░██║░░░███████║╚█████╗░',
'██║░░██║██╔══██╗██║░░██║░░░██║░░░██╔══██║░╚═══██╗',
'██████╔╝██████╦╝╚█████╔╝░░░██║░░░██║░░██║██████╔╝',
'╚═════╝░╚═════╝░░╚════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═════╝░',
'                                           © <span id="yearb2">2022</span>',
"<br>",
'<span class="color3">Welcome to my interactive web terminal.</span>',
  "<span class=\"color3\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color3\">.</span>",
  "<br>"
]