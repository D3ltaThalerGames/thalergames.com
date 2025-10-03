# Dynamische DataTables in MkDocs - Vollständige Anleitung

Diese Anleitung zeigt Ihnen, wie Sie das dynamische DataTables-System in Ihrem MkDocs-Projekt verwenden und erweitern können.

## Übersicht

Das dynamische DataTables-System besteht aus:

1. **`dynamic-datatables.js`** - Haupt-JavaScript-Klasse für dynamische Tabellen
2. **JSON-Datenstrukturen** - Flexibles Datenformat für Ihre Inhalte  
3. **MkDocs-Integration** - Nahtlose Einbindung in Ihre Dokumentation
4. **Responsive Design** - Automatische Anpassung an alle Bildschirmgrößen

## Schnellstart

### 1. Grundlegende Verwendung

Erstellen Sie eine einfache dynamische Tabelle in Ihrer Markdown-Datei:

```html
<div id="my-table-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (typeof DynamicDataTable !== 'undefined') {
            new DynamicDataTable({
                containerId: 'my-table-container',
                title: 'Meine Daten',
                dataSource: 'data/my-data.json',
                columns: [
                    { data: 'name', title: 'Name' },
                    { data: 'value', title: 'Wert' }
                ]
            });
        }
    }, 500);
});
</script>
```

### 2. JSON-Datenstruktur

Erstellen Sie eine JSON-Datei in `docs/data/`:

```json
{
  "items": [
    { "name": "Item 1", "value": 100 },
    { "name": "Item 2", "value": 200 }
  ],
  "metadata": {
    "last_updated": "2025-10-03T10:00:00Z",
    "total_items": 2
  }
}
```

## Detaillierte Konfiguration

### DynamicDataTable Klasse

```javascript
new DynamicDataTable({
    // Container-Einstellungen
    containerId: 'my-table',          // ID des HTML-Containers
    tableId: 'my-data-table',         // ID der generierten Tabelle
    title: 'Meine Tabelle',           // Titel über der Tabelle
    
    // Datenquelle (eine der folgenden Optionen)
    dataSource: 'data/data.json',     // URL zu JSON-Datei
    dataSource: arrayData,            // Direktes JavaScript-Array
    dataSource: async function() {    // Asynchrone Funktion
        return await fetchData();
    },
    
    // Spalten-Definition
    columns: [
        {
            data: 'fieldName',        // Feldname in den Daten
            title: 'Spalten-Titel',  // Angezeigter Titel
            className: 'css-class',  // CSS-Klasse für die Spalte
            render: function(data, row) {  // Custom Renderer
                return `<strong>${data}</strong>`;
            }
        }
    ],
    
    // DataTables-Optionen
    pageLength: 25,                   // Einträge pro Seite
    ordering: true,                   // Sortierung aktivieren
    searching: true,                  // Suche aktivieren
    responsive: true,                 // Responsive Design
    language: 'de',                   // Sprache (de/en)
    order: [[0, 'asc']],             // Standard-Sortierung
    
    // Erweiterte Optionen
    columnDefs: [                     // Spalten-spezifische Einstellungen
        { targets: 0, width: '50px' },
        { targets: 1, type: 'num' }
    ]
});
```

### Spalten-Renderer

Verwenden Sie Renderer für benutzerdefinierte Darstellung:

```javascript
columns: [
    {
        data: 'price',
        title: 'Preis',
        render: function(data, row) {
            return data === 0 ? 'Kostenlos' : `€${data.toFixed(2)}`;
        }
    },
    {
        data: 'rating',
        title: 'Bewertung',
        render: function(data, row) {
            const stars = '★'.repeat(Math.floor(data));
            return `${stars} (${data}/5)`;
        }
    },
    {
        data: 'tags',
        title: 'Tags',
        render: function(data, row) {
            return data.map(tag => 
                `<span class="badge">${tag}</span>`
            ).join(' ');
        }
    }
]
```

## Verschiedene Datenquellen

### 1. JSON-Dateien

```javascript
// Einfache JSON-Datei
dataSource: 'data/games.json'

// Mit Pfad-Auflösung für verschachtelte Daten
dataSource: 'data/complex.json',
columns: [
    { data: 'game.title', title: 'Spiel' },
    { data: 'stats.players', title: 'Spieler' }
]
```

### 2. CSV-Dateien

```javascript
// Mit der loadCSVData Hilfsfunktion
dataSource: function() {
    return loadCSVData('data/games.csv');
}
```

### 3. API-Endpunkte

```javascript
dataSource: async function() {
    try {
        const response = await fetch('/api/games');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('API-Fehler:', error);
        return [];
    }
}
```

### 4. Lokale Daten

```javascript
const gameData = [
    { name: 'Spiel 1', genre: 'Action' },
    { name: 'Spiel 2', genre: 'RPG' }
];

dataSource: gameData
```

## Hilfsfunktionen

### createGamesTable()

Schnelle Erstellung von Spiele-Tabellen:

```javascript
// Einfach
createGamesTable('container-id', 'data/games.json');

// Oder mit Daten-Array
const games = [/* ... */];
createGamesTable('container-id', games);
```

### loadCSVData()

CSV-Dateien laden und konvertieren:

```javascript
const csvData = await loadCSVData('data/games.csv');
```

## Styling und Design

### CSS-Anpassungen

Erstellen Sie eigene Styles in `docs/stylesheets/custom.css`:

