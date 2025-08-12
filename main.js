var siteNameInput = document.querySelector("#siteName");
var siteUrlInput = document.querySelector("#siteUrl");
var displayItemInput = document.querySelector("#displayItem");
var msgAppear = document.querySelector("#msgAppear");

var listSite = [];

if (localStorage.getItem("lists")) {
  listSite = JSON.parse(localStorage.getItem("lists"));
  displayData();
}

function addSite() {
  if (validationName() && validationUrl()) {
    var box = {
      name: siteNameInput.value.trim(),
      url: siteUrlInput.value.trim(),
    };

    listSite.push(box);

    localStorage.setItem("lists", JSON.stringify(listSite));

    clearData();
    displayData();
  } else {
    msgAppear.classList.remove("d-none");
  }
}

function clearData() {
  siteNameInput.value = "";
  siteUrlInput.value = "";

  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function displayData() {
  var cartona = "";

  for (var i = 0; i < listSite.length; i++) {
    cartona += `
        <tr>
                <th scope="row">${i + 1}</th>
                <td><strong>${listSite[i].name}</strong></td>
                <td><button onclick="visitUrl('${listSite[i].url}')" class="btn btn-success"><i class="fa-regular fa-eye"></i> Visit</button></td>
                <td><button onclick="deleteItem(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
              </tr>
        `;
  }
  displayItemInput.innerHTML = cartona;
}

function deleteItem(index) {
  listSite.splice(index, 1);
  localStorage.setItem("lists", JSON.stringify(listSite));
  displayData();
}

function validationName() {
  var regex = /^([a-zA-Z0-9_\s]+)$/;
  var text = siteNameInput.value;

  if (regex.test(text)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");

    return true;
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");

    return false;
  }
}

function validationUrl() {
  var regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$/;
  var text = siteUrlInput.value;

  if (regex.test(text)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");

    return true;
  } else {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.add("is-invalid");

    return false;
  }
}

function closeItem() {
  msgAppear.classList.add("d-none");
}

function visitUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  window.location.href = url;

   
}
