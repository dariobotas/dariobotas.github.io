//"use strict";

function Parameter(name, about, description) {
  this.name = name ? name.toString() : "";
  this.about = about ? about.toString() : "";
  this.description = description ? description : [""];
}
function Command(name, about, description, parameters) {
  this.name = name ? name.toString() : "";
  this.about = about ? about.toString() : "";
  this.description = description ? description : [""];
  this.parameters = parameters ? parameters : [];
}

Command.prototype.listParameters = function () {
  if (this.parameters.length === 0) {
    return '<span class="inherit">No commands available. This is a useless terminal...';
  } else {
    let arrayList = ["<br>"];
    this.parameters.forEach(function (element, index, array) {
      arrayList.push(
        '<p><span class="command"> --' +
          element.name +
          "</span>     " +
          element.about +
          "</p>"
      );
    });
    arrayList.push("<br>");
    return arrayList;
  }
};

Command.prototype.addParameter = function (parameter) {
  this.parameters.push(parameter);
  return this;
};

Command.prototype.addParameters = function (parameters) {
  parameters = Array.prototype.slice.call(arguments);
  parameters.forEach(function (currentValue, index, arrau) {
    this.addParameter(currentValue);
  }, this);
  return this;
};
function Help() {
  this.commands = [];
}

Help.prototype.listCommands = function () {
  if (this.commands.length === 0) {
    return '<span class="inherit">No commands available. This is a useless terminal...';
  } else {
    let arrayList = ["<br>"];
    this.commands.forEach(function (element, index, array) {
      arrayList.push(
        '<span class="command">' + element.name + "</span>     " + element.about
      );
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
  }, this); //Indicar que o comando 'Help' atual será o this dentro de cada chamada à função anterior
  return this;
};
/**
 * This object contains all of the commands and parameters defined for the terminal in English.
 */
Help.defaultEn = new Help().addCommands(
  (help = new Command(
    "help", 
    "    A list of available commands",
    ()=>{
        return loopLinhas(Help.defaultEn.listCommands(), "color2 margin", 80);
    }).addParameter(
    new Parameter("h", "", (arrayArguments) => {
      if (arrayArguments.length > 1) {
        return loopLinhas(
          [
            "Invalid arguments! Please type the command without arguments or try --h parameter.",
          ],
          "color2 margin",
          80
        );
      } else {
        return loopLinhas(
          [
            "Just type <span class=\"command\">'help'</span> to get a list of available commands",
          ],
          "color2 maring",
          80
        );
      }
    })
  )),
  (whois = new Command("whois", "   Who is DBotas?", () => {
    const desc = [
      "<br>",
      "Hey, I'm DBotas!👋",
      "I'm a software tester (and a software and automation creator) and a beginner in content creator",
      "that's responsible for a blog and a dad.",
      "After graduating with a Bachelor's in Computer Science, I worked professionally (and continues to)",
      "in Deloitte Portugal as a Consultant.",
      "My favourite hobbies are reading, revisit and recreate what i learned in the university and remake",
      "some projects that i did there.",
      "I like to automate tasks that i'm currently doing in order to get more of my time to do other stuff.",
      "I'm trying to use this web terminal as my portfolio and show what i do in my free time.",
      "Hope you enjoy it!!",
      "<br>",
    ];
    return loopLinhas(desc, "color2 margin", 80);
  }).addParameter(
    new Parameter("h", "", (arrayArguments) => {
      if (arrayArguments.length > 1) {
        return loopLinhas(
          [
            "Invalid arguments! Please type the command without arguments or try --h parameter.",
          ],
          "color2 margin",
          80
        );
      } else {
        return loopLinhas(
          [
            "Just type <span class=\"command\">'whois'</span> if you want to know more about DBotas.",
          ],
          "color2 maring",
          80
        );
      }
    })
  )),
  (whoami = new Command("whoami", "  Who are you?", () => {
    const desc = [
      "<br>",
      "I don't know about you, but i'm a new creature (in Christ):",
      "old things are passed away; behold, all things are become new.",
      "2 Corinthians 5:17",
      "<br>",
    ];
    return loopLinhas(desc, "color2 margin", 80);
  }).addParameter(
    new Parameter("h", "", (arrayArguments) => {
      if (arrayArguments.length > 1) {
        return loopLinhas(
          [
            "Invalid arguments! Please type the command without arguments or try --h parameter.",
          ],
          "color2 margin",
          80
        );
      } else {
        return loopLinhas(
          [
            "Just type <span class=\"command\">'whoami'</span> and try to know.",
          ],
          "color2 maring",
          80
        );
      }
    })
  )),
  (banner = new Command(
    "banner", 
    "  Display a random header",
    /**
    * Presents a random banner when type 'banner' in the terminal
    * @returns array with the banner
    */
    ()=>{
        let numberOfBanners = banner.parameters;
        let random = randomIntFromInterval(1, numberOfBanners.length - 1);
        return banner.parameters[random].description();
    }).addParameters(
    new Parameter("h", "Parameters list for this command", (arrayArguments) => {
      const bannerList = banner.listParameters();
      bannerList[1] =
        "Parameters list for the banner command:" +
        '<br> <span class="command">banner</span> A random banner ';
      return loopLinhas(bannerList, "color2 margin", 80);
    }), 
    new Parameter("1", "Banner 1", (arrayArguments) => {
      if (arrayArguments === undefined || arrayArguments.length === 1) {
        const desc = [
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
          "                                                                                          © " +
          year,
          "<br>",
          '<span class="color3">Welcome to my interactive web terminal.</span>',
          '<span class="color3">For a list of available commands, type</span> <span class="command">\'help\'</span><span class="color3">.</span>',
          '<span class="color3">For a list of available options, type</span> <span class="command">\'command --h\'</span><span class="color3">.</span>',
          "<br>",
        ];
        return loopLinhas(desc, "", 80);
      } else {
        return loopLinhas(
          [
            "Invalid arguments! Please type the command without arguments or try --h parameter.",
          ],
          "color2 margin",
          80
        );
      }
    }),
    new Parameter("2", "Banner 2", (arrayArguments) => {
      if (arrayArguments === undefined || arrayArguments.length === 1) {
        const desc = [
          "<br>",
          '<span class="index">DBotas (DB) Not A Corporation. </span>',
          "<br>",
          "&nbsp;_______ _______ _______ _______ _______ _______ ",
          "|      /|\\     /|\\     /|\\     /|\\     /|\\     /|",
          "| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
          "| |   | | |   | | |   | | |   | | |   | | |   | |",
          "| |D  | | |B  | | |o  | | |t  | | |a  | | |s  | |",
          "| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
          "|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|",
          "                                           © " + year + "       ",
          "<br>",
          '<span class="color3">Welcome to my interactive web terminal.</span>',
          '<span class="color3">For a list of available commands, type</span> <span class="command">\'help\'</span><span class="color3">.</span>',
          '<span class="color3">For a list of available options, type</span> <span class="command">\'command --h\'</span><span class="color3">.</span>',
          "<br>",
        ];
        return loopLinhas(desc, "", 80);
      } else {
        return loopLinhas(
          [
            "Invalid arguments! Please type the command without arguments or try --h parameter.",
          ],
          "color2 margin",
          80
        );
      }
    }),
    new Parameter("3", "Banner 3", (arrayArguments) => {
      if (arrayArguments === undefined || arrayArguments.length === 1) {
        const desc = [
          "<br>",
          '<span class="index">DBotas (DB) Not A Corporation. </span>',
          "________ __________        __                 ",
          "\\______ \\\\______   \\ _____/  |______    ______",
          "&nbsp;|    |  \\|    |  _//  _ \\   __\\__  \\  /  ___/",
          "&nbsp;|    `   \\    |   (  <_> )  |  / __ \\_\\___ \\ ",
          "/_______  /______  /\\____/|__| (____  /____  >",
          "        \\/       \\/                 \\/     \\/ ",
          '                                        © <span id="yearb2">' +
          year +
          "</span>",
          "<br>",
          '<span class="color3">Welcome to my interactive web terminal.</span>',
          '<span class="color3">For a list of available commands, type</span> <span class="command">\'help\'</span><span class="color3">.</span>',
          '<span class="color3">For a list of available options, type</span> <span class="command">\'command --h\'</span><span class="color3">.</span>',
          "<br>",
        ];
        return loopLinhas(desc, "", 80);
      } else {
        return loopLinhas(
          [
            "Invalid arguments! Please type the command without arguments or try --h parameter.",
          ],
          "color2 margin",
          80
        );
      }
    }),
    new Parameter("4", "Banner 4", (arrayArguments) => {
      if (arrayArguments === undefined || arrayArguments.length === 1) {
        const desc = [
          "<br>",
          '<span class="index">DBotas (DB) Not A Corporation. </span>',
          "    ",
          "██████╗░██████╗░░█████╗░████████╗░█████╗░░██████╗",
          "██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔════╝",
          "██║░░██║██████╦╝██║░░██║░░░██║░░░███████║╚█████╗░",
          "██║░░██║██╔══██╗██║░░██║░░░██║░░░██╔══██║░╚═══██╗",
          "██████╔╝██████╦╝╚█████╔╝░░░██║░░░██║░░██║██████╔╝",
          "╚═════╝░╚═════╝░░╚════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═════╝░",
          '                                           © <span id="yearb2">' +
          year +
          "</span>",
          "<br>",
          '<span class="color3">Welcome to my interactive web terminal.</span>',
          '<span class="color3">For a list of available commands, type</span> <span class="command">\'help\'</span><span class="color3">.</span>',
          '<span class="color3">For a list of available options, type</span> <span class="command">\'command --h\'</span><span class="color3">.</span>',
          "<br>",
        ];
        return loopLinhas(desc, "", 80);
      } else {
        return loopLinhas(
          [
            "Invalid arguments! Please type the command without arguments or try --h parameter.",
          ],
          "color2 margin",
          80
        );
      }
    })
  )),
  (clear = new Command(
    "clear",
    "   Clear everything written before",
    () => {
        setTimeout(function () {
            clearEverything();
          }, 1);
    }
  ).addParameters(
    new Parameter("h", "Parameters list for this command", (arrayArguments) => {
      if (arrayArguments.length > 1) {
        return loopLinhas(
          [
            "Invalid arguments! Please type the command without arguments or try --h parameter.",
          ],
          "color2 margin",
          80
        );
      } else {
        return this.listParameters();
      }
    }),
    new Parameter(
      "b",
      "Clear with banner at the beginning",
      (arrayArguments) => {
        if (arrayArguments.length > 1) {
          return loopLinhas(
            [
              "Invalid arguments! Please type the command without arguments or try --h parameter.",
            ],
            "color2 margin",
            80
          );
        } else {
          return setTimeout(function () {
            clearEverything();
            banner.description();
            textarea.focus();
          }, 100);
        }
      }
    )
  )),
  (historyCMD = new Command(
    "history", 
    " Display previous commands",
    ()=>{
        addLinha("<br>", "", 0);
        loopLinhas(historyCommands, "color3 margin", 80);
        addLinha("<br>", "command", 80 * historyCommands.length + 50);
    })),
  (videos = new Command("videos", "  View youtube videos")),
  (projects = new Command("projects", "View coding projects").addParameters(
    new Parameter("h", "Parameters list for this command"),
    new Parameter("p", "Personal projects"),
    new Parameter("s", "School projects")
  )),
  (reload = new Command("reload", "  Reload terminal", function () {
    historyCommands = [];
    beginTerminal("reloadTerminal", 0);
  }).addParameter(
    new Parameter("h", "", (arrayArguments) => {
      return loopLinhas(
        [
          "Just type <span class=\"command\">'reload'</span> if you want to restart terminal.",
        ],
        "color2 maring",
        80
      );
    })
  )),
  (social = new Command("social", "  Display social networks")),
  (secret = new Command("secret", "  Find my password").addParameter(
    new Parameter("h", "", (arrayArguments) => {
      return loopLinhas(
        [
          "Just type <span class=\"command\">'secret'</span> and try to find my password",
        ],
        "color2 maring",
        80
      );
    })
  )),
  (language = new Command(
    "language",
    "Choose a different language for the terminal"
  )),
  (setup = new Command("setup", "   Setup different color/font terminal")),
  (date = new Command(
    "date",
    "    Display date in different formats",
    (arrayArguments) => {
      if (arrayArguments === undefined || arrayArguments.length === 1) {
        return loopLinhas(
          ["<br>", new Date().toString(), "<br>"],
          "color2 margin",
          80
        );
      } else {
        return loopLinhas(
          [
            '<span class="inherit">Command not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
          ],
          "color2 margin",
          80
        );
      }
    }
  ).addParameters(
    new Parameter("h", "Parameters list for this command", (arrayArguments) => {
      let helpList = date.listParameters();
      helpList[1] = "Parameters list for the banner command: <br>";
      return loopLinhas(helpList, "color2 margin", 80);
    }),
    new Parameter("n", "What time is it?", (arrayArguments) => {
      return loopLinhas(
        [
          "<br>",
          "Now is " +
            new Date().getHours().toString() +
            ":" +
            new Date().getMinutes(),
          "<br>",
        ],
        "color2 margin",
        80
      );
    }),
    new Parameter("t", "Tomorrow's date", (arrayArguments) => {
      const tomorrow = new Date();
      tomorrow;
      tomorrow.setDate(tomorrow.getDate() + 1);
      return loopLinhas(
        ["<br>", "Tomorrow will be " + tomorrow.toDateString(), "<br>"],
        "color2 margin",
        80
      );
    }),
    new Parameter("y", "Yesterday's date", (arrayArguments) => {
      const yesterday = new Date();
      yesterday;
      yesterday.setDate(yesterday.getDate() - 1);
      return loopLinhas(
        ["<br>", "Yesterday was " + yesterday.toDateString(), "<br>"],
        "color2 margin",
        80
      );
    }),
    new Parameter(
      "c",
      "Calendar for the year and month. %Year-Month %s for start week at sunday or %m for start week at monday.<p><span class=\"command\">        </span><span class=\"color3\">Example: date --c %2023-01 %s</span></p>",
      (arrayArguments) => {
        const calendarDate = arrayArguments[1];
        const weekDays = arrayArguments[2];
                
        if (arrayArguments.length === 3) {
          const calendarSplitted = calendarDate.split("-",2);
          const year = calendarSplitted[0];
          const month = calendarSplitted[1];

          if(!isNaN(year) && !isNaN(month) && (Number.parseInt(month) > 0 && Number.parseInt(month) < 13) && (weekDays === "m" || weekDays === "s")){
            const calendar = createArrayCalendar(year, month, weekDays);
            return loopLinhas(calendar, "color2 margin", 80);
          } else {
            loopLinhas(
              [
                "Invalid arguments. Please type arguments as %YYYY-MM %s or %%YYYY-MM %m for the arguments.",
              ],
              "color2 margin",
              80
            );
          }
        } else {
          loopLinhas(
            [
              "Invalid arguments. Please type arguments as %YYYY-MM %s or %%YYYY-MM %m for the arguments.",
            ],
            "color2 margin",
            80
          );
        }
      }
    ),
    new Parameter(
      "o",
      'Tell me you\'re birth date and i\'ll tell you how old are you.<p><span class="command">        </span><span class="color3">Example: date --o %1965-02-15</span></p>',
      (arrayArguments) => {
        const dateBirth = new Date(arrayArguments[1]);
        const dateBirthValidation = Date.parse(dateBirth);
        const age = howOld(dateBirth);

        if (arrayArguments.length === 2 && !isNaN(dateBirthValidation)) {
          if (age < -1) {
            return loopLinhas(
              [
                "<br>",
                "You're planning a baby " +
                  Math.abs(age) +
                  " years from now? Maybe?",
                "<br>",
              ],
              "color2 margin",
              80
            );
          } else if (age >= -1 && age < 0) {
            return loopLinhas(
              ["<br>", "You're having a baby soon? Congratulations!", "<br>"],
              "color2 margin",
              80
            );
          } else if (age === 0) {
            return loopLinhas(
              ["<br>", "Congratulations for your baby!", "<br>"],
              "color2 margin",
              80
            );
          } else if (age === 1) {
            return loopLinhas(
              [
                "<br>",
                "Congratulations for the " +
                  age +
                  "º year of your baby!",
                "<br>",
              ],
              "color2 margin",
              80
            );
          } else {
            return loopLinhas(
              ["<br>", "You're " + age + " years old.", "<br>"],
              "color2 margin",
              80
            );
          }
        } else {
          return loopLinhas(
            [
              "Invalid arguments. Please type arguments as %YYYY-MM-DD for the arguments.",
            ],
            "color2 margin",
            80
          );
        }
      }
    ),

    new Parameter(
      "d",
      'Calculate dates differences in days. Use the "YYYY-MM-DD" or "YYYY/MM/DD" formats for the dates.  <p><span class="command">        </span><span class="color3">Example: date --d %2020-02-01 %2020-01-01</span></p>',
      (arrayArguments) => {
        const dateLatest = new Date(arrayArguments[1]);
        const dateNewest = new Date(arrayArguments[2]);
        const date1 = Date.parse(dateNewest);
        const date2 = Date.parse(dateLatest);

        if (arrayArguments.length === 3 && !isNaN(date1) && !isNaN(date2)) {
          return loopLinhas(
            [
              "<br>",
              "The total number of days between dates is " +
                differenceDatesInDays(dateNewest, dateLatest).toString() +
                " days.",
              "<br>",
            ],
            "color2 margin",
            80
          );
        } else {
          return loopLinhas(
            [
              "Invalid arguments. Please type arguments as %YYYY-MM-DD for the arguments.",
            ],
            "color2 margin",
            80
          );
        }
      }
    )
  )),
  (game = new Command("game", "    Play a game")),
  (tools = new Command("tools", "   Check these tools")),
  (exit = new Command("exit","    To exit terminal",()=>{
    return loopLinhas(Help.defaultEn.listCommands(), "color2 margin", 80);
}).addParameter(
  new Parameter("h", "", (arrayArguments) => {
    if (arrayArguments.length > 1) {
      return loopLinhas(
        [
          "Invalid arguments! Please type the command without arguments or try --h parameter.",
        ],
        "color2 margin",
        80
      );
    } else {
      return loopLinhas(
        [
          "Just type <span class=\"command\">'exit'</span> and get out of terminal!",
        ],
        "color2 maring",
        80
      );
    }
  })
))
);
