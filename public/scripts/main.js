const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
});


document.querySelectorAll(".copy-link").forEach((copyLinkParent) => {
  const inputField = copyLinkParent.querySelector(".link-field");
  const copyButton = copyLinkParent.querySelector(".link-copy-btn");
  const text = inputField.value;

  inputField.addEventListener("focus", () => inputField.select());

  copyButton.addEventListener("click", () => {
    inputField.select();
    navigator.clipboard.writeText(text);

    inputField.value = "Link Copied to Clipboard!";
    setTimeout(() => (inputField.value = text), 2000);
  });
});

// const navbar = document.getElementById('navbar')

// // OnScroll event handler
// const onScroll = () => {

//   // Get scroll value
//   const scroll = document.documentElement.scrollTop

//   // If scroll value is more than 0 - add class
//   if (scroll > 0) {
//     navbar.classList.add("nav-dropshadow");
//   } else {
//     navbar.classList.remove("nav-dropshadow")
//   }
// }

// // Use the function
// window.addEventListener('scroll', onScroll)