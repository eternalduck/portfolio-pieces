import {mergeWith, isMe} from 'immutable'

export const translateInUserPrivateInfo = (privateInfo) => {
  console.log(privateInfo)
  const result = Object.assign({}, privateInfo);
  const {addressForCorrespondence, addressOfPermanentResidence} = result
  result.addressForCorrespondence = addressForCorrespondence ? addressForCorrespondence.split('\n') : []
  result.addressOfPermanentResidence = addressOfPermanentResidence ? addressOfPermanentResidence.split('\n') : []
  result.fullTimeJob = JSON.stringify(result.fullTimeJob)
  return result
}
export const translateOfficialPapers = (officialPapers = []) => {
  return officialPapers.map(paper => {
    const {issueDetails} = paper
    console.log({issueDetails})
    if (issueDetails) {
      paper.issueDetails = paper.issueDetails.split('\n')
    }
    console.log({paper})
    return paper
  })
}
export const translatePublicProfile = (publicProfile = {}) => {
  const result = {...publicProfile}
  if (!result.otherContacts) result.otherContacts = {}
  console.log({result})
  const contactKeys = ['skype', 'telegram', 'contactWhatsapp', 'primaryPhoneNumber']
  const {otherContacts} = result
  result.socialContacts = []
  for (const key of Object.getOwnPropertyNames(otherContacts)) {
    if (!contactKeys.includes(key)) {
      result.socialContacts.push({name: key, value: otherContacts[key]})
      delete otherContacts[key]
    }
  }
  result.otherContacts = otherContacts
  return result
}

const isMergeable = (a) => (
    a && typeof a === 'object' && !Array.isArray(a)
)

export const mergeDeepOverwriteLists = (a, b) => {
  if (b === null) return b

  if (isMergeable(a) &&  !Array.isArray(a)) {
    return mergeWith(mergeDeepOverwriteLists, a, b)
  }

  return b
}