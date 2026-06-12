# 📋 Levantamento de Requisitos

## Sistema de Gerenciamento de Manutenção (SGM) — Central de Manutenção 4.0

**Versão:** 1.0  
**Data:** Junho de 2026  
**Projeto:** Projeto Integrador — 1º Semestre ADS  

---

## 1. Introdução

Este documento apresenta o levantamento completo dos requisitos do SGM, abrangendo requisitos funcionais, não-funcionais, regras de negócio e a matriz de permissões de acesso. Ele serve como referência técnica para a equipe de desenvolvimento e como insumo para validação junto aos stakeholders.

---

## 2. Requisitos Funcionais (RF)

### 2.1 Módulo de Autenticação

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RF-01 | O sistema deve exibir uma tela de login com seleção de perfil (Administrador, Técnico, Almoxarife, Operador) antes da entrada de credenciais | Alta |
| RF-02 | O sistema deve autenticar o usuário comparando matrícula/email e senha com os dados cadastrados | Alta |
| RF-03 | O sistema deve redirecionar o usuário autenticado para o painel correspondente ao seu perfil | Alta |
| RF-04 | O sistema deve armazenar a sessão do usuário logado para manter o contexto de navegação | Alta |
| RF-05 | O sistema deve impedir o acesso a telas de perfis diferentes do perfil autenticado | Média |

### 2.2 Módulo do Operador (Chão de Fábrica)

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RF-06 | O sistema deve permitir ao operador abrir uma nova Ordem de Serviço (OS) | Alta |
| RF-07 | O sistema deve exigir a seleção de um ativo/equipamento cadastrado para a OS | Alta |
| RF-08 | O sistema deve exigir a seleção da condição atual da máquina (Parada Total, Funcionando com Restrição, Operando com Ruído, etc.) | Alta |
| RF-09 | O sistema deve calcular automaticamente a criticidade da OS com base na condição informada e na classificação do equipamento | Alta |
| RF-10 | O sistema deve permitir ao operador descrever textualmente o problema identificado | Alta |
| RF-11 | O sistema deve registrar a OS com status inicial "Aberta" e a data/hora de abertura | Alta |
| RF-12 | O sistema deve permitir ao operador visualizar a lista de chamados abertos por ele | Alta |
| RF-13 | O sistema deve exibir o status atualizado de cada chamado (Aberta, Em Andamento, Concluído) | Alta |

### 2.3 Módulo do Técnico de Manutenção

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RF-14 | O sistema deve exibir a fila geral de chamados abertos, ordenados por criticidade (Alta → Média → Baixa) | Alta |
| RF-15 | O sistema deve permitir ao técnico assumir uma OS da fila, alterando seu status para "Em Andamento" | Alta |
| RF-16 | O sistema deve registrar a data/hora de início da manutenção ao assumir a OS | Alta |
| RF-17 | O sistema deve exibir um painel de "Minhas OS" com as ordens atribuídas ao técnico logado | Alta |
| RF-18 | O sistema deve permitir ao técnico solicitar peças avulsas ao almoxarifado, vinculando a requisição à OS | Alta |
| RF-19 | O sistema deve permitir ao técnico solicitar kits padrão de ferramentas ao almoxarifado | Alta |
| RF-20 | O sistema deve permitir ao técnico registrar o diagnóstico técnico (parecer) ao finalizar a manutenção | Alta |
| RF-21 | O sistema deve alterar o status da OS para "Concluído" e registrar a data de fechamento ao finalizar | Alta |
| RF-22 | O sistema deve gerar automaticamente um log de intervenção no histórico da máquina ao finalizar a OS | Alta |

### 2.4 Módulo do Almoxarife (Estoque)

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RF-23 | O sistema deve exibir a fila de requisições de materiais pendentes, realizadas pelos técnicos | Alta |
| RF-24 | O sistema deve permitir ao almoxarife liberar/entregar os itens solicitados | Alta |
| RF-25 | O sistema deve decrementar automaticamente o estoque dos itens liberados | Alta |
| RF-26 | O sistema deve gerar uma cautela (código de retorno) para ferramentas que necessitam de devolução | Alta |
| RF-27 | O sistema deve exibir a fila de cautelas ativas (ferramentas em campo com técnicos) | Alta |
| RF-28 | O sistema deve permitir ao almoxarife confirmar o recebimento físico (devolução) de ferramentas | Alta |
| RF-29 | O sistema deve incrementar o estoque ao confirmar a devolução de ferramentas | Alta |
| RF-30 | O sistema deve exibir o inventário completo com quantidade atual, mínima e localização | Média |
| RF-31 | O sistema deve gerar alertas visuais para itens com estoque abaixo do mínimo | Alta |
| RF-32 | O sistema deve permitir ao almoxarife cadastrar novos itens no estoque | Média |
| RF-33 | O sistema deve permitir registrar entradas de estoque associando nota fiscal | Média |

