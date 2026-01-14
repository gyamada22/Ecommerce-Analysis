import pandas as pd
from pymongo import MongoClient
import numpy as np

# 1. Conectar Atlas
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['ecommerce_analysis']
orders_col = db['orders']

orders_col.delete_many({})

# 2. Ler os arq CSV
orders = pd.read_csv("../data/raw/olist_orders_dataset.csv")
order_items = pd.read_csv("../data/raw/olist_order_items_dataset.csv")
payments = pd.read_csv("../data/raw/olist_order_payments_dataset.csv")
products = pd.read_csv("../data/raw/olist_products_dataset.csv")

order_items['price'] = pd.to_numeric(order_items['price'], errors='coerce').fillna(0.0)
order_items['freight_value'] = pd.to_numeric(order_items['freight_value'], errors='coerce').fillna(0.0)
payments['payment_value'] = pd.to_numeric(payments['payment_value'], errors='coerce').fillna(0.0)

order_items = order_items.merge(products[['product_id', 'product_category_name']], on='product_id', how='left')
order_items['product_category_name'] = order_items['product_category_name'].fillna("não definido")

items_dict = order_items.replace({np.nan: None}).groupby('order_id').apply(lambda x: x.to_dict(orient='records')).to_dict()
payments_dict = payments.replace({np.nan: None}).groupby('order_id').apply(lambda x: x.to_dict(orient='records')).to_dict()

documents = []

for _, order in orders.iterrows():
    oid = order['order_id']
    
    doc = {
        "order_id": oid,
        "status": order['order_status'],
        "dt_compra": str(order['order_purchase_timestamp']), 
        "dt_entrega": str(order['order_delivered_customer_date']) if pd.notnull(order['order_delivered_customer_date']) else None,
        "dt_estimada": str(order['order_estimated_delivery_date']),
        "items": items_dict.get(oid, []),
        "payments": payments_dict.get(oid, [])
    }
    documents.append(doc)
