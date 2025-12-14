import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const familiesPath = path.resolve(process.cwd(), 'server/data/families.json')
    const peoplePath = path.resolve(process.cwd(), 'server/data/people.json')
    const positionsPath = path.resolve(process.cwd(), 'server/data/positions.json')

    const families = JSON.parse(fs.readFileSync(familiesPath, 'utf-8'))
    let people = []
    let positions = []

    try {
        people = JSON.parse(fs.readFileSync(peoplePath, 'utf-8'))
        positions = JSON.parse(fs.readFileSync(positionsPath, 'utf-8'))
    } catch (e) {
        // fallback if files empty
    }

    // Join Data
    const data = families.map((family: any) => {

        // Find all positions for this family
        const familyPositions = positions.filter((p: any) => p.familyId === family.id)

        // Map positions to "member" objects (combining Person + Position data)
        const members = familyPositions.map((pos: any) => {
            const person = people.find((p: any) => p.id === pos.personId) || {}
            return {
                id: pos.id, // Use Position ID as the unique key for the tree/list
                personId: pos.personId,
                name: person.name || 'Unknown',
                imageUrl: person.imageUrl,
                role: pos.role,
                yearsActive: `${pos.startYear || '?'} - ${pos.endYear || 'Present'}`,
                famousFor: `Active during ${pos.startYear}-${pos.endYear}`, // generic filler or add to schema later
                reportsTo: pos.reportsTo, // Crucial for tree
                familyId: family.id
            }
        })

        return {
            ...family,
            members
        }
    })

    return data
})
