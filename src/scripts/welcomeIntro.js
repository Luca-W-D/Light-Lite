$( () => {
    // Toggle for development purposes
    var dev = true;
    if(dev)
        $(".welcome-overlay").toggle();
    else
        handleIntro();
});

function handleIntro() {
    $(".intro").fadeIn().delay(3000).fadeOut()
    $(".warning").delay(3400).fadeIn().delay(3000).fadeOut()
    $(".info").delay(6800).fadeIn().delay(3000).fadeOut()
    $(".welcome-overlay").delay(10200).fadeOut()
}