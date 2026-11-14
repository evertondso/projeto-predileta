// Selecionando os elementos da tela
const telaLogin = document.getElementById('tela-login');
const telaApp = document.getElementById('tela-app');
const inputOperador = document.getElementById('operador');
const btnEntrar = document.querySelector('#tela-login button');
const saudacao = document.getElementById('saudacao');
const alertaFeedback = document.getElementById('alerta-feedback');
const listaEntregas = document.getElementById('lista-entregas');

// Array para armazenar as entregas da sessão
let entregas = JSON.parse(localStorage.getItem('entregas_predileta')) || [];

// Esconde a tela do app no começo se não estiver logado
document.addEventListener('DOMContentLoaded', () => {
    telaApp.classList.add('hidden');
    atualizarLista();
});

// Ação do Botão Entrar
btnEntrar.addEventListener('click', () => {
    const nomeOperador = inputOperador.value.trim();

    if (nomeOperador === '') {
        alert('Por favor, digite o nome do entregador!');
        return;
    }

    // Salva o operador e muda de tela
    saudacao.textContent = `Entregador: ${nomeOperador}`;
    telaLogin.classList.add('hidden');
    telaApp.classList.remove('hidden');
});

// Função para registrar a entrega
function registrarEntrega() {
    const clienteInput = document.getElementById('cliente').value.trim();
    const entreguesInput = document.getElementById('entregues').value;
    const devolvidosInput = document.getElementById('devolvidos').value;

    if (clienteInput === '') {
        alertaFeedback.textContent = 'Preencha o nome do cliente e endereço!';
        return;
    }

    alertaFeedback.textContent = '';

    // Cria o objeto da nova entrega
    const novaEntrega = {
        id: Date.now(),
        cliente: clienteInput,
        entregues: entreguesInput,
        devolvidos: devolvidosInput,
        horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Adiciona na lista e salva no localStorage
    entregas.push(novaEntrega);
    localStorage.setItem('entregas_predileta', JSON.stringify(entregas));

    // Atualiza a tela e limpa os campos
    atualizarLista();
    document.getElementById('cliente').value = '';
    document.getElementById('entregues').value = '1';
    document.getElementById('devolvidos').value = '1';
    
    alert('Entrega registrada com sucesso!');
}

// Função para renderizar a lista de entregas na tela
function atualizarLista() {
    listaEntregas.innerHTML = '';

    if (entregas.length === 0) {
        listaEntregas.innerHTML = '<li>Nenhuma entrega registrada hoje.</li>';
        return;
    }

    entregas.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.cliente}</strong><br>
            📦 Galões cheios: ${item.entregues} | 🔄 Cascos: ${item.devolvidos}<br>
            <small>🕒 ${item.horario}</small>
        `;
        listaEntregas.appendChild(li);
    });
}