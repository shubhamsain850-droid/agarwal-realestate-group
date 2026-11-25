import os

svg_mehrab = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a1711"/>
      <stop offset="70%" stop-color="#180e0a"/>
      <stop offset="100%" stop-color="#0f0806"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf4b8"/>
      <stop offset="25%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#aa7c11"/>
      <stop offset="75%" stop-color="#e8c85a"/>
      <stop offset="100%" stop-color="#8a5a00"/>
    </linearGradient>
    <linearGradient id="terracottaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c86446"/>
      <stop offset="100%" stop-color="#df9b58"/>
    </linearGradient>
    <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="500" height="500" rx="40" fill="url(#bgGlow)"/>

  <!-- Outer Heritage Ring -->
  <circle cx="250" cy="250" r="215" fill="none" stroke="url(#goldGrad)" stroke-width="5" opacity="0.9"/>
  <circle cx="250" cy="250" r="202" fill="none" stroke="url(#terracottaGrad)" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.7"/>
  <circle cx="250" cy="250" r="192" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.6"/>

  <!-- Royal Mehrab Archway (Negative & Positive Space) -->
  <g filter="url(#goldShadow)">
    <!-- Main A Body forming Arch -->
    <path d="M 250 85 
             L 345 325 
             L 310 325 
             L 282 255 
             L 218 255 
             L 190 325 
             L 155 325 Z" 
          fill="url(#goldGrad)"/>

    <!-- Inner Mehrab Cutout (Royal Cusped Archway) -->
    <path d="M 250 145 
             Q 262 185 270 205
             C 275 220 270 235 250 240
             C 230 235 225 220 230 205
             Q 238 185 250 145 Z" 
          fill="#180e0a"/>

    <!-- Modern Luxury Villa Roofline nestled across the crossbar -->
    <path d="M 200 245 
             L 250 205 
             L 300 245 
             L 290 250 
             L 250 218 
             L 210 250 Z" 
          fill="url(#goldGrad)"/>

    <!-- Villa Chimney / Tower accent -->
    <rect x="275" y="215" width="10" height="20" fill="url(#goldGrad)"/>

    <!-- Jharokha Base Pedestal -->
    <path d="M 175 328 L 325 328 L 315 336 L 185 336 Z" fill="url(#goldGrad)"/>
    <path d="M 195 339 L 305 339 L 295 344 L 205 344 Z" fill="url(#terracottaGrad)"/>
  </g>

  <!-- Typography: AJARWAL -->
  <text x="250" y="385" font-family="'Cinzel', 'Playfair Display', serif" font-size="28" font-weight="700" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="6">AJARWAL</text>

  <!-- Subtitle: REAL ESTATE GROUP -->
  <text x="250" y="415" font-family="'Inter', 'Montserrat', sans-serif" font-size="13" font-weight="600" fill="#df9b58" text-anchor="middle" letter-spacing="4">REAL ESTATE GROUP</text>

  <!-- Tagline: JAIPUR -->
  <text x="250" y="438" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#a07a65" text-anchor="middle" letter-spacing="5">JAIPUR • RAJASTHAN</text>
</svg>'''

svg_suryavanshi = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlowSun" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#321a12"/>
      <stop offset="60%" stop-color="#1c0f0a"/>
      <stop offset="100%" stop-color="#0a0503"/>
    </radialGradient>
    <linearGradient id="sunGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe89e"/>
      <stop offset="30%" stop-color="#df9b58"/>
      <stop offset="70%" stop-color="#c86446"/>
      <stop offset="100%" stop-color="#8a3e20"/>
    </linearGradient>
    <linearGradient id="richGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff2b2"/>
      <stop offset="40%" stop-color="#d4af37"/>
      <stop offset="80%" stop-color="#a67c1e"/>
      <stop offset="100%" stop-color="#694d0c"/>
    </linearGradient>
    <filter id="sunGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="500" height="500" rx="40" fill="url(#bgGlowSun)"/>

  <!-- Suryavanshi Radiance Rays -->
  <g opacity="0.25">
    <circle cx="250" cy="210" r="140" fill="none" stroke="url(#sunGold)" stroke-width="1"/>
    <circle cx="250" cy="210" r="120" fill="none" stroke="url(#sunGold)" stroke-width="1" stroke-dasharray="2 8"/>
    <!-- 12 Auspicious Rays -->
    <path d="M 250 60 L 250 85 M 250 335 L 250 360 M 100 210 L 125 210 M 375 210 L 400 210 M 144 104 L 162 122 M 338 298 L 356 316 M 144 316 L 162 298 M 338 122 L 356 104" stroke="url(#sunGold)" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- The Rising Sun Disc -->
  <circle cx="250" cy="200" r="65" fill="url(#sunGold)" opacity="0.35" filter="url(#sunGlowFilter)"/>
  <circle cx="250" cy="200" r="45" fill="url(#sunGold)" opacity="0.6"/>

  <!-- Plotted Land & Geometric Villa A Monogram -->
  <g>
    <!-- Masterplan Land Boundary Grid at bottom of icon -->
    <polygon points="180,290 250,250 320,290 250,310" fill="#1c0f0a" stroke="url(#richGold)" stroke-width="2"/>
    <line x1="250" y1="250" x2="250" y2="310" stroke="url(#sunGold)" stroke-width="1.5" stroke-dasharray="3 3"/>
    <line x1="215" y1="270" x2="285" y2="300" stroke="url(#sunGold)" stroke-width="1.5" stroke-dasharray="3 3"/>

    <!-- Sharp Modern Monogram "A" with Slanted Roof -->
    <path d="M 250 100 
             L 330 270 
             L 300 270 
             L 282 230 
             L 218 230 
             L 200 270 
             L 170 270 Z" 
          fill="url(#richGold)"/>

    <!-- Rising Triangular Pinnacle -->
    <polygon points="250,135 272,215 228,215" fill="#1c0f0a"/>

    <!-- Double Roof Crest -->
    <polyline points="190,225 250,175 310,225" fill="none" stroke="#fff2b2" stroke-width="3" stroke-linecap="round"/>
  </g>

  <!-- Typography -->
  <text x="250" y="380" font-family="'Cinzel', serif" font-size="30" font-weight="700" fill="url(#richGold)" text-anchor="middle" letter-spacing="7">AJARWAL</text>
  <text x="250" y="412" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#c86446" text-anchor="middle" letter-spacing="4">REAL ESTATE GROUP</text>
  <text x="250" y="438" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#a88975" text-anchor="middle" letter-spacing="5">BHANKROTA • AJMER ROAD</text>
</svg>'''

