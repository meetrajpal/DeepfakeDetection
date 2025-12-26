import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import urls from '../../config/url.json';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ConfirmForgotPassword() {
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [searchParams] = useSearchParams();

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function handleCnfPassword(event) {
        setCnfPassword(event.target.value);
    }

    async function submitForm(event) {
        setLoader(true);
        event.preventDefault();

        if (!password) {
            setError("Password is required");
            setLoader(false);
            return;
        }
        else if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoader(false);
            return;
        }
        else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            setError("Password must include uppercase, lowercase, number, and special character");
            setLoader(false);
            return;
        }
        if (!cnfPassword) {
            setError("Confirm password is required");
            setLoader(false);
            return;
        }
        else if (cnfPassword !== password) {
            setError("Passwords do not match");
            setLoader(false);
            return;
        }

        const uri = urls.find(data => data.operationType === 'postCnfForgotPassword')?.url;
        if (uri == null) {
            window.alert("No uri found for postCnfForgotPassword.");
            setLoader(false);
            return;
        }
        try {
            const frgtPswdToken = searchParams.get("token");
            const res = await axios.put(process.env.REACT_APP_API_URL + uri + frgtPswdToken, { password, "cnf_password": cnfPassword });
            const data = res.data;
            if (data.isSuccess) {
                setLoader(false);
                alert(data.message);
                navigate('/login');
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
                                    <h3>Reset Your Password</h3>
                                    <p className="mb-4">Set your new password</p>
                                </div>
                                <form onSubmit={submitForm}>
                                    <div className="form-group first">
                                        <input type="password" className="form-control" id="password" placeholder='Password' onChange={handlePassword} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="cnfpassword" placeholder='Confirm Password' onChange={handleCnfPassword} required />
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