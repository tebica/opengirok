jQuery(document).ready(function() {
  //  Detect User State
  //  userState info - 0: not log in, 1: logged-in, 2: admin
  var userState;
  (function() {
    //  length info - 3: not log in, 4: logged-in
    var trg = jQuery("#tistorytoolbarid");
    userState = trg.find(".tt_menubar_logout").children(".tt_menubar_link_tit").text().length - 3;
    if (userState) {
      var check = location.href.split(".com")[0] + ".com";
      trg.find(".tt_menubar_myblog").find("li").children("a").each(function() {
        if (jQuery(this).attr("href") == check) {
          userState = 2;
          return false;
        }
      });
    }
  })();

  //  Adapt Nav Menu
  (function() {
    var trg = jQuery("#navigation .container").children("ul")[0];
    var list = [];
    jQuery(trg).children("li").each(function(i) {
      var trg = jQuery(this).children("a");
      var title = trg.text();
      var link = trg.attr("href");
      list[i] = [title, link];
    });

    jQuery(trg).addClass("nav navbar-nav navbar-collapse collapse");
    trg = jQuery("#sideNav");
    if (list.length == 0) {
      trg.remove();
    } else {
      trg = trg.children(".list-group");
      for (var i = 0; i < list.length; i++) {
        trg.append("<a class='list-group-item' href='" + list[i][1] + "'>" + list[i][0] + "</a>")
      }
    }

  })();

  //  Adapt Tag
  (function() {
    jQuery(".article-tag a").wrapInner("<span class='label label-default'></span>");
  })();

  //  Nav Menu Panel Responsive
  //  This block must be after "Detect User State"
  (function() {
    var trg = jQuery("#navigation");
    switch (userState) {
      case 2:
        trg.find("li.navigation-admin").show();
      case 1:
        trg.find("li.navigation-login").show();
        trg.find("li.navigation-guest").hide();
        break;
    }
  })();

  //  Show logged-in alrert in reply form
  //  This block must be after "Detect User State"
  (function() {
    if (userState) {
      jQuery("#main").addClass('logged-in');
      //jQuery(".rpForm-loggedIn").show();
    }
  })();

  //  Article Admin Panel
  (function() {
    var trg = jQuery(".article-admPanel-state");
    if (!trg.length) {
      return
    }
    //  length info - 2: publish, 3: private
    var nowState = 3 - trg.attr("data-state").length;
    if (nowState) {
      trg.attr("title", "Switch to Private").addClass("text-success");
    } else {
      trg.attr("title", "Switch to Publish").addClass("text-warning");
    }
  })();

  //  Glyphicon Tooltip
  (function() {
    jQuery(".glyphicon-link").parent().attr("data-toggle", "tooltip").attr("data-placement", "top").attr("title", "Link");
    jQuery(".glyphicon-comment").parent().attr("data-toggle", "tooltip").attr("data-placement", "top").attr("title", "Comment");
    jQuery(".glyphicon-remove").parent().attr("data-toggle", "tooltip").attr("data-placement", "top").attr("title", "Remove");
  })();

  //  Fill Side Off
  (function() {
    jQuery("#sidebar").children(".panel").clone().appendTo("#sideOff");
  })();

  //  Panel Adjust
  //  This block must be after "Fill Side Off"
  (function() {
    jQuery("#sidebar .row").children(".panel").addClass("hidden-xs");
    jQuery("#sidebar .row").children(".panel").addClass("col-sm-12");
    jQuery("#sidebar .row").children(".module_plugin").addClass("col-xs-4 col-sm-12");
  })();

  //  Toggle Side Off
  (function() {
    jQuery("#btnToggleSideOff").click(function() {
      var trg = jQuery("#sideOff");
      if (trg.is(":visible")) {
        trg.animate({
          width: 'toggle'
        }, 300);
        jQuery("#blackCover").fadeOut(300);
      } else {
        trg.animate({
          width: 'toggle'
        }, 300);
        jQuery("#blackCover").fadeIn(300);
      }
    });
  })();


  //  Inint BS JS Components
  //  BS Tooltip
  //  This block must be after all tooltip setting is done
  jQuery("[data-toggle='tooltip']").tooltip();
});

// Booti Edition
jQuery(document).ready(function() {
  if ((!document.getElementById("ttGnb")) && (document.getElementById("ttCanvas"))) {
    var item = function(title, link, img, ctt, date) {
      this.title = title;
      this.link = link;
      this.img = img;
      this.ctt = ctt;
      this.date = date;
    };
    var tbt = jQuery("#ttCanvas").find(".tbt");
    var items = [];
    var listTitle = [];
    tbt.each(function(i) {
      items[i] = [];

      var listT = jQuery(this).find("tt-item-title");
      if (listT.is(":visible")) listTitle[i] = listT.text();
      else listTitle[i] = undefined;

      jQuery(this).children("ul").children("li").each(function(j) {
        var it = jQuery(this);
        var title = it.find(".tt-post-title").text();
        var link = it.find(".tt-post-title").children("a").attr("href");
        var img = it.find("img").attr("src");
        var ctt = it.find(".tt-post-summary").text();
        var date = it.find(".tt-post-date").text();
        items[i][j] = new item(title, link, img, ctt, date);
      });
    });

    function itemHtml(item) {
      var html =
        "<div class='col-sm-6 col-md-4'>" +
        "<div class='thumbnail'>" +
        "<img src='" + item.img + "'>" +
        "<div class='caption'>" +
        "<a href='" + item.link + "'>" +
        "<h3>" + item.title + "</h3>" +
        "</a>" +
        "<p>" + item.ctt + "</p>" +
        "<p>" + item.date + "</p>" +
        "</div></div></div>";
      return html;
    }

    jQuery("#ttCanvas").parent().html("<div id='tbtCanvas'>");
    var head = jQuery("#tbtCanvas");
    head.css("margin-top", "40px");

    for (var i = 0; i < items.length; i++) {
      if (listTitle[i])
        head.append("<div class='page-header'>" +
          listTitle[i] + "</div>");

      for (var j = 0; j < items[i].length; j++)
        head.append(itemHtml(items[i][j]));
    }

    function equalHeight(group) {
      var tallest = 0;
      group.each(function() {
        var thisHeight = $(this).height();
        if (thisHeight > tallest) tallest = thisHeight;
      });
      group.each(function() {
        $(this).height(tallest);
      });
    }

    equalHeight($("#tbtCanvas .thumbnail img"));
  }
});