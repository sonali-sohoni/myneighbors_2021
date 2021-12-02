async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_details = document.querySelector('#post-url').value;
  const user_id = document.querySelector('#user_id').value;
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_details,
      user_id

    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/createPost');
  } else {
    alert(response.statusText);
  }
}



async function addCommentBtn(thisBtn) {
  const post_id = thisBtn.getAttribute("data-post-id")//document.querySelector('#post_id').value;
  document.location.replace(`/post/${post_id}`);
};

async function editPosttBtn(thisBtn) {
  const post_id = thisBtn.getAttribute("data-post-id")
  document.location.replace(`/editPost/${post_id}`);
};

// async function deletePosttBtn(event) {
//   event.preventDefault();
//   const post_id = document.querySelector('#post_id').value;

//   const response = await fetch(`/api/comments/${post_id}`, {
//     method: 'DELETE'
//   });
//   const response = await fetch(`/api/posts/${post_id}`, {
//     method: 'DELETE'
//   });

//   document.location.replace(`/`);
// };


