import { 
    FC, 
    createContext, 
    ReactNode, 
    useContext, 
    useState,
} from "react";


type CategoriesProviderProps = {
    children: ReactNode;
}


export const CategoriesContext = createContext({

})

export const CategoriesProvider: FC<CategoriesProviderProps> = ({ children }) => {

    const value = {}

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}

export const useCategories = () => {
    const context = useContext(CategoriesContext)
    if(!context) {
        throw new Error('useCategories must be used within CategoriesProvider');
    }
    return context
}