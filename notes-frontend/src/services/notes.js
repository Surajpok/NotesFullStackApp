import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    // const nonExisting = {
    //     id: 10000,
    //     content: 'This note is not saved to server',
    //     important: true,
    // }
    return await response.data

}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }