/* ═══════════════════════════════════════════════
   Central de Manutenção 4.0 — app.js
   Full interactivity: navigation, CRUD, filters,
   pagination, charts, modals, toasts, timers
═══════════════════════════════════════════════ */

'use strict';

/* ── DATA ──────────────────────────────────── */
const DATA = {
  tecnicos: [
    { id: 1, nome: 'Roberto S.',   iniciais: 'RS', especialidade: 'Elétrica',    status: 'ocupado', os_ativas: 3, os_concluidas: 127, cor: '#2563eb' },
    { id: 2, nome: 'Ana Paula M.', iniciais: 'AP', especialidade: 'Mecânica',    status: 'livre',   os_ativas: 0, os_concluidas: 89,  cor: '#7c3aed' },
    { id: 3, nome: 'Carlos H.',    iniciais: 'CH', especialidade: 'Hidráulica',  status: 'ocupado', os_ativas: 2, os_concluidas: 215, cor: '#ea580c' },
    { id: 4, nome: 'Juliana F.',   iniciais: 'JF', especialidade: 'Pneumática',  status: 'livre',   os_ativas: 0, os_concluidas: 54,  cor: '#16a34a' },
    { id: 5, nome: 'Marcos A.',    iniciais: 'MA', especialidade: 'Eletrônica',  status: 'ferias',  os_ativas: 0, os_concluidas: 178, cor: '#ca8a04' },
    { id: 6, nome: 'Fernanda L.',  iniciais: 'FL', especialidade: 'Soldagem',    status: 'livre',   os_ativas: 0, os_concluidas: 62,  cor: '#dc2626' },
  ],

  pecas: [
    { codigo: 'SK-4913', nome: 'Agulha Industrial #90', categoria: 'Consumíveis', atual: 12, min: 50 },
    { codigo: 'LUB-02',  nome: 'Óleo Sintético 5L',     categoria: 'Lubrificantes', atual: 2, min: 10 },
    { codigo: 'COR-118', nome: 'Correia B-48',           categoria: 'Transmissão',   atual: 4, min: 8  },
    { codigo: 'ROL-204', nome: 'Rolamento 6205-ZZ',      categoria: 'Rolamentos',    atual: 7, min: 15 },
    { codigo: 'FIL-091', nome: 'Filtro Hidráulico P20',  categoria: 'Filtros',       atual: 3, min: 5  },
    { codigo: 'VED-033', nome: 'Vedante O-Ring 50mm',    categoria: 'Vedações',      atual: 18, min: 30 },
  ],

  ordens: [
    { id: 56, equip: 'Compressor Central B2',    setor: 'Manutenção',       tipo: 'Manutenção',  subtipo: 'Preventiva', prio: 'Média', status: 'em aberto',  tecnico: null,    abertura: 'Hoje, 09:45',   desc: 'Revisão trimestral do compressor.' },
    { id: 55, equip: 'Bancada de Teste Hidráulico', setor: 'Controle Qualidade', tipo: 'Manutenção', subtipo: 'Corretiva', prio: 'Alta',  status: 'em curso',   tecnico: 1,       abertura: 'Ontem, 16:20',  desc: 'Vazamento na linha principal.' },
    { id: 54, equip: 'Esteira Transportadora 03', setor: 'Montagem',        tipo: 'Manutenção',  subtipo: 'Preventiva', prio: 'Baixa', status: 'concluído',  tecnico: 2,       abertura: '22/05, 08:00',  desc: 'Lubrificação dos rolamentos.' },
    { id: 53, equip: 'Máquina de Costura #08',   setor: 'Costura',          tipo: 'Instalação',  subtipo: 'Instalação', prio: 'Alta',  status: 'concluído',  tecnico: 3,       abertura: '21/05, 14:30',  desc: 'Instalação de nova agulha industrial.' },
    { id: 52, equip: 'Painel Elétrico Sala A',   setor: 'Elétrica',         tipo: 'Inspeção',    subtipo: 'Preditiva',  prio: 'Média', status: 'aguardando', tecnico: null,    abertura: '20/05, 11:00',  desc: 'Inspeção preditiva trimestral.' },
    { id: 51, equip: 'Torno CNC Eixo-7',         setor: 'Mecânica',         tipo: 'Manutenção',  subtipo: 'Corretiva',  prio: 'Alta',  status: 'em curso',   tecnico: 1,       abertura: '19/05, 07:45',  desc: 'Falha no eixo Z durante operação.' },
    { id: 50, equip: 'Prensa Hidráulica 200T',    setor: 'Hidráulica',       tipo: 'Manutenção',  subtipo: 'Preventiva', prio: 'Média', status: 'em aberto',  tecnico: null,    abertura: '18/05, 13:20',  desc: 'Revisão do sistema hidráulico.' },
    { id: 49, equip: 'Robô Soldagem MIG',        setor: 'Montagem',         tipo: 'Inspeção',    subtipo: 'Preventiva', prio: 'Baixa', status: 'concluído',  tecnico: 4,       abertura: '17/05, 09:00',  desc: 'Inspeção da tocha e calibração.' },
    { id: 48, equip: 'Balança Industrial 500kg', setor: 'Controle Qualidade', tipo: 'Inspeção',  subtipo: 'Corretiva',  prio: 'Baixa', status: 'concluído',  tecnico: 2,       abertura: '16/05, 16:00',  desc: 'Descalibração detectada. Ajuste realizado.' },
    { id: 47, equip: 'Caldeira Industrial',      setor: 'Mecânica',         tipo: 'Manutenção',  subtipo: 'Preventiva', prio: 'Alta',  status: 'em aberto',  tecnico: null,    abertura: '15/05, 10:30',  desc: 'Limpeza e verificação de válvulas.' },
  ],

  urgentes: [
    { osId: 42, equip: 'Máquina de Costura #12', setor: 'Costura',   tempo: '02:45' },
    { osId: 45, equip: 'Elevador de carga',       setor: 'Montagem',  tempo: '03:10' },
  ],

  notificacoes: [
    { id: 1, texto: 'OS #0042 sem técnico há mais de 2h.', tempo: 'Agora',    tipo: 'red',    lida: false },
    { id: 2, texto: 'OS #0045 sem técnico há mais de 3h.', tempo: '5 min',    tipo: 'red',    lida: false },
    { id: 3, texto: 'Estoque de Agulha Industrial #90 crítico.', tempo: '12 min', tipo: 'orange', lida: false },
    { id: 4, texto: 'Estoque de Óleo Sintético 5L crítico.',     tempo: '15 min', tipo: 'orange', lida: false },
    { id: 5, texto: 'OS #0055 atribuída a Roberto S.',           tempo: '1h',     tipo: 'blue',   lida: false },
    { id: 6, texto: 'OS #0053 concluída por Carlos H.',          tempo: '2h',     tipo: 'green',  lida: true  },
    { id: 7, texto: 'Nova OS #0056 criada.',                     tempo: '3h',     tipo: 'blue',   lida: true  },
  ],
};

