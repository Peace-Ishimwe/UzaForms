import React from 'react'

interface dropDownProps {
    question: any,
}

const Date: React.FC<dropDownProps> = ({ question }) => {
    return (
        <div className='space-y-6'>
            <div className='py-2 border-b -mx-4'>
                <label>{question.label}</label>
            </div>
            <div className='space-y-4'>
                <div className='flex space-x-9 items-center w-full'>
                    <label>Label: </label>
                    <input
                        type="text"
                        value={question.value || ''}
                        className="border p-2 w-full"
                    />
                </div>
                <div className='flex space-x-3 items-center w-full'>
                    <label>Required: </label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose an answer</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className='flex space-x-3 items-center w-full'>
                    <label>Type: </label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose an answer</option>
                        <option value="">Date Only</option>
                        <option value="no">Time Only</option>
                        <option value="no">Date And Time</option>
                    </select>
                </div>
            </div>
            
        </div>
    )
}

export default Date