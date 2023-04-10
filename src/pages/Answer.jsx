import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { addLike, allAnswers } from '../api';
import Header from '../components/Header';

const Answer = () => {
    const { id } = useParams();
    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState({})
    const [changeLike, setChangeLike] = useState(0)
    const [showNormalLikeButton, showRedLikeButton] = useState(true);
    const navigate = useNavigate();
    const imageUrl = process.env.REACT_APP_IMAGE_URL;

    const likeAns = async (ansid) => {
        const { data } = await addLike(ansid)
        setChangeLike(Math.random())
        showRedLikeButton(false);
    }

    const createDate = (date) => {

        var longDateStr = moment(date, 'YYYY-MM-DD').format('D MMMM Y');
        return longDateStr; 
    }
    useEffect(() => {
        const callNow = async () => {
            const { data } = await allAnswers(id);
            if (!data.question) {
                toast.error('Invalid Question')
                navigate('/');
            }
            setAnswers(data.answers)
            setQuestion(data.question)
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
                    <div className="px-3">
                        <Link to={'/questions'} className="button dark-btn" style={{ 'textDecoration': "none" }}>Back to all questions</Link>
                    </div>
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
                    {
                        answers.map((item, index) => {
                            const no = index + 1
                            const number = no.toString().length < 2 ? `0${no}` : `${no}`
                            return (
                                <>
                                    <div className="d-flex">
                                        <div className=" display-2 qu-font number mx-2">
                                            {number}
                                        </div>
                                        <div className="ans-container my-3 w-100">
                                            <div className="d-flex w-100 ans-structure">
                                                <div className="ans-img">
                                                    <img src={`${imageUrl}${item.therapist.profileImage}`} alt="image" className="img-fluid" />
                                                </div>
                                                <div className="ms-3 w-100">
                                                    <div className="d-flex justify-content-center justify-content-md-between align-items-center flex-wrap">
                                                        <h3 className="sarif fw-bold m-2 text-center">{item.therapist.name}</h3>
                                                        <h4 className="sarif text-muted date m-2 text-center">{createDate(item.createdAt)}</h4>
                                                    </div>
                                                    <h4 className="sarif lh-base text-center text-md-start">{
                                                        item.answer.slice(0, 330)
                                                    }
                                                        <Link to={`/answer/${item._id}`} className="button ms-3 readmore">
                                                            Read More
                                                        </Link>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between mt-3 align-items-center">
                                                <div className="d-flex align-items-center">
                                                    {/* <img src="/images/like.svg" alt="like" className="img-fluid" onClick={e => likeAns(item._id)} style={{ 'cursor': "pointer" }} /> */}
                                                    {showNormalLikeButton && <img src="/images/like.svg" alt="like" className="img-fluid" onClick={e => likeAns(item._id)} style={{ 'cursor': "pointer" }} />}
                                                    {!showNormalLikeButton && <img src="/images/liked-red-button.svg" alt="like" className="img-fluid" style={{ 'cursor': "pointer" }} />}
                                                    <h4 className="sarif ms-2 mb-0">{item.like}</h4>
                                                </div>
                                                <div>
                                                    <Link to={`/answer/${item._id}`}>
                                                        <img src="/images/share.svg" alt="share" className="img-fluid share" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    {/* <!-- ------------------------------- --> */}
                </div>
            </section>
            {/* <!-- ================================================== --> */}
        </>
    )
}

export default Answer