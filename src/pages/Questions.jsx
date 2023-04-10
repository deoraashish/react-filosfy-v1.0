import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { allQuestions } from '../api'
import Header from '../components/Header'

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const callNow = async () => {
            try {
                const { data } = await allQuestions();
                setQuestions(data)
                console.log(data)
            } catch (err) {
                toast.error(err.message)
                return;
            }
        }
        callNow();
    }, [])

    return (
        <>
            {/* <!-- ===================== header ==================== --> */}
            <Header />
            {/* <!-- ================================================= --> */}
            {/* <!-- ===================== Quiestions ================= --> */}
            <section className="m-100">
                <div className="container">
                    {/* <!-- ---------- Question ------------ --> */}
                    {
                        questions.map(item => {
                            return (
                                <div className="question-main p-3 my-3">
                                    <div className="d-flex mb-3 mb-lg-4 flex-wrap">
                                        {
                                            item.tags.map(item2 => {
                                                return <button className="button mx-2 my-1">{item2}</button>
                                            })
                                        }
                                    </div>
                                    <div className="d-flex align-items-end">
                                        <h2 className="display-3 qu-font w-100 question-background">{item.question}</h2>
                                        <Link to={`/question/${item._id}`} className="read">
                                            <img src="/images/read.png" alt="read" className="img-fluid read" />
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <!-- --------------------------------------- --> */}
                </div>
            </section>
        </>
    )
}

export default Questions