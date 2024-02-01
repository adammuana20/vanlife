import { 
    FC, 
    createContext, 
    ReactNode, 
    useContext, 
    useEffect,
    useState,
} from "react";
import { Van, getVansDocuments } from "../utils/firebase";

export type Category = {
    type: string;
    color: string;
}

type CategoriesContextProps = {
    categoriesColor: Record<number, Category>;
}

type CategoriesProviderProps = {
    children: ReactNode;
}


export const CategoriesContext = createContext<CategoriesContextProps>({
    categoriesColor: {},
})

export const CategoriesProvider: FC<CategoriesProviderProps> = ({ children }) => {
    const [categoriesColor, setCategoriesColor] = useState({})

    useEffect(() => {
        const getVansMap = async () => {
            const vanMap = await getVansDocuments()

            const vanType = vanMap.reduce((acc: { type: string, color: string }[], currVal: Van, idx) => {
                if(!acc.some(obj => obj.type === currVal.type)) {
                    acc.push({type: currVal.type.toLowerCase(), color: `hsl(${20 * idx}, 40%, ${idx === 0 ? 0 : 50}%)`})
                }
                return acc
            }, [])
          
            setCategoriesColor(vanType)
        }

        getVansMap()
    }, [])

    const value = { categoriesColor }

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}

export const useCategories = () => {
    const context = useContext(CategoriesContext)
    if(!context) {
        throw new Error('useCategories must be used within CategoriesProvider');
    }
    return context
}