async function verificarSessao() {
    try {
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
            console.log("Nenhum token JWT encontrado");
            window.location.href = "Login.html";
            return;
        }

        const resp = await fetch("http://localhost:8080/auth/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: token })
        });

        if (!resp.ok) {
            throw new Error("Erro na validação do token");
        }

        const data = await resp.json();
        console.log("Validação do token:", data);

        if (!data.valid) {
            console.log("Token inválido");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            window.location.href = "Login.html";
            return;
        }

        console.log("Administrador autenticado:", data.usuario);

    } catch (err) {
        console.error("Erro ao verificar sessão JWT:", err);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
        window.location.href = "Login.html";
    }
}

document.addEventListener("DOMContentLoaded", verificarSessao);