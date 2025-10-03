# Dynamische DataTables Demo

Diese Seite zeigt verschiedene Möglichkeiten, wie Sie dynamische DataTables in MkDocs verwenden können.

## Grundlegende Verwendung

### 1. JSON-Daten von URL laden

<div id="json-table-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Warten bis alle Scripts geladen sind
    setTimeout(function() {
        if (typeof DynamicDataTable !== 'undefined') {
            // Einfache Tabelle mit JSON-Daten
            new DynamicDataTable({
                containerId: 'json-table-container',
                title: 'Top Spiele (aus JSON-Datei)',
                dataSource: 'data/games-data.json',
                columns: [
                    { data: 'rank', title: '#', className: 'text-center' },
                    { data: 'name', title: 'Spiel' },
                    { 
                        data: 'owners', 
                        title: 'Besitzer', 
                        className: 'text-right',
                        render: function(data) {
                            return parseInt(data).toLocaleString('de-DE');
                        }
                    },
                    { 
                        data: 'price', 
                        title: 'Preis', 
                        className: 'text-right',
                        render: function(data) {
                            return data === 0 ? 'Kostenlos' : `$${data.toFixed(2)}`;
                        }
                    },
                    { 
                        data: 'rating', 
                        title: 'Bewertung',
                        className: 'text-center',
                        render: function(data) {
                            const stars = '★'.repeat(Math.floor(data)) + '☆'.repeat(10 - Math.floor(data));
                            return `${data}/10`;
                        }
                    }
                ],
                order: [[0, 'asc']],
                pageLength: 5
            });
        }
    }, 500);
});
</script>

### 2. Direkte Daten verwenden

<div id="direct-data-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (typeof DynamicDataTable !== 'undefined') {
            // Direkte Daten-Verwendung
            const sampleData = [
                { id: 1, name: 'League of Legends', genre: 'MOBA', year: 2009, active_players: '180M' },
                { id: 2, name: 'Valorant', genre: 'FPS', year: 2020, active_players: '15M' },
                { id: 3, name: 'World of Warcraft', genre: 'MMORPG', year: 2004, active_players: '26M' },
                { id: 4, name: 'Overwatch 2', genre: 'FPS', year: 2022, active_players: '35M' }
            ];

            new DynamicDataTable({
                containerId: 'direct-data-container',
                title: 'Aktuelle Online-Spiele',
                dataSource: sampleData,
                columns: [
                    { data: 'name', title: 'Spiel' },
                    { data: 'genre', title: 'Genre' },
                    { data: 'year', title: 'Release Jahr', className: 'text-center' },
                    { data: 'active_players', title: 'Aktive Spieler', className: 'text-right' }
                ],
                pageLength: 10
            });
        }
    }, 700);
});
</script>

### 3. Erweiterte Tabelle mit benutzerdefinierten Funktionen

<div id="advanced-table-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (typeof DynamicDataTable !== 'undefined') {
            // Erweiterte Tabelle mit komplexeren Daten
            const advancedData = [
                { 
                    name: 'Cyberpunk 2077', 
                    developer: 'CD Projekt RED', 
                    platforms: ['PC', 'PlayStation', 'Xbox'], 
                    metacritic: 86,
                    release_date: '2020-12-10',
                    image_url: 'https://via.placeholder.com/50x70?text=CP2077'
                },
                { 
                    name: 'The Witcher 3', 
                    developer: 'CD Projekt RED', 
                    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], 
                    metacritic: 93,
                    release_date: '2015-05-19',
                    image_url: 'https://via.placeholder.com/50x70?text=TW3'
                },
                { 
                    name: 'Elden Ring', 
                    developer: 'FromSoftware', 
                    platforms: ['PC', 'PlayStation', 'Xbox'], 
                    metacritic: 96,
                    release_date: '2022-02-25',
                    image_url: 'https://via.placeholder.com/50x70?text=ER'
                }
            ];

            new DynamicDataTable({
                containerId: 'advanced-table-container',
                title: 'RPG Highlights mit erweiterten Features',
                dataSource: advancedData,
                columns: [
                    { 
                        data: 'image_url', 
                        title: 'Cover',
                        render: function(data, row) {
                            return `<img src="${data}" alt="${row.name}" style="width: 40px; height: 56px; object-fit: cover;">`;
                        },
                        className: 'text-center'
                    },
                    { data: 'name', title: 'Spiel' },
                    { data: 'developer', title: 'Entwickler' },
                    { 
                        data: 'platforms', 
                        title: 'Plattformen',
                        render: function(data) {
                            return data.map(platform => `<span class="badge badge-secondary">${platform}</span>`).join(' ');
                        }
                    },
                    { 
                        data: 'metacritic', 
                        title: 'Metacritic',
                        className: 'text-center',
                        render: function(data) {
                            const color = data >= 90 ? 'success' : data >= 75 ? 'warning' : 'danger';
                            return `<span class="badge badge-${color}">${data}</span>`;
                        }
                    },
                    { 
                        data: 'release_date', 
                        title: 'Release',
                        className: 'text-center',
                        render: function(data) {
                            return new Date(data).toLocaleDateString('de-DE');
                        }
                    }
                ],
                order: [[4, 'desc']],  // Nach Metacritic-Score sortieren
                pageLength: 5
            });
        }
    }, 900);
});
</script>

