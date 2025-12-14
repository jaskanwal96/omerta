
export default defineEventHandler(async (event) => {
    // Use Nitro Storage
    const storage = useStorage('db')
    try {
        const pending = (await storage.getItem('pending_members.json')) || []
        return pending
    } catch (e) {
        return []
    }
})
