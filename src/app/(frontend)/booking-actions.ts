'use server'

import config from '@payload-config'
import { login, logout } from '@payloadcms/next/auth'
import { headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { createLocalReq, getPayload } from 'payload'

const cleanString = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value.trim() : '')

const timeSlots = ['09:00', '10:00', '14:00', '17:00'] as const

type TimeSlot = (typeof timeSlots)[number]

const isTimeSlot = (value: string): value is TimeSlot => timeSlots.includes(value as TimeSlot)

const toCoordinate = (value: FormDataEntryValue | null, min: number, max: number) => {
  const coordinate = Number(cleanString(value))

  if (!Number.isFinite(coordinate) || coordinate < min || coordinate > max) {
    return undefined
  }

  return coordinate
}

const toSafeNextPath = (value: FormDataEntryValue | null) => {
  const path = cleanString(value)

  return path.startsWith('/') && !path.startsWith('//') ? path : '/account/bookings'
}

const getPayloadAndUser = async () => {
  const payload = await getPayload({ config })
  const headers = await nextHeaders()
  const auth = await payload.auth({ headers })

  return { auth, payload }
}

export async function submitBooking(formData: FormData) {
  const serviceId = Number(cleanString(formData.get('service')))
  const scheduledDate = cleanString(formData.get('date'))
  const timeSlotValue = cleanString(formData.get('time'))
  const phone = cleanString(formData.get('phone'))
  const address = cleanString(formData.get('address'))
  const locationLatitude = toCoordinate(formData.get('locationLatitude'), -90, 90)
  const locationLongitude = toCoordinate(formData.get('locationLongitude'), -180, 180)
  const returnTo = toSafeNextPath(formData.get('returnTo'))
  const hasLocation = locationLatitude !== undefined && locationLongitude !== undefined
  const locationMapLink = hasLocation
    ? `https://www.google.com/maps?q=${locationLatitude.toFixed(6)},${locationLongitude.toFixed(6)}`
    : undefined

  if (!serviceId || !scheduledDate || !isTimeSlot(timeSlotValue) || !phone || !address) {
    redirect(`${returnTo}?booking=missing`)
  }

  const { auth, payload } = await getPayloadAndUser()

  if (!auth.user || auth.user.collection !== 'customers') {
    redirect(`/login?next=${encodeURIComponent(returnTo)}`)
  }

  const req = await createLocalReq({ user: auth.user }, payload)
  const service = await payload.findByID({
    collection: 'services',
    id: serviceId,
    depth: 0,
    req,
  })

  await payload.create({
    collection: 'bookings',
    data: {
      address,
      customer: auth.user.id,
      estimatedPrice: service.basePrice,
      locationLatitude,
      locationLongitude,
      locationMapLink,
      phone,
      scheduledDate,
      service: serviceId,
      serviceName: service.name,
      status: 'pending',
      timeSlot: timeSlotValue,
    },
    draft: false,
    overrideAccess: false,
    req,
  })

  redirect('/account/bookings?created=1')
}

export async function loginCustomer(formData: FormData) {
  const email = cleanString(formData.get('email')).toLowerCase()
  const password = cleanString(formData.get('password'))
  const next = toSafeNextPath(formData.get('next'))

  if (!email || !password) {
    redirect(`/login?error=missing&next=${encodeURIComponent(next)}`)
  }

  try {
    await login({
      collection: 'customers',
      config,
      email,
      password,
    })
  } catch {
    redirect(`/login?error=invalid&next=${encodeURIComponent(next)}`)
  }

  redirect(next)
}

export async function registerCustomer(formData: FormData) {
  const email = cleanString(formData.get('email')).toLowerCase()
  const password = cleanString(formData.get('password'))
  const next = toSafeNextPath(formData.get('next'))

  if (!email || password.length < 8) {
    redirect(`/register?error=invalid&next=${encodeURIComponent(next)}`)
  }

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'customers',
      data: {
        email,
        password,
      },
    })
  } catch {
    redirect(`/register?error=exists&next=${encodeURIComponent(next)}`)
  }

  await login({
    collection: 'customers',
    config,
    email,
    password,
  })

  redirect(next)
}

export async function logoutCustomer() {
  await logout({ config })

  redirect('/login')
}
