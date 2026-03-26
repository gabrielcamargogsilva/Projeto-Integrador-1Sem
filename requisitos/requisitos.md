# REQUISITOS 


### ATORES DO SISTEMA

### Solicitante
Operador de setor
Abre ordens de serviço
Descreve o problema
Acompanha status da OS
Consulta histórico do setor

### Técnico
Equipe de manutenção
Visualiza OS atribuídas a ele
Atualiza status da OS
Registra peças e ferramentas
Adiciona observações técnicas

### Gestor
Coordenador de manutenção
Acesso total ao sistema
Designa técnicos para OS
Define prioridades
Visualiza dashboards e KPIs
Gerencia estoque e ferramentas
Emite relatórios


# REQUISITOS FUNCIONAIS

### Gestão de ordens de serviço

Abertura de OS
O sistema deve permitir que qualquer solicitante abra uma OS informando: setor, equipamento, tipo de serviço, descrição do problema e prioridade sugerida.

Listagem e filtro de OS
O sistema deve listar todas as OS com filtros por status, prioridade, setor, técnico e período.

Atribuição de técnico
O gestor deve poder designar um técnico para uma OS, com base na especialidade necessária e disponibilidade de turno.

Atualização de status
O técnico deve atualizar o status da OS em tempo real: Aberta → Em atendimento → Concluída ou Cancelada.

Encerramento com relatório
Ao concluir uma OS, o técnico deve registrar o tempo de reparo, causa raiz e solução aplicada.

### Histórico e rastreabilidade

Histórico de alterações
Cada mudança de status de uma OS deve ser registrada automaticamente com usuário, data, hora e observação.

Histórico por equipamento
O sistema deve exibir todas as OS já abertas para um equipamento, permitindo análise de falhas recorrentes.

### Relatórios e indicadores

O gestor deve visualizar: total de OS por status, OS por setor, OS por técnico e OS em atraso.

Relatório por período
O sistema deve gerar relatórios filtrando por data, setor, técnico e tipo de serviço.

### Autenticação e perfis

Login com perfil
O sistema deve autenticar usuários por email e senha, liberando funcionalidades conforme o perfil: Solicitante, Técnico ou Gestor.

Cadastro de usuários
O gestor deve poder criar, editar e desativar usuários e técnicos no sistema.

### REQ.NÃO FUNCIONAIS

Tempo de resposta Desempenho
O sistema deve carregar qualquer tela em menos de 3 segundos em conexão local da fábrica.

Funcionamento offline Disponibilidade
O sistema não pode depender exclusivamente de internet externa. Deve operar em rede local (intranet) da fábrica.

Interface simples Usabilidade
A abertura de uma OS não deve ter mais de 3 telas e deve ser concluída em menos de 2 minutos por qualquer operador.

Autenticação segura Segurança
Senhas devem ser armazenadas com hash (bcrypt). Cada perfil acessa apenas suas funcionalidades.

Compatibilidade de dispositivos Compatibilidade
O sistema deve funcionar nos navegadores Chrome e Edge, em computadores e tablets já existentes na fábrica.

Código documentado Manutenibilidade
O código deve ter documentação básica (comentários e README) para facilitar futuras manutenções pela equipe.

Suporte a crescimento Escalabilidade
O banco de dados deve suportar o registro de pelo menos 500 OS por mês sem degradação de desempenho.


### Prioridade baseada em criticidade

Ao abrir uma OS para um equipamento de criticidade "Alta", o sistema deve sugerir automaticamente a prioridade "Urgente".

Técnico compatível com a OS
O sistema deve sugerir apenas técnicos com especialidade compatível com o tipo de falha descrito na OS (ex: falha elétrica → eletricista).

OS não pode ficar sem técnico por mais de 2h (urgente)
Se uma OS com prioridade Urgente ficar sem técnico designado por mais de 2 horas, o sistema deve destacá-la visualmente no painel do gestor.

Cálculo automático do tempo de reparo
O tempo de reparo (MTTR) é calculado automaticamente: data/hora de encerramento menos data/hora de abertura. O técnico não precisa calcular.

Estoque abaixo do mínimo
Quando a quantidade de uma peça atingir ou ficar abaixo do estoque mínimo cadastrado, o sistema deve exibir um alerta visual na tela do gestor.

Ferramenta não pode ser retirada sem OS ativa
Não é permitido registrar um empréstimo de ferramenta sem que haja uma OS em andamento vinculada. Evita retiradas não rastreadas.

Histórico é imutável
Registros no histórico de OS não podem ser editados ou excluídos. Garante rastreabilidade e integridade dos dados para auditoria.

Apenas gestores alteram prioridade
A prioridade de uma OS pode ser ajustada somente pelo perfil Gestor após a criação. O solicitante apenas sugere na abertura.