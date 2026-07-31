'use server'

import config from '@payload-config'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

const cleanString = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value.trim() : '')

const toPositiveNumber = (value: FormDataEntryValue | null) => {
  const amount = Number(cleanString(value))

  return Number.isFinite(amount) && amount >= 0 ? amount : undefined
}

const toSafePath = (value: string) => value.replace(/[^a-z0-9=&?_-]/gi, '')

export async function submitTechnicianQuotation(formData: FormData) {
  const bookingId = Number(cleanString(formData.get('booking')))
  const technicianName = cleanString(formData.get('technicianName'))
  const technicianPhone = cleanString(formData.get('technicianPhone'))
  const inspectionNotes = cleanString(formData.get('inspectionNotes'))
  const description = cleanString(formData.get('description'))
  const itemAmount = toPositiveNumber(formData.get('itemAmount'))
  const laborCharge = toPositiveNumber(formData.get('laborCharge')) ?? 0
  const partsCharge = toPositiveNumber(formData.get('partsCharge')) ?? 0

  if (!bookingId || !technicianName || !technicianPhone || !inspectionNotes || !description || itemAmount === undefined) {
    redirect('/technician/quotation?status=missing')
  }

  const payload = await getPayload({ config })

  try {
    const booking = await payload.findByID({
      collection: 'bookings',
      id: bookingId,
      depth: 0,
      overrideAccess: true,
    })

    if (typeof booking.customer !== 'number') {
      redirect('/technician/quotation?status=invalid-booking')
    }

    await payload.create({
      collection: 'quotations',
      data: {
        booking: bookingId,
        customer: booking.customer,
        inspectionNotes,
        laborCharge,
        lineItems: [
          {
            amount: itemAmount,
            description,
          },
        ],
        partsCharge,
        status: 'submitted',
        technicianName,
        technicianPhone,
        totalAmount: itemAmount + laborCharge + partsCharge,
      },
      overrideAccess: true,
    })
  } catch {
    redirect('/technician/quotation?status=invalid-booking')
  }

  redirect(`/technician/quotation?${toSafePath('status=submitted')}`)
}
