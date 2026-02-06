import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow  from "./ChatWindow.jsx";
import { MyContext } from './MyContext.jsx';
import { useState , useContext} from 'react';
import{v1 as uuidv1} from"uuid";

import { AuthProvider, AuthContext } from "./AuthContext";
import Login from "./Login";
import Signup from './Signup.jsx';

function MainAppContent() {
  const { user } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false);
   
     if (!user) {
    return showLogin ? 
      <Login switchToSignup={() => setShowLogin(false)} /> :
      <Signup switchToLogin={() => setShowLogin(true)} />;
  }

  return (
    <>
      <Sidebar />
      <ChatWindow />
    </>
  );
}


function App() {
  const [prompt,setPrompt]=useState("")
  const [reply,setReply]=useState(null)
  const [currThreadId,setCurrThreadId]=useState(uuidv1());
  const [prevChats,setPrevChats]=useState([]);
  const[newChat,setNewChat]=useState(true);
  const [allThreads,setAllThreads]=useState([])
const [showSidebar, setShowSidebar] = useState(window.innerWidth > 900);


const providerValues={
  prompt,setPrompt,
  reply,setReply,
  currThreadId,setCurrThreadId,
  newChat,setNewChat,
  prevChats,setPrevChats,
  allThreads,setAllThreads , 
  showSidebar,setShowSidebar,
}

  return (
   <div className='app'>
    <AuthProvider>
    <MyContext.Provider value={providerValues}>
    <MainAppContent/>
    </MyContext.Provider>
</AuthProvider>
   </div>
  )
}

export default App
