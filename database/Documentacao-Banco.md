
# 🗄️ Documentação do Banco de Dados

## Sistema de Gerenciamento de Manutenção (SGM) - Dilly Sports

### Objetivo

O banco de dados do Sistema de Gerenciamento de Manutenção (SGM) foi desenvolvido para controlar e rastrear todo o ciclo de manutenção industrial da Dilly Sports, desde a abertura de uma Ordem de Serviço (OS) até a devolução das ferramentas utilizadas e atualização do histórico do equipamento.

A estrutura foi projetada para atender quatro áreas principais:

* Operação Industrial
* Manutenção
* Almoxarifado
* Administração

---

# Modelo de Dados

## Entidades Principais

| Entidade              | Finalidade                                  |
| --------------------- | ------------------------------------------- |
| Usuarios              | Controle de acesso ao sistema               |
| Equipamentos          | Cadastro dos ativos industriais             |
| Ordens_Servico        | Registro das manutenções                    |
| Requisicoes_Materiais | Solicitação de peças e ferramentas          |
| Itens_Requisicao      | Itens solicitados em cada requisição        |
| Controle_Ferramental  | Controle de empréstimos e devoluções        |
| Itens_Almoxarifado    | Estoque de peças e ferramentas              |
| Entradas_Estoque      | Registro de entradas de materiais           |
| Itens_Entrada_Estoque | Itens pertencentes a uma entrada            |
| Kits_Padrao           | Conjunto padrão de ferramentas              |
| Itens_Composicao_Kit  | Itens que compõem cada kit                  |
| Maquinas              | Cadastro complementar de ativos industriais |

---

# Dicionário de Dados

## Tabela: usuarios

Responsável pelo gerenciamento dos acessos ao sistema.

| Campo          | Tipo         | Restrição |
| -------------- | ------------ | --------- |
| id             | INT          | PK        |
| nome           | VARCHAR(100) | NOT NULL  |
| email          | VARCHAR(150) | UNIQUE    |
| senha          | VARCHAR(255) | NOT NULL  |
| cargo          | VARCHAR(50)  | NOT NULL  |
| status_usuario | VARCHAR(20)  | NOT NULL  |
| data_cadastro  | TIMESTAMP    | NOT NULL  |

---

## Tabela: equipamentos

Cadastro dos equipamentos monitorados pela manutenção.

| Campo              | Tipo         | Restrição |
| ------------------ | ------------ | --------- |
| tag                | VARCHAR(20)  | PK        |
| nome               | VARCHAR(100) | NOT NULL  |
| setor              | VARCHAR(50)  | NOT NULL  |
| critico            | BOOLEAN      | NOT NULL  |
| status_equipamento | VARCHAR(30)  | NOT NULL  |

---

## Tabela: maquinas

Cadastro dos ativos produtivos.

| Campo         | Tipo         | Restrição |
| ------------- | ------------ | --------- |
| codigo        | VARCHAR(20)  | PK        |
| nome          | VARCHAR(100) | NOT NULL  |
| ativa         | BOOLEAN      | NOT NULL  |
| data_cadastro | TIMESTAMP    | NOT NULL  |

---

## Tabela: itens_almoxarifado

Controla o estoque físico da empresa.

| Campo            | Tipo           |
| ---------------- | -------------- |
| codigo           | VARCHAR(30) PK |
| nome             | VARCHAR(100)   |
| categoria        | VARCHAR(50)    |
| qtd_atual        | INT            |
| qtd_minima       | INT            |
| localizacao      | VARCHAR(50)    |
| data_atualizacao | TIMESTAMP      |

---

## Tabela: ordens_servico

Armazena todas as intervenções de manutenção.

| Campo                  | Tipo               |
| ---------------------- | ------------------ |
| id                     | INT PK             |
| codigo_os              | VARCHAR(20) UNIQUE |
| equipamento_tag        | VARCHAR(20) FK     |
| tipo_falha             | VARCHAR(50)        |
| descricao_problema     | TEXT               |
| solicitante_id         | INT FK             |
| tecnico_id             | INT FK             |
| status_os              | VARCHAR(30)        |
| data_abertura          | TIMESTAMP          |
| data_inicio_manutencao | TIMESTAMP          |
| data_fechamento        | TIMESTAMP          |
| diagnostico_tecnico    | TEXT               |

