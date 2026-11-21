// Morning Pier — three hand-drawn harbour scenes, painted twice each.
// drawScene(ctx, level, variant) paints one panel (600x452, panel-local
// coordinates). Variant 0 is the left picture, variant 1 the right one;
// the differences listed in SCENES[level].diffs are exactly the spots
// where the two variants disagree. Everything is canvas shapes — no
// images, no fonts, nothing loaded.

function sky(ctx, top, bottom) {
  const g = ctx.createLinearGradient(0, 0, 0, 452);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 600, 452);
}

function sea(ctx, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, y, 600, 452 - y);
}

function wave(ctx, x, y, s, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(x - 8 * s, y, 8 * s, Math.PI * 1.05, Math.PI * 1.95);
  ctx.arc(x + 8 * s, y, 8 * s, Math.PI * 1.05, Math.PI * 1.95);
  ctx.stroke();
}

function cloud(ctx, x, y, s, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 18 * s, 0, Math.PI * 2);
  ctx.arc(x + 22 * s, y + 4 * s, 14 * s, 0, Math.PI * 2);
  ctx.arc(x - 22 * s, y + 5 * s, 13 * s, 0, Math.PI * 2);
  ctx.fill();
}

function sun(ctx, x, y, r, rays) {
  ctx.fillStyle = '#ffd94d';
  if (rays) {
    ctx.strokeStyle = '#ffb703';
    ctx.lineWidth = 4;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * (r + 4), y + Math.sin(a) * (r + 4));
      ctx.lineTo(x + Math.cos(a) * (r + 16), y + Math.sin(a) * (r + 16));
      ctx.stroke();
    }
  }
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function gull(ctx, x, y, s) {
  ctx.strokeStyle = '#264653';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.arc(x - 7 * s, y, 7 * s, Math.PI * 1.1, Math.PI * 1.9);
  ctx.arc(x + 7 * s, y, 7 * s, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();
}

function pierDeck(ctx, y) {
  ctx.fillStyle = '#8a5a33';
  ctx.fillRect(0, y, 600, 16);
  ctx.fillStyle = '#6b4226';
  for (let x = 20; x < 600; x += 60) ctx.fillRect(x, y + 16, 10, 60);
  ctx.strokeStyle = '#5b3a1e';
  ctx.lineWidth = 1.4;
  for (let x = 0; x <= 600; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 16);
    ctx.stroke();
  }
}

function bollard(ctx, x, y, rope) {
  ctx.fillStyle = '#264653';
  ctx.fillRect(x - 6, y - 22, 12, 22);
  ctx.fillRect(x - 9, y - 28, 18, 8);
  if (rope) {
    ctx.strokeStyle = '#d9c7a7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 8, y - 20);
    ctx.quadraticCurveTo(x + 26, y - 6, x + 34, y + 4);
    ctx.stroke();
  }
}

function crate(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 44, 36);
  ctx.strokeStyle = '#5b3a1e';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, 44, 36);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 44, y + 36);
  ctx.moveTo(x + 44, y);
  ctx.lineTo(x, y + 36);
  ctx.stroke();
}

function bucket(ctx, x, y, fish) {
  ctx.fillStyle = '#457b9d';
  ctx.beginPath();
  ctx.moveTo(x - 14, y - 22);
  ctx.lineTo(x + 14, y - 22);
  ctx.lineTo(x + 10, y);
  ctx.lineTo(x - 10, y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#264653';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y - 22, 12, Math.PI, 0);
  ctx.stroke();
  if (fish) {
    ctx.fillStyle = '#a8dadc';
    ctx.beginPath();
    ctx.ellipse(x + 2, y - 26, 10, 4, -0.6, 0, Math.PI * 2);
    ctx.fill();
  }
}

function anchor(ctx, x, y, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, y - 24);
  ctx.lineTo(x, y + 18);
  ctx.moveTo(x - 12, y - 14);
  ctx.lineTo(x + 12, y - 14);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y + 2, 16, Math.PI * 0.15, Math.PI * 0.85);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y - 28, 5, 0, Math.PI * 2);
  ctx.stroke();
}

function flag(ctx, x, y, color, poleH) {
  ctx.strokeStyle = '#264653';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - poleH);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - poleH);
  ctx.lineTo(x + 26, y - poleH + 8);
  ctx.lineTo(x, y - poleH + 16);
  ctx.closePath();
  ctx.fill();
}

function shell(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 8, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#e07a5f';
  ctx.lineWidth = 1.4;
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + i * 6, y - 7);
    ctx.stroke();
  }
}

