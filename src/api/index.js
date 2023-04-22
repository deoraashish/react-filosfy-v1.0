import axios from 'axios';

const api = axios.create({
    baseURL:"http://3.110.197.170:5001",
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

export const allQuestions = () => api.get('/questions');
export const allTherapists = () => api.get('/therapists');
export const therapistQuestions = (id) => api.get(`/questions/${id}`);
export const allAnswers = (id) => api.get(`/answers/${id}`)
export const singleAnswer = (id) => api.get(`/singleAnswer/${id}`)
export const addLike = (id) => api.get(`/addLikes/${id}`)