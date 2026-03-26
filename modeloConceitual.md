``` mermaid
    erDiagram
        SETOR ||--o{ EQUIPAMENTO : "contém"
        EQUIPAMENTO ||--o{ ORDEM_SERVICO : "possui"
        SOLICITANTE ||--o{ ORDEM_SERVICO : "abre"
        TECNICO ||--o{ ORDEM_SERVICO : "executa"
        ORDEM_SERVICO ||--o{ MOVIMENTACAO_FERRAMENTA : "registra"
        FERRAMENTA ||--o{ MOVIMENTACAO_FERRAMENTA : "é alocada"

        SETOR {
            string nome
            string localizacao
        }

        EQUIPAMENTO {
            string tag PK
            string nome
            int criticidade
        }

        ORDEM_SERVICO {
            int id PK
            string descricao
            string status
            datetime data_abertura
            int prioridade
        }

        TECNICO {
            int id PK
            string nome
            string especialidade
        }

        FERRAMENTA {
            int id PK
            string nome
            boolean disponivel
        }

        MOVIMENTACAO_FERRAMENTA {
            datetime data_retirada
            datetime data_devolucao
        }

```