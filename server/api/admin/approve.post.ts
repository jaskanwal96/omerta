import fs from 'node:fs'
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id, action } = body // action: 'approve' | 'reject'

    const pendingPath = path.resolve(process.cwd(), 'server/data/pending_members.json')
    const peoplePath = path.resolve(process.cwd(), 'server/data/people.json')
    const positionsPath = path.resolve(process.cwd(), 'server/data/positions.json')

    let pending = []
    try {
        pending = JSON.parse(fs.readFileSync(pendingPath, 'utf-8'))
    } catch (e) { }

    const memberIndex = pending.findIndex((m: any) => m.id === id)

    if (memberIndex === -1) {
        throw createError({ statusCode: 404, statusMessage: 'Member not found' })
    }

    const member = pending[memberIndex]

    // Remove from pending
    pending.splice(memberIndex, 1)
    fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2))

    if (action === 'approve') {
        let people = []
        let positions = []
        try {
            people = JSON.parse(fs.readFileSync(peoplePath, 'utf-8'))
            positions = JSON.parse(fs.readFileSync(positionsPath, 'utf-8'))
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
        if (positions.find(p => p.id === newPosition.id)) {
            newPosition.id += '_' + uuidv4().substring(0, 4)
        }

        positions.push(newPosition)

        fs.writeFileSync(peoplePath, JSON.stringify(people, null, 2))
        fs.writeFileSync(positionsPath, JSON.stringify(positions, null, 2))
    }

    return { success: true }
})
