# 📄 PRD — Product Requirements Document

## Sistema de Gerenciamento de Manutenção (SGM) — Central de Manutenção 4.0

**Versão:** 1.0  
**Data:** Junho de 2026  
**Autores:** Gustavo Tucci, Vitor Fazano, Paulo Poppes, Samuel Cardia  
**Empresa Parceira:** Dilly Sports — Brejo Santo, Ceará  

---

## 1. Visão Geral

### 1.1 Propósito do Documento

Este documento define **o quê** o Sistema de Gerenciamento de Manutenção (SGM) deve fazer e **por quê** ele precisa existir. Ele serve como guia para alinhar as expectativas entre a equipe de desenvolvimento e os stakeholders, detalhando funcionalidades, público-alvo e restrições, sem especificar detalhes de implementação técnica.

### 1.2 Contexto de Negócio

A **Dilly Sports** é uma empresa do setor calçadista, especializada na fabricação de calçados em couro, fundada em 02 de julho de 2012. A empresa possui sólida experiência no mercado, destacando-se pela tradição, inovação e práticas sustentáveis, sendo responsável pela produção de marcas licenciadas.

A problemática identificada concentra-se no **setor de Manutenção Industrial**, área estratégica para a continuidade do processo produtivo. Diariamente, são geradas no mínimo **20 solicitações de serviços de manutenção**, provenientes de diversos setores da fábrica, como costura, montagem, corte e serigrafia.

### 1.3 Declaração do Problema

> A gestão da manutenção industrial, quando realizada de forma manual e descentralizada, gera falhas no controle das solicitações e na priorização das ordens de serviço. A ausência de acompanhamento eficiente compromete a tomada de decisões e amplia o tempo de resposta. Como consequência, surgem paradas não planejadas, retrabalho, perda de produtividade e aumento dos custos, afetando diretamente a eficiência operacional e a competitividade da empresa.

### 1.4 Visão do Produto

Desenvolver um sistema web que **centralize, organize e rastreie** todo o ciclo de manutenção industrial — desde a abertura de uma Ordem de Serviço (OS) até a devolução das ferramentas utilizadas e o registro histórico do equipamento — permitindo decisões baseadas em dados e otimização dos recursos de manutenção.

---

## 2. Público-Alvo e Personas

O sistema atende a quatro perfis distintos de usuários, cada um com responsabilidades e necessidades específicas dentro do fluxo de manutenção:

### 2.1 Operador (Chão de Fábrica)

| Atributo | Descrição |
| :--- | :--- |
| **Quem é** | Funcionário que opera as máquinas nos setores produtivos (costura, montagem, corte, serigrafia) |
| **Objetivo principal** | Reportar rapidamente problemas identificados nas máquinas e acompanhar a resolução |
| **Nível técnico** | Básico — o sistema deve exigir o mínimo de interações possíveis |
| **Dor atual** | Não sabe se sua solicitação foi recebida, não conhece a prioridade atribuída, não tem retorno do status |

### 2.2 Técnico de Manutenção

| Atributo | Descrição |
| :--- | :--- |
| **Quem é** | Profissional qualificado (mecânico, eletricista, eletromecânico) responsável pela execução dos reparos |
| **Objetivo principal** | Visualizar a fila de chamados priorizada, assumir OS, solicitar materiais e registrar o parecer técnico |
| **Nível técnico** | Intermediário — familiarizado com termos de manutenção industrial |
| **Dor atual** | Recebe demandas desorganizadas, não sabe qual máquina é mais urgente, perde tempo buscando ferramentas sem reserva prévia |

### 2.3 Almoxarife (Estoque)

| Atributo | Descrição |
| :--- | :--- |
| **Quem é** | Responsável pelo estoque de peças, materiais e ferramentas da manutenção |
| **Objetivo principal** | Controlar entradas e saídas de materiais, gerenciar empréstimos (cautelas) de ferramentas e monitorar alertas de reposição |
| **Nível técnico** | Intermediário — habituado com processos de logística interna |
| **Dor atual** | Ferramentas se perdem no chão de fábrica, não há rastreamento de empréstimos, estoque fica desatualizado |

### 2.4 Administrador Geral

