let cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event =>{
    event.preventDefault()
    if (event.code.toLowerCase() === 'space'){
        setRandomColors()
    }
})

document.addEventListener('click', event => {
    let type = event.target.dataset.type
    if (type === 'lock'){
        let node = event.target.tagName.toLowerCase() === 'i'
        ? event.target : event.target.children[0];

        node.classList.toggle('fa-lock-open');
        node.classList.toggle("fa-lock");
    } else if(type === 'copy') {
        copyToClickboard(event.target.textContent)
    }
})

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
    let colors = isInitial ? getColorFromHash() : [];

    cols.forEach((col, index) => {
        let isLocked = col.querySelector('i').classList.contains('fa-lock')
        let text = col.querySelector('h2');
        let button = col.querySelector("button");

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        let color = isInitial
          ? colors[index]
            ? colors[index]
            : chroma.random()
          : chroma.random();

        if (!isInitial) {
            colors.push(color);
        }

        text.textContent = color;
        col.style.background = color;

        setTextColor(text, color);
        setTextColor(button, color);

        updateHash(colors)
    })
}
function setTextColor(text, color) {
    let luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white'
};

function updateHash (colors = []) {
    document.location.hash = colors.map(col => col.toString().substring(1)).join('_')
}

function getColorFromHash(){
    if (document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('_')
        .map(item => `#` + item)
    }
    return [];
}

setRandomColors(true);