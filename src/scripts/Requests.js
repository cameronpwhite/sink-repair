import { getRequests } from "./dataAccess.js"

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
    return `<li>${requestObject.description}</li>`
}