// DOM
let inputEmail = document.getElementById("userEmail");
let inputPass = document.getElementById("userPass");
let btn = document.querySelector(".btn");

btn.addEventListener("click", function () {
  let userData = {
    email: inputEmail.value,
    password: inputPass.value,
  };
  console.log(userData);
  signIn(userData);
  // OmarMo55@gmail.com
});

async function signIn(data) {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let result = await res.json();
  console.log(result.token);
  tost(result);
  localStorage.setItem("token", result.token); 
  
  window.location="index.html" 
}
function tost(res) {
  if (res.status == "success") {
    toastr["success"](`success`);
  } else {
    toastr["error"](`${res.message}`);
  }
}

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
window.signIn = signIn;
