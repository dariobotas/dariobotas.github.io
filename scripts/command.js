//"use strict";

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
        whois = new Command("whois","   Who is DBotas?"),
        whoami = new Command("whoami","  Who are you?"),
        banner = new Command("banner", "  Display a random header").addParameters(
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
        clear = new Command("clear","   Clear everything written before"),
        history = new Command("history", " Display previous commands"),
        videos = new Command("videos","  View youtube videos"),
        projects = new Command("projects","View coding projects").addParameters(
            new Parameter("-p", "Personal projects"),
            new Parameter("-s","School projects")
            ),
        social = new Command("social","  Display social networks"),
        secret = new Command("secret","  Find my password"),
        language = new Command("language", "Choose a different language for the terminal"),
        setup = new Command("setup", "   Setup different color/font terminal"),
        date = new Command("date", "    Display date in different formats"),
        game = new Command("game","    Play a game"),
        tools = new Command("tools","   Check these tools")
        );

/**
 * Presents a random banner when type 'banner' in the terminal
 * @returns array with the banner
 */
banner.description = function (){
                let numberOfBanners = banner.parameters;
                let random = randomIntFromInterval(0,numberOfBanners.length-1);
                return banner.parameters[random].description;
            };
console.log(banner.description());