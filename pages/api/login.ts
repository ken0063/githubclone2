import  axios  from 'axios';
import { handleApiErrors } from '../../lib/utils';
export const login = async (code: string) => {
  return await 
    axios.post(`https://9uj0ihoex6.execute-api.eu-west-1.amazonaws.com/dev/auth`, {
      code
    })
    .catch((error) => {
      return handleApiErrors(error);
    });
};