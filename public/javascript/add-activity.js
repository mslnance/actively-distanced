async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="activity-title"]').value;
    const activity_body = document.querySelector('textarea[name="activity-body"]').value;
  
    const response = await fetch('/api/activity', {
        method: 'POST',
        body: JSON.stringify({
            title,
            activity_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
  
    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log(response.statusText);
    }
  }
  
  document.querySelector('.new-activity-form').addEventListener('submit', newFormHandler);
