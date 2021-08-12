import { getRequests } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

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