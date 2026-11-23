/**
 * RETRO95 OYUN ARŞİVİ - OYUN KATALOĞU (games-data.js)
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
  },
  {
    id: "pong-1972",
    title: "PONG (1972)",
    year: 1972,
    decade: "70s",
    category: "Arcade",
    developer: "Allan Alcorn (Atari)",
    platform: "Atari Arcade Kabini",
    path: "games/pong/index.html",
    icon: "🏓",
    accentColor: "#222222",
    featured: true,
    shortDesc: "Video oyun endüstrisini başlatan ilk büyük ticari arcade masa tenisi klasiği.",
    story: "1972 yılında Atari kurucusu Nolan Bushnell'in yeni mühendis Allan Alcorn'a bir alıştırma projesi olarak verdiği Pong, Kaliforniya'daki bir bara yerleştirilen ilk arcade kabininin jeton kutusunu taşıracak kadar büyük bir ilgi gördü. Hem yapay zekaya karşı tek kişilik hem de aynı klavyede 2 kişilik oynayabilirsiniz.",
    controls: [
      { key: "↑ / ↓ veya W / S", action: "Raketi Yukarı / Aşağı Hareket Ettir" },
      { key: "MOD Butonu", action: "1 Oyuncu (CPU) / 2 Oyuncu Seçimi" },
      { key: "ENTER", action: "Maçı Başlat" }
    ]
  },
  {
    id: "breakout-1976",
    title: "ARKANOID // BREAKOUT (1976)",
    year: 1976,
    decade: "70s",
    category: "Arcade",
    developer: "Nolan Bushnell & Steve Wozniak",
    platform: "Atari Arcade / Taito",
    path: "games/breakout/index.html",
    icon: "🎯",
    accentColor: "#006680",
    featured: true,
    shortDesc: "Topu raketle sektirerek renkli tuğla duvarlarını yıktığınız efsanevi refleks oyunu.",
    story: "1976 yılında Atari'de Steve Jobs ve Steve Wozniak'ın donanım tasarımında görev aldığı Breakout, tek oyunculu Pong fikrinden doğdu. 1986 yılında Taito tarafından geliştirilen Arkanoid ile arcade salonlarının vazgeçilmezi haline geldi.",
    controls: [
      { key: "← / → veya A / D", action: "Raketi Sağa / Sola Kaydır" },
      { key: "Fare (Mouse)", action: "Hassas Raket Kontrolü" },
      { key: "ENTER", action: "Topu Fırlat / Başlat" }
    ]
  },
  {
    id: "space-invaders-1978",
    title: "SPACE INVADERS (1978)",
    year: 1978,
    decade: "70s",
    category: "Aksiyon",
    developer: "Tomohiro Nishikado (Taito)",
    platform: "Taito Arcade",
    path: "games/space-invaders/index.html",
    icon: "👾",
    accentColor: "#145214",
    featured: true,
    shortDesc: "Dalga dalga inen pikselli uzaylı ordusuna karşı lazer topunuz ve siperlerinizle dünyayı savunun.",
    story: "1978 yılında Japonya'da Tomohiro Nishikado tarafından geliştirilen Space Invaders, video oyunlarında 'Yüksek Skor (High Score)' kaydeden ilk oyunlardan biridir. Ekrandaki uzaylı sayısı azaldıkça kalan uzaylıların hızlanması, o dönem işlemcinin yükünün hafifleyip kare hızının artmasından doğmuş ve oyun tarihinin en meşhur mekaniği olarak korunmuştur.",
    controls: [
      { key: "← / → veya A / D", action: "Lazer Gemisini Sağa / Sola Kaydır" },
      { key: "SPACE", action: "Lazer Ateşle" },
      { key: "ENTER", action: "Savunmayı Başlat" }
    ]
  },
  {
    id: "pacman-1980",
    title: "PAC-MAN (1980)",
    year: 1980,
    decade: "80s",
    category: "Arcade",
    developer: "Toru Iwatani (Namco)",
    platform: "Namco Arcade",
    path: "games/pacman/index.html",
    icon: "🍒",
    accentColor: "#1a3cff",
    featured: true,
    shortDesc: "Mavi labirentte hayaletlerden kaçarak tüm yemleri toplayın, güç yemleriyle rolleri tersine çevirin!",
    story: "1980 yılında Namco tasarımcısı Toru Iwatani'nin bir dilimi alınmış pizzadan ilham alarak yarattığı Pac-Man, uzay ve savaş temalı oyunların domine ettiği arcade salonlarına herkesin sevebileceği renkli bir labirent deneyimi getirdi ve 80'li yılların en büyük popüler kültür ikonu oldu.",
    controls: [
      { key: "Ok Tuşları / WASD", action: "Pac-Man'i Labirentte Yönlendir" },
      { key: "ENTER", action: "Oyunu Başlat" }
    ]
  },
  {
    id: "minesweeper-1990",
    title: "MAYIN TARLASI (1990)",
    year: 1990,
    decade: "90s",
    category: "Bulmaca",
    developer: "Curt Johnson & Robert Donner",
    platform: "Microsoft Windows 3.1 / 95",
    path: "games/minesweeper/index.html",
    icon: "💣",
    accentColor: "#808080",
    featured: true,
    shortDesc: "Windows 95'in unutulmaz klasiği: Sayı ipuçlarını takip ederek mayınları bayrakla işaretle ve tarlayı temizle.",
    story: "1990 yılında Microsoft Entertainment Pack içinde yayınlanan ve 1992'de Windows 3.1 ile her bilgisayara standart olarak giren Mayın Tarlası (Minesweeper), milyonlarca kullanıcıya fareyle sağ ve sol tıklama alışkanlığını kazandıran efsanevi mantık bulmacasıdır.",
    controls: [
      { key: "Sol Fare Tuşu", action: "Hücreyi Aç (İlk Tıklama Her Zaman Güvenlidir)" },
      { key: "Sağ Fare Tuşu", action: "Mayın Bayrağı Koy / Kaldır (🚩)" },
      { key: "🙂 Gülen Yüz", action: "Yeni Oyun Başlat" }
    ]
  },
  {
    id: "snake-1997",
    title: "SNAKE (1997)",
    year: 1997,
    decade: "90s",
    category: "Arcade",
    developer: "Taneli Armanto (Nokia)",
    platform: "Nokia 6110 / 3310 LCD",
    path: "games/snake/index.html",
    icon: "🐍",
    accentColor: "#306230",
    featured: true,
    shortDesc: "Nokia telefonların yeşil monokrom LCD ekranında milyonları ekrana kilitleyen piksel yılan efsanesi.",
    story: "1997 yılında Nokia mühendisi Taneli Armanto tarafından Nokia 6110 cep telefonu için kodlanan Snake, mobil oyunculuğun doğuşunu simgeler. Orijinal yeşil fosforlu LCD piksel estetiği, hızlanan seviye sistemi ve bonus yemlerle birebir yeniden tasarlandı.",
    controls: [
      { key: "Ok Tuşları / WASD", action: "Yılanı Yönlendir" },
      { key: "DUVAR Butonu", action: "Duvarlardan Geçişli veya Çarpışmalı Mod" },
      { key: "P", action: "Oyunu Duraklat / Devam Ettir" }
    ]
  },
  {
    id: "road-fighter-1984",
    title: "ROAD FIGHTER (1984)",
    year: 1984,
    decade: "80s",
    category: "Yarış",
    developer: "Konami",
    platform: "Konami Arcade / NES",
    path: "games/road-fighter/index.html",
    icon: "🏎️",
    accentColor: "#b71c1c",
    featured: true,
    shortDesc: "Kırmızı spor arabanızla yoğun otoyol trafiğinde makas atın, FUEL araçlarını toplayarak benzininizi bitirmeden tam gaz ilerleyin!",
    story: "1984 yılında Konami tarafından önce arcade kabinlerine, ardından Nintendo Entertainment System (NES / Atari kasetleri) platformuna çıkarılan Road Fighter, Türkiye'de 8-bit konsol döneminin en unutulmaz araba yarışı oyunudur. Şerit değiştiren mavi araçlardan, TIR'lardan ve yoldaki yağ birikintilerinden kaçarken pembe yakıt araçlarını yakalamanız gerekir.",
    controls: [
      { key: "← / → veya A / D", action: "Şerit Değiştir / Direksiyon" },
      { key: "↑ veya SPACE", action: "Turbo Gaz (320 km/h)" },
      { key: "↓", action: "Yavaşla / Fren" }
    ]
  },
  {
    id: "outrun-1986",
    title: "OUTRUN (1986)",
    year: 1986,
    decade: "80s",
    category: "Yarış",
    developer: "Yu Suzuki (Sega AM2)",
    platform: "Sega Arcade Kabini",
    path: "games/outrun/index.html",
    icon: "🌴",
    accentColor: "#ff2a85",
    featured: true,
    shortDesc: "Arkadan görünümlü 3D kıvrımlı otoyolda Ferrari Testarossa ile gün batımına doğru zamana karşı yarışın!",
    story: "1986 yılında Sega'nın efsanevi tasarımcısı Yu Suzuki tarafından geliştirilen OutRun, 'Super Scaler' 3D yol teknolojisi, hareketli direksiyon kabini ve seçilebilir radyo müzikleriyle arcade yarış oyunlarında çığır açtı. Virajlarda merkezkaç kuvvetine karşı direksiyonu dengede tutup süre bitmeden Checkpoint noktalarına ulaşmalısınız.",
    controls: [
      { key: "← / → veya A / D", action: "Virajları Al / Direksiyon" },
      { key: "↑ veya SPACE", action: "Tam Gaz Hızlan" },
      { key: "↓", action: "Keskin Virajlarda Fren" }
    ]
  },
  {
    id: "spy-hunter-1983",
    title: "SPY HUNTER (1983)",
    year: 1983,
    decade: "80s",
    category: "Yarış",
    developer: "Bally Midway",
    platform: "Midway Arcade / Commodore 64",
    path: "games/spy-hunter/index.html",
    icon: "🕵️",
    accentColor: "#007766",
    featured: true,
    shortDesc: "Makineli tüfekli G-6155 Interceptor ajan arabasıyla otoyoldaki zırhlı suikastçı araçlarını imha edin!",
    story: "1983 yılında Bally Midway tarafından yayınlanan Spy Hunter, James Bond filmlerinden ilham alan yüksek tempolu bir araçlı aksiyon klasiğidir. Otoyolda peşinize düşen düşman araçlarını çift makineli tüfekle vurabilir, kırmızı Silah Kamyonuna (W-VAN) yanaşarak zırhınızı ve seri ateş gücünüzü yenileyebilirsiniz.",
    controls: [
      { key: "Ok Tuşları / WASD", action: "Ajan Arabasını Yönlendir" },
      { key: "SPACE", action: "Çift Makineli Tüfek Ateşle" },
      { key: "W-VAN Kamyonu", action: "Zırhı %100 Yenile ve Seri Ateş Al" }
    ]
  }
];
