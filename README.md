<div align="center">

# 🚀 Shubrath Shetty — Portfolio Website

**A modern, immersive personal portfolio with a 3D sci-fi background — built with vanilla HTML, CSS, JavaScript & Three.js.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://portfolio-website-1-shubrathshettys-projects.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📖 About

This is my personal developer portfolio — a single-page website that showcases who I am, the tools I work with, the projects I've built, and how to reach me. The site features an **interactive 3D sci-fi outpost** rendered with **Three.js** as the background, creating an immersive experience that stands out.

> *"Passionate about building intelligent systems and solving real-world problems."*
> — Shubrath Shetty, B.Tech in AI & Data Science

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎮 **Interactive 3D Background** | A full sci-fi outpost scene built with Three.js — stars, energy pylons, holographic screens, floating data fragments, orbiting particles, and more. |
| 🌙 **Dark Theme** | Sleek, permanent dark mode with carefully chosen colors and contrasts for a premium feel. |
| 📱 **Fully Responsive** | Looks great on desktops, tablets, and mobile devices with an adaptive layout and hamburger menu. |
| ⚡ **Smooth Animations** | Scroll-triggered reveal animations using Intersection Observer, smooth scrolling, and navbar effects. |
| 🛠️ **Skills Showcase** | Interactive icon grid displaying programming languages, frameworks, databases, and tools using Devicon & custom SVGs. |
| 📂 **Featured Projects** | Project cards with preview images, descriptions, tech stacks, and GitHub links. |
| 🏆 **Achievements & Education** | Highlight cards for achievements, volunteering, and academic background. |
| 📬 **Contact Section** | Quick-access contact cards (email, phone, location) with a Gmail compose fallback for mailto links. |
| 🔗 **Social Links** | GitHub, LinkedIn, and Email links in both the hero section and footer. |

---

## 🖼️ Preview

<div align="center">

### Hero Section
> An animated hero with greeting text, social links, and call-to-action buttons — all overlaid on the 3D background.

### Skills Grid
> A clean horizontal grid of 20+ tools & technologies with official Devicon icons and custom SVGs.

### Featured Projects
> Cards with live preview screenshots for projects like **Finding Missing Person**, **Frost-Cast**, and **RecipeBook**.

</div>

---

## 🗂️ Project Structure

```
portfolio-website-1/
├── Images/                  # Project preview screenshots
│   ├── Missing person.png
│   ├── recipe.PNG
│   └── weather.PNG
├── public/                  # Static assets (favicon, SVGs)
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── index.html               # Main HTML — all sections
├── style.css                # Complete stylesheet (22KB)
├── script.js                # UI interactions & animations
├── three-scene.js           # Three.js 3D sci-fi background
├── package.json             # Project metadata
├── vercel.json              # Vercel deployment configuration
├── LICENSE                  # MIT License
└── .gitignore               # Git ignore rules
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | HTML5 (Semantic) |
| **Styling** | Vanilla CSS with CSS Custom Properties (Dark Theme) |
| **Interactivity** | Vanilla JavaScript (ES6+) |
| **3D Graphics** | [Three.js](https://threejs.org/) r128 (via CDN) |
| **Icons** | [Devicon](https://devicon.dev/) + Custom SVGs |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- [Git](https://git-scm.com/) for cloning
- *(Optional)* [Node.js](https://nodejs.org/) if you want to use a local dev server

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shubrathshetty/portfolio-website.git
   cd portfolio-website
   ```

2. **Open directly in browser**

   Simply open `index.html` in your browser — no build step required!

   ```bash
   # Or use a simple local server (optional):
   npx serve .
   ```

3. **View the site**

   Navigate to `http://localhost:3000` (if using a local server) or open the HTML file directly.

---

## 🌐 Deployment

This project is deployed on **Vercel** as a static site.

The `vercel.json` configuration handles routing:

```json
{
  "buildCommand": "",
  "installCommand": "",
  "outputDirectory": ".",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

To deploy your own version:

1. Fork this repository
2. Connect it to your [Vercel](https://vercel.com/) account
3. Deploy — it's zero-config!

---

## 📂 Featured Projects

| Project | Description | Tech |
|---|---|---|
| **[EventO](https://github.com/Shubrathshetty/Evento)** | Event management system designed to streamline and digitize event schedules efficiently. | Python, TypeScript, C++ |
| **[Finding Missing Person](https://github.com/Shubrathshetty/FINDING-MISSING-PERSON-USING-AI-AND-ALSO-SHOW-THE-AGE-AND-GENDER-DETECTION)** | AI-powered system for identifying missing persons using facial recognition with age & gender detection. | Python, OpenCV, Deep Learning |
| **[Frost-Cast](https://github.com/Shubrathshetty/Frost-Cast)** | Sleek weather forecasting app providing accurate real-time weather data and forecasts. | TypeScript, Weather API |
| **[RecipeBook](https://github.com/Shubrathshetty/receipe-book)** | Recipe management system to search recipes based on ingredients, cuisine, and more. | HTML, JavaScript |

---

## 🤝 Connect With Me

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shubrathshetty)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shubrath-shetty-014019330/)
[![Gmail](https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:subrathshetty2k06@gmail.com)

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

```
Copyright (c) 2026 Shubrath Shetty
```

---

<div align="center">

**Designed & Built with ❤️ by [Shubrath Shetty](https://github.com/Shubrathshetty)**

*© 2026 All rights reserved.*

</div>
