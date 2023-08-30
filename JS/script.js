const loadPhones = async (searchText=5, isShowAll) => {
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
                    <button type="button" onclick="showModalCont()" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 mt-2">Show Details</button>
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

    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    console.log(data);

    const modalContainer = document.getElementById('modal-container');

    const dialog = document.createElement('dialog');
  
    dialog.innerHTML = `
      <div class="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
    
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
  
            <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 class="text-3xl font-semibold">${data.phone_name}</h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" data-modal-hide="showDetailsModal">
                <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
              </button>
            </div>

            <div class="relative p-6 flex-auto">
              <p>Modal content goes here.</p>
            </div>

            <div class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1" type="button" data-modal-hide="showDetailsModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  
    modalContainer.appendChild(dialog);
  
    dialog.showModal();

    const closeButton = document.querySelectorAll('[data-modal-hide="showDetailsModal"]');
    closeButton.forEach((button) => {
      button.addEventListener('click', () => {
        dialog.close();
      });
    });
  };
  


loadPhones();