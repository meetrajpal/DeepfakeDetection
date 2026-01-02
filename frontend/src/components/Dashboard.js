import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCurUser, fetchHistory } from "../actions/actionindex";
import urls from "../config/url.json";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.current_user);
  const history = useSelector((state) => state.history);
  const [inputType, setInputType] = useState("file");
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(false);
  const formData = new FormData();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const userId = localStorage.getItem("user_id");
      dispatch(fetchCurUser(userId));
      dispatch(fetchHistory(userId));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const userId = localStorage.getItem("user_id");
      dispatch(fetchCurUser(userId));
      dispatch(fetchHistory(userId));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (history.length > 0) {
      setRecords(history);
    } else {
      setRecords([]);
    }
  }, [history, records]);

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const deleteHistory = async (pred_id) => {
    setLoader(true);

    const uri = urls.find(
      (data) => data.operationType === "getPredictions"
    )?.url;
    if (!uri) {
      alert("No endpoint found for getPredictions in deletePredictions.");
      setLoader(false);
      return;
    }

    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + uri + `?pred_id=${pred_id}`
      );
      const data = res.data;
      if (data.isSuccess) {
        dispatch(fetchHistory(localStorage.getItem("user_id")));
        setLoader(false);
      }
    } catch (error) {
      if (error.response?.data?.hasException) {
        alert(error.response.data.errorResDto.details);
        setLoader(false);
      } else if (error.response?.data?.detail?.msg) {
        alert(error.response?.data?.detail?.msg);
        setLoader(false);
      } else if (error.request) {
        alert("No response from server");
        setLoader(false);
      } else {
        alert("Error: " + error.message);
        setLoader(false);
      }
    }
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
              dispatch(fetchHistory(localStorage.getItem("user_id")));
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
              dispatch(fetchHistory(localStorage.getItem("user_id")));
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
              dispatch(fetchHistory(localStorage.getItem("user_id")));
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
              dispatch(fetchHistory(localStorage.getItem("user_id")));
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

      case "yt":
        if (textInput.trim()) {
          setLoader(true);

          const uri = urls.find(
            (data) => data.operationType === "getDetectYtVideo"
          )?.url;
          if (!uri) {
            alert("No endpoint found for getDetectYtVideo.");
            setLoader(false);
            return;
          }

          try {
            const res = await axios.get(
              process.env.REACT_APP_API_URL + uri + `?url=${textInput}`
            );
            const data = res.data;
            if (data.isSuccess) {
              dispatch(fetchHistory(localStorage.getItem("user_id")));
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
          alert("No YouTube URL provided.");
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
        ></div>
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
                <h5 className="mb-0 text-danger">Note</h5>
              </div>
              <div className="card-body">
                <ol className="text-danger">
                  <li>
                    Please paste only those URL which appear when you click on
                    share button of any social apps.
                  </li>
                  <li>
                    All video files are deleted from our servers right after
                    processing is completed. We never store your data.
                  </li>
                  <li>
                    To download the video from your given URL we use third party
                    APIs. So there is monthly limit for those third party APIs.
                  </li>
                </ol>
              </div>
            </div>

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
                    onChange={(e) => {
                      setInputType(e.target.value);
                      setTextInput("");
                    }}
                    disabled={!curUser.verified_email}
                  >
                    <option value="file">Direct Video Upload</option>
                    <option value="ig">Instagram Reel / Video</option>
                    <option value="fb">Facebook Video</option>
                    <option value="xv">X (Twitter) Video / Status</option>
                    <option value="yt">YouTube Video</option>
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

            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">Detection History</h5>
              </div>
              <div className="card-body p-0">
                {records.length > 0 ? (
                  <div className="list-group list-group-flush">
                    {[...records].reverse().map((record) => (
                      <div key={record.pred_id} className="list-group-item">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                          <div className="mb-2 mb-md-0">
                            <div className="d-flex align-items-center">
                              <span
                                className={`badge ${
                                  record.pred_label === "REAL"
                                    ? "bg-success"
                                    : "bg-danger"
                                } me-2`}
                              >
                                {record.pred_label}
                              </span>
                              <span className="fw-medium text-truncate">
                                {record.filename}
                              </span>
                            </div>
                            <small className="text-muted">
                              Source: {record.source}
                            </small>
                          </div>
                          <div className="d-flex gap-2">
                            {record.url !== "NA" && (
                              <a
                                href={record.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                                title="View uploaded link"
                              >
                                <i className="bi bi-link"></i> View
                              </a>
                            )}
                            <button
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                              onClick={() => deleteHistory(record.pred_id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i
                      className="bi bi-collection-play d-block text-muted mb-3"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <p className="mb-0 text-muted">
                      You currently have no history - get started by detecting a
                      video
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
