import {
  cn,
  formErrorClass,
  formPanelClass,
  formSuccessClass,
  inputClass,
  labelClass,
  PageShell,
  panelHeadingClass,
  panelKickerClass,
  panelNoteClass,
  panelTitleClass,
  primaryActionClass,
  textareaClass,
} from '../../components'
import { submitTechnicianQuotation } from './actions'

export const dynamic = 'force-dynamic'

type TechnicianQuotationPageProps = {
  searchParams: Promise<{
    booking?: string
    status?: string
  }>
}

const statusMessage: Record<string, string> = {
  'invalid-booking': 'Booking ID was not found. Please check the booking ID and submit again.',
  missing: 'Please fill all required quotation details.',
  submitted: 'Quotation sent to admin successfully.',
}

export default async function TechnicianQuotationPage({ searchParams }: TechnicianQuotationPageProps) {
  const params = await searchParams
  const message = params.status ? statusMessage[params.status] : undefined

  return (
    <PageShell>
      <section className="bg-[#f6f3ed] px-[clamp(18px,4vw,56px)] py-[clamp(34px,5vw,64px)]">
        <div className="mx-auto max-w-[520px]">
          <form action={submitTechnicianQuotation} className={formPanelClass}>
            <div className={panelHeadingClass}>
              <span className={panelKickerClass}>For technicians only</span>
              <strong className={panelTitleClass}>Site quotation</strong>
            </div>
            {message ? (
              <p className={params.status === 'submitted' ? formSuccessClass : formErrorClass}>{message}</p>
            ) : null}
            <label className={labelClass}>
              Booking ID
              <input className={inputClass} defaultValue={params.booking ?? ''} min="1" name="booking" required type="number" />
            </label>
            <div className="grid grid-cols-2 gap-3.5 max-[760px]:grid-cols-1">
              <label className={labelClass}>
                Technician name
                <input className={inputClass} name="technicianName" required type="text" />
              </label>
              <label className={labelClass}>
                Technician phone
                <input className={inputClass} name="technicianPhone" required type="tel" />
              </label>
            </div>
            <label className={labelClass}>
              Work / material quotation
              <textarea
                className={textareaClass}
                name="description"
                placeholder="Example: Replace leaking tap, new pipe fittings, labor"
                required
                rows={3}
              />
            </label>
            <div className="grid grid-cols-3 gap-3.5 max-[760px]:grid-cols-1">
              <label className={labelClass}>
                Item amount
                <input className={inputClass} min="0" name="itemAmount" required type="number" />
              </label>
              <label className={labelClass}>
                Labor charge
                <input className={inputClass} defaultValue="0" min="0" name="laborCharge" required type="number" />
              </label>
              <label className={labelClass}>
                Parts charge
                <input className={inputClass} defaultValue="0" min="0" name="partsCharge" required type="number" />
              </label>
            </div>
            <label className={labelClass}>
              Inspection notes
              <textarea
                className={textareaClass}
                name="inspectionNotes"
                placeholder="Write what you checked, what issue you found, and any client doubts cleared."
                required
                rows={4}
              />
            </label>
            <button className={cn(primaryActionClass, 'w-full cursor-pointer')} type="submit">
              Send quotation to admin
            </button>
            <p className={panelNoteClass}>This quotation is not final for the client until admin reviews and sends it.</p>
          </form>
        </div>
      </section>
    </PageShell>
  )
}
