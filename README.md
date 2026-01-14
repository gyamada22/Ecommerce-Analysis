# 📊 Projeto de Análise de Dados – Olist E-commerce (Dashboard Estratégico)

## 🎯 Objetivo do Projeto  
Este projeto tem como objetivo transformar dados operacionais do e-commerce da Olist em **insights estratégicos de negócio**, utilizando um dashboard interativo para identificar gargalos de receita, problemas logísticos, oportunidades de fidelização e melhorias no processo de pagamento.

O foco não é apenas visualização, mas **tomada de decisão orientada por dados**.

---

## 🧩 Visão Geral do Dashboard  

Principais KPIs:

- **Total de Pedidos:** 99 mil  
- **Faturamento Total:** R$ 15,74 Mi  
- **Ticket Médio:** R$ 158,33  
- **Taxa de Recompra:** 3,12%  

Visualizações:
- Faturamento por Estado  
- Distribuição por Status de Entrega  
- Relação entre Faturamento e Volume de Pedidos ao longo do tempo  

---

## 🚨 1. Gargalo de Receita – Indisponibilidade de Produtos  

- **Dado do dashboard:** 20,55% dos pedidos estão com status *Indisponível*.  
- **Insight do banco:** Pedidos são criados, mas não processados por falta de estoque real.

### 📌 Problema  
Falha crítica na sincronização entre o estoque dos vendedores e a plataforma, gerando perda direta de receita e frustração do cliente.

### 🛠️ Ação Estratégica  
Implementar um **Score de Confiança para Vendedores**:
- Penalizar no ranking de busca vendedores com alta taxa de *unavailable*  
- Reduzir a exposição de produtos com histórico de indisponibilidade  
- Proteger a experiência do cliente e a credibilidade da plataforma  

---

## 🚚 2. Logística e Cancelamentos – Otimização em São Paulo  

- **Dado do dashboard:** SP concentra a maior parte do faturamento e pedidos.  
- **Insight do banco:** Mesmo com logística mais rápida, ainda há cancelamentos relevantes.  
  Análise feita cruzando:
  - `vw_status_entrega`
  - Tempo de aprovação de pagamento

### 📌 Problema  
Janela de tempo entre compra e confirmação do pagamento permite arrependimentos e cancelamentos.

### 🛠️ Ação Estratégica  
Criar **Entrega Prioritária para SP** em pedidos pagos via Cartão de Crédito:
- Pagamento aprovado instantaneamente  
- Pedido entra mais rápido no fluxo logístico  
- Redução da taxa de cancelamento  

---

## 💳 3. Meios de Pagamento – Recuperação de Faturamento  

- **Dado do dashboard:** ~21% do faturamento está em pedidos cancelados (≈ R$ 3,3 Mi).  
- **Insight do banco:** Grande parte vem de boletos não pagos.  
  No MongoDB, boletos podem levar até 3 dias para confirmação.

### 📌 Problema  
Pedidos expiram porque o cliente esquece de pagar o boleto.

### 🛠️ Ação Estratégica  
Criar automação (ex: Apache Airflow):
- Enviar lembrete 24h antes do vencimento do boleto  
- Recuperar parte do faturamento perdido  
- Reduzir cancelamentos passivos  

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
