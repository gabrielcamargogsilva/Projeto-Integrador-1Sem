// Array que serve como base de dados em memória (Sincronizado com os dados da imagem)
let ordensDeServico = [
    {
        id: "OS-4092",
        equipamento: "Injetora Hidráulica G-80",
        patrimonio: "99403",
        setor: "Produção A",
        tipo: "CORRETIVA",
        prioridade: "Urgente",
        status: "Não Atribuída",
        tecnico: "",
        abertaEm: "24 Out, 08:30"
    },
    {
        id: "OS-4088",
        equipamento: "Esteira Transportadora L2",
        patrimonio: "88102",
        setor: "Embalagem",
        tipo: "PREVENTIVA",
        prioridade: "Média",
        status: "Em Execução",
        tecnico: "Ricardo Silva",
        abertaEm: "23 Out, 14:15"
    },
    {
        id: "OS-4085",
        equipamento: "Compressor de Ar Industrial",
        patrimonio: "10222",
        setor: "Usinagem",
        tipo: "PREDITIVA",
        prioridade: "Alta",
        status: "Pendente Peça",
        tecnico: "Marcos Lima",
        abertaEm: "22 Out, 10:00"
    }
];

// Mapeamento dos Elementos do DOM
const tbody = document.getElementById('osTableBody');
const searchInput = document.getElementById('searchOS');
const selectStatus = document.getElementById('filterStatus');
const selectPrioridade = document.getElementById('filterPrioridade');

const modal = document.getElementById('modalOS');
const btnNovaOS = document.getElementById('btnNovaOS');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnCancelar = document.getElementById('btnCancelar');
const formNovaOS = document.getElementById('formNovaOS');

// Função de renderização dinâmica da tabela (Critério 4)
function renderizarTabela(dados) {
    tbody.innerHTML = '';

    if (dados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:2rem; color:gray;">Nenhuma OS encontrada com os filtros aplicados.</td></tr>`;
        return;
    }

    dados.forEach(os => {
        // Classes condicionais baseadas nos dados lógicos
        const classePrio = os.prioridade === 'Urgente' ? 'prio-urgente' : (os.prioridade === 'Alta' ? 'prio-alta' : 'prio-media');
        const classeStatus = os.status === 'Não Atribuída' ? 'st-nao-atribuida' : (os.status === 'Em Execução' ? 'st-em-execucao' : 'st-pendente');
        
        let tecnicoConteudo = `<span style="color:#cbd5e0">—</span>`;
        if (os.tecnico) {
            const iniciais = os.tecnico.split(' ').map(n => n[0]).join('');
            tecnicoConteudo = `
                <div class="tecnico-box">
                    <div class="tecnico-avatar">${iniciais}</div>
                    <span>${os.tecnico}</span>
                </div>
            `;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="os-number">${os.id}</td>
            <td>
                <span class="equip-name">${os.equipamento}</span>
                <span class="equip-patrimonio">Patrimônio: ${os.patrimonio}</span>
            </td>
            <td>${os.setor}</td>
            <td><span class="badge-tipo">${os.tipo}</span></td>
            <td><span class="indicador-prio ${classePrio}"></span><span class="${classePrio}" style="font-weight:700;">${os.prioridade.toUpperCase()}</span></td>
            <td><span class="status-pill ${classeStatus}">${os.status}</span></td>
            <td>${tecnicoConteudo}</td>
            <td>${os.abertaEm}</td>
            <td class="actions-cell">
                <button title="Visualizar" onclick="visualizarOS('${os.id}')"><i class="fa-regular fa-eye"></i></button>
                <button title="Alocar Técnico" onclick="alocarTecnico('${os.id}')"><i class="fa-solid fa-user-gear"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Algoritmo de filtragem cruzada em tempo real (Critério 4 - Loops e Condições)
function filtrarDados() {
    const busca = searchInput.value.toLowerCase();
    const statusFiltro = selectStatus.value;
    const prioFiltro = selectPrioridade.value;

    const resultado = ordensDeServico.filter(os => {
        const correspondeBusca = os.id.toLowerCase().includes(busca) || 
                                 os.equipamento.toLowerCase().includes(busca) || 
                                 os.tecnico.toLowerCase().includes(busca);
        
        const correspondeStatus = (statusFiltro === 'Todos') || (os.status === statusFiltro);
        const correspondePrio = (prioFiltro === 'Todas') || (os.prioridade === prioFiltro);

        return correspondeBusca && correspondeStatus && correspondePrio;
    });

    renderizarTabela(resultado);
}

// Ouvintes de Evento para Filtros (Critério 3)
searchInput.addEventListener('input', filtrarDados);
selectStatus.addEventListener('change', filtrarDados);
selectPrioridade.addEventListener('change', filtrarDados);

/* Controle do Ciclo do Modal (Abre/Fecha) */
btnNovaOS.addEventListener('click', () => modal.classList.add('active'));
function fecharModal() { modal.classList.remove('active'); formNovaOS.reset(); }
btnFecharModal.addEventListener('click', fecharModal);
btnCancelar.addEventListener('click', fecharModal);

// Inclusão de dados através do Formulário (Critério 8 - Evolução além do mínimo)
formNovaOS.addEventListener('submit', (e) => {
    e.preventDefault();

    const novaOS = {
        id: `OS-${Math.floor(4100 + Math.random() * 1000)}`,
        equipamento: document.getElementById('formEquip').value,
        patrimonio: document.getElementById('formPatrimonio').value,
        setor: document.getElementById('formSetor').value,
        tipo: document.getElementById('formTipo').value,
        prioridade: document.getElementById('formPrio').value,
        status: "Não Atribuída",
        tecnico: "",
        abertaEm: "Agora mesmo"
    };

    ordensDeServico.unshift(novaOS); // Adiciona no início
    filtrarDados();
    fecharModal();
});

// Ações disparadas de dentro da tabela (Interações Reais)
window.visualizarOS = function(id) {
    alert(`Visualizando detalhes da Ordem de Serviço: ${id}`);
}

window.alocarTecnico = function(id) {
    const nome = prompt("Digite o nome do Técnico responsável:");
    if (nome && nome.trim() !== "") {
        const os = ordensDeServico.find(o => o.id === id);
        if (os) {
            os.tecnico = nome;
            os.status = "Em Execução";
            filtrarDados();
        }
    }
}

// Inicialização da Aplicação
renderizarTabela(ordensDeServico);