/* moment.js
unix time stamp
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  


  const $form = $(".form-inline");

  $form.on("submit", event => {
    event.preventDefault()

  

    const textarea = $(".new-tweet textarea").val();
    if (isEntryValid(textarea) === false) {
  
      $(".alert span").text("invalid entry").slideDown('slow')

    } else if (entryLength(textarea) === false) {
      $(".alert span").text("You've reached maximum allowed character count ").slideDown('slow')
    } else {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: $form.serialize(),
        success: function() {
          $(".alert span").slideUp("slow")
          loadTweets()
      }

      })
      $(".form-inline")[0].reset();
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
    <p>${escape(content)}</p>
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
    $('#tweetsection').empty();
    for (let info of tweets) {
      const messages = createTweetElement(info)
      $('#tweetsection').prepend(messages);
    }
  
  
}

$( "#new-tweet-button" ).click(function() {
  $( ".form-inline" ).slideToggle( "slow" );
});

$( "#new-tweet-button").click(function() {
  $( "textarea" ).focus();
});

$( "#new-tweet-button" ).click(function() {
 slideDown( "slow" );
});
 


});


