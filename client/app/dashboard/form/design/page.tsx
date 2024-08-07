"use client"
import FormWorkFlow from '@/components/form/form-design/FormWorkFlow'
import SearchForm from '@/components/form/SearchForm'
import { useGetAllFormNames } from '@/hooks/form/useFormNames'
import { FormNamesStore } from '@/store/form/formNamesStore'
import React, { useEffect, useState } from 'react'

const FormDesignPage = () => {
    const { setFormNames } = FormNamesStore()    
    const [formNameId, setFormNameId] = useState()
    const { data, isPending } =  useGetAllFormNames()

    useEffect(() => {
        if (data) {
            setFormNames(data);
        }
    }, [data]);

    return (
        <main className='p-4 space-y-6'>
            <h1 className="text-2xl font-semibold">Form Design</h1>
            <SearchForm setFormId={setFormNameId} />
            <FormWorkFlow />
        </main>
    )
}

export default FormDesignPage