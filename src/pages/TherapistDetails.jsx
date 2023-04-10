import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { therapistQuestions, addLike } from '../api'
import Header from '../components/Header'

const TherapistDetails = () => {
    
    const likeAns = async (ansid) => {
        const { data } = await addLike(ansid);
        setChangeLike(Math.random());
        showRedLikeButton(false);
    }

    const [therapist, setTherapist] = useState({})
    const [questions, setQuestions] = useState([])
    const [changeLike, setChangeLike] = useState(0)
    const [isActive, setIsActive] = useState(false);
    const [showNormalLikeButton, showRedLikeButton] = useState(true);
    const { id } = useParams();
    const imageUrl = process.env.REACT_APP_IMAGE_URL
    useEffect(() => {
        const callNow = async () => {
            const { data } = await therapistQuestions(id);
            setTherapist(data.therapist)
            setQuestions(data.questions)
        }
        callNow();
    }, [changeLike])

    return (
        <>
            {/* <!-- ===================== header ==================== --> */}
            <Header />
            {/* <!-- ================================================= --> */}
            {/* <!-- ================== Therapists ================= --> */}
            <section className="m-100">
                <div className="container">
                    <Link to={`/therapists`} className="button dark-btn" style={{ 'textDecoration': "none" }}>Back</Link>
                    <div className="row align-items-center">
                        {/* <!-- ----------- Therapist ---------- --> */}
                        <div className="col-lg-6 col-md-8 col-sm-10 my-3" style={{ 'cursor': "pointer" }} >
                            <div className="t-container">
                                <div className="d-flex flex-column align-items-end">
                                    <h2 className="t-name qu-font display-5 ">{therapist.name}</h2>
                                    <div className="t-image">
                                        <img src={`${imageUrl}${therapist.profileImage}`} alt="t-image" className="img-fluid" />
                                    </div>
                                    <ul className="t-details d-flex flex-column align-items-end">
                                        <li>
                                            <div className="d-flex align-items-start">
                                                <div className="t-title sarif purple text-end">QUALIFICATION</div>
                                                <div className="t-desc sarif">{therapist.qualification}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex align-items-start">
                                                <div className="t-title sarif yellow text-end">Experience</div>
                                                <div className="t-desc sarif">{therapist.experience}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex align-items-start">
                                                <div className="t-title sarif pink text-end">City</div>
                                                <div className="t-desc sarif">{therapist.city}</div>
                                            </div>
                                        </li>
                                        { therapist.age != null && therapist.age > 0 ?
                                        <li>
                                            <div className="d-flex align-items-start">
                                                <div className="t-title sarif cyan text-end">age</div>
                                                <div className="t-desc sarif">{therapist.age} Years</div>
                                            </div>
                                        </li> : "" }
                                        { therapist.fee != null && therapist.fee.length > 0 ? 
                                        <li>
                                            <div className="d-flex align-items-start">
                                                <div className="t-title sarif gray text-end">Fee</div>
                                                <div className="t-desc sarif">INR {therapist.fee} per one hour session</div>
                                            </div>
                                        </li> : ""}
                                        <li>
                                            <div className="d-flex align-items-start">
                                                <div className="t-title sarif green text-end">LANGUAGES</div>
                                                <div className="t-desc sarif d-flex">
                                                    {
                                                        therapist.languages && therapist.languages.map(item => {
                                                            return <div className="language-btn mx-2 ms-0">{item}</div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="devider"></div>
                                    <div className="t-desc sarif">
                                       { therapist.email != null && therapist.email.length > 0 ? <span>Email: {therapist.email}</span> : "" }
                                       { therapist.phone != null && therapist.phone.length > 0 ? <span><br />Phone: {therapist.phone}</span> : "" }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- -------------------------------- --> */}
                        <div className="col-lg-6 col-md-8 col-sm-10 h-100">
                            <ul className="t-question-list">
                                {/* <!-- ------------------- Single Question ----------------- --> */}
                                {
                                    questions.map((item, index) => {
                                        const no = index + 1
                                        const number = no.toString().length < 2 ? `0${no}` : `${no}`
                                        return (
                                            <li className="mb-3">
                                                <div className="d-flex align-items-start">
                                                    <h3 className="qu-font t-question-number display-5 me-3">{number}</h3>
                                                    <div className="position-relative align-items-end t-question w-100">
                                                        <h2 className="qu-font question-background">{item.question} <img src="/images/read_down.png" alt="read"className="ms-auto read-img mb-2" onClick={() => setIsActive(!isActive)} /></h2>
                                                        {
                                                            isActive &&
                                                            <div>
                                                                <p className="sarif">{item.answers[0].answer}</p>
                                                                <div className='answer-with-likes'>
                                                                    <div className='mb-2'>
                                                                        {showNormalLikeButton && <img src="/images/like.svg" alt="like" className="img-fluid" onClick={e => likeAns(item.answers[0]._id)} style={{ 'cursor': "pointer" }} />}
                                                                        {!showNormalLikeButton && <img src="/images/liked-red-button.svg" alt="like" className="img-fluid" style={{ 'cursor': "pointer" }} />}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="sarif ms-3 mb-0 mt-2">{item.answers[0].like}</h4>
                                                                    </div>
                                                                </div> 
                                                            </div> 
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                {/* <!-- ----------------------------------------------------- --> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ================================================== --> */}
        </>
    )
}

export default TherapistDetails