let Products = [];

async function getProsCart() {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  });
  let result = await res.json();
  Products = result.data.products;
  console.log("Products", Products);
  disProducts();
}

getProsCart();

function disProducts() {
  let products = ``;
  for (let i = 0; i < Products.length; i++) {
    products += `
    <il>
    
    <div class="cart-item">
      <div class="prodet-datils" >
          <img src="${Products[i].product.imageCover}" alt="">
          <h3>${Products[i].product.title}</h3>
      </div>
      <button class="neg" onclick="updateCartItem('${Products[i].product._id }',${
                          Products[i].count
                        },'-')">-</button>
                        <input class="count" type="text" value="${
                          Products[i].count
                        }">
                        <button class="plus" onclick="updateCartItem('${Products[i].product._id }',${
                          Products[i].count
                        },'+')">+</button>
      <h4>${Products[i].price * Products[i].count}</h4>
      
          <button class="btn-delete" onclick="delProduct('${
            Products[i].product._id
          }')">Delete</button>
          
    </div>
    </il>
     `;
  }

  document.querySelector(".cart").innerHTML = products;
}

async function delProduct(prId) {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${prId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  });
  let result = await res.json();
  Products = result.data.products;
  disProducts();
}

window.delProduct = delProduct;
async function updateCartItem(prId ,num ,op) {
  let data 
  if(op=="+"){
    data= {
      count: num + 1,
    };
  }else{
  
    data= {
      count: num - 1,
    };   
  
  }
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${prId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  let result = await res.json();
  Products=result.data.products;
  disProducts();
  
}
window.updateCartItem = updateCartItem;