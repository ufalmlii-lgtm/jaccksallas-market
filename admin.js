
const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

let products = JSON.parse(
  localStorage.getItem("jaccksallas_products") || "[]"
);

let editingId = null;

function saveData() {
  localStorage.setItem(
    "jaccksallas_products",
    JSON.stringify(products)
  );
}

function renderProducts() {
  productList.innerHTML = "";

  document.getElementById("totalProducts").textContent =
    "Total produk: " + products.length;

  products.forEach(product => {
    const item = document.createElement("div");
    item.className = "admin-product";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    const description = document.createElement("p");

    title.textContent = product.name;
    description.textContent =
      "Rp " + Number(product.price).toLocaleString("id-ID");

    info.append(title, description);

    const actions = document.createElement("div");
    actions.className = "admin-actions";

    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.className = "edit-btn";
    edit.addEventListener("click", () => editProduct(product.id));

    const remove = document.createElement("button");
    remove.textContent = "Hapus";
    remove.className = "delete-btn";
    remove.addEventListener("click", () => deleteProduct(product.id));

    actions.append(edit, remove);
    item.append(info, actions);
    productList.appendChild(item);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const data = {
    id: editingId || Date.now(),
    name: document.getElementById("name").value.trim(),
    category: document.getElementById("category").value,
    price: Number(document.getElementById("price").value),
    description: document.getElementById("description").value.trim()
  };

  if (!data.name || !data.description || data.price < 0) {
    alert("Periksa kembali data produk.");
    return;
  }

  if (editingId !== null) {
    products = products.map(product =>
      product.id === editingId ? data : product
    );
  } else {
    products.push(data);
  }

  saveData();
  resetForm();
  renderProducts();

  alert("Produk berhasil disimpan.");
});

function editProduct(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  editingId = id;

  document.getElementById("name").value = product.name;
  document.getElementById("category").value = product.category;
  document.getElementById("price").value = product.price;
  document.getElementById("description").value =
    product.description;

  document.getElementById("formTitle").textContent = "Edit Produk";
  document.getElementById("saveBtn").textContent = "Simpan Perubahan";
  document.getElementById("cancelBtn").style.display = "inline-block";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteProduct(id) {
  if (!confirm("Hapus produk ini?")) return;

  products = products.filter(item => item.id !== id);

  saveData();
  renderProducts();

  if (editingId === id) resetForm();
}

function resetForm() {
  editingId = null;
  form.reset();

  document.getElementById("formTitle").textContent = "Tambah Produk";
  document.getElementById("saveBtn").textContent = "Simpan Produk";
  document.getElementById("cancelBtn").style.display = "none";
}

document.getElementById("cancelBtn").addEventListener(
  "click", resetForm
);

renderProducts();
      
