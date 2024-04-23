import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from  'react-icons/fc'
import { useCallback, useState } from "react"
import useRegisterModal from "../../hooks/useRegisterModal"
import Modal from "./Modal"
import { useNavigation } from "react-router-dom"
import Heading from "../Heading"

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const navigation = useNavigation()

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Vanlife"
                subtitle="Create an account!"
            />
        </div>
    )
  return (
    <Modal
        disabled={navigation.state === 'submitting'}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        body={bodyContent}
    />
  )
}

export default RegisterModal