
import familiesData from '../data/families.json'
import peopleData from '../data/people.json'
import positionsData from '../data/positions.json'

// Direct imports result in build-time bundling
const families = familiesData as any[]
const people = peopleData as any[]
const positions = positionsData as any[]

export default defineEventHandler(async (event) => {
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
                famousFor: `Active during ${pos.startYear}-${pos.endYear}`,
                reportsTo: pos.reportsTo,
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
