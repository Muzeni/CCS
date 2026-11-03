/* ===== Codecraft Studio: script.js ===== */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Efek ketik kode, tampilan di sebelahnya ikut terbentuk */
  var lines = ['<header>Codecraft</header>', '<h1>Website Anda,</h1>', '<h1>dirakit rapi.</h1>', '<button>Chat Kami</button>'];
  var code = document.getElementById('code');
  var preview = document.getElementById('preview');
  if (code && preview) {
    if (reduce) {
      code.textContent = lines.join('\n');
      preview.classList.add('s1', 's2', 's3', 's4');
    } else {
      var li = 0, ci = 0, text = '';
      (function type() {
        if (li >= lines.length) return;
        text += lines[li].charAt(ci);
        code.textContent = text;
        ci++;
        if (ci >= lines[li].length) {
          li++; ci = 0; text += '\n';
          preview.classList.add('s' + li);
          setTimeout(type, 450);
        } else {
          setTimeout(type, 38);
        }
      })();
    }
  }

  /* Cahaya mengikuti kursor di latar */
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('pointermove', function (e) {
      document.documentElement.style.setProperty('--mx', e.clientX + 'px');
      document.documentElement.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });
  }

  /* Kalau screenshot belum ada, tampilkan kotak arsir */
  document.querySelectorAll('.shot img').forEach(function (img) {
    img.addEventListener('error', function () { img.remove(); });
  });

  /* Muncul saat discroll */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { obs.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* Link Shopee: cukup ganti alamat di bawah ini, semua tombol Shopee ikut berubah */
  var SHOPEE_URL = 'https://shopee.co.id/GANTI-DENGAN-LINK-TOKO-ANDA';
  if (SHOPEE_URL.indexOf('GANTI') === -1) {
    document.querySelectorAll('[data-shopee]').forEach(function (a) { a.href = SHOPEE_URL; });
  }

  /* Form kontak ke WhatsApp */
  var form = document.getElementById('waForm');
  var err = document.getElementById('err');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nama = document.getElementById('nama').value.trim();
      var pesan = document.getElementById('pesan').value.trim();
      if (!nama || !pesan) { err.hidden = false; return; }
      err.hidden = true;
      var text = 'Halo Codecraft Studio, saya ' + nama + '.\nJenis website: ' + document.getElementById('jenis').value + '\n' + pesan;
      window.open('https://wa.me/' + form.dataset.wa + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }
})();