### 2.5 Módulo do Administrador

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RF-34 | O sistema deve exibir um dashboard com indicadores consolidados (total de OS por status, por criticidade, por técnico) | Alta |
| RF-35 | O sistema deve permitir ao administrador reatribuir o técnico responsável por uma OS diretamente pelo dashboard | Média |
| RF-36 | O sistema deve oferecer filtros avançados de OS por data, status, técnico, equipamento e prioridade | Média |
| RF-37 | O sistema deve exibir o histórico cronológico completo de intervenções por equipamento/máquina | Alta |
| RF-38 | O sistema deve permitir o CRUD (Criar, Ler, Atualizar, Excluir) de usuários com os perfis: Operador, Técnico, Almoxarife e Administrador | Alta |
| RF-39 | O sistema deve permitir a gestão de kits de ferramentas padrão (criar, editar, visualizar composição) | Média |
| RF-40 | O sistema deve permitir o cadastro, atualização e inativação de equipamentos/ativos monitorados | Alta |

---

## 3. Requisitos Não-Funcionais (RNF)

### 3.1 Usabilidade

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RNF-01 | A interface deve ser intuitiva e funcional, permitindo que um operador de chão de fábrica abra uma OS em no máximo 5 cliques | Alta |
| RNF-02 | O sistema deve utilizar codificação visual por cores para indicar criticidade (vermelho = alta, amarelo = média, verde = baixa) | Alta |
| RNF-03 | As telas devem possuir layout limpo com menus laterais (sidebar) para navegação rápida | Média |

### 3.2 Desempenho

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RNF-04 | As páginas devem carregar em menos de 3 segundos em um computador padrão | Média |
| RNF-05 | O sistema deve suportar o uso simultâneo por no mínimo 4 perfis diferentes (simulação offline) | Média |

### 3.3 Compatibilidade

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RNF-06 | O sistema deve funcionar nos navegadores Google Chrome (v100+), Mozilla Firefox (v100+) e Microsoft Edge (v100+) | Alta |
| RNF-07 | A interface deve ser responsiva, adaptando-se a resoluções de desktop (1366x768+) e tablets (768x1024+) | Média |

### 3.4 Disponibilidade e Persistência

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RNF-08 | O sistema deve operar 100% offline utilizando LocalStorage como mecanismo de persistência local | Alta |
| RNF-09 | Os dados armazenados em LocalStorage devem persistir entre sessões do navegador | Alta |
| RNF-10 | O banco de dados relacional (PostgreSQL) deve estar disponível como alternativa para ambientes de produção | Média |
| RNF-11 | O banco de dados PostgreSQL deve estar normalizado até a 3ª Forma Normal (3FN) | Média |

### 3.5 Manutenibilidade

| ID | Requisito | Prioridade |
| :--- | :--- | :---: |
| RNF-12 | O código front-end deve ser organizado em diretórios separados por perfil de acesso (Administrador, Técnico, Almoxarifado, Usuario) | Média |
| RNF-13 | A camada de dados simulada (mockDb.js) deve centralizar toda a lógica de leitura e gravação do LocalStorage | Média |

---

## 4. Regras de Negócio (RN)

| ID | Regra | Descrição Detalhada |
| :--- | :--- | :--- |
| RN-01 | Solicitante obrigatório | Toda Ordem de Serviço deve possuir um solicitante válido (usuário com perfil Operador) |
| RN-02 | Diagnóstico obrigatório para encerramento | Uma OS somente poderá ser finalizada após o preenchimento do diagnóstico técnico pelo técnico responsável |
| RN-03 | Vinculação OS–Requisição | Uma requisição de material deve estar obrigatoriamente vinculada a uma Ordem de Serviço em andamento |
| RN-04 | Estoque não-negativo | O estoque de nenhum item poderá assumir quantidade negativa. A liberação só é permitida quando há saldo suficiente |
| RN-05 | Controle de devoluções | Ferramentas emprestadas devem possuir registro obrigatório de devolução. Cautelas sem devolução ficam visíveis no painel do almoxarife |
| RN-06 | Composição mínima de kits | Kits padrão devem possuir pelo menos um item associado em sua composição |
| RN-07 | Prioridade por criticidade | Equipamentos classificados como críticos (`critico = true`) possuem prioridade máxima na fila de manutenção. OS de equipamentos críticos com condição "Parada Total" recebem criticidade "Alta" automaticamente |
| RN-08 | Log automático | Ao concluir uma manutenção, deve ser criado automaticamente um registro no histórico do equipamento contendo data, tipo de falha, técnico responsável, peças utilizadas e parecer técnico |

