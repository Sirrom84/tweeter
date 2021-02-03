//  jQuery is already loaded

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
          $(".tweet-text").val("");
          $(".counter").html("140");
        },
      });
    });

    $("#new-tweet-button").click(function (event) {
      if ($(".new-tweet").is(":visible")) {
        $(".new-tweet").slideUp();
      } else {
        $(".new-tweet").slideDown();
      }
    });
  });

  function createTweetElement(tweetObj) {
    const time = new Date(tweetObj.created_at);
    const currentTime = Date.now();
    const dayDif = Math.floor((currentTime - time) / 1000 / 60 / 60 / 24);
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
    <footer class ="article-footer">${dayDif + " days ago"}
    <div class = "footerIcons"> <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    
    </article>
`;
    return $markup;
  }

  const renderTweets = function (tweets) {
    const container = $("#tweet-container").empty();
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
