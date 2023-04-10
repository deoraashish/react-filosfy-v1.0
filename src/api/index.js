import axios from 'axios';

const api = axios.create({
    baseURL:"https://tender-twill-bass.cyclic.app",
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