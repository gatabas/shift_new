<script>
/* ——— Yapýlandýrma: sabit Soru–Cevaplar ——— */
    const HC_FAQ = [
    {q: "Üyelik türleri ve fiyatlar", a:
    `Tüm paketleri ve güncel fiyatlarý <a href="/prices.html">Üyeliklerimiz</a> sayfasýnda görebilirsin. Soruna göre “Bireysel / Aile” filtrelerini kullanmaný öneririm.` },
    {q: "Kurs baþvurusu nasýl yapýlýr?", a:
    `Kurs kaydý için <a href="https://spodeme.pau.edu.tr/course-payment" target="_blank" rel="noopener">ONLINE KURS ÖDEMESÝ</a> adýmýný takip et. Kurs tarihleri ve kontenjan için <a href="/courses.html">Kurslarýmýz</a> sayfasýný kontrol et.` },
    {q: "Üye giriþi ve þifre", a:
    `Giriþ için <a href="https://spodeme.pau.edu.tr/login" target="_blank" rel="noopener">Üye Giriþi</a> baðlantýsýný kullan. Þifreni unuttuysan “Þifremi Unuttum” adýmýndan e-posta adresinle sýfýrlayabilirsin.` },
    {q: "Halý saha rezervasyonu", a:
    `Uygun saatleri görüp rezervasyon yapmak için <a href="https://spodeme.pau.edu.tr/field-booking" target="_blank" rel="noopener">Halý Saha</a> sayfasýný kullan.` },
    {q: "Günübirlik giriþ", a:
    `Personel/öðrenci kimliði olanlar danýþmaya baþvurarak günübirlik (2 saat) giriþ yapabilir. Detaylar için danýþmaya uðrayabilirsin.` },
    ];

    /* ——— Uygulama ——— */
    (function(){
  const $launcher = document.getElementById('help-launcher');
    const $chat = document.getElementById('help-chat');
    const $questions = document.getElementById('hc-questions');
    const $body = document.getElementById('hc-body');

  // Sorularý buton olarak bas
  HC_FAQ.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = 'hc-qbtn';
    btn.type = 'button';
    btn.textContent = item.q;
    btn.addEventListener('click', () => answer(idx));
    $questions.appendChild(btn);
  });

    function answer(i){
    const qa = HC_FAQ[i];
    // kullanýcý mesajý
    addMsg('user', qa.q);
    // bot cevabý
    addMsg('bot', qa.a);
    // kaydýr
    setTimeout(()=> $body.scrollTop = $body.scrollHeight, 0);
  }

    function addMsg(who, html){
    const div = document.createElement('div');
    div.className = 'msg ' + who;
    div.innerHTML = html;
    $body.appendChild(div);
  }

    function openChat(){
        $chat.classList.add('open');
    setTimeout(()=> $body.scrollTop = 0, 150);
  }
    function closeChat(){$chat.classList.remove('open'); }
    function minimize(){$chat.classList.toggle('mini'); }

    // Aç/Kapat
    $launcher.addEventListener('click', openChat);
  $launcher.addEventListener('keydown', e => { if(e.key==='Enter' || e.key===' ') openChat(); });

    $chat.querySelector('.hc-close').addEventListener('click', closeChat);
    $chat.querySelector('.hc-min').addEventListener('click', minimize);

  // ESC ile kapat
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') closeChat();
  });
})();
</script>