---

## Tabela: requisicoes_materiais

Solicitações realizadas pelos técnicos.

| Campo             | Tipo        |
| ----------------- | ----------- |
| id                | INT PK      |
| os_id             | INT FK      |
| tecnico_id        | INT FK      |
| status_requisicao | VARCHAR(30) |
| data_solicitacao  | TIMESTAMP   |

---

## Tabela: itens_requisicao

Itens pertencentes às requisições.

| Campo                 | Tipo           |
| --------------------- | -------------- |
| id                    | INT PK         |
| requisicao_id         | INT FK         |
| item_codigo           | VARCHAR(30) FK |
| quantidade_solicitada | INT            |
| tipo_solicitacao      | VARCHAR(20)    |

---

## Tabela: controle_ferramental

Controla cautelas e devoluções de ferramentas.

| Campo          | Tipo               |
| -------------- | ------------------ |
| id             | INT PK             |
| codigo_retorno | VARCHAR(30) UNIQUE |
| requisicao_id  | INT FK             |
| tecnico_id     | INT FK             |
| item_codigo    | VARCHAR(30) FK     |
| status_ativo   | VARCHAR(20)        |
| data_retirada  | TIMESTAMP          |
| data_devolucao | TIMESTAMP          |
| almoxarife_id  | INT FK             |

---

## Tabela: kits_padrao

Kits pré-configurados utilizados nas manutenções.

| Campo     | Tipo         |
| --------- | ------------ |
| id        | INT PK       |
| nome_kit  | VARCHAR(100) |
| descricao | TEXT         |

---

## Tabela: itens_composicao_kit

Relaciona os itens de cada kit.

| Campo                 | Tipo           |
| --------------------- | -------------- |
| id                    | INT PK         |
| kit_id                | INT FK         |
| item_codigo           | VARCHAR(30) FK |
| quantidade_necessaria | INT            |

---

## Tabela: entradas_estoque

Registro de entradas de materiais.

| Campo         | Tipo        |
| ------------- | ----------- |
| id            | INT PK      |
| tipo_entrada  | VARCHAR(30) |
| chave_nfe     | VARCHAR(50) |
| data_entrada  | TIMESTAMP   |
| almoxarife_id | INT FK      |

---

## Tabela: itens_entrada_estoque

Itens associados às entradas.

| Campo       | Tipo           |
| ----------- | -------------- |
| id          | INT PK         |
| entrada_id  | INT FK         |
| item_codigo | VARCHAR(30) FK |
| quantidade  | INT            |

---

# Relacionamentos

## Usuários e Ordens de Serviço

* Um usuário pode abrir várias Ordens de Serviço.
* Um técnico pode atender várias Ordens de Serviço.

Cardinalidade:

```text
USUARIOS (1) ---- (N) ORDENS_SERVICO
```

---

## Equipamentos e Ordens de Serviço

Um equipamento pode possuir várias intervenções ao longo de sua vida útil.

```text
EQUIPAMENTOS (1) ---- (N) ORDENS_SERVICO
```

---

## Ordem de Serviço e Requisição

Uma Ordem de Serviço pode gerar várias requisições de materiais.

```text
ORDENS_SERVICO (1) ---- (N) REQUISICOES_MATERIAIS
```

---

## Requisição e Itens

Uma requisição possui vários itens.

```text
REQUISICOES_MATERIAIS (1) ---- (N) ITENS_REQUISICAO
```

---

## Kit e Composição

Um kit é formado por diversos itens.

```text
KITS_PADRAO (1) ---- (N) ITENS_COMPOSICAO_KIT
```

---

## Entrada de Estoque

Uma entrada pode registrar diversos materiais.

```text
ENTRADAS_ESTOQUE (1) ---- (N) ITENS_ENTRADA_ESTOQUE
```

---

# Regras de Negócio

### RN01

Toda Ordem de Serviço deve possuir um solicitante válido.

### RN02

Uma OS somente poderá ser finalizada após preenchimento do diagnóstico técnico.

### RN03

Uma requisição de material deve estar vinculada a uma Ordem de Serviço.

