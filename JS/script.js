const loadPhones = async (searchText) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones);
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById("phones-container")

    phonesContainer.innerText = "";
const showAll = document.getElementById("showAll");
    if (phones.length > 12) {
        showAll.classList.remove("hidden");
    } else {
        showAll.classList.add("hidden");
    }

    phones = phones.slice(0, 12);
    phones.forEach(phone => { 
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
                        <button type="button"
                            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 mt-2">Show Details</button>
                    </div>
                </div>
    `
    phonesContainer.appendChild(phoneDiv);
    })
}

const searchBtn = () => {
    console.log("clicked");
    const searchField = document.getElementById("default-search");
    const searchText = searchField.value;
    loadPhones(searchText);
    console.log(searchText);
}