/**
 * RETRO95 OYUN ARŞİVİ - ANA UYGULAMA MANTIĞI (app.js)
 * ---------------------------------------------------
 * Özellikler:
 * - Arama çubuğu ve Kategori / Dönem (80'ler, 90'lar vb.) filtreleme
 * - LocalStorage üzerinde Favori Oyunlar ve Yüksek Skor kaydı
 * - Sayfa içi Windows 95 Arcade Kabini (Tam ekran destekli, ses ve skor entegrasyonlu)
 * - Oyun Bilgi Kartları (Hikayesi, çıkış yılı, yapımcı ve kontrol tuşları)
 */

(function () {
  const STORAGE_FAVS_KEY = "retro95_favorite_games";
  const STORAGE_SCORES_KEY = "retro95_high_scores";

  // Uygulama Durumu (State)
  const state = {
    searchQuery: "",
    selectedCategory: "ALL", // ALL, FAVORITES, veya kategori adı
    selectedDecade: "ALL",   // ALL, 70s, 80s, 90s, 00s
    sortBy: "default",       // default, year-asc, year-desc, title-asc
    favorites: loadFromStorage(STORAGE_FAVS_KEY, []),
    highScores: loadFromStorage(STORAGE_SCORES_KEY, {}),
    activeGameId: null
  };

  function loadFromStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      // ignore storage errors
    }
  }

  // DOM Elemanları
  const gamesGridEl = document.getElementById("games-grid");
  const categoryTreeEl = document.getElementById("category-tree");
  const searchInputEl = document.getElementById("search-input");
  const sortSelectEl = document.getElementById("sort-select");
  const decadeButtonsEl = document.querySelectorAll("[data-decade]");

  // İstatistik & Durum Çubuğu Elemanları
  const statTotalGamesEl = document.getElementById("stat-total-games");
  const statFavGamesEl = document.getElementById("stat-fav-games");
  const statTopScoreEl = document.getElementById("stat-top-score");
  const statusMainTextEl = document.getElementById("status-main-text");
  const statusFilterTextEl = document.getElementById("status-filter-text");

  // Arcade Modal Elemanları
  const arcadeModalEl = document.getElementById("arcade-modal");
  const arcadeTitleEl = document.getElementById("arcade-window-title");
  const arcadeIframeEl = document.getElementById("arcade-iframe");
  const arcadeStoryEl = document.getElementById("arcade-story");
  const arcadeControlsEl = document.getElementById("arcade-controls");
  const arcadeMetaListEl = document.getElementById("arcade-meta-list");
  const arcadeHighScoreEl = document.getElementById("arcade-high-score");
  const taskbarActiveGameBtn = document.getElementById("taskbar-active-game");

  // Bilgi Kartı Modal Elemanları
  const infoModalEl = document.getElementById("info-modal");
  const infoModalTitleEl = document.getElementById("info-modal-title");
  const infoModalBodyEl = document.getElementById("info-modal-body");

  // Başlangıç
  function init() {
    renderCategoryTree();
    renderGamesGrid();
    updateSystemStats();
    setupEventListeners();
    startClock();
  }

  // Sol Menüdeki Klasör / Kategori Ağacını Oluştur
  function renderCategoryTree() {
    const games = window.GAMES_CATALOG || [];
    const categoriesMap = {};

    games.forEach(g => {
      const cat = g.category || "Diğer";
      categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
    });

    const items = [
      { id: "ALL", label: "📁 Tüm Oyunlar", count: games.length },
      { id: "FAVORITES", label: "⭐ Favorilerim", count: state.favorites.length }
    ];

    Object.keys(categoriesMap).sort().forEach(cat => {
      items.push({
        id: cat,
        label: `📂 ${cat}`,
        count: categoriesMap[cat]
      });
    });

    categoryTreeEl.innerHTML = items
      .map(
        item => `
        <li class="tree-item ${state.selectedCategory === item.id ? "selected" : ""}" data-cat="${escapeHtml(item.id)}">
          <span>${escapeHtml(item.label)}</span>
          <span class="tree-count">(${item.count})</span>
        </li>
      `
      )
      .join("");

    categoryTreeEl.querySelectorAll(".tree-item").forEach(li => {
      li.addEventListener("click", () => {
        state.selectedCategory = li.getAttribute("data-cat");
        renderCategoryTree();
        renderGamesGrid();
      });
    });
  }

  // Filtrelenmiş ve Sıralanmış Oyunları Hesapla
  function getFilteredGames() {
    const games = (window.GAMES_CATALOG || []).slice();
    const q = state.searchQuery.trim().toLowerCase();

    return games
      .filter(game => {
        if (state.selectedCategory === "FAVORITES") {
          if (!state.favorites.includes(game.id)) return false;
        } else if (state.selectedCategory !== "ALL") {
          if (game.category !== state.selectedCategory) return false;
        }

        if (state.selectedDecade !== "ALL") {
          if (game.decade !== state.selectedDecade) return false;
        }

        if (q) {
          const haystack = `${game.title} ${game.developer} ${game.category} ${game.year} ${game.platform} ${game.shortDesc}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (state.sortBy === "year-asc") return (a.year || 0) - (b.year || 0);
        if (state.sortBy === "year-desc") return (b.year || 0) - (a.year || 0);
        if (state.sortBy === "title-asc") return a.title.localeCompare(b.title, "tr");
        return 0;
      });
  }

  // Oyun Kartları Vitrinini Çiz
  function renderGamesGrid() {
    const filtered = getFilteredGames();

    statusMainTextEl.textContent = `${filtered.length} oyun listeleniyor (Toplam Arşiv: ${(window.GAMES_CATALOG || []).length})`;
    statusFilterTextEl.textContent = `Kategori: ${state.selectedCategory === "ALL" ? "Tümü" : state.selectedCategory === "FAVORITES" ? "Favoriler" : state.selectedCategory} | Dönem: ${state.selectedDecade === "ALL" ? "Tümü" : state.selectedDecade}`;

    if (filtered.length === 0) {
      gamesGridEl.innerHTML = `
        <div class="win-panel" style="padding: 20px; text-align: center; grid-column: 1 / -1;">
          <strong>Aradığınız kriterlere uygun oyun bulunamadı.</strong>
        </div>
      `;
      return;
    }

    const cardsHtml = filtered
      .map(game => {
        const isFav = state.favorites.includes(game.id);
        const bestScore = state.highScores[game.id] || 0;

        return `
        <article class="game-card win-outset">
          <div class="game-card-header">
            <span>${escapeHtml(game.icon || "🕹️")} ${escapeHtml(game.title)}</span>
            <button class="fav-star-btn ${isFav ? "is-fav" : ""}" data-fav-id="${escapeHtml(game.id)}" title="Favorilere Ekle / Çıkar">
              ${isFav ? "★" : "☆"}
            </button>
          </div>

          <div class="game-card-Preview win-inset">
            <span class="preview-badge">${escapeHtml(String(game.year))} // ${escapeHtml(game.category)}</span>
            <div class="preview-icon">${escapeHtml(game.icon || "🕹️")}</div>
            <div class="preview-meta">${escapeHtml(game.platform)}</div>
            <span class="preview-score-badge" title="Kayıtlı En Yüksek Skor">REKOR: ${bestScore}</span>
          </div>

          <div class="game-card-body">
            <div class="game-tags">
              <span class="win-tag">👤 ${escapeHtml(game.developer)}</span>
              <span class="win-tag">📅 ${escapeHtml(String(game.year))}</span>
            </div>
            <p class="game-desc">${escapeHtml(game.shortDesc)}</p>
          </div>

          <div class="game-card-actions">
            <button class="win-btn win-btn-primary" data-play-id="${escapeHtml(game.id)}">
              ▶ OYNA
            </button>
            <button class="win-btn" data-info-id="${escapeHtml(game.id)}">
              ℹ BİLGİ KARTI
            </button>
          </div>
        </article>
      `;
      })
      .join("");

    gamesGridEl.innerHTML = cardsHtml;

    // Kart Buton Dinleyicileri
    gamesGridEl.querySelectorAll("[data-play-id]").forEach(btn => {
      btn.addEventListener("click", () => openGameCabinet(btn.getAttribute("data-play-id")));
    });

    gamesGridEl.querySelectorAll("[data-info-id]").forEach(btn => {
      btn.addEventListener("click", () => openGameInfoModal(btn.getAttribute("data-info-id")));
    });

    gamesGridEl.querySelectorAll("[data-fav-id]").forEach(btn => {
      btn.addEventListener("click", () => toggleFavorite(btn.getAttribute("data-fav-id")));
    });
  }

  // Favori Ekle / Çıkar
  function toggleFavorite(gameId) {
    const idx = state.favorites.indexOf(gameId);
    if (idx === -1) {
      state.favorites.push(gameId);
    } else {
      state.favorites.splice(idx, 1);
    }
    saveToStorage(STORAGE_FAVS_KEY, state.favorites);
    renderCategoryTree();
    renderGamesGrid();
    updateSystemStats();
  }

  // Yüksek Skor Güncelleme
  function recordHighScore(gameId, scoreValue) {
    const numericScore = Number(scoreValue) || 0;
    const currentBest = state.highScores[gameId] || 0;
    if (numericScore > currentBest) {
      state.highScores[gameId] = numericScore;
      saveToStorage(STORAGE_SCORES_KEY, state.highScores);
      updateSystemStats();
      renderGamesGrid();
      if (state.activeGameId === gameId && arcadeHighScoreEl) {
        arcadeHighScoreEl.textContent = numericScore;
      }
    }
  }

  // Sol Alttaki Sistem İstatistiklerini Güncelle
  function updateSystemStats() {
    const games = window.GAMES_CATALOG || [];
    statTotalGamesEl.textContent = games.length;
    statFavGamesEl.textContent = state.favorites.length;

    const scores = Object.values(state.highScores);
    const maxScore = scores.length > 0 ? Math.max(...scores) : 0;
    statTopScoreEl.textContent = maxScore;
  }

  // Sayfa İçi Arcade Kabininde Oyunu Aç
  function openGameCabinet(gameId) {
    const game = (window.GAMES_CATALOG || []).find(g => g.id === gameId);
    if (!game) return;

    state.activeGameId = game.id;
    arcadeTitleEl.textContent = `${game.icon || "🕹️"} ${game.title} - Retro95 Arcade Kabini`;
    arcadeIframeEl.src = game.path;
    arcadeStoryEl.textContent = game.story || game.shortDesc;
    arcadeHighScoreEl.textContent = state.highScores[game.id] || 0;

    arcadeMetaListEl.innerHTML = `
      <div><strong>Çıkış Yılı:</strong> ${escapeHtml(String(game.year))}</div>
      <div><strong>Yapımcı:</strong> ${escapeHtml(game.developer)}</div>
      <div><strong>Platform:</strong> ${escapeHtml(game.platform)}</div>
      <div><strong>Kategori:</strong> ${escapeHtml(game.category)}</div>
    `;

    arcadeControlsEl.innerHTML = (game.controls || [])
      .map(
        c => `
        <tr>
          <td><span class="key-badge">${escapeHtml(c.key)}</span></td>
          <td>${escapeHtml(c.action)}</td>
        </tr>
      `
      )
      .join("");

    arcadeModalEl.classList.remove("hidden");
    taskbarActiveGameBtn.classList.remove("hidden");
    taskbarActiveGameBtn.textContent = `${game.icon || "🕹️"} ${game.title}`;

    // Iframe yüklendiğinde klavye kontrollerinin hemen çalışması için odakla
    arcadeIframeEl.onload = () => {
      arcadeIframeEl.contentWindow.focus();
    };
  }

  function closeGameCabinet() {
    arcadeModalEl.classList.add("hidden");
    arcadeIframeEl.src = "about:blank";
    state.activeGameId = null;
    taskbarActiveGameBtn.classList.add("hidden");
  }

  // Oyun Bilgi Kartı Modalını Aç
  function openGameInfoModal(gameId) {
    const game = (window.GAMES_CATALOG || []).find(g => g.id === gameId);
    if (!game) return;

    const bestScore = state.highScores[game.id] || 0;
    infoModalTitleEl.textContent = `ℹ ${game.title} - Oyun Bilgi Kartı`;

    const controlsRows = (game.controls || [])
      .map(
        c => `
        <tr>
          <td><span class="key-badge">${escapeHtml(c.key)}</span></td>
          <td>${escapeHtml(c.action)}</td>
        </tr>
      `
      )
      .join("");

    infoModalBodyEl.innerHTML = `
      <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 12px;">
        <div class="win-inset" style="font-size: 42px; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; background: #000;">
          ${escapeHtml(game.icon || "🕹️")}
        </div>
        <div>
          <h3 style="margin: 0 0 4px 0;">${escapeHtml(game.title)}</h3>
          <div><strong>Yapımcı:</strong> ${escapeHtml(game.developer)} | <strong>Yıl:</strong> ${escapeHtml(String(game.year))}</div>
          <div><strong>Orijinal Platform:</strong> ${escapeHtml(game.platform)}</div>
          <div><strong>Kişisel Rekorunuz:</strong> <span style="color: #000080; font-weight: bold;">${bestScore} Puan</span></div>
        </div>
      </div>

      <div class="win-panel" style="padding: 10px; margin-bottom: 12px;">
        <strong>📜 Oyunun Hikayesi ve Tarihçesi:</strong>
        <p style="margin: 6px 0 0 0;">${escapeHtml(game.story || game.shortDesc)}</p>
      </div>

      <div class="win-panel" style="padding: 10px; margin-bottom: 14px;">
        <strong>⌨️ Kontrol Tuşları Rehberi:</strong>
        <table class="controls-table" style="margin-top: 6px;">
          <tbody>${controlsRows}</tbody>
        </table>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <button class="win-btn win-btn-primary" id="info-modal-play-btn">▶ Hemen Oyna</button>
        <button class="win-btn" id="info-modal-close-btn">Kapat</button>
      </div>
    `;

    infoModalEl.classList.remove("hidden");

    document.getElementById("info-modal-play-btn").addEventListener("click", () => {
      infoModalEl.classList.add("hidden");
      openGameCabinet(game.id);
    });

    document.getElementById("info-modal-close-btn").addEventListener("click", () => {
      infoModalEl.classList.add("hidden");
    });
  }

  // Olay Dinleyicileri
  function setupEventListeners() {
    // Arama Çubuğu
    searchInputEl.addEventListener("input", e => {
      state.searchQuery = e.target.value;
      renderGamesGrid();
    });

    document.getElementById("clear-search-btn").addEventListener("click", () => {
      searchInputEl.value = "";
      state.searchQuery = "";
      state.selectedCategory = "ALL";
      state.selectedDecade = "ALL";
      decadeButtonsEl.forEach(b => b.classList.toggle("active", b.getAttribute("data-decade") === "ALL"));
      renderCategoryTree();
      renderGamesGrid();
    });

    // Sıralama
    sortSelectEl.addEventListener("change", e => {
      state.sortBy = e.target.value;
      renderGamesGrid();
    });

    // Dönem (80'ler, 90'lar vb.) Filtre Butonları
    decadeButtonsEl.forEach(btn => {
      btn.addEventListener("click", () => {
        state.selectedDecade = btn.getAttribute("data-decade");
        decadeButtonsEl.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderGamesGrid();
      });
    });

    // Sağ üst tam ekran butonu
    const winFsBtn = document.getElementById("window-fullscreen-btn");
    if (winFsBtn) {
      winFsBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      });
    }

    // Arcade Kabini Kontrolleri
    document.getElementById("close-arcade-btn").addEventListener("click", closeGameCabinet);
    document.getElementById("exit-arcade-btn").addEventListener("click", closeGameCabinet);

    document.getElementById("restart-arcade-btn").addEventListener("click", () => {
      if (arcadeIframeEl.src) {
        arcadeIframeEl.contentWindow.location.reload();
        arcadeIframeEl.contentWindow.focus();
      }
    });

    document.getElementById("fullscreen-arcade-btn").addEventListener("click", () => {
      const cabinet = document.getElementById("iframe-cabinet-box");
      if (cabinet.requestFullscreen) {
        cabinet.requestFullscreen();
      } else if (cabinet.webkitRequestFullscreen) {
        cabinet.webkitRequestFullscreen();
      }
      arcadeIframeEl.contentWindow.focus();
    });

    // Manuel veya Oyun İçi Skor Kaydı
    document.getElementById("manual-score-btn").addEventListener("click", () => {
      if (!state.activeGameId) return;
      const current = state.highScores[state.activeGameId] || 0;
      const input = prompt("Bu oyunda yaptığınız en yüksek skoru girin:", String(current));
      if (input !== null) {
        recordHighScore(state.activeGameId, Number(input));
      }
    });

    // Oyun Iframe'inden Gelen Otomatik Yüksek Skor Mesajlarını Dinle
    window.addEventListener("message", event => {
      if (event.data && event.data.type === "RETRO_HIGH_SCORE") {
        const targetId = event.data.gameId || state.activeGameId;
        if (targetId) {
          recordHighScore(targetId, event.data.score);
        }
      }
    });

    // Bilgi Modalını Kapatma
    document.getElementById("close-info-modal-x").addEventListener("click", () => {
      infoModalEl.classList.add("hidden");
    });

    // Mobil / Dokunmatik Sanal Gamepad Tuşlarını Aktif Iframe'e İlet
    setupMobileGamepad();

    // Üst Menü Öğeleri
    document.getElementById("menu-all-games").addEventListener("click", () => {
      state.selectedCategory = "ALL";
      renderCategoryTree();
      renderGamesGrid();
    });

    document.getElementById("menu-fav-games").addEventListener("click", () => {
      state.selectedCategory = "FAVORITES";
      renderCategoryTree();
      renderGamesGrid();
    });

    document.getElementById("menu-reset-scores").addEventListener("click", () => {
      if (confirm("Kaydedilen tüm yüksek skorları sıfırlamak istediğinize emin misiniz?")) {
        state.highScores = {};
        saveToStorage(STORAGE_SCORES_KEY, state.highScores);
        updateSystemStats();
        renderGamesGrid();
      }
    });

    // Başlat Menüsü Aç / Kapat
    const startBtn = document.getElementById("start-btn");
    const startMenu = document.getElementById("start-menu");

    startBtn.addEventListener("click", e => {
      e.stopPropagation();
      startMenu.classList.toggle("hidden");
      startBtn.classList.toggle("active");
    });

    document.addEventListener("click", () => {
      startMenu.classList.add("hidden");
      startBtn.classList.remove("active");
    });

    document.getElementById("start-menu-all").addEventListener("click", () => {
      state.selectedCategory = "ALL";
      renderCategoryTree();
      renderGamesGrid();
    });

    document.getElementById("start-menu-favs").addEventListener("click", () => {
      state.selectedCategory = "FAVORITES";
      renderCategoryTree();
      renderGamesGrid();
    });
  }

  // Mobil / Dokunmatik Gamepad Desteği (Hem bas-çek hem basılı tutma destekli)
  function setupMobileGamepad() {
    const padButtons = document.querySelectorAll("#mobile-gamepad [data-key]");
    let holdTimer = null;

    function dispatchKeyToGame(type, key, code) {
      if (!arcadeIframeEl || !arcadeIframeEl.contentWindow) return;
      try {
        const win = arcadeIframeEl.contentWindow;
        const doc = win.document;
        const evt = new KeyboardEvent(type, {
          key: key,
          code: code,
          bubbles: true,
          cancelable: true
        });
        doc.dispatchEvent(evt);
        win.dispatchEvent(evt);
      } catch (e) {
        // ignore cross-frame error if any
      }
    }

    padButtons.forEach(btn => {
      const key = btn.getAttribute("data-key");
      const code = btn.getAttribute("data-code");

      const handlePressStart = e => {
        e.preventDefault();
        btn.classList.add("active");
        dispatchKeyToGame("keydown", key, code);

        if (holdTimer) clearInterval(holdTimer);
        // Tetris veya Snake gibi keydown tekrarlarıyla çalışan oyunlar için basılı tutunca tekrarla
        if (["ArrowLeft", "ArrowRight", "ArrowDown", "Space"].includes(code)) {
          holdTimer = setInterval(() => {
            dispatchKeyToGame("keydown", key, code);
          }, 115);
        }
      };

      const handlePressEnd = e => {
        e.preventDefault();
        btn.classList.remove("active");
        if (holdTimer) {
          clearInterval(holdTimer);
          holdTimer = null;
        }
        dispatchKeyToGame("keyup", key, code);
      };

      btn.addEventListener("touchstart", handlePressStart, { passive: false });
      btn.addEventListener("touchend", handlePressEnd, { passive: false });
      btn.addEventListener("touchcancel", handlePressEnd, { passive: false });

      btn.addEventListener("mousedown", handlePressStart);
      btn.addEventListener("mouseup", handlePressEnd);
      btn.addEventListener("mouseleave", handlePressEnd);
    });
  }

  // Sağ Alt Görev Çubuğu Saati
  function startClock() {
    const clockEl = document.getElementById("tray-clock");
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      clockEl.textContent = `${hours}:${mins}`;
    }
    updateClock();
    setInterval(updateClock, 15000);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
