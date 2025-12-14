import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id, action } = body // action: 'approve' | 'reject'

    // Use Nitro Storage
    const storage = useStorage('db')

    let pending: any[] = []
    try {
        pending = (await storage.getItem('pending_members.json')) as any[] || []
    } catch (e) { }

    const memberIndex = pending.findIndex((m: any) => m.id === id)

    if (memberIndex === -1) {
        throw createError({ statusCode: 404, statusMessage: 'Member not found' })
    }

    const member = pending[memberIndex]

    // Remove from pending
    pending.splice(memberIndex, 1)
    await storage.setItem('pending_members.json', pending)

    if (action === 'approve') {
        let people: any[] = []
        let positions: any[] = []
        try {
            people = (await storage.getItem('people.json')) as any[] || []
            positions = (await storage.getItem('positions.json')) as any[] || []
        } catch (e) { }

        // 1. Create Person Entry
        // Use a slug ID for the person (e.g. "john-gotti") or just uuid if user didn't allow slug input
        // Since we don't have a better slug in form, let's make one or use uuid
        const personId = member.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Math.floor(Math.random() * 1000)

        const newPerson = {
            id: personId,
            name: member.name,
            birthYear: parseInt(member.birthYear) || null, // Optional in form
            deathYear: null,
            imageUrl: member.imageUrl || null
        }
        people.push(newPerson)

        // 2. Create Position Entry
        const newPosition = {
            id: `${member.familyId}-${member.role.toLowerCase()}-${member.yearsActive || 'unknown'}`,
            personId: personId,
            familyId: member.familyId,
            role: member.role,
            startYear: parseInt(member.yearsActive?.split('-')[0]) || null,
            endYear: parseInt(member.yearsActive?.split('-')[1]) || null,
            reportsTo: member.reportsTo || null
        }

        // ensure unique ID for position just in case
        if (positions.find((p: any) => p.id === newPosition.id)) {
            newPosition.id += '_' + uuidv4().substring(0, 4)
        }

        positions.push(newPosition)

        await storage.setItem('people.json', people)
        await storage.setItem('positions.json', positions)
    }

    return { success: true }
})
