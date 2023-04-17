

const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1]; //Birinci index yani ikinci card-boy seçmiş oluyoruz.
const clear = document.getElementById("clear-cars");




// UI Objesini Başlatma

const ui = new UI();

const storage = new Storage(); //Storage'a ekleme yapma

// Tüm Eventleri Yükleme

eventListeners();


function eventListeners() {
    form.addEventListener("submit", addCar);
    //Sayfa Yüklendiğinde Çalışacak 
    document.addEventListener("DOMContentLoaded", function(){
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });

    cardbody.addEventListener("click", deleteCar);
    clear.addEventListener("click", clearAllCars);
}

function addCar(e) {

    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;


    if (title === "" || price === "" || url === "") {

        ui.displayMessages("Tüm alanları doldurun!", "danger")

    }

    else {
        //yeni araç
        const newCar = new Car(title, price, url);

        ui.addCarToUI(newCar); //Arayüze araç ekleme  

        storage.addCarToStorage(newCar);

        ui.displayMessages("Araç başarıyla eklendi", "success");
        e.preventDefault();
    }

    ui.clearInputs(titleElement, urlElement, priceElement);
        //Elementi eklemenin ardından Input alanlarının boşalması için.

}

function deleteCar(e){

    if(e.target.id ==="delete-car"){
        ui.deleteCarFromUI(e.target);

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Silme işlemi başarıyla gerçekleşti!", "success");

    }

}

function clearAllCars(){

    if(confirm("Tüm araçlar silinecek. Emin misiniz?")){
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
    }

}