## Verwendung der Hilfsfunktionen

### Einfache Games-Tabelle

<div id="simple-games-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (typeof createGamesTable !== 'undefined') {
            // Verwendung der Hilfsfunktion für Games-Tabellen
            fetch('data/games-data.json')
                .then(response => response.json())
                .then(data => {
                    createGamesTable('simple-games-container', data.games);
                })
                .catch(error => {
                    console.error('Fehler beim Laden der Spiele-Daten:', error);
                });
        }
    }, 1100);
});
</script>

## Anpassung und Styling

Die DataTables können vollständig angepasst werden:

### CSS-Klassen

Sie können eigene CSS-Klassen für Spalten definieren:

```css
.highlight-cell {
    background-color: #fff3cd !important;
    font-weight: bold;
}

.numeric-cell {
    text-align: right;
    font-family: 'Courier New', monospace;
}

.badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
}

.badge-success { background-color: #28a745; color: white; }
.badge-warning { background-color: #ffc107; color: black; }
.badge-danger { background-color: #dc3545; color: white; }
.badge-secondary { background-color: #6c757d; color: white; }
```

### JavaScript-Konfiguration

```javascript
// Beispiel für erweiterte Konfiguration
new DynamicDataTable({
    containerId: 'my-table',
    title: 'Meine Daten',
    dataSource: 'path/to/data.json',
    columns: [
        { 
            data: 'name', 
            title: 'Name',
            render: function(data, row) {
                return `<strong>${data}</strong>`;
            }
        },
        { 
            data: 'value', 
            title: 'Wert',
            className: 'numeric-cell'
        }
    ],
    pageLength: 25,
    order: [[1, 'desc']],
    language: 'de'
});
```

## Verschiedene Datenquellen

### JSON-Dateien
```javascript
dataSource: 'data/my-data.json'
```

### Direkte Arrays
```javascript
dataSource: [
    { name: 'Item 1', value: 100 },
    { name: 'Item 2', value: 200 }
]
```

### Funktionen für dynamische Daten
```javascript
dataSource: async function() {
    const response = await fetch('/api/data');
    return await response.json();
}
```

### CSV-Dateien (mit Hilfsfunktion)
```javascript
dataSource: function() {
    return loadCSVData('data/my-data.csv');
}
```

!!! tip "Tipp"
    Verwenden Sie die Browser-Entwicklertools (F12), um zu sehen, wie die Tabellen geladen werden und eventuelle Fehler zu debuggen.

!!! note "Hinweis"
    Alle DataTables unterstützen automatisch:
    - Responsive Design
    - Sortierung
    - Suche/Filterung  
    - Paginierung
    - Deutsche Lokalisierung

<style>
.dynamic-table-wrapper {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fafafa;
}

.dynamic-table-title {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.2em;
}

.badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    margin: 0 2px;
}

.badge-success { background-color: #28a745; color: white; }
.badge-warning { background-color: #ffc107; color: black; }
.badge-danger { background-color: #dc3545; color: white; }
.badge-secondary { background-color: #6c757d; color: white; }

.text-center { text-align: center; }
.text-right { text-align: right; }
</style>