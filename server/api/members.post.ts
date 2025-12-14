
import { v4 as uuidv4 } from 'uuid'
import pendingData from '../data/pending_members.json'

// Note: In serverless/Vercel, modifying this array only affects the current execution context
const pending = pendingData as any[]

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name || !body.familyId || !body.role) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields',
        })
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

    // In-memory update only
    pending.push(newMember)

    return { success: true, message: 'Member submitted for review' }
})
