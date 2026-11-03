// =====================
// Configuração visual
// =====================

const generationAccents = [
  '#b08d57',
  '#7c8f6d',
  '#a97c6d',
  '#7e8ba3',
  '#9a7b94',
  '#8a8f72',
  '#b3946a',
  '#6f8b85',
];

const avatarPalettes = [
  ['#93a89a', '#5f7a6c'],
  ['#c4a780', '#96764f'],
  ['#bd9388', '#8f6257'],
  ['#9ba7bb', '#6d7c94'],
  ['#b19caf', '#856d83'],
  ['#a9ae88', '#7d825c'],
];

const nameParticles = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);

let currentTreeStructure = 'schultz';
let currentTree = treeSchultz;
let toastTimer = null;

// =====================
// Utilitários
// =====================

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });
}

function hashName(name) {
  let hash = 0;
  for (const char of String(name || '')) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function getInitials(name) {
  const words = String(name || '')
    .split(/\s+/)
    .filter((word) => word && !nameParticles.has(word.toLowerCase()));

  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function avatarGradient(name) {
  const palette = avatarPalettes[hashName(name) % avatarPalettes.length];
  return `linear-gradient(145deg, ${palette[0]}, ${palette[1]})`;
}

function formatDate(value) {
  if (!value) return '';
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : String(value);
}

function lifespanShort(person) {
  const year = (value) => {
    const match = String(value || '').match(/\d{4}/);
    return match ? match[0] : '';
  };

  const born = year(person.born);
  const death = year(person.death);

  if (born && death) return `${born} — ${death}`;
  if (born) return `n. ${born}`;
  if (death) return `† ${death}`;
  return '';
}

function lifespanFull(person) {
  if (person.born && person.death) return `${person.born} — ${person.death}`;
  if (person.born) return `Nascimento ${person.born}`;
  if (person.death) return `Falecimento ${person.death}`;
  return 'História da família';
}

function normalizeNames(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      if (item && typeof item === 'object') return String(item.nome || item.name || '').trim();
      return '';
    })
    .filter(Boolean);
}

function normalizeText(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') return String(item.nome || item.name || '').trim();
        return '';
      })
      .filter(Boolean);
  }
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return [];
}

function toText(value) {
  return normalizeText(value).map(escapeHTML).join(', ');
}

// =====================
// Busca
// =====================

function findParentNames(node, targetName) {
  if (!node || !Array.isArray(node.children)) return null;

  for (const child of node.children) {
    if (child.name === targetName) {
      return [node.name, node.spouse].filter(
        (name) => typeof name === 'string' && name.trim() !== '',
      );
    }
    const found = findParentNames(child, targetName);
    if (found) return found;
  }

  return null;
}

function findMainPersonBySpouseName(node, spouseName) {
  if (!node) return null;
  if (node.spouse === spouseName) return node;

  if (
    Array.isArray(node.exSpouses) &&
    node.exSpouses.some((ex) => (typeof ex === 'string' ? ex : ex && ex.name) === spouseName)
  ) {
    return node;
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = findMainPersonBySpouseName(child, spouseName);
      if (found) return found;
    }
  }

  return null;
}

function getPersonData(name) {
  return persons && persons[name] ? { name, ...persons[name] } : { name };
}

function resolvePerson(name) {
  if (!name) return { name: '' };
  if (persons && persons[name]) return { name, ...persons[name] };

  const main = findMainPersonBySpouseName(currentTree, name);
  if (main) {
    const mainData = getPersonData(main.name);
    return {
      name,
      children: mainData.children,
      exSpouses: mainData.exSpouses,
      homes: mainData.homes,
      hometown: mainData.hometown,
      events: mainData.events,
    };
  }

  return { name };
}

function getParentNames(person) {
  const treeParents = findParentNames(currentTree, person.name);
  if (treeParents && treeParents.length) return treeParents;

  if (Array.isArray(person.fathers) && person.fathers.length) {
    return person.fathers.filter((name) => typeof name === 'string' && name.trim());
  }

  return [];
}

// =====================
// Renderização de links e locais
// =====================

function renderPersonLink(name) {
  return `<button type="button" class="person-link" data-person="${escapeHTML(name)}">${escapeHTML(name)}</button>`;
}

