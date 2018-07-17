document.addEventListener(
  "DOMContentLoaded",
  () => {
    var num_pagina = 1;
    var parametros = {
      api_key: api_key,
      format: "json",
      nojsoncallback: 1
    };
    function search_flickr() {
      console.log("Realiza busqueda todas las fotos de Flickr");
      return $.getJSON(
        "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=" +
          api_key +
          "&user_id=" +
          "&text=" +
          ($("#text-search").val() == "" ? "" : $("#text-search").val()) +
          "&per_page=20" +
          "&page=" +
          num_pagina +
          "&format=json&nojsoncallback=1"
      )
      .done(data=>{
        return data
      })
    }
    /*function search_pexels(hashtag="show") {
      console.log("Realiza busqueda todas las fotos de Instagram");
      return $.ajax({
        url: "https://api.pexels.com/v1/search?query=example+query&per_page=15&page=1",
        dataType: 'jsonp',
        type: 'GET',
        Authorization: pexels_key,
        data: { access_token: i_token,count: 10},
        
        error: function(data){
          console.log("Error getting pictures from instagram");
        }
      })
      .then(data=>{
        console.log(data)
        return data
      })
    }*/

    function search(){
      search_flickr()
      .then(data=>{
        console.log(data)
          show_pictures([...data.photos.photo])
        
      })
    }

    function show_pictures(info) {
      $("#collect-pictures").empty();

      for (var i = 0; i < info.length; i++) {
        var item = info[i];
        var url =
          "https://farm" +
          item.farm +
          ".staticflickr.com/" +
          item.server +
          "/" +
          item.id +
          "_" +
          item.secret +
          "_m.jpg";
        var urlOriginal =
          "https://farm" +
          item.farm +
          ".staticflickr.com/" +
          item.server +
          "/" +
          item.id +
          "_" +
          item.secret +
          "_c.jpg";
        console.debug(url);
        $("#collect-pictures").append(
          "<div class='eachPic'>"+'<img src="' + url + '" class="imagen" ' + '"/>' + "<button>" + "<i class='far fa-heart'></i>" + "</button>" +" </div>"
        );
      }
      /*$('html, body').animate({
          scrollTop: $("#resultados").offset().top
      }, 1000); */
    }

    
    console.log("IronGenerator JS imported successfully!");

    

    $("#btn-explore").click(() => {
      num_pagina = 1;
      $("#flex-Photos").removeClass("d-none");
      $(".results").addClass("d-none");
    });

    $("#btn-search").click(() => {
      num_pagina = 1;
      $("#collect-pictures").empty();

      search();
    });

    $("#btn-more").on("click", function(e) {
      console.log("Click en #btn-more");
      $("#collect-pictures").empty();
      num_pagina++;

      if (num_pagina > 1) {
        console.log(num_pagina);
        show_recent();
      }
    });
  },
  false
);
