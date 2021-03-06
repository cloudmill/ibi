import { each } from "jquery";
import "parsleyjs";

$(function () {
  teamFilter();
  libraryFilter();
  eventFilter();
  bafFilter();
  faqFilter();
  publicFilter();
  showMore();
  servSectionFilterTypes();
  forms();
  changeLang();
  formAgain();
  // changeFile();
  snippetVideo();
  snippetMat();
  snippetSlider();
  snippetDopTextImg();
});

function snippetSlider() {
  $(document).ready(function () {
    let mat = $(document).find('[data-type=slider-block]');

    $(document).find('[data-type=slider-block-inner]').html(mat);
  });
}

function snippetMat() {
  $(document).ready(function () {
    let mat = $(document).find('[data-type=mat-block]');

    $(document).find('[data-type=mat-block-inner]').html(mat);
  });
}

function snippetDopTextImg() {
  $(document).ready(function () {
    let mat = $(document).find('[data-type=dop-text-img-block]');

    $(document).find('[data-type=dop-txt-img-block-inner]').html(mat);
  });
}

function snippetVideo() {
  $(document).ready(function () {
    $('[data-type=video-block-inner]').each(function (index, value) {
      let video = $(document).find('[data-type=video-block-' + index + ']');
      $(this).html(video);
    });

  });
}

function formAgain() {
  $(document).on("click", "[data-type=form-again]", function (e) {
    // console.log('formAgain');

    $(".form--hidden").each(function () {
      $(this).removeClass('form--hidden');
    });

    $(".response--active").each(function () {
      $(this).removeClass('response--active');
    });

    $(document).find("[data-type=form-ttl]").removeClass("form--hidden");

    $(document).find("[data-clear=clear-input]").each(function () {
      $(this).val('');
    });
    $(document).find(".tooth-button--destroyed").each(function () {
      $(this).removeClass('tooth-button--destroyed');
    });
    $(document).find(".tooth-button--removed").each(function () {
      $(this).removeClass('tooth-button--removed');
    });
  });
}

function changeLang() {
  $(document).on("click", "[data-type=change-lang]", function (e) {
    let thisObj = $(this),
      lang = thisObj.text(),
      pathname = $(location).attr('pathname'),
      newPath = ('');

    if (lang == 'En') {
      newPath = "/en" + pathname;
    }

    if (lang == 'Ru') {
      newPath = pathname.replace("/en", "");
    }

    if (newPath) {
      window.location.href = newPath;
    }
  });
}

function forms() {
  $(document).on("submit", "[data-type=js-form]", function (e) {
    console.log("form submit");
    e.preventDefault();

    let form = $(this),
      formResponse = form.siblings("[data-type=form-response]"),
      formTtl = form.siblings("[data-type=form-ttl]"),
      url = form.attr("data-url"),
      eventType = form.attr("data-event-type"),
      contentType = "application/x-www-form-urlencoded; charset=UTF-8",
      processData = true,
      calcBlock = $(document).find(".calc"),
      destroyedTop = [],
      destroyedBot = [],
      removedTop = [],
      removedBot = [],
      data = {};

    if (calcBlock.hasClass("calc-error")) {
      return false;
    }

    if (eventType == 'FILE') {
      data = new FormData();
      contentType = false;
      processData = false;

      const file = form.find("[data-type=file]");

      $.each(file[0].files, function (key, input) {
        data.append('file[]', input);
      });

      $("[data-type=tooth]").each(function () {
        if ($(this).hasClass("tooth-button--destroyed")) {
          if ($(this).hasClass("tooth-button--top")) {
            destroyedTop.push($(this).attr("data-tooth-id"));
          }
          if ($(this).hasClass("tooth-button--bot")) {
            destroyedBot.push($(this).attr("data-tooth-id"));
          }
        }
        if ($(this).hasClass("tooth-button--removed")) {
          if ($(this).hasClass("tooth-button--top")) {
            removedTop.push($(this).attr("data-tooth-id"));
          }
          if ($(this).hasClass("tooth-button--bot")) {
            removedBot.push($(this).attr("data-tooth-id"));
          }
        }
      });
      data.append('UF_DESTROYED_TOP', destroyedTop);
      data.append('UF_REMOVED_TOP', removedTop);
      data.append('UF_DESTROYED_BOT', destroyedBot);
      data.append('UF_REMOVED_BOT', removedBot);
    }

    form.find("[data-type=get-field]").each(function () {
      let field = $(this).attr("data-uf"),
        val = $(this).val();

      if (eventType == 'FILE') {
        data.append(field, val);
      } else {
        data[field] = val;
      }
    });

    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      contentType: contentType,
      processData: processData,
      data: data,
      success: function (r) {
        if (r.success === true) {
          $(document).find("[data-clear=clear-input]").each(function () {
            $(this).val('');
          });
          $(document).find(".tooth-button--destroyed").each(function () {
            $(this).removeClass('tooth-button--destroyed');
          });
          $(document).find(".tooth-button--removed").each(function () {
            $(this).removeClass('tooth-button--removed');
          });
          $(document).find(".form-new__add-file-row2").empty();
          $(document).find('[data-form-hidden=true]').addClass("form--hidden");
          formTtl.addClass("form--hidden");
          $(document).find('[data-form-hidden=true]').siblings("[data-type=form-response]").addClass("response--active");
          formResponse.addClass("response--active");
        }
      },
    });
  });
}