function renderLocation(value) {
  if (value === null || value === undefined) return '';
  const text = String(value).trim();
  if (!text) return '';

  const urlMatch = text.match(/^(.*?):\s*(https?:\/\/\S+)$/i);
  if (urlMatch) {
    const label = urlMatch[1].trim() || 'Ver localização';
    return `<a class="detail-link" href="${escapeHTML(urlMatch[2])}" target="_blank" rel="noopener">${escapeHTML(label)}</a>`;
  }

  if (/^https?:\/\//i.test(text)) {
    return `<a class="detail-link" href="${escapeHTML(text)}" target="_blank" rel="noopener">Ver localização</a>`;
  }

  const coords = text.match(
    /(\d+)°\s*(\d+)'\s*([\d.]+)"\s*([NS])\s+(\d+)°\s*(\d+)'\s*([\d.]+)"\s*([EW])/i,
  );

  if (coords) {
    const toDecimal = (degrees, minutes, seconds, direction) => {
      let value = Number(degrees) + Number(minutes) / 60 + Number(seconds) / 3600;
      const dir = direction.toUpperCase();
      if (dir === 'S' || dir === 'W') value = -value;
      return value;
    };

    const latitude = toDecimal(coords[1], coords[2], coords[3], coords[4]);
    const longitude = toDecimal(coords[5], coords[6], coords[7], coords[8]);
    const label = text.slice(0, coords.index).replace(/[:\s]+$/, '').trim();
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return `<a class="detail-link" href="${mapsUrl}" target="_blank" rel="noopener">${escapeHTML(label || 'Ver no mapa')}</a>`;
  }

  return escapeHTML(text);
}

function renderEvents(events) {
  return events
    .map((event) => {
      if (event && typeof event === 'object') {
        const text = event.descricao || event.description || event.text || '';
        const date = event.data || event.date || '';
        if (!text) return '';
        return `${escapeHTML(text)}${
          date ? ` <span class="detail-note">${escapeHTML(formatDate(date))}</span>` : ''
        }`;
      }
      return escapeHTML(String(event));
    })
    .filter(Boolean)
    .join('<br>');
}

function renderDocuments(documents) {
  return documents
    .map((document) => {
      const url = typeof document === 'string' ? document : document && document.url;
      if (!url) return '';
      if (!/^https?:\/\//i.test(url)) return escapeHTML(url);
      return `<a class="detail-link" href="${escapeHTML(url)}" target="_blank" rel="noopener">Ver documento</a>`;
    })
    .filter(Boolean)
    .join(' · ');
}

function calculateAge(born, death) {
  if (!born) return null;

  const toDate = (value) => {
    const parts = String(value).split('/');
    if (parts.length !== 3) return null;
    const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const bornDate = toDate(born);
  if (!bornDate) return null;

  const endDate = death ? toDate(death) : new Date();
  if (!endDate) return null;

  let age = endDate.getFullYear() - bornDate.getFullYear();
  const monthDiff = endDate.getMonth() - bornDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < bornDate.getDate())) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}

// =====================
// Cards e nós da árvore
// =====================

