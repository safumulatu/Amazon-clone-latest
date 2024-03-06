
import Routing from './Routing.jsx'
import { useEffect, useContext } from "react";
import { DataContext } from './components/DataProvider/DataProvider.jsx';
import { auth } from './Utility/Firebase.js';
import { Type } from './Utility/ActionType.js';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({ type: Type.SET_USER, user: null });
      }
    });
  }, []);
  return (
    <div>

     <Routing/>
    </div>
  )
}

export default App
