import { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Loadable from 'react-loadable-visibility/loadable-components'

import Modal from './Modal'
import Heading from '../Heading'

import useRentModal from '../../hooks/useRentModal'
import { useCategories } from '../../contexts/Categories.context'

import CategoryInput from '../Inputs/CategoryInput'
import CountrySelect from '../Inputs/CountrySelect'


enum STEPS { 
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal()
    const { categoriesColor } = useCategories()    

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: {
        errors,
      },
      reset
    } = useForm<FieldValues>({
      defaultValues: {
        category: '',
        location: null,
        imageUrl: '',
        roomCount: 1,
        capacityCount: 1,
        bathroomCount: 1,
        price: 1,
        title: '',
        description: '',
      }
    })

    const category = watch('category')
    const location = watch('location')

    const Map = useMemo(() => Loadable(() => import('../Map'), {
      ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }

    const onBack = () => {
      setStep((value) => value - 1)
    }

    const onNext = () => {
      setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
      if(step === STEPS.PRICE) {
        return 'Create'
      }

      return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.CATEGORY) {
        return undefined
      }

      return 'Back'
    }, [step])

    let bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title="Which of these best describes your van?"
          subtitle="Pick a category"
        />
        <div
          className='
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
          '
        >
          {Object.values(categoriesColor).map((van) => (
            <div className='col-span-1' key={van.type}>
              <CategoryInput
                onClick={(category) => setCustomValue('category', category)}
                selected={category === van.type}
                label={van.type}
              />
            </div>
          ))}
        </div>
      </div>
    )

    if(step === STEPS.LOCATION) {
      bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading 
            title="Where is your van located?"
            subtitle="Help customers find you!"
          />
          <CountrySelect 
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
          <Map center={location?.latlng} />
        </div>
      )
    }

    if(step === STEPS.INFO) {
      bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading 
            title='Share some basics about your van'
            subtitle='What amenities do you have?'
          />
          <Counter />
        </div>
      )
    }

  return (
    <Modal 
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title='Register your Van'
        body={bodyContent}
    />
  )
}

export default RentModal