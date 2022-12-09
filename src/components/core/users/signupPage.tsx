import { Link } from "react-router-dom";

import "../../../assets/css/authPages.css";

function SignupPage() {
  return (
    <div className="auth-form-container">
      <form className="auth-form">
        <div className="auth-form-content">
          <h3 className="auth-form-title">Sign Up</h3>

          <div className="form-group mt-1">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Enter Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="At least 8 characters long"
            />
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Re-enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="text-center mt-2">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
