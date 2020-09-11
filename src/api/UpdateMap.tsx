import {API_URL, radius} from "../utils/constants";
import axios from 'axios';

export class UpdateMap {
    async renderNew(latitude, longitude) {
        const response = await axios.get(`${API_URL}radius=${radius}&sport=HOCKEY&latitude=${latitude}&longitude=${longitude}`);
        return response.data;
    }
}
