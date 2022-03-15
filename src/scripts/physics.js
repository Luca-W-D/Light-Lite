$( () => {
    // hey zach
    // hi luca
    // $("input").change( function() {
    //     console.log($("input").val())
    //     setRotation($("input").val())
    // })

    $('input[name="object-permitivity"]').on('change', function() {
      setRotation($("input[type='range']").val(), $("input[name='object-permitivity']:checked").val())
      $("#refractive-index").html($("input[name='object-permitivity']:checked").val())
    });
    $(document).on('input', '.slider input', function() {
      setRotation($("input[type='range']").val(), $("input[name='object-permitivity']:checked").val())
    });
});



// Value: float from -1 to 1. 1 is above, -1 is below
// Comes from HTML as -100 ==> 100
function setRotation(raw_value, obj_permitivity) {
    var value = getOutputAngle(1, obj_permitivity, parseInt($("input").val())) / 100
    var boundUpper = 20 // (lower bound ==> 20deg)
    var boundLower = -20 // (upper bound ==> 20deg)
    var chosen_value = value * (boundUpper + Math.abs(boundLower)) / 2;
    $(".rotatable").css("transform", `translateX(-50%) translateY(-50%) rotate(${chosen_value}deg)`)
    $(".light-beam-right").css("top", ($(".site-container").height() / 2) + (value * (290 / 2)))
    $(".light-beam-right").css("transform", `translateX(calc(-50% + 200px)) translateY(-50%) rotate(${raw_value}deg)`)
    $(".light-beam-left").css("transform", `translateX(calc(50% - 200px)) translateY(-50%) rotate(${raw_value}deg)`)

}

function getOutputAngle(outPermit, inPermit, inTheta) {
    return Math.asin(Math.sin((inTheta/180 * Math.PI) * outPermit / inPermit)) * 180 / Math.PI
}
