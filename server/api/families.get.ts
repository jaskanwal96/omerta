import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const familiesPath = path.resolve(process.cwd(), 'server/data/families.json')
    const membersPath = path.resolve(process.cwd(), 'server/data/members.json')

    const families = JSON.parse(fs.readFileSync(familiesPath, 'utf-8'))
    const members = JSON.parse(fs.readFileSync(membersPath, 'utf-8'))

    // Attach members to families
    const data = families.map((family: any) => {
        return {
            ...family,
            members: members.filter((m: any) => m.familyId === family.id && m.status === 'approved')
        }
    })

    return data
})
