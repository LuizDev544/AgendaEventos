async function deletarEvento() {
    const id = document.querySelector('#eventId').value.trim();

    if (id.length < 1) {
        alert("ID inválido. Insira outro novamente.");
        return;
    }

    // ✅ CONFIRMAÇÃO ANTES DE EXCLUIR (movida para antes da requisição)
    if (!confirm(`Tem certeza que deseja excluir o Evento ${id}?`)) {
        return;
    }

    const url = `http://localhost:8080/api/admin/eventos/${id}`;
    const token = localStorage.getItem('jwtToken'); // ✅ Pega token JWT

    // ✅ VERIFICA SE TEM TOKEN
    if (!token) {
        document.querySelector('#mensagem').innerText = "❌ Você não está logado!";
        window.location.href = "Login.html";
        return;
    }

    try {
        const resposta = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // ✅ JWT em vez de Basic Auth
                'Content-Type': 'application/json'
            }
        });

        if (resposta.status === 404) {
            document.querySelector('#mensagem').innerText = "❌ Evento não encontrado!";
        } else if (resposta.status === 403) {
            document.querySelector('#mensagem').innerText = "❌ Acesso negado! Token expirado.";
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            setTimeout(() => window.location.href = "Login.html", 2000);
        } else if (resposta.status === 401) {
            document.querySelector('#mensagem').innerText = "❌ Não autorizado! Faça login novamente.";
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            setTimeout(() => window.location.href = "Login.html", 2000);
        } else if (resposta.ok) {
            document.querySelector('#mensagem').innerText = "✅ Evento excluído com sucesso!";
            document.querySelector('#deleteForm').reset();
        } else {
            document.querySelector('#mensagem').innerText = "❌ Erro ao excluir evento!";
        }

    } catch (erro) {
        document.querySelector('#mensagem').innerText = "❌ Erro de conexão! Verifique se o servidor está rodando.";
        console.error("Erro ao excluir evento:", erro);
    }
}

document.getElementById('deleteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    deletarEvento();
});

document.getElementById('Recarregar').addEventListener('click', function () {
    location.reload();
});

// ✅ VERIFICA AUTENTICAÇÃO AO CARREGAR A PÁGINA
document.addEventListener('DOMContentLoaded', async function() {
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
        } else {
            console.log("✅ Usuário autenticado:", data.usuario);
        }
        
    } catch (err) {
        console.error("Erro ao validar token:", err);
        alert("❌ Erro de autenticação!");
        window.location.href = "Login.html";
    }
});