const nome = document.getElementById('nome');
const prioridade = document.getElementById('prioridade');
const search = document.getElementById('search');
const filterPrioridade = document.getElementById('filter-prioridade');
const filterData = document.getElementById('filter-data');
const ordenacao = document.getElementById('ordenacao');
const btnLimparFiltros = document.querySelector('.controls button:last-child');

let tarefas = [];

function adicionar() {
    const nomeValue = nome.value.trim();

    if (!nomeValue) {
        const erro = document.getElementById('erro');
        erro.innerText = 'Adicione uma tarefa!!!';
        nome.focus();
        return;
    }

    const tarefa = {
        id: Date.now(),
        nome: nomeValue,
        prioridade: prioridade.value,
        dataCriacao: new Date(),
        concluida: false,
    };

    tarefas.push(tarefa);
    atualizarListas();
    nome.value = '';
    const erro = document.getElementById('erro');
    erro.innerText = '';
}

function atualizarListas() {
    const pendentes = document.getElementById('pendentes');
    const concluidas = document.getElementById('concluidas');

    pendentes.innerHTML = '';
    concluidas.innerHTML = '';

     if (tarefas.length === 0) {
        const mensagem = document.createElement('li');
        mensagem.textContent = 'Nenhuma tarefa encontrada.';
        pendentes.appendChild(mensagem);
        return;
    }

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.innerText = `${tarefa.nome} - ${tarefa.prioridade}`;
        li.dataset.id = tarefa.id;

        if (tarefa.concluida) {
            li.classList.add('concluida');
            const timestamp = document.createElement('span');
            timestamp.classList.add('timestamp');
            timestamp.innerText = `Concluído em: ${formatarData(tarefa.dataCriacao)}`;
            li.appendChild(timestamp);

            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.addEventListener('click', function () {
                excluirTarefa(tarefa.id);
            });
            li.appendChild(btnExcluir);

            concluidas.appendChild(li);
        } else {
            switch (tarefa.prioridade) {
                case 'Alta':
                    li.classList.add('alta');
                    break;
                case 'Média':
                    li.classList.add('media');
                    break;
                case 'Baixa':
                    li.classList.add('baixa');
                    break;
            }

            const btnConcluir = document.createElement('button');
            btnConcluir.innerText = 'Concluir';
            btnConcluir.addEventListener('click', function () {
                concluirTarefa(tarefa.id);
            });

            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.addEventListener('click', function () {
                excluirTarefa(tarefa.id);
            });

            const buttons = document.createElement('div');
            buttons.classList.add('buttons');
            buttons.appendChild(btnConcluir);
            buttons.appendChild(btnExcluir);

            li.appendChild(buttons);
            pendentes.appendChild(li);
        }
    });

    btnLimparFiltros.style.display = 'inline-block';
}

function concluirTarefa(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    if (index !== -1) {
        tarefas[index].concluida = true;
        tarefas[index].dataConclusao = new Date();
        atualizarListas();
    }
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    atualizarListas();
}

function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}


search.addEventListener('input', filtrarTarefas);
filterPrioridade.addEventListener('change', filtrarTarefas);
filterData.addEventListener('change', filtrarTarefas);
ordenacao.addEventListener('change', ordenarTarefas);
btnLimparFiltros.addEventListener('click', limparFiltros);

function filtrarTarefas() {
    const termo = search.value.toLowerCase();
    const prioridade = filterPrioridade.value;
    const estado = filterData.value;

    const tarefasFiltradas = tarefas.filter(tarefa => {
        const nome = tarefa.nome.toLowerCase();
        const condicaoPrioridade = prioridade === 'todas' || tarefa.prioridade === prioridade;
        const condicaoEstado = estado === 'todas' || (estado === 'pendentes' && !tarefa.concluida) || (estado === 'concluidas' && tarefa.concluida);
        
        return nome.includes(termo) && condicaoPrioridade && condicaoEstado;
    });

    atualizarListasComFiltro(tarefasFiltradas);
}

function atualizarListasComFiltro(tarefasFiltradas) {
    const pendentes = document.getElementById('pendentes');
    const concluidas = document.getElementById('concluidas');

    pendentes.innerHTML = '';
    concluidas.innerHTML = '';

    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement('li');
        li.innerText = `${tarefa.nome} - ${tarefa.prioridade}`;
        li.dataset.id = tarefa.id;

        if (tarefa.concluida) {
            li.classList.add('concluida');
            const timestamp = document.createElement('span');
            timestamp.classList.add('timestamp');
            timestamp.innerText = `Concluído em: ${formatarData(tarefa.dataCriacao)}`;
            li.appendChild(timestamp);

            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.addEventListener('click', function () {
                excluirTarefa(tarefa.id);
            });
            li.appendChild(btnExcluir);

            concluidas.appendChild(li);
        } else {
            switch (tarefa.prioridade) {
                case 'Alta':
                    li.classList.add('alta');
                    break;
                case 'Média':
                    li.classList.add('media');
                    break;
                case 'Baixa':
                    li.classList.add('baixa');
                    break;
            }

            const btnConcluir = document.createElement('button');
            btnConcluir.innerText = 'Concluir';
            btnConcluir.addEventListener('click', function () {
                concluirTarefa(tarefa.id);
            });

            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.addEventListener('click', function () {
                excluirTarefa(tarefa.id);
            });

            const buttons = document.createElement('div');
            buttons.classList.add('buttons');
            buttons.appendChild(btnConcluir);
            buttons.appendChild(btnExcluir);

            li.appendChild(buttons);
            pendentes.appendChild(li);
        }
    });

    btnLimparFiltros.style.display = 'inline-block';
}

function ordenarTarefas() {
    const tipoOrdenacao = ordenacao.value;

    switch (tipoOrdenacao) {
        case 'nome':
            tarefas.sort((a, b) => a.nome.localeCompare(b.nome));
            break;
        case 'prioridade':
            tarefas.sort((a, b) => {
                const prioridades = { 'Alta': 3, 'Média': 2, 'Baixa': 1 };
                return prioridades[b.prioridade] - prioridades[a.prioridade];
            });
            break;
        case 'data':
            tarefas.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
            break;
    }

    atualizarListas();
}

function limparFiltros() {
    search.value = '';
    filterPrioridade.value = 'todas';
    filterData.value = 'todas';
    ordenacao.value = 'nome';

    atualizarListas();
}
