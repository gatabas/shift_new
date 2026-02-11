<script>
    document.addEventListener('DOMContentLoaded', function () {
            const banner = document.getElementById('compare-cart-banner');
    const listSpan = document.getElementById('compare-cart-list');
    const bannerBtn = document.getElementById('compare-cart-btn');
    const overlay = document.getElementById('compare-modal-overlay');
    const modalTitle = document.getElementById('compare-modal-title');
    const advSummary = document.getElementById('compare-advantage-summary');
    const modalBody = document.getElementById('compare-modal-body');
    const modalClose = document.getElementById('compare-modal-close');
    const checkboxes = document.querySelectorAll('#bireysel .compare-checkbox');

    function parseDuration(name) {
                const m = name.match(/(\d+)\s*AYLIK/i);
    if (m) return parseInt(m[1], 10);
    if (/YILLIK/i.test(name)) return 12;
    return 1;
            }
    function parsePrice(str) {
                const num = Number(str.replace(/[^\d]/g, ''));
    return isNaN(num) ? NaN : num;
            }

    function updateBanner() {
                const seçili = Array.from(checkboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);

    if (seçili.length) {
        banner.style.display = 'flex';
    listSpan.textContent = seçili.join(' • ');
                } else {
        banner.style.display = 'none';
                }
    bannerBtn.disabled = seçili.length < 2;
                checkboxes.forEach(cb => {
        cb.disabled = !cb.checked && seçili.length >= 2;
                });
            }
            checkboxes.forEach(cb => cb.addEventListener('change', updateBanner));

    bannerBtn.addEventListener('click', function () {
                if (this.disabled) return;

    // 1) Seçili paketler ve satýrlar
    const seçiliAdlar = Array.from(checkboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
    const rows = Array.from(checkboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.closest('tr'));

    // 2) Kullaným süreleri ve fiyatlar (PAÜ dýþý fiyatlar, 4. sütun)
    const durations = seçiliAdlar.map(parseDuration);
                const priceStrs = rows.map(r => {
                    const cell = r.querySelector('td:nth-child(4)');
    return cell ? cell.innerText.trim() : '';
                });
    const prices = priceStrs.map(parsePrice);
                const aylik = prices.map((p, i) => p / durations[i]);

    // 3) Özet cümlesi
    let ozettxt;
    if (aylik[0] < aylik[1]) {
        ozettxt = `${seçiliAdlar[0]} paketiyle aylýk ${Math.round(aylik[1] - aylik[0])} TL tasarruf edersiniz.`;
                } else if (aylik[1] < aylik[0]) {
        ozettxt = `${seçiliAdlar[1]} paketiyle aylýk ${Math.round(aylik[0] - aylik[1])} TL tasarruf edersiniz.`;
                } else {
        ozettxt = `Her iki paketin de aylýk maliyeti eþit.`;
                }

    // 4) Baþlýk ve özet
    modalTitle.innerText = `${seçiliAdlar[0]} ile ${seçiliAdlar[1]} paketini karþýlaþtýrýyorsunuz`;
    advSummary.innerText = ozettxt;

    // 5) Tablo baþlýklarý
    const headers = Array.from(
    document.querySelectorAll('#bireysel table thead th')
                ).map(th => th.innerText.trim());
    const skip = ['Seç', 'Paketler', 'Paket Ýçerikleri'];
                const attrs = headers.filter(h => !skip.includes(h));

    // 6) Dikey tablo oluþtur
    let html = '<table class="compare-table"><thead><tr><th>Özellik</th>';
                rows.forEach(r => {
                    const name = r.querySelector('td:nth-child(2)').innerText.trim();
        html += `<th>${name}</th>`;
                });
        html += '<th>Avantajýnýz</th></tr></thead><tbody>';

                attrs.forEach(attr => {
                html += `<tr><td>${attr}</td>`;
            const fieldIndex = headers.indexOf(attr);
                    const values = rows.map(r => {
                        const td = r.querySelector(`td:nth-child(${fieldIndex + 1})`);
            return td ? td.innerText.trim() : '';
                    });
                    values.forEach(val => html += `<td>${val}</td>`);

            // Avantaj hücresi
            let advCell = '';
            const num0 = parsePrice(values[0]);
            const num1 = parsePrice(values[1]);
                    if (!isNaN(num0) && !isNaN(num1) && num0 > 0 && num1 > 0) {
                        // rakamsal fark
                        if (durations[0] === durations[1]) {
                            const diff = Math.abs(num0 - num1);
            advCell = `${diff.toLocaleString()} TL fark`;
                        } else {
                            const diff = Math.abs(Math.round((num0 / durations[0]) - (num1 / durations[1])));
            advCell = `Aylýk ${diff.toLocaleString()} TL fark`;
                        }
                    } else {
                // metinsel fark
                advCell = (values[0] === values[1])
                    ? 'Ayný'
                    : `${seçiliAdlar[0]}: ${values[0]}, ${seçiliAdlar[1]}: ${values[1]}`;
                    }
            html += `<td class="advantage-cell">${advCell}</td>`;
            html += '</tr>';
                });

        html += '</tbody></table>';
modalBody.innerHTML = html;
overlay.style.display = 'flex';
            });

modalClose.addEventListener('click', () => overlay.style.display = 'none');
overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.style.display = 'none';
});
        });
    </script >