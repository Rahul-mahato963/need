'use client'

import { useState } from 'react'

type LocationState =
  | {
      mapLink: string
      message: string
      status: 'ready'
      latitude: string
      longitude: string
    }
  | {
      mapLink: ''
      message: string
      status: 'error' | 'idle' | 'loading'
      latitude: ''
      longitude: ''
    }

function MapPinIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 21s7-5.25 7-12a7 7 0 1 0-14 0c0 6.75 7 12 7 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12 12.25a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path
        d="m5 12.5 4.2 4.2L19.5 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  )
}

export function BookingLocationPicker() {
  const [location, setLocation] = useState<LocationState>({
    latitude: '',
    longitude: '',
    mapLink: '',
    message: 'Optional: share your live map location for easier provider arrival.',
    status: 'idle',
  })
  const isReady = location.status === 'ready'
  const isLoading = location.status === 'loading'

  return (
    <div className="grid gap-2 rounded-md border border-[#dbe5df] bg-[#f8faf8] p-3">
      <input name="locationLatitude" type="hidden" value={location.latitude} />
      <input name="locationLongitude" type="hidden" value={location.longitude} />
      <input name="locationMapLink" type="hidden" value={location.mapLink} />
      <button
        className={
          isReady
            ? 'inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#236334] bg-[#e8f4ec] px-3 py-2 text-[0.9rem] font-black text-[#236334]'
            : 'inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#096b68] bg-white px-3 py-2 text-[0.9rem] font-black text-[#096b68] disabled:cursor-wait disabled:opacity-70'
        }
        disabled={isLoading}
        onClick={() => {
          if (!navigator.geolocation) {
            setLocation({
              latitude: '',
              longitude: '',
              mapLink: '',
              message: 'Location sharing is not supported on this browser.',
              status: 'error',
            })
            return
          }

          setLocation({
            latitude: '',
            longitude: '',
            mapLink: '',
            message: 'Requesting location permission...',
            status: 'loading',
          })

          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude.toFixed(6)
              const longitude = position.coords.longitude.toFixed(6)

              setLocation({
                latitude,
                longitude,
                mapLink: `https://www.google.com/maps?q=${latitude},${longitude}`,
                message: 'Location added to this booking.',
                status: 'ready',
              })
            },
            () => {
              setLocation({
                latitude: '',
                longitude: '',
                mapLink: '',
                message: 'Location permission was not allowed. You can still submit with your address.',
                status: 'error',
              })
            },
            {
              enableHighAccuracy: true,
              maximumAge: 30000,
              timeout: 12000,
            },
          )
        }}
        type="button"
      >
        {isReady ? <CheckIcon /> : <MapPinIcon />}
        {isLoading ? 'Getting location...' : isReady ? 'Location added' : 'Use my current location'}
      </button>
      <p
        className={
          location.status === 'error'
            ? 'text-[0.84rem] font-bold leading-[1.45] text-[#a7341f]'
            : isReady
              ? 'text-[0.84rem] font-bold leading-[1.45] text-[#236334]'
            : 'text-[0.84rem] leading-[1.45] text-[#60706b]'
        }
      >
        {location.message}
      </p>
      {location.mapLink ? (
        <a className="text-[0.84rem] font-black text-[#096b68]" href={location.mapLink} rel="noreferrer" target="_blank">
          Open map preview
        </a>
      ) : null}
    </div>
  )
}