/* state */
let osCurrentPage = 1;
const OS_PER_PAGE = 5;
let osFilter = '';
let currentDesignarOS = null;
let currentDetalhesOS = null;
let urgentTimers = {};  // live countdown state

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
function getTecnico(id) {
  return DATA.tecnicos.find(t => t.id === id) || null;
}
function getOS(id) {
  return DATA.ordens.find(o => o.id === id) || null;
}

function subtipoTag(sub) {
  const map = {
    'Preventiva': 'tag--preventiva',
    'Corretiva':  'tag--corretiva',
    'Preditiva':  'tag--preditiva',
    'Instalação': 'tag--instalacao',
    'Inspeção':   'tag--inspecao',
  };
  return `<span class="tag ${map[sub] || ''}">${sub}</span>`;
}

function statusTag(st) {
  const cls = {
    'em aberto':  'status-tag--aberto',
    'em curso':   'status-tag--curso',
    'concluído':  'status-tag--concluido',
    'aguardando': 'status-tag--aguardando',
  };
  const labels = {
    'em aberto':  'EM ABERTO',
    'em curso':   'EM CURSO',
    'concluído':  'CONCLUÍDO',
    'aguardando': 'AGUARDANDO',
  };
  return `<span class="status-tag ${cls[st] || ''}">${labels[st] || st}</span>`;
}

function prioCell(p) {
  return `<span class="prio-dot prio-dot--${p.toLowerCase()}">● ${p}</span>`;
}

function tecnicoCell(id) {
  if (!id) return '<span style="color:var(--text-muted);font-size:12px">Não atribuído</span>';
  const t = getTecnico(id);
  if (!t) return '—';
  return `<span class="tecnico-cell"><span class="mini-avatar" style="background:${t.cor}">${t.iniciais}</span>${t.nome}</span>`;
}

function formatOSId(id) {
  return `#${String(id).padStart(4, '0')}`;
}

/* ══════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════ */
function showToast(msg, type = 'default') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  const icons = { success: '✅', error: '❌', warn: '⚠️', default: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3500);
}

/* ══════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════ */
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const pageEl = document.getElementById(`page-${page}`);
  if (pageEl) pageEl.classList.add('active');

  const link = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (link) link.classList.add('active');

  // close mobile menu
  document.getElementById('mainNav').classList.remove('open');

  // lazy render
  if (page === 'tecnicos') renderTecnicos();
  if (page === 'estoque') renderEstoque();
  if (page === 'relatorios') renderRelatorios();
  if (page === 'ordens') renderOrdensPage();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

