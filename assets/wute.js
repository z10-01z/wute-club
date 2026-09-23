/* ==========================================================================
   WUTE 官网 — 共享交互 wute.js
   职责：导航、菜单、回到顶部、图片灯箱和彩蛋
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
            var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
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
        function setMenuOpen(open, returnFocus) {
            links.classList.toggle('open', open);
            burger.classList.toggle('open', open);
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
            burger.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
            document.body.style.overflow = open ? 'hidden' : '';
            if (open) links.querySelector('a').focus();
            if (!open && returnFocus) burger.focus();
        }
        burger.addEventListener('click', function () {
            setMenuOpen(!links.classList.contains('open'), false);
        });
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                if (links.classList.contains('open')) setMenuOpen(false, false);
            });
        });
        document.addEventListener('keydown', function (e) {
            if (!links.classList.contains('open')) return;
            if (e.key === 'Escape') { setMenuOpen(false, true); return; }
            if (e.key !== 'Tab') return;
            var items = Array.prototype.slice.call(links.querySelectorAll('a')).concat(burger);
            var first = items[0], last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth > 1024 && links.classList.contains('open')) setMenuOpen(false, false);
        });
    }

    /* ---- 下拉菜单：链接负责导航，独立按钮负责展开 ---- */
    document.querySelectorAll('.nav-drop > .nav-drop-toggle').forEach(function (link, index) {
        var button = document.createElement('button');
        var menu = link.parentElement.querySelector('.drop-menu');
        menu.id = menu.id || 'nav-drop-menu-' + index;
        button.type = 'button';
        button.className = 'nav-drop-button';
        button.dataset.menuName = link.textContent.trim();
        button.setAttribute('aria-label', '展开' + button.dataset.menuName + '菜单');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', menu.id);
        button.textContent = '▾';
        link.insertAdjacentElement('afterend', button);
    });
    function closeDropdowns() {
        document.querySelectorAll('.nav-drop.open').forEach(function (item) {
            item.classList.remove('open');
            var button = item.querySelector('.nav-drop-button');
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', '展开' + button.dataset.menuName + '菜单');
        });
    }
    document.addEventListener('click', function (e) {
        var toggle = e.target.closest ? e.target.closest('.nav-drop-button') : null;
        if (toggle) {
            var li = toggle.parentElement;
            var wasOpen = li.classList.contains('open');
            closeDropdowns();
            if (!wasOpen) {
                li.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
                toggle.setAttribute('aria-label', '收起' + toggle.dataset.menuName + '菜单');
            }
            return;
        }
        if (!e.target.closest || !e.target.closest('.nav-drop')) closeDropdowns();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var openToggle = document.querySelector('.nav-drop.open .nav-drop-button');
            closeDropdowns();
            if (openToggle) openToggle.focus();
        }
    });

    /* ---- 卡片图片点击放大（灯箱，动态创建，全站生效） ---- */
    (function initLightbox() {
        var lb = null;
        var returnFocus = null;
        document.querySelectorAll('.card-img-top').forEach(function (img) {
            img.tabIndex = 0;
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', '放大图片：' + (img.alt || '图片'));
        });
        function closeLb() {
            if (!lb) return;
            lb.classList.remove('on');
            if (returnFocus) returnFocus.focus();
        }
        function getLb() {
            if (lb) return lb;
            lb = document.createElement('div');
            lb.className = 'lightbox';
            lb.innerHTML = '<button class="x" aria-label="关闭">&times;</button><img alt="" src="">';
            lb.addEventListener('click', function (e) {
                if (e.target === lb) closeLb();
            });
            lb.querySelector('.x').addEventListener('click', closeLb);
            document.body.appendChild(lb);
            return lb;
        }
        document.addEventListener('click', function (e) {
            var t = e.target;
            if (t && t.classList && t.classList.contains('card-img-top')) {
                returnFocus = t;
                var box = getLb();
                box.querySelector('img').src = t.src;
                box.classList.add('on');
                box.querySelector('.x').focus();
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.code === 'Escape' && lb && lb.classList.contains('on')) closeLb();
            if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('card-img-top')) {
                e.preventDefault();
                e.target.click();
            }
            if (e.key === 'Tab' && lb && lb.classList.contains('on')) {
                e.preventDefault();
                lb.querySelector('.x').focus();
            }
        });
    })();

    /* ---- 彩蛋触发：Konami 秘技 / 连按 W / 页脚 logo 连点 ---- */
    (function initEasterEgg() {
        // 用 e.code 匹配（不受输入法 / 大小写影响）：结尾严格 BA 顺序
        var konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
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
            if (e.repeat) return; // 忽略长按重复，防止序列错位
            var tag = e.target && e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') { konamiIdx = 0; return; }
            var code = e.code;
            var key = (e.key || '').toLowerCase();
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            // 连按 W（2 秒内 5 次）
            if (code === 'KeyW') {
                wPresses.push(Date.now());
                wPresses = wPresses.filter(function (t) { return Date.now() - t <= 2000; });
                if (wPresses.length >= 5) { wPresses = []; openGame(); return; }
            }
            // Konami 序列：e.code 与 e.key 双通道匹配（兼容输入法/键盘布局）
            var expect = konami[konamiIdx];
            var hit;
            if (expect === 'KeyB' || expect === 'KeyA') {
                hit = code === expect || key === expect.toLowerCase().replace('key', '');
            } else {
                hit = code === expect || key === expect.toLowerCase();
            }
            if (hit) {
                konamiIdx++;
                if (konamiIdx === konami.length) { konamiIdx = 0; openGame(); }
            } else {
                konamiIdx = (code === konami[0]) ? 1 : 0;
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
