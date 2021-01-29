/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $(function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      .then((result) => {
        renderTweets(result);
      })
      .catch((err) => {
        console.log("ajax error caught");
        console.log(err);
      });

    $("form").on("submit", function (event) {
      event.preventDefault();
      const $newtweet = $(".tweet-text");

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $newtweet.serialize(),
        success: () => {
          $.ajax({
            url: "/tweets",
            method: "GET",
          }).then((result) => {
            renderTweets(result).catch((err) => {
              console.log("ajax error caught");
              console.log(err);
            });
          });
          // $('#tweet-text').val().trim() === ""
          $(".tweet-text").val("");
          $(".counter").html("140");
        },
      });
    });
  });

  function createTweetElement(tweetObj) {
    const $markup = `
    <article class="tweet-display">
    <header class='article-header'>
      <div class= "header-icon">
        <img src= ${tweetObj.user.avatars}>
      </div>
      <div class="legalName" >${tweetObj.user.name}</div>
      <div class= "userName">${tweetObj.user.handle}</div>
    </header>
    <body class= "article-body">
      <p class= "tweet-paragraph">${escape(tweetObj.content.text)}</p>
    </body>
    <footer class ="article-footer">${tweetObj.created_at}</footer>
  </article>
`;
    return $markup;
  }

  const renderTweets = function (tweets) {
    // loops through tweets
    const container = $("#tweet-container");
    for (const tweet of tweets) {
      let element = createTweetElement(tweet);
      container.prepend(element);
    }
  };
});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// $(document).ajaxSuccess(function(){
//   alert("Too may characters! please use 140 or less. save some space for others 🐤");
// });
// $("textarea").click(function(){
//   $("div").load("demo_ajax_load.txt");
// });
//working pop up but on clicking tweet button