function portraitMarkup(person, large = false) {
  const photoId = typeof person.photo === 'string' ? person.photo.trim() : '';
  const src = photoId
    ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(photoId)}&amp;sz=w800`
    : '';

  return `<span class="portrait${large ? ' portrait--large' : ''}" style="--avatar:${avatarGradient(person.name)}">
    <span class="portrait-initials" aria-hidden="true">${escapeHTML(getInitials(person.name))}</span>
    ${
      src
        ? `<img src="${src}" alt="Retrato de ${escapeHTML(person.name)}" loading="lazy" onerror="this.style.display='none'">`
        : ''
    }
  </span>`;
}

function createPersonCard(name, id, accent, extraClass = '') {
  const person = getPersonData(name);
  const dates = lifespanShort(person);

  return `<button type="button" class="person-card${extraClass ? ` ${extraClass}` : ''}" id="${id}" data-person="${escapeHTML(person.name)}" style="--accent:${accent}">
    ${portraitMarkup(person)}
    <span class="person-body">
      <span class="person-name">${escapeHTML(person.name)}</span>
      <span class="person-dates${dates ? '' : ' is-empty'}">${dates || '&nbsp;'}</span>
    </span>
  </button>`;
}

function createCoupleNode(node, generation, idPrefix) {
  const accent = generationAccents[generation] || generationAccents[generationAccents.length - 1];
  const person = getPersonData(node.name);
  const spouseName = typeof node.spouse === 'string' ? node.spouse.trim() : '';
  const spouse = spouseName ? getPersonData(spouseName) : null;

  let cards = createPersonCard(person.name, `${idPrefix}-main`, accent);

  if (spouse && spouse.name && spouse.name !== person.name) {
    cards += '<span class="couple-bond" aria-hidden="true">&amp;</span>';
    cards += createPersonCard(spouse.name, `${idPrefix}-spouse`, accent);
  }

  if (Array.isArray(node.exSpouses)) {
    node.exSpouses.forEach((ex, exIdx) => {
      const exName = typeof ex === 'string' ? ex : ex && ex.name;
      if (!exName) return;

      cards += createPersonCard(exName, `${idPrefix}-exspouse${exIdx}`, '#a97c6d', 'person-card--ex');
    });
  }

  return `<div class="couple${spouse ? ' couple--pair' : ' couple--single'}" id="${idPrefix}-container">${cards}</div>`;
}

function createFamilyNode(node, generation = 0, idPrefix = 'root') {
  const couple = createCoupleNode(node, generation, idPrefix);
  const childMarkup = [];

  if (Array.isArray(node.children)) {
    node.children.forEach((child, idx) => {
      childMarkup.push(`<div class="child" id="${idPrefix}-child${idx}-family-container" data-connector-source="${idPrefix}-container">
        ${createFamilyNode(child, generation + 1, `${idPrefix}-child${idx}`)}
      </div>`);
    });
  }

  if (Array.isArray(node.exSpouses)) {
    node.exSpouses.forEach((ex, exIdx) => {
      const exName = typeof ex === 'string' ? ex : ex && ex.name;
      if (!exName || !ex || !Array.isArray(ex.children)) return;

      ex.children.forEach((child, childIdx) => {
        childMarkup.push(`<div class="child child--ex" id="${idPrefix}-exspouse${exIdx}-child${childIdx}-family-container" data-connector-source="${idPrefix}-exspouse${exIdx}" data-connector-kind="ex">
          ${createFamilyNode(child, generation + 1, `${idPrefix}-exspouse${exIdx}-child${childIdx}`)}
        </div>`);
      });
    });
  }

  const children = childMarkup.length
    ? `<div class="children">${childMarkup.join('')}</div>`
    : '';

  return `<div class="family-node">${couple}${children}</div>`;
}

// =====================
// Conectores
// =====================

function renderConnectors() {
  const canvas = document.getElementById('tree-canvas');
  const tree = document.getElementById('family-tree');
  if (!canvas || !tree) return;

  canvas.querySelector('.tree-connectors')?.remove();

  const width = Math.ceil(canvas.scrollWidth);
  const height = Math.ceil(canvas.scrollHeight);
  if (!width || !height) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'tree-connectors');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('aria-hidden', 'true');
  svg.style.width = `${width}px`;
  svg.style.height = `${height}px`;

  const canvasRect = canvas.getBoundingClientRect();
  const groups = new Map();

  tree.querySelectorAll('.child[data-connector-source]').forEach((child) => {
    const sourceId = child.dataset.connectorSource;
    const source = document.getElementById(sourceId);
    const target = child.firstElementChild?.querySelector(':scope > .couple');
    if (!source || !target) return;

    if (!groups.has(sourceId)) {
      groups.set(sourceId, {
        source,
        kind: child.dataset.connectorKind === 'ex' ? 'ex' : 'regular',
        targets: [],
      });
    }

    groups.get(sourceId).targets.push(target);
  });

  const round = (value) => Math.round(value * 10) / 10;

  groups.forEach(({ source, kind, targets }) => {
    const sourceRect = source.getBoundingClientRect();
    const sourceX = sourceRect.left - canvasRect.left + sourceRect.width / 2;
    const sourceY = sourceRect.bottom - canvasRect.top;
    const sourceCard = source.classList.contains('couple--single')
      ? source.querySelector('.person-card')
      : null;
    const sourceVisibleBottom = sourceCard
      ? sourceCard.getBoundingClientRect().bottom - canvasRect.top
      : sourceY;
    const points = targets
      .map((target) => {
        const rect = target.getBoundingClientRect();
        const groupTop = rect.top - canvasRect.top;
        const card = target.classList.contains('couple--single')
          ? target.querySelector('.person-card')
          : null;
        return {
          x: rect.left - canvasRect.left + rect.width / 2,
          y: card ? card.getBoundingClientRect().top - canvasRect.top : groupTop,
          groupTop,
        };
      })
      .sort((a, b) => a.x - b.x);

    if (!points.length) return;

    const childTop = Math.min(...points.map((point) => point.groupTop));
    const gap = childTop - sourceY;
    if (gap < 2) return;

    const busY = sourceY + gap / 2;
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', `tree-connector${kind === 'ex' ? ' tree-connector--ex' : ''}`);

    const addPath = (d) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      group.appendChild(path);
    };

    if (sourceVisibleBottom < sourceY - 0.5) {
      addPath(`M ${round(sourceX)} ${round(sourceVisibleBottom)} V ${round(sourceY)}`);
    }

    if (points.length === 1) {
      const point = points[0];
      if (Math.abs(point.x - sourceX) < 1.5) {
        addPath(`M ${round(sourceX)} ${round(sourceY)} V ${round(point.y)}`);
      } else {
        const direction = point.x > sourceX ? 1 : -1;
        const radius = Math.min(
          10,
          Math.abs(point.x - sourceX) / 2,
          Math.max(1, (busY - sourceY) / 2),
          Math.max(1, (point.y - busY) / 2),
        );
        addPath(
          `M ${round(sourceX)} ${round(sourceY)} V ${round(busY - radius)} Q ${round(sourceX)} ${round(busY)} ${round(sourceX + direction * radius)} ${round(busY)} H ${round(point.x - direction * radius)} Q ${round(point.x)} ${round(busY)} ${round(point.x)} ${round(busY + radius)} V ${round(point.y)}`,
        );
      }
    } else {
      const left = points[0];
      const right = points[points.length - 1];
      const sourceInside = sourceX >= left.x - 0.5 && sourceX <= right.x + 0.5;

      addPath(`M ${round(sourceX)} ${round(sourceY)} V ${round(busY)}`);

      if (sourceInside) {
        const radius = Math.min(
          10,
          Math.max(1, (right.x - left.x) / 2),
          Math.max(1, (busY - sourceY) / 2),
          Math.max(1, (childTop - busY) / 2),
        );
        addPath(
          `M ${round(left.x)} ${round(left.y)} V ${round(busY + radius)} Q ${round(left.x)} ${round(busY)} ${round(left.x + radius)} ${round(busY)} H ${round(right.x - radius)} Q ${round(right.x)} ${round(busY)} ${round(right.x)} ${round(busY + radius)} V ${round(right.y)}`,
        );
        points.slice(1, -1).forEach((point) => {
          addPath(`M ${round(point.x)} ${round(busY)} V ${round(point.y)}`);
        });
      } else {
        const busLeft = Math.min(left.x, sourceX);
        const busRight = Math.max(right.x, sourceX);
        addPath(`M ${round(busLeft)} ${round(busY)} H ${round(busRight)}`);
        points.forEach((point) => {
          addPath(`M ${round(point.x)} ${round(busY)} V ${round(point.y)}`);
        });
      }
    }

    points.forEach((point) => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', round(point.x));
      dot.setAttribute('cy', round(point.y - 1.5));
      dot.setAttribute('r', 2.4);
      group.appendChild(dot);
    });

    svg.appendChild(group);
  });

  canvas.prepend(svg);
}

function layoutTree() {
  const treeElement = document.getElementById('family-tree');
  if (!treeElement) return;

  const rootElement = treeElement.querySelector(':scope > .family-node');
  if (!rootElement) return;

  const firstChildren = treeElement.querySelector('.children');
  const childrenStyle = firstChildren ? getComputedStyle(firstChildren) : null;
  const horizontalGap = childrenStyle
    ? parseFloat(childrenStyle.columnGap) || parseFloat(childrenStyle.gap) || 28
    : 28;
  const verticalGap = childrenStyle ? parseFloat(childrenStyle.marginTop) || 58 : 58;

  const build = (element, depth, parent) => {
    const couple = element.querySelector(':scope > .couple');
    if (!couple) return null;

    const rect = couple.getBoundingClientRect();
    const node = {
      element,
      width: rect.width,
      height: rect.height,
      depth,
      parent,
      children: [],
      offsetX: 0,
      localX: 0,
      subtreeWidth: rect.width,
      left: 0,
      top: 0,
    };

    const childrenContainer = element.querySelector(':scope > .children');
    if (childrenContainer) {
      [...childrenContainer.children].forEach((child) => {
        const childFamily = child.firstElementChild;
        if (!childFamily) return;
        const childNode = build(childFamily, depth + 1, node);
        if (childNode) node.children.push(childNode);
      });
    }

    return node;
  };

  const root = build(rootElement, 0, null);
  if (!root) return;

  const measure = (node) => {
    if (!node.children.length) {
      node.subtreeWidth = node.width;
      node.localX = node.width / 2;
      return;
    }

    let cursor = 0;
    const centers = [];

    node.children.forEach((child) => {
      measure(child);
      child.offsetX = cursor;
      centers.push(cursor + child.localX);
      cursor += child.subtreeWidth + horizontalGap;
    });

    const contentWidth = cursor - horizontalGap;
    const parentCenter = (centers[0] + centers[centers.length - 1]) / 2;
    const parentLeft = parentCenter - node.width / 2;
    const minLeft = Math.min(0, parentLeft);
    const maxRight = Math.max(contentWidth, parentLeft + node.width);
    const shift = -minLeft;

    node.localX = parentLeft + shift + node.width / 2;
    node.subtreeWidth = maxRight - minLeft;
    node.children.forEach((child) => {
      child.offsetX += shift;
    });
  };

  measure(root);

  const rowHeight = root.height + verticalGap;
  let maxDepth = 0;

  const place = (node, blockLeft, top) => {
    maxDepth = Math.max(maxDepth, node.depth);
    const left = blockLeft + node.localX - node.width / 2;

    node.element.style.width = `${node.width}px`;
    node.element.style.height = `${node.height}px`;

    if (node.parent) {
      node.element.style.left = `${left - node.parent.left}px`;
      node.element.style.top = `${top - node.parent.top}px`;
    } else {
      node.element.style.left = `${left}px`;
      node.element.style.top = '0px';
    }

    node.left = left;
    node.top = top;

    node.children.forEach((child) => {
      place(child, blockLeft + child.offsetX, top + rowHeight);
    });
  };

  treeElement.classList.add('tree--positioned');
  place(root, 0, 0);

  treeElement.style.width = `${root.subtreeWidth}px`;
  treeElement.style.height = `${maxDepth * rowHeight + root.height}px`;
}

function centerTreeRelativeToFirstCouple() {
  const panWrapper = document.getElementById('tree-pan-wrapper');
  const root = document.getElementById('root-container');
  if (!panWrapper || !root) return;

  requestAnimationFrame(() => {
    const wrapperRect = panWrapper.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const rootCenter =
      rootRect.left - wrapperRect.left + panWrapper.scrollLeft + rootRect.width / 2;
    const rootFamily = root.closest('.family-node');
    const childCouples = rootFamily
      ? [...rootFamily.querySelectorAll(':scope > .children > .child > .family-node > .couple')]
      : [];
    let focusCenter = rootCenter;

    if (childCouples.length) {
      const rightmostCenter = childCouples.reduce((rightmost, couple) => {
        const rect = couple.getBoundingClientRect();
        return Math.max(
          rightmost,
          rect.left - wrapperRect.left + panWrapper.scrollLeft + rect.width / 2,
        );
      }, -Infinity);
      const span = Math.abs(rightmostCenter - rootCenter);

      if (span <= panWrapper.clientWidth - 24) {
        focusCenter = (rootCenter + rightmostCenter) / 2;
      }
    }

    panWrapper.scrollLeft = Math.max(0, focusCenter - panWrapper.clientWidth / 2);
  });
}

function renderTreeWithConnectors() {
  const treeElement = document.getElementById('family-tree');
  if (!treeElement) return;

  treeElement.classList.remove('tree--positioned');
  treeElement.style.width = '';
  treeElement.style.height = '';
  treeElement.innerHTML = createFamilyNode(currentTree, 0, 'root');

  layoutTree();
  centerTreeRelativeToFirstCouple();
  renderConnectors();
}

// =====================
// Controles da árvore
// =====================

function updateTreeControls() {
  const container = document.getElementById('tree-controls');
  if (!container) return;

  const trees = [
    { key: 'schultz', label: 'Schultz' },
    { key: 'koch', label: 'Köch' },
    { key: 'buhring', label: 'Bühring' },
  ];

  container.innerHTML = trees
    .map((tree) => {
      const active = currentTreeStructure === tree.key;
      return `<button type="button" role="tab" aria-selected="${active}" class="${
        active ? 'active' : ''
      }" onclick="switchTreeStructure('${tree.key}')">${tree.label}</button>`;
    })
    .join('');
}

