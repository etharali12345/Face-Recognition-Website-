const uploadsRow = document.getElementById('my-uploads-row');

// this how the JSON file that comes from backend looked like
/*uploads = [
    {
        "person_id": 12,
        "name": "احمد محمد احمد",
        "image_url": "static/uploads/hostage1.jpg",
        "match": False,
        "match_percentage": 89
    },
    {
        "person_id": 21,
        "name": "خالد مزمل محمد",
        "image_url": "static/uploads/hostage2.jpg",
        "match": True
    }
] */

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
        card.classList.add("card", "shadow", "border-0", "p-0");
        card.style.setProperty("width", "16rem");
        
        let statusBtn;

        card.innerHTML =
            `<img src="${person.image_url}" class="card-img-top" alt="uploaded person" style="height:180px; object-fit:cover">
            <div class="card-body text-center">
                <h5 class="card-title">${person.name}</h5>
                <div class="${person.match === true? 'btn-match' : 'btn-noMatch' } rounded mb-2" > 
                    الحالة: ${person.match === true?' تطابق':'لا تطابق'} 
                </div>
                <div class="d-grid">
                    <button onclick=deletePerson(${person.person_id}) class="btn btn-danger">حذف</button>
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


