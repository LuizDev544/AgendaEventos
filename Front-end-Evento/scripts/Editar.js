// ✅ VERIFICA AUTENTICAÇÃO AO CARREGAR
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
        alert("❌ Você precisa estar logado para acessar esta página!");
        window.location.href = "Login.html";
        return;
    }

    try {
        // ✅ VALIDA O TOKEN
        const resp = await fetch("http://localhost:8080/auth/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: token })
        });

        const data = await resp.json();
        
        if (!data.valid) {
            alert("❌ Sessão expirada! Faça login novamente.");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            window.location.href = "Login.html";
            return;
        }

        console.log("✅ Usuário autenticado:", data.usuario);
        
        // ✅ INICIALIZA EVENT LISTENERS PRIMEIRO
        inicializarEventListeners();
        
        // ✅ DEPOIS CARREGA EVENTOS
        await carregarEventos();
        
    } catch (err) {
        console.error("Erro ao validar token:", err);
        alert("❌ Erro de autenticação!");
        window.location.href = "Login.html";
    }
});

// ✅ FUNÇÃO PARA INICIALIZAR TODOS OS EVENT LISTENERS
function inicializarEventListeners() {
    // ✅ FORMULÁRIO DE EDIÇÃO
    const formEdicao = document.getElementById("formEdicao");
    if (formEdicao) {
        formEdicao.addEventListener("submit", enviarEdicao);
    }

    // ✅ OVERLAY - COM VERIFICAÇÃO DE NULL
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.addEventListener('click', fecharFormulario);
    } else {
        console.warn("⚠️ Elemento overlay não encontrado");
    }

    // ✅ BOTÃO CANCELAR - COM VERIFICAÇÃO
    const btnCancelar = document.getElementById("btnCancelarEdicao");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", fecharFormulario);
    }

    // ✅ BOTÃO RECARREGAR - COM VERIFICAÇÃO
    if (document.getElementById('Recarregar')) {
        document.getElementById('Recarregar').addEventListener('click', carregarEventos);
    }
}

