import axios from 'axios';
//erişileiblir olması için export ekledik.
export const signup = (body) =>{
    return axios.post('/api/1.0/users',body)
}

