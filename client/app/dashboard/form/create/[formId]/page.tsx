"use client"
import FormWorkFlow from '@/components/form/form-design/FormWorkFlow'
import { useGetAllFormNames } from '@/hooks/form/useFormNames'
import { createFormStore } from '@/store/form-design/formStore'
import { FormNamesStore } from '@/store/form/formNamesStore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const FormDesignPage = () => {
    const params = useParams()
    const formId = params?.formId as string
    const { setFormNames } = FormNamesStore()
    const { data } = useGetAllFormNames()
    const [formName, setFormName] = useState("")

    useEffect(() => {
        if (data) {
            setFormNames(data);
        }
    }, [data, setFormNames]);
    
    useEffect(() => {
        if (formId && data) {
            const foundForm = data.data.find((form: any) => form._id === formId);
            setFormName(foundForm?.formName || "Form");
        }
    }, [formId, data]);

    return (
        <main className='p-4 space-y-6'>
            <h1 className="text-2xl font-semibold">{formName} Design</h1>
            <FormWorkFlow />
            <ToastContainer />
        </main>
    )
}

export default FormDesignPage