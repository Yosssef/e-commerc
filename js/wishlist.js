let wishlistpro = [];
let isemptycontint = ` <img src="./images/pixel-heart-break-png-design-5693616.png" alt="" />
                <h4 class="text-center">No Items In Wish List</h4> `;
async function getProsWishlist() {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  });
  let result = await res.json();
  console.log(result.data);
  wishlistpro = result.data;
  
  disProducts();
}

getProsWishlist();

function disProducts() {
  if(wishlistpro.length>0){
    let products = ``;
  for (let i = 0; i < wishlistpro.length; i++) {
    products += `
    <il>
    <div class="wish-item">
                    <div class="proded-datils" >
                        <img src="${wishlistpro[i].imageCover}" alt="">
                        <h3>${wishlistpro[i].title
                          .split(" ", 2)
                          .join(" ")} </h3>
                    </div>
                    <h3>${wishlistpro[i].price}$</h3>
                    <div class="butns">
                        <button class="btn-delete" onclick="delProduct('${
                          wishlistpro[i]._id
                        }')">Delete</button>
                        <button class="btn-add" onclick="addToCart('${
                          wishlistpro[i]._id
                        }')">Add Cart</button></div>
                        </div>
                        </il>
    `;
  }
  document.querySelector(".wish").innerHTML = products;
  }
   else {
    document.querySelector(".wish").innerHTML = isemptycontint;
  }
}

async function delProduct(prId) {
  let res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${prId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    }
  );
  let result =await res.json();
  if (result.status == "success") {
    
    let ids = result.data;
    let newPro = [];
    for (let i = 0; i < ids.length; i++) {
      for (let j = 0; j < wishlistpro.length; j++) {
        if (ids[i] == wishlistpro[j].id) {
          newPro.push(wishlistpro[j]);
        }
      }
    }
    wishlistpro=newPro
    console.log(wishlistpro)
    if(wishlistpro.length==0){
      isempty=true;
    }
    console.log(isempty)
    disProducts();
  }
}

async function addToCart(prId) {
  let data = {
    productId: prId,
  };
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  let result = await res.json();
  
}

// Expose functions to the global scope
window.delProduct = delProduct;
window.addToCart = addToCart;

function tost(res) {
  if (res.status == "success") {
    toastr["success"](`${res.message}`);
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