function switchTreeStructure(structure) {
  if (currentTreeStructure === structure) return;

  currentTreeStructure = structure;
  currentTree =
    structure === 'koch' ? treeKoch : structure === 'buhring' ? treeBuhring : treeSchultz;

  renderTreeWithConnectors();
  updateTreeControls();
}

// =====================
// Modal de pessoa
// =====================

function openCardModal(name) {
  const person = resolvePerson(name);

  const existingModal = document.getElementById('card-modal');
  if (existingModal) existingModal.remove();

  const details = [];
  const age = calculateAge(person.born, person.death);
  if (age !== null) details.push(['Idade', `${age} anos`]);

  const parents = getParentNames(person);
  if (parents.length) {
    details.push([
      'Pais',
      parents.map(renderPersonLink).join(' <span class="muted">e</span> '),
    ]);
  }

  if (person.spouse) details.push(['Cônjuge', renderPersonLink(person.spouse)]);

  const children = normalizeNames(person.children);
  if (children.length) details.push(['Filhos', children.map(renderPersonLink).join(', ')]);

  const siblings = normalizeNames(person.siblings);
  if (siblings.length) details.push(['Irmãos', siblings.map(renderPersonLink).join(', ')]);

  if (person.hometown) details.push(['Cidade natal', renderLocation(person.hometown)]);

  const professions = normalizeText(person.profession);
  if (professions.length) {
    details.push(['Profissão', professions.map(escapeHTML).join(', ')]);
  }

  if (person.education) details.push(['Educação', escapeHTML(person.education)]);

  const hobbies = normalizeText(person.hobbies);
  if (hobbies.length) details.push(['Hobbies', hobbies.map(escapeHTML).join(', ')]);

  if (Array.isArray(person.events) && person.events.length) {
    details.push(['Eventos', renderEvents(person.events)]);
  }

  if (Array.isArray(person.documents) && person.documents.length) {
    details.push(['Documentos', renderDocuments(person.documents)]);
  }

  const nicknames = normalizeText(person.nicknames);
  if (nicknames.length) {
    details.push([
      'Apelidos',
      `<span class="muted">${nicknames.map(escapeHTML).join(', ')}</span>`,
    ]);
  }

  if (person.residence) details.push(['Residência', escapeHTML(person.residence)]);
  if (person.religion) details.push(['Religião', escapeHTML(person.religion)]);

  if (Array.isArray(person.homes) && person.homes.length) {
    details.push(['Moradias', person.homes.map(renderLocation).join('<br>')]);
  }

  const exSpouses = normalizeNames(person.exSpouses);
  if (exSpouses.length) details.push(['Ex-cônjuges', exSpouses.map(renderPersonLink).join(', ')]);

  if (person.grave) details.push(['Túmulo', renderLocation(person.grave)]);

  if (person.phone) {
    const phoneHref = String(person.phone).replace(/[^\d+]/g, '');
    details.push([
      'Telefone',
      `<a class="detail-link" href="tel:${escapeHTML(phoneHref)}">${escapeHTML(person.phone)}</a>`,
    ]);
  }

  if (person.email) {
    details.push([
      'E-mail',
      `<a class="detail-link" href="mailto:${escapeHTML(person.email)}">${escapeHTML(person.email)}</a>`,
    ]);
  }

  const quotes = normalizeText(person.quotes);
  const quotesHTML = quotes.length
    ? `<blockquote class="quote-block">${quotes
        .map((quote) => `<p>“${escapeHTML(quote)}”</p>`)
        .join('')}</blockquote>`
    : '';

  const descriptionHTML = person.description
    ? `<div class="description-block"><p>${escapeHTML(person.description)}</p></div>`
    : '';

  const nicknameHTML = nicknames.length
    ? `<p class="person-nickname">“${escapeHTML(nicknames[0])}”</p>`
    : '';

  const expandButton =
    person.photo && String(person.photo).trim()
      ? `<button type="button" class="icon-btn portrait-expand" onclick="expandImageModal(this)" title="Ampliar imagem" aria-label="Ampliar imagem">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"></path>
          </svg>
        </button>`
      : '';

  const modal = document.createElement('div');
  modal.id = 'card-modal';
  modal.className = 'modal-backdrop';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', `Detalhes de ${person.name}`);

  modal.innerHTML = `
    <div class="modal-card person-modal-card" role="document">
      <button type="button" class="modal-close" data-close-modal aria-label="Fechar">
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13"></path>
        </svg>
      </button>
      <div class="person-modal">
        <div class="person-modal__media">
          <div class="portrait-wrap">
            ${portraitMarkup(person, true)}
            ${expandButton}
          </div>
          ${nicknameHTML}
        </div>
        <div class="person-modal__body">
          <p class="eyebrow">Ficha da família</p>
          <h2 class="modal-title">${escapeHTML(person.name)}</h2>
          <p class="modal-subtitle">${escapeHTML(lifespanFull(person))}</p>
          ${person.bio ? `<p class="person-bio">${escapeHTML(person.bio)}</p>` : ''}
          ${
            details.length
              ? `<dl class="detail-grid">${details
                  .map(
                    ([label, value]) =>
                      `<div class="detail"><dt>${label}</dt><dd>${value}</dd></div>`,
                  )
                  .join('')}</dl>`
              : ''
          }
          ${quotesHTML}
          ${descriptionHTML}
          <div class="modal-actions">
            <a class="btn btn-soft" href="formulario.html">Adicionar informação</a>
            <button type="button" class="btn btn-primary" data-close-modal>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.querySelector('.modal-close')?.focus();
}

// =====================
// Modal de apoio / compartilhamento
// =====================

function openQRModal() {
  const existingModal = document.getElementById('qr-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'qr-modal';
  modal.className = 'modal-backdrop';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Apoiar e compartilhar o projeto');

  modal.innerHTML = `
    <div class="modal-card qr-modal-card" role="document">
      <button type="button" class="modal-close" data-close-modal aria-label="Fechar">
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13"></path>
        </svg>
      </button>
      <div class="qr-head">
        <p class="eyebrow">Apoie o projeto</p>
        <h2 class="modal-title">Ajude a manter a história viva</h2>
        <p class="modal-subtitle">Cada contribuição preserva memórias e amplia a árvore da família.</p>
      </div>
      <div class="qr-grid">
        <section class="qr-tile">
          <h3>Contribuição</h3>
          <p>Escaneie o QR Code para apoiar a manutenção da árvore.</p>
          <div class="qr-image-wrap">
            <img src="https://drive.google.com/thumbnail?id=1LO-WBbDiKvKWfcS4gDio8icLLpkDiiai" alt="QR Code para contribuição" loading="lazy">
          </div>
          <div class="qr-actions">
            <button type="button" class="btn btn-soft" onclick="downloadQRCode('contribution')">Baixar</button>
            <button type="button" class="btn btn-primary" onclick="copyPixCode()">Copiar PIX</button>
          </div>
        </section>
        <section class="qr-tile">
          <h3>Compartilhar</h3>
          <p>Convide a família para visitar e completar a árvore.</p>
          <div class="qr-image-wrap">
            <img src="https://drive.google.com/thumbnail?id=1QZHbRYMFyHl-sqagKbCTOt4IsrJ1bKj1" alt="QR Code para compartilhar" loading="lazy">
          </div>
          <div class="qr-actions">
            <button type="button" class="btn btn-soft" onclick="downloadQRCode('share')">Baixar</button>
            <button type="button" class="btn btn-primary" onclick="shareQRCode('share')">Compartilhar</button>
          </div>
        </section>
      </div>
      <p class="qr-foot">Obrigado por cuidar da memória da família Schultz.</p>
    </div>
  `;

  document.body.appendChild(modal);
  modal.querySelector('.modal-close')?.focus();
}

// =====================
// Compartilhamento, PIX e downloads
// =====================

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add('is-visible'));

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function downloadQRCode(type) {
  const ids = {
    contribution: '1LO-WBbDiKvKWfcS4gDio8icLLpkDiiai',
    share: '1QZHbRYMFyHl-sqagKbCTOt4IsrJ1bKj1',
  };

  const id = ids[type];
  if (!id) return;

  const link = document.createElement('a');
  link.href = `https://drive.google.com/uc?export=download&id=${id}`;
  link.download = type === 'contribution' ? 'qr-code-contribuicao.png' : 'qr-code-compartilhamento.png';
  link.click();
}

