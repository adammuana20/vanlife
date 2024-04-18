import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react"
import { Favorite, Van, getFavorites } from "../utils/firebase"


type FavoritesContextProps = {
    myFavorites: Favorite[];
    setMyFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

type FavoritesProviderProps = {
    children: ReactNode
}

export const FavoritesContext = createContext<FavoritesContextProps>({
    myFavorites: [],
    setMyFavorites: () => {}
})

export const FavoritesProvider: FC<FavoritesProviderProps> = ({ children }) => {
    const [myFavorites, setMyFavorites] = useState<Favorite[]>([])
    

    const value = { myFavorites, setMyFavorites }

    return <FavoritesContext.Provider value={value}>{ children }</FavoritesContext.Provider>
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if(!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context
}