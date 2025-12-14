function displayResults(results) {
    //temp
    console.log(results);
}


function inches_to_cm(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 2.54) + " cm"
    return new_value
}
function foot_to_cm(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 30.48) + " cm"
    return new_value
}
function yard_to_m(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 0.9144) + " m"
    return new_value
}
function mile_to_km(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 1.609) + " km"
    return new_value
}
function ounce_to_grams(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 28.35) + " g"
    return new_value
}
function pound_to_kg(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 0.454) + " kg"
    return new_value
}
function fahrenheit_to_c(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = ((new_value - 32) * 5 / 9) + " °c"
    return new_value
}


function main() {
    var selected_text = window.getSelection().toString().trim();
    //console.log(selected_text);
    //console.log(typeof selected_text);
    if (fahrenheit.test(selected_text) || fah.test(selected_text)) {
        var converted_text = fahrenheit_to_c(selected_text);
        displayResults(converted_text)
    } else if (inches.test(selected_text) || inc.test(selected_text) || inch.test(selected_text) || doubleQM.test(selected_text)) {
        var converted_text = inches_to_cm(selected_text);
        displayResults(converted_text)
    } else if (foot.test(selected_text) || feet.test(selected_text) || ft.test(selected_text) || QM.test(selected_text)) {
        var converted_text = foot_to_cm(selected_text);
        displayResults(converted_text)
    } else if (yard.test(selected_text) || yd.test(selected_text)) {
        var converted_text = yard_to_m(selected_text);
        displayResults(converted_text)
    } else if (mile.test(selected_text)) {
        var converted_text = mile_to_km(selected_text);
        displayResults(converted_text)
    } else if (ounce.test(selected_text) || oz.test(selected_text)) {
        var converted_text = ounce_to_grams(selected_text);
        displayResults(converted_text)
    } else if (pound.test(selected_text) || lb.test(selected_text) || pounds.test(selected_text)) {
        var converted_text = pound_to_kg(selected_text);
        displayResults(converted_text)
    }
}

//Inches/polegadas
const inch = /\b\d+(?:\.\d+)?\s*inch\b/i
const inches = /\b\d+(?:\.\d+)?\s*inches\b/i
const inc = /\b\d+(?:\.\d+)?\s*in\b/i
const doubleQM = /(\d+(?:\.\d+)?)\s*["″]/i

//foot/pés
const foot = /\b\d+(?:\.\d+)?\s*foot\b/i
const feet = /\b\d+(?:\.\d+)?\s*feet\b/i
const ft = /\b\d+(?:\.\d+)?\s*ft\b/i
const QM = /(\d+(?:\.\d+)?)\s*['′]/i

//yard/jarda
const yard = /\b\d+(?:\.\d+)?\s*yard\b/i
const yd = /\b\d+(?:\.\d+)?\s*yd\b/i

//mile/milha
const mile = /\b\d+(?:\.\d+)?\s*mile\b/i

//ounce/onça
const ounce = /\b\d+(?:\.\d+)?\s*ounce\b/i
const oz = /\b\d+(?:\.\d+)?\s*oz\b/i

//pound/libra
const pound = /\b\d+(?:\.\d+)?\s*pound\b/i
const pounds = /\b\d+(?:\.\d+)?\s*pounds\b/i
const lb = /\b\d+(?:\.\d+)?\s*lb\b/i

//fahrenheit
const fahrenheit = /\b\d+(?:\.\d+)?\s*°?\s*F\b/i
const fah = /\b\d+(?:\.\d+)?\s*fahrenheit\b/i


document.addEventListener('mouseup', main);