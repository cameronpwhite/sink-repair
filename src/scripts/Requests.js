import { getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement)
            }
        </ul>
    `

    return html
}

export const convertRequestToListElement = (requestObject) => {
    return `<li>
                ${requestObject.description}
                <button class="request__delete"
                    id="request--${requestObject.id}">
                Delete
                </button>
            </li>`
}