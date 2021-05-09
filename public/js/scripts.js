// Dashboard toggle menu

// document.querySelector(".hamburger-menu").addEventListener("click", () => {
//     document.querySelector(".container").classList.toggle("change");
//   });
  
  document.querySelector(".nav-list").addEventListener("click", e => {
    const el = e.target.parentNode;
  
    console.log(el);
  
    if (el.classList[0] === "nav-link") {
      el.nextElementSibling.classList.toggle("change");
      el.classList.toggle("change");
    }
  });
  

  //set error under the input
function setErrorFor(input, message){
  const formControl = input.parentElement; // .form-control
  const small = formControl.querySelector('small');
  // add error message inside small
  small.innerText = message;
  // add error class
  formControl.className = 'form-control error';
}

function setSuccessFor(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}