import SkeletonElement from '../SkeletonElement'
import SkeletonHostVanCard from './SkeletonHostVanCard'

const SkeletonHostIncome = () => {
  return (
    <div>
        <SkeletonElement type='h1'/>
        <SkeletonElement type='title'/>
        <SkeletonElement type='title'/>
        <div className='h-[40vh]'>
            <SkeletonElement type='graph'/>
        </div>
        <div>
            <SkeletonElement type='title'/>
            <SkeletonElement type='text'/>
            {[1,2,3].map((n) => <SkeletonHostVanCard key={n} />)}
        </div>
    </div>
  )
}

export default SkeletonHostIncome