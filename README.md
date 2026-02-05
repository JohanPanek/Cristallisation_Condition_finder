# Crystallization Condition Checker

A web-based application for checking crystallization conditions in a 96-well plate format. Users can click on any well to see the corresponding crystallization condition from the HR2-144 reagent formulation.

## Features

- Interactive 96-well plate visualization (A-H rows, 1-12 columns)
- Complete HR2-144 reagent formulation database (96 unique conditions)
- Click any well to instantly view its crystallization condition
- Detailed condition display showing:
  - Salt composition
  - Buffer type and pH
  - Precipitant concentration and type
- Well-to-tube number mapping (A1=Tube 1, H12=Tube 96)
- Responsive design for mobile devices
- Clean, professional interface suitable for laboratory use

## How to Use

1. Open `index.html` in a web browser
2. Click on any well in the 96-well plate grid
3. The condition information will be displayed below the plate
4. The selected well will be highlighted in blue
5. Use "Clear Selection" to deselect the current well
6. Click on different wells to compare conditions

## Condition Data

The application contains the complete HR2-144 Index™ formulation data from Hampton Research, including:
- 96 unique crystallization conditions
- Various salt compositions (from None to 0.2 M concentrations)
- Multiple buffer systems (Citric acid, Acetate, BIS-TRIS, HEPES, Tris)
- Diverse precipitants (Ammonium sulfate, PEG variants, organic solvents)
- pH range from 3.5 to 8.5

## Well Mapping

Wells are mapped from the standard 96-well plate format to tube numbers:
- Row A (A1-A12) = Tubes 1-12
- Row B (B1-B12) = Tubes 13-24
- Row C (C1-C12) = Tubes 25-36
- Row D (D1-D12) = Tubes 37-48
- Row E (E1-E12) = Tubes 49-60
- Row F (F1-F12) = Tubes 61-72
- Row G (G1-G12) = Tubes 73-84
- Row H (H1-H12) = Tubes 85-96

## Example Conditions

- **Well A1 (Tube 1)**: 2.0 M Ammonium sulfate, 0.1 M Citric acid pH 3.5
- **Well B5 (Tube 17)**: 1.26 M Sodium phosphate monobasic monohydrate, pH 5.6
- **Well H12 (Tube 96)**: 0.15 M Potassium bromide, 30% w/v PEG monomethyl ether 2,000

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styling and layout
- `script.js` - JavaScript functionality and condition database
- `README.md` - This documentation

## Browser Compatibility

Works with all modern web browsers including Chrome, Firefox, Safari, and Edge.

## Running the Application

Simply open the `index.html` file in any web browser. No server setup or internet connection required!

## Use Cases

Perfect for:
- Crystallographers planning experiments
- Checking conditions where crystals were found
- Quick reference for HR2-144 formulations
- Laboratory workflow integration
- Educational purposes in structural biology
