import { PuffLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className='h-[70vh] flex flex-col justify-center items-center'>
            <PuffLoader size={100} color='#b65917' />
        </div>
    )
}

export default Loading;