/* ==========================================================================
   WUTE 隐藏关卡 — DODGE RACER（躲避竞速）
   彩蛋游戏：三车道躲避车流/锥桶，吃氮气加速，擦车加分，最高分记录。
   纯原生 Canvas + WebAudio，零依赖。由 wute.js / index.html 的彩蛋触发
   逻辑按需懒加载，加载完成后调用 window.WUTEGame.open()。
   ========================================================================== */
(function () {
    'use strict';
    if (window.WUTEGame) return;

    /* ---- 注入游戏层样式（不污染站点 CSS） ---- */
    var STYLE = [
        '#wuteGame { position: fixed; inset: 0; z-index: 3000; background: rgba(0,0,0,0.94);',
        '  display: none; flex-direction: column; align-items: center; justify-content: center;',
        '  font-family: Arial, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif; }',
        '#wuteGame.on { display: flex; }',
        '#wuteGame .g-head { width: 100%; max-width: 480px; display: flex; align-items: center;',
        '  justify-content: space-between; padding: 10px 18px; box-sizing: border-box; position: relative; z-index: 3; }',
        '#wuteGame .g-title { color: #fff; font-size: 13px; font-weight: 700; letter-spacing: 0.18em; }',
        '#wuteGame .g-title b { color: #00489b; }',
        '#wuteGame .g-head button { background: none; border: 1px solid rgba(255,255,255,0.2); color: #888;',
        '  border-radius: 6px; padding: 4px 12px; cursor: pointer; font-size: 12px; letter-spacing: 0.1em;',
        '  transition: all 0.25s; }',
        '#wuteGame .g-head button:hover { color: #fff; border-color: #00489b; }',
        '#wuteGame canvas { display: block; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;',
        '  box-shadow: 0 0 60px rgba(0,72,155,0.25); touch-action: none; }',
        '#wuteGame .g-panel { position: absolute; inset: 0; display: none; flex-direction: column;',
        '  align-items: center; justify-content: center; text-align: center; z-index: 2;',
        '  background: rgba(0,0,0,0.9); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }',
        '#wuteGame .g-panel.on { display: flex; }',
        '#wuteGame .g-kicker { font-family: "JetBrains Mono", Consolas, monospace; font-size: 11px;',
        '  color: #00489b; letter-spacing: 0.35em; text-transform: uppercase; margin-bottom: 10px; }',
        '#wuteGame .g-h1 { color: #fff; font-size: 30px; font-weight: 800; letter-spacing: 0.12em; margin-bottom: 6px; }',
        '#wuteGame .g-h1 b { color: #00489b; }',
        '#wuteGame .g-sub { color: #888894; font-size: 12px; letter-spacing: 0.08em; line-height: 1.9; margin-bottom: 22px; }',
        '#wuteGame .g-story { color: #9aa0ab; font-size: 12px; line-height: 2; letter-spacing: 0.05em;',
        '  max-width: 330px; text-align: left; border-left: 2px solid #00489b; padding-left: 14px;',
        '  margin: 0 auto 18px; }',
        '#wuteGame .g-story b { color: #fff; }',
        '#wuteGame .g-score { color: #555560; font-size: 12px; letter-spacing: 0.15em; margin-bottom: 20px; }',
        '#wuteGame .g-score b { color: #fff; font-size: 22px; font-family: "JetBrains Mono", Consolas, monospace; }',
        '#wuteGame .g-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }',
        '#wuteGame .g-btn { border: none; border-radius: 6px; padding: 12px 34px; cursor: pointer;',
        '  font-size: 14px; font-weight: 700; letter-spacing: 0.14em; transition: all 0.25s; }',
        '#wuteGame .g-btn-primary { background: #00489b; color: #fff; }',
        '#wuteGame .g-btn-primary:hover { background: #005db8; transform: translateY(-1px); }',
        '#wuteGame .g-btn-ghost { background: transparent; color: #888; border: 1px solid rgba(255,255,255,0.25); }',
        '#wuteGame .g-btn-ghost:hover { color: #fff; border-color: rgba(255,255,255,0.6); }',
        '#wuteGame .g-note { color: #555560; font-size: 11px; letter-spacing: 0.1em; margin-top: 20px; line-height: 1.8; }',
        '#wuteGame .g-note b { color: #888894; }',
        '#wuteGame .g-record { color: #d0121b; font-size: 13px; font-weight: 700; letter-spacing: 0.15em;',
        '  margin-bottom: 18px; animation: wuteGameBlink 1s steps(2) infinite; }',
        '@keyframes wuteGameBlink { 50% { opacity: 0.3; } }',
        '#wuteGame .g-hint { position: absolute; bottom: 14px; left: 0; right: 0; text-align: center;',
        '  color: #555560; font-size: 11px; letter-spacing: 0.12em; }',
        '#wuteGame .g-hint kbd { border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 1px 6px;',
        '  background: rgba(255,255,255,0.04); }',
        '@media (max-width: 768px) {',
        '  #wuteGame { padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left); box-sizing: border-box; }',
        '  #wuteGame .g-panel { overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 24px 6% 20px; box-sizing: border-box; }',
        '  #wuteGame .g-h1 { font-size: 24px; }',
        '  #wuteGame .g-story { font-size: 11px; line-height: 1.9; }',
        '  #wuteGame .g-kicker { font-size: 10px; }',
        '  #wuteGame .g-head { padding: 8px 12px; }',
        '  #wuteGame .g-hint { display: none; }',
        '  #wuteGame button { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }',
        '  #wuteGame .g-btn { padding: 12px 26px; font-size: 13px; }',
        '  #wuteGame .g-sub { margin-bottom: 16px; }',
        '  #wuteGame .g-score { margin-bottom: 16px; }',
        '  #wuteGame canvas { touch-action: none; max-width: 94vw; }',
        '}'
    ].join('\n');

    var HIGHSCORE_KEY = 'wute.game.highscore';
    var LANES = 3;
    var LANE_COLOR = 'rgba(255,255,255,0.14)';

    var overlay, canvas, ctx, panelStart, panelOver;
    var scoreElStart, bestElStart, scoreElOver, bestElOver, recordEl, muteBtn;
    var canvasW = 360, canvasH = 640, dpr = 1;
    var laneWidth = 0;

    var state = 'idle';            // idle | running | paused
    var rafId = 0, lastTime = 0;
    var speed = 0, baseSpeed = 320;
    var distance = 0, score = 0, bonusScore = 0;
    var spawnTimer = 0, nitroTimer = 0, nitroActive = false;
    var elapsed = 0;
    var player = { lane: 1, x: 0, y: 0, w: 32, h: 54 };
    var cars = [], pickups = [], particles = [];
    var muted = false, audioCtx = null;
    var keys = {};

    /* ---- DOM 构建 ---- */
    function build() {
        var st = document.createElement('style');
        st.textContent = STYLE;
        document.head.appendChild(st);

        overlay = document.createElement('div');
        overlay.id = 'wuteGame';
        overlay.innerHTML =
            '<div class="g-head">' +
            '  <span class="g-title">WUTE <b>隐藏关卡</b></span>' +
            '  <div><button id="wuteGameMute" type="button">音效 开</button>' +
            '  <button id="wuteGameClose" type="button" style="margin-left:8px">关闭 Esc</button></div>' +
            '</div>' +
            '<canvas id="wuteGameCanvas"></canvas>' +
            '<div class="g-panel" id="wuteGameStart">' +
            '  <div class="g-kicker">Easter Egg · Dodge Racer</div>' +
            '  <div class="g-h1">DODGE <b>RACER</b></div>' +
            '  <div class="g-story">比赛动态期间，<b>车队空套受损</b>——<br>紧急将备件运往赛场，快来拯救车队的耐久赛！</div>' +
            '  <div class="g-sub">← → / A·D / 滑动切换车道<br>超越前方车流 · 避开锥桶 · 氮气加速 · 擦车得分</div>' +
            '  <div class="g-score">最高纪录 <b id="wuteGameBestStart">0</b></div>' +
            '  <div class="g-actions">' +
            '    <button class="g-btn g-btn-primary" id="wuteGameStartBtn" type="button">开始运输</button>' +
            '    <button class="g-btn g-btn-ghost" id="wuteGameQuitStartBtn" type="button">返回首页</button>' +
            '  </div>' +
            '  <div class="g-note">本游戏为<b>虚构场景</b>，请遵守交通法规，文明驾驶</div>' +
            '</div>' +
            '<div class="g-panel" id="wuteGameOver">' +
            '  <div class="g-kicker">Game Over</div>' +
            '  <div class="g-h1">RACE <b>OVER</b></div>' +
            '  <div id="wuteGameRecord" class="g-record" style="display:none">★ NEW RECORD ★</div>' +
            '  <div class="g-score">本次得分 <b id="wuteGameScoreOver">0</b> · 最高纪录 <b id="wuteGameBestOver">0</b></div>' +
            '  <div class="g-actions">' +
            '    <button class="g-btn g-btn-primary" id="wuteGameRetryBtn" type="button">再来一局</button>' +
            '    <button class="g-btn g-btn-ghost" id="wuteGameQuitBtn" type="button">关闭</button>' +
            '  </div>' +
            '</div>' +
            '<div class="g-hint"><kbd>←</kbd> <kbd>→</kbd> 切道 · <kbd>空格</kbd> 暂停 · <kbd>Esc</kbd> 关闭</div>';
        document.body.appendChild(overlay);

        canvas = overlay.querySelector('#wuteGameCanvas');
        ctx = canvas.getContext('2d');
        panelStart = overlay.querySelector('#wuteGameStart');
        panelOver = overlay.querySelector('#wuteGameOver');
        scoreElStart = overlay.querySelector('#wuteGameBestStart');
        scoreElOver = overlay.querySelector('#wuteGameScoreOver');
        bestElOver = overlay.querySelector('#wuteGameBestOver');
        recordEl = overlay.querySelector('#wuteGameRecord');
        muteBtn = overlay.querySelector('#wuteGameMute');

        overlay.querySelector('#wuteGameStartBtn').addEventListener('click', startGame);
        overlay.querySelector('#wuteGameRetryBtn').addEventListener('click', startGame);
        overlay.querySelector('#wuteGameQuitBtn').addEventListener('click', close);
        overlay.querySelector('#wuteGameQuitStartBtn').addEventListener('click', close);
        overlay.querySelector('#wuteGameClose').addEventListener('click', close);
        muteBtn.addEventListener('click', toggleMute);

        // 触摸滑动切道
        var touchStartX = 0, touchHandled = false;
        canvas.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
            touchHandled = false;
            e.preventDefault();
        }, { passive: false });
        canvas.addEventListener('touchmove', function (e) {
            if (touchHandled || state !== 'running') return;
            var dx = e.touches[0].clientX - touchStartX;
            if (Math.abs(dx) > 26) {
                moveLane(dx > 0 ? 1 : -1);
                touchStartX = e.touches[0].clientX;
                touchHandled = true;
            }
            e.preventDefault();
        }, { passive: false });
    }

    /* ---- 打开 / 关闭 ---- */
    function open() {
        if (!overlay) build();
        if (overlay.classList.contains('on')) return; // 已打开
        overlay.classList.add('on');
        document.body.style.overflow = 'hidden';
        resize();
        showStart();
    }

    function close() {
        stopLoop();
        overlay.classList.remove('on');
        document.body.style.overflow = '';
    }

    function showStart() {
        state = 'idle';
        panelStart.classList.add('on');
        panelOver.classList.remove('on');
        scoreElStart.textContent = bestScore();
        drawIdle();
    }

    /* ---- 画布尺寸（含移动端适配） ---- */
    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        // 高度：不超过视口可用高度（考虑手机地址栏），上限 680
        var vh = Math.min(window.innerHeight - 96, 680);
        var vw = Math.min(window.innerWidth - 24, 460);
        canvasH = Math.max(320, Math.min(vh, window.innerHeight - 96));
        canvasW = Math.min(vw, Math.round(canvasH * 0.56));
        canvas.style.width = canvasW + 'px';
        canvas.style.height = canvasH + 'px';
        canvas.width = Math.round(canvasW * dpr);
        canvas.height = Math.round(canvasH * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        laneWidth = canvasW / LANES;
        player.x = laneCenter(player.lane);
        // 游戏运行中视口变化（手机地址栏收起/旋转）时同步玩家位置
        if (state === 'running') player.y = canvasH * 0.68;
    }

    function laneCenter(lane) { return laneWidth * (lane + 0.5); }

    /* ---- 游戏流程 ---- */
    function startGame() {
        panelStart.classList.remove('on');
        panelOver.classList.remove('on');
        distance = 0; score = 0; bonusScore = 0;
        speed = baseSpeed;
        elapsed = 0;
        spawnTimer = 0.4;
        nitroTimer = 0; nitroActive = false;
        cars = []; pickups = []; particles = [];
        player.lane = 1; player.x = laneCenter(1); player.y = canvasH * 0.68;
        keys = {};
        state = 'running';
        lastTime = 0;
        stopLoop();
        rafId = requestAnimationFrame(loop);
        ensureAudio();
    }

    function gameOver() {
        state = 'idle';
        stopLoop();
        var prev = bestScore();
        if (score > prev) localStorage.setItem(HIGHSCORE_KEY, String(score));
        var isRecord = score > prev && score > 0;
        recordEl.style.display = isRecord ? '' : 'none';
        scoreElOver.textContent = String(Math.floor(score));
        bestElOver.textContent = String(bestScore());
        if (navigator.vibrate) navigator.vibrate(120);
        panelOver.classList.add('on');
    }

    function bestScore() {
        var v = parseInt(localStorage.getItem(HIGHSCORE_KEY) || '0', 10);
        return isNaN(v) ? 0 : v;
    }

    function moveLane(dir) {
        var nl = player.lane + dir;
        if (nl < 0 || nl >= LANES) return;
        player.lane = nl;
        whoosh();
    }

    /* ---- 主循环 ---- */
    function loop(ts) {
        if (state !== 'running') return;
        rafId = requestAnimationFrame(loop);
        if (!lastTime) lastTime = ts;
        var dt = Math.min((ts - lastTime) / 1000, 0.05);
        lastTime = ts;
        elapsed += dt;

        // 难度：每 22 秒提速一档，上限 +120
        var extra = Math.min(Math.floor(elapsed / 22) * 24, 120);
        var spd = speed + extra;

        distance += spd * dt;

        // 氮气计时
        if (nitroTimer > 0) {
            nitroTimer -= dt;
            if (nitroTimer <= 0) nitroActive = false;
        }

        // 生成车流/障碍
        spawnTimer -= dt;
        if (spawnTimer <= 0) {
            spawn();
            spawnTimer = Math.max(0.62, 1.15 - elapsed * 0.012) * (0.78 + Math.random() * 0.44);
        }

        // 氮气道具
        if (!nitroActive && Math.random() < dt * 0.18 && pickups.length === 0) {
            // 随机选一个未与顶部车流同车道的车道（保证道具可见）
            var pl = Math.floor(Math.random() * LANES);
            for (var tryL = 0; tryL < 6 && laneBlockedNearTop(pl); tryL++) {
                pl = Math.floor(Math.random() * LANES);
            }
            pickups.push({ lane: pl, x: laneCenter(pl), y: -40, active: true });
        }

        var moveSpeed = spd * (nitroActive ? 1.55 : 1);

        // 更新车流
        for (var i = cars.length - 1; i >= 0; i--) {
            var c = cars[i];
            c.y += moveSpeed * c.ratio * dt;
            // near miss：车流尾部越过玩家且未计分
            if (!c.scored && c.y > player.y + player.h / 2) {
                c.scored = true;
                var dx = Math.abs(c.x - player.x);
                if (dx < laneWidth * 0.72) {
                    bonusScore += nitroActive ? 20 : 10;
                    ding();
                }
            }
            // 碰撞（氮气仅加速，不提供无敌——撞车即结束）
            if (c.y - c.h / 2 < player.y + player.h / 2 && c.y + c.h / 2 > player.y - player.h / 2 &&
                Math.abs(c.x - player.x) < (c.w + player.w) / 2) {
                explode(c.x, c.y);
                boom();
                gameOver();
                return;
            }
            if (c.y > canvasH + 60) { cars.splice(i, 1); }
        }

        // 追尾钳制：同车道后车（y 更小）不越过前车，保持 55px 间距（防止快车追尾重叠）
        for (var ii = 0; ii < cars.length; ii++) {
            var cc = cars[ii];
            for (var jj = 0; jj < cars.length; jj++) {
                if (ii === jj || cars[jj].lane !== cc.lane) continue;
                var ff = cars[jj];
                if (ff.y > cc.y && ff.y - cc.y < 55) {
                    cc.y = ff.y - 55;
                }
            }
        }

        // 更新氮气道具
        for (var j = pickups.length - 1; j >= 0; j--) {
            var p = pickups[j];
            p.y += moveSpeed * dt;
            if (!nitroActive && p.y + 13 > player.y - player.h / 2 && p.y - 13 < player.y + player.h / 2 &&
                Math.abs(p.x - player.x) < (22 + player.w) / 2) {
                pickups.splice(j, 1);
                nitroActive = true;
                nitroTimer = 5;
                nitroSweep();
                continue;
            }
            if (p.y > canvasH + 40) pickups.splice(j, 1);
        }

        // 粒子
        for (var k = particles.length - 1; k >= 0; k--) {
            var pt = particles[k];
            pt.x += pt.vx * dt;
            pt.y += pt.vy * dt;
            pt.vy += 260 * dt;
            pt.life -= dt;
            if (pt.life <= 0) particles.splice(k, 1);
        }

        // 玩家平滑移动
        var target = laneCenter(player.lane);
        player.x += (target - player.x) * Math.min(1, dt * 10);

        score = Math.floor(distance / 10 + bonusScore);

        draw(moveSpeed);
    }

    /* ---- 生成 ---- */
    // 生成安全策略（三层防死局）：
    // 1) 顶部安全区：只选画面上部 230px 内未被占 + 同车道保持间距的车道
    // 2) 危险区检查：玩家面前 y∈[player.y-220, player.y+60] 已被占的车道不参与生成，
    //    且若危险区已占 2 条、只剩 1 条逃生车道时跳过本批（不添堵）
    // 3) 动态救援：主循环每帧检测危险区 3 车道全占时移除最远一辆（见 loop）
    var SPAWN_SAFE_ZONE = 230;   // 顶部安全区
    var SPAWN_MIN_GAP = 180;     // 同车道新生成车与最近前车的最小间距
    var DANGER_FRONT = 220;      // 危险区：玩家前方高度
    var DANGER_BACK = 60;        // 危险区：玩家后方高度

    function laneBlockedNearTop(lane) {
        for (var i = 0; i < cars.length; i++) {
            var c = cars[i];
            if (c.lane !== lane) continue;
            if (c.y < SPAWN_SAFE_ZONE) return true;                    // 安全区内已有车
            if (c.y < SPAWN_SAFE_ZONE + SPAWN_MIN_GAP + 60) return true; // 距离顶部太近，保持间距
        }
        return false;
    }

    // 危险区占用的车道集合（即将到达玩家面前的车辆所在车道）
    function dangerZoneLanes() {
        var set = [];
        for (var i = 0; i < cars.length; i++) {
            var c = cars[i];
            if (c.y > player.y - DANGER_FRONT && c.y < player.y + DANGER_BACK) {
                if (set.indexOf(c.lane) < 0) set.push(c.lane);
            }
        }
        return set;
    }

    function spawn() {
        var danger = dangerZoneLanes();
        // 可用车道 = 不在危险区 && 顶部安全区未占用
        var free = [];
        for (var l = 0; l < LANES; l++) {
            if (danger.indexOf(l) >= 0) continue;
            if (laneBlockedNearTop(l)) continue;
            free.push(l);
        }
        if (free.length === 0) return; // 全堵：跳过本批
        if (free.length === 1 && danger.length >= 2) return; // 只剩逃生通道：不添堵
        var maxN = danger.length >= 2 ? 1 : 2;
        var n = Math.min(free.length, maxN, Math.random() < 0.32 ? 2 : 1);
        // 洗牌取前 n 个车道
        for (var s = free.length - 1; s > 0; s--) {
            var r = Math.floor(Math.random() * (s + 1));
            var t = free[s]; free[s] = free[r]; free[r] = t;
        }
        for (var i = 0; i < n; i++) {
            var lane = free[i];
            var isCone = Math.random() < 0.3;
            if (isCone) {
                // 锥桶：静止路障（屏幕速度 = 背景速度 ratio=1，玩家快速掠过）
                cars.push({ kind: 'cone', lane: lane, x: laneCenter(lane), y: -36, w: 22, h: 30, ratio: 1, scored: false });
            } else {
                // 同向慢车：真实速度 = 背景*(1-ratio)，ratio 0.55~0.85
                // → 屏幕移动快（2~3 秒到玩家面前），相对超车速度 15%~45% 背景速度
                cars.push({
                    kind: 'car', lane: lane, x: laneCenter(lane), y: -60,
                    w: 30, h: 54, ratio: 0.55 + Math.random() * 0.3, scored: false
                });
            }
        }
    }

    /* ---- 渲染 ---- */
    function draw(moveSpeed) {
        ctx.clearRect(0, 0, canvasW, canvasH);
        // 路面
        ctx.fillStyle = '#07070b';
        ctx.fillRect(0, 0, canvasW, canvasH);
        // 车道线（滚动虚线）
        ctx.strokeStyle = LANE_COLOR;
        ctx.lineWidth = 2;
        var dash = 34, gap = 26;
        var offset = (distance * 0.9) % (dash + gap);
        for (var i = 1; i < LANES; i++) {
            var x = laneWidth * i;
            ctx.beginPath();
            ctx.setLineDash([dash, gap]);
            ctx.lineDashOffset = -offset;
            ctx.moveTo(x, -20);
            ctx.lineTo(x, canvasH + 20);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        // 霓虹边线
        ctx.save();
        ctx.shadowColor = 'rgba(0,72,155,0.9)';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#00489b';
        ctx.fillRect(2, 0, 3, canvasH);
        ctx.fillRect(canvasW - 5, 0, 3, canvasH);
        ctx.restore();

        // 氮气速度线
        if (nitroActive) {
            ctx.strokeStyle = 'rgba(120,180,255,0.35)';
            ctx.lineWidth = 2;
            for (var s = 0; s < 14; s++) {
                var sx = ((s * 97 + distance * 1.4) % canvasW);
                var sy = ((s * 61 + distance * 2.2) % (canvasH + 60)) - 30;
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx, sy + 26);
                ctx.stroke();
            }
        }

        // 车流
        for (var ci = 0; ci < cars.length; ci++) {
            var c = cars[ci];
            if (c.kind === 'cone') {
                ctx.fillStyle = '#d0121b';
                ctx.beginPath();
                ctx.moveTo(c.x, c.y);
                ctx.lineTo(c.x - c.w / 2, c.y + c.h);
                ctx.lineTo(c.x + c.w / 2, c.y + c.h);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.fillRect(c.x - 7, c.y + c.h * 0.4, 14, 4);
            } else {
                // 同向慢车：车头朝上（前挡风偏上），尾灯在下方朝向玩家
                ctx.fillStyle = '#15151c';
                roundRect(ctx, c.x - c.w / 2, c.y, c.w, c.h, 6);
                ctx.fill();
                // 前挡风（车头方向）
                ctx.fillStyle = '#0b0f1a';
                roundRect(ctx, c.x - 9, c.y + 6, 18, 12, 3);
                ctx.fill();
                // 尾灯（下方，朝向玩家）
                ctx.fillStyle = '#d0121b';
                ctx.fillRect(c.x - c.w / 2 + 3, c.y + c.h - 8, 5, 5);
                ctx.fillRect(c.x + c.w / 2 - 8, c.y + c.h - 8, 5, 5);
            }
        }

        // 氮气道具
        for (var pi = 0; pi < pickups.length; pi++) {
            var pk = pickups[pi];
            ctx.save();
            ctx.shadowColor = 'rgba(0,140,255,0.95)';
            ctx.shadowBlur = 18;
            ctx.fillStyle = '#0090ff';
            roundRect(ctx, pk.x - 11, pk.y, 22, 26, 11);
            ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fillRect(pk.x - 4, pk.y + 6, 4, 14);
            ctx.restore();
        }

        // 玩家赛车
        var tilt = (player.x - laneCenter(player.lane)) * 0.02;
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(Math.max(-0.18, Math.min(0.18, tilt)));
        // 车身（WUTE 蓝）
        ctx.save();
        ctx.shadowColor = 'rgba(0,72,155,0.8)';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#00489b';
        roundRect(ctx, -player.w / 2, -player.h / 2, player.w, player.h, 8);
        ctx.fill();
        ctx.restore();
        // 车窗
        ctx.fillStyle = '#0b0f1a';
        roundRect(ctx, -10, -8, 20, 16, 4);
        ctx.fill();
        // 尾翼（下方白色）
        ctx.fillStyle = '#f0f0f2';
        roundRect(ctx, -16, player.h / 2 - 9, 32, 4, 2);
        ctx.fill();
        // 尾灯
        ctx.fillStyle = '#d0121b';
        ctx.fillRect(-13, player.h / 2 - 4, 5, 4);
        ctx.fillRect(8, player.h / 2 - 4, 5, 4);
        ctx.restore();

        // 粒子
        for (var pk2 = 0; pk2 < particles.length; pk2++) {
            var pt2 = particles[pk2];
            ctx.globalAlpha = Math.max(0, pt2.life / pt2.maxLife);
            ctx.fillStyle = pt2.color;
            ctx.fillRect(pt2.x - 3, pt2.y - 3, 6, 6);
        }
        ctx.globalAlpha = 1;

        // HUD：距离/分数
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.font = '600 15px "JetBrains Mono", Consolas, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(String(Math.floor(distance / 10)) + 'm', 12, 24);
        ctx.textAlign = 'right';
        ctx.fillText(String(Math.floor(score)), canvasW - 12, 24);
        if (nitroActive) {
            ctx.fillStyle = '#0090ff';
            ctx.textAlign = 'center';
            ctx.fillText('NITRO', canvasW / 2, 24);
        }
    }

    function drawIdle() {
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.fillStyle = '#07070b';
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.save();
        ctx.shadowColor = 'rgba(0,72,155,0.9)';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#00489b';
        ctx.fillRect(2, 0, 3, canvasH);
        ctx.fillRect(canvasW - 5, 0, 3, canvasH);
        ctx.restore();
        // 静止的玩家车
        player.x = laneCenter(1);
        player.y = canvasH * 0.68;
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.fillStyle = '#00489b';
        roundRect(ctx, -player.w / 2, -player.h / 2, player.w, player.h, 8);
        ctx.fill();
        ctx.fillStyle = '#0b0f1a';
        roundRect(ctx, -10, -8, 20, 16, 4);
        ctx.fill();
        ctx.fillStyle = '#f0f0f2';
        roundRect(ctx, -16, player.h / 2 - 9, 32, 4, 2);
        ctx.fill();
        ctx.restore();
    }

    function explode(x, y) {
        for (var i = 0; i < 22; i++) {
            var a = Math.random() * Math.PI * 2;
            var sp = 120 + Math.random() * 260;
            particles.push({
                x: x, y: y,
                vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
                life: 0.5 + Math.random() * 0.4, maxLife: 0.9,
                color: Math.random() < 0.5 ? '#d0121b' : (Math.random() < 0.5 ? '#ff6b00' : '#f0f0f2')
            });
        }
    }

    function roundRect(c, x, y, w, h, r) {
        c.beginPath();
        c.moveTo(x + r, y);
        c.arcTo(x + w, y, x + w, y + h, r);
        c.arcTo(x + w, y + h, x, y + h, r);
        c.arcTo(x, y + h, x, y, r);
        c.arcTo(x, y, x + w, y, r);
        c.closePath();
    }

    /* ---- 音效（WebAudio 合成） ---- */
    function ensureAudio() {
        if (audioCtx) { if (audioCtx.state === 'suspended') audioCtx.resume(); return; }
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
    }

    function beep(freq, dur, type, vol, slideTo) {
        if (muted || !audioCtx) return;
        var t = audioCtx.currentTime;
        var o = audioCtx.createOscillator();
        var g = audioCtx.createGain();
        o.type = type || 'square';
        o.frequency.setValueAtTime(freq, t);
        if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
        g.gain.setValueAtTime(vol || 0.06, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t); o.stop(t + dur + 0.02);
    }

    function whoosh() { beep(420, 0.12, 'sine', 0.05, 180); }
    function ding() { beep(1320, 0.09, 'sine', 0.05); setTimeout(function () { beep(1760, 0.12, 'sine', 0.05); }, 70); }
    function boom() {
        if (muted || !audioCtx) return;
        var t = audioCtx.currentTime;
        var buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.3, audioCtx.sampleRate);
        var d = buf.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
        var src = audioCtx.createBufferSource();
        src.buffer = buf;
        var g = audioCtx.createGain();
        g.gain.value = 0.25;
        src.connect(g); g.connect(audioCtx.destination);
        src.start();
    }
    function nitroSweep() { beep(300, 0.5, 'sawtooth', 0.05, 900); }

    function toggleMute() {
        muted = !muted;
        muteBtn.textContent = '音效 ' + (muted ? '关' : '开');
    }

    /* ---- 控制 ---- */
    function stopLoop() {
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
        lastTime = 0;
    }

    document.addEventListener('keydown', function (e) {
        if (!overlay || !overlay.classList.contains('on')) return;
        if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
        var code = e.code;
        if (code === 'ArrowLeft' || code === 'KeyA') { moveLane(-1); e.preventDefault(); }
        else if (code === 'ArrowRight' || code === 'KeyD') { moveLane(1); e.preventDefault(); }
        else if (code === 'Space') {
            e.preventDefault();
            if (state === 'running') { state = 'paused'; stopLoop(); }
            else if (state === 'paused') { state = 'running'; lastTime = 0; rafId = requestAnimationFrame(loop); }
        }
        else if (code === 'Escape') { close(); }
    });

    window.addEventListener('resize', function () {
        if (overlay && overlay.classList.contains('on')) resize();
    });

    window.WUTEGame = { open: open };
})();
