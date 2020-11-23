async function editFormHandler(event) {
    
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];

  const title = document.getElementsByName('activity-title')[0].value;
  const activity_body = document.getElementsByName('activity-body')[0].value;

  const response = await fetch('/api/activity/' + id, {
      method: 'PUT',
      body: JSON.stringify({
          title: title,
          activity_body: activity_body
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if(response.ok) {
      document.location.replace('/dashboard/');
  } else {
      console.log(response.statusText);
  }

}

document.querySelector('.edit-activity-form').addEventListener('submit', editFormHandler)