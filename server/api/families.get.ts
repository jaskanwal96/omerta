
export default defineEventHandler(async (event) => {
    // Use Nitro Storage
    const storage = useStorage('db')

    // Retrieve data asynchronously
    const families = (await storage.getItem('families.json')) as any[] || []
    let people: any[] = []
    let positions: any[] = []

    try {
        people = (await storage.getItem('people.json')) as any[] || []
        positions = (await storage.getItem('positions.json')) as any[] || []
    } catch (e) {
        // fallback if keys missing
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
