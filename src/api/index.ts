import axios from "axios"

export const changeView = async (view: string) => {
    await axios.post(`/api/change/${view}`);
}