/* ============================================================
   app.js – Central de Manutenção 4.0 – Usuários do Sistema
   ============================================================ */

// ── DATASET ──────────────────────────────────────────────────
const USUARIOS = [
  { id: '#8629', nome: 'Ricardo Mendes',    email: 'r.mendes@dillysports.com',    perfil: 'Técnico',     especialidade: 'Eletromecânica', status: 'Ativo'   },
  { id: '#1002', nome: 'Ana Paula Cavalcanti', email: 'a.cavalcanti@dillysports.com', perfil: 'Gestor',  especialidade: '—',              status: 'Ativo'   },
  { id: '#9231', nome: 'Lucas Oliveira',    email: 'l.oliveira@dillysports.com',   perfil: 'Técnico',     especialidade: 'Pneumática',     status: 'Inativo' },
  { id: '#4412', nome: 'Beatriz Santos',    email: 'b.santos@dillysports.com',     perfil: 'Solicitante', especialidade: '—',              status: 'Ativo'   },
  { id: '#5501', nome: 'Carlos Ferreira',   email: 'c.ferreira@dillysports.com',   perfil: 'Técnico',     especialidade: 'Hidráulica',     status: 'Ativo'   },
  { id: '#3310', nome: 'Fernanda Lima',     email: 'f.lima@dillysports.com',       perfil: 'Gestor',      especialidade: '—',              status: 'Ativo'   },
  { id: '#7788', nome: 'Marcos Souza',      email: 'm.souza@dillysports.com',      perfil: 'Técnico',     especialidade: 'Elétrica',       status: 'Inativo' },
  { id: '#2204', nome: 'Juliana Costa',     email: 'j.costa@dillysports.com',      perfil: 'Solicitante', especialidade: '—',              status: 'Ativo'   },
  { id: '#6650', nome: 'Rafael Almeida',    email: 'r.almeida@dillysports.com',    perfil: 'Técnico',     especialidade: 'Mecânica',       status: 'Ativo'   },
  { id: '#9980', nome: 'Patricia Vieira',   email: 'p.vieira@dillysports.com',     perfil: 'Gestor',      especialidade: '—',              status: 'Ativo'   },
  { id: '#1130', nome: 'Diego Rocha',       email: 'd.rocha@dillysports.com',      perfil: 'Técnico',     especialidade: 'Pneumática',     status: 'Ativo'   },
  { id: '#4421', nome: 'Camila Nunes',      email: 'c.nunes@dillysports.com',      perfil: 'Solicitante', especialidade: '—',              status: 'Inativo' },
];

// ── STATE ──────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;
let state = {
  currentPage: 1,
  filterPerfil: '',
  filterStatus: 'Ativo',
  usuarios: [...USUARIOS],
};

