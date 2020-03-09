/*--------- GENERAL ---------
//Cuando se actualiza o ingresa a la página aparece #home
$(document).ready(function (){
  location.href="/#home";
});*/


/*--------- SCROLLING ---------*/

$(document).ready(function () {
  $(document).on("scroll", onScroll);
  
  //smoothscroll
  $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
      
      $('a').each(function () {
          $(this).removeClass('active');
      })
      $(this).addClass('active');
    
      var target = this.hash

      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top-75
      }, 500, 'swing', function () {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
          
      });
  });
});

function onScroll(event){
  var scrollPos = $(document).scrollTop() + 75;
  $('#myNavbar a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('#myNavbar a').removeClass("active");
          currLink.addClass("active");

          var hash = $(this).attr('href');
          window.history.replaceState(null,null,hash)
      }
      else{
          currLink.removeClass("active");
      }
  });

  $('#myNavbarSmall a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('#myNavbarSmall a').removeClass("active");
        currLink.addClass("active");
    }
    else{
        currLink.removeClass("active");
    }
});
}


/*--------- CARGAR IMAGEN ---------*/

/*----- Funciona junto a id="cargar-imagen" del index.html para cambiar el "subir archivo" predeterminado -----*/
function chooseFile() {
  document.getElementById("cargar-imagen").click();
}

/*----- Agrega el div #loading-img -----*/
function loading(){
  if(document.getElementById("cargar-imagen").value != 0){
    //agrega el "Subiendo foto (#loading-img)"
    document.getElementById('loading-img').classList.remove("w3-hide");

    //saca el boton "Subí una foto" (#boton-imagen)
    document.getElementById('boton-imagen').classList.add("w3-hide");

    //saca el boton "Subí otra foto" (#boton-imagen)
    document.getElementById('refresh').classList.add("w3-hide");

    //saca el boton "Abrí tu receta de nuevo" (#boton-imagen)
    document.getElementById('reopen-modal').classList.add("w3-hide");
  }
}


/*--------- MODAL ---------*/

//----- Abre cada una de las pestañas del modal
document.getElementsByClassName("tablink")[0].click();

function openReceta(evt, titulo) {
  let i;
  let pestañasModal = document.getElementsByClassName("pestañas-modal");
  for (i = 0; i < pestañasModal.length; i++) {
    pestañasModal[i].style.display = "none";
  }
  document.getElementById(titulo).style.display = "block";  
};


//----- Add active class to the current button (Navbar Modal)

document.getElementById("plato-tab").classList.add("active-modal")
$(document).ready(function() {
  $(".tablink").click(function () {
    $(".tablink").removeClass("active-modal");
    $(this).addClass("active-modal"); 
  });
});

//----- When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('modal-resultado');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//----- When the user clicks the (x) of the modal, close it
function closeModal(){
  $('#modal-resultado').modal('hide');
}

//----- Abre el modal de nuevo con la misma receta que antes
function reopenModal(){
  $('#modal-resultado').modal('show');
}


//mostrar el modal en la página #tu-receta
$(document).ready(function() {

  if(window.location.href.indexOf('#tu-receta') != -1) {
    $('#modal-resultado').modal('show');
  }
});

//
