document.getElementById('import-recipes-btn').addEventListener('click', async () => {
    const importStatus = document.getElementById('import-status');
    importStatus.textContent = 'Importando receitas...';

    try {
        const response = await fetch('/recipes/import', { method: 'GET' });
        const data = await response.json();

        if (response.ok) {
            importStatus.textContent = data.message;
        } else {
            importStatus.textContent = `Erro: ${data.message}`;
        }
    } catch (error) {
        console.error('Erro ao importar receitas:', error);
        importStatus.textContent = 'Erro ao importar receitas.';
    }
});