```css
/* Container-Styling */
.dynamic-table-wrapper {
    margin: 20px 0;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Titel-Styling */
.dynamic-table-title {
    color: #495057;
    font-size: 1.5em;
    margin-bottom: 15px;
    border-bottom: 2px solid #dee2e6;
    padding-bottom: 10px;
}

/* Badge-System */
.badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    border-radius: 0.25rem;
    margin: 0 2px;
}

.badge-success { background: #28a745; color: white; }
.badge-warning { background: #ffc107; color: black; }
.badge-danger { background: #dc3545; color: white; }
.badge-info { background: #17a2b8; color: white; }

/* Responsive Anpassungen */
@media (max-width: 768px) {
    .dynamic-table-wrapper {
        padding: 10px;
        margin: 10px 0;
    }
    
    .dynamic-table-title {
        font-size: 1.2em;
    }
}
```

### Bootstrap-Integration

Falls Sie Bootstrap verwenden:

```javascript
new DynamicDataTable({
    // ... andere Optionen
    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
         '<"row"<"col-sm-12"tr>>' +
         '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
});
```

## Erweiterte Features

### Mehrsprachigkeit

```javascript
// Deutsche Lokalisierung
language: 'de'

// Oder manuell
language: {
    search: "Suchen:",
    lengthMenu: "Zeige _MENU_ Einträge",
    info: "Zeige _START_ bis _END_ von _TOTAL_ Einträgen",
    paginate: {
        first: "Erste",
        last: "Letzte",
        next: "Nächste",
        previous: "Vorherige"
    }
}
```

### Custom Callbacks

```javascript
new DynamicDataTable({
    // ... andere Optionen
    callbacks: {
        onInit: function(table) {
            console.log('Tabelle initialisiert:', table);
        },
        onDataLoaded: function(data) {
            console.log('Daten geladen:', data.length, 'Einträge');
        },
        onError: function(error) {
            console.error('Tabellen-Fehler:', error);
        }
    }
});
```

### Daten-Export

```javascript
// Export-Buttons hinzufügen
dom: 'Bfrtip',
buttons: [
    'copy', 'csv', 'excel', 'pdf', 'print'
]
```

## Performance-Optimierung

### Große Datenmengen

```javascript
// Server-side Processing für große Datenmengen
new DynamicDataTable({
    // ... andere Optionen
    serverSide: true,
    ajax: {
        url: '/api/data',
        type: 'POST'
    },
    processing: true
});
```

### Lazy Loading

```javascript
// Daten nur laden wenn benötigt
dataSource: function() {
    if (!this.dataLoaded) {
        this.dataLoaded = true;
        return fetch('data/large-dataset.json')
            .then(r => r.json());
    }
    return this.cachedData;
}
```

## Fehlerbehebung

### Häufige Probleme

1. **Tabelle wird nicht angezeigt**
   - Prüfen Sie die Browser-Konsole auf JavaScript-Fehler
   - Stellen Sie sicher, dass alle Scripts geladen sind
   - Verwenden Sie `setTimeout()` für verzögerte Initialisierung

2. **Daten werden nicht geladen**
   - Überprüfen Sie die JSON-Datei auf Syntax-Fehler
   - Prüfen Sie die Netzwerk-Registerkarte in den Entwicklertools
   - Stellen Sie sicher, dass der Pfad zur Datei korrekt ist

3. **Styling-Probleme**
   - Prüfen Sie, ob alle CSS-Dateien geladen werden
   - Überprüfen Sie CSS-Konflikte mit anderen Styles
   - Verwenden Sie spezifischere CSS-Selektoren

### Debug-Modus

```javascript
new DynamicDataTable({
    // ... andere Optionen
    debug: true,  // Aktiviert Console-Logging
});
```

## Integration in bestehende Projekte

### MkDocs-Material Theme

Fügen Sie in `mkdocs.yml` hinzu:

```yaml
extra_css:
  - stylesheets/datatables-custom.css

extra_javascript:
  - javascripts/dynamic-datatables.js
```

### Automatisierte Daten-Updates

```javascript
// Daten alle 5 Minuten aktualisieren
setInterval(function() {
    if (window.myDataTable) {
        window.myDataTable.refresh();
    }
}, 300000);
```

## Beispiel-Implementierungen

### Gaming-Website

```javascript
// Spiele-Rangliste
createGamesTable('games-ranking', 'data/steam-charts.json');

// Tournament-Ergebnisse  
new DynamicDataTable({
    containerId: 'tournament-results',
    dataSource: 'data/tournaments.json',
    columns: [
        { data: 'team', title: 'Team' },
        { data: 'score', title: 'Punkte' },
        { data: 'prize', title: 'Preisgeld', 
          render: data => `$${data.toLocaleString()}` }
    ]
});
```

### Portfolio-Website

```javascript
// Projekt-Portfolio
new DynamicDataTable({
    containerId: 'portfolio',
    dataSource: 'data/projects.json',
    columns: [
        { data: 'name', title: 'Projekt' },
        { data: 'tech', title: 'Technologien',
          render: data => data.join(', ') },
        { data: 'status', title: 'Status',
          render: data => `<span class="badge badge-${data.toLowerCase()}">${data}</span>` }
    ]
});
```

## Nächste Schritte

1. **Experimentieren Sie** mit verschiedenen Datenquellen
2. **Erstellen Sie eigene Renderer** für spezielle Datentypen  
3. **Integrieren Sie APIs** für Live-Daten
4. **Erweitern Sie das CSS** für Ihr Design
5. **Automatisieren Sie** Daten-Updates

## Support und Community

- GitHub Issues für Bug-Reports
- Dokumentation für weitere Details
- Community-Forum für Fragen

---

*Diese Anleitung wird regelmäßig aktualisiert. Letzte Aktualisierung: Oktober 2025*