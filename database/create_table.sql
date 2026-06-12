CREATE TABLE usuarios (
    id serial PRIMARY KEY,
    nome varchar(100) NOT NULL,
    email varchar(100) NOT NULL CONSTRAINT usuarios_email_key UNIQUE,
    senha varchar(255) NOT NULL,
    cargo varchar(30) NOT NULL,
    status_usuario varchar(10) DEFAULT 'Ativo',
    data_cadastro timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE equipamentos (
    tag varchar(20) PRIMARY KEY,
    nome varchar(100) NOT NULL,
    setor varchar(50) NOT NULL,
    critico boolean DEFAULT false,
    status_equipamento varchar(20) DEFAULT 'Operando'
);

CREATE TABLE maquinas (
    codigo varchar(20) PRIMARY KEY,
    nome varchar(150) NOT NULL,
    ativa boolean DEFAULT true,
    data_cadastro timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itens_almoxarifado (
    codigo varchar(20) PRIMARY KEY,
    nome varchar(150) NOT NULL,
    categoria varchar(50) NOT NULL,
    qtd_atual integer DEFAULT 0,
    qtd_minima integer DEFAULT 0,
    localizacao varchar(100) NOT NULL,
    data_atualizacao timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kits_padrao (
    id serial PRIMARY KEY,
    nome_kit varchar(100) NOT NULL CONSTRAINT kits_padrao_nome_kit_key UNIQUE,
    descricao text
);

CREATE TABLE entradas_estoque (
    id serial PRIMARY KEY,
    tipo_entrada varchar(20) NOT NULL,
    chave_nfe varchar(44),
    data_entrada timestamp DEFAULT CURRENT_TIMESTAMP,
    almoxarife_id integer NOT NULL
);

CREATE TABLE ordens_servico (
    id serial PRIMARY KEY,
    codigo_os varchar(30) NOT NULL CONSTRAINT ordens_servico_codigo_os_key UNIQUE,
    equipamento_tag varchar(20) NOT NULL,
    tipo_falha varchar(50) NOT NULL,
    descricao_problema text NOT NULL,
    solicitante_id integer NOT NULL,
    tecnico_id integer,
    status_os varchar(50) DEFAULT 'Aberta',
    data_abertura timestamp DEFAULT CURRENT_TIMESTAMP,
    data_inicio_manutencao timestamp,
    data_fechamento timestamp,
    diagnostico_tecnico text,
    FOREIGN KEY (equipamento_tag) REFERENCES equipamentos(tag) ON DELETE RESTRICT,
    FOREIGN KEY (solicitante_id) REFERENCES usuarios(id),
    FOREIGN KEY (tecnico_id) REFERENCES usuarios(id)
);

CREATE TABLE requisicoes_materiais (
    id serial PRIMARY KEY,
    os_id integer NOT NULL,
    tecnico_id integer NOT NULL,
    status_requisicao varchar(30) DEFAULT 'Pendente',
    data_solicitacao timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (os_id) REFERENCES ordens_servico(id) ON DELETE CASCADE,
    FOREIGN KEY (tecnico_id) REFERENCES usuarios(id)
);

CREATE TABLE controle_ferramental (
    id serial PRIMARY KEY,
    codigo_retorno varchar(20) NOT NULL CONSTRAINT controle_ferramental_codigo_retorno_key UNIQUE,
    requisicao_id integer,
    tecnico_id integer NOT NULL,
    item_codigo varchar(20) NOT NULL,
    status_ativo varchar(40) DEFAULT 'Em campo com técnico',
    data_retirada timestamp DEFAULT CURRENT_TIMESTAMP,
    data_devolucao timestamp,
    almoxarife_id integer,
    FOREIGN KEY (item_codigo) REFERENCES itens_almoxarifado(codigo)
);

CREATE TABLE itens_composicao_kit (
    id serial PRIMARY KEY,
    kit_id integer,
    item_codigo varchar(20),
    quantidade_necessaria integer DEFAULT 1,
    FOREIGN KEY (item_codigo) REFERENCES itens_almoxarifado(codigo) ON DELETE CASCADE,
    FOREIGN KEY (kit_id) REFERENCES kits_padrao(id) ON DELETE CASCADE
);

CREATE TABLE itens_entrada_estoque (
    id serial PRIMARY KEY,
    entrada_id integer NOT NULL,
    item_codigo varchar(20) NOT NULL,
    quantidade integer NOT NULL,
    FOREIGN KEY (entrada_id) REFERENCES entradas_estoque(id) ON DELETE CASCADE,
    FOREIGN KEY (item_codigo) REFERENCES itens_almoxarifado(codigo)
);

CREATE TABLE itens_requisicao (
    id serial PRIMARY KEY,
    requisicao_id integer NOT NULL,
    item_codigo varchar(20),
    quantidade_solicitada integer DEFAULT 1,
    tipo_solicitacao varchar(20) NOT NULL,
    FOREIGN KEY (item_codigo) REFERENCES itens_almoxarifado(codigo) ON DELETE SET NULL,
    FOREIGN KEY (requisicao_id) REFERENCES requisicoes_materiais(id) ON DELETE CASCADE
);