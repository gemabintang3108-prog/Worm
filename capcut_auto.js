// ==UserScript==
// @name         CapCut Auto Premium
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto register CapCut pake email dari generator.email
// @author       Yudzx
// @match        https://www.capcut.com/*
// @match        https://generator.email/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    
    const PASSWORD = 'Bintang31';
    let currentEmail = '';
    
    // 1. TAMBAHIN BUTTON DI GENERATOR.EMAIL
    if (window.location.host.includes('generator.email')) {
        const inboxPanel = document.querySelector('.inbox-content');
        if (inboxPanel) {
            const btn = document.createElement('button');
            btn.innerHTML = '🚀 AMBIL EMAIL UNTUK CAPCUT';
            btn.style.cssText = 'background: #6a0dad; color: white; padding: 15px; margin: 10px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;';
            btn.onclick = function() {
                const emailElement = document.querySelector('.email-head h2');
                currentEmail = emailElement ? emailElement.innerText : '';
                if (currentEmail) {
                    GM_setValue('capcut_email', currentEmail);
                    GM_setValue('capcut_pass', PASSWORD);
                    alert('✅ Email disimpan: ' + currentEmail);
                    window.open('https://www.capcut.com', '_blank');
                }
            };
            inboxPanel.prepend(btn);
        }
    }
    
    // 2. AUTO FILL DI CAPCUT
    if (window.location.host.includes('capcut.com')) {
        // Cek kalo ada email tersimpan
        const savedEmail = GM_getValue('capcut_email', '');
        const savedPass = GM_getValue('capcut_pass', '');
        
        if (savedEmail) {
            // Tunggu form loading
            setTimeout(() => {
                // Isi email
                const emailInput = document.querySelector('input[type="email"], input[name="email"]');
                if (emailInput) {
                    emailInput.value = savedEmail;
                    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
                
                // Isi password
                const passInput = document.querySelector('input[type="password"]');
                if (passInput) {
                    passInput.value = savedPass;
                    passInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
                
                // Klik tombol daftar
                setTimeout(() => {
                    const daftarBtn = document.querySelector('button[type="submit"], .register-btn');
                    if (daftarBtn) {
                        daftarBtn.click();
                        
                        // Tunggu verifikasi
                        setTimeout(() => {
                            // Buka kembali generator.email buat ambil kode
                            window.open('https://generator.email/', '_blank');
                        }, 3000);
                    }
                }, 1000);
            }, 2000);
        }
    }
})();
