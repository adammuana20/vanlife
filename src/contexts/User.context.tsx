import { createContext, useState, useEffect, ReactNode, FC, Dispatch, SetStateAction, useContext } from 'react'

import { onAuthStateChangedListener, createUserDocumentFromAuth, signOutUser } from '../utils/firebase'
import { User } from 'firebase/auth'
import { redirect } from 'react-router-dom';
import Loading from '../components/Loading';

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
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener( async (user) => {
            if(user) {
                createUserDocumentFromAuth(user)
                // const tokenExpiration = (await user.getIdTokenResult()).expirationTime
                // const tokenExpirationInTime = new Date(tokenExpiration).getTime()
                // const currentTime = new Date().getTime();
                // const twoMinutesBeforeExpiration = tokenExpirationInTime - (3500 * 1000); // 2 minutes before expiration
                
                // if (tokenExpirationInTime < currentTime) {
                //     try {
                //         await signOutUser();
                //         console.log('Session Timeout');
                //         redirect('/login');
                //     } catch (error) {
                //         console.error('Error refreshing token:', error);
                //     }
                // } else if (twoMinutesBeforeExpiration && twoMinutesBeforeExpiration < currentTime) {
                //     const confirmed = window.confirm('Your session will expire soon. Do you want to refresh your session?');
                //     if (confirmed) {
                //         try {
                //             await user.getIdToken(true);
                //             console.log('Session Refreshed');
                //         } catch (error) {
                //             console.error('Error refreshing token:', error);
                //         }
                //     }
                // }
            }
            setCurrentUser(user)
            setIsLoading(false)
        })

        return unsubscribe
    }, [])

    if(loading) return <Loading/>

    const value = {
        currentUser,
        setCurrentUser
    }
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within UserProvider');
    }
    return context;
};