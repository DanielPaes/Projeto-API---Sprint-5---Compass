let buttonGetAll = document.querySelector("#button-get-all");
let search = document.querySelector("#edit-search");
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


buttonGetAll?.addEventListener('click', function(){
    fetch('http://localhost:3000/users')
        .then((data) => data.json())
        .then((post) => {
            console.log(post)
        })
})


let postUser = document.querySelector('#submit-user');

postUser?.addEventListener('click', function(event){
    event.preventDefault();

    let data = fillObject();

    if(inputName.value.length > 6) {
        try{
            fetch('http://localhost:3000/users', {
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
        console.log('não passou')
    }    
})

search?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/users/${inputId.value}`)
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
            inputZipCode.value = post['zipCode']
        })
    } catch(err){
        console.log(err.message);
    }
}
)

clean?.addEventListener('click' , function(){

})


buttonEditUser?.addEventListener('click', function(event){
    event.preventDefault();

    let data = fillObject();

    fetch(`http://localhost:3000/users/${inputId.value}`, {
        method: 'PUT', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data) // We send data in JSON format
        })
        .then(tes => tes.json())
        .then(data => console.log(data));
})

buttonDeleteUser?.addEventListener('click', async function(event){
    event.preventDefault();
    try{
        await fetch(`http://localhost:3000/users/${inputId.value}`, {method: 'DELETE'})
        .then(() => alert('deletado'))
        .then(() => cleanObject());

        
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

