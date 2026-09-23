/* Homepage carousel. Navigation and common behaviours are in wute.js. */
(function () {
    'use strict';
    var slider = document.querySelector('.hero-slider');
    if (!slider) return;

    var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
    var previous = slider.querySelector('.slider-prev');
    var next = slider.querySelector('.slider-next');
    var counter = slider.querySelector('#slide-current');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var current = 0;
    var timer = null;
    var interacted = false;
    var pointerInside = false;
    var focusInside = false;

    function show(index) {
        slides[current].classList.remove('active');
        slides[current].setAttribute('inert', '');
        slides[current].setAttribute('aria-hidden', 'true');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        slides[current].removeAttribute('inert');
        slides[current].removeAttribute('aria-hidden');
        counter.textContent = String(current + 1).padStart(2, '0');
    }

    function stop() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    function start() {
        stop();
        if (interacted || pointerInside || focusInside || document.hidden || reducedMotion.matches) return;
        timer = setInterval(function () { show(current + 1); }, 7000);
    }

    function manual(delta) {
        interacted = true;
        stop();
        show(current + delta);
    }

    previous.addEventListener('click', function () { manual(-1); });
    next.addEventListener('click', function () { manual(1); });
    slider.addEventListener('mouseenter', function () { pointerInside = true; stop(); });
    slider.addEventListener('mouseleave', function () { pointerInside = false; start(); });
    slider.addEventListener('focusin', function () { focusInside = true; stop(); });
    slider.addEventListener('focusout', function (event) {
        if (slider.contains(event.relatedTarget)) return;
        focusInside = false;
        start();
    });
    slider.addEventListener('touchstart', stop, { passive: true });
    slider.addEventListener('touchend', start, { passive: true });
    slider.addEventListener('touchcancel', start, { passive: true });
    document.addEventListener('visibilitychange', start);
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', start);
    else reducedMotion.addListener(start);
    slider.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') { event.preventDefault(); manual(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); manual(1); }
    });

    /* 原版 Hero 视差的轻量版本：仅首屏可见且允许动态效果时更新图片。 */
    if (!reducedMotion.matches) {
        var frame = 0;
        function updateHeroDrift() {
            frame = 0;
            slider.style.setProperty('--hero-drift', Math.round(Math.min(window.scrollY, slider.offsetHeight) * -0.03) + 'px');
        }
        window.addEventListener('scroll', function () {
            if (window.scrollY > slider.offsetHeight || frame) return;
            frame = window.requestAnimationFrame(updateHeroDrift);
        }, { passive: true });
    }
    start();
})();