---

## 5. Matriz de Permissões (Controle de Acesso)

A tabela abaixo define quais funcionalidades cada perfil de acesso pode executar:

| Funcionalidade | Operador | Técnico | Almoxarife | Administrador |
| :--- | :---: | :---: | :---: | :---: |
| Abrir Ordem de Serviço | ✅ | ❌ | ❌ | ❌ |
| Acompanhar Chamados Próprios | ✅ | ❌ | ❌ | ❌ |
| Visualizar Fila Geral de Chamados | ❌ | ✅ | ❌ | ✅ |
| Assumir Ordem de Serviço | ❌ | ✅ | ❌ | ❌ |
| Gerenciar Minhas OS | ❌ | ✅ | ❌ | ❌ |
| Solicitar Peças / Kits | ❌ | ✅ | ❌ | ❌ |
| Finalizar Manutenção | ❌ | ✅ | ❌ | ❌ |
| Visualizar Requisições de Materiais | ❌ | ❌ | ✅ | ❌ |
| Liberar Materiais / Baixar Estoque | ❌ | ❌ | ✅ | ❌ |
| Controlar Cautelas (Empréstimos) | ❌ | ❌ | ✅ | ❌ |
| Confirmar Devoluções | ❌ | ❌ | ✅ | ❌ |
| Visualizar Inventário e Alertas | ❌ | ❌ | ✅ | ✅ |
| Cadastrar Itens no Estoque | ❌ | ❌ | ✅ | ✅ |
| Acessar Dashboard Administrativo | ❌ | ❌ | ❌ | ✅ |
| Reatribuir Técnico em OS | ❌ | ❌ | ❌ | ✅ |
| Filtrar Ordens de Serviço | ❌ | ❌ | ❌ | ✅ |
| Consultar Histórico por Máquina | ❌ | ❌ | ❌ | ✅ |
| Gerenciar Usuários (CRUD) | ❌ | ❌ | ❌ | ✅ |
| Gerenciar Kits Padrão | ❌ | ❌ | ❌ | ✅ |
| Gerenciar Equipamentos | ❌ | ❌ | ❌ | ✅ |

---

## 6. Rastreabilidade: Requisitos × Casos de Uso

| Caso de Uso | Requisitos Relacionados |
| :--- | :--- |
| UC_AbrirOS (Abrir Chamado) | RF-06, RF-07, RF-08, RF-09, RF-10, RF-11 |
| UC_VerChamadosOperador (Acompanhar Status) | RF-12, RF-13 |
| UC_VerFilaChamados (Fila Geral) | RF-14 |
| UC_AssumirOS (Assumir OS) | RF-15, RF-16 |
| UC_GerMinhasOS (Gerenciar Minhas OS) | RF-17 |
| UC_SolicitarMaterial (Solicitar Peças/Kits) | RF-18, RF-19 |
| UC_FinalizarManutencao (Finalizar Manutenção) | RF-20, RF-21, RF-22 |
| UC_VerRequisicoes (Visualizar Requisições) | RF-23 |
| UC_BaixarEntrega (Liberar Materiais) | RF-24, RF-25 |
| UC_GerarCautela (Gerar Cautela) | RF-26 |
| UC_ConfirmarDevolucao (Confirmar Devolução) | RF-28, RF-29 |
| UC_VerInventario (Inventário e Alertas) | RF-30, RF-31 |
| UC_CadastrarItemEstoque (Cadastrar Item) | RF-32, RF-33 |
| UC_AdmDashboard (Dashboard) | RF-34, RF-35 |
| UC_FiltrarOrdens (Filtrar OS) | RF-36 |
| UC_ConsultarHistorico (Histórico Máquina) | RF-37 |
| UC_GerenciarUsuarios (CRUD Usuários) | RF-38 |
| UC_GerenciarKits (Gestão de Kits) | RF-39 |
| UC_GerenciarEquipamentos (Gestão Equipamentos) | RF-40 |

---

## 7. Histórico de Revisões

| Versão | Data | Autor | Descrição |
| :--- | :--- | :--- | :--- |
| 1.0 | Junho/2026 | Equipe PI 1º Sem | Versão inicial do levantamento de requisitos |
