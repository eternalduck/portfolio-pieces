// import {getCurrentUser, savePrivateInfo, savePublicProfile, saveUserDocument} from '../api_resources/fetchResource' - deleted


export const REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER'
function requestCurrentUser(currentUser) {
  return {
    type: REQUEST_CURRENT_USER,
    currentUser
  }
}

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
function receiveCurrentUser(currentUser) {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  }
}

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
function updateCurrentUser(currentUser) {
  return {
    type: UPDATE_CURRENT_USER,
    currentUser
  }
}

const removeTechnicalKeys = (obj) => {
  const result = Object.assign({}, obj)
  Object.keys(result).forEach(key => {
    if (/^_/.test(key)) delete result[key]
  })
  return result
}

const prepareUserPublicProfile = (publicProfile = {}, socialContacts = []) => {
  let result = Object.assign({}, publicProfile);
  socialContacts.forEach(entry => {
    result.otherContacts[entry.name] = entry.value
  })
  result.otherContacts = removeTechnicalKeys(result.otherContacts)
  result = removeTechnicalKeys(result)
  return result
}

const prepareUserPrivateInfo = (privateInfo = {}) => {
  const result = Object.assign({}, privateInfo)
  result.addressForCorrespondence = result.addressForCorrespondence.join('\n')
  result.addressOfPermanentResidence = result.addressOfPermanentResidence.join('\n')
  return result
}

const prepareUserOfficialPapers = (officialPapers = []) => {
  return officialPapers.map(paper => {
    const preparedPaper = Object.assign({}, paper)
    const {issueDetails} = preparedPaper
    if (issueDetails && Array.isArray(issueDetails)) {
      preparedPaper.issueDetails = issueDetails.join('\n')
    }
    return preparedPaper
  })
}

export const saveCurrentUser = (formData) => (dispatch, getState) => {
  const state = getState()
  const {publicProfile, privateInfo, officialPapers, socialContacts} = formData
  const readyUserPublicProfile = prepareUserPublicProfile(publicProfile, socialContacts)
  const readyUserPrivateInfo = prepareUserPrivateInfo(privateInfo)
  const readyUserOfficialPapers = prepareUserOfficialPapers(officialPapers)
  dispatch(updateCurrentUser({}))


  const promiseSaveUser = [
    // savePublicProfile(state.currentUser.userData.id, readyUserPublicProfile),
    // savePrivateInfo(state.currentUser.userData.id, readyUserPrivateInfo),
  ]
  readyUserOfficialPapers.forEach(paper => {
    // promiseSaveUser.push(saveUserDocument(state.currentUser.userData.id, paper))
  })
  return Promise.all(promiseSaveUser)
    .then(([publicProfile, privateInfo, ...officialPapers]) => {
      const userInfoUpdate = {
        publicProfile,
        privateInfo,
        officialPapers
      }
      dispatch(receiveCurrentUser(userInfoUpdate))
    })
}

function fetchCurrentUser() {
//   return dispatch => {
//     dispatch(requestCurrentUser({}))
//     return getCurrentUser()
//       .then(currentUser => {
//         dispatch(receiveCurrentUser(currentUser))
//       })
//   }
}

function shouldFetchCurrentUser(state) {
  const currentUser = state.currentUser
  if (!currentUser) {
    return true
  } else if (currentUser.isFetching) {
    return false
  } else {
    return currentUser
  }
}

export const fetchCurrentUserIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchCurrentUser(getState())) {
    return dispatch(fetchCurrentUser())
  } else {
    return Promise.resolve()
  }
}