### RN04

O estoque não poderá assumir quantidade negativa.

### RN05

Ferramentas emprestadas devem possuir registro de devolução.

### RN06

Kits padrão devem possuir pelo menos um item associado.

### RN07

Equipamentos classificados como críticos possuem prioridade máxima na fila de manutenção.

### RN08

Ao concluir uma manutenção, deve ser criado automaticamente um registro no histórico do equipamento.

---

# Fluxo de Persistência de Dados

```text
Operador
    ↓
Ordens de Serviço
    ↓
Técnico assume OS
    ↓
Requisição de Materiais
    ↓
Baixa de Estoque
    ↓
Controle de Ferramental
    ↓
Conclusão da Manutenção
    ↓
Histórico da Máquina
```

---

# Tecnologia de Persistência

O sistema utiliza o navegador como mecanismo de armazenamento local através do LocalStorage, simulando um banco relacional.

Prefixo padrão:

```text
sgm_
```

Exemplos:

```text
sgm_usuarios
sgm_equipamentos
sgm_ordens_servico
sgm_requisicoes_materiais
sgm_controle_ferramental
sgm_itens_almoxarifado
```

Essa abordagem permite funcionamento totalmente offline, sem dependência de servidores externos ou banco de dados físico.

Como você utilizou o **Neon PostgreSQL** durante o desenvolvimento/modelagem do banco, vale a pena atualizar a seção de tecnologia de persistência para refletir isso corretamente.

Você pode substituir a seção **"Tecnologia de Persistência"** por esta:

---

🗄️ Sistema Gerenciador de Banco de Dados (SGBD)

O banco de dados do Sistema de Gerenciamento de Manutenção (SGM) foi desenvolvido utilizando o PostgreSQL, um Sistema Gerenciador de Banco de Dados Relacional (SGBDR) amplamente utilizado em aplicações corporativas devido à sua robustez, segurança e desempenho.

Motivos da Escolha

O PostgreSQL foi escolhido por oferecer:

Suporte a relacionamentos complexos.
Integridade referencial através de chaves primárias e estrangeiras.
Alto desempenho para consultas e relatórios.
Segurança e controle de acesso aos dados.
Escalabilidade para futuras expansões do sistema.
Compatibilidade com SQL padrão.
Estrutura do Banco de Dados

O banco foi modelado seguindo os princípios da modelagem relacional e normalização de dados, sendo composto pelas seguintes tabelas principais:

Tabela	Função
usuarios	Controle de acesso ao sistema
equipamentos	Cadastro dos equipamentos industriais
maquinas	Cadastro dos ativos produtivos
ordens_servico	Controle das Ordens de Serviço
requisicoes_materiais	Solicitações de materiais e ferramentas
itens_requisicao	Itens pertencentes às requisições
itens_almoxarifado	Controle de estoque
controle_ferramental	Controle de empréstimos e devoluções
kits_padrao	Cadastro de kits de ferramentas
itens_composicao_kit	Composição dos kits
entradas_estoque	Registro de entradas no estoque
itens_entrada_estoque	Itens de cada entrada de estoque
Modelo Relacional

O banco de dados foi estruturado com relacionamentos do tipo:

Um para Muitos (1:N)
Muitos para Muitos (N:N), implementados através de tabelas associativas.
Exemplos
USUARIOS (1) → (N) ORDENS_SERVICO

ORDENS_SERVICO (1) → (N) REQUISICOES_MATERIAIS

REQUISICOES_MATERIAIS (1) → (N) ITENS_REQUISICAO

KITS_PADRAO (1) → (N) ITENS_COMPOSICAO_KIT

ENTRADAS_ESTOQUE (1) → (N) ITENS_ENTRADA_ESTOQUE
Integridade dos Dados

Para garantir a consistência das informações foram utilizadas:

Chaves Primárias (PK)

Responsáveis por identificar unicamente cada registro.

Exemplos:

usuarios.id
ordens_servico.id
requisicoes_materiais.id
kits_padrao.id
Chaves Estrangeiras (FK)

Responsáveis pela integridade referencial entre as tabelas.

Exemplos:

ordens_servico.equipamento_tag
ordens_servico.solicitante_id
ordens_servico.tecnico_id

