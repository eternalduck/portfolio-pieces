import React from 'react'
import {useField} from 'formik'
import {DatePicker} from '@progress/kendo-react-dateinputs'

export const DatePickerInput = ({label, required, trnsl, ...props}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)
  let dateTypeValue = field.value ? new Date(field.value) : new Date()
  const onChangeWrapper = (event) => {
    const {target: {value: dateRaw }} = event
    dateTypeValue = dateRaw
    event.value = JSON.stringify(dateTypeValue)
    field.onChange(event)
  }
  const notValid = Boolean(meta.touched && meta.error)
  return (
    <>
      <DatePicker
        {...meta}
        name={field.name}
        onBlur={field.onBlur}
        onChange={onChangeWrapper}
        className="k-float-right"
        defaultValue={new Date()}
        format="dd/MMM/yyyy"
        value={dateTypeValue}
        max={new Date()}
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
