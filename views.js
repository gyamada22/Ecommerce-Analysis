// Total de pedidos - vw_total_pedidos
[
  { $group: { _id: null, total_pedidos: { $sum: 1 } } },
  { $project: { _id: 0 } }
]


// Faturamento Total - vw_faturamento_total
[
  { $unwind: "$items" },
  { $group: { _id: null, faturamento_total: { $sum: { $toDouble: "$items.price" } } } },
  { $project: { _id: 0 } }
]


// Taxa de Recompra - vw_taxa_recompra
[
  { $group: { _id: "$customer_unique_id", total_compras: { $sum: 1 } } },
  { $group: { _id: null, total_clientes: { $sum: 1 }, recorrentes: { $sum: { $cond: [{ $gt: ["$total_compras", 1] }, 1, 0] } } } },
  { $project: { _id: 0, taxa_recompra: { $multiply: [{ $divide: ["$recorrentes", "$total_clientes"] }, 100] } } }
]

// Ticket Médio - vw_ticket_medio
[
  { $unwind: "$items" },
  { $group: { _id: "$order_id", valor_pedido: { $sum: { $toDouble: "$items.price" } } } },
  { $group: { _id: null, ticket_medio: { $avg: "$valor_pedido" } } },
  { $project: { _id: 0 } }
]

// Pedidos por Estado - vw_pedidos_por_estado
[
  { $unwind: "$items" },
  { $group: { _id: "$customer_state", faturamento: { $sum: { $toDouble: "$items.price" } } } },
  { $project: { _id: 0, estado: "$_id", faturamento: 1 } },
  { $sort: { faturamento: -1 } }
]

// Status da Entrega - vw_status_entrega
[
  { $group: { _id: "$status", quantidade: { $sum: 1 } } },
  { $project: { _id: 0, status: "$_id", quantidade: 1 } }
]

// Pedidos Mensais - vw_pedidos_mensais
[
  { $unwind: "$items" },
  {
    $group: {
      _id: { $substr: ["$dt_compra", 0, 7] },
      faturamento: { $sum: { $toDouble: "$items.price" } },
      volume: { $sum: 1 }
    }
  },
  { $project: { _id: 0, mes_referencia: "$_id", faturamento: 1, volume: 1 } },
  { $sort: { mes_referencia: 1 } }
]

// Tipos de Pagamento - vw_tipos_pagamento
[
  { $unwind: "$payments" },
  { $group: { _id: "$payments.payment_type", quantidade: { $sum: 1 }, valor_total: { $sum: { $toDouble: "$payments.payment_value" } } } },
  { $project: { _id: 0, metodo: "$_id", quantidade: 1, valor_total: 1 } }
]
