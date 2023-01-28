import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'formik'
import {mergeDeep} from 'immutable'
import debounce from 'lodash.debounce'
import isEqual from 'react-fast-compare'
import {mergeDeepOverwriteLists} from '../../store/helperFunc';

window.merge = mergeDeepOverwriteLists
window.mergeDeep = mergeDeep

class UpdateFormikVariables extends React.Component {

  static propTypes = {
    values: PropTypes.object,
    name: PropTypes.string
  };

  componentDidMount() {
    const maybeState = window.localStorage.getItem(this.props.name)
    if (maybeState) {
      const merged = mergeDeepOverwriteLists(
        this.props.formik.initialValues,
        JSON.parse(maybeState))
      this.props.formik.setValues(merged)
    }
  }

  saveForm = debounce((data) => {
    window.localStorage.setItem(this.props.name, JSON.stringify(data));
  }, 300);

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevProps.formik.values, this.props.formik.values)) {
      this.saveForm(this.props.formik.values);
    }
    if (!isEqual(prevProps.values, this.props.values)) {
      const newValues = this.props.values
      const maybeValues = JSON.parse(window.localStorage.getItem(this.props.name))
      const updatefromstore = mergeDeepOverwriteLists(
        this.props.formik.initialValues,
        maybeValues || {},
      )
      const merged = mergeDeepOverwriteLists(updatefromstore, newValues)
      if (merged.publicProfile.socialContacts) {
        merged.socialContacts = merged.publicProfile.socialContacts
        delete merged.publicProfile.socialContacts
      }
      this.props.formik.setValues(merged);
    }
  }

  render() {
    return null
  }
}

export const Update = connect(UpdateFormikVariables)
