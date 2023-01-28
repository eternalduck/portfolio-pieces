import {mergeDeepWith} from 'immutable';
import {
  RECEIVE_CURRENT_USER,
  REQUEST_CURRENT_USER,
  UPDATE_CURRENT_USER,
} from '../actions'
import {currentUser as defaultState} from '../state/currentUser';
import {
  mergeDeepOverwriteLists,
  translateInUserPrivateInfo,
  translateOfficialPapers,
  translatePublicProfile
} from '../helperFunc';

const transformCurrentUser = (userData) => {
  let {email, publicProfile, privateInfo, officialPapers} = userData
  if (!publicProfile) publicProfile = {}
  if (!privateInfo) privateInfo = {}
  if (!officialPapers) officialPapers = []
  if (!publicProfile.googleEmail) {
    publicProfile.googleEmail = email
  }
  return {
    ...userData,
    publicProfile: translatePublicProfile(publicProfile),
    privateInfo: translateInUserPrivateInfo(privateInfo),
    officialPapers: translateOfficialPapers(officialPapers)
  }
}

export const currentUser = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return mergeDeepOverwriteLists(
        state,
        {userData: transformCurrentUser(action.currentUser), isFetching: false},
      )
    case REQUEST_CURRENT_USER:
      return Object.assign({}, state, defaultState, {
        isFetching: true
      })
    case UPDATE_CURRENT_USER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    default:
      break
  }
  return state
}