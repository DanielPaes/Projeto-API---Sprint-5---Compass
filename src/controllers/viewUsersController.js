

let buttonGetAll = document.querySelector("#button-get-all");
let searchUser = document.querySelector("#edit-search");
let clean = document.querySelector("#edit-clean");
let buttonEditUser = document.querySelector('#edit-user');
let buttonDeleteUser = document.querySelector('#edit-delete');

let inputId = document.querySelector("#input-id-edit");

let inputName = document.querySelector("#input-name");
let inputCpf = document.querySelector("#input-cpf");
let inputBirthDate = document.querySelector("#input-birthdate");
let inputEmail = document.querySelector("#input-email");
let inputPassword = document.querySelector("#input-password");
let inputAddress = document.querySelector("#input-address");
let inputNumber = document.querySelector("#input-number");
let inputComplement = document.querySelector("#input-complement");
let inputCity = document.querySelector("#input-city");
let inputState = document.querySelector("#input-state");
let inputCountry = document.querySelector("#input-country");
let inputZipCode = document.querySelector("#input-zipcode");

console.log('teste');

buttonGetAll?.addEventListener('click', function(event){
    event.preventDefault();
    fetch('http://localhost:3000/api/v1/users')
        .then((data) => data.json())
        .then((post) => {
            console.log(post);
            window.open("http://localhost:3000/api/v1/users?page=1&limit=3");
        })
})


let postUser = document.querySelector('#submit-user');



postUser?.addEventListener('click', function(event){
    event.preventDefault();

    let data = fillObject();

    validateAge();

    if(validatePassword(inputPassword.value) 
        && validateName(inputName.value) 
        && validateCPF(inputCpf.value) 
        && validateEmail(inputEmail.value)
        && validateAge()) {
        try{
            fetch('http://localhost:3000/api/v1/users', {
                method: "POST",
              body: JSON.stringify(data),
              headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {console.log(json); alert(json['_id'])})
            .then(() => cleanObject());
        }catch(err){
            console.log(err.message);
        }   
    } else {
        alert("Not included.")
    }    
})

searchUser?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/api/v1/users/${inputId.value}`)
        .then((data) => data.json())
        .then((post) => {
            inputName.value = post['name'],
            inputCpf.value = post['cpf'],
            inputBirthDate.value = post['birthDate'],
            inputEmail.value = post['email'],
            inputPassword.value = post['password'],
            inputAddress.value = post['address'],
            inputNumber.value = post['number'],
            inputComplement.value = post['complement'],
            inputCity.value = post['city'],
            inputState.value = post['state'],
            inputCountry.value = post['country'],
            inputZipCode.value = post['zipCode'],
            console.log(post)
        });
    } catch(err){
        console.log(err.message, '404 (Not Found)');
    }
}
)

clean?.addEventListener('click' , function(){

})


buttonEditUser?.addEventListener('click', function(event){
    event.preventDefault();
    console.log('teste');

    let data = fillObject();

    if(validatePassword(inputPassword.value) 
    && validateName(inputName.value) 
    && validateCPF(inputCpf.value) 
    && validateEmail(inputEmail.value)
    && validateAge()){
        try{
            fetch(`http://localhost:3000/api/v1/users/${inputId.value}`, {
                method: 'PUT', // Method itself
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data) // We send data in JSON format
                })
                .then(tes => tes.json())
                .then(data => console.log(data), alert('User sucessfully updated'));
                
        } catch(err){
            console.log('User not edited.')
        }
    } else {
        alert('Not edited.')
    }
    
})

buttonDeleteUser?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/api/v1/users/${inputId.value}`, {method: 'DELETE'})
        .then(() => alert('User sucessfully deleted.'))
        .then(() => cleanObject())
        .then(() => inputId.value = '');        
    } catch(err){
        console.log(err.message)
    }

    
})


function fillObject(){
    let _dataEdit = {
        name: inputName.value,
        cpf: inputCpf.value,
        birthDate: inputBirthDate.value,
        email: inputEmail.value,
        password: inputPassword.value,
        address: inputAddress.value,
        number: inputNumber.value,
        complement: inputComplement.value,
        city: inputCity.value,
        state: inputState.value,
        country: inputCountry.value,
        zipCode: inputZipCode.value
    }
    return _dataEdit;
}

function cleanObject(){
    inputName.value = '',
    inputCpf.value = '',
    inputBirthDate.value = '',
    inputEmail.value = '',
    inputPassword.value = '',
    inputAddress.value = '',
    inputNumber.value = '',
    inputComplement.value = '',
    inputCity.value = '',
    inputState.value = '',
    inputCountry.value = '',
    inputZipCode.value = ''
}

// Funções de validação

let validateName = (name) => {
    var padraoNome = /^[a-zA-Z\u00C0-\u00FF ]*$/gi;
    let texto = name;
    return padraoNome.test(texto);
}

function validateCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;

    if(strCPF.length != 11) return false;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function validatePassword(password){
    if(password.length < 6){
        return false;
    } else {
        return true;
    } 
}


function validateEmail(email){
    let padraoEmail = /^[\w._-]+@[\w_.-]+\.[\w]/gi;
    let texto = email;
    return padraoEmail.test(texto);

}

function validateAge(){
    let today = new Date();
    let birthdate = inputBirthDate.value;
    console.log(birthdate);
    let birthdatesplit = birthdate.split('T')[0].split('-');
    let birthYear = birthdatesplit[0];
    let birthMonth = birthdatesplit[1];
    let birthDay = birthdatesplit[2];

    let nascimento = new Date(birthYear, (birthMonth - 1), birthDay);    
        let diferencaAnos = today.getFullYear() - nascimento.getFullYear();
        if ( new Date(today.getFullYear(), today.getMonth(), today.getDate()) < 
             new Date(today.getFullYear(), nascimento.getMonth(), nascimento.getDate()) )
            diferencaAnos--;
            console.log(diferencaAnos);   
    
    if(diferencaAnos < 18){
        return false;
    } else{
        return true;
    }
}


