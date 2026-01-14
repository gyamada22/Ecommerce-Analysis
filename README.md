#  Olist E-commerce - Projeto de Análise de Dados

##  Objetivo do Projeto  
Este projeto tem como objetivo transformar dados operacionais do e-commerce da Olist em **insights estratégicos de negócio**, utilizando um dashboard interativo para identificar gargalos de receita, problemas logísticos, oportunidades de fidelização e melhorias no processo de pagamento.

---
##  Descrição Detalhada do Projeto  

Este projeto foi desenvolvido com foco principal no estudo e na aplicação prática de **dados não estruturados utilizando NoSQL (MongoDB)**.  
O objetivo central não era apenas construir um dashboard, mas sim **aprender a modelar, consultar e gerar valor de negócio a partir de dados não relacionais**, simulando um ambiente real onde os dados não seguem o padrão tradicional de tabelas SQL.

Diferente de projetos clássicos de BI baseados em bancos relacionais, aqui toda a base analítica nasce de documentos JSON armazenados no MongoDB Atlas (Cloud).  
Isso exigiu trabalhar conceitos fundamentais de NoSQL como:

- Modelagem orientada a documentos  
- Estrutura flexível de dados  
- Embedded documents e arrays  
- Aggregation Pipeline  
- Criação de *views* analíticas diretamente no banco  
- Pensamento de dados voltado para consultas, não para tabelas

Fluxo do projeto:

> 📄 Dados brutos (CSV/JSON)  
> ➜ 🐍 Python (transformação em documentos JSON e carga no banco)  
> ➜ 🗄️ MongoDB Atlas (NoSQL)  
> ➜ 🔍 Aggregation Pipelines / Views  
> ➜ 📊 Power BI  
> ➜ 💡 Insights de Negócio  

---

##  Objetivo do Projeto  

O objetivo duplo do projeto foi:

1. **Técnico**
   - Aprender MongoDB na prática
   - Trabalhar com dados não estruturados
   - Criar pipelines de agregação reais
   - Modelar documentos pensando em consultas analíticas
   - Simular um Data Warehouse NoSQL

2. **De Negócio**
   - Criar um dashboard executivo capaz de:
     - Monitorar faturamento e pedidos
     - Identificar perdas de receita
     - Diagnosticar gargalos operacionais
     - Propor soluções estratégicas baseadas em dados  

---

##  Visão Geral do Dashboard  

Principais KPIs:

- **Total de Pedidos:** 99 mil  
- **Faturamento Total:** R$ 15,74 Mi  
- **Taxa de Recompra:** 3,12%  
- **Ticket Médio:** R$ 158,33  

Visualizações:
- Faturamento por Estado  
- Distribuição por Status de Entrega  
- Relação entre Faturamento e Volume de Pedidos ao longo do tempo  

---

![Dashboard de Performance Global](https://raw.githubusercontent.com/gyamada22/Ecommerce-Analysis/main/images/Dashboard.png)

---

##  1. Gargalo de Receita – Indisponibilidade de Produtos  

- **Dado do dashboard:** 20,55% dos pedidos estão com status *Indisponível*.  
- **Insight:** Pedidos são criados, mas não processados por falta de estoque real.

### 📌 Problema  
Falha crítica na sincronização entre o estoque dos vendedores e a plataforma, gerando perda direta de receita e frustração do cliente.

### 🛠️ Ação Estratégica  
Implementar um **Score de Confiança para Vendedores**:
- Penalizar no ranking de busca vendedores com alta taxa de produtos indisponíveis
- Reduzir a exposição de produtos com histórico de indisponibilidade  
- Proteger a experiência do cliente e a credibilidade da plataforma  

---

##  2. Eficiência Logística e Retenção – Hub Sudeste (SP, RJ, MG)

* **Dado do Dashboard:** O Sudeste (liderado por SP, RJ e MG) concentra o maior volume de faturamento e densidade de pedidos.
* **Insight:** A análise revela que, apesar da infraestrutura logística ser mais rápida nessas regiões, a "janela de espera" entre a compra e a confirmação do pagamento é o principal gatilho para cancelamentos por arrependimento.

### 📌 Problema**
A demora no processamento inicial permite que o cliente desista da compra antes mesmo do produto sair do centro de distribuição, gerando perda de receita em áreas de alta eficiência.

### 🛠️ Ação Estratégica: Implementação do "Fast-Track Sudeste"**
* **Priorização Logística:** Automatizar o fluxo de pedidos para SP, RJ e MG cujos pagamentos sejam aprovados instantaneamente.
* **Agilidade no Picking:** Antecipar a separação no estoque assim que o sinal de aprovação é recebido, reduzindo o tempo de "status parado".
* **Impacto Esperado:** Redução drástica na taxa de cancelamento por impulso e otimização da malha logística mais rentável da plataforma.

---

##  3. Meios de Pagamento – Otimização de Conversão (Boleto)

* **Dado do Dashboard:** Dentro da margem de pedidos não finalizados (que representam ~3% do volume total), identificamos que 21,09% dos cancelamentos ocorrem em pagamentos pendentes.
* **Insight:** Identifiquei que o boleto bancário é o principal responsável por esses cancelamentos, devido ao tempo de espera entre a geração do título e o pagamento real pelo cliente.

### 📌 Problema**
"Cancelamento por Esquecimento": O cliente gera o pedido, mas acaba perdendo o prazo de vencimento do boleto, resultando em uma perda de conversão que já estava garantida no carrinho.

### 🛠️ Ação Estratégica: Automação de Recuperação**
* **Fluxo de Alertas:** Implementar uma rotina de monitoramento de prazos para disparar lembretes automáticos antes do vencimento do boleto.
* **Objetivo:** Transformar pedidos pendentes em faturamento real e reduzir a taxa de desistência passiva no final do funil de vendas.

---

##  4. Retenção e Fidelização – Ciclo de Recompra

* **Dado do dashboard:** Taxa de recompra de apenas 3,12%.
* **Insight:** Identificamos que a grande maioria dos clientes não retorna para uma segunda compra, mesmo em categorias de consumo recorrente.

### 📌 **Problema**
A plataforma funciona majoritariamente como uma experiência de “compra única”, resultando em um baixo valor de tempo de vida (LTV) do cliente.

### 🛠️ **Ação Estratégica**
Criar campanhas de relacionamento baseadas na primeira compra:
* Segmentar clientes por categoria de interesse (ex: Beleza & Saúde).
* Implementar o envio automático de incentivos de retorno após 30 dias.
* Alinhar o tempo da oferta ao ciclo médio de reposição do produto para estimular a recorrência.  

---

##  Conclusão  

Os insights deste projeto se conectam em um único objetivo: **aumentar o faturamento real do e-commerce reduzindo perdas e melhorando a eficiência do negócio**.

As estratégias propostas atuam de forma complementar:
- Recuperam receita que hoje é perdida por indisponibilidade de produtos, boletos não pagos e cancelamentos evitáveis.
- Otimizam processos operacionais, principalmente em logística e fluxo de pedidos.
- Aumentam o valor do cliente ao estimular recompra e fidelização.

No conjunto, elas criam um ciclo claro de crescimento:

> Menos desperdício de receita → Mais conversão → Mais eficiência → Mais recompra → Maior faturamento  
