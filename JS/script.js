const loadPhones = async (searchText = 5, isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phonesContainer = document.getElementById("phones-container");

  phonesContainer.innerText = "";
  const showAll = document.getElementById("showAll");
  if (phones.length > 5 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 5);
  }

  phones.forEach((phone) => {
    console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList = `max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl`;
    phoneDiv.innerHTML = ` 
    <div class="rounded-t-lg bg-[#0d6efd0d] p-4">
    <a href="#"><img class="rounded-t-lg mx-auto" src='${phone.image}'/></a>
    </div>
                <div class="p-5"><a href="#"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">${phone.phone_name}</h5></a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">There are many variations of passages of available, but the majority have suffered</p>
                    <p class="text-center font-bold text-2xl"> 500$ </p>
                    <div class="flex justify-center">
                    <button type="button" onclick="showModalCont('${phone.slug}')" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 mt-2">Show Details</button>
                    </div>
                </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  loadingSpinner(false);
};

const searchBtn = (isShowAll) => {
  loadingSpinner(true);
  const searchField = document.getElementById("default-search");
  const searchText = searchField.value;
  loadPhones(searchText, isShowAll);
};

const loadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const showAllBtn = () => {
  searchBtn(true);
};

const showModalCont = async (id) => {
  console.log(id);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  console.log(data);

  const modalContainer = document.getElementById("modal-container");

  const dialog = document.createElement("dialog");

  dialog.innerHTML = `
      <div class="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
    
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
  
            <div class="p-5 border-b border-solid border-gray-300 rounded-t">
            <img class="rounded-t-lg mx-auto" src='${
              data.data?.image !== undefined
                ? data.data?.image
                : "image data not found"
            }'/> <br>
              <h3 class="text-3xl font-semibold text-left">${
                data.data?.name !== undefined
                  ? data.data?.name
                  : "name unavailable"
              }</h3>
              <p class="text-sm text-left">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              <h3 class="text-base font-semibold text-left">storage: <span class="font-normal"> ${
                data.data?.mainFeatures?.storage !== undefined
                  ? data.data?.mainFeatures?.storage
                  : "Empty Storages"
              }</span></h3>
              <h3 class="text-base font-semibold text-left">Display Size: <span class="font-normal">${
                data.data?.mainFeatures?.displaySize !== undefined
                  ? data.data?.mainFeatures?.displaySize
                  : "404 error"
              }</span></h3>
              <h3 class="text-base font-semibold text-left">Chipset: <span class="font-normal">${
                data.data?.mainFeatures?.chipSet !== undefined
                  ? data.data?.mainFeatures?.chipSet
                  : "Chipset is not assigned yet."
              }</span></h3>
              <h3 class="text-base font-semibold text-left">Memory: <span class="font-normal">${
                data.data?.mainFeatures?.memory !== undefined
                  ? data.data?.mainFeatures?.memory
                  : "No memory slot is here"
              }</span></h3>
              <h3 class="text-base font-semibold text-left"><span class="font-normal">Slug: ${
                data.data?.slug !== undefined ? data.data?.slug : "Slug error."
              }</span></h3>
              <h3 class="text-base font-semibold text-left">Release Date: <span class="font-normal">${
                data.data?.releaseDate !== undefined
                  ? data.data?.releaseDate
                  : "Didn't assigned yet."
              }</span></h3>
              <h3 class="text-base font-semibold text-left">Brand: <span class="font-normal">${
                data.data?.brand !== undefined ? data.data?.brand : "Not found"
              }</span></h3>
              <h3 class="text-base font-semibold text-left">GPS: <span class="font-normal">${
                data.data?.others?.GPS !== undefined
                  ? data.data?.others?.GPS
                  : "No GPS here"
              }</span></h3>

            </div>

            <div class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 mt-2" type="button" data-modal-hide="showDetailsModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

  modalContainer.appendChild(dialog);

  dialog.showModal();

  const closeButton = document.querySelectorAll(
    '[data-modal-hide="showDetailsModal"]'
  );
  closeButton.forEach((button) => {
    button.addEventListener("click", () => {
      dialog.close();
    });
  });
};

loadPhones();
