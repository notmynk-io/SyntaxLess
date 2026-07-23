import { Project } from "../types";

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "e-commerce-website",
    title: "E-Commerce Website",
    description: "Modern ShopEase storefront with responsive hero banner, cart logic, product filtering, and REST backend API.",
    category: "Web App",
    activeFileId: "file-ecommerce-index",
    files: [
      {
        id: "file-ecommerce-index",
        name: "index.html",
        path: "pages/index.html",
        language: "html",
        naturalExplanation: "Main entry point for ShopEase e-commerce store featuring a full navigation navbar, high-converting hero banner with '#03fca5' accent button, categories grid, product cards, and interactive shopping cart.",
        lineExplanations: [
          { line: 1, codeSnippet: "<!DOCTYPE html>", explanation: "Document type declaration for HTML5." },
          { line: 10, codeSnippet: "<nav class='navbar'>", explanation: "Header navigation container with brand logo, links, and cart badge." },
          { line: 20, codeSnippet: "<section class='hero'>", explanation: "Hero section featuring headline, subheadline, and primary 'Shop Now' call to action button." },
          { line: 25, codeSnippet: "<h1>Best Deals for You</h1>", explanation: "Hero main headline text promoting unbeatable prices." }
        ],
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ShopEase - Best Online Deals</title>
  <link rel="stylesheet" href="../styles/main.css" />
</head>
<body>
  <nav class="navbar">
    <div class="logo">ShopEase</div>
    <ul class="nav-links">
      <li><a href="#home" class="active">Home</a></li>
      <li><a href="#products">Products</a></li>
      <li><a href="#categories">Categories</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button class="cart-btn" id="cart-button">
      🛒 Cart (<span id="cart-count">0</span>)
    </button>
  </nav>

  <section class="hero" id="home">
    <div class="container">
      <div class="content">
        <span class="badge">Best Online Deals</span>
        <h1>Best Deals for You</h1>
        <p>Discover amazing products at unbeatable prices with instant free delivery.</p>
        <button class="btn primary" id="shop-now-btn">Shop Now</button>
      </div>
      <div class="image">
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" alt="Headphones Deals" />
      </div>
    </div>
  </section>

  <section class="features" id="categories">
    <div class="container grid">
      <div class="card">
        <h3>⚡ Fast Delivery</h3>
        <p>Free 24-hour shipping on orders above $50</p>
      </div>
      <div class="card">
        <h3>🛡️ 100% Authentic</h3>
        <p>Guaranteed genuine products direct from brands</p>
      </div>
      <div class="card">
        <h3>💳 Secure Checkout</h3>
        <p>Encrypted payment processing & easy returns</p>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>&copy; 2026 ShopEase Inc. All rights reserved.</p>
  </footer>

  <script src="../script.js"></script>
</body>
</html>`,
        nodes: [
          {
            id: "node-hero",
            type: "customNode",
            label: "Hero Section",
            description: "Main promo section with headline, subheadline and call to action",
            data: {
              title: "Hero Section",
              description: "Headline, Subheadline, Button (Shop Now), Image",
              nodeType: "ui_element",
              codeSnippet: "<section class='hero'>"
            },
            position: { x: 260, y: 50 }
          },
          {
            id: "node-features",
            type: "customNode",
            label: "Features Section",
            description: "Delivery, Authenticity, and Secure Payment info cards",
            data: {
              title: "Features Section",
              description: "3 Highlights Grid Cards",
              nodeType: "ui_element",
              codeSnippet: "<section class='features'>"
            },
            position: { x: 50, y: 220 }
          },
          {
            id: "node-products",
            type: "customNode",
            label: "Products Section",
            description: "Dynamic product list loaded via backend API",
            data: {
              title: "Products Section",
              description: "E-Commerce Product Cards Grid",
              nodeType: "ui_element",
              codeSnippet: "<div class='product-grid'>"
            },
            position: { x: 260, y: 220 }
          },
          {
            id: "node-categories",
            type: "customNode",
            label: "Categories",
            description: "Filter products by Electronics, Fashion, Home",
            data: {
              title: "Categories Bar",
              description: "Category pills navigation",
              nodeType: "ui_element",
              codeSnippet: "<ul class='category-pills'>"
            },
            position: { x: 480, y: 220 }
          },
          {
            id: "node-footer",
            type: "customNode",
            label: "Footer",
            description: "Copyrights and quick links",
            data: {
              title: "Footer Section",
              description: "Legal & Copyright Info",
              nodeType: "ui_element",
              codeSnippet: "<footer class='footer'>"
            },
            position: { x: 260, y: 380 }
          }
        ],
        edges: [
          { id: "edge-1", source: "node-hero", target: "node-features", label: "scroll down" },
          { id: "edge-2", source: "node-hero", target: "node-products", label: "click Shop Now" },
          { id: "edge-3", source: "node-hero", target: "node-categories", label: "select tag" },
          { id: "edge-4", source: "node-products", target: "node-footer" }
        ]
      },
      {
        id: "file-ecommerce-css",
        name: "main.css",
        path: "styles/main.css",
        language: "css",
        naturalExplanation: "Global styling sheet specifying dark and light theme palettes, responsive layout grids, flexbox alignment, and electric neon teal (#03fca5) accents for primary buttons.",
        lineExplanations: [
          { line: 1, codeSnippet: ":root { --theme-accent: #03fca5; }", explanation: "Define CSS custom variable for theme accent color (#03fca5)." },
          { line: 15, codeSnippet: ".btn.primary { background: var(--theme-accent); color: #090d16; font-weight: 700; }", explanation: "Primary CTA button styled with electric teal accent and bold text." }
        ],
        code: `:root {
  --theme-accent: #03fca5;
  --theme-bg: #090d16;
  --theme-surface: #111827;
  --theme-text: #f3f4f6;
  --theme-border: #1f2937;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--theme-bg);
  color: var(--theme-text);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--theme-surface);
  border-bottom: 1px solid var(--theme-border);
}

.logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--theme-accent);
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover, .nav-links a.active {
  color: var(--theme-accent);
}

