import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import urls from "../config/url.json";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  async function logout() {
    const uri = urls.find((data) => data.operationType === "postLogout")?.url;
    if (!uri) {
      alert("No logout endpoint found.");
      return;
    }

    if (window.confirm("Are you sure you want to logout?")) {
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL + uri);
        const data = res.data;
        if (data.isSuccess) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("user_id");
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        if (error.response?.data?.message) {
          alert({ form: error.response.data.message });
        } else {
          alert({ form: "Logout failed." });
        }
      }
    }
  }

  async function deleteAccount() {
    const uri = urls.find((data) => data.operationType === "getUser")?.url;
    if (!uri) {
      alert("No logout endpoint found for deleteUser.");
      return;
    }

    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const res = await axios.delete(
          process.env.REACT_APP_API_URL +
            uri +
            `?user_id=${localStorage.getItem("user_id")}`
        );
        const data = res.data;
        if (data.isSuccess) {
          alert("Account deleted successfully.");
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("user_id");
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        if (error.response?.data?.message) {
          alert({ form: error.response.data.message });
        } else {
          alert({ form: "Account deletion failed." });
        }
      }
    }
  }

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <h1 className="sitename">Deepfake Gaurd</h1>
        </Link>

        {localStorage.getItem("token") == null ? (
          <Link className="btn-getstarted" to="login">
            Try for free
          </Link>
        ) : location.pathname !== "/update-email" &&
          location.pathname !== "/confirm-update-email" &&
          location.pathname !== "/verif-account" ? (
          <div class="dropdown">
            <button
              class="btn border dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {localStorage.getItem("username")}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button class="dropdown-item" onClick={deleteAccount}>
                  Delete Account
                </button>
              </li>
              <li>
                <button class="dropdown-item" onClick={logout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}

export default Header;
