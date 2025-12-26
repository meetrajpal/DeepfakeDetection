import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCurUser } from "../actions/actionindex";
import urls from "../config/url.json";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.current_user);
  const [inputType, setInputType] = useState("file");
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const formData = new FormData();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const userId = localStorage.getItem("user_id");
      dispatch(fetchCurUser(userId));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const userId = localStorage.getItem("user_id");
      dispatch(fetchCurUser(userId));
    }
  }, [dispatch, navigate]);

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!curUser.verified_email) return;

    switch (inputType) {
      case "file":
        if (file) {
          setLoader(true);

          const uri = urls.find(
            (data) => data.operationType === "postDirectUpload"
          )?.url;
          if (!uri) {
            alert("No endpoint found for postDirectUpload.");
            setLoader(false);
            return;
          }

          try {
            formData.append("file", file);
            const res = await axios.post(
              process.env.REACT_APP_API_URL + uri,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            const data = res.data;
            if (data.isSuccess) {
              alert(data.message);
              setLoader(false);
            } else if (data.detail) {
              setLoader(false);
              alert(data.detail);
            } else {
              alert(data.message);
              setLoader(false);
            }
          } catch (error) {
            if (error.response?.data?.hasException) {
              alert(error.response.data.errorResDto.details);
              setLoader(false);
            } else if (
              !error.response?.data?.isSuccess &&
              !error.response?.data?.hasException
            ) {
              alert(error.response?.data?.message);
              setLoader(false);
            } else if (error.request) {
              alert("No response from server");
              setLoader(false);
            } else {
              alert("Error: " + error.message);
              setLoader(false);
            }
          }
        } else {
          alert("No file selected.");
        }
        break;

      case "ig":
        if (textInput.trim()) {
          setLoader(true);

          const uri = urls.find(
            (data) => data.operationType === "getDetectIgReel"
          )?.url;
          if (!uri) {
            alert("No endpoint found for getDetectIgReel.");
            setLoader(false);
            return;
          }

          try {
            const res = await axios.get(
              process.env.REACT_APP_API_URL + uri + `?url=${textInput}`
            );
            const data = res.data;
            if (data.isSuccess) {
              alert(data.message);
              setLoader(false);
            } else if (data.detail) {
              setLoader(false);
              alert(data.detail);
            } else {
              alert(data.message);
              setLoader(false);
            }
          } catch (error) {
            if (error.response?.data?.hasException) {
              alert(error.response.data.errorResDto.details);
              setLoader(false);
            } else if (
              !error.response?.data?.isSuccess &&
              !error.response?.data?.hasException
            ) {
              alert(error.response?.data?.message);
              setLoader(false);
            } else if (error.request) {
              alert("No response from server");
              setLoader(false);
            } else {
              alert("Error: " + error.message);
              setLoader(false);
            }
          }
        } else {
          alert("No Instagram URL provided.");
        }
        break;

      case "fb":
        if (textInput.trim()) {
          setLoader(true);

          const uri = urls.find(
            (data) => data.operationType === "getDetectFbVideo"
          )?.url;
          if (!uri) {
            alert("No endpoint found for getDetectFbVideo.");
            setLoader(false);
            return;
          }

          try {
            const res = await axios.get(
              process.env.REACT_APP_API_URL + uri + `?url=${textInput}`
            );
            const data = res.data;
            if (data.isSuccess) {
              alert(data.message);
              setLoader(false);
            } else if (data.detail) {
              setLoader(false);
              alert(data.detail);
            } else {
              alert(data.message);
              setLoader(false);
            }
          } catch (error) {
            if (error.response?.data?.hasException) {
              alert(error.response.data.errorResDto.details);
              setLoader(false);
            } else if (
              !error.response?.data?.isSuccess &&
              !error.response?.data?.hasException
            ) {
              alert(error.response?.data?.message);
              setLoader(false);
            } else if (error.request) {
              alert("No response from server");
              setLoader(false);
            } else {
              alert("Error: " + error.message);
              setLoader(false);
            }
          }
        } else {
          alert("No Facebook URL provided.");
        }
        break;

      case "xv":
        if (textInput.trim()) {
          setLoader(true);

          const uri = urls.find(
            (data) => data.operationType === "getDetectTwitterVideo"
          )?.url;
          if (!uri) {
            alert("No endpoint found for getDetectTwitterVideo.");
            setLoader(false);
            return;
          }

          try {
            const res = await axios.get(
              process.env.REACT_APP_API_URL + uri + `?url=${textInput}`
            );
            const data = res.data;
            if (data.isSuccess) {
              alert(data.message);
              setLoader(false);
            } else if (data.detail) {
              setLoader(false);
              alert(data.detail);
            } else {
              alert(data.message);
              setLoader(false);
            }
          } catch (error) {
            if (error.response?.data?.hasException) {
              alert(error.response.data.errorResDto.details);
              setLoader(false);
            } else if (
              !error.response?.data?.isSuccess &&
              !error.response?.data?.hasException
            ) {
              alert(error.response?.data?.message);
              setLoader(false);
            } else if (error.request) {
              alert("No response from server");
              setLoader(false);
            } else {
              alert("Error: " + error.message);
              setLoader(false);
            }
          }
        } else {
          alert("No Twitter URL provided.");
        }
        break;

      default:
        alert("Invalid selection.");
        break;
    }
  };

  return (
    <>
      {loader && (
        <div
          id="preloader"
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75"
          style={{ zIndex: 1050 }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!curUser.verified_email && (
        <div className="alert alert-danger py-3 text-center mb-0 rounded-0">
          <strong>Please verify your email to use the service</strong>
        </div>
      )}

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header ">
                <h5 className="mb-0 ">Deepfake Detection</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="inputType" className="form-label">
                    Select Input Type
                  </label>
                  <select
                    id="inputType"
                    className="form-select"
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                    disabled={!curUser.verified_email}
                  >
                    <option value="file">Direct Video Upload</option>
                    <option value="ig">Instagram Reel / Video</option>
                    <option value="fb">Facebook Video</option>
                    <option value="xv">Twitter Video / Status</option>
                  </select>
                </div>

                {inputType !== "file" ? (
                  <div className="mb-3">
                    <label htmlFor="urlInput" className="form-label">
                      Video URL
                    </label>
                    <input
                      id="urlInput"
                      type="text"
                      className="form-control"
                      placeholder="Paste the URL copied from the share option only"
                      value={textInput}
                      onChange={handleInputChange}
                      disabled={!curUser.verified_email}
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <label htmlFor="fileInput" className="form-label">
                      Upload Video
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                      disabled={!curUser.verified_email}
                      accept="video/*"
                    />
                  </div>
                )}

                <div className="d-grid">
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!curUser.verified_email}
                  >
                    <i className="bi bi-search me-2"></i>Detect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
