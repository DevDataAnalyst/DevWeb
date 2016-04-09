function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("demo").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("POST", "http://pbil.univ-lyon1.fr/cgi-bin/Rweb/Rweb.cgi", true);
  xhttp.send();
}


$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
});


function saveTextAsFile()
{      
// grab the content of the form field and place it into a variable
    var textToWrite = document.getElementById("inputTextToSave").value;
//  create a new Blob (html5 magic) that conatins the data from your form feild
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
// Specify the name of the file to be saved
    var fileNameToSaveAs = "Script.R";
    
// Optionally allow the user to choose a file name by providing 
// an imput field in the HTML and using the collected data here
// var fileNameToSaveAs = txtFileName.text;

// create a link for our script to 'click'
    var downloadLink = document.createElement("a");
//  supply the name of the file (from the var above).
// you could create the name here but using a var
// allows more flexability later.
    downloadLink.download = fileNameToSaveAs;
// provide text for the link. This will be hidden so you
// can actually use anything you want.
    downloadLink.innerHTML = "My Hidden Link";
    
// allow our code to work in webkit & Gecko based browsers
// without the need for a if / else block.
    window.URL = window.URL || window.webkitURL;
          
// Create the link Object.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
// when link is clicked call a function to remove it from
// the DOM in case user wants to save a second file.
    downloadLink.onclick = destroyClickedElement;
// make sure the link is hidden.
    downloadLink.style.display = "none";
// add the link to the DOM
    document.body.appendChild(downloadLink);
    
// click the new link
    downloadLink.click();
}

function destroyClickedElement(event)
{
// remove the link from the DOM
    document.body.removeChild(event.target);
}


jQuery("#txtbtn").on('click', function() {
    var caretPos = document.getElementById("inputTextToSave").selectionStart;
    var textAreaTxt = jQuery("#inputTextToSave").val();
    var txtToAdd = "library(ggplot2) \n histogram <- ggplot(data=iris, aes(x=Sepal.Width)) \n histogram + geom_histogram(binwidth=0.2, color='black', aes(fill=Species)) +   xlab('Sepal Width') +  ylab('Frequency') + ggtitle('Histogram of Sepal Width') ";
    jQuery("#inputTextToSave").val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
});

jQuery("#libtxt").on('click', function() {
    var caretPos = document.getElementById("inputTextToSave").selectionStart;
    var textAreaTxt = jQuery("#inputTextToSave").val();
    var txtToAdd = "library()";
    jQuery("#inputTextToSave").val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
});


