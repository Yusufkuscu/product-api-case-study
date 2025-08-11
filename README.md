# product-api-case-study
Product API case study for backend developer assessment. Only my own implementation and documentation are included.

# About This Project
This repository contains my solution for a backend developer technical assessment.
It focuses on a RESTful Product API built with Node.js and Express, using file-based JSON storage for easy testing.
All code and documentation here are my own work, written specifically for this case study. No client or proprietary code is included.

## Run Locally

Clone the project

```bash
  git clone https://dredsoftlabs-admin@bitbucket.org/dredsoftlabs/ecommerce.git
```

Go to the project directory

```bash
  cd eCommerce
```

Install dependencies

```bash
  npm install

  or 

  npm install react-material-ui-carousel --save --legacy-peer-deps
```

Start the server

```bash
  npm start
```

The server should now be running. You can access the application by opening a web browser and entering the following URL:

```bash
  http://localhost:3000
```

## API Endpoints
GET /products — List all products
GET /products/:id — Get product by ID
GET /products?category=Apparel — Filter products by category
POST /products — Create new product (with validation)

## Testing 
Import ProductAPI.postman_collection.json into Postman for ready-to-use requests.
Example cURL:
```bash
  curl.exe "http://localhost:4000/products"
  curl.exe "http://localhost:4000/products/123245"
  curl.exe "http://localhost:4000/products?category=Apparel"
  curl.exe -X POST http://localhost:4000/products -H "Content-Type: application/json" --data '@test-product.json'
```

