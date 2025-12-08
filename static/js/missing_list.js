const uploadsRow = document.getElementById('my-uploads-row');


//result data (to be replaced with server response)
// if the sent form is not valid, the server will not respond with valid false and message 

document.addEventListener("DOMContentLoaded", async function(){
    //different rountE from the page, because this is GET
    const response = await fetch("/api/user_uploads");
    const data = await response.json();
    showUploads(data)
});

function showUploads(data){
    uploadsRow.innerHTML = "";
    data.forEach(person => {
        const card = document.createElement("div")
        card.classList.add("card", "border-0", "p-0");
        
        card.innerHTML =
            `<img src="${person.image_url}" class="card-img-top" alt="uploaded person" style="height:150px; object-fit:cover">
            <div class="card-body text-center d-flex flex-column">
                <h6 class="card-title m-0">${person.name}</h6>
                <div class="${person.match? 'status-match' : 'status-noMatch' }"> 
                    الحالة: ${person.match?' تطابق':'لا تطابق'} 
                </div>
                <div class="row d-flex justify-content-center g-1">
                    ${person.match 
                        ? `<div class="col-6">
                        <button class="btn btn-success m-0 p-1 w-100" onclick="showMatchDetails(${person.match_id})">
                            تفاصيل
                        </button>
                        </div>` 
                        : ''}
                    <div class="${person.match? 'col-6':'col-10'}">
                        <button class="btn btn-danger m-0 p-1 w-100" onclick=deletePerson(${person.id})>
                        حذف</button>
                    </div>
                </div>
            </div>`
        uploadsRow.appendChild(card);
    });
}

let selectedPersonId = null;

function deletePerson(id) {
    selectedPersonId = id;
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.show();
}

document.getElementById("confirmDeleteBtn").addEventListener("click", async function() {
    if (!selectedPersonId) return;
    //const response = await fetch(`/api/delete/${selectedPersonId}`, { method: "DELETE" });
    
    //if () {
    //}
});

async function showMatchDetails(matchId) {
    if (!matchId) return; 
    console.log(`/api/get_match/${matchId}`)
    try{
        const response = await fetch(`/api/get_match/${matchId}`);
        const match = await response.json();
        document.getElementById('modal-result-image').src = match.image_url;
        document.getElementById('modal-percent').textContent = match.percent + "%";
        document.getElementById('modal-result-name').textContent = match.name;
        document.getElementById('modal-result-age').textContent = match.age;
        document.getElementById('modal-result-sex').textContent = match.sex;
        document.getElementById('modal-result-condition').textContent = match.condition;
        document.getElementById('modal-result-dateOfFounding').textContent = match.dateOfFounding;
        document.getElementById('modal-result-findingEntity').textContent = match.findingEntity;
        document.getElementById('modal-result-place').textContent = match.location;
        document.getElementById('modal-result-contact').textContent = match.contact + ' او ' +match.contact2;
        
        const matchModal = new bootstrap.Modal(document.getElementById('matchModal'));
        matchModal.show();
    } catch(error) {
        console.log(error)
    }
}
