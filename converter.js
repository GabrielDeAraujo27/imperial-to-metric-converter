function inches_to_cm(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 2.54) + " cm"
    return new_value
}


function main() {
    var selected_text = window.getSelection().toString().trim();
    console.log(selected_text);
    //console.log(typeof selected_text);
    if (inches.test(selected_text) || inc.test(selected_text) || inch.test(selected_text) || doubleQM.test(selected_text)) {
        var converted_text = inches_to_cm(selected_text);
        console.log(converted_text)
    }
}

const inch = /\d+(?:\.\d+)?\s*inch?/i
const inches = /\d+(?:\.\d+)?\s*inches?/i
const inc = /\d+(?:\.\d+)?\s*inc?/i
const doubleQM = /\d+(?:\.\d+)?\s*"?/i

document.addEventListener('mouseup', main);