// ── HELPERS ───────────────────────────────────────────────────
function getInitials(nome) {
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

const AVATAR_COLORS = [
  '#1a56d6','#7c3aed','#0891b2','#059669','#d97706',
  '#db2777','#dc2626','#16a34a','#9333ea','#ea580c',
];

function avatarColor(id) {
  const num = parseInt(id.replace('#', '')) || 0;
  return AVATAR_COLORS[num % AVATAR_COLORS.length];
}

function badgeClass(perfil) {
  return {
    'Técnico':     'badge-tecnico',
    'Gestor':      'badge-gestor',
    'Solicitante': 'badge-solicitante',
  }[perfil] || 'badge-gestor';
}

// ── FILTER ────────────────────────────────────────────────────
function filteredUsers() {
  return state.usuarios.filter(u => {
    const matchPerfil  = !state.filterPerfil  || u.perfil  === state.filterPerfil;
    const matchStatus  = !state.filterStatus  || u.status  === state.filterStatus;
    return matchPerfil && matchStatus;
  });
}

// ── RENDER TABLE ──────────────────────────────────────────────
function renderTable() {
  const tbody = document.getElementById('usersTableBody');
  const list  = filteredUsers();
  const total = state.usuarios.length;
  const totalPages = Math.max(1, Math.ceil(list.length / ITEMS_PER_PAGE));

  // clamp page
  if (state.currentPage > totalPages) state.currentPage = totalPages;

  const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
  const page  = list.slice(start, start + ITEMS_PER_PAGE);

  tbody.innerHTML = '';

  if (page.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted);font-style:italic;">
          Nenhum usuário encontrado.
        </td>
      </tr>`;
  } else {
    page.forEach((u, idx) => {
      const tr = document.createElement('tr');
      tr.dataset.index = state.usuarios.indexOf(u);
      tr.style.animationDelay = `${idx * 35}ms`;

      const isAtivo = u.status === 'Ativo';
      tr.innerHTML = `
        <td>
          <div class="user-cell">
            <div class="avatar" style="background:${avatarColor(u.id)}">${getInitials(u.nome)}</div>
            <div class="user-info">
              <div class="user-name">${u.nome}</div>
              <div class="user-id">${u.id}</div>
            </div>
          </div>
        </td>
        <td><a href="mailto:${u.email}" class="email-link">${u.email}</a></td>
        <td><span class="badge ${badgeClass(u.perfil)}">${u.perfil}</span></td>
        <td>${u.especialidade}</td>
        <td><span class="status-pill status-${u.status.toLowerCase()}">${u.status}</span></td>
        <td>
          <div class="actions-cell">
            <button class="action-btn edit" title="Editar" data-action="edit" data-idx="${state.usuarios.indexOf(u)}">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="action-btn delete" title="Excluir" data-action="delete" data-idx="${state.usuarios.indexOf(u)}">
              <i class="fa-regular fa-trash-can"></i>
            </button>
            <button class="action-toggle ${isAtivo ? '' : 'off'}" title="${isAtivo ? 'Desativar' : 'Ativar'}"
              data-action="toggle" data-idx="${state.usuarios.indexOf(u)}"></button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // stats
  document.getElementById('totalCount').textContent = total;
  document.getElementById('onlineCount').textContent = state.usuarios.filter(u => u.status === 'Ativo').length;

  // pagination info
  const showing = page.length;
  document.getElementById('paginationInfo').textContent =
    `Exibindo ${start + 1}-${start + showing} de ${list.length} usuários`;

  renderPagination(totalPages);
}

// ── RENDER PAGINATION ─────────────────────────────────────────
function renderPagination(totalPages) {
  const container = document.getElementById('pagination');
  container.innerHTML = '';

  const prev = makePageBtn('‹', 'arrow', () => {
    if (state.currentPage > 1) { state.currentPage--; renderTable(); }
  });
  container.appendChild(prev);

  const maxVisible = 5;
  let startPage = Math.max(1, state.currentPage - Math.floor(maxVisible / 2));
  let endPage   = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

  for (let p = startPage; p <= endPage; p++) {
    const btn = makePageBtn(p, p === state.currentPage ? 'active' : '', () => {
      state.currentPage = p;
      renderTable();
    });
    container.appendChild(btn);
  }

  const next = makePageBtn('›', 'arrow', () => {
    if (state.currentPage < totalPages) { state.currentPage++; renderTable(); }
  });
  container.appendChild(next);
}

function makePageBtn(label, extraClass, onClick) {
  const btn = document.createElement('button');
  btn.className = `page-btn ${extraClass}`.trim();
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  return btn;
}

// ── TABLE ACTIONS ─────────────────────────────────────────────
document.getElementById('usersTableBody').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const idx    = parseInt(btn.dataset.idx);
  const action = btn.dataset.action;
  const user   = state.usuarios[idx];

  if (action === 'delete') {
    if (confirm(`Remover "${user.nome}" do sistema?`)) {
      state.usuarios.splice(idx, 1);
      renderTable();
    }
  }

  if (action === 'toggle') {
    user.status = user.status === 'Ativo' ? 'Inativo' : 'Ativo';
    renderTable();
  }

  if (action === 'edit') {
    openModal(user);
  }
});

// ── FILTERS ───────────────────────────────────────────────────
document.getElementById('filterPerfil').addEventListener('change', e => {
  state.filterPerfil  = e.target.value;
  state.currentPage   = 1;
  renderTable();
});

document.getElementById('filterStatus').addEventListener('change', e => {
  state.filterStatus  = e.target.value;
  state.currentPage   = 1;
  renderTable();
});

// ── MODAL ─────────────────────────────────────────────────────
const modalOverlay = document.getElementById('modalOverlay');
let editingIdx = null;

function openModal(user = null) {
  editingIdx = null;
  document.getElementById('newNome').value          = '';
  document.getElementById('newEmail').value         = '';
  document.getElementById('newPerfil').value        = 'Técnico';
  document.getElementById('newEspecialidade').value = '';
  document.getElementById('newStatus').value        = 'Ativo';

  if (user) {
    editingIdx = state.usuarios.indexOf(user);
    document.getElementById('newNome').value          = user.nome;
    document.getElementById('newEmail').value         = user.email;
    document.getElementById('newPerfil').value        = user.perfil;
    document.getElementById('newEspecialidade').value = user.especialidade === '—' ? '' : user.especialidade;
    document.getElementById('newStatus').value        = user.status;
  }

  modalOverlay.classList.add('open');
}

function closeModal() {
  modalOverlay.classList.remove('open');
}

document.getElementById('btnNovoUsuario').addEventListener('click', () => openModal());
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('btnCancelar').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

document.getElementById('btnSalvar').addEventListener('click', () => {
  const nome          = document.getElementById('newNome').value.trim();
  const email         = document.getElementById('newEmail').value.trim();
  const perfil        = document.getElementById('newPerfil').value;
  const especialidade = document.getElementById('newEspecialidade').value.trim() || '—';
  const status        = document.getElementById('newStatus').value;

  if (!nome || !email) {
    alert('Preencha ao menos Nome e Email.');
    return;
  }

  if (editingIdx !== null) {
    // edit
    Object.assign(state.usuarios[editingIdx], { nome, email, perfil, especialidade, status });
  } else {
    // create
    const newId = '#' + String(Math.floor(Math.random() * 9000) + 1000);
    state.usuarios.unshift({ id: newId, nome, email, perfil, especialidade, status });
    state.currentPage = 1;
  }

  closeModal();
  renderTable();
});

// ── KEYBOARD CLOSE ────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── INIT ──────────────────────────────────────────────────────
renderTable();
