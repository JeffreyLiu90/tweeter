/* moment.js
unix time stamp
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Handler for .ready() called.

  //   const $form = $(".form-inline");
  //   const $textarea = $("textarea").val();
  // $form.on("submit", event => {
  //   event.preventDefault()
  //   if($textarea === "") {
  //     alert("invalidDDD")
  //   } 
  //   $.ajax ({
  //   url: '/tweets',
  //   type: 'POST',
  //   data: $form.serialize()

  //   })
  // })




  //   const $form = $(".form-inline");
  //   const $textarea = $("textarea").val();
  // $form.on("submit", event => {
  //   event.preventDefault()
  //   if(isEntryValid($textarea)) {
  //     alert("invalidDDD")
  //   } else {
  //   $.ajax ({
  //   url: '/tweets',
  //   type: 'POST',
  //   data: $form.serialize()

  //   })
  // }})

  const $form = $(".form-inline");

  $form.on("submit", event => {
    event.preventDefault()


    const textarea = $(".new-tweet textarea").val();
    if (isEntryValid(textarea) === false) {
      alert("invalid entry")
    } else if (entryLength(textarea) === false) {
      alert("youre input is too long")
    } else {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: $form.serialize()

      })
    }
  })


  const entryLength = (entry) => {
    if (entry.length > 140) {
      return false
    } else {
      return true
    }
  }

  const isEntryValid = (entry) => {

    if (entry === "") {
      return false
    } else {

    return true
  };
  }

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      type: "GET",
      data: "JSON"
    })
      .then(data => {
        renderTweets(data)

      })
  }

  loadTweets()


  // const renderTweets = function (tweets) {
  //   for (let info of tweets) {
  //     $('#tweets-container').append(createTweetElement(info));
  //   }
  // }




  let createTweetElement = function (tweeter) {
    const { name, avatars, handle } = tweeter.user;
    const content = tweeter.content.text;
    const created = tweeter.created_at;
    // const days = Math.floor(created / (24 * 3600)) 


    return `<article class="tweets">
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


  // Test / driver code (temporary). Eventually will get this from the server.

  const renderTweets = function (tweets) {
    for (let info of tweets) {
      $('#tweets-container').append(createTweetElement(info));
    }
  }








});


