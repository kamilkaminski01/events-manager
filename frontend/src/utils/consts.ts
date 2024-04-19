const url = window.location

export const API_URL =
  url.port !== '' ? `${url.protocol}//${url.hostname}:4000/api/v1` : `${url.origin}/api/`

export const PATHS = {
  home: '/',
  register: '/register',
  event: '/event'
}

export const ENDPOINTS = {
  participants: 'participants/',
  participantDetails: 'participants/:id/details/',
  deleteParticipant: 'participants/:id/delete/'
}
