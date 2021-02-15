

function mult(value){
    const instituto = (40/100) * value
    const profissional = (60/100) * value
        
     document.querySelector("#prof").value = instituto.toFixed(2)
     document.querySelector("#insti").value = profissional.toFixed(2)
 
 }

 const formDelete= document.querySelector("#form-delete")
        formDelete.addEventListener("submit",function(event){
            const confirmation = confirm("Tem certeza que dejesa pagar esse usuario, a ação não podera ser desfeita")
            if(!confirmation){
                event.preventDefault()
        }
    })



