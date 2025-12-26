import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import urls from '../../config/url.json';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ConfirmUpdateEmail() {
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);
    const [searchParams] = useSearchParams();

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    async function submitForm(event) {
        setLoader(true);
        event.preventDefault();

        if (!email) {
            setError("Email is required");
            setLoader(false);
            return;
        }
        else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
            setError("Invalid email format");
            setLoader(false);
            return;
        }

        const uri = urls.find(data => data.operationType === 'postCnfUpdateEmail')?.url;
        if (uri == null) {
            window.alert("No uri found for postCnfUpdateEmail.");
            setLoader(false);
            return;
        }
        try {
            const updtEmlToken = searchParams.get("token");
            const res = await axios.put(process.env.REACT_APP_API_URL + uri + updtEmlToken, { email });
            const data = res.data;
            if (data.isSuccess) {
                setLoader(false);
                alert(data.message);
                if (localStorage.getItem("token")) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('user_id');
                }
                navigate('/login');
                window.location.reload();
            } else {
                setLoader(false);
                setError(data.message);
            }
        } catch (error) {
            if (error.response?.data?.hasException) {
                setError(error.response.data.errorResDto.details);
                setLoader(false);
            } else if (error.request) {
                setError("No response from server");
                setLoader(false);
            } else {
                setError("Error: " + error.message);
                setLoader(false);
            }
        }
    }

    return (
        <div className="content">
            {loader && <div id="preloader"></div>}
            <div className="container">
                <div className="row">
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                {error ? <div className="alert alert-danger mb-4 text-center" role="alert">
                                    {error}
                                </div> : ""}
                                <div className="mb-4">
                                    <h3>Update Your Email</h3>
                                    <p className="mb-4">Set your new email</p>
                                </div>
                                <form onSubmit={submitForm}>
                                    <div className="form-group first">
                                        <input type="email" className="form-control" id="email" placeholder='Email' onChange={handleEmail} required />
                                    </div>
                                    <input type="submit" value="Update Email" className="btn btn-block btn-primary mt-3" />
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <DotLottieReact
                            src='/assets/img/UpdateEmailAnimation.lottie'
                            autoplay
                            loop
                            className='img-fluid' />
                    </div>
                </div>
            </div>
        </div>
    );
}