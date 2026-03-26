-- ==========================================================
-- PROJETO: CENTRAL DE MANUTENÇÃO 4.0 - DILLY SPORTS
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS (POSTGRESQL)
-- ==========================================================

-- 1. Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(30) NOT NULL, -- 'Operador', 'Tecnico', 'Gestor'
    setor VARCHAR(50) NOT NULL   -- 'Costura', 'Montagem', 'Corte', 'Serigrafia'
);

-- 2. Tabela de Máquinas
CREATE TABLE IF NOT EXISTS maquinas (
    id_maquina SERIAL PRIMARY KEY,
    codigo_tag VARCHAR(20) UNIQUE NOT NULL, -- Ex: COST-001
    nome_maquina VARCHAR(100) NOT NULL,
    setor VARCHAR(50) NOT NULL,
    criticidade VARCHAR(20) DEFAULT 'Média' -- 'Baixa', 'Média', 'Alta'
);

-- 3. Tabela de Estoque de Consumíveis
CREATE TABLE IF NOT EXISTS estoque_itens (
    id_item SERIAL PRIMARY KEY,
    nome_item VARCHAR(100) NOT NULL,
    quantidade_atual INTEGER DEFAULT 0,
    quantidade_minima INTEGER DEFAULT 5
);

-- 4. Tabela de Ferramentas (Ativos fixos)
CREATE TABLE IF NOT EXISTS ferramentas (
    id_ferramenta SERIAL PRIMARY KEY,
    nome_ferramenta VARCHAR(100) NOT NULL,
    codigo_patrimonio VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'Disponível' -- 'Disponível', 'Em Uso', 'Manutenção'
);

-- 5. Tabela de Ordens de Serviço (OS)
CREATE TABLE IF NOT EXISTS ordens_servico (
    id_os SERIAL PRIMARY KEY,
    id_maquina INTEGER NOT NULL,
    id_solicitante INTEGER NOT NULL,
    id_tecnico INTEGER,
    descricao_problema TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'Aberta', -- 'Aberta', 'Em Atendimento', 'Concluída', 'Cancelada'
    prioridade VARCHAR(20) DEFAULT '3-Planejada', -- '1-Emergência', '2-Urgente', '3-Planejada'
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP,
    diagnostico_tecnico TEXT,
    
    CONSTRAINT fk_maquina FOREIGN KEY (id_maquina) REFERENCES maquinas(id_maquina),
    CONSTRAINT fk_solicitante FOREIGN KEY (id_solicitante) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_tecnico FOREIGN KEY (id_tecnico) REFERENCES usuarios(id_usuario)
);

-- 6. Tabela de Movimentação de Ferramentas
CREATE TABLE IF NOT EXISTS movimentacao_ferramentas (
    id_movimentacao SERIAL PRIMARY KEY,
    id_ferramenta INTEGER NOT NULL,
    id_tecnico INTEGER NOT NULL,
    id_os INTEGER,
    data_saida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_devolucao TIMESTAMP,
    
    CONSTRAINT fk_ferramenta FOREIGN KEY (id_ferramenta) REFERENCES ferramentas(id_ferramenta),
    CONSTRAINT fk_tecnico_mov FOREIGN KEY (id_tecnico) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_os_mov FOREIGN KEY (id_os) REFERENCES ordens_servico(id_os)
);

-- 7. Tabela de Consumo de Materiais
CREATE TABLE IF NOT EXISTS consumo_materiais (
    id_consumo SERIAL PRIMARY KEY,
    id_os INTEGER NOT NULL,
    id_item INTEGER NOT NULL,
    quantidade_usada INTEGER NOT NULL,
    
    CONSTRAINT fk_os_cons FOREIGN KEY (id_os) REFERENCES ordens_servico(id_os),
    CONSTRAINT fk_item_cons FOREIGN KEY (id_item) REFERENCES estoque_itens(id_item)
);

-- ==========================================================
-- SEEDS (Dados Iniciais para Teste)
-- ==========================================================

INSERT INTO usuarios (nome, login, senha, cargo, setor) VALUES 
('João Operador', 'joao.op', '123', 'Operador', 'Costura'),
('Carlos Técnico', 'carlos.tec', '123', 'Tecnico', 'Manutenção'),
('Admin Gerente', 'admin', 'admin123', 'Gestor', 'Manutenção');

INSERT INTO maquinas (codigo_tag, nome_maquina, setor, criticidade) VALUES 
('COST-001', 'Máquina de Costura Reta Industrial', 'Costura', 'Alta'),
('MONT-010', 'Prensa de Solado', 'Montagem', 'Alta'),
('CORTE-05', 'Balancim de Corte', 'Corte', 'Média');

INSERT INTO ferramentas (nome_ferramenta, codigo_patrimonio) VALUES 
('Multímetro Digital', 'FER-001'),
('Parafusadeira Bosch', 'FER-002'),
('Chave de Impacto', 'FER-003');