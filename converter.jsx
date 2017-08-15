/*
Name: Converter
Description: Convert .AI files to .PNGs, .SVGs and .EPSs
Version: 1.0.1
Author: Steve Burtenshaw
Website: http://steveburtenshaw.com
*/

var inputFolder
var outputFolder
var currentFile
var matchFileType = '*.ai'

var fileFormats = [
  {
    name: 'PNG',
    extension: '.png',
    getOptions: function() {
      var options = new ExportOptionsPNG24()
      options.horizontalScale = 100.0
      options.verticalScale = 100.0
      options.antiAliasing = true
      options.artBoardClipping = true
      options.saveAsHTML = false
      options.transparency = true
      return options
    },
    saveFile: function(doc) {
      doc.exportFile(getNewName(doc.name, this), ExportType.PNG24, this.getOptions())
    }
  }, {
    name: 'SVG',
    extension: '.svg',
    getOptions: function() {
      var options = new ExportOptionsSVG()
    	options.embedRasterImages = true
      options.fontType = SVGFontType.OUTLINEFONT
      return options
    },
    saveFile: function(doc) {
      doc.exportFile(getNewName(doc.name, this), ExportType.SVG, this.getOptions())
    }
  }, {
    name: 'EPS',
    extension: '.eps',
    getOptions: function() {
      var options = new EPSSaveOptions()
      options.embedAllFonts = true
      options.embedLinkedFiles = true
      return options
    },
    saveFile: function(doc) {
      doc.saveAs(getNewName(doc.name, this), this.getOptions());
    }
  }
]

function getNewName(name, format) {
  var newFolder = Folder(outputFolder + '/' + format.name);
  if (!newFolder.exists) {
    newFolder.create();
  }
  var newName = name.substr(0, name.lastIndexOf('.'));
  newName += format.extension;
  saveInFile = new File(newFolder + '/' + newName);
  return saveInFile;
}

function getInput() {
  inputFolder = Folder.selectDialog( 'Select the folder with Illustrator files you want to convert to PNG', '~' )
}

function pickFormats() {
  var win = new Window('dialog', 'Converter');
  win.alignChildren = 'fill';

  win.input = win.add('group', undefined)
  win.input.title = win.input.add('statictext', undefined, 'Select input folder')
  win.input.browseButton = win.input.add('button', undefined, 'Browse')

  win.inputPath = win.add('statictext', undefined, '', {truncate: 'middle'})

  win.output = win.add('group', undefined)
  win.output.title = win.output.add('statictext', undefined, 'Select output folder')
  win.output.browseButton = win.output.add('button', undefined, 'Browse')

  win.outputPath = win.add('statictext', undefined, '', {truncate: 'middle'})

  win.checkboxes = win.add('panel', undefined, 'Formats')
  win.checkboxes.orientation = 'row'

  for (var i = 0; i < fileFormats.length; i++) {
    win.checkboxes[fileFormats[i].name] = win.checkboxes.add('checkbox', undefined, fileFormats[i].name)
  }

  win.buttons = win.add('group', undefined)
  win.buttons.alignment = 'center'
  win.buttons.cancelButton = win.buttons.add('button', undefined, 'Cancel')
  win.buttons.convertButton = win.buttons.add('button', undefined, 'Convert')

  win.input.browseButton.onClick = function() {
    getInput()
    win.inputPath.text = inputFolder.getRelativeURI()
  };

  win.output.browseButton.onClick = function() {
    getOutput()
    win.outputPath.text = outputFolder.getRelativeURI()
  };

  win.buttons.convertButton.onClick = function() {
    var checkBoxValues = []
    if (inputFolder != null && outputFolder != null) {
      for (var i = 0; i < fileFormats.length; i++) {
        checkBoxValues.push(win.checkboxes[fileFormats[i].name].value)
      }
      convert(checkBoxValues)
      win.close()
    }
	};

	win.buttons.cancelButton.onClick = function() {
		win.close()
	};

	win.show();
}

function convert(checkBoxValues) {
  var files = new Array()
  files = inputFolder.getFiles(matchFileType)
  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      currentFile = app.open(files[i])
      for (var j = 0; j < fileFormats.length; j++) {
        if (checkBoxValues[j] == 1) {
          fileFormats[j].saveFile(currentFile)
        }
      }
      currentFile.close(SaveOptions.DONOTSAVECHANGES)
    }
  }
}
function getInput() {
  inputFolder = Folder.selectDialog( 'Select the SOURCE folder...', '~' );
  if (outputFolder == null) {
    outputFolder = inputFolder;
  }
}

function getOutput() {
  outputFolder = Folder.selectDialog( 'Select the DESTINATION folder...', '~' );
}

pickFormats();
