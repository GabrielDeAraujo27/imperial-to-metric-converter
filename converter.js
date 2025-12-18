function displayResults(value) {
    //temp
    chrome.runtime.sendMessage({
        type: 'ConvertedNumber',
        value: value,
        showNotification: false
    });
};


function inches_to_cm(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 2.54) + " cm"
    //console.log('inches')
    return new_value
}
function foot_to_cm(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 30.48) + " cm"
    //console.log('foot')
    return new_value
}
function yard_to_m(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 0.9144) + " m"
    //console.log('yard')
    return new_value
}
function mile_to_km(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 1.609) + " km"
    //console.log('mile')
    return new_value
}
function ounce_to_grams(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 28.35) + " g"
    //console.log('ounce')
    return new_value
}
function pound_to_kg(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 0.454) + " kg"
    //console.log('pound')
    return new_value
}
function fahrenheit_to_c(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = ((new_value - 32) * 5 / 9) + " °c"
    //console.log('fahrenheit')
    return new_value
}
function gallon_to_liter(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 3.785) + " l"
    //console.log('gallon')
    return new_value
}
function cup_to_ml(old_value) {
    var new_value = parseFloat(old_value.replace(/[^0-9.,]/g,''))
    new_value = (new_value * 236.588) + " ml"
    //console.log('cup')
    return new_value
}


//Inches/polegadas
const inches_regexes = [
    /\b\d+(?:\.\d+)?\s*inch\b/i,
    /\b\d+(?:\.\d+)?\s*inches\b/i,
    /\b\d+(?:\.\d+)?\s*in\b/i,
    /(\d+(?:\.\d+)?)\s*["″]/i
]

//foot/pés
const foot_regexes = [
    /\b\d+(?:\.\d+)?\s*foot\b/i,
    /\b\d+(?:\.\d+)?\s*feet\b/i,
    /\b\d+(?:\.\d+)?\s*ft\b/i,
    /(\d+(?:\.\d+)?)\s*['′]/i
]

//yard/jarda
const yard_regexes = [
    /\b\d+(?:\.\d+)?\s*yard\b/i,
    /\b\d+(?:\.\d+)?\s*yd\b/i
]

//mile/milha
const mile_regexes = [
    /\b\d+(?:\.\d+)?\s*mile\b/i
]

//ounce/onça
const ounce_regexes = [
    /\b\d+(?:\.\d+)?\s*ounce\b/i,
    /\b\d+(?:\.\d+)?\s*oz\b/i
]

//pound/libra
const pound_regexes = [
    /\b\d+(?:\.\d+)?\s*pound\b/i,
    /\b\d+(?:\.\d+)?\s*pounds\b/i,
    /\b\d+(?:\.\d+)?\s*lb\b/i
]

//fahrenheit
const fahrenheit_regexes = [
    /\b\d+(?:\.\d+)?\s*°?\s*F\b/i,
    /\b\d+(?:\.\d+)?\s*fahrenheit\b/i
]

//gallon/galão
const gallon_regexes = [
    /\b\d+(?:\.\d+)?\s*gallon\b/i,
    /\b\d+(?:\.\d+)?\s*gallons\b/i,
    /\b\d+(?:\.\d+)?\s*gal\b/i
]

//cup/xícara
const cup_regexes = [
    /\b\d+(?:\.\d+)?\s*cup\b/i,
    /\b\d+(?:\.\d+)?\s*cups\b/i
]

function main() {
    var selected_text = window.getSelection().toString().trim();
    //console.log(selected_text);
    //console.log(typeof selected_text);
    if (fahrenheit_regexes.some(rx => rx.test(selected_text))) {
        var converted_text = fahrenheit_to_c(selected_text);
        displayResults(converted_text)
    } else if (inches_regexes.some(rx => rx.test(selected_text))) {
        var converted_text = inches_to_cm(selected_text);
        displayResults(converted_text)
    } else if (foot_regexes.some(rx => rx.test(selected_text))) {
        var converted_text = foot_to_cm(selected_text);
        displayResults(converted_text)
    } else if (yard_regexes.some(rx => rx.test(selected_text))) {
        var converted_text = yard_to_m(selected_text);
        displayResults(converted_text)
    } else if (mile_regexes.some(rx => rx.test(selected_text))) {
        var converted_text = mile_to_km(selected_text);
        displayResults(converted_text)
    } else if (ounce_regexes.some(rx => rx.test(selected_text))) {
        var converted_text = ounce_to_grams(selected_text);
        displayResults(converted_text)
    } else if (pound_regexes.some(rx => rx.test(selected_text))) {
        var converted_text = pound_to_kg(selected_text);
        displayResults(converted_text)
    } else if (gallon_regexes.some(rx => rx.test(selected_text))) {
        var converted_text = gallon_to_liter(selected_text);
        displayResults(converted_text)
    } else if (cup_regexes.some(rx => rx.test(selected_text))) {
        var converted_text = cup_to_ml(selected_text);
        displayResults(converted_text)
    } else {
        chrome.runtime.sendMessage({
            type: 'HideContextMenu'
        });
    }
}


document.addEventListener('mouseup', main);