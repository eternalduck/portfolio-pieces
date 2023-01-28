import * as Yup from 'yup'

const signupSchemaRu = translate => {
  const schema = Yup.object().shape({
    publicProfile: Yup.object().shape({
      firstNameNational: Yup.string()
        .matches(/[a-zA-Zа-яА-ЯҐЄІЇґєіїЎў\s]/, translate('valFirstNameNational'))
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required(translate('valEmpty')),
      lastNameNational: Yup.string()
        .matches(/[a-zA-Zа-яА-ЯҐЄІЇґєіїЎў\s]/, translate('valLastNameNational'))
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required(translate('valEmpty')),
      middleNameNational: Yup.string()
        .matches(/[a-zA-Zа-яА-ЯҐЄІЇґєіїЎў\s]/, translate('valPatronymicNational'))
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required(translate('valEmpty')),
      firstName: Yup.string()
        .matches(/[a-zA-Z\-\s]/, translate('valFirstName'))
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required(translate('valEmpty')),
      lastName: Yup.string()
        .matches(/[a-zA-Z\-\s]/, translate('valLastName'))
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required(translate('valEmpty')),
      otherContacts: Yup.object().shape({
        primaryPhoneNumber: Yup.string()
          .min(1)
          .max(24)
          .matches(/^[0-9\s+()-]+$/, translate('valContactPhone'))
          .required(translate('valEmpty')),
        _isWhatsAppSame: Yup.bool(),
        whatsAppPhoneNumber: Yup.string()
          .min(1)
          .max(24)
          .test('whatsAppPhoneNumber',
            translate('valEmpty'),
            function(value) {
              const isNotRequired = this.parent._isWhatsAppSame
              const matches = value ? /^[0-9\s+()-]+$/.test(value) : false
              if (isNotRequired) {
                return true
              } else if (!matches) {
                return this.createError({message: translate('valContactPhone')})
              } else {
                return true
              }
          })
      })
    }),
    privateInfo: Yup.object().shape({
      citizenship: Yup.string()
        .min(2)
        .max(100)
        .required(translate('valEmpty')),
      hasPayAccount: Yup.bool(),
      payName: Yup.string()
        .matches(/[a-zA-Z\\s-]{1,100}/, translate('valPayName'))
    }),
    // officialPapers: Yup.array().of(
    //   Yup.object().shape({
    //     identityUid: Yup.string()
    //       .matches(/[a-zA-Zа-яА-ЯҐЄІЇґєіїЎў\s]/, translate('valPassportNum'))
    //       .min(4)
    //       .max(80)
    //       .required(translate('valEmpty')),
    //     issueDetails: Yup.array().of(
    //       Yup.string()
    //       .required(translate('valEmpty')),
    //     )
    //   })
    // )
  })
  return schema
}

const signupSchemaEn = translate => Yup.object().shape({
  publicProfile: Yup.object().shape({
    firstName: Yup.string()
      .matches(/[a-zA-Z\-\s]/, translate('valFirstName'))
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required(translate('valEmpty')),
    middleName: Yup.string()
      .matches(/[a-zA-Z\-\s]/, translate('valMiddleName'))
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required(translate('valEmpty')),
    lastName: Yup.string()
      .matches(/[a-zA-Z\-\s]/, translate('valLastName'))
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required(translate('valEmpty')),
  }),
  privateInfo: Yup.object().shape({
    citizenship: Yup.string()
      .min(2)
      .max(100)
      .required(translate('valEmpty'))
  }),
  // officialPapers: Yup.object().shape({
  //   doc0: Yup.object().shape({
  //     identityUid: Yup.string()
  //       .matches(/[a-zA-Zа-яА-ЯҐЄІЇґєіїЎў\s]/, translate('valPassportNum'))
  //       .min(4)
  //       .max(80)
  //       .required(translate('valEmpty'))
  //   }),
  //   doc1: Yup.object().shape({
  //     identityUid: Yup.string()
  //       .matches(/[a-zA-Zа-яА-ЯҐЄІЇґєіїЎў\s]/, translate('valPassportNum'))
  //       .min(4)
  //       .max(80)
  //       .required(translate('valEmpty'))
  //   })
  // })
})

export const signupSchemaFactory = (locale = 'ru', translate) => {
  if (locale === 'ru') {
    return signupSchemaRu(translate)
  } else {
    return signupSchemaEn(translate)
  }
}