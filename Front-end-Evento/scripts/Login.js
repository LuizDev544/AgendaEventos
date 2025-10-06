document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const msg = document.getElementById("msg");
    const token = localStorage.getItem('jwtToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
        console.log("Usuário já logado, validando token...");
        validarTokenERedirecionar(token);
        return; 
    }

    if (!form) {
        console.error("Formulário de login não encontrado!");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            console.log("Status da Resposta:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Detalhes do erro:", errorText);
                throw new Error(`Falha no login (${response.status}). Verifique suas credenciais.`);
            }

            const data = await response.json();
            console.log("Dados recebidos JWT:", data);

            if (data.authenticated && data.token) {
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('userData', JSON.stringify({
                    usuario: data.usuario,
                    role: data.role
                }));

                msg.textContent = "✅ Login realizado com sucesso!";
                msg.style.color = "green";
                
                // Redireciona para o painel ADMIN
                setTimeout(() => {
                    window.location.href = "PainelADM.html";
                }, 1000);
                
            } else {
                msg.textContent = "Credenciais inválidas!";
                msg.style.color = "red";
            }
        } catch (err) {
            console.error("Erro no login:", err);
            msg.textContent = "⚠️ " + err.message;
            msg.style.color = "red";
        }
    });

    async function validarTokenERedirecionar(token) {
        try {
            const resp = await fetch("http://localhost:8080/auth/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: token })
            });

            if (resp.ok) {
                const data = await resp.json();
                if (data.valid) {
                    console.log("Token ainda válido, redirecionando para Painel...");
                    window.location.href = "PainelADM.html";
                    return;
                }
            }

            console.log("Token inválido, limpando...");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            
        } catch (err) {
            console.log("Erro na validação do token:", err);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
        }
    }
});

function fazerLogoutManual() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
    console.log("Logout manual realizado");
    window.location.reload();
}