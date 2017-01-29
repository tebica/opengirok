//  This dsScriptArticle for BooTistrap
//  somnus950301@gmail.com
//  http://devsomnus.tistory.com

jQuery(document).ready(function () {
  var article = jQuery(".article-content");

  //  Addapt imgage to responisve
  //  15.01.08
  article.find("span.imageblock").css("width", "").find("img").not("[src^='http://i1']").addClass("img-responsive");
  
  
  //  Revise hesh
  //  15.01.08
  $(window).on("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 100);
  });
  
});