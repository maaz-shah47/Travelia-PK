import React, { useReducer, useEffect } from 'react'
import { validate } from '../../../utils/validator'

import './Input.scss'

const inputReducer = (state, action) => {
  const {type, payload} = action

  switch(type) {
    case 'CHANGE':
      return {
        ...state,
        value: payload.val,
        isValid: validate(payload.val, payload.validators)
      }
    case 'BLUR':
      return {
        ...state,
        isTouched: true
      }
    default:
      return state
  }
}
const Input = (props) => {
  const [{value, isValid, isTouched}, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouched: false
  })

  const {id, onInput} = props
  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const changeHandler = (event) => {
    dispatch({type: 'CHANGE', payload: { val: event.target.value, validators: props.validators}})
  }

  const touchHandler = () => {
    dispatch({type: 'BLUR'})
  }

  const element =
    props.element === 'input'
    ? <input id={id} type={props.type} placeholder={props.placeholder} onChange={changeHandler} onBlur={touchHandler} value={value} />
    : <textarea id={id} rows={props.rows || 3} onChange={changeHandler} onBlur={touchHandler} value={value} />

  return (
    <div className={`form-control ${!isValid && isTouched && 'form-control--invalid'}`}>
      <label htmlFor={id}>{props.label}</label>
      { element }
      {!isValid && isTouched && <p>{props.errorText}</p>}
    </div>
  )
}

export default Input