function getShareURL() {
  const currentURL = window.location.href;
  if (currentURL.includes('localhost') || currentURL.includes('127.0.0.1')) {
    return 'https://bit.ly/Schultz-Family-Tree';
  }
  return currentURL;
}

function shareQRCode(type) {
  const shareURL = getShareURL();
  const shareData =
    type === 'contribution'
      ? {
          title: 'Contribua para a Árvore Genealógica Schultz',
          text: 'Apoie a continuidade da árvore genealógica da família Schultz',
          url: 'https://drive.google.com/thumbnail?id=1LO-WBbDiKvKWfcS4gDio8icLLpkDiiai',
        }
      : {
          title: 'Árvore Genealógica Schultz',
          text: 'Acesse a árvore genealógica da família Schultz',
          url: shareURL,
        };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => showToast('Link copiado para a área de transferência.'))
        .catch(() => showToast('Não foi possível copiar o link.'));
    });
    return;
  }

  navigator.clipboard
    .writeText(shareData.url)
    .then(() => showToast('Link copiado para a área de transferência.'))
    .catch(() => showToast('Não foi possível copiar o link.'));
}

function copyPixCode() {
  const pixCode =
    '00020126360014br.gov.bcb.pix0114+55469997845425204000053039865802BR5921David Herbert Schultz6008Brasilia62080504mpda630459A4';

  const copy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = pixCode;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Código PIX copiado.');
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(pixCode)
      .then(() => showToast('Código PIX copiado.'))
      .catch(copy);
    return;
  }

  copy();
}