function showMore() {
  $(document).on("click", "[data-type=show_more_click]", function (e) {
    let thisObj = $(this),
      path = window.location.pathname,
      pathArr = path.split("/"),
      url = thisObj.attr("data-url"),
      tags = thisObj.attr("data-tags"),
      container = thisObj.parents("[data-type-container=main-items-container]"),
      itemsContainer = container.find("[data-container=items]");

    // console.log("show more");

    if (tags) {
      tags = JSON.parse(tags);
    }

    if (url) {
      thisObj.remove();

      $.ajax({
        method: "POST",
        url: url,
        data: {
          ajax: 1,
          tags: tags,
        },
      }).done(function (r) {
        let responsePageNav = $(r).find("[data-type=show_more_click]"),
          itemsResponse = $(r).find("[data-type=item]");

        if (pathArr[2] == "library") {
          let itemsContainerLib = $(document).find("[data-container=items]");

          // console.log(itemsContainerLib);
          // console.log($(r));

          itemsContainerLib.append($(r));
          if (responsePageNav) {
            itemsContainerLib.after(responsePageNav);
          }
        } else if (pathArr[2] == "events") {
          let itemsContainerEv = $(document).find("[data-container=items]");

          // console.log(itemsContainerEv);
          // console.log($(r));

          itemsContainerEv.append($(r));
          if (responsePageNav) {
            itemsContainerEv.after(responsePageNav);
          }
        } else if (pathArr[1] == "publications") {
          let itemsContainerEv = $(document).find("[data-container=items]");

          // console.log(itemsContainerEv);
          // console.log($(r));

          itemsContainerEv.append($(r));
          if (responsePageNav) {
            itemsContainerEv.after(responsePageNav);
          }
        } else {
          itemsContainer.append(itemsResponse);
        }

        if (responsePageNav) {
          itemsContainer.after(responsePageNav);
        }

        window.scroller.update();
      });
    }
  });
}

function teamFilter() {
  // state (???????????? id ?????????? (data-id)) - ?????????? ???????????????????? ???????????????????? ???? ?????????????? ?????????????????? ?????????? ??????????????
  let state = [];

  // ?????????????????? ?????????? ???? ????????/???????????? (?????????????????????????? ???? window)
  $(window).on("click", (event) => {
    if (
      $(event.target).closest("[data-type=js-team-filter-tag]").length !== 0
    ) {
      const tag = $(event.target).closest("[data-type=js-team-filter-tag]");
      const tag_id = tag.data("id");

      if (inState(tag_id)) {
        state = state.filter((id) => id !== tag_id);

        $(`[data-type=js-team-filter-tag][data-id="${tag_id}"]`).removeClass(
          "team-filter__item--active"
        );
      } else {
        state.push(tag_id);

        $(`[data-type=js-team-filter-tag][data-id="${tag_id}"]`).addClass(
          "team-filter__item--active"
        );
      }

      ajaxLib();
    } else if (
      $(event.target).closest("[data-type=js-team-filter-clear]").length !== 0
    ) {
      state = [];

      $("[data-type=js-team-filter-tag]").removeClass(
        "team-filter__item--active"
      );

      ajaxLib();
    }
  });

  // ???????????????? state -> ??????????????????, ???????????????????? labraryList
  function ajaxLib() {
    let teamList = $("[data-type=js-team-list]");

    $.ajax({
      method: "POST",
      url: window.location.href,
      data: {
        ajax: 1,
        tags: state,
      },
    }).done(function (a) {
      teamList.html(a);
    });
  }

  // ????????????????: id ?? state?
  function inState(id) {
    for (let i = 0; i < state.length; i++) {
      if (state[i] === id) return true;
    }

    return false;
  }
}

