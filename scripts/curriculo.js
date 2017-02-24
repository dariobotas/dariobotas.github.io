var dataNascimento = new Date("june 12, 1991 9:15:0");
var anos, meses, dias;

setInterval(function () {
    var anoAtual = new Date();

    anos = anoAtual.getUTCFullYear() - dataNascimento.getFullYear();
    meses = anoAtual.getUTCMonth() - dataNascimento.getMonth();
    dias = anoAtual.getUTCDate() - dataNascimento.getDate();
    //ano = parseInt(diasF / 365);
    if (meses < 0 || meses === 0 && dias < 0) { anos--; }
    //var span = document.getElementById('ano').innerHTML=anos;
    var span = document.getElementById('ano');

    while (span.firstChild != undefined) {
        span.removeChild(span.firstChild);
    }

    var ano = document.createTextNode(anos);
    span.appendChild(ano);
}, 1000); 


$(document).ready(function(){
  // Add scrollspy to <body>
  $('body').scrollspy({target: ".navbar", offset: 50});   

  // Add smooth scrolling on all links inside the navbar
  $("#myNavbar a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  // End if
  });
});