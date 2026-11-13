
const searchInput = document.getElementById("searchInput");
const productGrid = document.getElementById("productGrid");
const products = document.querySelectorAll(".product-card");
const filters = document.querySelectorAll(".filter");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "all";

function filterProducts() {
  const keyword = searchInput.value.toLowerCase();
  let visibleCount = 0;

  products.forEach(product => {
    const text = product.textContent.toLowerCase();
    const category = product.dataset.category;

    const matchesSearch = text.includes(keyword);
    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory;

    const visible = matchesSearch && matchesCategory;

    product.hidden = !visible;

    if (visible) visibleCount++;
  });

  emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterProducts);

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));

    button.classList.add("active");
    selectedCategory = button.dataset.category;

    filterProducts();
  });
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navMenu").classList.toggle("show");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("show");
  });
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");

document.querySelectorAll(".detail-btn").forEach(button => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.name;
    modal.hidden = false;
  });
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.hidden = true;
  }
});
  
