import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import urls from "../../config/url.json";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [success, isSuccess] = useState(false);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verifyToken = searchParams.get("token");
    if (!verifyToken) {
      alert("Invalid URL. No token found.");
      navigate("/");
      return;
    }

    const uri = urls.find(
      (data) => data.operationType === "postVerifyEmail"
    )?.url;

    if (!uri) {
      alert("No URI found for postVerifyEmail.");
      navigate("/");
      return;
    }

    const verifyEmail = async () => {
      setLoader(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}${uri}${verifyToken}`
        );

        if (res.data.isSuccess) {
          isSuccess(true);
        }
      } catch (e) {
        if (e.response?.data?.errorResDto) {
          alert(e.response.data.errorResDto.message);
        } else if (e.request) {
          alert("No response from server.");
        } else {
          alert("Error: " + e.message);
        }
        navigate("/");
      } finally {
        setLoader(false);
      }
    };

    verifyEmail();
  }, [navigate, searchParams]);

  return (
    <>
      {loader && <div id="preloader"></div>}
      {success && (
        <center>
          <h1>Your Email is Verified!</h1>
          <br />
          <DotLottieReact
            src="https://lottie.host/0a080f91-0c78-4520-b708-880761670d4e/xOioiVRJzw.lottie"
            autoplay
            className="img-fuid w-75"
          />
        </center>
      )}
    </>
  );
}
