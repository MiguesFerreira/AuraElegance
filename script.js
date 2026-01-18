// --- 1. FECHAR COOKIE E SALVAR ESTADO ---
function hideCookies() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        // Salva na sessão que o usuário já interagiu com o cookie
        sessionStorage.setItem('cookieAceito', 'true');
        
        banner.style.opacity = '0';
        banner.style.transform = 'translate(-50%, 20px)';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 500);
    }
}

// --- CONTROLE PRINCIPAL ---
window.addEventListener('load', () => {
    const loader = document.getElementById('intro-loader');
    const logo = document.getElementById('intro-logo');
    const line = document.getElementById('intro-line');

    const path = window.location.pathname;
    const isIndex = path === '/' || path.includes('index.html') || path.endsWith('/');

    // 1. Linha dourada
    if (line) {
        setTimeout(() => { line.style.width = '100%'; }, 300);
    }

    // 2. Logo subindo
    if (logo) {
        setTimeout(() => { logo.classList.add('animate-logo'); }, 600);
    }

    // 3. Finaliza Loader
    setTimeout(() => {
        if (loader) {
            loader.classList.add('loader-finish');
        }
        
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Só inicia o monitoramento de scroll se for a Home 
        // E se o usuário ainda NÃO tiver aceitado o cookie nesta sessão
        if (isIndex && !sessionStorage.getItem('cookieAceito')) {
            iniciarMonitoramentoScroll();
        }
    }, 2500);
});

// --- TRANSIÇÃO DE SAÍDA ---
document.addEventListener('DOMContentLoaded', () => {
    const linksEntrada = document.querySelectorAll('.link-transicao');
    const loader = document.getElementById('intro-loader');

    linksEntrada.forEach(link => {
        link.addEventListener('click', function(e) {
            const destino = this.href;
            if (!destino || destino.includes('#')) return;

            e.preventDefault();

            if (loader) {
                loader.classList.remove('loader-finish');
                loader.classList.add('loader-closing');
            }

            setTimeout(() => {
                window.location.href = destino;
            }, 800);
        });
    });

    const menuBtn = document.getElementById('mobile-menu-button');
    const menuBox = document.getElementById('mobile-menu');
    if (menuBtn && menuBox) {
        menuBtn.onclick = () => menuBox.classList.toggle('hidden');
    }

    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
});

// --- COOKIE NO SCROLL (COM VERIFICAÇÃO DE SESSÃO) ---
let cookiePodeAparecer = true;
function iniciarMonitoramentoScroll() {
    const cookieBanner = document.getElementById('cookie-banner');
    
    window.addEventListener('scroll', () => {
        // Verifica novamente se já foi aceito para evitar bugs
        const jaAceitou = sessionStorage.getItem('cookieAceito');

        if (window.scrollY > 700 && cookieBanner && cookiePodeAparecer && !jaAceitou) {
            cookiePodeAparecer = false;
            cookieBanner.style.display = 'flex';
            setTimeout(() => {
                cookieBanner.style.opacity = '1';
                cookieBanner.style.transform = 'translate(-50%, 0)';
            }, 50);
        }
    }, { passive: true });
}

// --- SLIDER E WHATSAPP (MANTIDOS) ---
let currentSlide = 0;
window.changeSlide = (direction) => {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
};

function enviarWhats(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    if (!nome || !mensagem) return alert('Preencha os campos!');
    
    const numeroWhats = '5515998359080';
    const texto = encodeURIComponent(`Olá! Me chamo ${nome}.\n\n${mensagem}`);
    const url = `https://wa.me/${numeroWhats}?text=${texto}`;
    window.open(url, '_blank');
}