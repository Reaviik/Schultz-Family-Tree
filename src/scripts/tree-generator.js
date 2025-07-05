// Array de cores para cada geração
const generationColors = [
  'bg-pink-200', // Casal principal
  'bg-blue-200', // Filhos
  'bg-green-300', // Netos
  'bg-yellow-200', // Bisnetos
  'bg-pink-50', // Tataranetos
  'bg-purple-50', // ...
  'bg-orange-50',
  'bg-cyan-50',
];

const spouseColors = [
  'bg-pink-200', // Cônjuge do casal principal
  'bg-red-100', // Cônjuge dos filhos
  'bg-red-100', // Cônjuge dos netos
  'bg-red-200', // Cônjuge dos bisnetos
  // ... e assim por diante, ou repetir a última cor
];

let connectors = [];

// Variáveis para controlar a estrutura da árvore
let currentTreeStructure = 'schultz'; // 'schultz', 'koch', 'buhring'
let currentTree = treeSchultz; // Referência para a árvore atual

// =====================
// Utilitários
// =====================

function getDataHoje() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

function escapeJson(obj) {
  return JSON.stringify(obj).replace(/\"/g, '&quot;');
}

// =====================
// Busca
// =====================

function findParentsCompat(root, targetName) {
  if (root.spouse && root.children && Array.isArray(root.children)) {
    for (const child of root.children) {
      if (child.name === targetName) return [root, root.spouse];
      const found = findParentsCompat(child, targetName);
      if (found) return found;
    }
  }
  if (root.children && Array.isArray(root.children)) {
    for (const child of root.children) {
      if (child.name === targetName) return [root, null];
      const found = findParentsCompat(child, targetName);
      if (found) return found;
    }
  }
  return null;
}

function findPersonByName(data, targetName) {
  if (data.name === targetName) return data;
  if (data.spouse && data.spouse.name === targetName) return data.spouse;
  if (data.children) {
    for (const child of data.children) {
      const result = findPersonByName(child, targetName);
      if (result) return result;
    }
  }
  return null;
}

function findMainPersonBySpouseName(data, spouseName) {
  if (data.spouse && data.spouse.name === spouseName) return data;
  if (data.children) {
    for (const child of data.children) {
      const result = findMainPersonBySpouseName(child, spouseName);
      if (result) return result;
    }
  }
  return null;
}

// =====================
// Função utilitária para buscar dados completos pelo nome
// =====================

function getPersonData(name) {
  return persons && persons[name] ? { name, ...persons[name] } : { name };
}

// =====================
// Criação de Botões/Links
// =====================

function createPersonLink(name, bgClass, extra = '') {
  const person = getPersonData(name);
  return `<button type="button" class="text-blue-700 underline hover:text-blue-900 font-semibold transition rounded px-1 py-0.5" onclick="openCardModal('${person.name}', '${bgClass}'${extra})">${person.name}</button>`;
}

function createChildrenLinks(childrenNames, bgClass) {
  return childrenNames.map(childName => createPersonLink(childName, bgClass)).join(', ');
}

// =====================
// Renderização de Cards e Nós
// =====================

function createPersonCard(name, bgClass, id) {
  const person = getPersonData(name);
  // Datas formatadas
  const born = person.born || '';
  const death = person.death || '';
  let dateText = '';
  if (born && death) {
    dateText = `${born} - ${death}`;
  } else if (born) {
    dateText = `${born}`;
  } else if (death) {
    dateText = `${death}`;
  }
  return `
    <div id="${id}" class="w-32 mx-auto bg-white rounded-lg shadow p-2 flex flex-col items-center mt-8 cursor-pointer" onclick="openCardModal('${person.name}', '${bgClass}')">
      <h3 class="text-base font-bold mb-1 text-center whitespace-nowrap truncate overflow-hidden max-w-full">${person.name}</h3>
      <img src="${person.photo && person.photo.trim() !== '' ? person.photo : 'https://avatar.iran.liara.run/public/boy?username=Ash'}" alt="Foto de ${person.name}" class="w-28 h-36 rounded-lg object-cover border-4 border-blue-200 mb-1" style="aspect-ratio:3/4;">
      <p class="text-gray-600 italic text-xs">${dateText}</p>
    </div>
  `;
}

function createCoupleNode(node, generation, idPrefix) {
  const person = getPersonData(node.name);
  const mainBg = generationColors[generation] || generationColors[generationColors.length - 1];
  const spouseBg = spouseColors[generation] || spouseColors[generationColors.length - 1];
  const mainId = `${idPrefix}-main`;
  const spouseId = `${idPrefix}-spouse`;
  let coupleHTML = '';
  let exSpousesHTML = '';
  let exSpousesChildrenHTML = '';
  // Spouse
  const spouse = node.spouse ? getPersonData(node.spouse) : null;
  if (node.exSpouses && Array.isArray(node.exSpouses)) {
    exSpousesHTML = node.exSpouses.map((ex, exIdx) =>
      createPersonCard(ex, 'bg-gray-100', `${idPrefix}-exspouse${exIdx}`)
    ).join('');
    exSpousesChildrenHTML = node.exSpouses.map((ex, exIdx) => {
      if (ex.children && ex.children.length > 0) {
        return `<div class="flex flex-col items-center" id="${idPrefix}-exspouse${exIdx}-children-container">
${ex.children.map((child, cidx) =>
          createFamilyNode(child, generation + 1, `${idPrefix}-exspouse${exIdx}-child${cidx}`)
        ).join('')}
</div>`;
      }
      return '';
    }).join('');
  }
  if (spouse) {
    coupleHTML = `<div class="flex flex-row border border-gray-300 rounded-lg gap-6 justify-center items-stretch shadow-lg bg-white bg-opacity-20 p-2" id="${idPrefix}-container">
      ${createPersonCard(person.name, mainBg, mainId)}
      ${createPersonCard(spouse.name, spouseBg, spouseId)}
      ${exSpousesHTML}
    </div>`;
  } else {
    coupleHTML = `<div class="flex flex-row gap-6 justify-center items-stretch shadow-lg bg-white bg-opacity-0 p-2" id="${idPrefix}-container">
      ${createPersonCard(person.name, mainBg, mainId)}
      ${exSpousesHTML}
    </div>`;
  }
  return `<div class="flex flex-col items-center w-full">${coupleHTML}${exSpousesChildrenHTML}</div>`;
}

function createFamilyNode(node, generation = 0, idPrefix = 'root') {
  const nodeHTML = createCoupleNode(node, generation, idPrefix);
  let childrenHTML = '';
  if (node.children && node.children.length > 0) {
    childrenHTML = `
      <div class="w-full flex justify-center" style="margin-top:40px;">
                  <div class="inline-flex flex-row gap-6 md:gap-12 justify-center items-start">
          ${node.children.map((child, idx) =>
            `<div class="flex flex-col items-center" id="${idPrefix}-child${idx}-family-container">
              ${createFamilyNode(child, generation + 1, `${idPrefix}-child${idx}`)}
            </div>`
          ).join('')}
        </div>
      </div>
    `;
  }
  return `<div class="flex flex-col items-center w-full">${nodeHTML}${childrenHTML}</div>`;
}

// =====================
// Renderização e Conexão da Árvore
// =====================

function renderTreeWithConnectors() {
  connectors.forEach(line => line.remove());
  connectors = [];
  document.getElementById('family-tree').innerHTML = createFamilyNode(currentTree, 0, 'root');
  setTimeout(() => {
    connectAllContainers('root', currentTree);
  }, 100);
}

function connectAllContainers(parentId, node) {
  const parentContainer = document.getElementById(`${parentId}-container`);
  if (parentContainer && node.children) {
    node.children.forEach((child, idx) => {
      const childFamilyContainer = document.getElementById(`${parentId}-child${idx}-family-container`);
      const childCard = document.getElementById(`${parentId}-child${idx}-main`);
      if (childFamilyContainer && childCard) {
        const line = new LeaderLine(
          parentContainer,
          childCard,
          {
            color: '#4fffe2',
            size: 2,
            path: 'grid',
            startPlug: 'behind',
            endPlug: 'arrow1',
            gradient: false,
            dropShadow: true,
            dash: false,
            startSocket: 'bottom',
            endSocket: 'top'
          }
        );
        connectors.push(line);
      }
      connectAllContainers(`${parentId}-child${idx}`, child);
    });
  }
  if (node.exSpouses && Array.isArray(node.exSpouses)) {
    node.exSpouses.forEach((ex, exIdx) => {
      if (ex.children && ex.children.length > 0) {
        const exSpouseCard = document.getElementById(`${parentId}-exspouse${exIdx}`);
        ex.children.forEach((child, cidx) => {
          const childCard = document.getElementById(`${parentId}-exspouse${exIdx}-child${cidx}-main`);
          if (exSpouseCard && childCard) {
            const line = new LeaderLine(
              exSpouseCard,
              childCard,
              {
                color: '#ff7e7e',
                size: 2,
                path: 'grid',
                startPlug: 'behind',
                endPlug: 'arrow1',
                gradient: false,
                dropShadow: true,
                dash: false,
                startSocket: 'bottom',
                endSocket: 'top'
              }
            );
            connectors.push(line);
          }
          connectAllContainers(`${parentId}-exspouse${exIdx}-child${cidx}`, child);
        });
      }
    });
  }
}

window.addEventListener('resize', () => {
  connectors.forEach(line => line.position());
});

// =====================
// Modal de Pessoa (adaptado para persons)
// =====================

function openCardModal(name, bgClass, showSpouse = false) {
  const person = getPersonData(name);
  // Remove modal existente se houver
  const existingModal = document.getElementById('card-modal');
  if (existingModal) existingModal.remove();

  // Data de hoje dd/mm/aaaa
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const birthDate = `${day}/${month}/${year}`;

  // Centraliza a lógica de exibição: se showSpouse, monta displayPerson com dados do spouse + filhos/exSpouses do principal
  let displayPerson = person;
  if (showSpouse && person.spouse) {
    displayPerson = {
      ...person.spouse,
      children: person.children,
      exSpouses: person.exSpouses,
      hometown: person.spouse.hometown || person.hometown,
      grave: person.spouse.grave || person.grave,
      death: person.spouse.death || undefined,
      photo: person.spouse.photo || undefined
    };
  }

  // Se for spouse puro (sem filhos nem spouse), tenta complementar com dados do principal
  if (!displayPerson.children && !displayPerson.spouse) {
    const mainPerson = findMainPersonBySpouseName(tree, displayPerson.name);
    if (mainPerson) {
      displayPerson = {
        ...displayPerson,
        children: mainPerson.children,
        exSpouses: mainPerson.exSpouses,
        hometown: displayPerson.hometown || mainPerson.hometown,
        grave: displayPerson.grave || mainPerson.grave
      };
    }
  }

  // Monta spouseLink de forma centralizada
  let spouseLink = '';
  if (displayPerson.spouse) {
    const spouseObj = getPersonData(displayPerson.spouse);
    if (showSpouse) {
      spouseLink = `<a href="#" class="text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5" onclick="openCardModal('${displayPerson.name}', '${bgClass}', false); return false;">${displayPerson.name}</a>`;
    } else {
      spouseLink = `<a href="#" class="text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5" onclick="openCardModal('${spouseObj.name}', '${bgClass}', true); return false;">${spouseObj.name}</a>`;
    }
  } else if (showSpouse) {
    spouseLink = `<a href="#" class="text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5" onclick="openCardModal('${displayPerson.name}', '${bgClass}', false); return false;">${displayPerson.name}</a>`;
  }

  // Monta childrenLinks e exSpousesLinks de forma centralizada
  let childrenLinks = '';
  if (displayPerson.children) {
    childrenLinks = displayPerson.children.map(childName => {
      const child = getPersonData(childName);
      return `<a href="#" class="text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5" onclick="openCardModal('${child.name}', '${bgClass}'); return false;">${child.name}</a>`;
    }).join(', ');
  }
  let exSpousesLinks = '';
  if (displayPerson.exSpouses && Array.isArray(displayPerson.exSpouses) && displayPerson.exSpouses.length > 0) {
    exSpousesLinks = displayPerson.exSpouses.map(exName => {
      const ex = getPersonData(exName);
      return `<a href="#" class="text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5" onclick="openCardModal('${ex.name}', '${bgClass}'); return false;">${ex.name}</a>`;
    }).join(', ');
  }

  // Buscar pais compatível
  let paisInfo = '';
  if (displayPerson.fathers && Array.isArray(displayPerson.fathers) && displayPerson.fathers.length > 0) {
    paisInfo = displayPerson.fathers.map((parentName, idx) => {
      const parent = getPersonData(parentName);
      return `<a href=\"#\" class=\"text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5\" onclick=\"openCardModal('${parent.name}', '${bgClass}'); return false;\">${parent.name}</a>`;
    }).join(' e ');
  } else {
    // Busca tradicional na árvore
    let pai = null, mae = null;
    const paisArr = findParentsCompat(tree, displayPerson.name);
    if (paisArr && paisArr.length > 0) {
      pai = paisArr[0];
      mae = paisArr[1];
    }
    // Buscar o nó principal dos pais
    const paiPrincipal = pai ? findPersonByName(tree, pai.name) : null;
    const maePrincipal = mae ? findPersonByName(tree, mae.name) : null;
    const paiIsSpouse = paiPrincipal && findMainPersonBySpouseName(tree, paiPrincipal.name);
    const maeIsSpouse = maePrincipal && findMainPersonBySpouseName(tree, maePrincipal.name);
    if (paiPrincipal && maePrincipal && paiPrincipal.name !== maePrincipal.name) {
      paisInfo = `<a href=\"#\" class=\"text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5\" onclick=\"openCardModal('${JSON.stringify(paiIsSpouse ? findMainPersonBySpouseName(tree, paiPrincipal.name) : paiPrincipal).replace(/\\\"/g, '&quot;')}', '${bgClass}'${paiIsSpouse ? ', true' : ''}); return false;\">${paiPrincipal.name}</a> e <a href=\"#\" class=\"text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5\" onclick=\"openCardModal('${JSON.stringify(maeIsSpouse ? findMainPersonBySpouseName(tree, maePrincipal.name) : maePrincipal).replace(/\\\"/g, '&quot;')}', '${bgClass}'${maeIsSpouse ? ', true' : ''}); return false;\">${maePrincipal.name}</a>`;
    } else if (paiPrincipal) {
      paisInfo = `<a href=\"#\" class=\"text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5\" onclick=\"openCardModal('${JSON.stringify(paiIsSpouse ? findMainPersonBySpouseName(tree, paiPrincipal.name) : paiPrincipal).replace(/\\\"/g, '&quot;')}', '${bgClass}'${paiIsSpouse ? ', true' : ''}); return false;\">${paiPrincipal.name}</a>`;
    } else if (maePrincipal) {
      paisInfo = `<a href=\"#\" class=\"text-blue-600 hover:text-blue-800 transition-colors font-semibold px-1 py-0.5\" onclick=\"openCardModal('${JSON.stringify(maeIsSpouse ? findMainPersonBySpouseName(tree, maePrincipal.name) : maePrincipal).replace(/\\\"/g, '&quot;')}', '${bgClass}'${maeIsSpouse ? ', true' : ''}); return false;\">${maePrincipal.name}</a>`;
    }
  }

  // Cria o modal
  const modal = document.createElement('div');
  modal.id = 'card-modal';
  modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
  // Fechar ao clicar fora do modal
  modal.onclick = () => modal.remove();

  modal.innerHTML = `
    <div class="relative p-2 sm:p-4 overflow-y-auto w-full h-full flex items-center justify-center" onclick="event.stopPropagation()">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6 w-full relative">
        <div class="flex flex-col md:flex-row items-start gap-6 w-full">
          <!-- Botão de fechar -->
          <button type="button" class="absolute top-2 right-2 text-gray-400 hover:text-gray-900 transition text-sm w-8 h-8 flex justify-center items-center z-10" style="background:none; border:none; outline:none;" onclick="document.getElementById('card-modal').remove(); event.stopPropagation();">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Fechar modal</span>
          </button>
          <div class="w-40 flex-shrink-0 flex flex-col items-center relative">
            <!-- Botão de expandir imagem -->
            <button type="button" onclick="expandImageModal(this)" class="absolute top-2 right-2 text-gray-400 hover:text-gray-900 transition z-10" style="background:none; border:none; outline:none;" title="Ampliar imagem">
              <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8V6a2 2 0 012-2h2m8 0h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2m-8 0H6a2 2 0 01-2-2v-2'/></svg>
            </button>
            <img src="${displayPerson.photo && displayPerson.photo.trim() !== '' ? displayPerson.photo : 'https://avatar.iran.liara.run/public/boy?username=Ash'}" alt="Foto de ${displayPerson.name}" class="w-36 h-48 rounded-lg object-cover border-4 border-blue-200 mb-2" style="aspect-ratio:3/4;">
            ${displayPerson.bio ? `<p class=\"text-gray-700 text-sm text-center mt-2\">${displayPerson.bio}</p>` : ''}
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-1">${displayPerson.name}</h3>
            <p class="text-gray-600 mb-2 italic">${displayPerson.born || ''}${displayPerson.born && displayPerson.death ? ' - ' : ''}${displayPerson.death || ''}</p>
            <ul class="mb-2 text-gray-800 text-sm">
              ${paisInfo ? `<li><span class=\"font-semibold\">Pais:</span> ${paisInfo}</li>` : ''}
              ${displayPerson.spouse ? `<li><span class=\"font-semibold\">Cônjuge:</span> ${spouseLink}</li>` : ''}
              ${childrenLinks ? `<li><span class=\"font-semibold\">Filhos:</span> ${childrenLinks}</li>` : ''}
              ${displayPerson.siblings ? `<li><span class=\"font-semibold\">Irmãos:</span> ${displayPerson.siblings}</li>` : ''}
              ${displayPerson.hometown ? `<li><span class=\"font-semibold\">Cidade Natal:</span> ${(() => {
                const idx = displayPerson.hometown.indexOf(':');
                if (idx !== -1) {
                  const nome = displayPerson.hometown.slice(0, idx).trim();
                  const url = displayPerson.hometown.slice(idx + 1).trim();
                  return `<a href=\"${url}\" target=\"_blank\" class=\"text-blue-600 hover:text-blue-800 transition-colors\">${nome}</a>`;
                } else if (/^https?:\/\//.test(displayPerson.hometown)) {
                  return `<a href=\"${displayPerson.hometown}\" target=\"_blank\" class=\"text-blue-600 hover:text-blue-800 transition-colors\">Ver localização</a>`;
                } else {
                  return displayPerson.hometown;
                }
              })()}</li>` : ''}
              ${displayPerson.profession ? `<li><span class=\"font-semibold\">Profissão:</span> ${Array.isArray(displayPerson.profession) ? displayPerson.profession.join(', ') : displayPerson.profession}</li>` : ''}
              ${displayPerson.education ? `<li><span class=\"font-semibold\">Educação:</span> ${displayPerson.education}</li>` : ''}
              ${displayPerson.hobbies && displayPerson.hobbies.length && displayPerson.hobbies[0] !== "Desconhecido" ? `<li><span class=\"font-semibold\">Hobbies:</span> ${displayPerson.hobbies.join(', ')}</li>` : ''}
              ${displayPerson.events && displayPerson.events.length ? `<li><span class=\"font-semibold\">Eventos:</span> ${displayPerson.events.join(', ')}</li>` : ''}
              ${displayPerson.documents && displayPerson.documents.length ? `<li><span class=\"font-semibold\">Documentos:</span> ${displayPerson.documents.map(doc => `<a href=\"${doc}\" target=\"_blank\" class=\"text-blue-600 hover:text-blue-800 transition-colors\">Ver documento</a>`).join(', ')}</li>` : ''}
              ${displayPerson.nicknames && displayPerson.nicknames.length ? `<li><span class=\"font-semibold\">Apelidos:</span> <span class=\"italic\">${displayPerson.nicknames.join(', ')}</span></li>` : ''}
              ${displayPerson.residence ? `<li><span class=\"font-semibold\">Residência:</span> ${displayPerson.residence}</li>` : ''}
              ${displayPerson.religion ? `<li><span class=\"font-semibold\">Religião:</span> ${displayPerson.religion}</li>` : ''}
              ${displayPerson.homes && displayPerson.homes.length ? `<li><span class=\"font-semibold\">Moradias:</span> ${displayPerson.homes.map(home => {
                const idx = home.indexOf(':');
                if (idx !== -1) {
                  const nome = home.slice(0, idx).trim();
                  const url = home.slice(idx + 1).trim();
                  return `<a href=\"${url}\" target=\"_blank\" class=\"text-blue-600 hover:text-blue-800 transition-colors\">${nome}</a>`;
                } else {
                  return home;
                }
              }).join(', ')}</li>` : ''}
              ${exSpousesLinks ? `<li><span class=\"font-semibold\">Ex-cônjuge(s):</span> ${exSpousesLinks}</li>` : ''}
              ${displayPerson.grave ? `<li><span class=\"font-semibold\">Túmulo:</span> ${(() => {
                const idx = displayPerson.grave.indexOf(':');
                if (idx !== -1) {
                  const nome = displayPerson.grave.slice(0, idx).trim();
                  const url = displayPerson.grave.slice(idx + 1).trim();
                  return `<a href=\"${url}\" target=\"_blank\" class=\"text-blue-600 hover:text-blue-800 transition-colors\">${nome}</a>`;
                } else if (/^https?:\/\//.test(displayPerson.grave)) {
                  return `<a href=\"${displayPerson.grave}\" target=\"_blank\" class=\"text-blue-600 hover:text-blue-800 transition-colors\">Ver localização</a>`;
                } else {
                  return displayPerson.grave;
                }
              })()}</li>` : ''}
            </ul>
            </div>
        </div>
        ${displayPerson.quotes && displayPerson.quotes.length ? `<div class=\"w-full mt-2 max-h-32 overflow-y-auto border-t border-gray-200 pt-2 bg-gray-50 px-0\"><p class=\"block w-full text-gray-700 text-sm italic whitespace-pre-line break-words text-left\">${displayPerson.quotes.map(q => `\"${q}\"`).join('<br>')}</p></div>` : ''}
        ${displayPerson.description ? `<div class=\"w-full mt-4 max-h-40 overflow-y-auto border-t border-gray-300 pt-3 bg-gray-50 px-0\"><p class=\"block w-full text-gray-700 text-sm whitespace-pre-line break-words text-left\">${displayPerson.description}</p></div>` : ''}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// =====================
