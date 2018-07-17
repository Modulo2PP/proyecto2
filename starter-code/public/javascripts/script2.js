document.addEventListener(
    "DOMContentLoaded",
    () => {
    num_pagina = 1;
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
            "<div class='col-md-4'>"+'<img src="' + url + '" class="imagen" ' + '"/>'+"</div>"
          );
        }
        /*$('html, body').animate({
            scrollTop: $("#resultados").offset().top
        }, 1000); */
      }
    function search_recent() {
        console.log("entra")
        $.getJSON(
          "https://api.flickr.com/services/rest/?&method=flickr.photos.getRecent&api_key=" +
            api_key +
            "&user_id=" +
            "&per_page=20" +
            "&page=" +
            num_pagina +
            "&format=json&nojsoncallback=1"
          
        )
        .done(data=>{
            console.log(data)
          show_pictures([...data.photos.photo])
        })
      }
    $("#flex-Photos").addClass("d-none");
    
    $(".results").removeClass("d-none");
    
    search_recent();
    
})