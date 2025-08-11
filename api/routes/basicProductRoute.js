const express = require('express');
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const router = express.Router();

// Resolve data file path
const dataFile = path.resolve(__dirname, '../data/products.json');

// AJV schema for basic product
const ajv = new Ajv({ allErrors: true, removeAdditional: 'failing' });
const productSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'imageUrl', 'description', 'price', 'category'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string', minLength: 1 },
    imageUrl: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    price: { oneOf: [{ type: 'number' }, { type: 'string' }] },
    category: { type: 'string', minLength: 1 }
  }
};
const validate = ajv.compile(productSchema);

function readProducts() {
  try {
    const raw = fs.readFileSync(dataFile, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

function writeProducts(list) {
  fs.writeFileSync(dataFile, JSON.stringify(list, null, 2), 'utf-8');
}

// GET /products — list (optional ?category=)
router.get('/products', (req, res) => {
  const { category } = req.query;
  let products = readProducts();
  if (category) {
    const cat = String(category).toLowerCase();
    products = products.filter(p => (p.category || '').toLowerCase() === cat);
  }
  res.json({ success: true, count: products.length, products });
});

// GET /products/:id — single
router.get('/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => String(p.id) === String(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
});

// POST /products — create (bonus)
router.post('/products', (req, res) => {
  const body = req.body || {};
  // generate id if missing
  if (!body.id) body.id = String(Date.now());

  if (!validate(body)) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: validate.errors });
  }

  const products = readProducts();
  if (products.some(p => String(p.id) === String(body.id))) {
    return res.status(409).json({ success: false, message: 'Product with same id already exists' });
  }

  products.push(body);
  writeProducts(products);
  res.status(201).json({ success: true, product: body });
});

module.exports = router;
