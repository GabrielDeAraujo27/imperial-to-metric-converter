function displayResults(value) {
    if (chrome.runtime && !!chrome.runtime.id) {
        chrome.runtime.sendMessage({
            type: 'ConvertedNumber',
            value: value,
            showNotification: false
        });
    }
}

function convertValue(old_value, multiplier, unit) {
    const numericPart = old_value.replace(/[^0-9.,]/g, '').replace(',', '.');
    const value = parseFloat(numericPart);
    if (isNaN(value)) return null;
    const converted = (value * multiplier).toFixed(2);
    return parseFloat(converted) + " " + unit;
}

function inches_to_cm(old_value) {
    return convertValue(old_value, 2.54, "cm");
}
function foot_to_cm(old_value) {
    return convertValue(old_value, 30.48, "cm");
}
function yard_to_m(old_value) {
    return convertValue(old_value, 0.9144, "m");
}
function mile_to_km(old_value) {
    return convertValue(old_value, 1.609, "km");
}
function ounce_to_grams(old_value) {
    return convertValue(old_value, 28.35, "g");
}
function pound_to_kg(old_value) {
    return convertValue(old_value, 0.454, "kg");
}
function fahrenheit_to_c(old_value) {
    const numericPart = old_value.replace(/[^0-9.,]/g, '').replace(',', '.');
    const value = parseFloat(numericPart);
    if (isNaN(value)) return null;
    const converted = ((value - 32) * 5 / 9).toFixed(2);
    return parseFloat(converted) + " °C";
}
function gallon_to_liter(old_value) {
    return convertValue(old_value, 3.785, "L");
}
function cup_to_ml(old_value) {
    return convertValue(old_value, 236.588, "ml");
}

//Inches/polegadas
const inches_regexes = [
    /\b\d+(?:[.,]\d+)?\s*inch\b/i,
    /\b\d+(?:[.,]\d+)?\s*inches\b/i,
    /\b\d+(?:[.,]\d+)?\s*in\b/i,
    /(\d+(?:[.,]\d+)?)\s*["″]/i
]

//foot/pés
const foot_regexes = [
    /\b\d+(?:[.,]\d+)?\s*foot\b/i,
    /\b\d+(?:[.,]\d+)?\s*feet\b/i,
    /\b\d+(?:[.,]\d+)?\s*ft\b/i,
    /(\d+(?:[.,]\d+)?)\s*['′]/i
]

//yard/jarda
const yard_regexes = [
    /\b\d+(?:[.,]\d+)?\s*yard\b/i,
    /\b\d+(?:[.,]\d+)?\s*yd\b/i
]

//mile/milha
const mile_regexes = [
    /\b\d+(?:[.,]\d+)?\s*mile\b/i
]

//ounce/onça
const ounce_regexes = [
    /\b\d+(?:[.,]\d+)?\s*ounce\b/i,
    /\b\d+(?:[.,]\d+)?\s*oz\b/i
]

//pound/libra
const pound_regexes = [
    /\b\d+(?:[.,]\d+)?\s*pound\b/i,
    /\b\d+(?:[.,]\d+)?\s*pounds\b/i,
    /\b\d+(?:[.,]\d+)?\s*lb\b/i
]

//fahrenheit
const fahrenheit_regexes = [
    /\b\d+(?:[.,]\d+)?\s*°?\s*F\b/i,
    /\b\d+(?:[.,]\d+)?\s*fahrenheit\b/i
]

//gallon/galão
const gallon_regexes = [
    /\b\d+(?:[.,]\d+)?\s*gallon\b/i,
    /\b\d+(?:[.,]\d+)?\s*gallons\b/i,
    /\b\d+(?:[.,]\d+)?\s*gal\b/i
]

//cup/xícara
const cup_regexes = [
    /\b\d+(?:[.,]\d+)?\s*cup\b/i,
    /\b\d+(?:[.,]\d+)?\s*cups\b/i
]

function main() {
    const selected_text = window.getSelection().toString().trim();
    if (!selected_text) return;

    let converted_text = null;

    if (fahrenheit_regexes.some(rx => rx.test(selected_text))) {
        converted_text = fahrenheit_to_c(selected_text);
    } else if (inches_regexes.some(rx => rx.test(selected_text))) {
        converted_text = inches_to_cm(selected_text);
    } else if (foot_regexes.some(rx => rx.test(selected_text))) {
        converted_text = foot_to_cm(selected_text);
    } else if (yard_regexes.some(rx => rx.test(selected_text))) {
        converted_text = yard_to_m(selected_text);
    } else if (mile_regexes.some(rx => rx.test(selected_text))) {
        converted_text = mile_to_km(selected_text);
    } else if (ounce_regexes.some(rx => rx.test(selected_text))) {
        converted_text = ounce_to_grams(selected_text);
    } else if (pound_regexes.some(rx => rx.test(selected_text))) {
        converted_text = pound_to_kg(selected_text);
    } else if (gallon_regexes.some(rx => rx.test(selected_text))) {
        converted_text = gallon_to_liter(selected_text);
    } else if (cup_regexes.some(rx => rx.test(selected_text))) {
        converted_text = cup_to_ml(selected_text);
    }

    if (converted_text) {
        displayResults(converted_text);
    } else {
        if (chrome.runtime && !!chrome.runtime.id) {
            chrome.runtime.sendMessage({
                type: 'HideContextMenu'
            });
        }
    }
}

document.addEventListener('mouseup', main);