.cart-btn {
  background: rgba(3, 252, 165, 0.1);
  color: var(--theme-accent);
  border: 1px solid rgba(3, 252, 165, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  cursor: pointer;
}

.hero {
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1100px;
  align-items: center;
}

.badge {
  display: inline-block;
  background: rgba(3, 252, 165, 0.15);
  color: var(--theme-accent);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  border: 1px solid rgba(3, 252, 165, 0.3);
}

.hero h1 {
  font-size: 2.75rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  line-height: 1.1;
}

.hero p {
  color: #9ca3af;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.btn.primary {
  background-color: var(--theme-accent);
  color: #090d16;
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 0.5rem;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(3, 252, 165, 0.4);
}

.hero img {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}`,
        nodes: [],
        edges: []
      },
      {
        id: "file-ecommerce-js",
        name: "script.js",
        path: "script.js",
        language: "javascript",
        naturalExplanation: "Client-side script handling cart item incrementation, smooth scroll to product sections, and live toast notification feedback.",
        lineExplanations: [
          { line: 2, codeSnippet: "let cartCount = 0;", explanation: "State counter variable for active cart item total." },
          { line: 5, codeSnippet: "shopBtn.addEventListener('click', () => { cartCount++; });", explanation: "Add click event listener to 'Shop Now' button to add item to cart." }
        ],
        code: `// ShopEase Interactive Controller
let cartCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  const shopNowBtn = document.getElementById('shop-now-btn');
  const cartCountEl = document.getElementById('cart-count');

  if (shopNowBtn && cartCountEl) {
    shopNowBtn.addEventListener('click', () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
      alert('🛒 Item added to your ShopEase cart!');
    });
  }
});`,
        nodes: [],
        edges: []
      },
      {
        id: "file-ecommerce-server",
        name: "server.js",
        path: "backend/server.js",
        language: "javascript",
        naturalExplanation: "Node.js Express backend API providing endpoints for product listings, category filters, and secure cart order submission.",
        lineExplanations: [
          { line: 1, codeSnippet: "const express = require('express');", explanation: "Import Express framework." },
          { line: 5, codeSnippet: "app.get('/api/products', (req, res) => { ... });", explanation: "API endpoint returning JSON array of available products." }
        ],
        code: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 129.99, category: "Electronics" },
  { id: 2, name: "Smart Fitness Watch", price: 89.99, category: "Electronics" },
  { id: 3, name: "Ergonomic Desk Chair", price: 199.99, category: "Home" }
];

app.get('/api/products', (req, res) => {
  res.json({ success: true, products: PRODUCTS });
});

app.post('/api/cart/checkout', (req, res) => {
  const { items, total } = req.body;
  res.json({ success: true, orderId: "ORD-" + Date.now(), total });
});

app.listen(PORT, () => {
  console.log(\`ShopEase Server listening on port \${PORT}\`);
});`,
        nodes: [],
        edges: []
      },
      {
        id: "file-ecommerce-schema",
        name: "schema.sql",
        path: "database/schema.sql",
        language: "sql",
        naturalExplanation: "PostgreSQL database schema for products, categories, users, orders, and order items tables.",
        lineExplanations: [
          { line: 1, codeSnippet: "CREATE TABLE products (...);", explanation: "Table definition for e-commerce products catalog." }
        ],
        code: `CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(id),
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
        nodes: [],
        edges: []
      },
      {
        id: "file-ecommerce-pkg",
        name: "package.json",
        path: "package.json",
        language: "javascript",
        naturalExplanation: "Manifest file defining dependencies including express, cors, and build scripts.",
        lineExplanations: [],
        code: `{
  "name": "shopease-ecommerce",
  "version": "1.0.0",
  "description": "Full-stack E-Commerce Website with Natural Code IDE support",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}`,
        nodes: [],
        edges: []
      }
    ]
  },
  {
    id: "eligibility-checker",
    title: "User Eligibility & Verification App",
    description: "Simple intent-driven React component demonstrating age verification, email requirements, and modal message display.",
    category: "Web App",
    activeFileId: "file-eligibility-main",
    files: [
      {
        id: "file-eligibility-main",
        name: "EligibilityChecker.tsx",
        path: "src/EligibilityChecker.tsx",
        language: "typescript",
        naturalExplanation: "Check if the user's age is 18 or above and email is verified. Display 'Eligible for Account' if true, otherwise show an 'Access Restricted' notice.",
        lineExplanations: [
          { line: 3, codeSnippet: "const [age, setAge] = useState(20);", explanation: "Store the current user age in component state (defaults to 20)." },
          { line: 4, codeSnippet: "const [isVerified, setIsVerified] = useState(true);", explanation: "Track whether the email is verified." },
          { line: 7, codeSnippet: "if (age >= 18 && isVerified) {", explanation: "Condition: Check if user is 18 or older AND email is verified." },
          { line: 8, codeSnippet: "return <div className='bg-emerald-500/10 text-emerald-400'>Eligible</div>;", explanation: "Display success message with green background." }
        ],
        code: `import React, { useState } from "react";

export default function EligibilityChecker() {
  const [age, setAge] = useState(20);
  const [isVerified, setIsVerified] = useState(true);

  const checkStatus = () => {
    if (age >= 18 && isVerified) {
      return { status: "Eligible", message: "User meets age requirement and is email verified.", badgeColor: "emerald" };
    } else if (age < 18) {
      return { status: "Underage", message: "Must be at least 18 years old to proceed.", badgeColor: "amber" };
    } else {
      return { status: "Unverified", message: "Please verify your email address.", badgeColor: "rose" };
    }
  };

  const result = checkStatus();

  return (
    <div className="p-6 max-w-md mx-auto bg-slate-900 rounded-xl border border-slate-800 text-white shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-[#03fca5]">Account Access Eligibility</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">User Age: {age}</label>
          <input 
            type="range" 
            min="12" 
            max="65" 
            value={age} 
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-[#03fca5] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-lg border border-slate-700">
          <span className="text-sm font-medium">Email Verification Status</span>
          <button 
            onClick={() => setIsVerified(!isVerified)}
            className={isVerified ? "px-3 py-1 rounded text-xs font-semibold border transition-all bg-[#03fca5]/20 text-[#03fca5] border-[#03fca5]/40" : "px-3 py-1 rounded text-xs font-semibold border transition-all bg-rose-500/20 text-rose-400 border-rose-500/40"}
          >
            {isVerified ? "Verified ✓" : "Pending ✗"}
          </button>
        </div>

        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-slate-400">Calculated Decision</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#03fca5]/20 text-[#03fca5] border border-[#03fca5]/30">
              {result.status}
            </span>
          </div>
          <p className="text-sm text-slate-300">{result.message}</p>
        </div>
      </div>
    </div>
  );
}`,
        nodes: [
          {
            id: "n-start",
            type: "customNode",
            label: "User Access Trigger",
            description: "Receive User Age & Email Status",
            data: { title: "Start Process", description: "Initialize inputs from user profile", nodeType: "start", codeSnippet: "const [age, setAge] = useState(20);" },
            position: { x: 50, y: 100 }
          },
          {
            id: "n-cond1",
            type: "customNode",
            label: "Age >= 18 & Verified?",
            description: "Evaluate user eligibility criteria",
            data: { title: "Condition: Eligibility Check", description: "Check if age >= 18 and email is verified", nodeType: "condition", codeSnippet: "if (age >= 18 && isVerified)" },
            position: { x: 300, y: 100 }
          },
          {
            id: "n-action-eligible",
            type: "customNode",
            label: "Grant Full Access",
            description: "Show 'Eligible' badge & allow access",
            data: { title: "Grant Access", description: "Return Eligible status badge", nodeType: "action", codeSnippet: "return { status: 'Eligible', badgeColor: 'emerald' }" },
            position: { x: 600, y: 30 }
          }
        ],
        edges: [
          { id: "e1", source: "n-start", target: "n-cond1", label: "Submit Form" },
          { id: "e2", source: "n-cond1", target: "n-action-eligible", label: "True" }
        ]
      }
    ]
  },
  {
    id: "sales-analyzer-python",
    title: "E-Commerce Revenue Analyzer",
    description: "Python data processing script calculating totals, applying volume discounts, and filtering VIP customers.",
    category: "Data Science",
    activeFileId: "file-sales-py",
    files: [
      {
        id: "file-sales-py",
        name: "sales_analyzer.py",
        path: "analytics/sales_analyzer.py",
        language: "python",
        naturalExplanation: "Loop through every order in the sales list, sum the prices to compute gross revenue, apply a 10% discount if gross revenue exceeds $500, and print the final net total.",
        lineExplanations: [
          { line: 2, codeSnippet: "total_revenue = 0", explanation: "Initialize running sum variable for total revenue to 0." },
          { line: 4, codeSnippet: "for order in orders:", explanation: "Loop over each individual order record." },
          { line: 5, codeSnippet: "total_revenue += order['amount']", explanation: "Add current order amount to total_revenue." }
        ],
        code: `orders = [
    {"id": 101, "customer": "Alice", "amount": 250.0, "is_vip": True},
    {"id": 102, "customer": "Bob", "amount": 180.0, "is_vip": False},
    {"id": 103, "customer": "Charlie", "amount": 320.0, "is_vip": True}
]

def calculate_net_revenue(order_list):
    gross_total = 0.0
    vip_bonus_count = 0

    for order in order_list:
        gross_total += order["amount"]
        if order.get("is_vip"):
            vip_bonus_count += 1

    if gross_total >= 500.0:
        discount = gross_total * 0.10
        net_total = gross_total - discount
        applied_discount = True
    else:
        discount = 0.0
        net_total = gross_total
        applied_discount = False

    return {
        "gross": gross_total,
        "discount": discount,
        "net": net_total,
        "vip_orders": vip_bonus_count,
        "discount_applied": applied_discount
    }

report = calculate_net_revenue(orders)
print(f"Gross: \${report['gross']}, Net Revenue: \${report['net']}")`,
        nodes: [
          {
            id: "py-n1",
            type: "customNode",
            label: "Load Orders Array",
            description: "Read sales orders list",
            data: { title: "Input Data", description: "3 Order Records loaded", nodeType: "variable", codeSnippet: "orders = [...]" },
            position: { x: 50, y: 100 }
          }
        ],
        edges: []
      }
    ]
  }
];
