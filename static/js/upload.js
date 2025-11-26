const formMissing = document.getElementById("form-missing")
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-image");
const imgView = document.getElementById("img-view");
const errorMessage = document.getElementById("errorMessage");

inputFile.addEventListener('change', function (){
    let img = inputFile.files[0];
    let imgLink = URL.createObjectURL(img);
    imgView.style.backgroundImage = `url(${imgLink})`
    imgView.textContent = "";   
});

let data = {
    "match": true,
    "image_path": 'static/founds/sample.jpg',
    "name": "Ahmed Mohamed",
    "orgnization name": "Red Crescent",
    "orgnization location": "Cairo, Egypt",
    "contact": "+201234567890"
};

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
        //const data = await response.json();
    }
});

