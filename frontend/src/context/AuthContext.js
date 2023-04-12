import { createContext } from 'react';
export const AuthContext = createContext({});

const initialState = {
    isLoggedIn: false,
    userinfo:{},
    token:null
}

export const UserProvider = ({ children }) => {
    const [state, setState] = useSetState(initialState);
    const [ currentUser, setCurrentUser ] = useState(undefined);
    useEffect(() => {
            const checkLoggedIn = async () => {
                let cuser = isAuthenticated();
                if (cuser === null) {
                    localStorage.setItem('user', '');
                    cuser = '';
                }
    
                setCurrentUser(cuser);
            };
    
            checkLoggedIn();
    }, []);

    return (
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
            { currentUser?.token ? children : <Login />}
        </UserContext.Provider>
    );

}
