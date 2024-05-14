import imageUrl from "../assets/images/avatar-icon.png";

const Avatar = () => {
  return (
    <img className='rounded-full' height={30} width={30} alt='Avatar' src={imageUrl} />
  )
}

export default Avatar