/* ══════════════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════════════ */
function renderNotifs() {
  const list = document.getElementById('notifList');
  const badge = document.getElementById('notifBadge');
  const unread = DATA.notificacoes.filter(n => !n.lida);
  badge.textContent = unread.length;
  badge.style.display = unread.length ? '' : 'none';

  list.innerHTML = DATA.notificacoes.map(n => `
    <li class="notif-item ${n.lida ? '' : 'unread'}" data-id="${n.id}">
      <span class="notif-item__dot notif-item__dot--${n.tipo}"></span>
      <div>
        <div class="notif-item__text">${n.texto}</div>
        <div class="notif-item__time">${n.tempo} atrás</div>
      </div>
    </li>
  `).join('');

  list.querySelectorAll('.notif-item').forEach(item => {
    item.addEventListener('click', () => {
      const n = DATA.notificacoes.find(x => x.id === +item.dataset.id);
      if (n) { n.lida = true; renderNotifs(); }
    });
  });
}

document.getElementById('notifBtn').addEventListener('click', e => {
  e.stopPropagation();
  const drawer = document.getElementById('notifDrawer');
  const overlay = document.getElementById('overlay');
  const open = drawer.classList.toggle('open');
  overlay.classList.toggle('hidden', !open);
});

document.getElementById('overlay').addEventListener('click', () => {
  document.getElementById('notifDrawer').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
});

document.getElementById('markAllRead').addEventListener('click', () => {
  DATA.notificacoes.forEach(n => n.lida = true);
  renderNotifs();
  showToast('Todas as notificações marcadas como lidas.', 'success');
});

/* ══════════════════════════════════════════════
   KPI CARDS
══════════════════════════════════════════════ */
function updateKPIs() {
  const abertas    = DATA.ordens.filter(o => o.status !== 'concluído').length;
  const curso      = DATA.ordens.filter(o => o.status === 'em curso').length;
  const concluidas = DATA.ordens.filter(o => o.status === 'concluído').length;
  const atraso     = DATA.urgentes.length;

  animateCount('kpiAbertas',    abertas);
  animateCount('kpiCurso',      curso);
  animateCount('kpiConcluidas', concluidas);
  animateCount('kpiAtraso',     atraso);
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const dur = 700;
  const step = Math.ceil(target / (dur / 16));
  const t = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = String(start).padStart(2, '0');
    if (start >= target) clearInterval(t);
  }, 16);
}

/* ══════════════════════════════════════════════
   URGENT OS
══════════════════════════════════════════════ */
function renderUrgent() {
  const list = document.getElementById('urgentList');
  if (!DATA.urgentes.length) {
    list.innerHTML = `<div style="padding:16px 18px;color:var(--green);font-weight:600;font-size:13px">✅ Nenhuma OS urgente no momento.</div>`;
    return;
  }

  list.innerHTML = DATA.urgentes.map(u => `
    <div class="urgent-item">
      <div class="urgent-os">OS<br>${formatOSId(u.osId)}</div>
      <div class="urgent-info">
        <strong>${u.equip}</strong>
        <span class="urgent-setor-tag">📍 Setor: ${u.setor}</span>
      </div>
      <div class="urgent-timer">
        <span class="urgent-timer__label">TEMPO DE ESPERA</span>
        <span class="urgent-timer__val" id="timer-${u.osId}">${u.tempo}</span>
      </div>
      <button class="btn-designar" data-os="${u.osId}">DESIGNAR TÉCNICO</button>
    </div>
  `).join('');

  list.querySelectorAll('.btn-designar').forEach(btn => {
    btn.addEventListener('click', () => openDesignar(+btn.dataset.os, true));
  });

  // live timers
  startUrgentTimers();
}

function startUrgentTimers() {
  // parse HH:MM into seconds
  DATA.urgentes.forEach(u => {
    const [h, m] = u.tempo.split(':').map(Number);
    urgentTimers[u.osId] = h * 3600 + m * 60;
  });

  clearInterval(window._urgentInterval);
  window._urgentInterval = setInterval(() => {
    DATA.urgentes.forEach(u => {
      urgentTimers[u.osId]++;
      const el = document.getElementById(`timer-${u.osId}`);
      if (!el) return;
      const total = urgentTimers[u.osId];
      const hh = String(Math.floor(total / 3600)).padStart(2, '0');
      const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
      el.textContent = `${hh}:${mm}`;
    });
  }, 1000);
}

/* ══════════════════════════════════════════════
   OS TABLE (Dashboard)
══════════════════════════════════════════════ */
function getFilteredOS() {
  const q = osFilter.toLowerCase();
  return DATA.ordens.filter(o =>
    !q ||
    String(o.id).includes(q) ||
    o.equip.toLowerCase().includes(q) ||
    o.setor.toLowerCase().includes(q) ||
    o.status.toLowerCase().includes(q) ||
    o.prio.toLowerCase().includes(q)
  );
}

