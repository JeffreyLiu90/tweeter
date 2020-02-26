
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = function(tweets) {
  for(let info of tweets) {
    const $tweet = createTweetElement(info)
    console.log(info)
}  
// }
//     $('#tweets-container').append($tweet); 





// }

let createTweetElement = function(tweeter) {
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
    <p>${content}</p>
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

console.log(renderTweets(data))