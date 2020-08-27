import axios from 'axios'
import { BASE_URL } from '../variables'

export default class StoreService {
    async loadStore(latitude: any, longitude: any) {
        return await axios.get(`${BASE_URL}/stores`, { params: { latitude, longitude } })
    }

    async loadCategory(latitude: any, longitude: any, query: string) {
        return await axios.get(`${BASE_URL}/stores/description`, { params: { latitude, longitude, query } })
    }
}