| Atributo | Descrição |
| :--- | :--- |
| **Quem é** | Gestor da manutenção ou supervisor com visão estratégica sobre a operação |
| **Objetivo principal** | Acessar indicadores de desempenho (KPIs), auditar o histórico de manutenções e gerenciar cadastros base (usuários, equipamentos, kits) |
| **Nível técnico** | Avançado — capacidade de interpretar dados e relatórios gerenciais |
| **Dor atual** | Não possui indicadores confiáveis, decisões são tomadas por intuição, sem registro histórico para análise de falhas recorrentes |

---

## 3. Escopo Funcional

### 3.1 Módulo do Operador

| ID | Funcionalidade | Descrição |
| :--- | :--- | :--- |
| F01 | Abrir Chamado / Ordem de Serviço | O operador registra uma nova OS selecionando o ativo, informando a condição da máquina e descrevendo o problema |
| F02 | Cálculo Automático de Criticidade | Com base na condição informada (parada total, funcionando com restrição, etc.) e na classificação do equipamento, o sistema define automaticamente a criticidade (Alta, Média, Baixa) |
| F03 | Acompanhar Status de Chamados | O operador visualiza o andamento das OS que ele abriu, com status em tempo real (Pendente, Em Andamento, Concluído) |

### 3.2 Módulo do Técnico

| ID | Funcionalidade | Descrição |
| :--- | :--- | :--- |
| F04 | Visualizar Fila Geral de Chamados | Lista de todas as OS abertas, ordenadas por criticidade, com filtros por setor e tipo de falha |
| F05 | Assumir Ordem de Serviço | O técnico seleciona uma OS da fila e atribui sua execução a si próprio, alterando o status para "Em Andamento" |
| F06 | Gerenciar Minhas OS | Painel exclusivo para o técnico controlar as OS sob sua responsabilidade |
| F07 | Solicitar Peças Avulsas / Kits | O técnico envia requisição ao almoxarifado solicitando materiais ou kits pré-montados |
| F08 | Finalizar Manutenção (Registrar Parecer) | Ao concluir, o técnico registra o diagnóstico técnico e as ações realizadas, encerrando a OS |
| F09 | Geração Automática de Log | Ao finalizar a OS, o sistema registra automaticamente a intervenção no histórico do equipamento |

### 3.3 Módulo do Almoxarife

| ID | Funcionalidade | Descrição |
| :--- | :--- | :--- |
| F10 | Visualizar Requisições de Materiais | Lista de pedidos pendentes realizados pelos técnicos, organizados por ordem de chegada |
| F11 | Liberar Materiais / Baixar e Entregar | O almoxarife aprova a requisição e realiza a entrega, com baixa automática no estoque |
| F12 | Gerar Cautela de Retorno | Criação de um termo de responsabilidade para ferramentas que deverão ser devolvidas |
| F13 | Confirmar Recebimento (Devolução) | Registro da devolução física de ferramentas, com atualização automática do saldo |
| F14 | Visualizar Inventário e Alertas | Painel com quantidade disponível, alertas de estoque baixo e necessidade de reposição |
| F15 | Cadastrar / Entrada de Item no Estoque | Registro de novos materiais adquiridos pela empresa |

### 3.4 Módulo do Administrador

| ID | Funcionalidade | Descrição |
| :--- | :--- | :--- |
| F16 | Dashboard Administrativo | Visualização de indicadores (total de OS por status, criticidade, técnico, etc.) |
| F17 | Reatribuir Técnico Inline | Alteração rápida do técnico responsável por uma OS diretamente pelo dashboard |
| F18 | Filtrar Ordens de Serviço | Busca avançada por data, status, técnico, equipamento e prioridade |
| F19 | Consultar Histórico por Máquina | Acesso cronológico a todas as manutenções, falhas e intervenções de um equipamento |
| F20 | Gerenciar Usuários (CRUD) | Criar, consultar, atualizar e desativar usuários de todos os perfis |
| F21 | Gerenciar Kits de Ferramentas Padrão | Criar e manter conjuntos pré-definidos (Kit Elétrico, Kit Mecânico, Kit Hidráulico) |
| F22 | Gerenciar Ativos / Equipamentos | Cadastrar, atualizar e inativar equipamentos monitorados pelo SGM |

---

