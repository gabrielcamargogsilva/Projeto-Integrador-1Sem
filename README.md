<p align="center">
  <h1 align="center">🏭 Central de Manutenção 4.0 — SGM</h1>
  <p align="center">
    <strong>Sistema de Gerenciamento de Manutenção Industrial</strong><br>
    Digitalização e controle completo de Ordens de Serviço para a fábrica Dilly Sports
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [O Problema](#-o-problema)
- [A Solução](#-a-solução)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Executar](#-como-executar)
- [Documentação](#-documentação)
- [Integrantes](#-integrantes)

---

## 📖 Sobre o Projeto

O **SGM (Sistema de Gerenciamento de Manutenção)** é um projeto desenvolvido como parte do **Projeto Integrador do 1º Semestre** do curso de **Análise e Desenvolvimento de Sistemas (ADS)** no SENAI.

O sistema foi concebido para atender a **Dilly Sports**, uma empresa do setor calçadista localizada em Brejo Santo – Ceará, que gera diariamente no mínimo **20 solicitações de serviços de manutenção** provenientes de setores como costura, montagem, corte e serigrafia.

---

## 🔴 O Problema

A gestão da manutenção industrial na Dilly Sports era realizada de forma **manual e descentralizada**, causando:

- ❌ Dificuldade na **priorização** dos atendimentos por criticidade
- ❌ **Atrasos** no atendimento, prolongando o tempo de inatividade dos equipamentos
- ❌ **Sobrecarga e má distribuição** das equipes técnicas
- ❌ Impossibilidade de cruzar a necessidade da OS com a **disponibilidade do técnico especializado**
- ❌ Ausência de **rastreabilidade** e histórico de manutenções para tomada de decisão

Esses problemas impactavam diretamente o **MTTR (Mean Time To Repair)**, a produtividade da fábrica e os custos operacionais.

---

## ✅ A Solução

O SGM oferece uma **plataforma web completa** que digitaliza e centraliza todo o ciclo de manutenção industrial:

```
Operador identifica falha → Abre OS → Técnico assume → Solicita materiais →
Almoxarifado libera → Manutenção executada → Ferramentas devolvidas → Histórico gerado
```

O sistema opera com **quatro perfis de acesso** (Operador, Técnico, Almoxarife e Administrador), cada um com telas e permissões específicas para seu papel no fluxo de manutenção.

---

## ⚙️ Funcionalidades

| Módulo | Funcionalidades Principais |
| :--- | :--- |
| **Operador** | Abertura de OS com cálculo automático de criticidade, acompanhamento de chamados |
| **Técnico** | Fila priorizada de chamados, gestão de OS próprias, requisição de peças e kits |
| **Almoxarifado** | Liberação de materiais, controle de cautelas (empréstimos), gestão de inventário e alertas de estoque baixo |
| **Administrador** | Dashboard de KPIs, filtro avançado de OS, histórico cronológico por máquina, CRUD de usuários, gestão de equipamentos e kits |

---

## 📁 Estrutura do Projeto

```
Projeto-Integrador-1Sem/
├── README.md                          # Este arquivo
├── ideia.md                           # Descrição original do problema e contexto
├── fluxograma.md                      # Fluxograma do processo (Mermaid)
│
├── database/                          # Camada de dados
│   ├── create_table.sql               # Script DDL - Criação das tabelas (PostgreSQL)
│   ├── views.sql                      # Views analíticas (Painel OS, Alertas, Ranking)
│   ├── docker-compose.yml             # PostgreSQL 15 + pgAdmin via Docker
│   ├── Documentacao-Banco.md          # Documentação completa do banco de dados
│   └── modeloBanco/                   # Modelo Entidade-Relacionamento
│
├── diagramaCasoUso/                   # Modelagem UML
│   ├── diagrama.puml                  # Diagrama de Casos de Uso (PlantUML)
│   ├── Expansão CasoUso.md           # Expansão textual dos casos de uso
│   └── *.png                          # Diagrama renderizado
│
├── front end/                         # Código-fonte da aplicação web
│   ├── login.html / .css / .js        # Tela de login com seleção de perfil
│   ├── mockDb.js                      # Banco simulado em LocalStorage
│   ├── Administrador/                 # Telas do perfil Administrador
│   │   ├── Adm_Painel.*              # Dashboard administrativo
│   │   ├── Adm_Usuarios.*            # CRUD de usuários
│   │   ├── Adm_Historico.*           # Histórico de manutenções
│   │   └── Adm_Kits.*               # Gestão de kits de ferramentas
│   ├── Tecnico/                       # Telas do perfil Técnico
│   │   ├── T_Painel.*                # Fila geral de chamados
│   │   └── T_MinhasOS.*             # Gerenciamento das OS do técnico
│   ├── Almoxarifado/                  # Telas do perfil Almoxarife
│   │   └── Alm_Painel.*             # Painel do almoxarifado
│   └── Usuario/                       # Telas do perfil Operador
│       ├── U_AberturaOS.*            # Abertura de Ordem de Serviço
│       └── U_Chamados.*              # Acompanhamento de chamados
│
└── prototipo/                         # Protótipos visuais das telas
   ├── login/
   ├── administrador/
   ├── tecnico/
   ├── almoxarifado/
   └── solicitante/

```

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Front-End** | HTML5, CSS3, JavaScript (Vanilla) | Interface web responsiva sem frameworks |
| **Persistência (Simulação)** | LocalStorage + `mockDb.js` | Banco relacional simulado para funcionamento 100% offline |
| **Persistência (Física)** | PostgreSQL 15 | SGBDR para produção, normalizado até 3FN |
| **Infraestrutura** | Docker + Docker Compose | Containerização do PostgreSQL e pgAdmin |
| **Modelagem** | PlantUML, Mermaid | Diagramas de caso de uso e fluxogramas |
| **Versionamento** | Git & GitHub | Controle de versão e colaboração |

---

## 🚀 Como Executar

### Modo Offline (Simulação com LocalStorage)

1. Clone o repositório:
   ```bash
   git clone https://github.com/gabrielcamargogsilva/Projeto-Integrador-1Sem.git
   ```
2. Navegue até a pasta do front-end:
   ```bash
   cd Projeto-Integrador-1Sem/front\ end
   ```
3. Abra o arquivo `login.html` em qualquer navegador moderno.

4. Utilize as credenciais de teste:

   | Perfil | Matrícula | Senha |
   | :--- | :--- | :--- |
   | Administrador | `1001` | `123456` |
   | Técnico | `2001` | `senha123` |
   | Almoxarife | `3001` | `senha123` |
   | Operador | `4001` | `senha123` |

### Modo com Banco de Dados (Docker)

1. Certifique-se de ter o [Docker](https://www.docker.com/) instalado.
2. Suba os containers:
   ```bash
   cd database
   docker-compose up -d
   ```
3. Acesse o pgAdmin em `http://localhost:8080` com:
   - **Email:** `admin@admin.com`
   - **Senha:** `senha_segura`
4. Execute os scripts `create_table.sql` e `views.sql` no banco `pi_primeiro_semestre`.

---

## 📚 Documentação

| Documento | Descrição |
| :--- | :--- |
| [PRD — Product Requirements Document](docs/PRD.md) | Visão do produto, público-alvo, escopo e restrições |
| [Levantamento de Requisitos](docs/Levantamento_Requisitos.md) | Requisitos funcionais, não-funcionais e regras de negócio |
| [Documentação do Banco de Dados](database/Documentacao-Banco.md) | Dicionário de dados, DDL e relacionamentos |
| [Wiki — Home](docs/wiki/Home.md) | Hub central da documentação |
| [Manual do Usuário](docs/wiki/Manual_do_Usuario.md) | Guia prático por perfil de acesso |
| [Arquitetura e Dados](docs/wiki/Arquitetura_e_Dados.md) | Arquitetura técnica e modelo de persistência |
| [Guia de Instalação](docs/wiki/Guia_de_Instalacao.md) | Setup completo do ambiente |

---

## 👥 Integrantes

| Foto | Nome | GitHub | Função no Projeto |
| :---: | :--- | :---: | :--- |
| <img src="https://github.com/GustavoTucci.png" width="50px"> | **Gustavo Tucci** | [GustavoTucci](https://github.com/GustavoTucci) | Full-Stack, Documentação |
| <img src="https://github.com/vfazano.png" width="50px"> | **Vitor Fazano** | [vfazano](https://github.com/vfazano) | Banco de Dados, Documentação |
| <img src="https://github.com/paulopoppes-hash.png" width="50px"> | **Paulo Poppes** | [paulopoppes-hash](https://github.com/paulopoppes-hash) | Front-End |
| <img src="https://github.com/ScardiaSam34.png" width="50px"> | **Samuel Cardia** | [ScardiaSam34](https://github.com/ScardiaSam34) | Front-End |

---

## 🎓 Contexto Acadêmico

- **Curso:** Análise e Desenvolvimento de Sistemas (ADS)
- **Instituição:** SENAI
- **Semestre:** 1º Semestre
- **Empresa Parceira:** Dilly Sports — Brejo Santo, Ceará
- **Vigência:** 02/03/2026 a 02/03/2028

