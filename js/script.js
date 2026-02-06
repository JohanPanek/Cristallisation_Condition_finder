class ConditionCheckerApp {
    constructor() {
        this.selectedWells = [];
        this.currentScreen = '';
        this.screens = {};
        this.init();
    }

    async init() {
        await this.loadCSVData();
        this.populateScreenDropdown();
        this.createPlateGrid();
        this.setupEventListeners();
        this.updateDisplay();
    }

    async loadCSVData() {
        try {
            const response = await fetch('data/Scree_condition_table.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            this.parseCSV(text);
            console.log('CSV loaded successfully. Screens found:', Object.keys(this.screens));
        } catch (error) {
            console.error('Failed to load CSV data:', error);
            // Display error in UI
            const select = document.getElementById('screenSelect');
            const option = document.createElement('option');
            option.textContent = 'Error loading data - use local server';
            option.disabled = true;
            select.appendChild(option);
            
            const conditionText = document.getElementById('conditionText');
            conditionText.innerHTML = '<strong style="color: red;">Error: Cannot load CSV file.</strong><br><br>' +
                'Please run a local web server instead of opening the HTML file directly.<br><br>' +
                'See console for details: ' + error.message;
        }
    }

    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        console.log('Total lines in CSV:', lines.length);
        // Skip header line: Well,Tube,Salt,Buffer ,Precipitant,Screen
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const fields = this.parseCSVLine(line);
            if (fields.length < 6) {
                console.log('Line', i, 'has insufficient fields:', fields.length, fields);
                continue;
            }

            const tube = parseInt(fields[1], 10);
            const salt = fields[2];
            const buffer = fields[3];
            const precipitant = fields[4];
            const screen = fields[5];

            if (i <= 3) {
                console.log('Line', i, 'parsed:', {tube, salt, buffer, precipitant, screen});
            }

            if (!screen) continue;

            if (!this.screens[screen]) {
                this.screens[screen] = {
                    name: screen,
                    conditions: {}
                };
                console.log('Created new screen:', screen);
            }

            this.screens[screen].conditions[tube] = {
                salt: salt || 'None',
                buffer: buffer || 'None',
                precipitant: precipitant || 'None'
            };
        }

        // Set default screen to the first one found
        const screenKeys = Object.keys(this.screens);
        console.log('All screens found:', screenKeys);
        if (screenKeys.length > 0) {
            this.currentScreen = screenKeys[0];
        }
    }

    parseCSVLine(line) {
        const fields = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
                // Don't include the quote character itself
            } else if (char === ',' && !inQuotes) {
                fields.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        fields.push(current.trim());
        return fields;
    }

    populateScreenDropdown() {
        const select = document.getElementById('screenSelect');
        select.innerHTML = '';

        const screenKeys = Object.keys(this.screens);
        screenKeys.forEach((key) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            select.appendChild(option);
        });

        if (screenKeys.length > 0) {
            select.value = this.currentScreen;
        }
    }

    createPlateGrid() {
        const plateGrid = document.getElementById('plateGrid');
        plateGrid.innerHTML = '';
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];

            // Create row header
            const rowHeader = document.createElement('div');
            rowHeader.className = 'row-header';
            rowHeader.textContent = row;
            plateGrid.appendChild(rowHeader);

            // Create wells for this row
            for (let col = 1; col <= 12; col++) {
                const wellId = `${row}${col}`;
                const tubeNumber = (rowIndex * 12) + col;
                const well = document.createElement('div');
                well.className = 'well';
                well.dataset.wellId = wellId;
                well.dataset.tubeNumber = tubeNumber;
                well.title = `Well ${wellId} (Tube ${tubeNumber})`;
                well.textContent = wellId;

                well.addEventListener('click', () => this.selectWell(wellId, tubeNumber));

                plateGrid.appendChild(well);
            }
        }
    }

    setupEventListeners() {
        // Screen selection dropdown
        document.getElementById('screenSelect').addEventListener('change', (e) => {
            this.changeScreen(e.target.value);
        });

        // Clear selection button
        document.getElementById('clearAll').addEventListener('click', () => {
            this.clearSelection();
        });

        // Copy button
        document.getElementById('copyConditions').addEventListener('click', () => {
            this.copyConditionsToClipboard();
        });
    }

    changeScreen(screenId) {
        this.currentScreen = screenId;
        // Don't clear selection - update visual state of wells
        this.updateWellVisuals();
    }

    updateWellVisuals() {
        // Clear all visual selections first
        document.querySelectorAll('.well.selected').forEach(well => {
            well.classList.remove('selected');
        });
        
        // Re-apply selections for current screen
        this.selectedWells.forEach(well => {
            if (well.screen === this.currentScreen) {
                const wellElement = document.querySelector(`[data-well-id="${well.wellId}"]`);
                if (wellElement) {
                    wellElement.classList.add('selected');
                }
            }
        });
    }

    selectWell(wellId, tubeNumber) {
        const wellElement = document.querySelector(`[data-well-id="${wellId}"]`);
        if (!wellElement) return;

        // Check if well is already selected for current screen
        const existingIndex = this.selectedWells.findIndex(w => 
            w.wellId === wellId && w.screen === this.currentScreen
        );

        if (existingIndex >= 0) {
            // Deselect well
            this.selectedWells.splice(existingIndex, 1);
            wellElement.classList.remove('selected');
        } else {
            // Select well with current screen info
            this.selectedWells.push({ 
                wellId, 
                tubeNumber,
                screen: this.currentScreen
            });
            wellElement.classList.add('selected');
        }

        this.updateDisplay();
    }

    clearSelection() {
        document.querySelectorAll('.well.selected').forEach(well => {
            well.classList.remove('selected');
        });
        this.selectedWells = [];
        this.updateDisplay();
    }

    updateDisplay() {
        const conditionText = document.getElementById('conditionText');
        const selectionInfo = document.getElementById('selectionInfo');
        const legend = document.getElementById('legend');
        const legendContent = document.getElementById('legendContent');

        // Update well count
        selectionInfo.innerHTML = `<span class="well-count">${this.selectedWells.length} well${this.selectedWells.length !== 1 ? 's' : ''} selected</span>`;

        if (this.selectedWells.length === 0) {
            conditionText.innerHTML = 'Click on wells to see their crystallization conditions';
            legend.style.display = 'none';
            return;
        }

        // Count component occurrences across all selected wells
        const componentCounts = { salt: {}, buffer: {}, precipitant: {} };
        
        this.selectedWells.forEach(well => {
            const screenData = this.screens[well.screen];
            const condition = screenData?.conditions[well.tubeNumber];
            
            if (condition) {
                // Count each component type
                ['salt', 'buffer', 'precipitant'].forEach(type => {
                    const value = condition[type];
                    if (value && value !== 'None') {
                        componentCounts[type][value] = (componentCounts[type][value] || 0) + 1;
                    }
                });
            }
        });

        // Assign colors to components that appear more than once
        const colors = [
            '#FFE6CC', '#FFCCCC', '#CCFFE6', '#CCE6FF', '#E6CCFF', 
            '#FFFFCC', '#FFE6FF', '#E6FFFF', '#FFD9B3', '#FFB3B3',
            '#B3FFD9', '#B3D9FF', '#D9B3FF', '#FFFFA3', '#FFD1FF'
        ];
        let colorIndex = 0;
        const componentColors = {};
        const componentsByType = { salt: [], buffer: [], precipitant: [] };

        ['salt', 'buffer', 'precipitant'].forEach(type => {
            Object.keys(componentCounts[type]).forEach(component => {
                if (componentCounts[type][component] > 1) {
                    const color = colors[colorIndex % colors.length];
                    componentColors[component] = color;
                    componentsByType[type].push({
                        component: component,
                        count: componentCounts[type][component],
                        color: color
                    });
                    colorIndex++;
                }
            });
        });

        // Update legend with columns
        const hasRepeatedComponents = componentsByType.salt.length > 0 || 
                                      componentsByType.buffer.length > 0 || 
                                      componentsByType.precipitant.length > 0;

        if (hasRepeatedComponents) {
            legend.style.display = 'block';
            let legendHTML = '';
            
            ['salt', 'buffer', 'precipitant'].forEach(type => {
                if (componentsByType[type].length > 0) {
                    legendHTML += `<div class="legend-column">
                        <div class="legend-column-header">${type.charAt(0).toUpperCase() + type.slice(1)}</div>`;
                    
                    componentsByType[type].forEach(info => {
                        legendHTML += `<div class="legend-item">
                            <span class="legend-color" style="background-color: ${info.color};"></span>
                            <span class="legend-text">${info.component}</span>
                            <span class="legend-count">(${info.count}×)</span>
                        </div>`;
                    });
                    
                    legendHTML += '</div>';
                }
            });
            
            legendContent.innerHTML = legendHTML;
        } else {
            legend.style.display = 'none';
        }

        // Helper function to highlight components
        const highlightComponent = (value) => {
            if (componentColors[value]) {
                return `<span style="background-color: ${componentColors[value]}; padding: 2px 4px; border-radius: 3px; font-weight: 500;">${value}</span>`;
            }
            return value;
        };

        // Group wells by screen
        const wellsByScreen = {};
        this.selectedWells.forEach(well => {
            if (!wellsByScreen[well.screen]) {
                wellsByScreen[well.screen] = [];
            }
            wellsByScreen[well.screen].push(well);
        });

        let output = '';
        
        // Display each screen's wells grouped together
        Object.keys(wellsByScreen).forEach((screenName, screenIndex) => {
            const screenData = this.screens[screenName];
            const wells = wellsByScreen[screenName];
            
            // Screen header
            output += `<div class="screen-group">`;
            output += `<div class="screen-header">${screenName}</div>`;
            
            wells.forEach((well) => {
                const { wellId, tubeNumber } = well;
                const condition = screenData?.conditions[tubeNumber];

                output += `<div class="condition-item">`;
                if (condition) {
                    output += `<div class="well-label">Well ${wellId} - Tube ${tubeNumber}</div>`;
                    output += `<div class="condition-row"><span class="condition-label">Salt:</span> ${highlightComponent(condition.salt)}</div>`;
                    output += `<div class="condition-row"><span class="condition-label">Buffer:</span> ${highlightComponent(condition.buffer)}</div>`;
                    output += `<div class="condition-row"><span class="condition-label">Precipitant:</span> ${highlightComponent(condition.precipitant)}</div>`;
                } else {
                    output += `<div class="well-label">Well ${wellId} - Tube ${tubeNumber}</div>`;
                    output += `<div class="condition-row">Condition data not found for this well.</div>`;
                }
                output += `</div>`;
            });
            
            output += '</div>';
        });

        conditionText.innerHTML = output;
    }

    copyConditionsToClipboard() {
        if (this.selectedWells.length === 0) {
            return;
        }

        // Count component occurrences for the repeated components section
        const componentCounts = { salt: {}, buffer: {}, precipitant: {} };
        
        this.selectedWells.forEach(well => {
            const screenData = this.screens[well.screen];
            const condition = screenData?.conditions[well.tubeNumber];
            
            if (condition) {
                ['salt', 'buffer', 'precipitant'].forEach(type => {
                    const value = condition[type];
                    if (value && value !== 'None') {
                        componentCounts[type][value] = (componentCounts[type][value] || 0) + 1;
                    }
                });
            }
        });

        // Build repeated components by type
        const componentsByType = { salt: [], buffer: [], precipitant: [] };
        ['salt', 'buffer', 'precipitant'].forEach(type => {
            Object.keys(componentCounts[type]).forEach(component => {
                if (componentCounts[type][component] > 1) {
                    componentsByType[type].push({
                        component: component,
                        count: componentCounts[type][component]
                    });
                }
            });
        });

        // Generate plain text version for clipboard
        let textOutput = 'CRYSTALLIZATION CONDITIONS\n\n';

        // Add repeated components section if any exist
        const hasRepeatedComponents = componentsByType.salt.length > 0 || 
                                      componentsByType.buffer.length > 0 || 
                                      componentsByType.precipitant.length > 0;

        if (hasRepeatedComponents) {
            textOutput += 'Repeated Components:\n\n';
            
            ['salt', 'buffer', 'precipitant'].forEach(type => {
                if (componentsByType[type].length > 0) {
                    textOutput += `${type.charAt(0).toUpperCase() + type.slice(1)}:\n`;
                    componentsByType[type].forEach(info => {
                        textOutput += `\t• ${info.component} (appears ${info.count} times)\n`;
                    });
                    textOutput += '\n';
                }
            });
            
            textOutput += '─'.repeat(70) + '\n\n';
        }

        // Add well conditions grouped by screen
        const wellsByScreen = {};
        this.selectedWells.forEach(well => {
            if (!wellsByScreen[well.screen]) {
                wellsByScreen[well.screen] = [];
            }
            wellsByScreen[well.screen].push(well);
        });
        
        Object.keys(wellsByScreen).forEach((screenName) => {
            const screenData = this.screens[screenName];
            const wells = wellsByScreen[screenName];
            
            textOutput += `Screen: ${screenName}\n\n`;
            
            wells.forEach((well) => {
                const { wellId, tubeNumber } = well;
                const condition = screenData?.conditions[tubeNumber];

                if (condition) {
                    textOutput += `Well ${wellId} - Tube ${tubeNumber}\n`;
                    textOutput += `\tSalt:\t\t${condition.salt}\n`;
                    textOutput += `\tBuffer:\t\t${condition.buffer}\n`;
                    textOutput += `\tPrecipitant:\t${condition.precipitant}\n\n`;
                } else {
                    textOutput += `Well ${wellId} - Tube ${tubeNumber}\n`;
                    textOutput += `\tCondition data not found\n\n`;
                }
            });
        });

        // Copy to clipboard
        navigator.clipboard.writeText(textOutput).then(() => {
            // Show feedback
            const copyBtn = document.getElementById('copyConditions');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '✓ Copied!';
            copyBtn.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        });
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ConditionCheckerApp();
});