function eventFilter() {
  // state (???????????? id ?????????? (data-id)) - ?????????? ???????????????????? ???????????????????? ???? ?????????????? ?????????????????? ?????????? ??????????????
  let state = [];

  // ?????????????????? ?????????? ???? ????????/???????????? (?????????????????????????? ???? window)
  $(window).on("click", (event) => {
    if (
      $(event.target).closest("[data-type=js-event-filter-tag]").length !== 0
    ) {
      const tag = $(event.target).closest("[data-type=js-event-filter-tag]");
      const tag_id = tag.data("id");

      if (inState(tag_id)) {
        state = state.filter((id) => id !== tag_id);

        $(`[data-type=js-event-filter-tag][data-id="${tag_id}"]`).removeClass(
          "team-filter__item--active"
        );
      } else {
        state.push(tag_id);

        $(`[data-type=js-event-filter-tag][data-id="${tag_id}"]`).addClass(
          "team-filter__item--active"
        );
      }

      ajaxEvent();
    } else if (
      $(event.target).closest("[data-type=js-event-filter-clear]").length !== 0
    ) {
      state = [];

      $("[data-type=js-event-filter-tag]").removeClass(
        "team-filter__item--active"
      );

      ajaxEvent();
    }
  });

  // ???????????????? state -> ??????????????????, ???????????????????? labraryList
  function ajaxEvent() {
    let eventList = $("[data-type=js-event-list]");

    $.ajax({
      method: "POST",
      url: window.location.href,
      data: {
        ajax: 1,
        tags: state,
      },
    }).done(function (a) {
      eventList.html(a);
    });
  }

  // ????????????????: id ?? state?
  function inState(id) {
    for (let i = 0; i < state.length; i++) {
      if (state[i] === id) return true;
    }

    return false;
  }
}

function libraryFilter() {
  // state (???????????? id ?????????? (data-id)) - ?????????? ???????????????????? ???????????????????? ???? ?????????????? ?????????????????? ?????????? ??????????????
  let state = [];

  // ?????????????????? ?????????? ???? ????????/???????????? (?????????????????????????? ???? window)
  $(window).on("click", (event) => {
    if (
      $(event.target).closest("[data-type=js-library-filter-tag]").length !== 0
    ) {
      const tag = $(event.target).closest("[data-type=js-library-filter-tag]");
      const tag_id = tag.data("id");

      if (inState(tag_id)) {
        state = state.filter((id) => id !== tag_id);

        $(`[data-type=js-library-filter-tag][data-id="${tag_id}"]`).removeClass(
          "team-filter__item--active"
        );
      } else {
        state.push(tag_id);

        $(`[data-type=js-library-filter-tag][data-id="${tag_id}"]`).addClass(
          "team-filter__item--active"
        );
      }

      ajaxLib();
    } else if (
      $(event.target).closest("[data-type=js-library-filter-clear]").length !==
      0
    ) {
      state = [];

      $("[data-type=js-library-filter-tag]").removeClass(
        "team-filter__item--active"
      );

      ajaxLib();
    }
  });

  // ???????????????? state -> ??????????????????, ???????????????????? labraryList
  function ajaxLib() {
    let libraryList = $("[data-type=js-library-list]");

    $.ajax({
      method: "POST",
      url: window.location.href,
      data: {
        ajax: 1,
        tags: state,
      },
    }).done(function (a) {
      libraryList.html(a);
    });
  }

  // ????????????????: id ?? state?
  function inState(id) {
    for (let i = 0; i < state.length; i++) {
      if (state[i] === id) return true;
    }

    return false;
  }
}

