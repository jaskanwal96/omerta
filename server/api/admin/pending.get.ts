
import pendingData from '../../data/pending_members.json'

const pending = pendingData as any[]

export default defineEventHandler(async (event) => {
    return pending
})
