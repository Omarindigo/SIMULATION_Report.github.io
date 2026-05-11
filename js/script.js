(function () {
  'use strict';

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
    document.addEventListener('DOMContentLoaded', initVideoSync);
  } else {
    initVideoSync();
  }

})();
