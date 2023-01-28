import React from 'react'
import * as clss from '../cssClassNames'
import {useField} from 'formik'
import {Input} from '@progress/kendo-react-inputs'
import {Button} from '@progress/kendo-react-buttons'

export const WelcomeAccount = ({label, ...props}) => {
  const [field] = useField(props)
  return (
    <section className={clss.section}>
      <div className={clss.rowCenter}>
        <div className={clss.defaultWidth}>
          <div className={clss.rowBetween}>
            <div className="field__wrap field_locked col-sm-9 col-12" id="email">
              <Input
                disabled={props.disabled}
                {...field}
              />
              <i className="fas fa-lock icon-locked"></i>
            </div>
            <div className="col-sm-3 col-12 onboarding-form__logout">
              <Button
                className="btn-small"
                type="button"
                onClick={props.onLogout}
                disabled
              >
                {props.trnsl('btnLogout')}
              </Button>
            </div>
          </div>
        </div>
        <div className={clss.rowCenter}>
          <div className={clss.defaultWidth}>
            <div className={clss.hintBig}>
              {props.trnsl('hintEmail1')}<br/>
              <b>{props.trnsl('hintEmail2')}</b><br/>
              {props.trnsl('hintEmail3')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
