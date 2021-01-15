import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Home(){    
  return (
    <Fragment>
      <button>
        <Link to="/login">
          Sign In
        </Link>
      </button>

   </Fragment>
  );
}

export default Home;