// =====================
// Imagem em tela cheia
// =====================

window.expandImageModal = function (button) {
  const img = button.parentElement.querySelector('img');
  if (!img) return;

  const container = document.createElement('div');
  container.className = 'fullscreen-img-container';
  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.zIndex = '99999';
  container.style.background = '#0c100e';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';

  const tempImg = document.createElement('img');
  tempImg.src = img.src;
  tempImg.alt = img.alt;
  tempImg.style.maxWidth = '100vw';
  tempImg.style.maxHeight = '100vh';
  tempImg.style.objectFit = 'contain';

  const exitBtn = document.createElement('button');
  exitBtn.type = 'button';
  exitBtn.setAttribute('aria-label', 'Sair do modo tela cheia');
  exitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"></path></svg>`;
  exitBtn.style.position = 'absolute';
  exitBtn.style.top = '28px';
  exitBtn.style.right = '28px';
  exitBtn.style.zIndex = '100000';
  exitBtn.style.width = '44px';
  exitBtn.style.height = '44px';
  exitBtn.style.display = 'grid';
  exitBtn.style.placeItems = 'center';
  exitBtn.style.background = 'rgba(255,255,255,0.9)';
  exitBtn.style.border = '0';
  exitBtn.style.borderRadius = '9999px';
  exitBtn.style.cursor = 'pointer';
  exitBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
  exitBtn.onclick = (event) => {
    event.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.remove();
    }
  };

  container.appendChild(tempImg);
  container.appendChild(exitBtn);
  document.body.appendChild(container);

  if (container.requestFullscreen) {
    container.requestFullscreen().catch(() => {});
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
};

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    const container = document.querySelector('.fullscreen-img-container');
    if (container && container.parentElement === document.body) {
      container.remove();
    }
  }
});

