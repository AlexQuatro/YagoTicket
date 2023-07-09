(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function formQuantity() {
        document.addEventListener("click", (function(e) {
            let targetElement = e.target;
            if (targetElement.closest("[data-quantity-plus]") || targetElement.closest("[data-quantity-minus]")) {
                const valueElement = targetElement.closest("[data-quantity]").querySelector("[data-quantity-value]");
                let value = parseInt(valueElement.value);
                if (targetElement.hasAttribute("data-quantity-plus")) {
                    value++;
                    if (+valueElement.dataset.quantityMax && +valueElement.dataset.quantityMax < value) value = valueElement.dataset.quantityMax;
                } else {
                    --value;
                    if (+valueElement.dataset.quantityMin) {
                        if (+valueElement.dataset.quantityMin > value) value = valueElement.dataset.quantityMin;
                    } else if (value < 1) value = 1;
                }
                targetElement.closest("[data-quantity]").querySelector("[data-quantity-value]").value = value;
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const lists = document.querySelectorAll(".footer__list");
    const titles = document.querySelectorAll(".footer__open");
    function checkScreenSize() {
        if (window.innerWidth < 767.98) lists.forEach((list => {
            list.style.display = "none";
        })); else lists.forEach((list => {
            list.style.display = "block";
        }));
    }
    function closeAllLists() {
        lists.forEach((list => {
            list.style.display = "none";
        }));
    }
    window.addEventListener("load", checkScreenSize);
    window.addEventListener("resize", checkScreenSize);
    titles.forEach((title => {
        title.addEventListener("click", (function() {
            const list = this.nextElementSibling;
            if (window.innerWidth < 767.98) if (list.style.display === "none") {
                closeAllLists();
                list.style.display = "block";
            } else list.style.display = "none";
        }));
    }));
    document.addEventListener("click", (function(event) {
        const target = event.target;
        const isTitle = Array.from(titles).some((title => title.contains(target)));
        const isList = Array.from(lists).some((list => list.contains(target)));
        if (window.innerWidth < 767.98) if (!isTitle && !isList) closeAllLists();
    }));
    var accordions = document.getElementsByClassName("answertabs__accordion");
    var panels = document.getElementsByClassName("answertabs__panel");
    for (var i = 0; i < accordions.length; i++) accordions[i].addEventListener("click", (function() {
        var panel = this.nextElementSibling;
        var isActive = panel.style.display === "block";
        for (var j = 0; j < panels.length; j++) {
            panels[j].style.display = "none";
            accordions[j].classList.remove("active");
        }
        if (!isActive) {
            panel.style.display = "block";
            this.classList.add("active");
        }
    }));
    window["FLS"] = true;
    isWebp();
    menuInit();
    formQuantity();
})();