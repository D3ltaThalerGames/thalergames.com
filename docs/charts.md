# Spiele-Charts

Diese Seite zeigt die aktuellen Top-Spiele mit dynamischen DataTables, die automatisch aus JSON-Daten generiert werden.

## Aktuelle Top-Spiele

<div id="dynamic-charts-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Warten bis alle Scripts geladen sind
    setTimeout(function() {
        if (typeof createGamesTable !== 'undefined') {
            // Verwende die Hilfsfunktion für einfache Games-Tabellen
            fetch('data/games-data.json')
                .then(response => response.json())
                .then(data => {
                    createGamesTable('dynamic-charts-container', data.games);
                })
                .catch(error => {
                    console.error('Fehler beim Laden der Spiele-Daten:', error);
                    // Fallback zur statischen Tabelle
                    document.getElementById('dynamic-charts-container').innerHTML = `
                        <div class="alert alert-warning">
                            <strong>Hinweis:</strong> Dynamische Daten konnten nicht geladen werden. 
                            <a href="#static-table">Zur statischen Tabelle</a>
                        </div>
                    `;
                });
        } else {
            console.warn('DynamicDataTable nicht verfügbar, verwende statische Tabelle');
        }
    }, 500);
});
</script>

## Statische Fallback-Tabelle {#static-table}

Falls die dynamischen Daten nicht geladen werden können, hier die statische Version:‑Liste

| # | Spiel                              | Besitzer | Preis (USD) | Bewertung |
|---|------------------------------------|----------|------------|-----------|
| 1 | Counter‑Strike: Global Offensive   | 30 Mio.  | 0,00 $     | 9,5 / 10 |
| 2 | Dota 2                             | 11 Mio.  | 0,00 $     | 9,2 / 10 |
| … | …                                  | …        | …          | …         |


## Table Test

<table id="charts-table" class="table table-striped table-hover">
    <thead>
        <tr>
            <th>#</th>
            <th>Spiel</th>
            <th>Besitzer</th>
            <th>Preis (USD)</th>
            <th>Bewertung</th>
        </tr>
    </thead>
    <tbody>
        <!-- Beispiel‑Daten – später durch deine eigenen ersetzen -->
        <tr>
            <td>1</td>
            <td>Counter‑Strike: Global Offensive</td>
            <td>30 Mio.</td>
            <td>0,00 $</td>
            <td>9,5 / 10</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Dota 2</td>
            <td>11 Mio.</td>
            <td>0,00 $</td>
            <td>9,2 / 10</td>
        </tr>
        <!-- … weitere Zeilen … -->
    </tbody>
</table>

## Test OK

<table id="charts-table" class="table table-striped table-hover">
    <thead>
        <tr>
            <th>#</th>
            <th>Spiel</th>
            <th>Besitzer</th>
            <th>Preis (USD)</th>
            <th>Bewertung</th>
        </tr>
    </thead>
    <tbody>
        <!-- Beispiel‑Daten – später durch deine eigenen ersetzen -->
        <tr>
            <td>1</td>
            <td>Counter‑Strike: Global Offensive</td>
            <td>30 Mio.</td>
            <td>0,00 $</td>
            <td>9,5 / 10</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Dota 2</td>
            <td>11 Mio.</td>
            <td>0,00 $</td>
            <td>9,2 / 10</td>
        </tr>
        <!-- … weitere Zeilen … -->
    </tbody>
</table>