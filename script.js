// header stuff
const hamMenu = document.querySelector(".ham-menu");
const headerNav = document.querySelector(".header-nav");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  headerNav.classList.toggle("active");
});

// url stuff
// collecting a link
// get the input field itself - DOM traversal
const input = document.querySelector("#url-input");
const button = document.querySelector("#active-btn");
const error = document.querySelector("#error-message");
const displayLink = document.querySelector("#link-message");

// get url from input field
button.addEventListener("click", onSubmit);
function onSubmit() {
  const url = input.value;
  // validate the link
  const isValid = validateLink(url);
  if (isValid) {
    error.classList.add("hidden");
    // shorten the link
    fetch("https://ulvis.net/api/v1/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        const parsedData = JSON.parse(data);
        const shortenedLink = parsedData.result_url;
        // return the shortened link
        console.log(shortenedLink);
        displayLink.textContent = shortenedLink;

        // local storage
        localStorage.setItem("shortenUrl", JSON.stringify(shortenedLink));
        console.log(JSON.parse(localStorage.getItem("shortenUrl")));
      })
      .catch((err) => {
        error.textContent = err.message;
        error.classList.remove("hidden");
      });
  } else {
    error.textContent = "Please enter a valid link";
    error.classList.remove("hidden");
  }
}

function validateLink(link) {
  const urlPattern =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if (link !== "" && link.match(urlPattern)) {
    return true;
  } else {
    return false;
  }
}

// save to local storage

// copying to clipboard
