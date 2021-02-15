const currentPage =location.pathname
const menuItems = document.querySelectorAll("header nav ul a ")
console.log(menuItems)

for(item of menuItems){
 
    if(currentPage .includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}
