document.addEventListener('DOMContentLoaded', function() {
    console.log("🔍 Consultar.js carregado");
    verificarAutenticacao();
});

async function verificarAutenticacao() {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
        alert("Você precisa estar logado para acessar esta página!");
        window.location.href = "Login.html";
        return;
    }

    try {
        const resp = await fetch("http://localhost:8080/auth/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: token })
        });

        const data = await resp.json();
        
        if (!data.valid) {
            alert("Sessão expirada! Faça login novamente.");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            window.location.href = "Login.html";
        }
        
    } catch (err) {
        console.error("Erro ao validar token:", err);
        alert("Erro de autenticação!");
        window.location.href = "Login.html";
    }
}

function mostrarEvento(evento) {
    console.log("Preenchendo formulário com dados do evento:", evento);
    
    document.querySelector('#txtnome').value = evento.nomeEvento || 'Não informado';
    document.querySelector('#txtdescricao').value = evento.descricaoDoEvento || 'Não informado';
    document.querySelector('#txtdataevento').value = evento.dataDoEvento ? evento.dataDoEvento.split('T')[0] : '';
    document.querySelector('#txtlocal').value = evento.localDoEvento || 'Não informado';
    document.querySelector('#txtpreco').value = evento.precoDoEvento != null ? `R$ ${evento.precoDoEvento.toFixed(2)}` : 'Grátis';
    document.querySelector('#txtcapacidade').value = evento.capacidadeDePessoasNoEvento != null ? evento.capacidadeDePessoasNoEvento + ' pessoas' : 'Não informado';
    document.querySelector('#txttipo').value = evento.tipoDoEvento || 'Não informado';
    document.querySelector('#txtapresentador').value = evento.apresentadorDoEvento || 'Não informado';
    document.querySelector('#txtduracao').value = evento.duracaoDoEvento || 'Não informado';
    
    console.log("Formulário preenchido com sucesso!");
}

async function consultarEvento() {
    const id = document.querySelector('#idevento').value.trim();
    
    console.log("Iniciando consulta para ID:", id);
    
    if (id.length < 1){
        alert("ID inválido, insira outro novamente");
        return;
    }

    const url = `http://localhost:8080/api/public/eventos/${id}`;
    
    console.log("Usando endpoint público:", url);
    
    try {
        const resposta = await fetch(url);

        console.log("Status da resposta:", resposta.status);

        if(resposta.status === 200){
            console.log("Evento encontrado!");
            const evento = await resposta.json();
            console.log("Dados do evento:", evento);
            mostrarEvento(evento);
            document.getElementById('resultado').style.display = 'block';
            
        } else if (resposta.status === 404) {
            console.log("Evento não encontrado");
            alert("Evento com ID: " + id + " não encontrado");
            document.getElementById('resultado').style.display = 'none';
            limparCampos();
        } else {
            console.log("Erro desconhecido:", resposta.status);
            alert("Erro ao buscar evento. Código: " + resposta.status);
            document.getElementById('resultado').style.display = 'none';
            limparCampos();
        }

    } catch (erro) {
        console.error("Erro de conexão:", erro);
        alert("Erro de conexão com o servidor!");
        document.getElementById('resultado').style.display = 'none';
        limparCampos();
    }
}

function limparCampos() {
    document.querySelector('#txtnome').value = '';
    document.querySelector('#txtdescricao').value = '';
    document.querySelector('#txtdataevento').value = '';
    document.querySelector('#txtlocal').value = '';
    document.querySelector('#txtpreco').value = '';
    document.querySelector('#txtcapacidade').value = '';
    document.querySelector('#txttipo').value = '';
    document.querySelector('#txtapresentador').value = '';
    document.querySelector('#txtduracao').value = '';
}