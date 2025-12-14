function select_text() {
    const selected_text = window.getSelection().toString().trim()
    console.log(selected_text)
}

console.log("hello world");
document.addEventListener('mouseup', select_text);

