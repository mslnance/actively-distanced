async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.getElementsByName('activity-title')[0].value;

    const response = await fetch('/api/activities/edit-activity/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            title: title
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