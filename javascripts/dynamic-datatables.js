/**
 * Dynamic DataTables Generator für MkDocs
 * Erlaubt das dynamische Laden und Anzeigen von Daten in DataTables
 */

class DynamicDataTable {
    constructor(config) {
        this.config = {
            containerId: 'dynamic-table-container',
            tableId: 'dynamic-table',
            dataSource: null,
            columns: [],
            title: 'Data Table',
            pageLength: 25,
            ordering: true,
            searching: true,
            responsive: true,
            language: 'de',
            ...config
        };
        
        this.dataTable = null;
        this.init();
    }

    async init() {
        try {
            // Container erstellen falls nicht vorhanden
            this.createContainer();
            
            // Daten laden
            const data = await this.loadData();
            
            // Tabelle erstellen
            this.createTable(data);
            
            // DataTable initialisieren
            this.initDataTable();
            
        } catch (error) {
            console.error('Fehler beim Initialisieren der DataTable:', error);
            this.showError(error.message);
        }
    }

    createContainer() {
        let container = document.getElementById(this.config.containerId);
        if (!container) {
            // Container zur aktuellen Seite hinzufügen
            const content = document.querySelector('.md-content__inner') || document.body;
            container = document.createElement('div');
            container.id = this.config.containerId;
            container.className = 'dynamic-table-wrapper';
            content.appendChild(container);
        }

        // Titel hinzufügen
        if (this.config.title) {
            const titleElement = document.createElement('h2');
            titleElement.textContent = this.config.title;
            titleElement.className = 'dynamic-table-title';
            container.appendChild(titleElement);
        }
    }

    async loadData() {
        if (typeof this.config.dataSource === 'string') {
            // URL laden
            const response = await fetch(this.config.dataSource);
            if (!response.ok) {
                throw new Error(`Fehler beim Laden der Daten: ${response.status}`);
            }
            return await response.json();
        } else if (Array.isArray(this.config.dataSource)) {
            // Direkte Daten verwenden
            return this.config.dataSource;
        } else if (typeof this.config.dataSource === 'function') {
            // Funktion ausführen
            return await this.config.dataSource();
        } else {
            throw new Error('Keine gültige Datenquelle angegeben');
        }
    }

    createTable(data) {
        const container = document.getElementById(this.config.containerId);
        
        // Bestehende Tabelle entfernen
        const existingTable = document.getElementById(this.config.tableId);
        if (existingTable) {
            existingTable.remove();
        }

        // Neue Tabelle erstellen
        const table = document.createElement('table');
        table.id = this.config.tableId;
        table.className = 'table table-striped table-hover display';

        // Header erstellen
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        this.config.columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column.title || column.data;
            if (column.className) {
                th.className = column.className;
            }
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Body erstellen
        const tbody = document.createElement('tbody');
        
        data.forEach(row => {
            const tr = document.createElement('tr');
            
            this.config.columns.forEach(column => {
                const td = document.createElement('td');
                let cellData = this.getCellData(row, column);
                
                // Renderer anwenden falls vorhanden
                if (column.render && typeof column.render === 'function') {
                    cellData = column.render(cellData, row);
                }
                
                if (typeof cellData === 'string') {
                    td.innerHTML = cellData;
                } else {
                    td.textContent = cellData;
                }
                
                if (column.className) {
                    td.className = column.className;
                }
                
                tr.appendChild(td);
            });
            
            tbody.appendChild(tr);
        });
        
        table.appendChild(tbody);
        container.appendChild(table);
    }

    getCellData(row, column) {
        if (typeof column.data === 'function') {
            return column.data(row);
        } else if (typeof column.data === 'string') {
            // Unterstützung für verschachtelte Objekte (z.B. "game.title")
            return column.data.split('.').reduce((obj, key) => obj?.[key], row);
        }
        return '';
    }

    initDataTable() {
        const $table = $(`#${this.config.tableId}`);
        
        if ($table.length === 0) {
            throw new Error('Tabelle konnte nicht gefunden werden');
        }

        // DataTable-Konfiguration
        const dtConfig = {
            paging: true,
            pageLength: this.config.pageLength,
            lengthMenu: [10, 25, 50, 100],
            ordering: this.config.ordering,
            searching: this.config.searching,
            responsive: this.config.responsive,
            dom: '<"top"lf>rt<"bottom"ip><"clear">',
            language: this.getLanguageConfig()
        };

        // Spalten-Definitionen hinzufügen
        if (this.config.columnDefs) {
            dtConfig.columnDefs = this.config.columnDefs;
        }

        // Standard-Sortierung
        if (this.config.order) {
            dtConfig.order = this.config.order;
        }

        // DataTable initialisieren
        this.dataTable = $table.DataTable(dtConfig);
    }

    getLanguageConfig() {
        const languages = {
            'de': {
                url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/de-DE.json'
            },
            'en': {
                url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/en-GB.json'
            }
        };
        
        return languages[this.config.language] || languages['de'];
    }

    showError(message) {
        const container = document.getElementById(this.config.containerId);
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <h4>Fehler beim Laden der Tabelle</h4>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    // Methoden zur Interaktion mit der Tabelle
    refresh() {
        if (this.dataTable) {
            this.dataTable.ajax.reload();
        } else {
            this.init();
        }
    }

    destroy() {
        if (this.dataTable) {
            this.dataTable.destroy();
            this.dataTable = null;
        }
        
        const container = document.getElementById(this.config.containerId);
        if (container) {
            container.remove();
        }
    }

    addData(newData) {
        if (this.dataTable && Array.isArray(newData)) {
            newData.forEach(row => {
                this.dataTable.row.add(row);
            });
            this.dataTable.draw();
        }
    }
}

// Hilfsfunktionen für häufige Anwendungsfälle

/**
 * Erstellt eine einfache Games-Tabelle
 */
function createGamesTable(containerId, dataSource) {
    return new DynamicDataTable({
        containerId: containerId,
        title: 'Spiele-Charts',
        dataSource: dataSource,
        columns: [
            { data: 'rank', title: '#', className: 'text-center' },
            { data: 'name', title: 'Spiel' },
            { data: 'owners', title: 'Besitzer', className: 'text-right' },
            { 
                data: 'price', 
                title: 'Preis (USD)', 
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
                    return `${data} / 10`;
                }
            }
        ],
        order: [[0, 'asc']],
        columnDefs: [
            { targets: [2, 3], type: 'num' }
        ]
    });
}

/**
 * Lädt CSV-Daten und konvertiert sie zu JSON
 */
async function loadCSVData(csvUrl) {
    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',').map(v => v.trim());
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                data.push(row);
            }
        }
        
        return data;
    } catch (error) {
        console.error('Fehler beim Laden der CSV-Daten:', error);
        throw error;
    }
}

// Export für Modul-Verwendung (falls erforderlich)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DynamicDataTable, createGamesTable, loadCSVData };
}