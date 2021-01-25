function mult(value){
    const instituto = (40/100) * value
    const profissional = (60/100) * value
        
     document.querySelector("#prof").value = instituto
     document.querySelector("#insti").value = profissional
 
 }
 
/*
 const currentPage =location.pathname
const menuItems = document.querySelectorAll("header  a ")

for(item of menuItems){
 
    if(currentPage .includes(item.getAttribute("href"))){
        item.classList.add("active")
}
}*/

const formDelete= document.querySelector("#form-delete")
        formDelete.addEventListener("submit",function(event){
            const confirmation = confirm("Deseja deletar a receita ?")
            if(!confirmation){
                event.preventDefault()
        }
    })