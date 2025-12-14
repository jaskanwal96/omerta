
import { v4 as uuidv4 } from 'uuid'
import pendingData from '../../data/pending_members.json'
import peopleData from '../../data/people.json'
import positionsData from '../../data/positions.json'

const pending = pendingData as any[]
const people = peopleData as any[]
const positions = positionsData as any[]

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id, action } = body // action: 'approve' | 'reject'

    const memberIndex = pending.findIndex((m: any) => m.id === id)

    if (memberIndex === -1) {
        throw createError({ statusCode: 404, statusMessage: 'Member not found' })
    }

    const member = pending[memberIndex]

    // Remove from pending (In-Memory Only)
    pending.splice(memberIndex, 1)

    if (action === 'approve') {
        // 1. Create Person Entry
        const personId = member.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Math.floor(Math.random() * 1000)

        const newPerson = {
            id: personId,
            name: member.name,
            birthYear: parseInt(member.birthYear) || null,
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
    }

    return { success: true }
})
