$(document).ready(function () {
  console.log(" loading ... your jQuerry sir !.");
  $(".tweet-text").on("input ", function () {
    let myLength = $(".tweet-text").val().length;
    $(".counter").text(140 - myLength);
    if (myLength > 140) {
      $(".counter").removeClass("black").addClass("red");
    } else {
      $(".counter").removeClass("red").addClass("black");
    }
  });
});