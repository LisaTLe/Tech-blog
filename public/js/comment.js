const newFormHandler = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector("input[name = [post_id]").value;
  const body = document.querySelector('textarea [name = "comment-body"]').value;

  if (body) {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.location.reload();
  }
};

document
  .querySelector("#comment-form")
  .addEventListener("submit", newFormHandler);
