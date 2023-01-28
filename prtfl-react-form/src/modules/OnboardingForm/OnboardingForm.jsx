import React, {Component} from 'react'
import {Input} from '@progress/kendo-react-inputs'
import {AutoComplete} from '@progress/kendo-react-dropdowns'
import {Upload} from '@progress/kendo-react-upload'
import {Button} from '@progress/kendo-react-buttons'
import {Ripple} from '@progress/kendo-react-ripple'
import './OnboardingForm.scss'
import Header from '../Header-Footer/Header.jsx'
import FormTerms from './FormTerms/FormTerms'
import FormTermsPopup from './FormTerms/FormTermsPopup'
import InputError from './InputError/InputError'
import PayPopup from './FormPopup/PayPopup'
import SentStatusPopup from './FormPopup/SentStatusPopup'
// import {redirectToGoogleLogin} from '../../_tools/redirectToSignIn'
import {connect} from 'react-redux'
import {fetchCurrentUserIfNeeded, saveCurrentUser} from '../../store/actions'
import {provideLocalizationService, registerForLocalization} from '@progress/kendo-react-intl'
import {Field, Form, Formik, FieldArray} from 'formik'
import {WelcomeAccount} from './formFields/WelcomeAccount'
import {TextInput} from './formFields/TextInput'
import * as clss from './cssClassNames'
import {Update} from './updateOnboardingForm'
import {DatePickerInput} from './formFields/DatePickerInput'
import {signupSchemaFactory} from './validationSchema'

class OnboardingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFormShown: false,
      isTermsShown: false,
      hasPay: false,
      isPayShown: false,
      isFormValid: false,
      isFormSent: false,
      isSentStatusPopupShown: false,
      // isAddrTheSame: false,
      // isWhatsappTheSame: false,
      socialRowsNum: [0],
      userEmail: 'default@mail',
    }
    // list of all req txt fields
    this.errorStorage = this.props.currentLocale === 'ru' ? [
      'lastNameNational', 'firstNameNational', 'patronymicNational', 'firstName', 'lastName', 'citizenship', 'passportNum', 'passportIssuer', 'taxID', 'addrPostCountry', 'addrPostCity', 'addrPostStreet', 'addrPostZip', 'contactPhone'
    ] : ['firstName', 'lastName', 'citizenship', 'passportNum', 'taxID', 'addrPostCountry', 'addrPostCity', 'addrPostStreet', 'addrPostZip', 'contactPhone']


  }

  showForm = () => {
    window.scrollTo(0, 0)
    let currentState = this.state
    currentState['isFormShown'] = true
    this.setState(currentState, this.saveStateToLocalStorage())
    console.info(this.state)
  }

  toggleTerms = () => {
    this.setState({isTermsShown: !this.state.isTermsShown})
  }
  toggleSentStatusPopup = () => {
    // TODO: show error popup if no 200 received
    this.setState({isSentStatusPopupShown: !this.state.isSentStatusPopupShown})
  }

  handleSubmit = (values) => {
    values.officialPapers[0].type = 'passport'
    values.officialPapers[1].type = 'vat_id'
    console.log(values)
    const {dispatch} = this.props
    dispatch(saveCurrentUser(values));
    // this.toggleSentStatusPopup()
    localStorage.removeItem('onboarding-form');
  }

  handleLogOut = () => {
    // redirectToGoogleLogin()
  }

  saveStateToLocalStorage = () => {
    localStorage.setItem('formState', JSON.stringify(this.state))
  }

  saveValuesAfterRefresh = () => {
    let formStateFromStorage = JSON.parse(localStorage.getItem('formState'))
    for (let name in formStateFromStorage) {
      if (this.errorStorage.includes(name)) {
        this.errorStorage = this.errorStorage.filter(value => value !== name)
      }
    }
    this.setState(formStateFromStorage)
  }

  componentDidMount() {
    const {dispatch} = this.props
    // dispatch(fetchCurrentUserIfNeeded())
    this.saveValuesAfterRefresh()
  }

  render() {
    const {currentLocale} = this.props
    const trnsl = (string) => provideLocalizationService(this).toLanguageString(string, '')
    const {userData} = this.props
    const {userGroupId, publicProfile, privateInfo, officialPapers} = userData
    return (

      <>
        {!this.state.isFormShown &&
        <Header
          currentLocale={currentLocale}
          toggleLocaleHandler={this.props.toggleLocaleHandler}
          headerClass="header_orange"
          hasMenu={false}
          hasLangSwitch={true}
        />
        }
        {this.state.isFormShown ?
          (<>
              <Header
                currentLocale={currentLocale}
                toggleLocaleHandler={this.props.toggleLocaleHandler}
                headerClass="header_orange"
                currentItem="form"
                userIsAdmin={userGroupId > 2}
                hasLangSwitch={true}
                hasMenu={true}
                menuHasTerms={true}
                toggleTerms={this.toggleTerms}
                titleFormTerms={trnsl('titleFormTerms')}
              />
              <FormTermsPopup
                currentLocale={currentLocale}
                isToggled={this.toggleTerms}
                isShown={this.state.isTermsShown}
              />
              <div className={clss.rowCenter}>
                <h1>{trnsl('titleForm')}</h1>
              </div>

              <div className={clss.titleRowCenter}>
                <h2>{trnsl('titleEmail')}</h2>
              </div>
              <Formik
                initialValues={{
                  publicProfile,
                  privateInfo,
                  officialPapers,
                  _isAddrTheSame: true,
                  socialContacts: []
                }}
                validationSchema={signupSchemaFactory(currentLocale.locale, trnsl)}
                onSubmit={this.handleSubmit}
              >
                {({errors, status, touched, isSubmitting, handleChange, getFieldProps, values, getFieldMeta}) => (
                  <Form>
                    <WelcomeAccount trnsl={trnsl}
                      name="publicProfile.googleEmail"
                      onLogout={this.handleLogOut}
                      disabled={true}
                    />
                    <div className={clss.titleRowCenter}>
                      <h2>{trnsl('titlePersonalDataBlock')}</h2>
                    </div>

                    <section className={clss.section}>
                      {currentLocale.locale === 'ru' &&
                      <div className={clss.group}>
                        <div className={clss.rowCenter}>
                          <div className={clss.defaultWidth}>
                            <h3>{trnsl('titleFullNameNational')}</h3>
                          </div>
                        </div>
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="lastNameNational">
                            <TextInput
                              name="publicProfile.lastNameNational"
                              label={trnsl('lastNameNational')}
                              required={true}
                            />
                          </div>
                        </div>
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="firstNameNational">
                            <TextInput
                              name="publicProfile.firstNameNational"
                              label={trnsl('firstNameNational')}
                              required={true}
                            />
                          </div>
                        </div>
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="patronymicNational">
                            <TextInput
                              name="publicProfile.middleNameNational"
                              label={trnsl('patronymicNational')}
                              required={true}
                            />
                          </div>
                        </div>
                      </div>
                      }
                      <div className={clss.group}>
                        <div className={clss.rowCenter}>
                          <div className={clss.defaultWidth}>
                            <h3>{trnsl('titleFullName')}</h3>
                            <div className={clss.hint}>{trnsl('hintTitleFullName')}</div>
                          </div>
                        </div>
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="firstName">
                            <TextInput
                              name="publicProfile.firstName"
                              label={trnsl('firstName')}
                              required={true}
                            />
                          </div>
                        </div>
                        {currentLocale.locale === 'en' &&
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="middleName">
                            <TextInput
                              name="publicProfile.middleName"
                              label={trnsl('middleName')}
                              required={true}
                            />
                          </div>
                        </div>
                        }
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="lastName">
                            <TextInput
                              name="publicProfile.lastName"
                              label={trnsl('lastName')}
                              required={true}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={clss.group}>
                        <div className={clss.rowCenter}>
                          <div className={clss.defaultWidth}>
                            <h3>{trnsl('titlePassport')}</h3>
                            <div className={clss.hint}>{trnsl('hintTitlePassport')}</div>
                          </div>
                        </div>
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="citizenship">
                            <TextInput
                              name="privateInfo.citizenship"
                              label={trnsl('citizenship')}
                              required={true}
                            />
                            <div className={clss.hint}>{trnsl('hintCitizenship')}</div>
                          </div>
                        </div>

                        {currentLocale.locale === 'ru' ?
                          <div className={clss.rowCenter}>
                            <div className={clss.defaultWidth}>
                              <div className={clss.rowBetween}>
                                <div id="passportNum" className={clss.fieldHalfWidth}>
                                  <TextInput
                                    name="officialPapers.0.identityUid"
                                    label={trnsl('passportNum')}
                                    required={true}
                                  />
                                </div>
                                <div className={clss.fieldHalfWidth} id="passportIssueDate">
                                  <div
                                    className={clss.hint + ' k-text-right'}>{trnsl('passportIssueDate')}</div>
                                  <DatePickerInput
                                    name={'officialPapers.0.issueDetails.0'}
                                    required={true}
                                    className="k-float-right"
                                  />
                                </div>
                              </div>
                            </div>
                          </div> :
                          <div className={clss.rowCenter}>
                            <div id="passportNum" className={clss.fieldDefaultWidth}>
                              <TextInput
                                name="officialPapers.0.identityUid"
                                label={trnsl('passportNum')}
                                required={true}
                              />
                            </div>
                          </div>
                        }

                        {currentLocale.locale === 'ru' &&
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="passportIssuer">
                            <TextInput
                              name="officialPapers.0.issueDetails.1"
                              label={trnsl('passportIssuer')}
                              required={true}
                            />
                          </div>
                        </div>
                        }

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="passportScan">
                            <Upload
                              name="passportScan"
                              label={trnsl('passportScan')}
                              batch={false}
                              multiple={true}
                              disabled={true}
                              restrictions={{
                                allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.tif'],
                                maxFileSize: 4000000
                              }}
                              defaultFiles={[]}
                              saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                              removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                            />
                            <span className="k-required">*</span>
                            <div className={clss.hint}>
                              <p>{trnsl('hintPassportScan1')}</p>
                              <ul>
                                <li>{trnsl('hintPassportScan2')}</li>
                                <li>{trnsl('hintPassportScan3')}</li>
                                <li>{trnsl('hintPassportScan3')}</li>
                              </ul>
                            </div>
                            <InputError
                              errEmpty={trnsl('valPassportScan')}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={clss.group}>
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="taxID">
                            <TextInput
                              name="officialPapers.1.identityUid"
                              label={trnsl('taxID')}
                              required={true}
                            />
                            <div className={clss.hint}>{trnsl('hintTaxID')}</div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <div className={clss.titleRowCenter}>
                      <h2>{trnsl('titleJobPayment')}</h2>
                    </div>
                    <section className={clss.section}>

                      <div className={clss.rowCenter}>
                        <div className={clss.fieldDefaultWidth} id="jobType">
                          <div className={clss.hint}>{trnsl('hintJobType')}</div>
                          <Ripple>
                            <div className={clss.rowBetween}>
                              <div className={clss.fieldHalfWidth}>
                                <input
                                  className="k-radio"
                                  type="radio"
                                  id="jobTypeFull"
                                  required={true}
                                  {...getFieldProps('privateInfo.fullTimeJob')}
                                  value="true"
                                  checked={getFieldProps('privateInfo.fullTimeJob').value === 'true'}
                                />
                                <label className="k-radio-label" htmlFor="jobTypeFull">
                                  {trnsl('jobTypeFull')}
                                </label>
                              </div>

                              <div className={clss.fieldHalfWidth}>
                                <input
                                  className="k-radio"
                                  type="radio"
                                  id="jobTypePart"
                                  required={true}
                                  {...getFieldProps('privateInfo.fullTimeJob')}
                                  value="false"
                                  checked={getFieldProps('privateInfo.fullTimeJob').value === 'false'}
                                />
                                <label className="k-radio-label" htmlFor="jobTypePart">
                                  {trnsl('jobTypePart')}</label>
                                <InputError
                                  errInvalid={errors['privateInfo.fullTimeJob']}
                                  errEmpty={trnsl('valJobType')}
                                />
                                <span className="k-required">*</span>
                              </div>
                            </div>
                          </Ripple>
                        </div>
                      </div>

                      <Ripple>
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth}>
                            <div className={clss.hint}>{trnsl('hintHasPay')}</div>
                            <Field className={'k-checkbox'} id="hasPay" type="checkbox"
                                   name="privateInfo.hasPayAccount"/>
                            <label htmlFor="hasPay" className="k-checkbox-label">
                              {trnsl('hasPay')}
                            </label>
                          </div>
                        </div>
                      </Ripple>

                      {values.privateInfo.hasPayAccount === true &&
                      <div className={clss.rowCenter}>
                        <div className={clss.fieldDefaultWidth} id="payName">
                          <div className={clss.hint}>{trnsl('hintPayName')}</div>
                          <TextInput
                            name="privateInfo.payName"
                            label={trnsl('payName')}
                            required={true}
                          />
                          <div className={clss.hint}>
                            <p><span style={{color: 'red'}}>
                          {trnsl('hintPayWarnHeader')}</span>
                              {trnsl('hintPayWarn')}
                            </p>
                          </div>
                        </div>

                        {/* todo: Implement. PayPopup is shown if firstName + lastName != payName, not implemented yet (I don't know how to compare them..) */}
                        {/*<PayPopup*/}
                        {/*  isToggled={this.togglePay}*/}
                        {/*  isShown={this.state.isPayShown}*/}
                        {/*  valPayWarnHeader={trnsl('valPayWarnHeader')}*/}
                        {/*  valPayWarn={trnsl('valPayWarn')}*/}
                        {/*  fieldTxt={trnsl('payReason')}*/}
                        {/*  valPayReason={trnsl('valPayReason')}*/}
                        {/*  btnSave={trnsl('btnSave')}*/}
                        {/*  value={this.state.payConfirm}*/}
                        {/*  validityStyles={this.state.payConfirmErrShown || false}*/}
                        {/*  handleChange={this.handleChange}*/}
                        {/*  handleBlur={this.handleBlur}*/}
                        {/*/>*/}
                      </div>
                      }
                    </section>

                    <div className={clss.titleRowCenter}>
                      <h2>{trnsl('titleContactDetailsBlock')}</h2>
                    </div>
                    <section className={clss.section}>
                      <div className={clss.group}>
                        <div className={clss.rowCenter}>
                          <div className={clss.defaultWidth}>
                            <h3>{trnsl('titlePostAddress')}</h3>
                            <div className={clss.hint}>{trnsl('hintTitlePostAddress')}</div>
                          </div>
                        </div>
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="addrPostCountry">
                            <TextInput
                              name="privateInfo.addressForCorrespondence.0"
                              label={trnsl('addrPostCountry')}
                              required={true}
                            />
                          </div>
                        </div>

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="addrPostRegion">
                            <TextInput
                              name="privateInfo.addressForCorrespondence.1"
                              label={trnsl('addrPostRegion')}
                            />
                          </div>
                        </div>

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="addrPostCity">
                            <TextInput
                              name="privateInfo.addressForCorrespondence.2"
                              label={trnsl('addrPostCity')}
                              required={true}
                            />
                          </div>
                        </div>

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="addrPostStreet">
                            <TextInput
                              name="privateInfo.addressForCorrespondence.3"
                              label={trnsl('addrPostStreet')}
                              required={true}
                            />
                          </div>
                        </div>

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="addrPostZip">
                            <TextInput
                              name="privateInfo.addressForCorrespondence.4"
                              label={trnsl('addrPostZip')}
                              required={true}
                            />
                          </div>
                        </div>
                      </div>

                      {currentLocale.locale === 'ru' &&
                      <div className={clss.group}>
                        <div className={clss.rowCenter}>
                          <div className={clss.defaultWidth}>
                            <h3>{trnsl('titleRegAddress')}</h3>
                          </div>
                        </div>

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth}>
                            <Field className={'k-checkbox'}
                                   id="isAddrTheSame"
                                   type="checkbox"
                                   name="_isAddrTheSame"/>
                            <label htmlFor="isAddrTheSame" className="k-checkbox-label">
                              {trnsl('isAddrTheSame')}
                            </label>
                          </div>
                        </div>

                        {!values._isAddrTheSame &&
                        <>
                          <div className={clss.rowCenter}>
                            <div className={clss.fieldDefaultWidth} id="addrRegCountry">
                              <div className={clss.hint}>{trnsl('hintTitleRegAddress')}</div>
                              <TextInput
                                name="privateInfo.addressOfPermanentResidence.0"
                                label={trnsl('addrRegCountry')}
                              />
                            </div>
                          </div>

                          <div className={clss.rowCenter}>
                            <div className={clss.fieldDefaultWidth} id="addrRegRegion">
                              <TextInput
                                name="privateInfo.addressOfPermanentResidence.1"
                                label={trnsl('addrRegRegion')}
                              />
                            </div>
                          </div>

                          <div className={clss.rowCenter}>
                            <div className={clss.fieldDefaultWidth} id="addrRegCity">
                              <TextInput
                                name="privateInfo.addressOfPermanentResidence.2"
                                label={trnsl('addrRegCity')}
                              />
                            </div>
                          </div>

                          <div className={clss.rowCenter}>
                            <div className={clss.fieldDefaultWidth} id="addrRegStreet">
                              <TextInput
                                name="privateInfo.addressOfPermanentResidence.3"
                                label={trnsl('addrRegStreet')}
                              />
                            </div>
                          </div>

                          <div className={clss.rowCenter}>
                            <div className={clss.fieldDefaultWidth} id="addrRegZip">
                              <TextInput
                                name="privateInfo.addressOfPermanentResidence.4"
                                label={trnsl('addrRegStreet')}
                              />
                            </div>
                          </div>
                        </>}
                      </div>
                      }
                      <div className={clss.group}>
                        <div className={clss.rowCenter}>
                          <h3 className={clss.defaultWidth}>{trnsl('titlePhoneMessengers')}</h3>
                        </div>

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="contactPhone">
                            <TextInput
                              name="publicProfile.otherContacts.primaryPhoneNumber"
                              label={trnsl('contactPhone')}
                              required={true}
                            />
                          </div>
                        </div>

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth}>
                            <Field className={'k-checkbox'}
                                   id="isWhatsappTheSame"
                                   type="checkbox"
                                   name="publicProfile.otherContacts._isWhatsAppSame"/>
                            <label htmlFor="isWhatsappTheSame" className="k-checkbox-label">
                              {trnsl('isWhatsappTheSame')}
                            </label>
                          </div>
                        </div>

                        {!values.publicProfile.otherContacts._isWhatsAppSame &&
                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="contactWhatsapp">
                            <TextInput
                              name="publicProfile.otherContacts.whatsAppPhoneNumber"
                              label={trnsl('contactWhatsapp')}
                              required={true}
                            />
                            <div className={clss.hint}>{trnsl('hintContactWhatsapp')}</div>
                          </div>
                        </div>
                        }

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="contactTelegram">
                            <TextInput
                              name="publicProfile.otherContacts.telegram"
                              label={trnsl('contactTelegram')}
                            />
                            <div className={clss.hint}>{trnsl('hintContactTelegram')}</div>
                          </div>
                        </div>

                        <div className={clss.rowCenter}>
                          <div className={clss.fieldDefaultWidth} id="contactSkype">
                            <TextInput
                              name="publicProfile.otherContacts.skype"
                              label={trnsl('contactSkype')}
                            />
                            <div className={clss.hint}>{trnsl('hintContactSkype')}</div>
                          </div>
                        </div>
                      </div>

                    </section>

                    <div className={clss.titleRowCenter}>
                      <h2>{trnsl('titleSocialBlock')}</h2>
                    </div>
                    <section className={clss.section + ' onboarding-form__social-section'}>
                      <div className={clss.rowCenter}>
                        <div
                          className={'onboarding-form__section-hint ' + clss.defaultWidth}>{trnsl('hintTitleSocialBlock')}</div>
                      </div>

                      <div className={clss.rowCenter + ' onboarding-form__social-container'}>
                        <div className={clss.defaultWidth}>
                          <FieldArray
                            name="socialContacts"
                            render={arrayHelpers => (
                              <div>
                                {values.socialContacts.map((socialContact, index) => (
                                    <div key={index}
                                         className={clss.rowBetween + " onboarding-form__social"}>
                                    <span className="icon-remove" onClick={() => arrayHelpers.remove(index)}>
                                      <i className="far fa-trash-alt"/>
									                  </span>
                                      <div className={clss.fieldHalfWidth} id={'socialType' + index}>
                                        <AutoComplete
                                          data={this.props.socialOptions}
                                          placeholder={trnsl('socialType')}
                                          {...getFieldProps(`socialContacts.${index}.name`)}
                                        />
                                      </div>
                                      <div className={clss.fieldHalfWidth} id={'social' + index}>
                                        <TextInput
                                          name={`socialContacts.${index}.value`}
                                          label={trnsl('social')}
                                        />
                                      </div>
                                    </div>
                                  ))
                                }
                                <span className="icon-add" onClick={() => arrayHelpers.push({name: '', value: ''})}>
                                  <i className="fas fa-plus-circle"/>
                                </span>
                              </div>
                            )}
                          />
                        </div>
                      </div>

                    </section>

                    <section className={clss.section}>
                    <div className={clss.rowCenter}>
                      <div className={clss.defaultWidth}>
                        <div className={clss.rowCenter}>
                          <div className="onboarding-form__general-error col-xl-8 col-lg-8 col-md-7 col-12">
                            {(Object.keys(errors).length > 0) && trnsl('errMsg')}
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-5 col-12">
                            {this.state.isFormSent ?
                              // wtf: why is this popup called by any btn?
                              // TODO: show error popup if no 200 received

                              // (<SentStatusPopup
                              //     isToggled={this.toggleSentStatusPopup}
                              //     isShown={this.state.isSentStatusPopupShown}
                              //     txtHeader={trnsl("sendErrorMsgHeader")}
                              //     txt={trnsl("sendErrorMsg")}
                              //     class="status-popup status-popup_send-error"
                              //   />)
                              (<SentStatusPopup
                                isToggled={this.toggleSentStatusPopup}
                                isShown={this.state.isSentStatusPopupShown}
                                txtHeader={trnsl('sentMsgHeader')}
                                txt={trnsl('sentMsg')}
                                class="status-popup status-popup_sent"
                              />)
                              :
                              (<Ripple>
                                <Button
                                  type="submit"
                                  className="k-button k-primary"
                                  disabled={Object.keys(errors).length > 0 ||
                                  Object.keys(touched).length === 0 ||
                                  isSubmitting}
                                >
                                  {trnsl('btnSubmit')}
                                  {Object.keys(errors).length > 0 ?
                                    <i className="fas fa-check btn-icon"/> :
                                    <i className="fas fa-times btn-icon"/>
                                  }
                                </Button>
                              </Ripple>)
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    </section>
                    <Update values={{
                      publicProfile,
                      privateInfo,
                      officialPapers
                    }}
                            name='onboarding-form'/>
                  </Form>
                )}
              </Formik>
            </>
          ) :
          <FormTerms
            currentLocale={currentLocale}
            showForm={this.showForm}
            titleFormTerms={trnsl('titleFormTerms')}
            btnTerms={trnsl('btnTerms')}
          />
        }
      </>
    )
  }
}

registerForLocalization(OnboardingForm)


const mapStateToProps = (state) => {
  const {currentUser} = state
  const {isFetching, userData} = currentUser

  return {
    userData,
    isFetching
  }
}

export default connect(mapStateToProps)(OnboardingForm)
