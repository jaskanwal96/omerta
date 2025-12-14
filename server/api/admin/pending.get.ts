import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const pendingPath = path.resolve(process.cwd(), 'server/data/pending_members.json')
    try {
        const pending = JSON.parse(fs.readFileSync(pendingPath, 'utf-8'))
        return pending
    } catch (e) {
        return []
    }
})
