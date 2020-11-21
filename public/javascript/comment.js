async function commentFormHandler(event) {
  event.preventDefault();

<<<<<<< HEAD
  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

  const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];
=======
    console.log('hitting front end logic');

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = document.querySelector('.comment-form').getAttribute('data-postId');
    console.log(post_id);
>>>>>>> develop

  if (comment_text) {
      const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
              post_id,
              comment_text
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      });

<<<<<<< HEAD
      if(response.ok) {
          document.location.reload();
      } else {
          console.log(response.statusText);
      }
  }
=======
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
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
>>>>>>> develop
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);