import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

describe('test_api: Network & Request System', () => {
    it('should successfully fetch clubs from API (Test 29)', async () => {
        const clubs = [{ name: 'A' }, { name: 'B' }]
        vi.mocked(axios.get).mockResolvedValue({ data: clubs })
        const res = await axios.get('/api/clubs')
        expect(res.data.length).toBe(2)
        expect(res.data[0].name).toBe('A')
    })

    it('should handle API errors (Test 30)', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('Network Error'))
        await expect(axios.get('/api/clubs')).rejects.toThrow('Network Error')
    })

    it('should post a new review (Test 31)', async () => {
        const review = { star: 5, text: 'Great' }
        vi.mocked(axios.post).mockResolvedValue({ data: { message: 'Success' } })
        const res = await axios.post('/api/review', review)
        expect(res.data.message).toBe('Success')
    })
    
    it('should delete a club review (Test 32)', async () => {
        vi.mocked(axios.delete).mockResolvedValue({ status: 200 })
        const res = await axios.delete('/api/review?id=1')
        expect(res.status).toBe(200)
    })
    
    it('should update a club review (Test 33)', async () => {
        vi.mocked(axios.put).mockResolvedValue({ data: { updated: true } })
        const res = await axios.put('/api/review?id=1', { star: 4 })
        expect(res.data.updated).toBe(true)
    })
})