// Estilos e Eventos Globais
// =====================

// Adicionar estilo global para fullscreen-img
(function() {
  const style = document.createElement('style');
  style.innerHTML = `
    .fullscreen-img:fullscreen {
      object-fit: contain !important;
      width: 100vw !important;
      height: 100vh !important;
      background: #000 !important;
      display: block;
      margin: 0 auto;
      z-index: 99999;
      position: relative;
    }
    .fullscreen-exit-btn {
      position: fixed;
      top: 32px;
      right: 32px;
      z-index: 100000;
      background: rgba(255,255,255,0.8);
      border-radius: 9999px;
      padding: 0.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      cursor: pointer;
      transition: background 0.2s;
    }
    .fullscreen-exit-btn:hover {
      background: #fff;
    }
  `;
  document.head.appendChild(style);
})();

// Função global para expandir imagem em tela cheia
window.expandImageModal = function(btn) {
  const img = btn.parentElement.querySelector('img');
  if (!img) return;
  // Cria um container temporário para fullscreen
  const container = document.createElement('div');
  container.className = 'fullscreen-img-container';
  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.zIndex = '99999';
  container.style.background = '#000';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';

  // Cria a imagem
  const tempImg = document.createElement('img');
  tempImg.src = img.src;
  tempImg.alt = img.alt;
  tempImg.className = 'fullscreen-img';
  tempImg.style.maxWidth = '100vw';
  tempImg.style.maxHeight = '100vh';
  tempImg.style.objectFit = 'contain';
  tempImg.style.background = '#000';

  // Cria botão de sair do fullscreen
  const exitBtn = document.createElement('button');
  exitBtn.className = 'fullscreen-exit-btn';
  exitBtn.title = 'Sair do modo tela cheia';
  exitBtn.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5 text-gray-700' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8V6a2 2 0 012-2h2m8 0h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2m-8 0H6a2 2 0 01-2-2v-2'/></svg>`;
  exitBtn.style.position = 'absolute';
  exitBtn.style.top = '32px';
  exitBtn.style.right = '32px';
  exitBtn.style.zIndex = '100000';
  exitBtn.style.background = 'rgba(255,255,255,0.8)';
  exitBtn.style.borderRadius = '9999px';
  exitBtn.style.padding = '0.5rem';
  exitBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  exitBtn.style.cursor = 'pointer';
  exitBtn.onmouseover = function() { exitBtn.style.background = '#fff'; };
  exitBtn.onmouseout = function() { exitBtn.style.background = 'rgba(255,255,255,0.8)'; };
  exitBtn.onclick = function(e) {
    e.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  container.appendChild(tempImg);
  container.appendChild(exitBtn);
  document.body.appendChild(container);

  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  }
}

document.addEventListener('fullscreenchange', function() {
  // Remove o container temporário ao sair do fullscreen
  if (!document.fullscreenElement) {
    const container = document.querySelector('.fullscreen-img-container');
    if (container && container.parentElement === document.body) {
      container.remove();
    }
  }
});

// =====================
// Inicialização
// =====================

// Função para alternar entre estruturas de árvore
function switchTreeStructure(structure) {
  currentTreeStructure = structure;
  
  switch(structure) {
    case 'schultz':
      currentTree = treeSchultz;
      break;
    case 'koch':
      currentTree = treeKoch;
      break;
    case 'buhring':
      currentTree = treeBuhring;
      break;
    default:
      currentTree = treeSchultz;
  }
  
  renderTreeWithConnectors();
  updateTreeControls();
}

// Função para atualizar os controles da árvore
function updateTreeControls() {
  const controlsContainer = document.getElementById('tree-controls');
  if (!controlsContainer) return;
  
  controlsContainer.innerHTML = `
    <div class="flex flex-wrap gap-2 justify-center mb-4">
      <button onclick="switchTreeStructure('schultz')" class="px-4 py-2 rounded-lg transition-colors ${currentTreeStructure === 'schultz' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
        Árvore Schultz
      </button>
      <button onclick="switchTreeStructure('koch')" class="px-4 py-2 rounded-lg transition-colors ${currentTreeStructure === 'koch' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
        Árvore Köch
      </button>
      <button onclick="switchTreeStructure('buhring')" class="px-4 py-2 rounded-lg transition-colors ${currentTreeStructure === 'buhring' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
        Árvore Bühring
      </button>
    </div>
  `;
}

// Função para criar controles de árvore
function createTreeControls() {
  const treeContainer = document.getElementById('family-tree');
  if (!treeContainer) return;
  
  // Cria container para controles
  const controlsContainer = document.createElement('div');
  controlsContainer.id = 'tree-controls';
  controlsContainer.className = 'w-full mb-6 flex justify-center';
  
  // Insere antes da árvore
  treeContainer.parentNode.insertBefore(controlsContainer, treeContainer);
  
  updateTreeControls();
}

renderTreeWithConnectors();
createTreeControls();