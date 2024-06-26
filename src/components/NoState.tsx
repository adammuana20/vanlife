import React from 'react'
import { useNavigate } from 'react-router-dom';
import Heading from './Heading';
import Button from './Button';

type NoStateProps = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const NoState: React.FC<NoStateProps> = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters",
    showReset
}) => {
    const navigate = useNavigate()

  return (
    <div
        className='
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
        '
    >
        <Heading
            center
            title={title}
            subtitle={subtitle}
        />
        <div className='w-48 mt-4'>
            { showReset && (
                <Button
                    outline
                    label="Remove all filters"
                    onClick={() => navigate('/vans')}
                />
            )}
        </div>
    </div>
  )
}

export default NoState