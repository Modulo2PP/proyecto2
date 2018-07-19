document.addEventListener(
  "DOMContentLoaded",
  () => {
    var pathname = window.location.pathname;
      
    console.log("click en nav item")
    switch (pathname){
      case "/explore":$(".nav-item").removeClass("active");$(".e").addClass("active");break;
      case "/collect":$(".nav-item").removeClass("active");$(".c").addClass("active");console.log("click en c");break;
      case "/mycollection":$(".nav-item").removeClass("active");$(".m").addClass("active");break;
      default:$(".nav-item").removeClass("active")

    }
    var num_pagina = 1;
    var parametros = {
      api_key: api_key,
      format: "json",
      nojsoncallback: 1
    };
    function search_flickr() {
      console.log("Realiza busqueda todas las fotos de Flickr");
      return $
        .getJSON(
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
        .done(data => {
          return data;
        });
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
    function search_recent() {
      console.log("entra");
      $.getJSON(
        "https://api.flickr.com/services/rest/?&method=flickr.photos.getRecent&api_key=" +
          api_key +
          "&user_id=" +
          "&per_page=20" +
          "&page=" +
          num_pagina +
          "&format=json&nojsoncallback=1"
      ).done(data => {
        console.log(data);
        show_pictures([...data.photos.photo]);
      });
    }
    function search() {
      if ($("#text-search").val() == "") {
        search_recent();
      } else {
        search_flickr().then(data => {
          show_pictures([...data.photos.photo]);
        });
      }
    }

    function show_pictures(info) {
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
          "_z.jpg";

        console.debug(url);
        $("#collect-pictures").append(
          "<div class='eachPic'>" +
            '<img src="' +
            url +
            '" class="imagen" ' +
            '"/>' +
            "<button class='fav-btn2'>" +
            "<i class='far fa-heart'></i>" +
            "</button>" +
            " </div>"
        );
      }
      /*$('html, body').animate({
          scrollTop: $("#resultados").offset().top
      }, 1000); */
    }


    console.log("IronGenerator JS imported successfully!");
    $("body").on("click", ".fav-btn", e => {
      console.log("click en fav");
      var path = $(e.currentTarget)
        .parent()
        .parent()
        .find("img")
        .prop("src");
      var albumId = $(e.currentTarget)
        .parent()
        .find(".choose-album")
        .val();
      $.ajax({
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        url: "/pictures/add",
        data: JSON.stringify({ path: `${path}`, albumId: `${albumId}` })
      }).done(() => {
        console.log("Picture added to album");
        $(e.currentTarget).css({ color: "red" });
      });
    });

    $("body").on("click", ".fav-btn2", e => {
      console.log("click en fav");
      var path = $(e.currentTarget)
        .parent()
        .find("img")
        .prop("src");
      console.log(path);
      var albumId = $(e.currentTarget)
        .parent()
        .find(".choose-album")
        .val();
      console.log(albumId);
      $.ajax({
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        url: "/pictures/add",
        data: JSON.stringify({ path: `${path}` })
      }).then(() => {
        console.log("Picture added to album");
        $(e.currentTarget).css({ color: "red" });
      });
    });

    $("body").on("click", ".add-album i", e => {
      console.log("click  en add album");
      $.ajax({
        type: "GET",
        url: "/albums/add"
      }).done(album => {
        var a = album.album;
        console.log(a);

        $(".flex-albums").append(
          "<div class='album-container'>" +
            '<p class="albumId d-none">' +
            `${a._id}` +
            "</p><a href=/" +
            `${a._id}` +
            "/pictures><div class='album'><h5>" +
            `${a.name}` +
            "</h5><img src='https://previews.123rf.com/images/themoderncanvas/themoderncanvas1602/themoderncanvas160200091/52803071-fotos-icono-digital-%C3%81lbum-de-fotos-se%C3%B1al-galer%C3%ADa-de-im%C3%A1genes-de-s%C3%ADmbolos-blanco-icono-de-la-galer%C3%ADa-de-im%C3%A1genes-so.jpg' alt=''> </div> </a>" +
            '<button class="delete-album-btn"><i class="far fa-trash-alt"></i></button>' +
            "</div>"
        );
        $(".flex-albums").append($(e.currentTarget).parent());
      });
    });
    $("body").on("click", ".album-name-input", e => {
      var previousName = $(".album-name-input").val();
      var albumId = $("#album-pics")
        .find("#albumId")
        .text();
      $("body").on("keypress", ".album-name-input", e => {
        if (e.which == 13) {
          $(".album-name-input").blur();
          if ($(".album-name-input").val() != previousName) {
            var name = $(".album-name-input").val();
            $.ajax({
              contentType: "application/json",
              dataType: "json",
              type: "POST",
              url: "/albums/changeName",
              data: JSON.stringify({ name: `${name}`, albumId: `${albumId}` })
            });
          }
        }
      });
    });

    $("body").on("click", "#text-search", e => {
      var previousName = $(".album-name-input").val();
      var albumId = $("#album-pics")
        .find("#albumId")
        .text();
      $("body").on("keypress", "#text-search", e => {
        if (e.which == 13) {
          $("#btn-search").trigger("click")
        }
      });
    });

    $("body").on("click", ".delete-pic-btn", e => {
      console.log("click delete");
      var path = $(e.currentTarget)
        .parent()
        .find("img")
        .prop("src");
      var albumId = $("#album-pics")
        .find("#albumId")
        .text();
      console.log(path);
      console.log(albumId);
      $.ajax({
        contentType: "application/json",
        dataType: "json",
        type: "POST",

        url: "/pictures/remove",
        data: JSON.stringify({ path: `${path}`, albumId: `${albumId}` })
      }).done(a => {
        console.log("borrada");
        $(e.currentTarget)
          .parent()[0]
          .remove();
      });
    });

    
      

    

    $("body").on("click", ".delete-album-btn", e => {
      console.log("click en borrar album");
      if (
        $(e.currentTarget)
          .parent()
          .is(":first-child")
      ) {
      } else {
        var albumId = $(e.currentTarget)
          .parent()
          .find("p")
          .text();

        $.ajax({
          contentType: "application/json",
          dataType: "json",
          type: "POST",

          url: "/albums/remove",
          data: JSON.stringify({ albumId: `${albumId}` })
        }).done(a => {
          console.log("borrado album");
          console.log($(e.currentTarget).parent()[0]);

          $(e.currentTarget)
            .parent()[0]
            .remove();
        });
      }
    });

    $("#btn-explore").click(() => {
      num_pagina = 1;
      $("#flex-Photos").removeClass("d-none");
      $(".results").addClass("d-none");
      //$("#nav-options").find("li").css({border:"1px solid orange"})
    });

    $(window).scroll(function() {
      if (
        $(window).scrollTop() >=
        $(document).height() - $(window).height() - 3
      ) {
        console.log("scroll down");
        num_pagina++;
        search();
      }
    });

    $("#btn-search").click(() => {
      num_pagina = 1;
      if ($("#text-search").val() == "") return;
      $("#collect-pictures").empty();

      search();
      $("html, body").animate(
        {
          scrollTop: $(".results").offset().top
        },
        1000
      );
    });

    /*$("#btn-more").on("click", function(e) {
      console.log("Click en #btn-more");
      $("#collect-pictures").empty();
      num_pagina++;

      if (num_pagina > 1) {
        console.log(num_pagina);
        show_recent();
      }
    });*/
  },
  false
);

/* $("body").on("click", ".otherUser", e => {
  var userName = $(e.currentTarget).text()
  $.ajax({
    contentType: "application/json",
    dataType: "json",
    type: "POST",
    url: "/otheruser",
    data: JSON.stringify({ userName: `${userName}`})
  });
});
 */
