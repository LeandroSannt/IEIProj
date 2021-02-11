const formGroups = document.querySelectorAll('.form-group');
const inputs = document.querySelectorAll('.form-group input');
const iconView = document.querySelector('.view');
const msgs = document.querySelectorAll('.error-msg');


function outsideClick(element, callback){
    const html = document.documentElement;
    html.addEventListener('click', handleOutsideClick);

    function handleOutsideClick(event){
        if(!element.contains(event.target))
        callback();
    }
}

function focusEffect(i){
    formGroups.forEach((group) =>{
        group.classList.remove('active-focus')

        formGroups[i].classList.add('active-focus');
        outsideClick(group, () => {
            group.classList.remove('active-focus')
        });
    })
}

function validationForm(element){
    const target = element.target;
    console.log(target.parentNode);
    if(!target.checkValidity()){
        target.parentNode.classList.add('invalid-input');
        target.parentNode.nextElementSibling.classList.add('visible');
    } else {
        target.parentNode.classList.add('valid-input');
        target.parentNode.nextElementSibling.classList.remove('visible');
    }
}

inputs.forEach((input, i) =>{
    input.addEventListener('focus', () => {
        focusEffect(i);
    });
    input.addEventListener('change', validationForm);
    
})

function showPass(){
    inputs[1].setAttribute('type', 'text');
    iconView.innerHTML = '<i class="fas fa-eye"></i>';
}

function hidePass(){
    inputs[1].setAttribute('type', 'password');
    iconView.innerHTML = '<i class="fas fa-eye-slash"></i>';
}

iconView.addEventListener('mouseenter', showPass);
iconView.addEventListener('mouseleave', hidePass);
