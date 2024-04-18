import { FC, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Favorite, createUserVanFavorites, getFavorites, removeUserVanFavorites } from "../../utils/firebase";

import { useFavorites } from "../../contexts/Favorites.context";

export type FavoritesButtonProps = {
    van: Favorite;
}

const FavoritesButton: FC<FavoritesButtonProps> = ({ van }) => {
    const { myFavorites, setMyFavorites } = useFavorites()
    const [isLoading, setIsLoading] = useState(false)

    const { id } = van

    const hasFavorited = myFavorites?.some((van) => van.vanId === id)

    const toggleFavorite = async () => {
        try {
            setIsLoading(true)

            if(!hasFavorited) {
                await createUserVanFavorites(van)
            } else {
                await removeUserVanFavorites(van)
            }
        } catch(err) {
            setIsLoading(false)
            throw new Error('Error adding to favorites. Please try again!', err as Error)
        } finally {
            const favsArr = await getFavorites()
            setMyFavorites(favsArr)
            setIsLoading(false)
        }
    };
    
  return (
    <button 
        onClick={toggleFavorite}
        className="relative hover: opacity-80 tansition cursor-pointer z-10"
        disabled={isLoading}
    >
        <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>
        <AiFillHeart size={24} className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}/>
    </button>
  )
}

export default FavoritesButton