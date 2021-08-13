import {mainContainer} from "./ServiceForm.js"
import {render} from "./main.js"

export const applicationState = {
    requests: [],
    plumbers: [],
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumbers) => {
                applicationState.plumbers = plumbers
            }
        )
}

export const getRequests = () => {
    const requestArray = applicationState.requests.map(request => ({...request}))
    return requestArray
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

//Get the object you want that is incomplete.
//Set isComplete to true.
//Return the object.

// export const completeRequest = (id) => {
//     return fetch(`${API}/requests/${id}`), {
//          method: "PUT",
//          headers: {
//              "Content-type": "application/json"
//          },
//          body: JSON.stringify()

//          }
//         }
//         .then(
//             () => {
//                 mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
//             }
//         )
// }

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
