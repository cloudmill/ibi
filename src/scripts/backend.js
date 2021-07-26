import "parsleyjs";

$(function () {
  teamFilter();
  libraryFilter();
  bafFilter();
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

function libraryFilter() {
  console.log("libraryFilter");
  $("[data-type=js-library-filter-tag]").on("click", function (e) {
    e.preventDefault();
    console.log("libraryFilter click tag");
    $(this).toggleClass("active");

    ajaxLibraryList();
  });

  $("[data-type=js-library-filter-clear]").on("click", function (e) {
    console.log("libraryFilter click tag");
    e.preventDefault();

    $("[data-type=js-library-filter-tag]").each(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      }
    });

    ajaxLibraryList();
  });

  function ajaxLibraryList() {
    console.log("libraryFilter ajax");
    let tags = [],
      libraryList = $("[data-type=js-library-list]");

    $("[data-type=js-library-filter-tag]").each(function () {
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
      libraryList.html(a);
    });
  }
}

function bafFilter() {
  console.log("bafFilter");
  $("[data-type=js-baf-filter-tag]").on("click", function (e) {
    e.preventDefault();
    console.log("bafFilter click tag");
    $(this).toggleClass("active");

    ajaxbafList();
  });

  $("[data-type=js-baf-filter-clear]").on("click", function (e) {
    console.log("bafFilter click tag");
    e.preventDefault();

    $("[data-type=js-baf-filter-tag]").each(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      }
    });

    ajaxbafList();
  });

  function ajaxbafList() {
    console.log("bafFilter ajax");
    let tags = [],
      bafList = $("[data-type=js-baf-list]");

    $("[data-type=js-baf-filter-tag]").each(function () {
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
      bafList.html(a);
    });
  }
}
