import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import urls from '../../config/url.json';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    async function submitForm(event) {
        setLoader(true);
        event.preventDefault();

        if (!email) setError("Email is required");
        else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/.test(email))
            setError("Invalid email format");

        const uri = urls.find(data => data.operationType === 'postForgotPassword')?.url;
        if (uri == null) {
            window.alert("No uri found for postForgotPassword.");
            setLoader(false);
            return;
        }
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + uri, { email });
            const data = res.data;
            if (data.isSuccess) {
                setLoader(false);
                alert(data.message);
                navigate('/');
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
                                    <h3>Forgot Password?</h3>
                                    <p className="mb-4">Don't worry, we got your back!</p>
                                </div>
                                <form onSubmit={submitForm}>
                                    <div className="form-group first">
                                        <input type="email" className="form-control" id="email" placeholder='Enter email id of your account' onChange={handleEmail} required />

                                    </div>
                                    <input type="submit" value="Reset Password" className="btn btn-block btn-primary mt-3" />
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <DotLottieReact
                            src='/assets/img/ForgotPasswordAnimation.lottie'
                            autoplay
                            loop
                            className='img-fluid' />
                    </div>
                </div>
            </div>
        </div>
    );
}