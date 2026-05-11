(function () {
  'use strict';

  /* ============================================
     Tabs — ARIA tab pattern
  ============================================ */
  function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');
    const indicator = document.querySelector('.tabs__indicator');
    const tablist = document.querySelector('[role="tablist"]');
    if (!tabs.length || !tablist) return;

    function moveIndicator(tab) {
      if (!indicator) return;
      var rect = tab.getBoundingClientRect();
      var parentRect = tablist.getBoundingClientRect();
      indicator.style.width = rect.width + 'px';
      indicator.style.transform = 'translateX(' + (rect.left - parentRect.left) + 'px)';
    }

    function activateTab(tab) {
      var targetId = tab.getAttribute('aria-controls');

      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.focus();

      panels.forEach(function (p) {
        p.classList.remove('panel--active');
        p.hidden = true;
      });

      var panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('panel--active');
        panel.hidden = false;
      }

      moveIndicator(tab);
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { activateTab(tab); });
    });

    tablist.addEventListener('keydown', function (e) {
      var current = document.querySelector('.tab[aria-selected="true"]');
      if (!current) return;
      var idx = Array.prototype.indexOf.call(tabs, current);
      var newIdx = -1;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIdx = (idx + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIdx = (idx - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIdx = tabs.length - 1;
      }

      if (newIdx >= 0) activateTab(tabs[newIdx]);
    });

    var active = document.querySelector('.tab[aria-selected="true"]');
    if (active) moveIndicator(active);

    window.addEventListener('resize', function () {
      var a = document.querySelector('.tab[aria-selected="true"]');
      if (a) moveIndicator(a);
    });
  }

  /* ============================================
     Video Sync — side-by-side comparison
  ============================================ */
  function initVideoSync() {
    var early = document.getElementById('vid-early');
    var late = document.getElementById('vid-late');
    var btnPlay = document.getElementById('btn-sync-play');
    var btnPause = document.getElementById('btn-sync-pause');
    var btnReset = document.getElementById('btn-sync-reset');
    if (!early || !late || !btnPlay) return;

    function syncPlay() {
      early.play();
      late.play();
    }

    function syncPause() {
      early.pause();
      late.pause();
    }

    function syncReset() {
      early.pause();
      late.pause();
      early.currentTime = 0;
      late.currentTime = 0;
    }

    btnPlay.addEventListener('click', syncPlay);
    btnPause.addEventListener('click', syncPause);
    btnReset.addEventListener('click', syncReset);
  }

  /* ============================================
     Init
  ============================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initTabs();
      initVideoSync();
    });
  } else {
    initTabs();
    initVideoSync();
  }

})();
