class TokenManager {
    static getToken() {
        return localStorage.getItem('jwtToken');
    }

    static setToken(token) {
        localStorage.setItem('jwtToken', token);
    }

    static removeToken() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
    }

    static getUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    static setUserData(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    static isLoggedIn() {
        return !!this.getToken();
    }

    static async validateToken() {
        const token = this.getToken();
        if (!token) return false;

        try {
            const resp = await fetch("http://localhost:8080/auth/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: token })
            });

            const data = await resp.json();
            return data.valid ? data : false;
        } catch (err) {
            console.error("Erro na validação do token:", err);
            return false;
        }
    }

    static getAuthHeaders() {
        const token = this.getToken();
        return token ? { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        } : { 'Content-Type': 'application/json' };
    }
}
