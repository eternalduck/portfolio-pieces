import React from 'react'
import {useField} from 'formik'
import {Input} from '@progress/kendo-react-inputs'

export const TextInput = ({label, required, trnsl, ...props}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)
  const notValid = Boolean(meta.touched && meta.error)
  return (
    <>
      <Input
        {...field} {...props}
        validityStyles={notValid || false}
        valid={!notValid}
        label={label}
      />
      {required ? (
        <span className="k-required">*</span>
      ) : null}
      {(meta.touched && meta.error) ? (
        <div className="k-text input-error input-error_invalid">{meta.error}</div>
      ) : null}
    </>
  )
}
