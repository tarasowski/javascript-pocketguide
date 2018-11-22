"use strict";

(function () {

    // Enable JS strict mode
    "use strict";

    if (!("querySelector" in document && "addEventListener" in window && "classList" in document.createElement("p"))) {
        return;
    }

    window.document.documentElement.className += " enhanced";

    var nav = document.querySelector(".nav-site");
    var toggle = document.createElement("button");
    toggle.classList.add("nav--toggle");
    toggle.appendChild(document.createTextNode("Menu"));

    nav.insertBefore(toggle, nav.children[0]);

    toggle.addEventListener("click", function () {
        if (nav.classList.contains("is-expanded")) {
            toggle.setAttribute("aria-expanded", "false");
            nav.classList.remove("is-expanded");
            nav.classList.add("is-collapsed");
        } else {
            toggle.setAttribute("aria-expanded", "true");
            nav.classList.remove("is-collapsed");
            nav.classList.add("is-expanded");
        }
        return false;
    });

    toggle.setAttribute("aria-expanded", "false");
    nav.classList.add("is-collapsed");
})();