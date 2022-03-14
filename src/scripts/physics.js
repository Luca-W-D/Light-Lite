$( () => {
    // hey zach
    // $("input").change( function() {
    //     console.log($("input").val())
    //     setRotation($("input").val())
    // })

    $(document).on('input', 'input', function() {
        setRotation($("input").val())
        console.log($("input").val())
    });
})


// Value: float from -1 to 1. 1 is above, -1 is below
// Comes from HTML as -100 ==> 100
function setRotation(raw_value) {
    var value = raw_value / 100
    var boundUpper = 20 // (lower bound ==> 20deg)
    var boundLower = -20 // (upper bound ==> 20deg)
    var chosen_value = value * (boundUpper + Math.abs(boundLower)) / 2;
    $(".rotatable").css("transform", `translateX(-50%) translateY(-50%) rotate(${chosen_value}deg)`)
    $(".light-beam-right").css("top", ($(".site-container").height() / 2) + (value * (290 / 2)))
}