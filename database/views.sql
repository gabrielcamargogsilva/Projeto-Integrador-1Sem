-- Painel Geral de Ordens de Serviço: Esta View junta dados de 3 tabelas diferentes para criar um relatório unificado de todas as OSs. Ela exibe o nome do equipamento, quem solicitou e quem é o técnico responsável, limpando os códigos ID por nomes reais.
CREATE OR REPLACE VIEW view_painel_geral_os AS
SELECT 
    os.codigo_os AS "Código OS",
    eq.nome AS "Equipamento",
    eq.setor AS "Setor",
    os.tipo_falha AS "Tipo de Falha",
    os.status_os AS "Status",
    os.data_abertura AS "Data de Abertura",
    us_sol.nome AS "Solicitante",
    COALESCE(us_tec.nome, 'Não Atribuído') AS "Técnico Responsável",
    os.data_fechamento - os.data_abertura AS "Tempo de Resolução"
FROM ordens_servico os
JOIN equipamentos eq ON os.equipamento_tag = eq.tag
JOIN usuarios us_sol ON os.solicitante_id = us_sol.id
LEFT JOIN usuarios us_tec ON os.tecnico_id = us_tec.id;


---------------------------------------------------------------------------


-- Alerta de Reposição de Estoque: Esta View cria uma lista automatizada apontando tudo o que precisa ser comprado imediatamente, calculando a diferença do estoque.
CREATE OR REPLACE VIEW view_alerta_reposicao_estoque AS
SELECT 
    codigo AS "Código Item",
    nome AS "Material",
    categoria AS "Categoria",
    qtd_atual AS "Estoque Atual",
    qtd_minima AS "Estoque Mínimo",
    (qtd_minima - qtd_atual) AS "Necessidade de Compra",
    localizacao AS "Prateleira/Local"
FROM itens_almoxarifado
WHERE qtd_atual <= qtd_minima
ORDER BY (qtd_minima - qtd_atual) DESC;


--------------------------------------------------------------------------


-- Ranking de Defeitos por Equipamento: Esta gera o relatório gerencial mostrando quais máquinas dão mais dor de cabeça e precisam de atenção da manutenção preventiva.
CREATE OR REPLACE VIEW view_ranking_defeitos_equipamentos AS
SELECT 
    eq.tag AS "Tag",
    eq.nome AS "Equipamento",
    eq.setor AS "Setor",
    COUNT(os.id) AS "Total de Falhas",
    eq.critico AS "Equipamento Crítico?"
FROM equipamentos eq
LEFT JOIN ordens_servico os ON eq.tag = os.equipamento_tag
GROUP BY eq.tag, eq.nome, eq.setor, eq.critico
ORDER BY "Total de Falhas" DESC;


---------------------------------------------------------------------------


-- Ferramentas Atrasadas em Campo: Esta View atua como um painel de auditoria para o almoxarifado saber exatamente quais ferramentas caras estão na mão de qual técnico há mais de 2 dias.

CREATE OR REPLACE VIEW view_ferramentas_atrasadas_tecnico AS
SELECT 
    cf.codigo_retorno AS "Cód. Empréstimo",
    it.nome AS "Ferramenta/Item",
    us.nome AS "Técnico em Campo",
    cf.data_retirada AS "Data da Retirada",
    CURRENT_TIMESTAMP - cf.data_retirada AS "Tempo em Campo"
FROM controle_ferramental cf
JOIN itens_almoxarifado it ON cf.item_codigo = it.codigo
JOIN usuarios us ON cf.tecnico_id = us.id
WHERE cf.data_devolucao IS NULL 
  AND cf.data_retirada < CURRENT_TIMESTAMP - INTERVAL '2 days'
ORDER BY cf.data_retirada ASC;