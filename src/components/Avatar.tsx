import imageUrl from "../assets/images/avatar-icon.png";

const Avatar = () => {
  return (
    <img className='rounded-full' height={20} width={20} alt='Avatar' src={imageUrl} />
  )
}

export default Avatar