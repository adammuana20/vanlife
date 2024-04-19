import { FC, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Favorite, Van, createUserVanFavorites, getFavorites, removeUserVanFavorites } from "../../utils/firebase";

import { useRevalidator } from "react-router-dom";

export type FavoritesButtonProps = {
    van: Van;
    favorites: Favorite[];
}

const FavoritesButton: FC<FavoritesButtonProps> = ({ van, favorites }) => {
    const revalidator = useRevalidator()
    const myFavorites = favorites
    
    const [isLoading, setIsLoading] = useState(false)

    const { id } = van    

    const hasFavorited = myFavorites?.some((van) => van.id === id)

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
            setIsLoading(false)
            revalidator.revalidate()
        }
    };
    
  return (
    <button 
        onClick={toggleFavorite}
        className="relative hover: opacity-80 tansition cursor-pointer z-10"
        disabled={isLoading}
        style={{backgroundColor: 'transparent'}}
    >
        <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>
        <AiFillHeart size={24} className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}/>
    </button>
  )
}

export default FavoritesButton