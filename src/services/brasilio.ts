import config from '../config/defaults';
import log from '../logger';
import axios from 'axios';

const consultBrasilIo = async (cnpj: string, url: string) => {
    
    const result  = await axios.get(url+cnpj, {
        headers: {
            'Authorization': `token ${config.brasilio_token}`
        }
    })
    .then((response) => {
        const { data } = response
        return data.results;
    })
    .catch((error) => {
        log.info(error)
        return { message: error }
    }); 
    return result;
};

export default {
    consultBrasilIo
};