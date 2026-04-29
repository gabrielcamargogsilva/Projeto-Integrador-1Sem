
--CENTRAL DE MANUTENÇÃO 4.0 — Dilly Sports


-- TABELA 1: SETOR
CREATE TABLE setor (
    id_setor    SERIAL       PRIMARY KEY,
    nome        VARCHAR(100) NOT NULL,
    descricao   VARCHAR(255),
    ativo       BOOLEAN      NOT NULL DEFAULT TRUE,
    criado_em   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- TABELA 2: EQUIPAMENTO
CREATE TABLE equipamento (
    id_equipamento  SERIAL      PRIMARY KEY,
    id_setor        INT         NOT NULL REFERENCES setor(id_setor),
    nome            VARCHAR(150) NOT NULL,
    modelo          VARCHAR(100),
    numero_serie    VARCHAR(100),
    criticidade     VARCHAR(10) NOT NULL
                    CHECK (criticidade IN ('alta', 'media', 'baixa')),
    data_instalacao DATE,
    ativo           BOOLEAN     NOT NULL DEFAULT TRUE,
    criado_em       TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- TABELA 3: USUARIO
CREATE TABLE usuario (
    id_usuario  SERIAL       PRIMARY KEY,
    nome        VARCHAR(150) NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    senha_hash  VARCHAR(255) NOT NULL,
    perfil      VARCHAR(20)  NOT NULL
                CHECK (perfil IN ('solicitante', 'tecnico', 'gestor')),
    ativo       BOOLEAN      NOT NULL DEFAULT TRUE,
    criado_em   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- TABELA 4: TECNICO
CREATE TABLE tecnico (
    id_tecnico    SERIAL      PRIMARY KEY,
    id_usuario    INT         NOT NULL UNIQUE REFERENCES usuario(id_usuario),
    especialidade VARCHAR(80) NOT NULL
                  CHECK (especialidade IN ('eletricista', 'mecanico', 'eletromecânico', 'hidraulico', 'geral')),
    turno         VARCHAR(10) NOT NULL
                  CHECK (turno IN ('manha', 'tarde', 'noite')),
    disponivel    BOOLEAN     NOT NULL DEFAULT TRUE,
    criado_em     TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- TABELA 5: ORDEM_SERVICO
CREATE TABLE ordem_servico (
    id_os            SERIAL       PRIMARY KEY,
    id_setor         INT          NOT NULL REFERENCES setor(id_setor),
    id_equipamento   INT          NOT NULL REFERENCES equipamento(id_equipamento),
    id_solicitante   INT          NOT NULL REFERENCES usuario(id_usuario),
    id_tecnico       INT          REFERENCES tecnico(id_tecnico), -- pode ser NULL até ser designado
    tipo_servico     VARCHAR(20)  NOT NULL
                     CHECK (tipo_servico IN ('corretiva', 'preventiva', 'preditiva')),
    prioridade       VARCHAR(10)  NOT NULL
                     CHECK (prioridade IN ('urgente', 'alta', 'media', 'baixa')),
    status           VARCHAR(20)  NOT NULL DEFAULT 'aberta'
                     CHECK (status IN ('aberta', 'aguardando_tecnico', 'em_atendimento', 'concluida', 'cancelada')),
    especialidade_necessaria VARCHAR(80), -- ex: eletricista, mecânico
    descricao        TEXT         NOT NULL,
    causa_raiz       TEXT,        -- preenchido ao concluir
    solucao_aplicada TEXT,        -- preenchido ao concluir
    aberta_em        TIMESTAMP    NOT NULL DEFAULT NOW(),
    encerrada_em     TIMESTAMP,   -- preenchido ao concluir
    tempo_reparo_min INT          -- calculado automaticamente ao encerrar
);

-- TABELA 6: HISTORICO_OS
CREATE TABLE historico_os (
    id_historico    SERIAL       PRIMARY KEY,
    id_os           INT          NOT NULL REFERENCES ordem_servico(id_os),
    id_usuario      INT          NOT NULL REFERENCES usuario(id_usuario),
    status_anterior VARCHAR(20)  NOT NULL,
    status_novo     VARCHAR(20)  NOT NULL,
    observacao      TEXT,
    alterado_em     TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- TABELA 7: FERRAMENTA
CREATE TABLE ferramenta (
    id_ferramenta       SERIAL       PRIMARY KEY,
    nome                VARCHAR(150) NOT NULL,
    codigo              VARCHAR(50)  NOT NULL UNIQUE,
    quantidade_total    INT          NOT NULL CHECK (quantidade_total >= 0),
    quantidade_disponivel INT        NOT NULL CHECK (quantidade_disponivel >= 0),
    criado_em           TIMESTAMP    NOT NULL DEFAULT NOW(),
    -- garante que disponível nunca ultrapassa o total
    CONSTRAINT chk_qtd_ferramenta CHECK (quantidade_disponivel <= quantidade_total)
);

-- TABELA 8: EMPRESTIMO_FERRAMENTA
CREATE TABLE emprestimo_ferramenta (
    id_emprestimo   SERIAL      PRIMARY KEY,
    id_os           INT         NOT NULL REFERENCES ordem_servico(id_os),
    id_ferramenta   INT         NOT NULL REFERENCES ferramenta(id_ferramenta),
    id_tecnico      INT         NOT NULL REFERENCES tecnico(id_tecnico),
    status          VARCHAR(15) NOT NULL DEFAULT 'retirada'
                    CHECK (status IN ('retirada', 'devolvida')),
    retirada_em     TIMESTAMP   NOT NULL DEFAULT NOW(),
    devolvida_em    TIMESTAMP   -- NULL enquanto ainda com o técnico
);

-- TABELA 9: ESTOQUE_PECA
CREATE TABLE estoque_peca (
    id_peca         SERIAL       PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL,
    codigo          VARCHAR(50)  NOT NULL UNIQUE,
    unidade         VARCHAR(20)  NOT NULL
                    CHECK (unidade IN ('unidade', 'metro', 'litro', 'kg', 'par', 'rolo')),
    quantidade      INT          NOT NULL DEFAULT 0 CHECK (quantidade >= 0),
    estoque_minimo  INT          NOT NULL DEFAULT 1 CHECK (estoque_minimo >= 0),
    criado_em       TIMESTAMP    NOT NULL DEFAULT NOW()
);


-- DADOS INICIAIS — para testar o sistema

-- Setores
INSERT INTO setor (nome, descricao) VALUES
    ('Costura',    'Setor de costura de calçados'),
    ('Montagem',   'Setor de montagem e acabamento'),
    ('Corte',      'Setor de corte de couro e materiais'),
    ('Serigrafia', 'Setor de impressão e serigrafia');

-- Equipamentos
INSERT INTO equipamento (id_setor, nome, modelo, numero_serie, criticidade, data_instalacao) VALUES
    (1, 'Máquina de Costura Singer #1',  'Singer 591',   'SNG-001', 'alta',  '2018-03-10'),
    (1, 'Máquina de Costura Singer #2',  'Singer 591',   'SNG-002', 'alta',  '2018-03-10'),
    (1, 'Máquina de Costura Pfaff #1',   'Pfaff 1246',   'PFF-001', 'media', '2019-07-22'),
    (2, 'Prensa Hidráulica #1',          'Hidro Press X', 'PHP-001', 'alta',  '2017-01-15'),
    (2, 'Esteira de Montagem #1',        'EstMon 200',   'EST-001', 'media', '2020-05-08'),
    (3, 'Serra de Corte #1',             'Serra SC-50',  'SER-001', 'alta',  '2016-11-30'),
    (4, 'Impressora Serigrafia #1',      'SerPrint 400', 'IMP-001', 'media', '2021-02-14'),
    (4, 'Impressora Serigrafia #2',      'SerPrint 400', 'IMP-002', 'baixa', '2021-02-14');

-- Usuários (senha: "senha123" — em produção use bcrypt real)
INSERT INTO usuario (nome, email, senha_hash, perfil) VALUES
    ('Ana Costa',    'ana.costa@dilly.com.br',    '$2b$12$hash_gestor_ana',    'gestor'),
    ('João Silva',   'joao.silva@dilly.com.br',   '$2b$12$hash_solic_joao',   'solicitante'),
    ('Maria Souza',  'maria.souza@dilly.com.br',  '$2b$12$hash_solic_maria',  'solicitante'),
    ('Carlos Lima',  'carlos.lima@dilly.com.br',  '$2b$12$hash_tec_carlos',   'tecnico'),
    ('Pedro Melo',   'pedro.melo@dilly.com.br',   '$2b$12$hash_tec_pedro',    'tecnico'),
    ('Rita Faria',   'rita.faria@dilly.com.br',   '$2b$12$hash_tec_rita',     'tecnico');

-- Técnicos
INSERT INTO tecnico (id_usuario, especialidade, turno) VALUES
    (4, 'eletricista', 'manha'),
    (5, 'mecanico',    'tarde'),
    (6, 'geral',       'manha');

-- Ferramentas
INSERT INTO ferramenta (nome, codigo, quantidade_total, quantidade_disponivel) VALUES
    ('Multímetro digital',   'MULT-01', 3, 3),
    ('Chave torque 3/8"',    'CHRQ-01', 5, 5),
    ('Alicate universal',    'ALIC-01', 8, 8),
    ('Chave de fenda Ph1',   'CFPH-01', 10, 10),
    ('Osciloscópio portátil','OSCI-01', 1, 1);

-- Estoque de peças
INSERT INTO estoque_peca (nome, codigo, unidade, quantidade, estoque_minimo) VALUES
    ('Correia dentada T5',  'COR-T5',  'unidade', 12, 4),
    ('Rolamento 6205 2RS',  'ROL-6205','unidade',  6, 3),
    ('Fusível 10A',         'FUS-10A', 'unidade', 30, 10),
    ('Óleo lubrificante',   'OLE-LUB', 'litro',    5, 2),
    ('Agulha 134R #80',     'AGU-80',  'unidade', 50, 20);