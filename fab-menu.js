/**
 * Modern FAB Menü - JavaScript
 * Floating Action Button ile etkileşimli menü
 */

(function () {
    'use strict';

    // DOM Elementleri
    const fabMain = document.getElementById('fabMain');
    const fabOverlay = document.getElementById('fabOverlay');
    const fabContainer = document.querySelector('.fab-container');
    const fabItems = document.querySelectorAll('.fab-item');

    // Menü açık mı kontrolü
    let isMenuOpen = false;

    /**
     * Menüyü açar
     */
    function openMenu() {
        fabContainer.classList.add('active');
        fabMain.classList.add('active');
        fabMain.setAttribute('aria-expanded', 'true');
        isMenuOpen = true;

        // Her menü öğesine tıklama dinleyicisi ekle
        fabItems.forEach(item => {
            item.setAttribute('tabindex', '0');
        });
    }

    /**
     * Menüyü kapatır
     */
    function closeMenu() {
        fabContainer.classList.remove('active');
        fabMain.classList.remove('active');
        fabMain.setAttribute('aria-expanded', 'false');
        isMenuOpen = false;

        // Menü öğelerini tab sıralamasından çıkar
        fabItems.forEach(item => {
            item.setAttribute('tabindex', '-1');
        });
    }

    /**
     * Menüyü toggle eder (aç/kapat)
     */
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Ana FAB butonuna tıklama eventi
    fabMain.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Overlay'e tıklama - menüyü kapat
    fabOverlay.addEventListener('click', function () {
        closeMenu();
    });

    // ESC tuşu ile menüyü kapat
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
            fabMain.focus();
        }
    });

    // Menü öğelerine tıklama - menüyü kapat
    fabItems.forEach(function (item) {
        item.addEventListener('click', function () {
            // Link açıldıktan sonra menüyü kapat
            setTimeout(function () {
                closeMenu();
            }, 300);
        });
    });

    // Sayfa yüklendiğinde menü öğelerini başlangıçta erişilemez yap
    fabItems.forEach(item => {
        item.setAttribute('tabindex', '-1');
    });

    // Scroll event - scroll yaparken menüyü göster/gizle (opsiyonel)
    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(function () {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Aşağı scroll - FAB'ı biraz gizle
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                fabContainer.style.transform = 'translateY(100px)';
                fabContainer.style.opacity = '0.7';
                if (isMenuOpen) {
                    closeMenu();
                }
            }
            // Yukarı scroll - FAB'ı göster
            else {
                fabContainer.style.transform = 'translateY(0)';
                fabContainer.style.opacity = '1';
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, 100);
    });

    // Touch event desteği - mobil için
    let touchStartY = 0;
    let touchEndY = 0;

    fabMain.addEventListener('touchstart', function (e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    fabMain.addEventListener('touchend', function (e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        // Yukarı swipe - menüyü aç
        if (touchEndY < touchStartY - 50 && !isMenuOpen) {
            openMenu();
        }
        // Aşağı swipe - menüyü kapat
        else if (touchEndY > touchStartY + 50 && isMenuOpen) {
            closeMenu();
        }
    }

    // Window resize - mobil/desktop geçişlerinde düzenleme
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            // Mobil boyutta menü açıksa kapat
            if (window.innerWidth <= 480 && isMenuOpen) {
                closeMenu();
            }
        }, 250);
    });

    // Sayfa dışına tıklama - menüyü kapat
    document.addEventListener('click', function (e) {
        if (!fabContainer.contains(e.target) && isMenuOpen) {
            closeMenu();
        }
    });

    // Haptic feedback (mobil cihazlarda titreşim) - opsiyonel
    function hapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }

    // FAB butonuna basıldığında hafif titreşim
    fabMain.addEventListener('click', hapticFeedback);

    // Konsola başarılı yüklenme mesajı
    console.log('✅ FAB Menü başarıyla yüklendi!');

})();