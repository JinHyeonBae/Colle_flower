import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Home(){    
  return (
    <Fragment>
      <button>
        <Link to="/signin">
          Sign In
        </Link>
      </button>
      <button>
        <Link to="/signup">
          Sign Up
        </Link>
      </button>

   </Fragment>
  );
}

export default Home;