console.log('Client side javascript is loaded');


const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = "from javascript"

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()


    const location = search.value

    messageOne.textContent = "loading"



    fetch(`http://localhost:5000/weather?search=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            console.log(data.error);
            messageTwo.textContent = data.error
            messageOne.textContent = ""
        } else {
            messageTwo.textContent = data.forecast
            messageOne.textContent = ""
            console.log(data);
        }
    })
})
})

