// function to delete activity
async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/activities/edit-activity/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/my-activities');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-activity-btn').addEventListener('click', deleteFormHandler);