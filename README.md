# Crystallization Condition Finder

A modern web-based application for tracking and analyzing crystallization conditions across multiple screening plates. Select wells from different screens, identify repeated components, and export your results for documentation.

## Features

### Interactive 96-Well Plate Visualization
- Visual grid representation (A-H rows, 1-12 columns)
- Click wells to select/deselect
- Visual feedback with hover effects and selection animation
- Easy-to-identify well positions

### Multi-Screen Support
- **Structure Screen** (96 conditions)
- **Morpheus Screen** (96 conditions)
- **JCSG+** (96 conditions)
- **INDEX (HR2-144)** (96 conditions)
- **PACT Premier** (96 conditions)

### Smart Component Analysis
- Automatically identifies repeated components across selected wells
- Color-coded highlighting for easy pattern recognition
- Organized by component type (Salt, Buffer, Precipitant)
- Shows occurrence count for each repeated component

### Selection Management
- Select wells from multiple screens
- Selections persist when switching between screens
- Well counter shows total selected wells
- Clear all selections with one click

### Export Functionality
- 📋 Copy All button exports formatted text to clipboard
- Includes repeated components summary
- Lists all selected conditions grouped by screen
- Clean formatting for pasting into Word or other documents

### Modern UI/UX
- Responsive design for different screen sizes
- Professional color scheme
- Intuitive controls and layout
- Smooth animations and transitions

## How to Use

### Running the Application

**Important:** Due to browser security restrictions, the app requires a local web server:

1. Open a terminal/command prompt in the project directory
2. Start a local web server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and go to: `http://localhost:8000`

### Selecting Conditions

1. Choose a screen from the dropdown menu
2. Click on wells in the 96-well plate to select them
3. Selected wells will be highlighted in blue
4. View condition details in the right panel
5. Switch to another screen to select more wells
6. All selections remain saved across screens

### Viewing Results

- **Condition Details Panel**: Shows all selected wells grouped by screen
- **Repeated Components Section**: Appears below the plate when multiple wells share components
- **Color Highlighting**: Repeated components are highlighted with unique colors
- **Legend**: Organized by component type with occurrence counts

### Exporting Data

1. Select all the wells you want to document
2. Click the "📋 Copy All" button
3. Paste into your document (Word, Excel, etc.)
4. The exported text includes:
   - Repeated components summary
   - All well conditions grouped by screen
   - Clean, readable formatting

## File Structure

```
Cristallisation_Condition_finder/
├── index.html                    # Main HTML structure
├── styles.css                    # CSS styling and layout
├── script.js                     # JavaScript functionality
├── Scree_condition_table.csv    # Condition database (all screens)
└── README.md                     # This documentation
```

## Condition Data

The CSV database contains complete formulation data for 5 crystallization screens:
- Salt compositions (various concentrations)
- Buffer systems with pH values
- Precipitant types and concentrations
- Well-to-tube number mapping

### Well Mapping
- Row A (A1-A12) = Tubes 1-12
- Row B (B1-B12) = Tubes 13-24
- Row C (C1-C12) = Tubes 25-36
- Row D (D1-D12) = Tubes 37-48
- Row E (E1-E12) = Tubes 49-60
- Row F (F1-F12) = Tubes 61-72
- Row G (G1-G12) = Tubes 73-84
- Row H (H1-H12) = Tubes 85-96

## Browser Compatibility

Works with all modern web browsers including:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Technical Requirements

- Python (for running the local web server)
- Modern web browser with JavaScript enabled
- No internet connection required once files are local

## Use Cases

Perfect for:
- Crystallographers analyzing screening results
- Identifying successful crystallization conditions
- Finding common components across multiple hits
- Documenting crystallization experiments
- Comparing conditions from different screens
- Laboratory workflow integration
- Educational purposes in structural biology

## Tips

- **Select strategically**: Choose wells that produced crystals or positive results
- **Look for patterns**: The repeated components section helps identify common factors
- **Document as you go**: Use the copy function to save your findings immediately
- **Multi-screen workflow**: Don't hesitate to select from all available screens

## Troubleshooting

**Dropdown menu is empty:**
- Make sure you're using a local web server (not opening the file directly)
- Check that `Scree_condition_table.csv` is in the same directory

**Changes not appearing:**
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache

**Wells not selectable:**
- Check browser console (F12) for JavaScript errors
- Ensure JavaScript is enabled in your browser
