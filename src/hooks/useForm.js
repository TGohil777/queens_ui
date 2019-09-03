import { useState } from 'react'

export const useForm = (initialValues) => {
    const [values , handleChange] = useState(initialValues);

    console.log("Form", JSON.stringify(values, null, 3));
    return [
        values,
        e => {
            if (!e) handleChange({...values})
            handleChange({
                ...values,
                [e.target.name]: e.target.value 
            })
        }
    ]
}

