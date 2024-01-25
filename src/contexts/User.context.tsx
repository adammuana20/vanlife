import { createContext, useState, useEffect, ReactNode, FC, Dispatch, SetStateAction, useContext } from 'react'

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase'
import { User } from 'firebase/auth'

type UserContextType = {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

type UserProviderProps = {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        setCurrentUser
    }
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};