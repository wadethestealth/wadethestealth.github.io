window.onload = () => {init();};

var prevScrollTop;
var currentHeaderPosition;

var header;

function init() {
    prevScrollTop = (window.pageYOffset || document.documentElement.scrollTop) <= 0 ? 0 : (window.pageYOffset || document.documentElement.scrollTop);

    header = document.getElementById("header");

    currentHeaderPosition = header.style.position;

    document.onscroll = (ev) => {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        toggleHeaderPosition(scrollTop <= 0 ? "relative" : "fixed");
        if (scrollTop > prevScrollTop){
            toggleHeader(false);
        } else {
            toggleHeader(true);
        }
        prevScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    toggleHeader(prevScrollTop <= 0 ? true : false);
    toggleHeaderPosition(prevScrollTop <= 0 ? "relative" : "fixed");
}

function toggleHeader(bool) {
    header.style.visibility = bool ? "visible" : "hidden";
}

function toggleHeaderPosition(position) {
    if (currentHeaderPosition != position) {
        header.style.position = position;
        currentHeaderPosition = position;
        if (position == "fixed") {
            header.style.marginTop = "8vh";
            header.style.boxShadow = "0px 1px 3px 0px #030313";
        } else {
            header.style.marginTop = "inherit";
            header.style.boxShadow = "none";
        }
    }
}