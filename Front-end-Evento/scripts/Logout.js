document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
    
    console.log("Logout realizado - Tokens JWT removidos");
    
    setTimeout(() => {
        window.location.href = "Login.html";
    }, 1000);
});