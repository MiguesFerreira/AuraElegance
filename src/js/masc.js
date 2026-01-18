AOS.init({ duration: 1000, once: true });

//Anima texto - 10% OFF
document.addEventListener("DOMContentLoaded", function () {
    const elementoStatus = document.getElementById("texto");
    const mensagem = `✨ Compre um Perfume <span class="text-dourado font-bold">AURA</span> e ganhe <span class="span">10% OFF</span> na sua primeira compra!!! ✨`;

    // Inserimos o HTML completo de uma vez
    elementoStatus.innerHTML = mensagem;

    const comprimentoTotal = elementoStatus.textContent.length;
    let indice = 0;
    let removendo = false;

    function animar() {
        // Criamos um efeito de "revelação" via CSS ou fatiamento de texto

        if (!removendo) {
            indice++;
            if (indice > comprimentoTotal) {
                removendo = true;
                setTimeout(animar, 2000);
                return;
            }
        } else {
            indice--;
            if (indice <= 0) {
                removendo = false;
            }
        }

        // Aplicamos o efeito: mostramos X caracteres sem quebrar o HTML
        atualizarVisualizacao(elementoStatus, indice);

        setTimeout(animar, removendo ? 30 : 70);
    }

    function atualizarVisualizacao(el, qtd) {
        // Esta função garante que o HTML não quebre
        el.style.clipPath = `inset(0 ${100 - (qtd / comprimentoTotal * 100)}% 0 0)`;
    }

    // Estilo inicial necessário para o efeito de clip
    elementoStatus.style.whiteSpace = "nowrap";
    elementoStatus.style.display = "inline-block";

    animar();
});

//Carrinho
let carrinho = [];

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;

    if (modal.style.display === "none" || modal.style.display === "" || modal.classList.contains('hidden')) {
        modal.style.setProperty('display', 'flex', 'important');
        modal.classList.remove('hidden');
        renderizarCarrinho();
    } else {
        modal.style.setProperty('display', 'none', 'important');
    }
}

//AnimaCarrinno
function toggleCartModal() { toggleCart(); }

document.querySelectorAll('.btn-comprar').forEach(botao => {
    botao.addEventListener('click', function (e) {
        e.preventDefault();
        const card = this.closest('.card-perfume');
        const nome = card.querySelector('h3').innerText;
        const precoTexto = card.querySelector('.text-xl').innerText;
        const preco = parseFloat(precoTexto.replace('R$', '').replace('.', '').replace(',', '.').trim());

        carrinho.push({ nome, preco });
        document.getElementById('cart-count').innerText = carrinho.length;

        const cartDrawer = document.getElementById('cart-drawer');
        if (cartDrawer) {
            cartDrawer.classList.add('animate-bounce-cart');
            setTimeout(() => cartDrawer.classList.remove('animate-bounce-cart'), 500);
        }

        const originalText = this.innerHTML;
        this.innerText = "ADICIONADO!";
        this.style.backgroundColor = "#22c55e";
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.backgroundColor = "";
        }, 1500);
    });
});

//Carrinho
function renderizarCarrinho() {
    const container = document.getElementById('cart-items') || document.getElementById('cart-list');
    const totalElement = document.getElementById('cart-total');
    if (!container) return;

    if (carrinho.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-10 text-xs">O carrinho está vazio.</p>';
        totalElement.innerText = "R$ 0,00";
        return;
    }

    let html = '';
    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        html += `
            <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 mb-2">
                <div>
                    <p class="text-white text-[11px] font-bold uppercase tracking-wider">${item.nome}</p>
                    <p class="text-dourado text-xs">R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <button onclick="removerItem(${index})" class="text-red-400 p-2"><i class="fas fa-trash-alt"></i></button>
            </div>`;
    });
    container.innerHTML = html;
    totalElement.innerText = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

//Removedor
function removerItem(index) {
    carrinho.splice(index, 1);
    document.getElementById('cart-count').innerText = carrinho.length;
    renderizarCarrinho();
}

//Finalizador
function finalizarPedido() {
    if (carrinho.length === 0) return alert("Adicione itens!");

    const SEU_NUMERO = "5515998359080";
    let texto = "NOVO PEDIDO - AURAELEGANCE \n\n";
    let totalGeral = 0;

    carrinho.forEach(item => {
        texto += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
        totalGeral += item.preco;
    });

    texto += `\n | Total do Pedido: R$ ${totalGeral.toFixed(2)}*`;
    texto += `\n\n | Desejo prosseguir com o pagamento... `;

    const url = `https://wa.me/${SEU_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}
//Hambúrguer Mobile
const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');

    if (menu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});