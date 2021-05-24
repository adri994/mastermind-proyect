const select = document.querySelectorAll(".select")

let rows = 0
let line = 1


const colorea = function(e){
    
    const slot = document.querySelectorAll(`.row${line}>.slot`)

    slot[rows].classList.add(e.target.classList[1])
    rows++;

    if((slot.length) === rows){
        rows =0
        line++
    }
    if(line>12){
        line = 1
        document.querySelectorAll(".slot").forEach(function(celda){
            celda.classList.remove(celda.classList[1])
        })
    } 
    
}

select.forEach(function(element) {
    element.addEventListener("click",colorea)
});

