import { Link } from "react-router-dom";

function Header() {
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
        ) : (
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
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
