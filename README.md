# 🌟 Kirby Card Game Scraper

A lightweight and efficient web scraper built with **Node.js** and **Puppeteer** to extract card database information, stats, images, and pricing details for the Kirby card game.

---

## 🚀 Features

- **Automated Navigation:** Handles dynamic pages, pagination, and lazy-loading elements seamlessly using Puppeteer.
- **Rich Data Extraction:** Scrapes card names, set numbers, rarities, abilities/text, images, and market prices.
- **Export Options:** Saves scraped data cleanly into `JSON` or `CSV` formats for easy analysis or database seeding.
- **Configurable Delays:** Built-in rate limiting and random delays to mimic human browsing and prevent IP blocks.

---

## 🛠️ Tech Stack

- **Language:** JavaScript (Node.js)
- **Core Library:** [Puppeteer](https://pptr.dev/)
- **Data Output:** `fs` / `csv-writer` (Optional)

---

## 📦 Getting Started

### Prerequisites

Ensure you have **Node.js** installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/kirby-card-scraper.git](https://github.com/your-username/kirby-card-scraper.git)
   cd kirby-card-scraper
