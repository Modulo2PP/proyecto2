document.addEventListener(
  "DOMContentLoaded",
  () => {
    var num_pagina = 1;
    var parametros = {
      api_key: api_key,
      format: "json",
      nojsoncallback: 1
    };
    function search() {
      console.log("Realiza busqueda todas las fotos de Flickr");
      $.getJSON(
        "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" +
          api_key +
          "&user_id=" +
          "&text=" +
          ($("#text-search").val() == "" ? "" : $("#text-search").val()) +
          "&per_page=20" +
          "&page=" +
          num_pagina +
          "&format=json&nojsoncallback=1",
        show_pictures
      );
    }

    function show_pictures(info){
      console.log(info);
      $("#collect-pictures").empty();
      
      for (var i=0;i<info.photos.photo.length;i++) {
         var item = info.photos.photo[i];
         var url = 'https://farm'+item.farm+".staticflickr.com/"+item.server
              +'/'+item.id+'_'+item.secret+'_m.jpg';
         var urlOriginal = 'https://farm'+item.farm+".staticflickr.com/"+item.server
              +'/'+item.id+'_'+item.secret+'_c.jpg';
         console.debug(url);
         $("#collect-pictures").append('<img src="' + url + '" class="imagen" '  + '"/>');
      }
      /*$('html, body').animate({
          scrollTop: $("#resultados").offset().top
      }, 1000); */
  }


    function show_recent(){
      $.getJSON(
        "https://api.flickr.com/services/rest/?&method=flickr.photos.getRecent&api_key=" +
          api_key +
          "&user_id=" +
          "&per_page=20" +
          "&page=" +
          num_pagina +
          "&format=json&nojsoncallback=1",
        show_pictures
      );
    }
    console.log("IronGenerator JS imported successfully!");

    $("#btn-collect").click(() => {
      num_pagina=1
      $(".collect-search").removeClass("d-none")
      $("#results").removeClass("d-none")

      show_recent()

    });
    $("#btn-search").click(() => {
      $("#collect-pictures").empty();

      search()
    });

    $("#btn-more").on("click", function(e) {
      console.log("Click en #btn-more");
      $("#collect-pictures").empty();
      num_pagina++;

      if (num_pagina > 1){
          console.log(num_pagina);
          show_recent();
      }
  });

  },
  false
);
