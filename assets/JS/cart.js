function renderCart() {
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const taxElement = document.getElementById('tax');
  const deliveryElement = document.getElementById('delivery');

  cartItemsContainer.innerHTML = '';

    // If the cart is empty, show a message
if (cart.length === 0 || cart.every(item => item.quantity === 0)) {
  cartItemsContainer.innerHTML = `
    <div class="text-white text-center py-5">
      <h5>Your cart is empty 🛒</h5>
    </div>
  `;
  return; // Stop further execution if cart is empty or all items have 0 quantity
}


  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity; 
    subtotal += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'mb-3 p-2 bg-white me-5 custom-cardradius';

    itemDiv.innerHTML = `
      <div class="d-flex justify-content-between align-items-center px-2">
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px;" class="img-fluid me-2">
        <div class="flex-grow-1">
          <h6 class="mb-1 fw-bold">${item.name}</h6>
          <p class="mb-1 small">${item.description}</p>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary shadow-none fw-bold px-2 py-1 rounded-circle me-2" onclick="updateQuantity(${index}, -1)">-</button>
            <input type="text" class="form-control text-center shadow-none border-0 p-0" style="width: 30px;" value="${item.quantity}" readonly>
            <button class="btn btn-sm btn-danger fw-bold shadow-none px-2 py-1 rounded-circle ms-2" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <span class="fw-bold"><i class='bx bx-rupee'></i>${itemTotal.toFixed(2)}</span>
          <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  // Basic fee/tax calculation
  const tax = subtotal * 0.05; // 5% tax
  const delivery = subtotal > 0 ? 20 : 0; // Flat delivery fee if there are items
  const total = subtotal + tax + delivery;

  subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
  taxElement.textContent = `₹${tax.toFixed(2)}`;
  deliveryElement.textContent = `₹${delivery.toFixed(2)}`;
  totalElement.textContent = `₹${total.toFixed(2)}`;
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCartToLocalStorage();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToLocalStorage();
  renderCart();
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); // Save cart array to localStorage as a string
}

// Load cart from localStorage when the page is loaded
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart'); // Get cart data from localStorage
  if (storedCart) {
    cart = JSON.parse(storedCart); // If there's a saved cart, parse it back to an array
    renderCart(); // Re-render the cart from the saved data
  }
}
loadCartFromLocalStorage(); // Call this to load the cart data from localStorage
