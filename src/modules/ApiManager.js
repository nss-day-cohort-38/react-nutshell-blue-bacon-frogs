const apiURL = "http://localhost:5002/";

// http://localhost:5002/events?userId=2

const API = {
    get(str, userId) {
        return fetch(apiURL + str + "?userId=" + userId).then(entries => entries.json());
    },
    save(objToSave, str) {
        return fetch(apiURL + str, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objToSave)
        })
    },
    delete(objToDeleteId, str) {
        return fetch(`${apiURL}${str}/${objToDeleteId}`, {
            method: "DELETE"
        });
    },
    edit(objToEditId, str) {
        return fetch(apiURL + str + "/" + objToEditId).then(entry => entry.json());
    },
    update(objToEdit, str) {
        return fetch(`${apiURL}${str}/${objToEdit.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objToEdit)
        });
    }
}
export default API;