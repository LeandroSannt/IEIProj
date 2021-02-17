module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getUTCDate()) {
            age = age - 1
        }
        return age
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        
     const teste =  ( (date.getDate() ) + "/"  + ((date.getMonth() + 1)) +  "/" +date.getFullYear() ) 

        return {
            day,
            month,
            year,
            iso:`${year}-${month}-${day}`,
            DayMonth:`${day}/${month}`,
            format:`${day}/${month}/${year}`,
            teste
        }
    },
    formatCpfCnpj(value){
        value = value.replace(/\D/g,"")

        if(value.length > 14){
            value = value.slice(0, -1)

        }if(value.length >11){
            value = value.replace(/(\d{2})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1/$2")
            value = value.replace(/(\d{4})(\d)/, "$1-$2")
        }else{
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1-$2")
        }
        return value
    },
}