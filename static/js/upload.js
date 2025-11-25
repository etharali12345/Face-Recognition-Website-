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

formMissing.addEventListener("submit", async (event) => {
    event.preventDefault();
    if(!formMissing.checkValidity()){
        event.stopPropagation();
        errorMessage.hidden = false;
    } else {
        const formData = new FormData(formMissing);
        const response = await fetch('/upload_missing', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
    }
});

