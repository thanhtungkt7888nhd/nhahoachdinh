// Farmstay-themed SVG illustrations for article pages
// 15 unique inline SVG illustrations, line art style
// Color palette: #1C2A1C (dark green), #C8A84B (gold), #F5EAD5 (beige), #3D2B1F (charcoal)

export const illustrations: string[] = [
  // 1. Rice paddy terraces
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <path d="M10 130 Q40 100 80 110 Q120 120 160 100 Q180 90 190 80" stroke="#1C2A1C" stroke-width="2" fill="none"/>
    <path d="M10 115 Q50 85 90 95 Q130 105 170 85 Q185 75 195 65" stroke="#1C2A1C" stroke-width="2" fill="none"/>
    <path d="M10 100 Q55 70 100 80 Q140 90 175 70 Q188 60 198 50" stroke="#1C2A1C" stroke-width="2" fill="none"/>
    <path d="M10 85 Q60 55 105 65 Q148 75 180 55 Q192 45 200 35" stroke="#1C2A1C" stroke-width="2" fill="none"/>
    <!-- Rice stalks -->
    <line x1="30" y1="125" x2="30" y2="112" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="50" y1="120" x2="50" y2="107" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="70" y1="118" x2="70" y2="105" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="100" y1="118" x2="100" y2="105" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="130" y1="110" x2="130" y2="97" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="155" y1="104" x2="155" y2="91" stroke="#C8A84B" stroke-width="1.5"/>
    <!-- Mountain silhouette -->
    <path d="M60 50 L90 20 L120 50" stroke="#3D2B1F" stroke-width="2" fill="none"/>
    <path d="M110 55 L135 28 L160 55" stroke="#3D2B1F" stroke-width="2" fill="none"/>
    <!-- Sun -->
    <circle cx="25" cy="25" r="12" stroke="#C8A84B" stroke-width="2" fill="none"/>
    <line x1="25" y1="8" x2="25" y2="4" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="38" y1="12" x2="41" y2="9" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="42" y1="25" x2="46" y2="25" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="38" y1="38" x2="41" y2="41" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="12" y1="12" x2="9" y2="9" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="8" y1="25" x2="4" y2="25" stroke="#C8A84B" stroke-width="1.5"/>
  </svg>`,

  // 2. Wooden cabin in forest
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Trees background -->
    <polygon points="30,110 50,60 70,110" fill="#1C2A1C" opacity="0.3"/>
    <polygon points="140,110 160,55 180,110" fill="#1C2A1C" opacity="0.3"/>
    <polygon points="155,110 170,65 185,110" fill="#1C2A1C" opacity="0.2"/>
    <polygon points="15,110 35,65 55,110" fill="#1C2A1C" opacity="0.2"/>
    <!-- House body -->
    <rect x="70" y="80" width="60" height="45" stroke="#3D2B1F" stroke-width="2" fill="#F5EAD5"/>
    <!-- Roof -->
    <polygon points="60,80 100,45 140,80" stroke="#3D2B1F" stroke-width="2" fill="none"/>
    <line x1="60" y1="80" x2="140" y2="80" stroke="#3D2B1F" stroke-width="1"/>
    <!-- Door -->
    <rect x="90" y="100" width="20" height="25" stroke="#3D2B1F" stroke-width="1.5" fill="none" rx="1"/>
    <!-- Windows -->
    <rect x="73" y="87" width="13" height="13" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <line x1="79" y1="87" x2="79" y2="100" stroke="#C8A84B" stroke-width="1"/>
    <line x1="73" y1="93" x2="86" y2="93" stroke="#C8A84B" stroke-width="1"/>
    <rect x="114" y="87" width="13" height="13" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <line x1="120" y1="87" x2="120" y2="100" stroke="#C8A84B" stroke-width="1"/>
    <line x1="114" y1="93" x2="127" y2="93" stroke="#C8A84B" stroke-width="1"/>
    <!-- Chimney -->
    <rect x="115" y="50" width="10" height="20" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <!-- Smoke -->
    <path d="M118 50 Q115 42 120 35 Q125 28 120 20" stroke="#3D2B1F" stroke-width="1" stroke-dasharray="3,2"/>
    <!-- Ground -->
    <line x1="10" y1="125" x2="190" y2="125" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Path -->
    <path d="M95 125 Q97 130 100 140 Q103 130 105 125" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
  </svg>`,

  // 3. Sunrise over mountains
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Sky gradient bands -->
    <rect x="0" y="0" width="200" height="50" fill="#F5EAD5" rx="4"/>
    <!-- Sun rising -->
    <circle cx="100" cy="75" r="28" stroke="#C8A84B" stroke-width="2.5" fill="none"/>
    <path d="M100 75 L100 72" stroke="#C8A84B" stroke-width="0"/>
    <!-- Sun rays -->
    <line x1="100" y1="40" x2="100" y2="33" stroke="#C8A84B" stroke-width="2"/>
    <line x1="120" y1="45" x2="125" y2="39" stroke="#C8A84B" stroke-width="2"/>
    <line x1="133" y1="60" x2="140" y2="56" stroke="#C8A84B" stroke-width="2"/>
    <line x1="67" y1="45" x2="62" y2="39" stroke="#C8A84B" stroke-width="2"/>
    <line x1="55" y1="60" x2="48" y2="56" stroke="#C8A84B" stroke-width="2"/>
    <line x1="133" y1="90" x2="140" y2="94" stroke="#C8A84B" stroke-width="2"/>
    <line x1="55" y1="90" x2="48" y2="94" stroke="#C8A84B" stroke-width="2"/>
    <!-- Mountains -->
    <path d="M0 120 L40 70 L80 110 L110 60 L150 105 L180 75 L200 95 L200 150 L0 150Z" stroke="#1C2A1C" stroke-width="2" fill="#1C2A1C" opacity="0.15"/>
    <path d="M0 135 L30 95 L60 120 L90 80 L125 115 L155 90 L180 105 L200 95 L200 150 L0 150Z" stroke="#1C2A1C" stroke-width="2" fill="#1C2A1C" opacity="0.2"/>
    <!-- Horizon line -->
    <line x1="0" y1="120" x2="200" y2="120" stroke="#C8A84B" stroke-width="1.5" stroke-dasharray="5,3"/>
    <!-- Reflection on ground -->
    <path d="M75 128 Q100 132 125 128" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2"/>
    <path d="M82 136 Q100 139 118 136" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2"/>
  </svg>`,

  // 4. River with stones
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Riverbanks -->
    <path d="M0 50 Q30 45 60 55 Q90 65 120 55 Q150 45 180 55 Q195 60 200 55" stroke="#3D2B1F" stroke-width="2" fill="none"/>
    <path d="M0 100 Q30 105 60 95 Q90 85 120 95 Q150 105 180 95 Q195 90 200 95" stroke="#3D2B1F" stroke-width="2" fill="none"/>
    <!-- Water flow lines -->
    <path d="M10 70 Q50 65 90 72 Q130 79 170 72 Q185 69 195 72" stroke="#1C2A1C" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
    <path d="M10 80 Q40 76 80 83 Q120 90 160 82 Q180 78 195 80" stroke="#1C2A1C" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
    <!-- Stones in river -->
    <ellipse cx="40" cy="78" rx="10" ry="7" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <ellipse cx="80" cy="72" rx="8" ry="5" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <ellipse cx="120" cy="80" rx="12" ry="7" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <ellipse cx="160" cy="73" rx="9" ry="6" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <!-- Vegetation on banks -->
    <path d="M10 50 Q15 35 20 50" stroke="#1C2A1C" stroke-width="1.5"/>
    <path d="M30 48 Q35 30 40 48" stroke="#1C2A1C" stroke-width="1.5"/>
    <path d="M170 50 Q175 33 180 50" stroke="#1C2A1C" stroke-width="1.5"/>
    <path d="M10 100 Q15 115 20 100" stroke="#1C2A1C" stroke-width="1.5"/>
    <path d="M180 98 Q185 113 190 98" stroke="#1C2A1C" stroke-width="1.5"/>
    <!-- Mountains in background -->
    <path d="M50 45 L80 20 L110 45" stroke="#1C2A1C" stroke-width="1.5" opacity="0.4" fill="none"/>
    <path d="M100 45 L130 18 L160 45" stroke="#1C2A1C" stroke-width="1.5" opacity="0.4" fill="none"/>
    <!-- Ripples around stones -->
    <ellipse cx="40" cy="78" rx="16" ry="10" stroke="#1C2A1C" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/>
    <ellipse cx="120" cy="80" rx="18" ry="11" stroke="#1C2A1C" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/>
  </svg>`,

  // 5. Bamboo grove
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Bamboo stalks -->
    <line x1="30" y1="10" x2="28" y2="150" stroke="#1C2A1C" stroke-width="3"/>
    <line x1="60" y1="5" x2="62" y2="150" stroke="#1C2A1C" stroke-width="3.5"/>
    <line x1="90" y1="8" x2="88" y2="150" stroke="#1C2A1C" stroke-width="3"/>
    <line x1="120" y1="3" x2="122" y2="150" stroke="#1C2A1C" stroke-width="4"/>
    <line x1="150" y1="7" x2="148" y2="150" stroke="#1C2A1C" stroke-width="3"/>
    <line x1="175" y1="10" x2="177" y2="150" stroke="#1C2A1C" stroke-width="2.5"/>
    <!-- Bamboo nodes/joints -->
    <line x1="25" y1="40" x2="33" y2="40" stroke="#C8A84B" stroke-width="2"/>
    <line x1="25" y1="80" x2="33" y2="80" stroke="#C8A84B" stroke-width="2"/>
    <line x1="25" y1="120" x2="33" y2="120" stroke="#C8A84B" stroke-width="2"/>
    <line x1="57" y1="35" x2="65" y2="35" stroke="#C8A84B" stroke-width="2"/>
    <line x1="57" y1="75" x2="65" y2="75" stroke="#C8A84B" stroke-width="2"/>
    <line x1="57" y1="115" x2="65" y2="115" stroke="#C8A84B" stroke-width="2"/>
    <line x1="87" y1="45" x2="93" y2="45" stroke="#C8A84B" stroke-width="2"/>
    <line x1="87" y1="85" x2="93" y2="85" stroke="#C8A84B" stroke-width="2"/>
    <line x1="87" y1="125" x2="93" y2="125" stroke="#C8A84B" stroke-width="2"/>
    <line x1="118" y1="30" x2="126" y2="30" stroke="#C8A84B" stroke-width="2"/>
    <line x1="118" y1="70" x2="126" y2="70" stroke="#C8A84B" stroke-width="2"/>
    <line x1="118" y1="110" x2="126" y2="110" stroke="#C8A84B" stroke-width="2"/>
    <line x1="145" y1="42" x2="153" y2="42" stroke="#C8A84B" stroke-width="2"/>
    <line x1="145" y1="82" x2="153" y2="82" stroke="#C8A84B" stroke-width="2"/>
    <line x1="145" y1="122" x2="153" y2="122" stroke="#C8A84B" stroke-width="2"/>
    <!-- Bamboo leaves -->
    <path d="M28 40 Q10 30 5 20" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M60 35 Q75 22 85 12" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M88 45 Q70 38 60 28" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M120 30 Q138 18 150 10" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M148 42 Q162 30 175 22" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M28 80 Q12 73 5 62" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M90 85 Q108 78 118 68" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M120 70 Q140 60 155 52" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <!-- Ground -->
    <line x1="0" y1="145" x2="200" y2="145" stroke="#3D2B1F" stroke-width="2"/>
  </svg>`,

  // 6. Farm with animals
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Barn -->
    <rect x="120" y="70" width="65" height="55" stroke="#3D2B1F" stroke-width="2" fill="none"/>
    <polygon points="115,70 152,45 190,70" stroke="#3D2B1F" stroke-width="2" fill="none"/>
    <rect x="137" y="95" width="18" height="30" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <!-- Fence -->
    <line x1="10" y1="100" x2="120" y2="100" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="10" y1="112" x2="120" y2="112" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="10" y1="100" x2="10" y2="125" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="35" y1="100" x2="35" y2="125" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="60" y1="100" x2="60" y2="125" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="85" y1="100" x2="85" y2="125" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="110" y1="100" x2="110" y2="125" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Chicken 1 -->
    <circle cx="35" cy="88" r="7" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <circle cx="38" cy="82" r="4" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <path d="M40 82 L44 80" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="32" y1="95" x2="30" y2="102" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="36" y1="95" x2="35" y2="102" stroke="#C8A84B" stroke-width="1.5"/>
    <!-- Chicken 2 -->
    <circle cx="70" cy="86" r="8" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <circle cx="74" cy="79" r="5" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <path d="M77 79 L82 77" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="67" y1="94" x2="64" y2="101" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="72" y1="94" x2="70" y2="101" stroke="#C8A84B" stroke-width="1.5"/>
    <!-- Tree -->
    <line x1="95" y1="100" x2="95" y2="60" stroke="#3D2B1F" stroke-width="2"/>
    <circle cx="95" cy="48" r="18" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <!-- Sun -->
    <circle cx="20" cy="25" r="12" stroke="#C8A84B" stroke-width="2" fill="none"/>
    <!-- Ground -->
    <line x1="0" y1="125" x2="200" y2="125" stroke="#3D2B1F" stroke-width="2"/>
    <!-- Grass tufts -->
    <path d="M20 125 Q22 118 24 125" stroke="#1C2A1C" stroke-width="1.5"/>
    <path d="M50 125 Q52 119 54 125" stroke="#1C2A1C" stroke-width="1.5"/>
    <path d="M80 125 Q82 120 84 125" stroke="#1C2A1C" stroke-width="1.5"/>
  </svg>`,

  // 7. Tea plantation
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Rolling hills -->
    <path d="M0 100 Q50 70 100 85 Q150 100 200 75 L200 150 L0 150Z" fill="#1C2A1C" opacity="0.08"/>
    <path d="M0 115 Q40 88 90 100 Q140 112 200 90 L200 150 L0 150Z" fill="#1C2A1C" opacity="0.1"/>
    <!-- Tea rows (curved lines representing tea bushes) -->
    <path d="M10 90 Q50 80 100 87 Q150 94 190 82" stroke="#1C2A1C" stroke-width="2.5" fill="none"/>
    <path d="M10 102 Q50 92 100 99 Q150 106 190 94" stroke="#1C2A1C" stroke-width="2.5" fill="none"/>
    <path d="M10 114 Q50 104 100 111 Q150 118 190 106" stroke="#1C2A1C" stroke-width="2.5" fill="none"/>
    <!-- Tea leaf clusters along rows -->
    <circle cx="20" cy="89" r="5" stroke="#1C2A1C" stroke-width="1" fill="none"/>
    <circle cx="45" cy="83" r="5" stroke="#1C2A1C" stroke-width="1" fill="none"/>
    <circle cx="70" cy="85" r="5" stroke="#1C2A1C" stroke-width="1" fill="none"/>
    <circle cx="95" cy="87" r="5" stroke="#1C2A1C" stroke-width="1" fill="none"/>
    <circle cx="120" cy="90" r="5" stroke="#1C2A1C" stroke-width="1" fill="none"/>
    <circle cx="145" cy="87" r="5" stroke="#1C2A1C" stroke-width="1" fill="none"/>
    <circle cx="170" cy="84" r="5" stroke="#1C2A1C" stroke-width="1" fill="none"/>
    <!-- Picker figure -->
    <circle cx="155" cy="72" r="6" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="155" y1="78" x2="155" y2="95" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="155" y1="84" x2="145" y2="90" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="155" y1="84" x2="165" y2="88" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="155" y1="95" x2="150" y2="105" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="155" y1="95" x2="160" y2="105" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Basket -->
    <path d="M158 78 Q165 72 170 75 Q170 82 162 82Z" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <!-- Mountains in bg -->
    <path d="M30 80 L60 45 L90 80" stroke="#1C2A1C" stroke-width="1.5" opacity="0.3" fill="none"/>
    <path d="M80 80 L115 38 L150 80" stroke="#1C2A1C" stroke-width="1.5" opacity="0.3" fill="none"/>
    <!-- Sun/mist -->
    <circle cx="175" cy="25" r="15" stroke="#C8A84B" stroke-width="1.5" fill="none" opacity="0.7"/>
    <path d="M0 60 Q50 55 100 60 Q150 65 200 55" stroke="#F5EAD5" stroke-width="3" opacity="0.5"/>
  </svg>`,

  // 8. Traditional house architecture
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Traditional curved roof -->
    <path d="M20 80 Q100 30 180 80" stroke="#3D2B1F" stroke-width="2.5" fill="none"/>
    <path d="M30 80 Q100 40 170 80" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <!-- Roof tips decorative curves -->
    <path d="M20 80 Q10 75 15 65 Q20 58 25 62" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <path d="M180 80 Q190 75 185 65 Q180 58 175 62" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <!-- Main structure -->
    <rect x="40" y="80" width="120" height="50" stroke="#3D2B1F" stroke-width="2" fill="none"/>
    <!-- Decorative columns -->
    <line x1="65" y1="80" x2="65" y2="130" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="100" y1="80" x2="100" y2="130" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="135" y1="80" x2="135" y2="130" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Main door -->
    <rect x="83" y="100" width="34" height="30" stroke="#C8A84B" stroke-width="2" fill="none" rx="2"/>
    <path d="M83 105 Q100 95 117 105" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <!-- Side panels -->
    <rect x="45" y="88" width="15" height="30" stroke="#3D2B1F" stroke-width="1" fill="none"/>
    <rect x="140" y="88" width="15" height="30" stroke="#3D2B1F" stroke-width="1" fill="none"/>
    <!-- Decorative pattern -->
    <path d="M55 88 L53 94 L57 100 L53 106 L55 112 L60 112 L58 106 L62 100 L58 94 L60 88Z" stroke="#C8A84B" stroke-width="1" fill="none"/>
    <path d="M145 88 L143 94 L147 100 L143 106 L145 112 L150 112 L148 106 L152 100 L148 94 L150 88Z" stroke="#C8A84B" stroke-width="1" fill="none"/>
    <!-- Foundation steps -->
    <rect x="30" y="128" width="140" height="5" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <rect x="20" y="133" width="160" height="5" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <!-- Trees -->
    <line x1="15" y1="130" x2="15" y2="90" stroke="#1C2A1C" stroke-width="2"/>
    <ellipse cx="15" cy="80" rx="12" ry="15" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <line x1="185" y1="130" x2="185" y2="90" stroke="#1C2A1C" stroke-width="2"/>
    <ellipse cx="185" cy="80" rx="12" ry="15" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
  </svg>`,

  // 9. Map/compass planning
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Map background texture -->
    <rect x="15" y="15" width="130" height="120" stroke="#3D2B1F" stroke-width="2" fill="none" rx="3"/>
    <!-- Map features - rivers -->
    <path d="M15 50 Q45 45 60 55 Q80 65 100 55 Q115 48 130 55 L145 55" stroke="#1C2A1C" stroke-width="1.5" stroke-dasharray="none" fill="none" opacity="0.5"/>
    <!-- Map features - roads -->
    <line x1="15" y1="80" x2="145" y2="80" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="80" y1="15" x2="80" y2="135" stroke="#C8A84B" stroke-width="1.5"/>
    <!-- Map contour lines -->
    <ellipse cx="55" cy="55" rx="20" ry="15" stroke="#3D2B1F" stroke-width="0.8" opacity="0.4"/>
    <ellipse cx="55" cy="55" rx="30" ry="22" stroke="#3D2B1F" stroke-width="0.8" opacity="0.3"/>
    <ellipse cx="110" cy="100" rx="18" ry="12" stroke="#3D2B1F" stroke-width="0.8" opacity="0.4"/>
    <ellipse cx="110" cy="100" rx="25" ry="18" stroke="#3D2B1F" stroke-width="0.8" opacity="0.3"/>
    <!-- Location pin -->
    <circle cx="80" cy="80" r="6" stroke="#C8A84B" stroke-width="2" fill="none"/>
    <line x1="80" y1="86" x2="80" y2="95" stroke="#C8A84B" stroke-width="2"/>
    <!-- Compass -->
    <circle cx="168" cy="75" r="25" stroke="#3D2B1F" stroke-width="2" fill="#F5EAD5"/>
    <circle cx="168" cy="75" r="3" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <!-- Compass needle -->
    <polygon points="168,52 165,75 168,68 171,75" fill="#3D2B1F"/>
    <polygon points="168,98 165,75 168,82 171,75" fill="#C8A84B"/>
    <!-- N S E W labels -->
    <text x="165" y="50" font-size="7" fill="#3D2B1F" font-family="serif">N</text>
    <text x="165" y="102" font-size="7" fill="#3D2B1F" font-family="serif">S</text>
    <text x="189" y="78" font-size="7" fill="#3D2B1F" font-family="serif">E</text>
    <text x="144" y="78" font-size="7" fill="#3D2B1F" font-family="serif">W</text>
    <!-- Scale bar -->
    <line x1="20" y1="128" x2="80" y2="128" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="20" y1="125" x2="20" y2="131" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="50" y1="125" x2="50" y2="131" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="80" y1="125" x2="80" y2="131" stroke="#3D2B1F" stroke-width="1.5"/>
  </svg>`,

  // 10. Community circle of people
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Center plant/seed -->
    <circle cx="100" cy="75" r="12" stroke="#C8A84B" stroke-width="2" fill="none"/>
    <path d="M100 63 Q100 55 100 48" stroke="#1C2A1C" stroke-width="1.5"/>
    <path d="M100 55 Q95 48 88 50" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M100 55 Q105 48 112 50" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <!-- People in circle -->
    <!-- Person 1 - top -->
    <circle cx="100" cy="22" r="6" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="100" y1="28" x2="100" y2="42" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="100" y1="34" x2="93" y2="39" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="100" y1="34" x2="107" y2="39" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Person 2 - top right -->
    <circle cx="148" cy="35" r="6" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="148" y1="41" x2="148" y2="55" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="148" y1="47" x2="141" y2="52" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="148" y1="47" x2="155" y2="52" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Person 3 - right -->
    <circle cx="170" cy="75" r="6" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="170" y1="81" x2="170" y2="95" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="170" y1="87" x2="163" y2="92" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="170" y1="87" x2="177" y2="92" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Person 4 - bottom right -->
    <circle cx="148" cy="115" r="6" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="148" y1="109" x2="148" y2="95" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="148" y1="103" x2="141" y2="98" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="148" y1="103" x2="155" y2="98" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Person 5 - bottom -->
    <circle cx="100" cy="128" r="6" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="100" y1="122" x2="100" y2="108" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="100" y1="116" x2="93" y2="111" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="100" y1="116" x2="107" y2="111" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Person 6 - bottom left -->
    <circle cx="52" cy="115" r="6" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="52" y1="109" x2="52" y2="95" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="52" y1="103" x2="45" y2="98" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="52" y1="103" x2="59" y2="98" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Person 7 - left -->
    <circle cx="30" cy="75" r="6" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="30" y1="81" x2="30" y2="95" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="30" y1="87" x2="23" y2="92" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="30" y1="87" x2="37" y2="92" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Person 8 - top left -->
    <circle cx="52" cy="35" r="6" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="52" y1="41" x2="52" y2="55" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="52" y1="47" x2="45" y2="52" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="52" y1="47" x2="59" y2="52" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Connection lines to center -->
    <line x1="100" y1="42" x2="100" y2="63" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
    <line x1="143" y1="55" x2="111" y2="69" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
    <line x1="164" y1="75" x2="112" y2="75" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
    <line x1="143" y1="95" x2="111" y2="81" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
    <line x1="100" y1="108" x2="100" y2="87" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
    <line x1="57" y1="95" x2="89" y2="81" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
    <line x1="36" y1="75" x2="88" y2="75" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
    <line x1="57" y1="55" x2="89" y2="69" stroke="#C8A84B" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
  </svg>`,

  // 11. Seeds growing / agriculture
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Soil layers -->
    <path d="M0 110 Q50 105 100 110 Q150 115 200 108 L200 150 L0 150Z" fill="#3D2B1F" opacity="0.15"/>
    <line x1="0" y1="110" x2="200" y2="110" stroke="#3D2B1F" stroke-width="2"/>
    <!-- Seed underground -->
    <ellipse cx="35" cy="125" rx="8" ry="5" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <!-- Sprout stage 1 - small seedling -->
    <line x1="35" y1="120" x2="35" y2="105" stroke="#1C2A1C" stroke-width="1.5"/>
    <path d="M35 112 Q28 105 22 107" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M35 107 Q42 100 48 102" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <!-- Sprout stage 2 - medium plant -->
    <line x1="80" y1="110" x2="80" y2="85" stroke="#1C2A1C" stroke-width="2"/>
    <path d="M80 100 Q70 90 62 93" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M80 93 Q90 83 98 86" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M80 88 Q73 79 67 82" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M80 85 Q87 76 93 78" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <!-- Sprout stage 3 - full plant with flowers -->
    <line x1="140" y1="110" x2="140" y2="60" stroke="#1C2A1C" stroke-width="2.5"/>
    <path d="M140 95 Q125 82 115 87" stroke="#1C2A1C" stroke-width="2" fill="none"/>
    <path d="M140 85 Q155 72 165 77" stroke="#1C2A1C" stroke-width="2" fill="none"/>
    <path d="M140 75 Q128 62 120 67" stroke="#1C2A1C" stroke-width="2" fill="none"/>
    <path d="M140 68 Q152 55 162 60" stroke="#1C2A1C" stroke-width="2" fill="none"/>
    <!-- Flower on top -->
    <circle cx="140" cy="55" r="5" stroke="#C8A84B" stroke-width="2" fill="none"/>
    <circle cx="140" cy="47" r="4" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <circle cx="147" cy="50" r="4" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <circle cx="133" cy="50" r="4" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <!-- Growth arrow -->
    <path d="M50 75 L90 75 L90 70 L100 78 L90 86 L90 81 L50 81Z" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <!-- Sun -->
    <circle cx="170" cy="25" r="14" stroke="#C8A84B" stroke-width="2" fill="none"/>
    <line x1="170" y1="7" x2="170" y2="3" stroke="#C8A84B" stroke-width="2"/>
    <line x1="185" y1="11" x2="188" y2="8" stroke="#C8A84B" stroke-width="2"/>
    <line x1="155" y1="11" x2="152" y2="8" stroke="#C8A84B" stroke-width="2"/>
    <!-- Rain drops -->
    <path d="M20 20 Q22 28 20 32" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M35 15 Q37 23 35 27" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M50 22 Q52 30 50 34" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
  </svg>`,

  // 12. Financial growth chart
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Axes -->
    <line x1="30" y1="20" x2="30" y2="125" stroke="#3D2B1F" stroke-width="2"/>
    <line x1="30" y1="125" x2="190" y2="125" stroke="#3D2B1F" stroke-width="2"/>
    <!-- Y axis ticks and labels -->
    <line x1="25" y1="100" x2="35" y2="100" stroke="#3D2B1F" stroke-width="1"/>
    <line x1="25" y1="75" x2="35" y2="75" stroke="#3D2B1F" stroke-width="1"/>
    <line x1="25" y1="50" x2="35" y2="50" stroke="#3D2B1F" stroke-width="1"/>
    <line x1="25" y1="25" x2="35" y2="25" stroke="#3D2B1F" stroke-width="1"/>
    <!-- Grid lines -->
    <line x1="30" y1="100" x2="190" y2="100" stroke="#3D2B1F" stroke-width="0.5" stroke-dasharray="4,3" opacity="0.3"/>
    <line x1="30" y1="75" x2="190" y2="75" stroke="#3D2B1F" stroke-width="0.5" stroke-dasharray="4,3" opacity="0.3"/>
    <line x1="30" y1="50" x2="190" y2="50" stroke="#3D2B1F" stroke-width="0.5" stroke-dasharray="4,3" opacity="0.3"/>
    <line x1="30" y1="25" x2="190" y2="25" stroke="#3D2B1F" stroke-width="0.5" stroke-dasharray="4,3" opacity="0.3"/>
    <!-- Growth bars -->
    <rect x="45" y="105" width="20" height="20" stroke="#1C2A1C" stroke-width="1.5" fill="#1C2A1C" opacity="0.2"/>
    <rect x="75" y="95" width="20" height="30" stroke="#1C2A1C" stroke-width="1.5" fill="#1C2A1C" opacity="0.2"/>
    <rect x="105" y="80" width="20" height="45" stroke="#C8A84B" stroke-width="1.5" fill="#C8A84B" opacity="0.2"/>
    <rect x="135" y="60" width="20" height="65" stroke="#C8A84B" stroke-width="1.5" fill="#C8A84B" opacity="0.2"/>
    <rect x="163" y="38" width="20" height="87" stroke="#C8A84B" stroke-width="2" fill="#C8A84B" opacity="0.3"/>
    <!-- Growth trend line -->
    <path d="M55 105 L85 95 L115 80 L145 60 L173 38" stroke="#C8A84B" stroke-width="2.5" fill="none"/>
    <!-- Dots on trend line -->
    <circle cx="55" cy="105" r="3" fill="#C8A84B"/>
    <circle cx="85" cy="95" r="3" fill="#C8A84B"/>
    <circle cx="115" cy="80" r="3" fill="#C8A84B"/>
    <circle cx="145" cy="60" r="3" fill="#C8A84B"/>
    <circle cx="173" cy="38" r="4" fill="#C8A84B"/>
    <!-- Arrow at top of trend -->
    <path d="M170 32 L173 24 L176 32" stroke="#C8A84B" stroke-width="2" fill="none"/>
    <!-- Currency symbol -->
    <text x="8" y="30" font-size="10" fill="#C8A84B" font-family="serif">₫</text>
    <!-- X axis labels -->
    <line x1="55" y1="120" x2="55" y2="128" stroke="#3D2B1F" stroke-width="1"/>
    <line x1="85" y1="120" x2="85" y2="128" stroke="#3D2B1F" stroke-width="1"/>
    <line x1="115" y1="120" x2="115" y2="128" stroke="#3D2B1F" stroke-width="1"/>
    <line x1="145" y1="120" x2="145" y2="128" stroke="#3D2B1F" stroke-width="1"/>
    <line x1="173" y1="120" x2="173" y2="128" stroke="#3D2B1F" stroke-width="1"/>
    <!-- Arrow on Y axis -->
    <path d="M27 22 L30 15 L33 22" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <!-- Arrow on X axis -->
    <path d="M187 122 L194 125 L187 128" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
  </svg>`,

  // 13. Legal documents / scales of justice
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Document -->
    <rect x="10" y="20" width="80" height="110" stroke="#3D2B1F" stroke-width="2" fill="none" rx="2"/>
    <!-- Document corner fold -->
    <path d="M70 20 L90 40" stroke="#3D2B1F" stroke-width="1.5"/>
    <path d="M70 20 L70 40 L90 40" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <!-- Document lines -->
    <line x1="20" y1="55" x2="70" y2="55" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="20" y1="65" x2="75" y2="65" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="20" y1="75" x2="70" y2="75" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="20" y1="85" x2="75" y2="85" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="20" y1="95" x2="60" y2="95" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="20" y1="105" x2="70" y2="105" stroke="#3D2B1F" stroke-width="1.5"/>
    <!-- Seal/stamp -->
    <circle cx="58" cy="115" r="10" stroke="#C8A84B" stroke-width="2" fill="none"/>
    <circle cx="58" cy="115" r="6" stroke="#C8A84B" stroke-width="1" fill="none"/>
    <!-- Scales of justice -->
    <!-- Base -->
    <line x1="145" y1="130" x2="145" y2="50" stroke="#3D2B1F" stroke-width="2.5"/>
    <line x1="125" y1="130" x2="165" y2="130" stroke="#3D2B1F" stroke-width="2.5"/>
    <!-- Beam -->
    <line x1="110" y1="65" x2="180" y2="65" stroke="#3D2B1F" stroke-width="2"/>
    <!-- Left scale pan - slightly up (lighter) -->
    <path d="M110 65 L105 85 L125 85 Z" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <line x1="110" y1="65" x2="105" y2="85" stroke="#C8A84B" stroke-width="1.5"/>
    <line x1="110" y1="65" x2="125" y2="85" stroke="#C8A84B" stroke-width="1.5"/>
    <path d="M105 85 Q115 90 125 85" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <!-- Right scale pan - slightly down (heavier) -->
    <path d="M180 65 L175 90 L195 90 Z" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <line x1="180" y1="65" x2="175" y2="90" stroke="#3D2B1F" stroke-width="1.5"/>
    <line x1="180" y1="65" x2="195" y2="90" stroke="#3D2B1F" stroke-width="1.5"/>
    <path d="M175 90 Q185 95 195 90" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <!-- Weight on right side -->
    <rect x="179" y="80" width="12" height="10" stroke="#3D2B1F" stroke-width="1" fill="#3D2B1F" opacity="0.3" rx="1"/>
    <!-- Star above scales -->
    <path d="M145 35 L147 42 L154 42 L148 46 L150 53 L145 49 L140 53 L142 46 L136 42 L143 42Z" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
  </svg>`,

  // 14. Roads/pathways through landscape
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Road with perspective -->
    <path d="M85 150 L70 100 L60 50 L65 15" stroke="#3D2B1F" stroke-width="3" fill="none"/>
    <path d="M115 150 L130 100 L140 50 L135 15" stroke="#3D2B1F" stroke-width="3" fill="none"/>
    <!-- Road center dashes -->
    <line x1="100" y1="145" x2="100" y2="130" stroke="#C8A84B" stroke-width="1.5" stroke-dasharray="8,5"/>
    <line x1="100" y1="120" x2="100" y2="110" stroke="#C8A84B" stroke-width="1.5" stroke-dasharray="7,4"/>
    <line x1="100" y1="102" x2="100" y2="94" stroke="#C8A84B" stroke-width="1.5" stroke-dasharray="6,4"/>
    <line x1="100" y1="88" x2="100" y2="80" stroke="#C8A84B" stroke-width="1.5" stroke-dasharray="5,3"/>
    <line x1="100" y1="75" x2="100" y2="68" stroke="#C8A84B" stroke-width="1.5" stroke-dasharray="4,3"/>
    <line x1="100" y1="63" x2="100" y2="56" stroke="#C8A84B" stroke-width="1.5" stroke-dasharray="3,2"/>
    <!-- Landscape elements - left side -->
    <line x1="30" y1="130" x2="30" y2="100" stroke="#1C2A1C" stroke-width="2"/>
    <ellipse cx="30" cy="92" rx="15" ry="12" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <line x1="45" y1="110" x2="45" y2="88" stroke="#1C2A1C" stroke-width="2"/>
    <ellipse cx="45" cy="80" rx="12" ry="10" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <!-- Landscape elements - right side -->
    <line x1="165" y1="130" x2="165" y2="100" stroke="#1C2A1C" stroke-width="2"/>
    <ellipse cx="165" cy="92" rx="15" ry="12" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <line x1="150" y1="110" x2="150" y2="88" stroke="#1C2A1C" stroke-width="2"/>
    <ellipse cx="150" cy="80" rx="12" ry="10" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <!-- Small distant trees -->
    <line x1="72" y1="42" x2="72" y2="28" stroke="#1C2A1C" stroke-width="1.5" opacity="0.5"/>
    <ellipse cx="72" cy="23" rx="8" ry="7" stroke="#1C2A1C" stroke-width="1" fill="none" opacity="0.5"/>
    <line x1="128" y1="42" x2="128" y2="28" stroke="#1C2A1C" stroke-width="1.5" opacity="0.5"/>
    <ellipse cx="128" cy="23" rx="8" ry="7" stroke="#1C2A1C" stroke-width="1" fill="none" opacity="0.5"/>
    <!-- Vanishing point -->
    <circle cx="100" cy="15" r="3" stroke="#C8A84B" stroke-width="1.5" fill="none"/>
    <!-- Ground -->
    <ellipse cx="100" cy="148" rx="80" ry="5" stroke="#3D2B1F" stroke-width="1" fill="none" opacity="0.3"/>
  </svg>`,

  // 15. Waterfall/water management
  `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect width="200" height="150" fill="#F5EAD5" rx="4"/>
    <!-- Cliffs -->
    <path d="M0 20 L60 20 L60 70 L80 70 L80 100 L100 100 L100 120 L200 120 L200 150 L0 150Z" stroke="#3D2B1F" stroke-width="2" fill="#3D2B1F" opacity="0.08"/>
    <!-- Cliff edge highlights -->
    <line x1="0" y1="20" x2="60" y2="20" stroke="#3D2B1F" stroke-width="2"/>
    <line x1="60" y1="20" x2="60" y2="70" stroke="#3D2B1F" stroke-width="2"/>
    <line x1="60" y1="70" x2="80" y2="70" stroke="#3D2B1F" stroke-width="2"/>
    <line x1="80" y1="70" x2="80" y2="100" stroke="#3D2B1F" stroke-width="2"/>
    <line x1="80" y1="100" x2="100" y2="100" stroke="#3D2B1F" stroke-width="2"/>
    <line x1="100" y1="100" x2="100" y2="120" stroke="#3D2B1F" stroke-width="2"/>
    <!-- Waterfall - main stream -->
    <path d="M45 20 Q48 45 50 70" stroke="#1C2A1C" stroke-width="2.5" fill="none" opacity="0.7"/>
    <path d="M55 20 Q58 45 60 70" stroke="#1C2A1C" stroke-width="2" fill="none" opacity="0.5"/>
    <path d="M60 70 Q63 85 65 100" stroke="#1C2A1C" stroke-width="2.5" fill="none" opacity="0.7"/>
    <path d="M70 70 Q72 85 75 100" stroke="#1C2A1C" stroke-width="2" fill="none" opacity="0.5"/>
    <path d="M80 100 Q82 110 84 120" stroke="#1C2A1C" stroke-width="2.5" fill="none" opacity="0.7"/>
    <path d="M88 100 Q90 110 93 120" stroke="#1C2A1C" stroke-width="2" fill="none" opacity="0.5"/>
    <!-- Pool/basin at bottom -->
    <ellipse cx="120" cy="132" rx="50" ry="12" stroke="#1C2A1C" stroke-width="2" fill="none" opacity="0.5"/>
    <!-- Ripples in pool -->
    <ellipse cx="120" cy="133" rx="30" ry="7" stroke="#1C2A1C" stroke-width="1" stroke-dasharray="3,2" opacity="0.4"/>
    <ellipse cx="120" cy="134" rx="15" ry="4" stroke="#1C2A1C" stroke-width="1" stroke-dasharray="2,2" opacity="0.4"/>
    <!-- Mist/spray at base -->
    <path d="M90 120 Q105 115 120 120 Q135 115 150 120" stroke="#1C2A1C" stroke-width="1" stroke-dasharray="2,3" opacity="0.3"/>
    <!-- Vegetation on cliffs -->
    <path d="M10 20 Q18 10 25 20" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M25 20 Q33 8 40 20" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M120 120 Q125 110 130 120" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <path d="M150 120 Q157 109 164 120" stroke="#1C2A1C" stroke-width="1.5" fill="none"/>
    <!-- Water flow from pool -->
    <path d="M165 133 Q175 133 185 135" stroke="#1C2A1C" stroke-width="2" fill="none" opacity="0.5"/>
    <!-- Decorative rocks -->
    <ellipse cx="165" cy="122" rx="8" ry="5" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
    <ellipse cx="145" cy="125" rx="6" ry="4" stroke="#3D2B1F" stroke-width="1.5" fill="none"/>
  </svg>`,
];

// Helper: get illustration for article by index (cycles through 15)
export function getIllustration(index: number): string {
  return illustrations[index % illustrations.length];
}

// Get multiple different illustrations for an article
export function getArticleIllustrations(articleIndex: number, count: number = 3): string[] {
  return Array.from({ length: count }, (_, i) =>
    illustrations[(articleIndex * 3 + i) % illustrations.length]
  );
}
