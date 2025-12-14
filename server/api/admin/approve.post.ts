import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id, action } = body // action: 'approve' | 'reject'

    const pendingPath = path.resolve(process.cwd(), 'server/data/pending_members.json')
    const membersPath = path.resolve(process.cwd(), 'server/data/members.json')

    let pending = JSON.parse(fs.readFileSync(pendingPath, 'utf-8'))
    const memberIndex = pending.findIndex((m: any) => m.id === id)

    if (memberIndex === -1) {
        throw createError({ statusCode: 404, statusMessage: 'Member not found' })
    }

    const member = pending[memberIndex]

    // Remove from pending
    pending.splice(memberIndex, 1)
    fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2))

    if (action === 'approve') {
        const members = JSON.parse(fs.readFileSync(membersPath, 'utf-8'))
        member.status = 'approved'
        delete member.submittedAt // optional cleanup
        members.push(member)
        fs.writeFileSync(membersPath, JSON.stringify(members, null, 2))
    }

    return { success: true }
})