svg_modern_jali = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="bgModern" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#24140e"/>
      <stop offset="70%" stop-color="#150a06"/>
      <stop offset="100%" stop-color="#080302"/>
    </radialGradient>
    <linearGradient id="champagneGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#f3d898"/>
      <stop offset="70%" stop-color="#c99738"/>
      <stop offset="100%" stop-color="#805b12"/>
    </linearGradient>
    <linearGradient id="roseCopper" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a8482f"/>
      <stop offset="50%" stop-color="#d97d5a"/>
      <stop offset="100%" stop-color="#f5b89a"/>
    </linearGradient>
    <pattern id="jaaliGrid" width="14" height="14" patternUnits="userSpaceOnUse">
      <path d="M 7 0 L 14 7 L 7 14 L 0 7 Z" fill="none" stroke="#d97d5a" stroke-width="1" opacity="0.65"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="500" height="500" rx="40" fill="url(#bgModern)"/>

  <!-- Minimalist Geometric Octagon Shield -->
  <polygon points="250,55 395,115 395,315 250,375 105,315 105,115" fill="none" stroke="url(#champagneGold)" stroke-width="2" opacity="0.4"/>
  <polygon points="250,68 380,123 380,307 250,362 120,307 120,123" fill="none" stroke="url(#roseCopper)" stroke-width="1" opacity="0.3"/>

  <!-- The Architectural A Monogram with Jaali Screen -->
  <g>
    <!-- Left Ascender -->
    <polygon points="250,90 220,90 145,285 180,285 205,220 250,220" fill="url(#champagneGold)"/>
    
    <!-- Right Ascender -->
    <polygon points="250,90 280,90 355,285 320,285 295,220 250,220" fill="url(#champagneGold)"/>

    <!-- Integrated Modern Cantilever Villa Roofline -->
    <polygon points="250,110 325,185 310,195 250,135 190,195 175,185" fill="url(#roseCopper)"/>

    <!-- Micro-Laser Cut Jaali Pattern filled inside the Crossbar Shield -->
    <polygon points="205,220 295,220 285,255 215,255" fill="url(#bgModern)" stroke="url(#roseCopper)" stroke-width="2"/>
    <polygon points="207,222 293,222 283,253 217,253" fill="url(#jaaliGrid)"/>

    <!-- Modern Villa Chimney / Skyward Pillar -->
    <rect x="295" y="145" width="12" height="28" fill="url(#champagneGold)"/>
  </g>

  <!-- Typography: Ultra Sharp Clean Luxury -->
  <text x="250" y="415" font-family="'Montserrat', 'Cinzel', sans-serif" font-size="28" font-weight="800" fill="url(#champagneGold)" text-anchor="middle" letter-spacing="8">AJARWAL</text>
  <text x="250" y="442" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="url(#roseCopper)" text-anchor="middle" letter-spacing="5">REAL ESTATE GROUP</text>
</svg>'''

base_dir = r"C:\Users\ss\.gemini\antigravity\scratch\agarwal-realestate-group\public\logo-concepts"
os.makedirs(base_dir, exist_ok=True)

with open(os.path.join(base_dir, "concept-mehrab.svg"), "w", encoding="utf-8") as f:
    f.write(svg_mehrab)

with open(os.path.join(base_dir, "concept-suryavanshi.svg"), "w", encoding="utf-8") as f:
    f.write(svg_suryavanshi)

with open(os.path.join(base_dir, "concept-modern-jali.svg"), "w", encoding="utf-8") as f:
    f.write(svg_modern_jali)

# Also copy to artifacts directory for markdown rendering
brain_dir = r"C:\Users\ss\.gemini\antigravity\brain\d36bd08f-c9bb-4f0a-bf1b-3df32c98788f"
with open(os.path.join(brain_dir, "concept-mehrab.svg"), "w", encoding="utf-8") as f:
    f.write(svg_mehrab)
with open(os.path.join(brain_dir, "concept-suryavanshi.svg"), "w", encoding="utf-8") as f:
    f.write(svg_suryavanshi)
with open(os.path.join(brain_dir, "concept-modern-jali.svg"), "w", encoding="utf-8") as f:
    f.write(svg_modern_jali)

print("SVG concepts generated successfully in both locations.")
