async function commentFormHandler(id) {

    const comment_text = document.getElementById(id).value;
    // const activity_id = document.querySelector('.comment-form').getAttribute('data-activity-id');
    const activity_id = id;

    console.log("hello");
    console.log(activity_id);
    console.log(comment_text);

    if (comment_text) {
        const response = await fetch(`/api/comments`, {
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
        } else {
            alert(response.statusText);
        }
    }
}

// document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);