requisicoes_materiais.os_id

itens_requisicao.requisicao_id

controle_ferramental.item_codigo
Regras Implementadas no Banco
Uma Ordem de Serviço deve estar vinculada a um equipamento.
Uma requisição deve estar vinculada a uma Ordem de Serviço.
Um item requisitado deve existir no almoxarifado.
Um kit deve possuir pelo menos um item associado.
O estoque não pode possuir quantidade negativa.
Toda devolução de ferramenta deve ser registrada.
Equipamentos críticos possuem prioridade no fluxo de manutenção.
Banco de Dados do Projeto

SGBD Utilizado: PostgreSQL
Modelo: Relacional
Normalização: Até a 3ª Forma Normal (3FN)
Quantidade de Tabelas: 12
Objetivo: Controle completo do ciclo de manutenção industrial, almoxarifado, ferramental e rastreabilidade das Ordens de Serviço.
📜 Script de Criação do Banco de Dados (DDL)

O banco de dados foi implementado utilizando PostgreSQL, com tabelas normalizadas e relacionamentos baseados no modelo entidade-relacionamento desenvolvido para o Sistema de Gerenciamento de Manutenção (SGM).

Criação do Banco
CREATE DATABASE sgm_dillysports;
Tabela: usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    status_usuario VARCHAR(20) DEFAULT 'ATIVO',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Tabela: equipamentos
CREATE TABLE equipamentos (
    tag VARCHAR(20) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    setor VARCHAR(100) NOT NULL,
    critico BOOLEAN DEFAULT FALSE,
    status_equipamento VARCHAR(30) NOT NULL
);
Tabela: maquinas
CREATE TABLE maquinas (
    codigo VARCHAR(20) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    ativa BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Tabela: itens_almoxarifado
CREATE TABLE itens_almoxarifado (
    codigo VARCHAR(30) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    qtd_atual INTEGER NOT NULL DEFAULT 0,
    qtd_minima INTEGER NOT NULL DEFAULT 0,
    localizacao VARCHAR(50),
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Tabela: ordens_servico
CREATE TABLE ordens_servico (
    id SERIAL PRIMARY KEY,
    codigo_os VARCHAR(20) UNIQUE NOT NULL,
    equipamento_tag VARCHAR(20) NOT NULL,
    tipo_falha VARCHAR(50),
    descricao_problema TEXT,
    solicitante_id INTEGER NOT NULL,
    tecnico_id INTEGER,
    status_os VARCHAR(30) DEFAULT 'ABERTA',
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_inicio_manutencao TIMESTAMP,
    data_fechamento TIMESTAMP,
    diagnostico_tecnico TEXT,

    CONSTRAINT fk_os_equipamento
        FOREIGN KEY (equipamento_tag)
        REFERENCES equipamentos(tag),

    CONSTRAINT fk_os_solicitante
        FOREIGN KEY (solicitante_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_os_tecnico
        FOREIGN KEY (tecnico_id)
        REFERENCES usuarios(id)
);
Tabela: requisicoes_materiais
CREATE TABLE requisicoes_materiais (
    id SERIAL PRIMARY KEY,
    os_id INTEGER NOT NULL,
    tecnico_id INTEGER NOT NULL,
    status_requisicao VARCHAR(30) DEFAULT 'PENDENTE',
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_req_os
        FOREIGN KEY (os_id)
        REFERENCES ordens_servico(id),

    CONSTRAINT fk_req_tecnico
        FOREIGN KEY (tecnico_id)
        REFERENCES usuarios(id)
);
Tabela: itens_requisicao
CREATE TABLE itens_requisicao (
    id SERIAL PRIMARY KEY,
    requisicao_id INTEGER NOT NULL,
    item_codigo VARCHAR(30) NOT NULL,
    quantidade_solicitada INTEGER NOT NULL,
    tipo_solicitacao VARCHAR(20),

    CONSTRAINT fk_item_req
        FOREIGN KEY (requisicao_id)
        REFERENCES requisicoes_materiais(id),

    CONSTRAINT fk_item_almox
        FOREIGN KEY (item_codigo)
        REFERENCES itens_almoxarifado(codigo)
);
Tabela: controle_ferramental
CREATE TABLE controle_ferramental (
    id SERIAL PRIMARY KEY,
    codigo_retorno VARCHAR(30) UNIQUE,
    requisicao_id INTEGER,
    tecnico_id INTEGER,
    item_codigo VARCHAR(30),
    status_ativo VARCHAR(20),
    data_retirada TIMESTAMP,
    data_devolucao TIMESTAMP,
    almoxarife_id INTEGER,

    CONSTRAINT fk_cf_req
        FOREIGN KEY (requisicao_id)
        REFERENCES requisicoes_materiais(id),

    CONSTRAINT fk_cf_tecnico
        FOREIGN KEY (tecnico_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_cf_item
        FOREIGN KEY (item_codigo)
        REFERENCES itens_almoxarifado(codigo),

    CONSTRAINT fk_cf_almoxarife
        FOREIGN KEY (almoxarife_id)
        REFERENCES usuarios(id)
);
Tabela: kits_padrao
CREATE TABLE kits_padrao (
    id SERIAL PRIMARY KEY,
    nome_kit VARCHAR(100) NOT NULL,
    descricao TEXT
);
Tabela: itens_composicao_kit
CREATE TABLE itens_composicao_kit (
    id SERIAL PRIMARY KEY,
    kit_id INTEGER NOT NULL,
    item_codigo VARCHAR(30) NOT NULL,
    quantidade_necessaria INTEGER NOT NULL,

    CONSTRAINT fk_kit
        FOREIGN KEY (kit_id)
        REFERENCES kits_padrao(id),

    CONSTRAINT fk_item_kit
        FOREIGN KEY (item_codigo)
        REFERENCES itens_almoxarifado(codigo)
);
Tabela: entradas_estoque
CREATE TABLE entradas_estoque (
    id SERIAL PRIMARY KEY,
    tipo_entrada VARCHAR(30) NOT NULL,
    chave_nfe VARCHAR(50),
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    almoxarife_id INTEGER,

    CONSTRAINT fk_entrada_almox
        FOREIGN KEY (almoxarife_id)
        REFERENCES usuarios(id)
);
Tabela: itens_entrada_estoque
CREATE TABLE itens_entrada_estoque (
    id SERIAL PRIMARY KEY,
    entrada_id INTEGER NOT NULL,
    item_codigo VARCHAR(30) NOT NULL,
    quantidade INTEGER NOT NULL,

    CONSTRAINT fk_entrada_item
        FOREIGN KEY (entrada_id)
        REFERENCES entradas_estoque(id),

    CONSTRAINT fk_item_entrada
        FOREIGN KEY (item_codigo)
        REFERENCES itens_almoxarifado(codigo)
);
🔍 Consultas SQL Importantes
Ordens de Serviço em Aberto
SELECT
    codigo_os,
    status_os,
    data_abertura
FROM ordens_servico
WHERE status_os <> 'CONCLUIDA';
Histórico de Manutenções por Equipamento
SELECT
    e.nome,
    os.codigo_os,
    os.data_abertura,
    os.data_fechamento,
    os.diagnostico_tecnico
FROM equipamentos e
INNER JOIN ordens_servico os
ON e.tag = os.equipamento_tag;
Itens com Estoque Baixo
SELECT
    codigo,
    nome,
    qtd_atual,
    qtd_minima
FROM itens_almoxarifado
WHERE qtd_atual <= qtd_minima;
Quantidade de OS por Técnico
SELECT
    u.nome,
    COUNT(os.id) AS total_os
FROM usuarios u
INNER JOIN ordens_servico os
ON u.id = os.tecnico_id
GROUP BY u.nome;
📈 Considerações Técnicas

O banco de dados foi desenvolvido seguindo os princípios da modelagem relacional e da Terceira Forma Normal (3FN), reduzindo redundâncias e garantindo integridade dos dados através de chaves primárias, chaves estrangeiras e restrições de unicidade.

A estrutura suporta a rastreabilidade completa das Ordens de Serviço, controle de estoque, gerenciamento de ferramental e histórico de manutenção dos equipamentos da Dilly Sports, permitindo futuras integrações com sistemas ERP, BI e indicadores de manutenção industrial.