function boat(ctx, x, y, hull, sailColor, withSail) {
  ctx.fillStyle = hull;
  ctx.beginPath();
  ctx.moveTo(x - 44, y);
  ctx.lineTo(x + 44, y);
  ctx.lineTo(x + 30, y + 18);
  ctx.lineTo(x - 30, y + 18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#264653';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - 52);
  ctx.stroke();
  if (withSail) {
    ctx.fillStyle = sailColor;
    ctx.beginPath();
    ctx.moveTo(x + 2, y - 50);
    ctx.lineTo(x + 2, y - 4);
    ctx.lineTo(x + 30, y - 4);
    ctx.closePath();
    ctx.fill();
  }
}

function buoy(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 14, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x - 2, y - 18, 4, 12);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x - 14, y - 3, 28, 5);
}

function beacon(ctx, x, y, lit, stripe) {
  ctx.fillStyle = '#f1faee';
  ctx.beginPath();
  ctx.moveTo(x - 20, y);
  ctx.lineTo(x - 12, y - 96);
  ctx.lineTo(x + 12, y - 96);
  ctx.lineTo(x + 20, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = stripe;
  ctx.fillRect(x - 16, y - 66, 32, 14);
  ctx.fillRect(x - 13, y - 34, 26, 12);
  ctx.fillStyle = '#264653';
  ctx.fillRect(x - 14, y - 110, 28, 14);
  if (lit) {
    ctx.fillStyle = 'rgba(255,214,102,0.5)';
    ctx.beginPath();
    ctx.arc(x, y - 103, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffd666';
  } else {
    ctx.fillStyle = '#cfe8ef';
  }
  ctx.beginPath();
  ctx.arc(x, y - 103, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e63946';
  ctx.beginPath();
  ctx.moveTo(x - 16, y - 110);
  ctx.lineTo(x, y - 126);
  ctx.lineTo(x + 16, y - 110);
  ctx.closePath();
  ctx.fill();
}

function drawPier(ctx, v) {
  sky(ctx, '#ffd9a0', '#fff3d6');
  sea(ctx, 300, '#48cae4');
  sun(ctx, 520, 62, 26, v === 0);
  cloud(ctx, 90, 56, 1, '#ffffff');
  cloud(ctx, 330, 42, 0.8, '#ffffff');
  gull(ctx, 250, 52, 1);
  gull(ctx, 288, 66, 0.8);
  if (v === 0) gull(ctx, 326, 50, 0.9);
  boat(ctx, 130, 292, '#7a4a21', v === 0 ? '#ffffff' : '#ffb703', true);
  buoy(ctx, 470, 330, v === 0 ? '#e63946' : '#4361ee');
  wave(ctx, 80, 356, 1, '#90e0ef');
  wave(ctx, 300, 372, 1, '#90e0ef');
  wave(ctx, 520, 386, 1, '#90e0ef');
  pierDeck(ctx, 372);
  bollard(ctx, 120, 372, v === 0);
  bollard(ctx, 420, 372, true);
  crate(ctx, 200, 336, '#b08968');
  crate(ctx, 248, 336, '#b08968');
  if (v === 1) crate(ctx, 224, 300, '#b08968');
  bucket(ctx, 330, 372, v === 0);
  anchor(ctx, 540, 352, '#264653');
  flag(ctx, 60, 372, '#e63946', 64);
  const shells = [[160, 396], [186, 402], [212, 396], [238, 402], [264, 396]];
  shells.forEach(([x, y], i) => {
    if (v === 1 && i === 2) return;
    shell(ctx, x, y, i % 2 ? '#f4a259' : '#f1faee');
  });
}

function drawBoats(ctx, v) {
  sky(ctx, '#a8dadc', '#eefbfb');
  sea(ctx, 260, '#0096c7');
  sun(ctx, 70, 56, 22, true);
  cloud(ctx, 430, 48, 1, '#ffffff');
  cloud(ctx, 200, 66, 0.7, '#ffffff');
  gull(ctx, 330, 60, 1);
  gull(ctx, 368, 74, 0.8);
  if (v === 1) gull(ctx, 406, 58, 0.9);
  boat(ctx, 150, 300, '#6b4226', '#ffffff', true);
  boat(ctx, 340, 330, '#7a4a21', v === 0 ? '#f72585' : '#ffb703', true);
  boat(ctx, 500, 296, '#5b3a1e', '#ffffff', v === 0);
  if (v === 0) {
    ctx.fillStyle = '#f4a259';
    ctx.beginPath();
    ctx.ellipse(250, 316, 14, 6, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(250, 330, 16, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }
  buoy(ctx, 80, 370, '#e63946');
  buoy(ctx, 440, 392, v === 0 ? '#e63946' : '#3ddc84');
  wave(ctx, 140, 386, 1, '#90e0ef');
  wave(ctx, 280, 404, 1, '#90e0ef');
  if (v === 0) wave(ctx, 530, 356, 1, '#90e0ef');
  pierDeck(ctx, 416);
  flag(ctx, 560, 416, v === 0 ? '#ffd166' : '#4361ee', 56);
  bucket(ctx, 96, 416, true);
  crate(ctx, 470, 380, '#b08968');
  anchor(ctx, 210, 398, v === 0 ? '#264653' : '#e63946');
}

function drawBeacon(ctx, v) {
  sky(ctx, '#3a2e5c', '#f4a259');
  sea(ctx, 320, '#023e8a');
  sun(ctx, 300, v === 0 ? 170 : 140, v === 0 ? 34 : 24, false);
  ctx.fillStyle = '#ffffff';
  [[70, 60], [150, 40], [520, 44]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 2.6, 0, Math.PI * 2);
    ctx.fill();
  });
  if (v === 1) {
    ctx.beginPath();
    ctx.arc(478, 66, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }
  cloud(ctx, 120, 110, 0.9, '#e8b4b8');
  cloud(ctx, 480, 120, 0.8, '#e8b4b8');
  gull(ctx, 200, 80, 1);
  gull(ctx, 238, 94, 0.8);
  if (v === 0) gull(ctx, 276, 78, 0.9);
  beacon(ctx, 90, 330, v === 0, '#e63946');
  boat(ctx, 330, 330, '#5b3a1e', v === 0 ? '#ffffff' : '#4361ee', true);
  boat(ctx, 500, 356, '#6b4226', '#ffffff', v === 1);
  buoy(ctx, 220, 376, v === 0 ? '#e63946' : '#ffd166');
  wave(ctx, 150, 396, 1, '#90e0ef');
  wave(ctx, 400, 404, 1, '#90e0ef');
  wave(ctx, 540, 392, 1, '#90e0ef');
  pierDeck(ctx, 420);
  flag(ctx, 180, 420, '#3ddc84', 60);
  bucket(ctx, 300, 420, v === 1);
  crate(ctx, 420, 384, '#b08968');
  if (v === 0) crate(ctx, 468, 384, '#b08968');
  anchor(ctx, 540, 402, '#264653');
  const shells = [[240, 438], [264, 444], [288, 438]];
  shells.forEach(([x, y], i) => {
    if (v === 1 && i === 1) return;
    shell(ctx, x, y, i % 2 ? '#f4a259' : '#f1faee');
  });
}

const PAINTERS = [drawPier, drawBoats, drawBeacon];

export const SCENES = [
  {
    id: 'pier',
    diffs: [
      { id: 'sun', x: 520, y: 62, r: 30, label: 'the sun rays' },
      { id: 'gulls', x: 326, y: 50, r: 26, label: 'the third gull' },
      { id: 'sail', x: 146, y: 262, r: 28, label: 'the sail colour' },
      { id: 'buoy', x: 470, y: 322, r: 28, label: 'the buoy colour' },
      { id: 'rope', x: 142, y: 356, r: 28, label: 'the mooring rope' },
      { id: 'crates', x: 246, y: 318, r: 28, label: 'the stacked crate' },
      { id: 'fish', x: 332, y: 346, r: 26, label: 'the fish in the bucket' },
    ],
  },
  {
    id: 'boats',
    diffs: [
      { id: 'gulls', x: 406, y: 58, r: 26, label: 'the third gull' },
      { id: 'sail', x: 356, y: 300, r: 28, label: 'the sail colour' },
      { id: 'nosail', x: 514, y: 266, r: 28, label: 'the missing sail' },
      { id: 'fish', x: 250, y: 318, r: 26, label: 'the jumping fish' },
      { id: 'buoy', x: 440, y: 384, r: 28, label: 'the buoy colour' },
      { id: 'flag', x: 573, y: 368, r: 26, label: 'the flag colour' },
      { id: 'anchor', x: 210, y: 392, r: 28, label: 'the anchor colour' },
      { id: 'wave', x: 530, y: 356, r: 26, label: 'the wave' },
    ],
  },
  {
    id: 'beacon',
    diffs: [
      { id: 'sunset', x: 300, y: 155, r: 32, label: 'the setting sun' },
      { id: 'star', x: 478, y: 66, r: 24, label: 'the extra star' },
      { id: 'gulls', x: 276, y: 78, r: 26, label: 'the third gull' },
      { id: 'beacon', x: 90, y: 227, r: 28, label: 'the lit beacon' },
      { id: 'sail', x: 346, y: 300, r: 28, label: 'the sail colour' },
      { id: 'sail2', x: 514, y: 326, r: 28, label: 'the second sail' },
      { id: 'buoy', x: 220, y: 368, r: 28, label: 'the buoy colour' },
      { id: 'fish', x: 302, y: 394, r: 26, label: 'the fish in the bucket' },
      { id: 'crates', x: 490, y: 402, r: 28, label: 'the second crate' },
      { id: 'shell', x: 264, y: 438, r: 24, label: 'the missing shell' },
    ],
  },
];

/** Paint one panel of `level` (0-2) as variant 0 (left) or 1 (right). */
export function drawScene(ctx, level, variant) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, 600, 452);
  ctx.clip();
  PAINTERS[level](ctx, variant);
  ctx.restore();
}
