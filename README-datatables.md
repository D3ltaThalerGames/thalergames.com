# Dynamische DataTables für MkDocs

Ein vollständiges System zur Integration dynamischer, datengetriebener Tabellen in MkDocs-Websites.

## 🚀 Features

- **Dynamische Datenquellen**: JSON, CSV, APIs oder direkte JavaScript-Arrays
- **Responsive Design**: Automatische Anpassung an alle Bildschirmgrößen
- **Deutsche Lokalisierung**: Vollständig deutsche Benutzeroberfläche
- **Flexible Renderer**: Benutzerdefinierte Formatierung für jede Spalte
- **Einfache Integration**: Nahtlose Einbindung in bestehende MkDocs-Projekte
- **Performance-optimiert**: Lazy Loading und effiziente Datenverarbeitung

## 📁 Dateistruktur

```
docs/
├── javascripts/
│   ├── dynamic-datatables.js    # Haupt-JavaScript-Klasse
│   ├── datatables-init.js       # Bestehende DataTables-Init
│   └── tablesorts.js            # Zusätzliche Sortier-Funktionen
├── data/
│   └── games-data.json          # Beispiel JSON-Daten
├── charts.md                    # Aktualisierte Charts-Seite
├── dynamic-tables-demo.md       # Vollständige Demo
└── datatables-guide.md          # Detaillierte Anleitung
```

## 🛠️ Installation

### 1. JavaScript-Dateien

Die Hauptdatei `dynamic-datatables.js` enthält:
- `DynamicDataTable` Klasse für flexible Tabellen-Erstellung
- `createGamesTable()` Hilfsfunktion für Gaming-Websites
- `loadCSVData()` für CSV-Datenimport

### 2. MkDocs-Konfiguration

Ihre `mkdocs.yml` sollte folgende Einträge enthalten:

```yaml
extra_css:
  - https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css
  - https://cdn.datatables.net/responsive/2.5.0/css/responsive.bootstrap5.min.css
  - stylesheets/thalergames.css

extra_javascript:
  - https://code.jquery.com/jquery-3.7.0.min.js
  - https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js
  - https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js
  - javascripts/datatables-init.js
  - javascripts/dynamic-datatables.js
```

## 🎯 Schnellstart

### Einfache Tabelle

```html
<div id="my-table"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        new DynamicDataTable({
            containerId: 'my-table',
            title: 'Meine Daten',
            dataSource: 'data/my-data.json',
            columns: [
                { data: 'name', title: 'Name' },
                { data: 'value', title: 'Wert' }
            ]
        });
    }, 500);
});
</script>
```

### Gaming-Tabelle (Hilfsfunktion)

```javascript
createGamesTable('container-id', 'data/games-data.json');
```

## 📊 Datenstrukturen

### JSON-Format

```json
{
  "games": [
    {
      "rank": 1,
      "name": "Counter-Strike: Global Offensive",
      "owners": "30000000",
      "price": 0.00,
      "rating": 9.5,
      "genre": "FPS",
      "developer": "Valve Corporation",
      "platforms": ["PC", "Mac", "Linux"]
    }
  ],
  "metadata": {
    "last_updated": "2025-10-03T10:00:00Z",
    "total_games": 1
  }
}
```

### CSV-Format

```csv
name,genre,price,rating
"Counter-Strike: GO","FPS",0.00,9.5
"Dota 2","MOBA",0.00,9.2
```

## 🎨 Anpassung

### Spalten-Renderer

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

### CSS-Styling

```css
.dynamic-table-wrapper {
    margin: 20px 0;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
}

.badge {
    padding: 0.25em 0.4em;
    background: #007bff;
    color: white;
    border-radius: 0.25rem;
}
```

## 🔧 Erweiterte Features

### API-Integration

```javascript
dataSource: async function() {
    const response = await fetch('/api/games');
    return await response.json();
}
```

### Server-Side Processing

```javascript
new DynamicDataTable({
    serverSide: true,
    ajax: {
        url: '/api/data',
        type: 'POST'
    }
});
```

### Export-Funktionen

```javascript
dom: 'Bfrtip',
buttons: ['copy', 'csv', 'excel', 'pdf']
```

## 📝 Verwendungsbeispiele

### Gaming-Website

- **Spiele-Rankings**: Top-Charts mit Bewertungen und Preisen
- **Tournament-Ergebnisse**: Live-Updates von eSports-Events
- **Player-Statistiken**: Ranglisten und Achievements

### Portfolio-Website

- **Projekt-Übersicht**: Technologien, Status, Links
- **Skill-Matrix**: Fähigkeiten mit Bewertungen
- **Erfahrungsübersicht**: Jobs, Dauer, Technologien

### Business-Website

- **Produkt-Katalog**: Features, Preise, Verfügbarkeit
- **Team-Übersicht**: Mitarbeiter, Rollen, Kontakte
- **Performance-Daten**: KPIs, Metriken, Trends

## 🐛 Fehlerbehebung

### Häufige Probleme

1. **Tabelle wird nicht angezeigt**
   - JavaScript-Fehler in der Browser-Konsole prüfen
   - Sicherstellen, dass alle Scripts geladen sind
   - `setTimeout()` für verzögerte Initialisierung verwenden

2. **Daten werden nicht geladen**
   - JSON-Syntax prüfen
   - Dateipfade überprüfen
   - Netzwerk-Requests in Browser-Tools analysieren

3. **Styling-Probleme**
   - CSS-Dateien-Reihenfolge prüfen
   - Konflikte mit Theme-Styles identifizieren
   - Spezifischere CSS-Selektoren verwenden

### Debug-Modus

```javascript
new DynamicDataTable({
    debug: true,  // Aktiviert Console-Logging
    // ... andere Optionen
});
```

## 📚 Dokumentation

- **[datatables-guide.md](datatables-guide.md)**: Vollständige Anleitung
- **[dynamic-tables-demo.md](dynamic-tables-demo.md)**: Live-Demos
- **[charts.md](charts.md)**: Praktisches Beispiel

## 🔄 Updates

### Version 1.0 (Oktober 2025)
- Grundlegende DynamicDataTable-Klasse
- JSON/CSV-Datenquellen-Unterstützung
- Deutsche Lokalisierung
- Responsive Design
- Hilfsfunktionen für Gaming-Websites

### Geplante Features
- Excel-Import/Export
- Echtzeit-Daten-Updates
- Erweiterte Filterfunktionen
- Plugin-System für Erweiterungen

## 🤝 Beitragen

1. Fork des Repositories
2. Feature-Branch erstellen
3. Änderungen commiten
4. Pull Request erstellen

## 📄 Lizenz

MIT License - Frei verwendbar für private und kommerzielle Projekte.

## 💬 Support

- **Issues**: GitHub Issues für Bug-Reports
- **Diskussionen**: GitHub Discussions für Fragen
- **Dokumentation**: Diese README und die Guide-Dateien

---

*Erstellt für thalergames.com - Ein Gaming-Blog mit modernen Web-Technologien*