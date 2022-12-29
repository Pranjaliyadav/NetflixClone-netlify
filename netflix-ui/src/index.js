import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
{/* with index.js in store an this our redux toolkit setup is complete */}
    </Provider>
  
  </React.StrictMode>
);

/*
So in react, provider is used to pass on a context to other components, it can
be any type of data. this avoids prop drilling, when you have to pass props down
thru multiple levels of components just to make them available to a child component

when using redux with react, its common to pass redux store to be a provider
component so that store can be accessed by the rest of the application.
Provider from "react-redux" library.
provider takes store as a prop and make it accessible to rest of application thru
the 'useSelector'- access the state and 'useDispatch'- dispatch action to store
from any component in the component tree.
thru this we can easily connect react components to the redux store and manage the
application's state in a centeralized, predictable way.

StrictMode can help us find issues and potential warnings in code. eg -if theres a 
deprecated APIs that will be removed in future version of react. it'll tell you
if u not using useEffect well, notified. we can use this in development, but not good
for production


*/