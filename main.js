// get container DOM.
const container = document.querySelector("#container");

// Base function to hit into api
const makeRequest = async (url) => {
  try {
    const res = await fetch(url);
    const json = await res.json();

    // check whenever hit fail
    if (!res.ok) {
      throw Error("Gagal");
    }

    // return the response.
    return json;
  } catch (err) {
    // log the error and return false.
    console.log(err);
    return false;
  }
};

// make request to users
const getName = async () => {
  const users = await makeRequest("https://jsonplaceholder.typicode.com/users");
  return users.map((item) => item.name); // map to name only
};

// make request to posts.
const getPosts = async () => {
  return await makeRequest("https://jsonplaceholder.typicode.com/posts");
};

async function main() {
  // get the data
  const fetchName = await getName();
  const fetchPosts = await getPosts();

  // check whenever one or both fail, render ups blablabla if fail.
  if (!fetchName || !fetchPosts) {
    container.innerHTML = "Ups failed hit to api";
    return;
  }

  // transform into list tho
  const names = fetchName.map((item) => `<li>${item}</li>`);

  // transform them into list of their title.
  const posts = fetchPosts.map((item) => {
    // check if title property exists.
    if ("title" in item) {
      return `<li>${item.title}</li>`;
    }
    return "<li>No Post</li>";
  });

  let namesAppended = ""; // append to string since toString for array is weird AF.
  names.forEach((item) => (namesAppended += item));

  let postsAppended = ""; // append all into string
  posts.length = 5; // limit to 5 posts.
  posts.forEach((item) => (postsAppended += item));

  container.innerHTML = `
  <p>Names</p>
  <ul>
    ${namesAppended}
  </ul>
  <p>Posts</p>
  <ul>
    ${postsAppended}
  </ul>
  `;
}

// call main function since everything asyncronous.
main();
