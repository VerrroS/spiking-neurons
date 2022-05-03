
function displayElement(param,...args) {
    Array.from(args).forEach(element => {
        if (param == "none"){
            if (element.classList.contains("active")){
                element.classList.remove("active");
            }
        }
        else if (param == "block"){
            if (!element.classList.contains("active")){
                element.classList.add("active");
            }
        }
        else if (param == "toggle"){
            element.classList.toggle("active");
        }
    });
}


function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}


function openHelper(e) {
    console.log(this.dataset.key);
    key = this.dataset.key;
    helper = document.getElementById(key);
    displayElement("toggle",helper);
}
