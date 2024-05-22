import SkeletonElement from '../SkeletonElement'
import SkeletonHostVans from './SkeletonHostVans'

const SkeletonHostDashboard = () => {
  return (
    <>
        <div className='h-[248px] bg-semi-light-orange py-9 px-6 flex flex-col justify-between '>
            <SkeletonElement type='h1' />
            <SkeletonElement type='text' />
            <SkeletonElement type='title' />
        </div>
        <SkeletonHostVans />
    </>
  )
}

export default SkeletonHostDashboard