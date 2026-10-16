import axios from "axios"

export const service = axios.create({
    baseURL: 'https://ai-smart-food-waste-managemet-systeme.onrender.com',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
});