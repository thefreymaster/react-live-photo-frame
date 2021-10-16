import axios from "axios"

export const changeView = async (view: string) => {
    await axios.post(`/api/change/${view}`);
}

export const getVideosList = () => axios.get('/api/videos/list').then(res => res.data);