// =====================
// Eventos globais
// =====================

document.addEventListener('click', (event) => {
  const closeButton = event.target.closest('[data-close-modal]');
  if (closeButton) {
    closeButton.closest('.modal-backdrop')?.remove();
    return;
  }

  const personLink = event.target.closest('.person-link');
  if (personLink) {
    event.preventDefault();
    openCardModal(personLink.dataset.person);
    return;
  }

  const card = event.target.closest('.person-card');
  if (card) {
    openCardModal(card.dataset.person);
    return;
  }

  if (event.target.classList.contains('modal-backdrop')) {
    event.target.remove();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop').forEach((modal) => modal.remove());
  }
});

window.addEventListener('resize', () => {
  layoutTree();
  renderConnectors();
  centerTreeRelativeToFirstCouple();
});

window.addEventListener('load', renderConnectors);

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(renderConnectors);
}

// =====================
// Inicialização
// =====================

function enableCanvasPanning(element) {
  let activePointer = null;
  let startX = 0;
  let startY = 0;
  let startScrollLeft = 0;
  let startScrollTop = 0;
  let moved = false;
  let suppressClick = false;

  element.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    if (event.target.closest('a, input, textarea, select')) return;

    const bounds = element.getBoundingClientRect();
    if (
      event.clientX > bounds.left + element.clientWidth ||
      event.clientY > bounds.top + element.clientHeight
    ) {
      return;
    }

    activePointer = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startScrollLeft = element.scrollLeft;
    startScrollTop = element.scrollTop;
    moved = false;
    element.classList.add('is-panning');
  });

  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerId !== activePointer) return;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      if (!moved) {
        if (Math.hypot(deltaX, deltaY) < 5) return;
        moved = true;
      }

      event.preventDefault();
      element.scrollLeft = startScrollLeft - deltaX;
      element.scrollTop = startScrollTop - deltaY;
    },
    { passive: false },
  );

  const stopPanning = (event) => {
    if (event.pointerId !== activePointer) return;

    element.classList.remove('is-panning');
    activePointer = null;

    if (moved) {
      suppressClick = true;
      window.setTimeout(() => {
        suppressClick = false;
      }, 0);
    }
  };

  document.addEventListener('pointerup', stopPanning);
  document.addEventListener('pointercancel', stopPanning);
  element.addEventListener('dragstart', (event) => event.preventDefault());
  element.addEventListener(
    'click',
    (event) => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );
}

const panWrapper = document.getElementById('tree-pan-wrapper');
if (panWrapper) {
  enableCanvasPanning(panWrapper);
}

const stage = document.querySelector('.stage');
if (stage) {
  stage.addEventListener(
    'pointerdown',
    () => document.getElementById('stage-hint')?.classList.add('is-hidden'),
    { once: true },
  );
}

renderTreeWithConnectors();
updateTreeControls();
