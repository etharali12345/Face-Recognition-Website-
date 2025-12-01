const formMissing = document.getElementById("form-missing")
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-image");
const imgView = document.getElementById("img-view");
const errorMessage = document.getElementById("errorMessage");
const resultColumn = document.getElementById("result-column");
const circle = document.querySelector('.percent_circle');
const percentHead = document.querySelector('.percent-head');
const resultImage = document.getElementById("result-image");
const resultPercent = document.getElementById("result-percent");
const resultName = document.getElementById("resutl-name");
const resultAge = document.getElementById("result-age");
const resultSex = document.getElementById("result-sex");
const resultCondition = document.getElementById("result-condition");
const resultDateOfFounding = document.getElementById("result-dateOfFounding");
const resultEntity = document.getElementById("result-findingEntity");
const resultPlace = document.getElementById("result-place");
const resultContact = document.getElementById("result-contact");
const noResultColumn = document.getElementById("noResult-column");

//result data (to be replaced with server response)
// if the sent form is not valid, the server will not respond with valid false and message 
let data = {
    valid: true,
    match: true,
    image_url: 'static/uploads/hostage1.jpg',
    percent: 70,
    name: "احمد محمد احمد",
    age: 35,
    sex: "ذكر",
    condition: "سليم",
    dateOfFounding: "2025/12/12",   
    findingEntity: "منظمة الهلال الاحمر فرع الشمالية",
    location: "الشمالية - وادي حلفا",
    contact: "002496564646",
    contact2: "0024965465656"
};

inputFile.addEventListener('change', function (){
    let img = inputFile.files[0];
    let imgLink = URL.createObjectURL(img);
    imgView.style.backgroundImage = `url(${imgLink})`
    imgView.textContent = "";   
});

formMissing.addEventListener("submit", async (event) => {
    event.preventDefault();
    if(!formMissing.checkValidity()){
        event.stopPropagation();
        errorMessage.hidden = false;
    } else {
        errorMessage.hidden = true;
        const formData = new FormData(formMissing);
        //POST method for the same page route
        const response = await fetch('/upload_missing', {
            method: 'POST',
            body: formData
        });

        //change data2 to data since the one is gonna be used
        const data2 = await response.json();   
        if(data.valid) {
            if(data.match){
                showMatch(data);
            } else {
                showNoMatch();
            }
        } else {
            errorMessage.hidden = false;
            errorMessage.textContent = "should be data.message error message from server";
        }   
    }
});

function showMatch(data){
    resultColumn.hidden = false;
    const offset = 25; 
    let scrollTop = resultColumn.getBoundingClientRect().top + window.scrollY;

    if (window.innerWidth > 700) {
        scrollTop -= offset;
    }

    window.scrollTo({
        top: scrollTop,
        behavior: "smooth"
    });

    percentHead.textContent = data.percent + "%";
    resultImage.style.backgroundImage = `url(${data.image_url})`;
    resultName.textContent = data.name;
    resultAge.textContent = data.age;
    resultSex.textContent = data.sex;
    resultCondition.textContent = data.condition;
    resultDateOfFounding.textContent = data.dateOfFounding;
    resultEntity.textContent = data.findingEntity;
    resultPlace.textContent = data.location;
    resultContact.textContent = data.contact + " او " + data.contact2;

    resultPercent.textContent = data.percent + "%";
    let percent_counter = 0;
    const interval = setInterval(() => {
        percent_counter++;
        circle.style.setProperty('--percent', percent_counter);
        if (percent_counter >= data.percent) clearInterval(interval);
    }, 20);
}

function showNoMatch(){
    noResultColumn.hidden = false;
    let offset = 25;
    let scrollTop = noResultColumn.getBoundingClientRect().top + window.scrollY ;
    if (window.innerWidth > 700) {
        scrollTop -= offset;
    }
    
    window.scrollTo({
        top: scrollTop,
        behavior: "smooth"
    });
}