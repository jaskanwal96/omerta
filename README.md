# 📁 The Syndicate Archives

> **TOP SECRET // EYES ONLY**
>
> *This repository contains sensitive intelligence regarding the Five Families and their operations across New York City.*

![Nuxt 3](https://img.shields.io/badge/Nuxt_3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![Vercel Ready](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🕵️‍♂️ Mission Briefing

This project is a high-fidelity, interactive dossier system designed to visualize the hierarchy and territorial control of organized crime families. Built with a sleek **"Noir/Mob" aesthetic**, it features historical data, interactive maps, and organizational charts styled after the infamous 1963 Valachi Hearings.

### Key Capabilities

*   **🗺️ Interactive Surveillance Map**: A fully interactive **Leaflet** map of NYC, featuring "Dark Matter" tiles and clickable territories for the Five Families (Manhattan, Brooklyn, Queens, etc.).
*   **🕸️ "Valachi Chart" Visualizer**: A dynamic family tree component that mimics classic FBI org charts (`Boss > Underboss > Capo`), featuring typewriter fonts and mugshot nodes.
*   **📂 Confidential Dossiers**: Detailed profile pages for each family and key members, powered by a relational data model (`People` + `Positions`).
*   **🕵️ Intelligence Gathering**: A secure submission portal for informants to report new members (API with hierarchical `reportsTo` support).
*   **⚖️ The Commission (Admin)**: A restricted dashboard for approving or rejecting submitted intel.
*   **☁️ Serverless Architecture**: Powered by **Nuxt 3** and **Nitro Storage**, ready for deployment to Vercel/Edge environments with zero configuration.

---

## 🛠️ Tech Stack ("The Tools")

*   **Framework**: [Nuxt 3](https://nuxt.com) (Vue 3 + Nitro)
*   **Styling**: [TailwindCSS](https://tailwindcss.com) + Custom "Omertà" Design System
*   **Mapping**: [Leaflet](https://leafletjs.com) + `vue-leaflet` + CartoDB Dark Matter Tiles
*   **Data**: JSON File System (Dev) / Nitro Storage Abstraction (Prod)
*   **Typography**: Google Fonts (*Playfair Display*, *Inter*, *Special Elite*)

---

## 🚀 Deployment Instructions

### 1. Infiltrate (Clone)
```bash
git clone https://github.com/your-username/syndicate-archives.git
cd syndicate-archives
```

### 2. Equip (Install)
```bash
npm install
```

### 3. surveillance_mode_on (Run)
```bash
npm run dev
```
Access the secure terminal at `http://localhost:3000`.

---

## 📂 Data Structure ("The Books")

The system uses a relational model stored in `server/data/`:

*   **`families.json`**: The core organizations.
*   **`people.json`**: Unique individuals (Bio, Image, Life Dates).
*   **`positions.json`**: Historical roles holding the timeline (`Boss 1930-1945`, `reportsTo: uuid`).

---

## 📸 Intelligence Photos

*(Add screenshots here of the Map, the Family Tree, and the Home Page)*

> **WARNING**: *Unauthorzied reproduction of these files is punishable by... heavy consequences.*
