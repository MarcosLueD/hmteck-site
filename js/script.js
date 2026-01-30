document.getElementById('form-solicitacao').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pegar valores dos campos
    const nome      = document.getElementById('nome').value.trim();
    const whatsapp  = document.getElementById('whatsapp').value.trim();
    const marca     = document.getElementById('marca').value;
    const modelo    = document.getElementById('modelo').value.trim();
    const problema  = document.getElementById('problema').value;
    const descricao = document.getElementById('descricao').value.trim();
    
    // Acessórios (checkboxes)
    const acessorios = [];
    if (document.getElementById('acessorio-capa').checked)       acessorios.push('Capa');
    if (document.getElementById('acessorio-pelicula').checked)   acessorios.push('Película');
    if (document.getElementById('acessorio-carregador').checked) acessorios.push('Carregador/cabo');
    if (document.getElementById('acessorio-caixa').checked)      acessorios.push('Caixa original');
    
    // Validação básica
    if (!nome || !whatsapp || !marca || !problema) {
        alert('Por favor, preencha os campos obrigatórios!');
        return;
    }
    
    // Monta a mensagem para o WhatsApp
    let mensagem = `Olá! Nova solicitação de orçamento pelo site HMTECH\n\n`;
    mensagem += `Nome: ${nome}\n`;
    mensagem += `WhatsApp: ${whatsapp}\n`;
    mensagem += `Marca: ${marca}\n`;
    if (modelo)    mensagem += `Modelo: ${modelo}\n`;
    mensagem += `Problema: ${problema}\n`;
    if (descricao) mensagem += `Detalhes: ${descricao}\n`;
    if (acessorios.length > 0) mensagem += `Acessórios: ${acessorios.join(', ')}\n`;
    
    // Número do WhatsApp (sem espaços, com código do país)
    const numero = '5518996241953';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    
    // Abre o WhatsApp
    window.open(url, '_blank');
    
    // Mostra mensagem de sucesso e esconde o form
    document.getElementById('form-solicitacao').style.display = 'none';
    document.getElementById('sucesso').style.display = 'block';
});