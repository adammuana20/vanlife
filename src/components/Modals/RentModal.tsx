import { useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Loadable from 'react-loadable-visibility/loadable-components'

import Modal from './Modal'
import Heading from '../Heading'

import useRentModal from '../../hooks/useRentModal'
import { useCategories } from '../../contexts/Categories.context'

import CategoryInput from '../Inputs/CategoryInput'
import CountrySelect from '../Inputs/CountrySelect'
import Counter from '../Inputs/Counter'
import ImageUpload from '../Inputs/ImageUpload'
import Input from '../Inputs/Input'
import { createVanDocument } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


enum STEPS { 
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DETAILS = 4,
}

const RentModal = () => {
    const rentModal = useRentModal()
    const { categoriesColor } = useCategories()
    const navigate = useNavigate()

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState('')

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
        capacityCount: 1,
        bedCount: 0,
        bathroomCount: 0,
        name: '',
        description: '',
        price: 1,
      }
    })

    const category = watch('category')
    const location = watch('location')
    const capacityCount = watch('capacityCount')
    const bedCount = watch('bedCount')
    const bathroomCount = watch('bathroomCount')
    const imageUrl = watch('imageUrl')

    if(imageUrl){
      const reader = new FileReader();
      reader.onloadend = () => {
          setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(imageUrl);
  };
  
    

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

      if(step === STEPS.CATEGORY && !category || step === STEPS.LOCATION && !location || step === STEPS.IMAGES && !imageUrl) return

      setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

      if(step !== STEPS.DETAILS) {
        return onNext()
      }
      
      setIsLoading(true)

      createVanDocument(data)
      .then(() => {
        reset()
        toast.success('Van Hosted successfuly')
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
        navigate(0)
      })
      .catch((err: Error) => {
        toast.error('Failed to host Van');
      })
      .finally(() => {
        setIsLoading(false)
      })
    }

    const actionLabel = useMemo(() => {
      if(step === STEPS.DETAILS) {
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
          <Counter 
            title="Capacity"
            subtitle="How many capacity do you allow?"
            value={capacityCount}
            onChange={(value) => setCustomValue('capacityCount', value)}
          />
          <Counter 
            title="Beds"
            subtitle="How many bed available?"
            value={bedCount}
            onChange={(value) => setCustomValue('bedCount', value)}
          />
          <Counter 
            title="Bathrooms"
            subtitle="How many bathroom/toilet do you have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue('bathroomCount', value)}
          />
        </div>
      )
    }

    if(step === STEPS.IMAGES) {
      bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading 
            title="Add a photo of your van"
            subtitle="Show guests what your van looks like!"
          />
          <ImageUpload 
            value={selectedImage}
            onChange={(value) => setCustomValue('imageUrl', value)}
          />
        </div>
      )
    }

    if(step === STEPS.DETAILS) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your van?"
            subtitle="Short and sweet works best!"
          />
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr/>
          <Heading 
            title="Now, set your price"
            subtitle='How much do you charge per day?'
          />
          <Input 
            id="price"
            label="Price"
            formatPrice
            type='number'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
    }

  return (
    <Modal 
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title='Register your Van'
        body={bodyContent}
    />
  )
}

export default RentModal