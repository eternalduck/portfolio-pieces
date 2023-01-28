import {publicProfile} from './userPublicProflile'
import {privateInfo} from './userPrivateInfo'

export const currentUser = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: undefined,
  userData: {
    id: undefined,
    email: 'loading...',
    userGroupId: undefined,
    publicProfile,
    privateInfo,
    officialPapers: []
  }
}