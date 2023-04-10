import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="sticky-top">
            <div className="container">
                <div className="header">
                    <div className="d-flex py-3 justify-content-between align-items-center">
                        <Link to={'/'} className="text-dark" style={{ 'textDecoration': "none" }}>
                            <h2 className="logo display-5 mb-0">filosfy</h2>
                        </Link>
                        <div className="d-flex align-items-center ">
                            <div className="d-flex flex-column flex-sm-row">
                                <Link to={'/therapists'}>
                                    <button className="button mx-2 my-1">THERAPISTS</button>
                                </Link>
                                <Link to={'/questions'}>
                                    <button className="button mx-2 my-1">QUESTIONS</button>
                                </Link>
                            </div>
                            <a href="https://www.instagram.com/filosfy" target="_blank" className="ms-2" rel="noreferrer">
                                <img src="/images/insta.png" alt="insta" className="img-fluid" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header