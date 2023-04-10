import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addLike, singleAnswer } from '../api';
import moment from 'moment';
import Header from '../components/Header';

const AnswerDetail = () => {
    const { id } = useParams();
    const [answer, setAnswer] = useState({})
    const [question, setQuestion] = useState({})
    const [therapist, setTherapist] = useState({})
    const [changeLike, setChangeLike] = useState(0)
    const [showNormalLikeButton, showRedLikeButton] = useState(true);
    const imageUrl = process.env.REACT_APP_IMAGE_URL;

    const likeAns = async (ansid) => {
        const { data } = await addLike(ansid);
        setChangeLike(Math.random());
        showRedLikeButton(false);
    }
    const createDate = (date) => {

        var longDateStr = moment(date, 'YYYY-MM-DD').format('D MMMM Y');
        return longDateStr; 
    }
    useEffect(() => {
        const callNow = async () => {
            const { data } = await singleAnswer(id)
            setAnswer(data)
            setQuestion(data.question)
            setTherapist(data.therapist)
        }
        callNow();
    }, [changeLike])
    return (
        <>
            {/* <!-- ===================== header ==================== --> */}
            <Header />
            {/* <!-- ================================================= --> */}
            {/* <!-- ===================== Quiestions ================= --> */}
            <section className="m-100">
                <div className="container">
                    {/* <!-- ---------- Question ------------ --> */}
                    <div className="question-main p-3 my-3">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex mb-3 mb-lg-4 flex-wrap">
                                {
                                    question.tags && question.tags.map(item => {
                                        return (
                                            <button className="button mx-2 ms-0 my-1">{item}</button>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <button className="button dark-btn">SHARE</button>
                            </div>
                        </div>
                        <div className="d-flex align-items-end">
                            <h2 className="display-3 qu-font question-background">{question.question}</h2>
                        </div>
                    </div>
                    {/* <!-- --------------------------------------- --> */}
                    {/* <!-- ---------- Answer ------------- --> */}
                    <div className="d-flex">
                        <div className="number display-2 qu-font mx-2">
                            01
                        </div>
                        <div className="ans-container my-3 w-100">
                            <div className="d-flex w-100 ans-structure">
                                <div className="ans-img">
                                    <img src={`${imageUrl}${therapist.profileImage}`} alt="image" className="img-fluid" />
                                </div>
                                <div className="ms-3 w-100">
                                    <div className="d-flex justify-content-center justify-content-md-between align-items-center flex-wrap">
                                        <h3 className="sarif fw-bold">{therapist.name}</h3>
                                        <h4 className="sarif text-muted date">{createDate(answer.createdAt)}</h4>
                                    </div>
                                    <h4 className="sarif lh-base text-center text-md-start">{
                                        answer.answer
                                    }</h4>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-3 align-items-center">
                                <div className="d-flex align-items-center">
                                    {/* <img src="/images/like.svg" alt="like" className="img-fluid" onClick={e => likeAns(answer._id)} style={{ 'cursor': "pointer" }} /> */}
                                    
                                    {showNormalLikeButton && <img src="/images/like.svg" alt="like" className="img-fluid" onClick={e => likeAns(answer._id)} style={{ 'cursor': "pointer" }} />}
                                    {!showNormalLikeButton && <img src="/images/liked-red-button.svg" alt="like" className="img-fluid" style={{ 'cursor': "pointer" }} />}
                                    <h4 className="sarif ms-2 mb-0">{answer.like}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- ------------------------------- --> */}
                    <div className="d-flex justify-content-center">
                        <Link to={`/question/${question._id}`} className="button dark-btn" style={{ 'textDecoration': "none" }}>Load More Answers</Link>
                    </div>
                </div>
            </section>
            {/* <!-- ================================================== --> */}
        </>
    )
}

export default AnswerDetail