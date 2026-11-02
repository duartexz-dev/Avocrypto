// Remove credenciais que possam ter sido guardadas por versões antigas.
// Nunca ler nem expor os valores dessas chaves.
for (const key of ["senhaUser", "emailUser"]) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.warn("Não foi possível limpar credenciais legadas deste navegador.");
    }
}
