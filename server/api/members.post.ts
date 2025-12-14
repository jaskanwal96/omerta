import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name || !body.familyId || !body.role) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields',
        })
    }

    // Use Nitro Storage
    const storage = useStorage('db')
    const pending = (await storage.getItem('pending_members.json')) as any[] || []

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
    await storage.setItem('pending_members.json', pending)

    return { success: true, message: 'Member submitted for review' }
})