function renderOSTable() {
  const filtered = getFilteredOS();
  const total    = filtered.length;
  const pages    = Math.ceil(total / OS_PER_PAGE);
  if (osCurrentPage > pages && pages > 0) osCurrentPage = pages;

  const slice = filtered.slice((osCurrentPage - 1) * OS_PER_PAGE, osCurrentPage * OS_PER_PAGE);

  const tbody = document.getElementById('osTableBody');
  if (!slice.length) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--text-muted)">Nenhuma OS encontrada.</td></tr>`;
  } else {
    tbody.innerHTML = slice.map(o => `
      <tr>
        <td><span class="os-number">${formatOSId(o.id)}</span></td>
        <td>${o.equip}</td>
        <td>${o.setor}</td>
        <td>${subtipoTag(o.subtipo)}</td>
        <td>${prioCell(o.prio)}</td>
        <td>${statusTag(o.status)}</td>
        <td>${tecnicoCell(o.tecnico)}</td>
        <td style="font-size:12px;color:var(--text-secondary)">${o.abertura}</td>
        <td>
          <div class="action-btns">
            <button class="btn-icon" title="Ver detalhes" data-os-view="${o.id}">👁</button>
            <button class="btn-icon" title="Editar" data-os-edit="${o.id}">✏️</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  document.getElementById('tableInfo').textContent =
    `Exibindo ${Math.min((osCurrentPage - 1) * OS_PER_PAGE + 1, total)}–${Math.min(osCurrentPage * OS_PER_PAGE, total)} de ${total} ordens de serviço`;

  renderPagination(pages);
  attachOSActions();
}

function renderPagination(pages) {
  const pag = document.getElementById('pagination');
  pag.innerHTML = '';
  if (pages <= 1) return;

  const prev = document.createElement('button');
  prev.className = 'page-btn';
  prev.textContent = '‹';
  prev.disabled = osCurrentPage === 1;
  prev.addEventListener('click', () => { osCurrentPage--; renderOSTable(); });
  pag.appendChild(prev);

  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-btn${i === osCurrentPage ? ' active' : ''}`;
    btn.textContent = i;
    btn.addEventListener('click', () => { osCurrentPage = i; renderOSTable(); });
    pag.appendChild(btn);
  }

  const next = document.createElement('button');
  next.className = 'page-btn';
  next.textContent = '›';
  next.disabled = osCurrentPage === pages;
  next.addEventListener('click', () => { osCurrentPage++; renderOSTable(); });
  pag.appendChild(next);
}

function attachOSActions() {
  document.querySelectorAll('[data-os-view]').forEach(btn => {
    btn.addEventListener('click', () => openDetalhes(+btn.dataset.osView));
  });
  document.querySelectorAll('[data-os-edit]').forEach(btn => {
    btn.addEventListener('click', () => showToast(`Edição da OS ${formatOSId(+btn.dataset.osEdit)} em breve.`, 'warn'));
  });
}

document.getElementById('osSearch').addEventListener('input', e => {
  osFilter = e.target.value;
  osCurrentPage = 1;
  renderOSTable();
});

/* ══════════════════════════════════════════════
   STOCK TABLE
══════════════════════════════════════════════ */
function renderStockAlert() {
  const critical = DATA.pecas.filter(p => p.atual < p.min);
  const tbody = document.getElementById('stockTableBody');
  tbody.innerHTML = critical.map(p => {
    const cls = p.atual / p.min < 0.3 ? 'stock-val--critical' : 'stock-val--warn';
    return `
      <tr>
        <td class="stock-peca"><strong>${p.nome}</strong><small>Código: ${p.codigo}</small></td>
        <td class="stock-val ${cls}">${p.atual}</td>
        <td class="stock-val">${p.min}</td>
      </tr>
    `;
  }).join('');
}

document.getElementById('verInventarioBtn').addEventListener('click', () => navigateTo('estoque'));

/* ══════════════════════════════════════════════
   MODAL: Nova OS
══════════════════════════════════════════════ */
function openModalOS() {
  // populate technician select
  const sel = document.getElementById('fTecnico');
  sel.innerHTML = '<option value="">Não atribuído</option>' +
    DATA.tecnicos
      .filter(t => t.status !== 'ferias')
      .map(t => `<option value="${t.id}">${t.nome} (${t.especialidade}) — ${t.status === 'livre' ? '✅ Livre' : '🔴 Ocupado'}</option>`)
      .join('');
  document.getElementById('formOS').reset();
  document.getElementById('formOSError').classList.add('hidden');
  document.getElementById('modalOS').classList.remove('hidden');
}

function closeModalOS() {
  document.getElementById('modalOS').classList.add('hidden');
}

document.getElementById('novaOSBtn').addEventListener('click', openModalOS);
document.getElementById('novaOSBtn2').addEventListener('click', openModalOS);
document.getElementById('modalOSClose').addEventListener('click', closeModalOS);
document.getElementById('cancelOSBtn').addEventListener('click', closeModalOS);
document.getElementById('modalOSBackdrop').addEventListener('click', closeModalOS);

