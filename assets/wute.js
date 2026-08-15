/* ==========================================================================
   WUTE 官网 — 共享交互 wute.js
   依赖：GSAP + ScrollTrigger（页面需先加载 CDN 脚本）
   职责：导航滚动态 / 汉堡菜单 / 白底区导航反色 / 回到顶部按钮 / 通用滚动显现动画
   ========================================================================== */
(function () {
    'use strict';

    /* ---- 回到顶部按钮（动态注入） ---- */
    (function initToTop() {
        var btn = document.createElement('button');
        btn.className = 'to-top';
        btn.setAttribute('aria-label', '回到顶部');
        btn.innerHTML = '&uarr;';
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(btn);
        var onScroll = function () {
            btn.classList.toggle('show', window.scrollY > 600);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    })();

    /* ---- 导航栏：滚动后毛玻璃 ---- */
    var nav = document.querySelector('.site-nav');
    if (nav) {
        var onScroll = function () {
            nav.classList.toggle('scrolled', window.scrollY > 10);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---- 汉堡菜单（移动端全屏菜单） ---- */
    var burger = document.getElementById('hamburger');
    var links = document.querySelector('.nav-links');
    if (burger && links) {
        burger.addEventListener('click', function () {
            var open = links.classList.toggle('open');
            burger.classList.toggle('open', open);
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.style.overflow = open ? 'hidden' : '';
        });
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                links.classList.remove('open');
                burger.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---- 白底赞助商区：导航切换深色（赞助商页等） ---- */
    var sponsors = document.getElementById('sponsors');
    if (sponsors && nav && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            nav.classList.toggle('light-mode', entries[0].isIntersecting);
        }, { rootMargin: '-72px 0px -50% 0px' }).observe(sponsors);
    }

    /* ---- 通用滚动显现动画（.reveal） ---- */
    function initReveal() {
        if (!window.gsap || !window.ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);
        var items = gsap.utils.toArray('.reveal');
        if (!items.length) return;

        // 尊重系统"减少动态效果"偏好
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.set(items, { clearProps: 'all' });
            return;
        }

        items.forEach(function (el, i) {
            gsap.fromTo(el,
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: (i % 8) * 0.06,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });

        window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }

    /* ---- 彩蛋触发：Konami 秘技 / 连按 W / 页脚 logo 连点 ---- */
    (function initEasterEgg() {
        var konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        var konamiIdx = 0;
        var wPresses = [], logoClicks = [], opening = false;

        function openGame() {
            if (opening) return;
            opening = true;
            if (window.WUTEGame) { WUTEGame.open(); opening = false; return; }
            var s = document.createElement('script');
            s.src = 'assets/wute-game.js';
            if (location.pathname.indexOf('/groups/') >= 0 || location.pathname.indexOf('/sponsors/') >= 0) {
                s.src = '../' + s.src;
            }
            s.onload = function () { if (window.WUTEGame) WUTEGame.open(); opening = false; };
            s.onerror = function () { opening = false; };
            document.head.appendChild(s);
        }

        document.addEventListener('keydown', function (e) {
            var tag = e.target && e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') { konamiIdx = 0; return; }
            var k = e.key;
            if (k === 'Escape' || e.ctrlKey || e.metaKey || e.altKey) return;
            // 连按 W（2 秒内 5 次）
            if ((k || '').toLowerCase() === 'w') {
                wPresses.push(Date.now());
                wPresses = wPresses.filter(function (t) { return Date.now() - t <= 2000; });
                if (wPresses.length >= 5) { wPresses = []; openGame(); return; }
            }
            // Konami 序列
            if (k === konami[konamiIdx]) {
                konamiIdx++;
                if (konamiIdx === konami.length) { konamiIdx = 0; openGame(); }
            } else {
                konamiIdx = (k === konami[0]) ? 1 : 0;
            }
        });

        document.addEventListener('click', function (e) {
            var t = e.target;
            if (t && t.tagName === 'IMG' && t.closest('.footer-brand')) {
                logoClicks.push(Date.now());
                logoClicks = logoClicks.filter(function (x) { return Date.now() - x <= 2000; });
                if (logoClicks.length >= 5) { logoClicks = []; openGame(); }
            }
        });
    })();
})();
