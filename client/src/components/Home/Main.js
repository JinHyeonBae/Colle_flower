import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root : {
        border : '4px solid bisque',
        borderRadius : 3,
        width : '100vw',
        height : '100vh',
        position: 'fixed'
    }
})

export default function Main(){
    const classes = useStyles();
    return <div className={classes.root}>
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
      <button>
        <Link to="/Login">
          Login
        </Link>
      </button>
      <button>
        <Link to ="/Chat/colleflower/a">
          Channel
        </Link>
      </button>
      <button>
        <Link to="/logout">
          Logout
        </Link>
      </button>
    </div>
}