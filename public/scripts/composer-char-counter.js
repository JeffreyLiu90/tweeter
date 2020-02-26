

$(document).ready(function () {
  const $form = $(".new-tweet textarea");
  $form.on('input', function () {
    let inputLength = this.value.length
    $(this).parent().find(".counter").text(140 - inputLength)

    const total = $(this).parent().find(".counter").text()


    if (total >= 0) {
      $(this).parent().find(".counter").text(total).css("color", "black")
    } else {
      $(this).parent().find(".counter").text(total).css("color", "red")
    }
  }
  )
});

