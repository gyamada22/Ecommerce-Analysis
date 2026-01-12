// ============================
// 1. 📦 Performance de Pedidos
// ============================

// 1.1 Total de pedidos
db.orders.countDocuments()

// 1.2 Pedidos por status
db.orders.aggregate([
  { $group: { _id: "$order_status", total: { $sum: 1 } } }
])

// 1.3 Taxa de entrega (%)
db.orders.aggregate([
  {
    $group: {
      _id: null,
      total: { $sum: 1 },
      delivered: {
        $sum: { $cond: [{ $eq: ["$order_status", "delivered"] }, 1, 0] }
      }
    }
  },
  {
    $project: {
      _id: 0,
      delivery_rate: {
        $multiply: [{ $divide: ["$delivered", "$total"] }, 100]
      }
    }
  }
])

// 1.4 Pedidos ao longo do tempo (Ano/Mês)
db.orders.aggregate([
  {
    $group: {
      _id: {
        year: { $year: { $toDate: "$purchase_timestamp" } },
        month: { $month: { $toDate: "$purchase_timestamp" } }
      },
      total: { $sum: 1 }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
])

// ============================
// 2. 💳 Pagamentos & Receita
// ============================

// 2.1 Faturamento total
db.orders.aggregate([
  { $group: { _id: null, revenue: { $sum: "$payment.value" } } }
])

// 2.2 Ticket médio
db.orders.aggregate([
  { $group: { _id: null, avg_ticket: { $avg: "$payment.value" } } }
])

// 2.3 Formas de pagamento
db.orders.aggregate([
  {
    $group: {
      _id: "$payment.type",
      total: { $sum: 1 }
    }
  }
])

// 2.4 Parcelamento médio
db.orders.aggregate([
  {
    $group: {
      _id: null,
      avg_installments: { $avg: "$payment.installments" }
    }
  }
])

// ============================
// 3. 🛒 Produtos & Itens
// ============================

// 3.1 Produtos mais vendidos (quantidade)
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product_id",
      total_sold: { $sum: "$items.quantity" }
    }
  },
  { $sort: { total_sold: -1 } }
])

// 3.2 Receita por produto
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product_id",
      revenue: {
        $sum: { $multiply: ["$items.price", "$items.quantity"] }
      }
    }
  },
  { $sort: { revenue: -1 } }
])

// 3.3 Itens médios por pedido
db.orders.aggregate([
  {
    $project: {
      items_count: { $sum: "$items.quantity" }
    }
  },
  {
    $group: {
      _id: null,
      avg_items: { $avg: "$items_count" }
    }
  }
])

// ============================
// 4. ⭐ Avaliações (Reviews)
// ============================

// 4.1 Nota média
db.orders.aggregate([
  { $group: { _id: null, avg_score: { $avg: "$review.score" } } }
])

// 4.2 Distribuição de notas
db.orders.aggregate([
  { $group: { _id: "$review.score", total: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

// 4.3 Total de reviews ruins (≤ 2)
db.orders.aggregate([
  { $match: { "review.score": { $lte: 2 } } },
  { $count: "bad_reviews" }
])

// ============================
// 5. 👥 Clientes
// ============================

// 5.1 Pedidos por estado
db.orders.aggregate([
  {
    $group: {
      _id: "$customer.state",
      total: { $sum: 1 }
    }
  }
])

// 5.2 Ticket médio por estado
db.orders.aggregate([
  {
    $group: {
      _id: "$customer.state",
      avg_ticket: { $avg: "$payment.value" }
    }
  }
])

// ============================
// 6. 🔁 Recompra & Fidelização
// ============================

// 6.1 Clientes com mais de um pedido
db.orders.aggregate([
  {
    $group: {
      _id: "$customer.customer_id",
      total_orders: { $sum: 1 }
    }
  },
  { $match: { total_orders: { $gt: 1 } } }
])

// 6.2 Taxa de recompra (%)
db.orders.aggregate([
  {
    $group: {
      _id: "$customer.customer_id",
      total_orders: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: null,
      total_customers: { $sum: 1 },
      returning: {
        $sum: { $cond: [{ $gt: ["$total_orders", 1] }, 1, 0] }
      }
    }
  },
  {
    $project: {
      rate: {
        $multiply: [{ $divide: ["$returning", "$total_customers"] }, 100]
      }
    }
  }
])
