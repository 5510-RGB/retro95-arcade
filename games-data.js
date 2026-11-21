/**
 * RETRO OYUN ARŞİVİ - OYUN KATALOĞU (games-data.js)
 * ---------------------------------------------------
 * Yeni bir oyun eklemek için:
 * 1. "games/" klasörü içine yeni bir klasör açın (ör: "games/snake/index.html")
 * 2. Aşağıdaki GAMES_CATALOG listesine yeni bir obje { ... } ekleyin.
 * 3. Sayfayı yenilediğinizde oyun otomatik olarak vitrine, aramaya ve kategorilere eklenecektir!
 *
 * Not: Oyununuzun içinden ana siteye yüksek skor göndermek isterseniz:
 * window.parent.postMessage({ type: "RETRO_HIGH_SCORE", gameId: "tetris-1984", score: 1250 }, "*");
 * komutunu çağırabilirsiniz.
 */

window.GAMES_CATALOG = [
  {
    id: "tetris-1984",
    title: "TETRIS (1984)",
    year: 1984,
    decade: "80s",
    category: "Bulmaca",
    developer: "Aleksey Pajitnov",
    platform: "Electronika 60 / IBM PC",
    path: "games/tetris/index.html",
    icon: "🧱",
    accentColor: "#008080",
    featured: true,
    shortDesc: "Sovyet Bilimler Akademisi'nde Electronika 60 terminalinde doğan efsanevi blok yerleştirme oyunu.",
    story: "1984 yılında Moskova'da Aleksey Pajitnov tarafından Electronika 60 bilgisayarı üzerinde geliştirildi. Orijinal bilgisayarda grafik kartı olmadığı için bloklar köşeli parantezler '[]' kullanılarak ASCII karakterleriyle çizilmişti. Daha sonra 1985'te Vadim Gerasimov tarafından IBM PC'ye renkli olarak uyarlandı. Bu sürümde hem 1984 ASCII terminal modunu hem de 1985 renkli PC modunu deneyimleyebilirsiniz.",
    controls: [
      { key: "← / →", action: "Parçayı Sağa / Sola Kaydır" },
      { key: "↑", action: "Saat Yönünde Döndür" },
      { key: "↓", action: "Hızlı İndir (Yumuşak Düşüş)" },
      { key: "SPACE", action: "Anında İndir (Sert Düşüş)" },
      { key: "P", action: "Oyunu Duraklat / Devam Ettir" },
      { key: "ENTER", action: "Oyunu Başlat" }
    ]
  }
];
