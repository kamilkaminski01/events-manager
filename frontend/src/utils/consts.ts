const url = window.location

export const API_URL =
  url.port !== '' ? `${url.protocol}//${url.hostname}:4000/api/v1` : `${url.origin}/api/`

export const PATHS = {
  home: '/',
  homeWithEvents: '/#events',
  participant: '/participant',
  participantDetails: '/participant/:id',
  event: '/event',
  eventDetails: '/event/:id'
}

export const ENDPOINTS = {
  participants: 'participants/',
  participantDetails: 'participants/:id/',
  events: 'events/',
  eventDetails: 'events/:id/'
}
