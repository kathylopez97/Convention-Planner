const eventForm = async (event) => {
    event.preventDefault();
    let eventName = document.getElementById('eventName');
    let eventImage = document.getElementById('eventImage')
    let startDate = document.getElementById('startDate');
    let startTime = document.getElementById('startTime');
    let price = document.getElementById('price');
    let description = document.getElementByclas('description');

    
    const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ eventName, startDate, startTime, price, description }),
        headers: {'Content-Type': 'application/json'},
    });
    if(response.ok){
        alert('a-okay');
    } else {
        alert('not a-okay');
    }

    
};
document.querySelector('.create-event').addEventListener('submit', eventForm);