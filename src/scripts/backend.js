import "parsleyjs";

$(function () {
  teamFilter();
});

function teamFilter() {
    console.log("teamFilter");
    $("[data-type=js-team-filter-tag]").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("active");
  
      ajaxTeamList();
    });
  
    $("[data-type=js-team-filter-clear]").on("click", function (e) {
      e.preventDefault();
  
      $("[data-type=js-team-filter-tag]").each(function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
        }
      });
  
      ajaxTeamList();
    });
  
    function ajaxTeamList() {
      let tags = [],
        teamList = $("[data-type=js-team-list]");
  
      $("[data-type=js-team-filter-tag]").each(function () {
        if ($(this).hasClass("active")) {
          tags[tags.length] = $(this).attr("data-id");
        }
      });

      console.log(tags);
  
      $.ajax({
        method: "POST",
        url: window.location.href,
        data: {
          ajax: 1,
          tags: tags,
        },
      }).done(function (a) {
        teamList.html(a);
      });
    }
  }