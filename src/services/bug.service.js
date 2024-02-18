import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/' :
    '//localhost:5175/api/'

const BASE_BUG_URL = BASE_URL + 'bug/'

export const bugService = {
    query,
    getById,
    remove,
    save,
    getDefaultSort,
    getDefaultFilter
}

async function query(sort, filterBy) {

    const { severity, minSeverity, txt, pageIdx } = filterBy
    const { sortBy, sortDir } = sort
    const params = { severity, minSeverity, txt, sortBy, sortDir, pageIdx }

    try {
        const { data: bugs, status} = await axios.get(BASE_BUG_URL, { params })
        
        return bugs
    } catch(err) {
        console.log("Had problems getting bugs")
        throw err
    }
    //http://127.0.0.1:5175/api/bug/?severity=&txt=d
    //http://127.0.0.1:5175/api/bug/?severity-1&txt
}

async function getById(bugId) {
    try {
        const { data: bug, status} = await axios.get(BASE_BUG_URL + bugId)
        return bug
    } catch(err) {
        console.log(`Had problems getting bug ${bugId}`)
        throw err
    }
}

async function remove(bugId) {
    await axios.delete(BASE_BUG_URL + bugId)

    // await fetch({method: 'DELETE', url})
}

async function save(bugToSave) {
    bugToSave._id = bugToSave._id || ''

    const method = bugToSave._id ? 'put' : 'post'
    const { data: savedBug, status} = await axios[method](BASE_BUG_URL, bugToSave)
    return savedBug
}

function getDefaultSort() {
    return {
        sortBy: '',
        sortDir: 1
    }
}

function getDefaultFilter() {
    return {
        severity: -1,
        minSeverity: -1,
        txt: '',
        labels: [],
        pageIdx: undefined
    }
}