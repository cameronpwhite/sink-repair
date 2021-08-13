import { getRequests } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { applicationState } from "./dataAccess.js"
import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

const findRequest = (requestId) => {
    const applicationRequests = applicationState.requests;
    
    const foundRequest = applicationRequests.find(
        (request) => {
                return requestId === request.id
            }
    )

    return foundRequest;
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            //Iterate through objects to find requestId.
                const foundRequest = findRequest(parseInt(requestId))
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            foundRequest.plumberId = plumberId
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

            sendRequest(foundRequest)

        }
    }
)

export const Requests = () => {
    const requests = getRequests()

    let html = `
    <section class="requestList">
        Description 
        Completed by
        <ul>
            ${requests.map(convertRequestToListElement)}
        </ul>
    </section>
    `
    return html
}

export const convertRequestToListElement = (requestObject) => {

    const plumbers = getPlumbers()

    return `<li>
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
        plumber => {
            return `<option value="${requestObject.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
    </select>

                ${requestObject.description}
                <button class="request__delete"
                 id="request--${requestObject.id}">
                Delete
                </button>
    </li>`
}