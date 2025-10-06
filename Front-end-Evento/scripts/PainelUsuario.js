document.addEventListener('DOMContentLoaded', carregarEventos);

async function carregarEventos() {
    try {
        console.log('Carregando eventos...');
        
        const response = await fetch('http://localhost:8080/api/public/eventos');
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const eventos = await response.json();
        console.log('Eventos carregados:', eventos);
        
        exibirEventos(eventos);
        
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('listaEventos').innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Erro ao carregar eventos</h4>
                    <p>Não foi possível carregar os eventos. Tente novamente mais tarde.</p>
                </div>
            </div>
        `;
        document.getElementById('listaEventos').style.display = 'block';
    }
}

function exibirEventos(eventos) {
    const container = document.getElementById('listaEventos');
    const loading = document.getElementById('loading');
    const semEventos = document.getElementById('semEventos');

    loading.style.display = 'none';
    
    if (!eventos || eventos.length === 0) {
        semEventos.style.display = 'block';
        return;
    }
    
    container.innerHTML = '';
    
    eventos.forEach(evento => {
        const card = criarCardEvento(evento);
        container.appendChild(card);
    });
    
    container.style.display = 'flex';
}

function criarCardEvento(evento) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 col-xl-3';

    const dataFormatada = formatarData(evento.dataDoEvento);
    const precoFormatado = evento.precoDoEvento > 0 ? `R$ ${evento.precoDoEvento.toFixed(2)}` : 'Grátis';
    const icone = obterIconePorTipo(evento.tipoDoEvento);
    const corCategoria = obterCorPorTipo(evento.tipoDoEvento);
    
    col.innerHTML = `
        <div class="card evento-card h-100 shadow-sm">
            <div class="card-header ${corCategoria} text-white">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="card-title mb-0">${evento.nomeEvento}</h6>
                    <span>${icone}</span>
                </div>
            </div>
            <div class="card-body d-flex flex-column">
                <p class="card-text flex-grow-1">${evento.descricaoDoEvento || 'Sem descrição'}</p>
                
                <div class="evento-info mt-auto">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <small class="text-muted">
                            <i class="bi bi-calendar-event"></i> ${dataFormatada}
                        </small>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> ${evento.duracaoDoEvento || 'Não informado'}
                        </small>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <small class="text-muted">
                            <i class="bi bi-geo-alt"></i> ${evento.localDoEvento}
                        </small>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <small class="text-muted">
                            <i class="bi bi-geo-alt"></i> ${evento.tipoDoEvento}
                        </small>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-success">${precoFormatado}</span>
                        <span class="badge bg-primary">${evento.capacidadeDePessoasNoEvento || 'N/D'} vagas</span>
                    </div>
                </div>
                
                ${evento.apresentadorDoEvento ? `
                    <div class="mt-2 pt-2 border-top">
                        <small class="text-muted">
                            <strong>Apresentador:</strong> ${evento.apresentadorDoEvento}
                        </small>
                    </div>
                ` : ''}
                
                ${evento.tipoDoEvento ? `
                    <div class="mt-1">
                        <span class="badge ${corCategoria.replace('card-header ', '')}">${evento.tipoDoEvento}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    return col;
}

function formatarData(dataString) {
    if (!dataString) return 'Data não informada';
    
    try {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        return dataString;
    }
}

function obterCorPorTipo(tipo) {
    const cores = {
        'Show': 'bg-show',
        'Palestra': 'bg-palestra',
        'Workshop': 'bg-workshop',
        'Teatro': 'bg-teatro',
        'Esportivo': 'bg-esportivo',
        'Cultural': 'bg-cultural',
        'Musical': 'bg-musical',
        'Acadêmico': 'bg-academico',
        'Festival': 'bg-festival',
        'Feira': 'bg-feira'
    };
    
    if (!tipo) return 'bg-default';

    for (const [key, cor] of Object.entries(cores)) {
        if (tipo.toLowerCase().includes(key.toLowerCase())) {
            return `card-header ${cor}`;
        }
    }
    
    return 'card-header bg-default';
}

function obterIconePorTipo(tipo) {
    const icones = {
        'Show': '🎵' ,
        'Palestra': '🎤',
        'Workshop': '🔧',
        'Teatro': '🎭',
        'Esportivo': '⚽',
        'Cultural': '🎨',
        'Musical': '🎼',
        'Acadêmico': '📚',
        'Festival': '🎪',
        'Feira': '🏪'
    };
    
    if (!tipo) return '🎊';
    
    for (const [key, icone] of Object.entries(icones)) {
        if (tipo.toLowerCase().includes(key.toLowerCase())) {
            return icone;
        }
    }
    
    return '🎉';
}

document.querySelector('form[role="search"]').addEventListener('submit', function(e) {
    e.preventDefault();
    const termo = this.querySelector('input[type="search"]').value.toLowerCase();
    filtrarEventos(termo);
});

function filtrarEventos(termo) {
    const cards = document.querySelectorAll('.evento-card');
    let encontrados = 0;
    
    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        const pai = card.closest('.col-md-6');
        
        if (texto.includes(termo) || termo === '') {
            pai.style.display = 'block';
            encontrados++;
        } else {
            pai.style.display = 'none';
        }
    });

    const semResultados = document.getElementById('semResultados');
    if (encontrados === 0 && termo !== '') {
        if (!semResultados) {
            const msg = document.createElement('div');
            msg.id = 'semResultados';
            msg.className = 'col-12 text-center mt-4';
            msg.innerHTML = `
                <div class="alert alert-warning">
                    Nenhum evento encontrado para "${termo}"
                </div>
            `;
            document.getElementById('listaEventos').appendChild(msg);
        }
    } else if (semResultados) {
        semResultados.remove();
    }
}