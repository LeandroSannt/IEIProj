console.log("oi")
const Mask ={
    apply(input, func){
        setTimeout(function(){
          input.value =  Mask[func] (input.value)
        },1)
    },
    formatBRL(value){

        value = value.replace(/\D/g,"")

        return new Intl.NumberFormat('pt-BR',{
            style:  'currency',
            currency:   'BRL'
        }).format(value/100)
    },

    cpfCnpj(value){
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

    cep(value){
    value = value.replace(/\D/g,"")
    if(value.length > 8)
        value.slice(0, -1)
        value = value.replace(/(\d{5})(\d)/, "$1-$2")
        return value
        
    }
}
