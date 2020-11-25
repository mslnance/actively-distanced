// passes in activity id for comments
async function commentFormHandler(id) {

    const comment_text = document.getElementById(id).value;
    const activity_id = id;

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