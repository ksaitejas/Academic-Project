import React from "react";
import { Link } from "react-router-dom";
const storedUserData = JSON.parse(localStorage.getItem('userData'));
function phd() {
    if (storedUserData.Designation === 'faculty') {
        return (
            <>
                <Link to="/colocium">colocium</Link> <br />
                <Link to="/prephd">prephd</Link> <br />
                <Link to="/thesis">thesis</Link> <br />
                {/* <Routes>
      </Routes> */}
            </>
        )
    }
    else {
        return <>sorry not accessible {storedUserData.Designation}</>;
    }
}

export default phd;
