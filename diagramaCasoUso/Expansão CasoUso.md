# Sistema de Gestão de Manutenção Industrial

## 1. Ator: Operador (Chão de Fábrica)

Este ator representa o funcionário que opera as máquinas e identifica falhas iniciais.

### Caso de Uso: Abrir Chamado / Ordem de Serviço (OS)

O operador inicia o processo de manutenção relatando um problema.

#### <<include>> Selecionar Ativo / Equipamento
O operador deve identificar qual máquina apresenta defeito.

#### <<include>> Informar Condição da Máquina
O operador deve relatar o estado atual da máquina.

**Exemplos:**
- Parada total
- Operando com ruído
- Vazamento
- Falha intermitente

#### <<include>> Calcular Criticidade Automaticamente
O sistema, com base nas informações fornecidas, define automaticamente o nível de urgência do chamado.

### Caso de Uso: Acompanhar Status de Chamados Abertos

Permite ao operador visualizar o andamento das Ordens de Serviço abertas por ele.

**Status possíveis:**
- Pendente
- Em andamento
- Concluído

---

## 2. Ator: Técnico de Manutenção

Este ator é responsável pela execução dos reparos e serviços de manutenção.

### Caso de Uso: Visualizar Fila Geral de Chamados

O técnico acessa a lista de todas as Ordens de Serviço pendentes na fábrica.

### Caso de Uso: Assumir Ordem de Serviço (OS)

O técnico seleciona uma Ordem de Serviço da fila e atribui sua execução para si próprio.

### Caso de Uso: Gerenciar Minhas OS

Permite ao técnico acompanhar e controlar as Ordens de Serviço sob sua responsabilidade.

### Caso de Uso: Solicitar Peças Avulsas / Kits de Ferramentas

O técnico envia uma requisição ao almoxarifado solicitando materiais ou ferramentas necessários para a manutenção.

### Caso de Uso: Finalizar Manutenção (Registrar Parecer)

Após concluir o serviço, o técnico registra as atividades executadas e encerra a Ordem de Serviço.

#### <<include>> Gerar Log Automático de Intervenção

O sistema registra automaticamente a intervenção realizada para compor o histórico de manutenção do equipamento.

---

## 3. Ator: Almoxarife (Estoque)

Este ator é responsável pelo controle de peças, materiais e ferramentas utilizados pela manutenção.

### Caso de Uso: Visualizar Requisições de Materiais

O almoxarife acessa os pedidos realizados pelos técnicos.

### Caso de Uso: Liberar Materiais / Baixar e Entregar Itens

O almoxarife aprova a requisição e realiza a entrega dos itens solicitados.

#### <<include>> Gerar Cautela de Retorno

Criação de um termo de responsabilidade para ferramentas ou materiais que deverão ser devolvidos após o uso.

#### <<include>> Atualizar Estoque do Almoxarifado

O sistema reduz automaticamente a quantidade dos itens liberados no inventário.

### Caso de Uso: Confirmar Recebimento Físico (Devolução)

Registro da devolução de ferramentas ou sobras de materiais entregues anteriormente.

#### <<include>> Atualizar Estoque do Almoxarifado

O sistema atualiza automaticamente o saldo do inventário após a devolução.

### Caso de Uso: Visualizar Inventário e Alertas

Permite acompanhar:

- Quantidade disponível de itens
- Alertas de estoque baixo
- Necessidade de reposição

### Caso de Uso: Cadastrar / Entrada de Item no Estoque

Registro de novas peças, ferramentas ou materiais adquiridos pela empresa.

---

## 4. Ator: Administrador Geral

Este ator possui visão gerencial e permissões administrativas do sistema.

### Caso de Uso: Acessar Dashboard Administrativo

Visualização de indicadores e métricas (KPIs) relacionadas às operações de manutenção.

#### <<include>> Reatribuir Técnico Inline

Permite alterar rapidamente o técnico responsável por uma Ordem de Serviço diretamente pelo painel administrativo.

### Caso de Uso: Filtrar Ordens de Serviço

Ferramenta de busca avançada para localizar chamados utilizando critérios como:

- Data
- Status
- Técnico responsável
- Equipamento
- Prioridade

### Caso de Uso: Consultar Histórico Cronológico por Máquina

Permite acessar todo o histórico de:

- Manutenções realizadas
- Falhas registradas
- Intervenções executadas

referentes a um equipamento específico.

### Caso de Uso: Gerenciar Usuários (CRUD)

Permite realizar operações de:

- Criar usuários
- Consultar usuários
- Atualizar usuários
- Excluir usuários

Perfis suportados:

- Operador
- Técnico
- Almoxarife
- Administrador

### Caso de Uso: Gerenciar Kits de Ferramentas Padrão

Permite criar e manter conjuntos pré-definidos de ferramentas.

**Exemplos:**
- Kit Elétrico
- Kit Mecânico
- Kit Hidráulico

### Caso de Uso: Gerenciar Ativos / Equipamentos

Permite:

- Cadastrar novos equipamentos
- Atualizar informações de equipamentos existentes
- Inativar equipamentos desativados

---

# Resumo dos Relacionamentos <<include>>

| Caso de Uso Principal | Caso de Uso Incluído |
|----------------------|---------------------|
| Abrir Chamado / OS | Selecionar Ativo / Equipamento |
| Abrir Chamado / OS | Informar Condição da Máquina |
| Abrir Chamado / OS | Calcular Criticidade Automaticamente |
| Finalizar Manutenção | Gerar Log Automático de Intervenção |
| Liberar Materiais / Baixar e Entregar Itens | Gerar Cautela de Retorno |
| Liberar Materiais / Baixar e Entregar Itens | Atualizar Estoque do Almoxarifado |
| Confirmar Recebimento Físico | Atualizar Estoque do Almoxarifado |
| Acessar Dashboard Administrativo | Reatribuir Técnico Inline |