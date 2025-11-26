const formMissing = document.getElementById("form-missing")
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-image");
const imgView = document.getElementById("img-view");
const errorMessage = document.getElementById("errorMessage");

const resultColumn = document.getElementById("result-column");
const circle = document.querySelector('.percent_circle');

inputFile.addEventListener('change', function (){
    let img = inputFile.files[0];
    let imgLink = URL.createObjectURL(img);
    imgView.style.backgroundImage = `url(${imgLink})`
    imgView.textContent = "";   
});

let data = {
    valid: true,
    match: true,
    image_path: 'static/founds/sample.jpg',
    percent: 70,
    name: "Ahmed Mohamed",
    orgnizationName: "Red Crescent",
    orgnizationLocation: "Cairo, Egypt",
    contact: "+201234567890"
};

let percent_counter = 0;

const interval = setInterval(() => {
    percent_counter++;
    circle.style.setProperty('--percent', percent_counter);
    if (percent_counter >= data.percent) clearInterval(interval);
}, 15);


formMissing.addEventListener("submit", async (event) => {
    event.preventDefault();
    if(!formMissing.checkValidity()){
        event.stopPropagation();
        errorMessage.hidden = false;
    } else {
        errorMessage.hidden = true;
        const formData = new FormData(formMissing);
        const response = await fetch('/upload_missing', {
            method: 'POST',
            body: formData
        });
        //change data2 to data1
        const data2 = await response.json();   
        if(data.match){
            showResult(data);
        }     
    }
});

function showResult(data){
    resultColumn.hidden = false;
    return;
}