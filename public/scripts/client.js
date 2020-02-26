/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let createTweetElement = (tweeter) => {
  const {name, avatars, handle} = tweeter.user;
  const content = tweeter.content.text;
  const created = tweeter.created_at;
  return  `<article class="tweets">
  <header class="tweetHeader1">
    <div class="articleHead">
      <img class="minilogo" src=${avatars} alt="">
      <p> ${name}</p>
    </div>
    <div class="tweeter-handle">
      <p>${handle}</p>
    </div>
  </header>
  <body>
    <p>${content}/p>
  </body>
  <hr>
  <footer class="footer">
    <p>${created}</p>
    <div>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  </footer>
</article>`
}


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


