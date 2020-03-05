$(document).ready(function() {
  // Escape function that prevents users from entering functions in their tweets
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to make sure the entry length is not more than than 140 characters
  const entryLength = entry => {
    if (entry.length > 140) {
      return false;
    } else {
      return true;
    }
  };

  //Function to make sure the user does not only type empty strings
  const isEntryValid = entry => {
    if (entry === "") {
      return false;
    } else {
      return true;
    }
  };
  //Function to convert the milliseconds to days
  const dayConverter = function(milliseconds) {
    let difference = new Date() - milliseconds;
    let minutes = Math.floor(difference / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);
    const date = { days, hours, minutes };
    return date;
  };

  //Function to create the tweets and insert into the article section of HTML
  const createTweetElement = function(tweeter) {
    const { name, avatars, handle } = tweeter.user;
    const content = tweeter.content.text;
    const created = dayConverter(tweeter.created_at);
    let { days } = created;
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
    <p class="tweet-wrapper"> ${escape(content)}</p>
  </body>
  <hr>
  <footer class="footer">
    <p>${days} days ago</p>
    <div>
      <ul>
        <li><i class="fas fa-flag"></i></li>
        <li><i class="fas fa-retweet"></i></li>
        <li><i class="fas fa-heart"></i></li>
      </ul>
    </div>
  </footer>
</article>`;
  };

  //Function to render tweets
  const renderTweets = function(tweets) {
    $("#tweetsection").empty();
    for (let info of tweets) {
      const messages = createTweetElement(info);
      $("#tweetsection").prepend(messages);
    }
  };
  //Function to get the tweets entered and load them onto the page
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      type: "GET",
      data: "JSON"
    }).then(data => {
      renderTweets(data);
    });
  };
  loadTweets();

  //Ajax function for when entering a tweet
  const $form = $(".form-inline");
  $form.on("submit", event => {
    event.preventDefault();
    const textarea = $(".new-tweet textarea").val();
    if (isEntryValid(textarea) === false) {
      //Make sure that the text is valid or not too long with above functions
      $(".alert h3").text("Not a valid Tweet");
      $(".alert").fadeIn("slow");
    } else if (entryLength(textarea) === false) {
      $(".alert h3").text("You have reached maximum allowed character count ");
      $(".alert").fadeIn("slow");
    } else {
      $.ajax({
        // If all pass, then AJAX post request and success function
        url: "/tweets",
        type: "POST",
        data: $form.serialize(),
        success: function() {
          $(".alert").fadeOut("slow");
          $(".form-inline").toggle("slow");
          $(".counter").text(140);
          loadTweets();
        }
      });
      $(".form-inline")[0].reset();
    }
  });

  //Click on the arrow to show text area
  $("#new-tweet-button").click(function() {
    $(".form-inline").toggle("slow");
    $(".alert").slideUp("slow");
  });

  //Click on the arrow to focus on the text area, showing the typing cursor
  $("#new-tweet-button").click(function() {
    $("textarea").focus();
  });

  //Scroll up button function, when scrolling down, the scroll up appears and tweet composer button fades out, and vice versa
  $(window).scroll(function() {
    if ($(this).scrollTop() > 250) {
      $("#topButton").fadeIn();
      $("#new-tweet-button").fadeOut("fast");
      $("#write-a-tweet").fadeOut("fast");
    } else {
      $("#topButton").fadeOut();
      $("#new-tweet-button").fadeIn("slow");
      $("#write-a-tweet").fadeIn("slow");
    }
  });

  //When clicked on scroll up, the text area appears
  $("#topButton").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 800);
    $(".form-inline").slideDown("slow");
    $("textarea").focus();
  });
});
