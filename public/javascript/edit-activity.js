async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.getElementsByName('post-title')[0].value;

    console.log("----------------------------------------------");
    console.log(`id: ${id}`);
    console.log(title);
    console.log("----------------------------------------------");

    const response = await fetch('/api/edit-activity/' + id, {
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