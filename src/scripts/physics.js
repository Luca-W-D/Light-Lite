var chosen_permitivity, chosen_offset, ableToWarn = true

$(() => {
  // hey zach
  // hi luca
  // hyd homie

  $('input[name="object-permitivity"]').on('change', function () {
    setRotation($("input[type='range']").val(), $("input[name='object-permitivity']:checked").val())
    $("#refractive-index").html($("input[name='object-permitivity']:checked").val())
  });
  $(document).on('input', '.slider input', function () {
    setRotation($("input[type='range']").val(), $("input[name='object-permitivity']:checked").val())
  });
  setRandomTarget()
});



// Value: float from -1 to 1. 1 is above, -1 is below
// Comes from HTML as -100 ==> 100
function setRotation(raw_value, obj_permitivity) {
  var value = getOutputAngle(1, obj_permitivity, parseInt($("input").val())) / 100
  var boundUpper = 20 // (lower bound ==> 20deg)
  var boundLower = -20 // (upper bound ==> 20deg)
  var chosen_value = value * (boundUpper + Math.abs(boundLower)) / 2;
  var verticalOffset = getVerticalOffset(value)
  $(".rotatable").css("transform", `translateX(-50%) translateY(-50%) rotate(${chosen_value}deg)`)
  $(".light-beam-right:not(.target)").css("top", verticalOffset)
  $(".light-beam-right:not(.target)").css("transform", `translateX(calc(-50% + 200px)) translateY(-50%) rotate(${raw_value}deg)`)
  $(".light-beam-left:not(.target)").css("transform", `translateX(calc(50% - 200px)) translateY(-50%) rotate(${raw_value}deg)`)
  if (chosen_permitivity == obj_permitivity) {
    if (Math.abs(chosen_offset - verticalOffset) < 5)
      setRandomTarget()
  } else {
    if (Math.abs(chosen_offset - verticalOffset) < 5)
      if (ableToWarn)
        warn("Careful -- wrong permitivity!")
  }
}

function getVerticalOffset(value) {
  return ($(".site-container").height() / 2) + (value * (290 / 2))
}

function setRandomTarget() {
  var possible_permitivities = [
    1.33,
    1.50,
    2.42,
    3.50,
    4.10
  ]
  var boundUpper = 20 // (lower bound ==> 20deg)
  var boundLower = -20 // (upper bound ==> 20deg)
  var object_perimitivity = possible_permitivities[Math.floor(Math.random() * possible_permitivities.length)]
  var raw_value = -60 + Math.random() * 120;
  var value = getOutputAngle(1, object_perimitivity, parseInt(raw_value) / 100)
  var verticalOffset = getVerticalOffset(value)
  chosen_permitivity = object_perimitivity
  chosen_offset = verticalOffset
  $(".light-beam-right.target").css("top", verticalOffset)
  $(".light-beam-right.target").css("transform", `translateX(calc(-50% + 200px)) translateY(-50%) rotate(${raw_value}deg)`)
}

function getOutputAngle(outPermit, inPermit, inTheta) {
  return Math.asin(Math.sin((inTheta / 180 * Math.PI) * outPermit / inPermit)) * 180 / Math.PI
}

function warn(text) {
  ableToWarn = false;
  $("#warn").text(text)
  $("#warn-container").fadeIn(250).delay(2000).fadeOut(250, () => {
    ableToWarn = true
  });
}