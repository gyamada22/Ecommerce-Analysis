# 📊 Projeto de Análise de Dados – Olist E-commerce (Dashboard Estratégico)

## 🎯 Objetivo do Projeto  
Este projeto tem como objetivo transformar dados operacionais do e-commerce da Olist em **insights estratégicos de negócio**, utilizando um dashboard interativo para identificar gargalos de receita, problemas logísticos, oportunidades de fidelização e melhorias no processo de pagamento.

O foco não é apenas visualização, mas **tomada de decisão orientada por dados**.

---

## 🧩 Visão Geral do Dashboard  

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

## 🚨 1. Gargalo de Receita – Indisponibilidade de Produtos  

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

### 🚚 2. Eficiência Logística e Retenção – Hub Sudeste (SP, RJ, MG)

* **Dado do Dashboard:** O Sudeste (liderado por SP, RJ e MG) concentra o maior volume de faturamento e densidade de pedidos.
* **Insight:** A análise revela que, apesar da infraestrutura logística ser mais rápida nessas regiões, a "janela de espera" entre a compra e a confirmação do pagamento é o principal gatilho para cancelamentos por arrependimento.

**📌 Problema**
A demora no processamento inicial permite que o cliente desista da compra antes mesmo do produto sair do centro de distribuição, gerando perda de receita em áreas de alta eficiência.

**🛠️ Ação Estratégica: Implementação do "Fast-Track Sudeste"**
* **Priorização Logística:** Automatizar o fluxo de pedidos para SP, RJ e MG cujos pagamentos sejam aprovados instantaneamente.
* **Agilidade no Picking:** Antecipar a separação no estoque assim que o sinal de aprovação é recebido, reduzindo o tempo de "status parado".
* **Impacto Esperado:** Redução drástica na taxa de cancelamento por impulso e otimização da malha logística mais rentável da plataforma.

---

### 💳 3. Meios de Pagamento – Otimização de Conversão (Boleto)

* **Dado do Dashboard:** Dentro da margem de pedidos não finalizados (que representam ~3% do volume total), identificamos que 21,09% dos cancelamentos ocorrem em pagamentos pendentes.
* **Insight:** Identifiquei que o boleto bancário é o principal responsável por esses cancelamentos, devido ao tempo de espera entre a geração do título e o pagamento real pelo cliente.

**📌 Problema**
"Cancelamento por Esquecimento": O cliente gera o pedido, mas acaba perdendo o prazo de vencimento do boleto, resultando em uma perda de conversão que já estava garantida no carrinho.

**🛠️ Ação Estratégica: Automação de Recuperação**
* **Orquestração de Alertas:** Utilizar o **Apache Airflow** para monitorar prazos e disparar lembretes automáticos antes do vencimento do boleto.
* **Objetivo:** Transformar pedidos pendentes em faturamento real e reduzir a taxa de desistência passiva no final do funil de vendas.

---

## 🔁 4. Taxa de Recompra – Fidelização  

- **Dado do dashboard:** Taxa de recompra de apenas 3,12%.  
- **Insight do banco:**  
  O `customer_unique_id` raramente se repete ao longo do tempo.

### 📌 Problema  
A plataforma funciona como uma experiência de “compra única”.

### 🛠️ Ação Estratégica  
Criar campanhas de CRM baseadas na primeira compra:
- Usar a view `vw_receita_por_produto`  
- Exemplo:
  - Cliente comprou **Beleza & Saúde**  
  - Após 30 dias → envio automático de cupom de desconto  
  - Tempo alinhado ao ciclo de reposição do produto  

---

## 🧠 Conclusão  

Este projeto mostra como dashboards devem ser usados como ferramentas estratégicas:

> 📊 Visualização → 🗄️ Banco de Dados → 💡 Insight → 🛠️ Ação de Negócio  

Demonstra competências em:
- Data Analytics  
- Business Intelligence  
- Modelagem de KPIs  
- Integração SQL + NoSQL  
- Pensamento orientado a produto e negócio  

Projeto ideal para portfólio em vagas de:
- Data Analyst  
- Analytics Engineer  
- BI Analyst  
- Data Product Analyst  