function bafFilter() {
  // console.log("bafFilter");
  $("[data-type=js-baf-filter-tag]").on("click", function (e) {
    e.preventDefault();
    // console.log("bafFilter click tag");
    $(this).toggleClass("team-filter__item--active");

    ajaxbafList();
  });

  $("[data-type=js-baf-filter-clear]").on("click", function (e) {
    // console.log("bafFilter click tag");
    e.preventDefault();

    $("[data-type=js-baf-filter-tag]").each(function () {
      if ($(this).hasClass("team-filter__item--active")) {
        $(this).removeClass("team-filter__item--active");
      }
    });

    ajaxbafList();
  });

  function ajaxbafList() {
    // console.log("bafFilter ajax");
    let tags = [],
      bafList = $("[data-type=js-baf-list]");

    $("[data-type=js-baf-filter-tag]").each(function () {
      if ($(this).hasClass("team-filter__item--active")) {
        tags[tags.length] = $(this).attr("data-id");
      }
    });

    // console.log(tags);

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

function faqFilter() {
  // console.log("faqFilter");
  $("[data-type=js-faq-filter-tag]").on("click", function (e) {
    e.preventDefault();
    // console.log("faqFilter click tag");
    $(this).toggleClass("team-filter__item--active");

    ajaxfaqList();
  });

  $("[data-type=js-faq-filter-clear]").on("click", function (e) {
    // console.log("faqFilter click tag");
    e.preventDefault();

    $("[data-type=js-faq-filter-tag]").each(function () {
      if ($(this).hasClass("team-filter__item--active")) {
        $(this).removeClass("team-filter__item--active");
      }
    });

    ajaxfaqList();
  });

  function ajaxfaqList() {
    // console.log("faqFilter ajax");
    let tags = [],
      faqList = $("[data-type=js-faq-list]");

    $("[data-type=js-faq-filter-tag]").each(function () {
      if ($(this).hasClass("team-filter__item--active")) {
        tags[tags.length] = $(this).attr("data-id");
      }
    });

    // console.log(tags);

    $.ajax({
      method: "POST",
      url: window.location.href,
      data: {
        ajax: 1,
        tags: tags,
      },
    }).done(function (a) {
      faqList.html(a);
    });
  }
}

function publicFilter() {
  // state (???????????? id ?????????? (data-id)) - ?????????? ???????????????????? ???????????????????? ???? ?????????????? ?????????????????? ?????????? ??????????????
  let state = [],
    state2 = [];

  // ?????????????????? ?????????? ???? ????????/???????????? (?????????????????????????? ???? window)
  $(window).on("click", (event) => {
    if (
      $(event.target).closest("[data-type=js-public-filter-tag]").length !== 0
    ) {
      const tag = $(event.target).closest("[data-type=js-public-filter-tag]");
      const tag_id = tag.data("id");

      if (inState(tag_id)) {
        state = state.filter((id) => id !== tag_id);

        $(`[data-type=js-public-filter-tag][data-id="${tag_id}"]`).removeClass(
          "team-filter__item--active"
        );
      } else {
        state.push(tag_id);

        $(`[data-type=js-public-filter-tag][data-id="${tag_id}"]`).addClass(
          "team-filter__item--active"
        );
      }

      ajaxLib();
    } else if (
      $(event.target).closest("[data-type=js-public-filter-clear]").length !== 0
    ) {
      state = [];

      $("[data-type=js-public-filter-tag]").removeClass(
        "team-filter__item--active"
      );

      ajaxLib();
    }
  });

  $(window).on("click", (event) => {
    if (
      $(event.target).closest("[data-type=js-public-filter-authors]").length !== 0
    ) {
      const tag = $(event.target).closest("[data-type=js-public-filter-authors]");
      let tag_id = tag.data("id"),
        key = tag.data("key");

      state2 = [];

      $("[data-type=js-public-filter-authors]").removeClass(
        "articles-authors__item--active"
      );

      if (tag_id) {
        tag_id = JSON.parse(tag_id);
        // console.log(tag_id);
      }

      // console.log(tag_id);

      if (inState(tag_id)) {
        state2 = state2.filter((id) => id !== tag_id);

        $(`[data-type=js-public-filter-authors][data-key="${key}"]`).removeClass(
          "articles-authors__item--active"
        );
      } else {
        state2.push(tag_id);

        $(`[data-type=js-public-filter-authors][data-key="${key}"]`).addClass(
          "articles-authors__item--active"
        );
      }

      ajaxLib();
    } else if (
      $(event.target).closest("[data-type=js-public-filter-clear]").length !== 0
    ) {
      state2 = [];

      $("[data-type=js-public-filter-authors]").removeClass(
        "articles-authors__item--active"
      );

      ajaxLib();
    }
  });

  // ???????????????? state -> ??????????????????, ???????????????????? labraryList
  function ajaxLib() {
    let publicList = $("[data-type=js-public-list]");

    // console.log(state);
    // console.log(state2);

    $.ajax({
      method: "POST",
      url: window.location.href,
      data: {
        ajax: 1,
        tags: state,
        authors: state2

      },
    }).done(function (a) {
      publicList.html(a);
    });
  }

  // ????????????????: id ?? state?
  function inState(id) {
    for (let i = 0; i < state.length; i++) {
      if (state[i] === id) return true;
    }

    return false;
  }
}

function servSectionFilterTypes() {
  // console.log("services Section Filter Types");
  $("[data-type=js-sec-serv-filter-tag]").on("click", function (e) {
    e.preventDefault();
    $("[data-type=js-sec-serv-filter-tag]").each(function () {
      if ($(this).hasClass("development__names-item--active")) {
        $(this).removeClass("development__names-item--active");
      }
    });

    // console.log("click Section Filter Types");
    $(this).addClass("development__names-item--active");

    let tag = $(".development__names-item--active").html();

    $("[data-type=item-filter-serv-types]").each(function () {
      let tagItem = $(this).attr("data-tag");
      if (tag == tagItem) {
        $(this).css('display', 'block');
      } else {
        $(this).css('display', 'none');
      }
    });
  });
}