document.getElementById('formOS').addEventListener('submit', e => {
  e.preventDefault();
  const equip  = document.getElementById('fEquip').value.trim();
  const setor  = document.getElementById('fSetor').value;
  const tipo   = document.getElementById('fTipo').value;
  const prio   = document.getElementById('fPrio').value;
  const tec    = document.getElementById('fTecnico').value;
  const sub    = document.getElementById('fSubtipo').value;
  const desc   = document.getElementById('fDesc').value.trim();
  const errEl  = document.getElementById('formOSError');

  if (!equip || !setor || !tipo || !prio) {
    errEl.textContent = '⚠ Preencha todos os campos obrigatórios.';
    errEl.classList.remove('hidden');
    return;
  }

  const newId = Math.max(...DATA.ordens.map(o => o.id)) + 1;
  const now = new Date();
  const abertura = `Hoje, ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  DATA.ordens.unshift({
    id: newId, equip, setor, tipo, subtipo: sub,
    prio, status: tec ? 'em curso' : 'em aberto',
    tecnico: tec ? +tec : null, abertura, desc
  });

  // update tecnico stats
  if (tec) {
    const t = getTecnico(+tec);
    if (t) { t.os_ativas++; t.status = 'ocupado'; }
  }

  closeModalOS();
  updateKPIs();
  renderOSTable();
  renderOrdensPage();
  renderRelatorios();

  DATA.notificacoes.unshift({
    id: Date.now(), texto: `Nova OS ${formatOSId(newId)} criada — ${equip}.`,
    tempo: 'Agora', tipo: 'blue', lida: false
  });
  renderNotifs();
  showToast(`OS ${formatOSId(newId)} criada com sucesso!`, 'success');
});

/* ══════════════════════════════════════════════
   MODAL: Designar Técnico
══════════════════════════════════════════════ */
function openDesignar(osId, isUrgent = false) {
  currentDesignarOS = osId;
  const sel = document.getElementById('designarTecSelect');
  sel.innerHTML = DATA.tecnicos
    .filter(t => t.status !== 'ferias')
    .map(t => `<option value="${t.id}">${t.nome} — ${t.status === 'livre' ? '✅ Livre' : '🔴 Ocupado'}</option>`)
    .join('');

  const u = DATA.urgentes.find(x => x.osId === osId);
  const label = u ? u.equip : (getOS(osId) ? getOS(osId).equip : `OS ${formatOSId(osId)}`);
  document.getElementById('modalDesignarOS').textContent =
    `Designar técnico para a OS ${formatOSId(osId)} — ${label}`;

  document.getElementById('modalDesignar').classList.remove('hidden');
}

function closeDesignar() {
  document.getElementById('modalDesignar').classList.add('hidden');
  currentDesignarOS = null;
}

document.getElementById('modalDesignarClose').addEventListener('click', closeDesignar);
document.getElementById('cancelDesignarBtn').addEventListener('click', closeDesignar);
document.getElementById('modalDesignarBackdrop').addEventListener('click', closeDesignar);

document.getElementById('confirmarDesignarBtn').addEventListener('click', () => {
  const tecId = +document.getElementById('designarTecSelect').value;
  const tec   = getTecnico(tecId);
  if (!tec) return;

  // update tecnico
  tec.os_ativas++;
  tec.status = 'ocupado';

  // remove from urgentes
  const idx = DATA.urgentes.findIndex(u => u.osId === currentDesignarOS);
  if (idx > -1) DATA.urgentes.splice(idx, 1);

  // update OS
  const os = getOS(currentDesignarOS);
  if (os) { os.tecnico = tecId; os.status = 'em curso'; }

  closeDesignar();
  renderUrgent();
  updateKPIs();
  renderOSTable();
  renderOrdensPage();
  renderTecnicos();

  DATA.notificacoes.unshift({
    id: Date.now(), texto: `OS ${formatOSId(currentDesignarOS||0)} atribuída a ${tec.nome}.`,
    tempo: 'Agora', tipo: 'blue', lida: false
  });
  renderNotifs();
  showToast(`${tec.nome} designado com sucesso!`, 'success');
});

/* ══════════════════════════════════════════════
   MODAL: Detalhes OS
══════════════════════════════════════════════ */
function openDetalhes(osId) {
  const os = getOS(osId);
  if (!os) return;
  currentDetalhesOS = osId;

  document.getElementById('modalDetalhesTitle').textContent = `OS ${formatOSId(os.id)} — Detalhes`;
  const tec = os.tecnico ? getTecnico(os.tecnico) : null;

  document.getElementById('modalDetalhesBody').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:13.5px;">
      <div><strong style="color:var(--text-muted);font-size:11px;letter-spacing:.08em;font-family:var(--font-mono)">EQUIPAMENTO</strong><p style="margin-top:4px">${os.equip}</p></div>
      <div><strong style="color:var(--text-muted);font-size:11px;letter-spacing:.08em;font-family:var(--font-mono)">SETOR</strong><p style="margin-top:4px">${os.setor}</p></div>
      <div><strong style="color:var(--text-muted);font-size:11px;letter-spacing:.08em;font-family:var(--font-mono)">TIPO / SUBTIPO</strong><p style="margin-top:4px">${os.tipo} / ${os.subtipo}</p></div>
      <div><strong style="color:var(--text-muted);font-size:11px;letter-spacing:.08em;font-family:var(--font-mono)">PRIORIDADE</strong><p style="margin-top:6px">${prioCell(os.prio)}</p></div>
      <div><strong style="color:var(--text-muted);font-size:11px;letter-spacing:.08em;font-family:var(--font-mono)">STATUS</strong><p style="margin-top:6px">${statusTag(os.status)}</p></div>
      <div><strong style="color:var(--text-muted);font-size:11px;letter-spacing:.08em;font-family:var(--font-mono)">TÉCNICO</strong><p style="margin-top:6px">${tec ? tec.nome : 'Não atribuído'}</p></div>
      <div style="grid-column:1/-1"><strong style="color:var(--text-muted);font-size:11px;letter-spacing:.08em;font-family:var(--font-mono)">DESCRIÇÃO</strong><p style="margin-top:4px;color:var(--text-secondary)">${os.desc || '—'}</p></div>
    </div>
  `;

  const concludeBtn = document.getElementById('concluirOSBtn');
  concludeBtn.style.display = os.status === 'concluído' ? 'none' : '';

  document.getElementById('modalDetalhes').classList.remove('hidden');
}

function closeDetalhes() {
  document.getElementById('modalDetalhes').classList.add('hidden');
  currentDetalhesOS = null;
}

document.getElementById('modalDetalhesClose').addEventListener('click', closeDetalhes);
document.getElementById('closeDetalhesBtn').addEventListener('click', closeDetalhes);
document.getElementById('modalDetalhesBackdrop').addEventListener('click', closeDetalhes);

document.getElementById('concluirOSBtn').addEventListener('click', () => {
  const os = getOS(currentDetalhesOS);
  if (!os) return;
  os.status = 'concluído';
  if (os.tecnico) {
    const t = getTecnico(os.tecnico);
    if (t) { t.os_concluidas++; t.os_ativas = Math.max(0, t.os_ativas - 1); if (t.os_ativas === 0) t.status = 'livre'; }
  }
  closeDetalhes();
  updateKPIs(); renderOSTable(); renderOrdensPage(); renderTecnicos(); renderRelatorios();
  showToast(`OS ${formatOSId(os.id)} marcada como concluída!`, 'success');
});

/* ══════════════════════════════════════════════
   ORDENS PAGE
══════════════════════════════════════════════ */
let ordensFilter = { q: '', status: '', prio: '' };

function renderOrdensPage() {
  const filtered = DATA.ordens.filter(o => {
    const q = ordensFilter.q.toLowerCase();
    const matchQ = !q || o.equip.toLowerCase().includes(q) || String(o.id).includes(q) || o.setor.toLowerCase().includes(q);
    const matchS = !ordensFilter.status || o.status === ordensFilter.status;
    const matchP = !ordensFilter.prio  || o.prio.toLowerCase() === ordensFilter.prio;
    return matchQ && matchS && matchP;
  });

  const tbody = document.getElementById('ordensTableBody');
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--text-muted)">Nenhuma OS encontrada.</td></tr>`;
  } else {
    tbody.innerHTML = filtered.map(o => `
      <tr>
        <td><span class="os-number">${formatOSId(o.id)}</span></td>
        <td>${o.equip}</td>
        <td>${o.setor}</td>
        <td>${subtipoTag(o.subtipo)}</td>
        <td>${prioCell(o.prio)}</td>
        <td>${statusTag(o.status)}</td>
        <td>${tecnicoCell(o.tecnico)}</td>
        <td style="font-size:12px;color:var(--text-secondary)">${o.abertura}</td>
        <td>
          <div class="action-btns">
            <button class="btn-icon" title="Ver detalhes" data-os-view="${o.id}">👁</button>
            ${o.status !== 'concluído' ? `<button class="btn-icon" title="Designar técnico" data-os-design="${o.id}">👷</button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  document.getElementById('ordensInfo').textContent = `${filtered.length} ordens de serviço`;

  // attach actions
  document.querySelectorAll('[data-os-view]').forEach(btn => btn.addEventListener('click', () => openDetalhes(+btn.dataset.osView)));
  document.querySelectorAll('[data-os-design]').forEach(btn => btn.addEventListener('click', () => openDesignar(+btn.dataset.osDesign)));
}

document.getElementById('ordensSearch').addEventListener('input', e => {
  ordensFilter.q = e.target.value; renderOrdensPage();
});
document.getElementById('statusFilter').addEventListener('change', e => {
  ordensFilter.status = e.target.value; renderOrdensPage();
});
document.getElementById('prioFilter').addEventListener('change', e => {
  ordensFilter.prio = e.target.value; renderOrdensPage();
});

/* ══════════════════════════════════════════════
   TÉCNICOS PAGE
══════════════════════════════════════════════ */
function renderTecnicos() {
  const grid = document.getElementById('tecnicosGrid');
  grid.innerHTML = DATA.tecnicos.map(t => {
    const statusMap = { livre: 'livre', ocupado: 'ocupado', ferias: 'ferias' };
    const statusLabel = { livre: 'Disponível', ocupado: 'Em Atendimento', ferias: 'Em Férias' };
    return `
      <div class="tecnico-card">
        <div class="tecnico-card__top">
          <div class="tecnico-avatar" style="background:${t.cor}">${t.iniciais}</div>
          <div>
            <div class="tecnico-card__name">${t.nome}</div>
            <div class="tecnico-card__spec">${t.especialidade}</div>
          </div>
        </div>
        <span class="avail-badge avail-badge--${statusMap[t.status]}">${statusLabel[t.status]}</span>
        <div class="tecnico-card__stats">
          <div class="tc-stat">
            <div class="tc-stat__val">${t.os_ativas}</div>
            <div class="tc-stat__label">OS Ativas</div>
          </div>
          <div class="tc-stat">
            <div class="tc-stat__val">${t.os_concluidas}</div>
            <div class="tc-stat__label">Concluídas</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

document.getElementById('novoTecnicoBtn').addEventListener('click', () => {
  showToast('Cadastro de técnico em breve.', 'warn');
});

/* ══════════════════════════════════════════════
   ESTOQUE PAGE
══════════════════════════════════════════════ */
let estoqueFilter = '';

function renderEstoque() {
  const q = estoqueFilter.toLowerCase();
  const filtered = DATA.pecas.filter(p =>
    !q || p.nome.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)
  );

  const tbody = document.getElementById('estoqueTableBody');
  tbody.innerHTML = filtered.map(p => {
    const ratio = p.atual / p.min;
    let st, stCls;
    if (ratio < 0.3) { st = 'Crítico'; stCls = 'status-tag--aberto'; }
    else if (ratio < 1) { st = 'Baixo'; stCls = 'status-tag--curso'; }
    else { st = 'Normal'; stCls = 'status-tag--concluido'; }

    return `
      <tr>
        <td><span class="os-number">${p.codigo}</span></td>
        <td><strong>${p.nome}</strong></td>
        <td style="color:var(--text-secondary)">${p.categoria}</td>
        <td style="font-weight:700;font-family:var(--font-mono);color:${ratio < 1 ? 'var(--red)' : 'var(--green)'}">${p.atual}</td>
        <td style="font-family:var(--font-mono)">${p.min}</td>
        <td><span class="status-tag ${stCls}">${st}</span></td>
        <td>
          <div class="action-btns">
            <button class="btn-icon" title="Repor estoque" onclick="reporPeca('${p.codigo}')">📦</button>
            <button class="btn-icon" title="Editar" onclick="showToast('Edição em breve.','warn')">✏️</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

window.reporPeca = function(codigo) {
  const p = DATA.pecas.find(x => x.codigo === codigo);
  if (!p) return;
  const qty = +(prompt(`Quantas unidades repor para "${p.nome}"?\nAtual: ${p.atual} | Mínimo: ${p.min}`) || 0);
  if (qty > 0) {
    p.atual += qty;
    renderEstoque();
    renderStockAlert();
    showToast(`${qty} unidades de "${p.nome}" adicionadas ao estoque!`, 'success');
  }
};

document.getElementById('estoqueSearch').addEventListener('input', e => {
  estoqueFilter = e.target.value; renderEstoque();
});

document.getElementById('novaPecaBtn').addEventListener('click', () => {
  showToast('Cadastro de peça em breve.', 'warn');
});

/* ══════════════════════════════════════════════
   RELATÓRIOS PAGE
══════════════════════════════════════════════ */
function renderRelatorios() {
  // By status
  const statusCounts = {
    'Em Aberto':  DATA.ordens.filter(o => o.status === 'em aberto').length,
    'Em Curso':   DATA.ordens.filter(o => o.status === 'em curso').length,
    'Concluído':  DATA.ordens.filter(o => o.status === 'concluído').length,
    'Aguardando': DATA.ordens.filter(o => o.status === 'aguardando').length,
  };
  const maxSt = Math.max(...Object.values(statusCounts), 1);
  const colors = { 'Em Aberto': 'var(--blue)', 'Em Curso': 'var(--orange)', 'Concluído': 'var(--green)', 'Aguardando': 'var(--text-muted)' };
  renderBarChart('chartStatus', statusCounts, maxSt, colors);

  // By priority
  const prioCounts = {
    'Alta':  DATA.ordens.filter(o => o.prio === 'Alta').length,
    'Média': DATA.ordens.filter(o => o.prio === 'Média').length,
    'Baixa': DATA.ordens.filter(o => o.prio === 'Baixa').length,
  };
  const maxPr = Math.max(...Object.values(prioCounts), 1);
  const prioColors = { 'Alta': 'var(--red)', 'Média': 'var(--orange)', 'Baixa': 'var(--green)' };
  renderBarChart('chartPrio', prioCounts, maxPr, prioColors);

  // By setor
  const setores = [...new Set(DATA.ordens.map(o => o.setor))];
  const setorCounts = {};
  setores.forEach(s => setorCounts[s] = DATA.ordens.filter(o => o.setor === s && o.status !== 'concluído').length);
  const maxSe = Math.max(...Object.values(setorCounts), 1);
  renderBarChart('chartSetor', setorCounts, maxSe, null);
}

function renderBarChart(containerId, data, max, colorMap) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;

  const defaultColors = ['var(--blue)', 'var(--orange)', 'var(--green)', 'var(--red)', '#7c3aed', '#ca8a04'];
  let ci = 0;

  wrap.innerHTML = Object.entries(data).map(([label, val]) => {
    const pct = max ? (val / max * 100).toFixed(1) : 0;
    const color = colorMap ? (colorMap[label] || defaultColors[ci++ % defaultColors.length]) : defaultColors[ci++ % defaultColors.length];
    return `
      <div class="bar-item">
        <span class="bar-label">${label}</span>
        <div class="bar-track">
          <div class="bar-fill" style="background:${color}" data-pct="${pct}"></div>
        </div>
        <span class="bar-val" style="color:${color}">${val}</span>
      </div>
    `;
  }).join('');

  // animate bars
  requestAnimationFrame(() => {
    wrap.querySelectorAll('.bar-fill').forEach(fill => {
      fill.style.width = fill.dataset.pct + '%';
    });
  });
}

/* ══════════════════════════════════════════════
   FERRAMENTAS PAGE
══════════════════════════════════════════════ */

// MTBF Calculator
document.getElementById('calcMTBFBtn').addEventListener('click', () => {
  const horas  = +document.getElementById('horasOp').value;
  const falhas = +document.getElementById('numFalhas').value;
  const res    = document.getElementById('mtbfResult');

  if (!horas || !falhas || falhas <= 0) {
    res.textContent = '⚠ Preencha os campos corretamente.';
    res.style.background = 'var(--red-light)'; res.style.color = 'var(--red)';
    return;
  }

  const mtbf = (horas / falhas).toFixed(2);
  res.textContent = `MTBF = ${horas}h ÷ ${falhas} falhas = ${mtbf} horas`;
  res.style.background = 'var(--blue-light)'; res.style.color = 'var(--blue)';
});

// QR "Generator"
document.getElementById('gerarQRBtn').addEventListener('click', () => {
  const os = document.getElementById('qrOSInput').value.trim();
  if (!os) { showToast('Informe o número da OS.', 'warn'); return; }
  document.getElementById('qrOSLabel').textContent = os;
  document.getElementById('qrOutput').classList.remove('hidden');
  // Generate pseudo-unique QR pattern via seeded CSS
  const seed = os.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const size = 8 + (seed % 6);
  document.getElementById('qrMock').style.backgroundSize = `${size}px ${size}px`;
  showToast(`QR Code gerado para OS ${os}!`, 'success');
});

// Quick Report
document.getElementById('relRapidoBtn').addEventListener('click', () => {
  const now  = new Date();
  const ts   = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}`;
  const text = `
╔══════════════════════════════════════╗
  RELATÓRIO RÁPIDO — ${ts}
╚══════════════════════════════════════╝

📋 Total OS Abertas:    ${DATA.ordens.filter(o => o.status !== 'concluído').length}
👷 OS Em Atendimento:   ${DATA.ordens.filter(o => o.status === 'em curso').length}
✅ Concluídas Hoje:     ${DATA.ordens.filter(o => o.status === 'concluído').length}
⚠️  OS em Atraso:        ${DATA.urgentes.length}

👷 Técnicos Disponíveis: ${DATA.tecnicos.filter(t => t.status === 'livre').length}/${DATA.tecnicos.length}
📦 Peças em Estoque Crítico: ${DATA.pecas.filter(p => p.atual < p.min).length}

PRIORIDADES:
  🔴 Alta:  ${DATA.ordens.filter(o => o.prio === 'Alta'  && o.status !== 'concluído').length} OS abertas
  🟠 Média: ${DATA.ordens.filter(o => o.prio === 'Média' && o.status !== 'concluído').length} OS abertas
  🟢 Baixa: ${DATA.ordens.filter(o => o.prio === 'Baixa' && o.status !== 'concluído').length} OS abertas
`.trim();

  const el = document.getElementById('relRapidoResult');
  el.textContent = text;
  el.style.display = 'block';
  showToast('Relatório gerado!', 'success');
});

/* ══════════════════════════════════════════════
   FILTER BTN (dashboard)
══════════════════════════════════════════════ */
document.getElementById('filterBtn').addEventListener('click', () => {
  showToast('Filtros avançados em breve.', 'warn');
});

/* ══════════════════════════════════════════════
   EXPORT PDF (mock)
══════════════════════════════════════════════ */
document.getElementById('exportPdfBtn').addEventListener('click', () => {
  showToast('Gerando PDF... funcionalidade em integração.', 'warn');
  setTimeout(() => showToast('PDF pronto para download!', 'success'), 2000);
});

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
function init() {
  updateKPIs();
  renderUrgent();
  renderOSTable();
  renderStockAlert();
  renderNotifs();
}

document.addEventListener('DOMContentLoaded', init);
