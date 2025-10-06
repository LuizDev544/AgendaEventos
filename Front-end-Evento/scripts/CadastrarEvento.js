document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("formCadastro");
    const msg = document.getElementById("msg");

    if (!form) {
        console.error("Formulário de cadastro de evento não encontrado!");
        return;
    }

    const token = localStorage.getItem('jwtToken');
    if (!token) {
        msg.textContent = "Você não está logado. Faça login novamente.";
        msg.style.color = "red";
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

        const validationData = await resp.json();
        
        if (!validationData.valid || validationData.role !== "ROLE_ADMIN") {
            msg.textContent = "Você não tem permissão para cadastrar eventos.";
            msg.style.color = "red";
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            window.location.href = "Login.html";
            return;
        }

        console.log("Usuário autenticado:", validationData.usuario, "Role:", validationData.role);
        
    } catch (err) {
        console.error("Erro ao validar token:", err);
        msg.textContent = "Erro de conexão ao verificar autenticação.";
        msg.style.color = "red";
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const evento = {
            nomeEvento: document.getElementById("nomeEvento").value,
            descricaoDoEvento: document.getElementById("descricaoDoEvento").value,
            dataDoEvento: document.getElementById("dataDoEvento").value,
            localDoEvento: document.getElementById("localDoEvento").value,
            precoDoEvento: parseFloat(document.getElementById("precoDoEvento").value),
            capacidadeDePessoasNoEvento: parseInt(document.getElementById("capacidadeDePessoasNoEvento").value),
            tipoDoEvento: document.getElementById("tipoDoEvento").value,
            apresentadorDoEvento: document.getElementById("apresentadorDoEvento").value,
            duracaoDoEvento: document.getElementById("duracaoDoEvento").value
        };

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch("http://localhost:8080/api/admin/eventos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(evento)
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error("Acesso negado. Token expirado ou inválido.");
                }
                throw new Error("Erro ao cadastrar evento.");
            }

            const data = await response.json();
            console.log("Evento cadastrado:", data);

            msg.textContent = "Evento cadastrado com sucesso!";
            msg.style.color = "green";
            form.reset();
        } catch (err) {
            console.error("Erro ao cadastrar evento:", err);
            msg.textContent = "Erro: " + err.message;
            msg.style.color = "red";
            
            // Se foi erro de autenticação, redireciona para login
            if (err.message.includes("Acesso negado") || err.message.includes("Token")) {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('userData');
                setTimeout(() => {
                    window.location.href = "Login.html";
                }, 2000);
            }
        }
    });
});