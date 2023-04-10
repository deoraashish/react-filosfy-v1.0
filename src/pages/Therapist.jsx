import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { allTherapists } from '../api';
import Header from '../components/Header';

const Therapist = () => {
  const [therapists, setTherapists] = useState([]);
  const navigate = useNavigate();
  const openTherpistDetails = (item) => {
    navigate(`/therapist/${item._id}`);
  };
  const imageUrl = process.env.REACT_APP_IMAGE_URL;
  useEffect(() => {
    const callNow = async () => {
      try {
        const { data } = await allTherapists();
        setTherapists(data);
        console.log(data);
      } catch (err) {
        toast.error(err.message);
        return;
      }
    };
    callNow();
  }, []);
  return (
    <>
      {/* <!-- ===================== header ==================== --> */}
      <Header />
      {/* <!-- ================================================= --> */}
      <section className="m-100">
        <div className="container">
          <div className="row">
            {/* <!-- ----------- Therapist ---------- --> */}
            {therapists.map((item) => {
              return (
                <div
                  className="col-lg-6 col-md-8 col-sm-10 my-3"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => openTherpistDetails(item)}
                >
                  <div className="t-container">
                    <div className="d-flex flex-column align-items-end">
                      <h2 className="t-name qu-font display-5 ">{item.name}</h2>
                      <div className="t-image">
                        <img
                          src={`${imageUrl}${item.profileImage}`}
                          alt="t-image"
                          className="img-fluid"
                        />
                      </div>
                      <ul className="t-details d-flex flex-column align-items-end">
                        <li>
                          <div className="d-flex align-items-start">
                            <div className="t-title sarif purple text-end">
                              QUALIFICATION
                            </div>
                            <div className="t-desc sarif">
                              {item.qualification}
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-start">
                            <div className="t-title sarif yellow text-end">
                              Experience
                            </div>
                            <div className="t-desc sarif">
                              {item.experience}
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-start">
                            <div className="t-title sarif pink text-end">
                              City
                            </div>
                            <div className="t-desc sarif">{item.city}</div>
                          </div>
                        </li>
                        {item.age != null && item.age > 0 ? (
                          <li>
                            <div className="d-flex align-items-start">
                              <div className="t-title sarif cyan text-end">
                                age
                              </div>
                              <div className="t-desc sarif">
                                {item.age} Years
                              </div>
                            </div>
                          </li>
                        ) : (
                          ''
                        )}
                        {item.fee != null && item.fee.length > 0 ? (
                          <li>
                            <div className="d-flex align-items-start">
                              <div className="t-title sarif gray text-end">
                                Fee
                              </div>
                              <div className="t-desc sarif">
                                INR {item.fee} per one hour session
                              </div>
                            </div>
                          </li>
                        ) : (
                          ''
                        )}
                        <li>
                          <div className="d-flex align-items-start">
                            <div className="t-title sarif green text-end">
                              LANGUAGES
                            </div>
                            <div className="t-desc sarif d-flex">
                              {item.languages.map((item) => {
                                return (
                                  <div className="language-btn mx-2 ms-0">
                                    {item}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div className="devider"></div>
                      <div className="t-desc sarif">
                        {item.email != null && item.email.length > 0 ? (
                          <span>Email: {item.email}</span>
                        ) : (
                          ''
                        )}
                        {item.phone != null && item.phone.length > 0 ? (
                          <span>
                            <br />
                            Phone: {item.phone}
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <!-- -------------------------------- --> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Therapist;
