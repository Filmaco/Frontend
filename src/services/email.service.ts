import axios from "axios";

export const sendEmail = async (emailData: any) => {
    try {
        const endpoint = 'https://formsubmit.co/laravicspereira@gmail.com';
        const response = await axios.post(endpoint, emailData);
        return response;
    }
    catch(error) {
        console.error('Erro ao enviar Email: ', error);
        throw error
        
    }
}