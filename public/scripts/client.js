/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
renderTweets(data);

});



function createTweetElement(tweetObj) {
  const $markup =
    `
    <article class="tweet-display">
    <header class='article-header'>
      <div class= "header-icon">
        <img src= ${tweetObj.user.avatars}>
      </div>
      <div class="legalName" >${tweetObj.user.name}</div>
      <div class= "userName">${tweetObj.user.handle}</div>
    </header>
    <body class= "article-body">
      <p class= "tweet-paragraph">${tweetObj.content.text}</p>
    </body>
    <footer class ="article-footer">${tweetObj.created_at}</footer>
  </article>
`;
  return $markup;
}

const renderTweets = function(tweets) {
// loops through tweets
console.log("I'm in  function renderTweets");
const container = $("#tweet-container");
console.log(container);
  for (const tweet of tweets) {
    console.log("building a tweet");
    let element = createTweetElement(tweet)
    container.prepend(element);
  }

}




  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  