## 4. Restrições

### 4.1 Restrição de Infraestrutura Tecnológica

A solução deverá ser compatível com a infraestrutura de TI existente na fábrica, considerando possíveis limitações de internet, servidores locais e dispositivos disponíveis nos setores produtivos. O sistema **não poderá depender exclusivamente de conexão externa contínua** para seu funcionamento.

### 4.2 Restrição de Tempo para Implantação

O prazo para desenvolvimento e implementação do sistema é reduzido, exigindo uma solução simples, funcional e de rápida adoção, sem longos períodos de testes ou paralisações do processo produtivo.

### 4.3 Restrição Operacional

O sistema **não deverá interferir na rotina produtiva** da fábrica. O registro das ordens de manutenção deve ser rápido, evitando burocracia excessiva que possa desestimular o uso ou gerar atrasos na produção.

### 4.4 Restrição de Acessibilidade

O sistema deve funcionar adequadamente em navegadores modernos, sendo acessível por computadores na sala de manutenção, tablets industriais e, pontualmente, smartphones dos técnicos em campo.

---

## 5. Premissas

- A fábrica possui ao menos uma estação de trabalho com navegador moderno acessível pela equipe de manutenção.
- Os operadores de chão de fábrica serão treinados para a abertura de chamados.
- Os dados iniciais de equipamentos, usuários e itens de estoque serão previamente carregados pela equipe de TI.
- A empresa possui um responsável designado para o perfil de Administrador do sistema.

---

## 6. Métricas de Sucesso (KPIs)

| KPI | Descrição | Meta |
| :--- | :--- | :--- |
| **Redução do MTTR** | Tempo médio entre a abertura da OS e a finalização da manutenção | Reduzir em 30% nos primeiros 3 meses |
| **Taxa de OS dentro do SLA** | Percentual de OS resolvidas dentro de prazos aceitáveis por criticidade | ≥ 80% |
| **Índice de Cautelas em Atraso** | Percentual de ferramentas emprestadas e não devolvidas no prazo de 48h | ≤ 5% |
| **Acuracidade do Estoque** | Diferença entre estoque registrado no sistema e contagem física | ≥ 95% |
| **Adesão ao Sistema** | Percentual de OS registradas no SGM vs. total de solicitações realizadas | ≥ 90% |

---

## 7. Fluxo Geral do Produto

```
┌─────────────────┐     ┌──────────────────────┐     ┌────────────────────┐
│   OPERADOR      │     │      SISTEMA         │     │     TÉCNICO        │
│                 │     │                      │     │                    │
│ Identifica      │────▶│ Registra OS          │────▶│ Visualiza fila     │
│ falha na        │     │ Calcula criticidade  │     │ priorizada         │
│ máquina         │     │ automaticamente      │     │                    │
└─────────────────┘     └──────────────────────┘     │ Assume OS          │
                                                     │ Solicita materiais │
                        ┌──────────────────────┐     │ Executa reparo     │
                        │    ALMOXARIFE        │◀────│ Registra parecer   │
                        │                      │     └────────────────────┘
                        │ Libera materiais     │
                        │ Gera cautela         │     ┌────────────────────┐
                        │ Controla devoluções  │     │  ADMINISTRADOR     │
                        │ Monitora estoque     │     │                    │
                        └──────────────────────┘     │ Dashboard KPIs     │
                                                     │ Histórico máquinas │
                                                     │ Gestão de usuários │
                                                     └────────────────────┘
```

---

## 8. Glossário

| Termo | Definição |
| :--- | :--- |
| **OS** | Ordem de Serviço — registro formal de uma solicitação de manutenção |
| **SGM** | Sistema de Gerenciamento de Manutenção |
| **MTTR** | Mean Time To Repair — Tempo Médio de Reparo |
| **Criticidade** | Nível de urgência de uma OS (Alta, Média, Baixa) |
| **Cautela** | Termo de empréstimo de ferramenta ou material com obrigação de devolução |
| **Kit Padrão** | Conjunto pré-montado de ferramentas destinado a um tipo específico de manutenção |
| **Tag** | Código único de identificação de um equipamento no sistema (ex: MQ-01) |
| **3FN** | Terceira Forma Normal — nível de normalização do banco de dados relacional |