// ✅ FUNÇÃO SEPARADA PARA ENVIAR EDIÇÃO
async function enviarEdicao(e) {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken');
    if (!token) {
        alert("❌ Sessão expirada! Faça login novamente.");
        window.location.href = "Login.html";
        return;
    }

    const id = document.getElementById("inputId").value;
    const eventoAtualizado = {
        nomeEvento: document.getElementById("inputNome").value,
        descricaoDoEvento: document.getElementById("inputDescricao").value,
        dataDoEvento: document.getElementById("inputData").value,
        localDoEvento: document.getElementById("inputLocal").value,
        precoDoEvento: parseFloat(document.getElementById("inputPreco").value),
        capacidadeDePessoasNoEvento: parseInt(document.getElementById("inputCapacidade").value),
        tipoDoEvento: document.getElementById("inputTipo").value,
        apresentadorDoEvento: document.getElementById("inputApresentador").value,
        duracaoDoEvento: document.getElementById("inputDuracao").value
    };

    try {
        const res = await fetch(`http://localhost:8080/api/admin/eventos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(eventoAtualizado)
        });

        if (res.status === 401 || res.status === 403) {
            alert("❌ Sessão expirada! Faça login novamente.");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            window.location.href = "Login.html";
            return;
        }

        if (!res.ok) {
            throw new Error(`Erro ${res.status} ao atualizar evento`);
        }

        document.getElementById("msgEdicao").innerText = "✅ Evento atualizado com sucesso!";
        document.getElementById("msgEdicao").style.color = "green";

        // ✅ FECHA FORMULÁRIO E RECARREGA LISTA
        setTimeout(() => {
            fecharFormulario();
            carregarEventos();
        }, 1000);

    } catch (err) {
        console.error("❌ Erro ao atualizar evento:", err);
        document.getElementById("msgEdicao").innerText = "❌ Falha ao atualizar evento!";
        document.getElementById("msgEdicao").style.color = "red";
    }
}

function criarBotaoEditar(linha) {
    const btn = document.createElement('button');
    btn.textContent = 'Editar';
    btn.className = 'btn btn-warning btn-sm';

    btn.addEventListener('click', () => {
        const form = document.getElementById('formEdicao');
        const overlay = document.getElementById('overlay');

        // ✅ PREENCHE FORMULÁRIO COM DADOS DO EVENTO
        document.getElementById('inputId').value = linha.dataset.id;
        document.getElementById('inputNome').value = linha.children[1].textContent;
        document.getElementById('inputDescricao').value = linha.children[2].textContent;
        document.getElementById('inputData').value = linha.children[3].textContent;
        document.getElementById('inputLocal').value = linha.children[4].textContent;
        document.getElementById('inputPreco').value = linha.children[5].textContent.replace('R$ ', '').trim();
        document.getElementById('inputCapacidade').value = linha.children[6].textContent;
        document.getElementById('inputTipo').value = linha.children[7].textContent;
        document.getElementById('inputApresentador').value = linha.children[8].textContent;
        document.getElementById('inputDuracao').value = linha.children[9].textContent;

        // ✅ ABRE MODAL
        if (form) form.classList.add('show');
        if (overlay) overlay.classList.add('show');
    });

    return btn;
}

async function carregarEventos() {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
        console.error("❌ Token não encontrado");
        return;
    }

    try {
        const res = await fetch('http://localhost:8080/api/admin/eventos', {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (res.status === 401 || res.status === 403) {
            alert("❌ Sessão expirada! Faça login novamente.");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            window.location.href = "Login.html";
            return;
        }

        if (!res.ok) {
            throw new Error(`Erro ${res.status} ao carregar eventos`);
        }

        const eventos = await res.json();

        const tbody = document.querySelector('#tabelaEventos tbody');
        if (!tbody) {
            console.error("❌ Tabela não encontrada");
            return;
        }
        
        tbody.innerHTML = '';

        if (eventos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="11" class="text-center">Nenhum evento cadastrado</td></tr>';
            return;
        }

        eventos.forEach(e => {
            const tr = document.createElement('tr');
            tr.dataset.id = e.id;
            tr.innerHTML = `
                <td>${e.id}</td>
                <td>${e.nomeEvento}</td>
                <td>${e.descricaoDoEvento || ''}</td>
                <td>${e.dataDoEvento}</td>
                <td>${e.localDoEvento}</td>
                <td>R$ ${e.precoDoEvento ? e.precoDoEvento.toFixed(2) : '0.00'}</td>
                <td>${e.capacidadeDePessoasNoEvento || ''}</td>
                <td>${e.tipoDoEvento || ''}</td>
                <td>${e.apresentadorDoEvento || ''}</td>
                <td>${e.duracaoDoEvento || ''}</td>
                <td></td>
            `;
            
            const lastTd = tr.querySelector('td:last-child');
            if (lastTd) {
                lastTd.appendChild(criarBotaoEditar(tr));
            }
            
            tbody.appendChild(tr);
        });

    } catch (err) {
        console.error('❌ Erro ao carregar eventos:', err);
        const tbody = document.querySelector('#tabelaEventos tbody');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="11" class="text-center text-danger">Erro ao carregar eventos</td></tr>';
        }
    }
}

// ✅ FUNÇÃO PARA FECHAR FORMULÁRIO
function fecharFormulario() {
    const form = document.getElementById('formEdicao');
    const overlay = document.getElementById('overlay');
    const msgEdicao = document.getElementById("msgEdicao");
    
    if (form) form.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
    if (msgEdicao) msgEdicao.innerText = "";
}

// ✅ VERIFICA SE O OVERLAY EXISTE ANTES DE ADICIONAR EVENT LISTENER
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', fecharFormulario);
    }
});