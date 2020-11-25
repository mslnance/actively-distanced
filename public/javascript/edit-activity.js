// edit activity function
async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.getElementsByName('title')[0].value;
    const description = document.getElementsByName('description')[0].value;
    const date = document.getElementsByName('date')[0].value;
    const time = document.getElementsByName('time')[0].value;

    const response = await fetch(`/api/activities/edit-activity/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            description: description,
            date: date,
            time: time
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/my-activities');
    } else {
        console.log(response.statusText);
    }

}

document.querySelector('.edit-activity-form').addEventListener('submit', editFormHandler);