import Axios from 'axios';
//import { API_URL } from "@env";

export default Axios.create ({
    baseURL : 'https://alpha-server.eu-gb.mybluemix.net'
//    baseURL : API_URL
});
