import fs from 'node:fs'
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name || !body.familyId || !body.role) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields',
        })
    }

    const pendingPath = path.resolve(process.cwd(), 'server/data/pending_members.json')
    let pending = []
    try {
        pending = JSON.parse(fs.readFileSync(pendingPath, 'utf-8'))
    } catch (e) {
        // File might not exist or be empty
    }

    const newMember = {
        id: uuidv4(),
        ...body,
        status: 'pending',
        submittedAt: new Date().toISOString()
    }

    // ensure reportsTo is stored if present, undefined if not
    if (body.reportsTo) {
        newMember.reportsTo = body.reportsTo
    }

    pending.push(newMember)
    fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2))

    return { success: true, message: 'Member submitted for review' }
})
