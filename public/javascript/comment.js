async function commentFormHandler(event) {
    event.preventDefault();

    console.log('hitting front end logic');

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const activity_id = document.querySelector('.comment-form').getAttribute('data-activityId');
    console.log(activity_id);

    if (comment_text) {

        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                activity_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
            // console.log(response);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);