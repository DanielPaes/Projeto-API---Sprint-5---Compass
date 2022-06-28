let inputDescription = document.querySelector('#input-description');
let inputDate = document.querySelector('#input-date');
let inputUserId = document.querySelector('#input-userid');
let inputTaskId = document.querySelector('#input-taskid');

let buttonConsultById = document.querySelector('#button-get-taskid');
let buttonSave = document.querySelector('#submit-user');
let buttonGetAll = document.querySelector('#button-get-all');
let buttonCleanTask = document.querySelector('#clean-task');
let buttonEditTask = document.querySelector('#button-edittask');

let divJson = document.querySelector('#json');

buttonSave?.addEventListener('click', function(event){
    
    event.preventDefault();

    let data = fillObject();

    if(validateDate(inputDate.value) && inputDescription.value) {
        try{
            fetch('http://localhost:3000/api/v1/tasks', {
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
    
});

buttonGetAll?.addEventListener('click', function(event){
    event.preventDefault();          
        window.location.href = "http://localhost:3000/api/v1/tasks?page=1&limit=3";
    });


    function fillObject(){
        let _dataEdit = {
            user: inputUserId.value,
            description: inputDescription.value,
            date: inputDate.value
        }
        return _dataEdit;
    }

    function validateDate(date){
        let now = new Date();
        let dateTask = new Date(date)
        if(dateTask > now){
            return true;
        } else {
            return false;
        }
    }

    buttonConsultById?.addEventListener('click', async function(event){
        event.preventDefault();
        console.log('teste');
        try{
            await fetch(`http://localhost:3000/api/v1/tasks/${inputTaskId.value}`)
            .then((data) => data.json())
            .then((post) => {
                console.log('teste');
                inputDescription.value = post['description'],
                inputDate.value = post['date'],
                inputUserId.value = post['user']
            })
        } catch(err){
            console.log(err.message, '404 (Not Found)');
        }
    }
    )

buttonCleanTask?.addEventListener('click', () =>{
    cleanInputs();
})

function cleanInputs(){
    inputTaskId.value = '',
    inputDescription.value = '',
    inputDate.value = '',
    inputUserId.value = ''
}

buttonEditTask?.addEventListener('click', function(event){
    event.preventDefault();

    let data = fillObject();

    if(validateDate(inputDate.value) && inputDescription.value){
        try{
            fetch(`http://localhost:3000/api/v1/tasks/${inputTaskId.value}`, {
                method: 'PUT', // Method itself
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data) // We send data in JSON format
                })
                .then(tes => tes.json())
                .then(data => console.log(data), alert('User sucessfully updated.'));
                
        } catch(err){
            console.log(err.message)
        }
    } else {
        alert('Edition failed.');
        throw new Error('Date or description incorrect.');
        
    }
})
