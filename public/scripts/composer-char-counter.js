$(document).ready(function () {
  console.log(" loading your jQuery!");
  $(".tweet-text").on("input ", function () {
    let charLength = $("textarea.tweet-text").val().length;
    $(".counter").text(140 - charLength);
    if (charLength > 140) {
      $(".counter").removeClass(".black").addClass("red").slideDown(400);
      $("#error").removeClass("error").addClass("error-show");
    } else {
      $(".counter").removeClass("red").addClass(".black");
      $("#error").removeClass("error-show");
      $("#error").addClass("error");
    }
  });
});
