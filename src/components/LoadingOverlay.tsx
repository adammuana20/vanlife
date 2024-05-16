import { PuffLoader } from 'react-spinners'

const LoadingOverlay = () => {
    return (
        <div className='opacity-50 bg-white absolute z-50 top-0 left-0 flex items-center justify-center w-full h-full'>
            <PuffLoader size={100} color='#b65917' />
        </div>
    )
}

export default LoadingOverlay;