# Converter
Adobe Illustrator script to convert .AI files to .PNGs, .SVGs and .EPSs

## Installation
1. Close Adobe Illustrator if it is open
2. Copy the `converter.jsx` file into `/Applications/Adobe Illustrator CC 2017/Presets/en_GB/Scripts`
3. Open Adobe Illustrator
4. The script can be run from the `File > Scripts` menu

## Usage
1. Select an input folder by clicking the first `Browse` button _(This folder should contain at least one `.ai` file)_
2. Select an output folder by clicking the seconf `Browse` button _(This is where the exported files will be saved to)_
3. Select the checkboxes of the formats you would like to convet to
4. Press `Convert` to start the conversion process

## Caveats
• The colourspace will match the input files unless exporting to a format which does support CMYK _(i.e. `.svg` and `.png` will always convert to RGB automatically)_
