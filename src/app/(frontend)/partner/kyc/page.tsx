import { Buffer } from 'node:buffer'

import config from '@payload-config'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload, type File as PayloadFile } from 'payload'

import type { PartnerApplication } from '@/payload-types'
import {
  detailCardClass,
  detailGridClass,
  eyebrowClass,
  formErrorClass,
  formPanelClass,
  formTwoColumnClass,
  inputClass,
  labelClass,
  panelHeadingClass,
  panelKickerClass,
  panelNoteClass,
  panelTitleClass,
  partnerAdminStepClass,
  partnerAdminStepsClass,
  partnerHeroClass,
  partnerReviewCardClass,
  primaryActionClass,
  secondaryActionClass,
  PageShell,
} from '../../components'
import { getSitePages } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

type KYCPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

const toOptionalString = (value: FormDataEntryValue | null) => {
  if (typeof value !== 'string') return undefined

  const trimmedValue = value.trim()

  return trimmedValue.length > 0 ? trimmedValue : undefined
}

const toRequiredString = (value: FormDataEntryValue | null) => toOptionalString(value) ?? ''

const toSingleParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

const toPayloadFile = async (file: File): Promise<PayloadFile> => ({
  data: Buffer.from(await file.arrayBuffer()),
  mimetype: file.type || 'application/octet-stream',
  name: file.name,
  size: file.size,
})

const isProvidedFile = (value: FormDataEntryValue | null): value is File =>
  value instanceof File && value.size > 0

const kycCardClass = `${detailCardClass} grid gap-4`
const kycSummaryClass = 'grid grid-cols-2 gap-2.5 max-[760px]:grid-cols-1'
const kycSummaryItemClass =
  'grid gap-[3px] rounded-md border border-[rgba(9,107,104,0.12)] bg-[#eef4f0] p-3 text-[0.9rem] text-[#60706b]'
const kycSummaryLabelClass = 'text-[0.78rem] font-bold uppercase text-[#17221f]'
const kycActionRowClass = 'flex flex-wrap gap-2.5 max-[760px]:grid'
const kycTitleClass =
  'text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.02] tracking-[0] max-[760px]:max-w-[300px] max-[760px]:text-[1.7rem] max-[760px]:leading-[1.12]'
const kycCopyClass = 'leading-[1.55] text-[#60706b] max-[760px]:max-w-[300px]'

async function submitPartnerKYC(formData: FormData) {
  'use server'

  const applicationId = Number(toRequiredString(formData.get('applicationId')))
  const govtIdNumber = toRequiredString(formData.get('govtIdNumber'))
  const bankAccountName = toRequiredString(formData.get('bankAccountName'))
  const bankName = toRequiredString(formData.get('bankName'))
  const accountNumber = toRequiredString(formData.get('accountNumber'))
  const ifscCode = toRequiredString(formData.get('ifscCode')).toUpperCase()
  const govtIdFile = formData.get('govtIdFile')
  const partnerPhoto = formData.get('partnerPhoto')

  if (
    !Number.isInteger(applicationId) ||
    !govtIdNumber ||
    !bankAccountName ||
    !bankName ||
    !accountNumber ||
    !ifscCode ||
    !isProvidedFile(govtIdFile) ||
    !isProvidedFile(partnerPhoto)
  ) {
    redirect(`/partner/kyc?application=${applicationId || ''}&error=missing`)
  }

  const payload = await getPayload({ config })

  const application = await payload.findByID({
    collection: 'partner-applications',
    id: applicationId,
  })

  if (!application) {
    redirect('/partner/kyc?error=application')
  }

  const [uploadedGovtId, uploadedPhoto] = await Promise.all([
    payload.create({
      collection: 'media',
      data: {
        alt: `${application.applicantName} government ID`,
      },
      file: await toPayloadFile(govtIdFile),
    }),
    payload.create({
      collection: 'media',
      data: {
        alt: `${application.applicantName} partner photo`,
      },
      file: await toPayloadFile(partnerPhoto),
    }),
  ])

  await payload.create({
    collection: 'partner-kyc-submissions',
    data: {
      accountNumber,
      bankAccountName,
      bankName,
      govtIdFile: uploadedGovtId.id,
      govtIdNumber,
      ifscCode,
      partnerApplication: applicationId,
      partnerPhoto: uploadedPhoto.id,
      status: 'submitted',
    },
  })

  await payload.update({
    collection: 'partner-applications',
    id: applicationId,
    data: {
      kycStatus: 'submitted',
    },
  })

  redirect('/partner/kyc?submitted=1')
}

const getApplication = async (applicationParam: string | undefined) => {
  const applicationId = Number(applicationParam)

  if (!Number.isInteger(applicationId) || applicationId <= 0) {
    return null
  }

  const payload = await getPayload({ config })

  return payload.findByID({
    collection: 'partner-applications',
    id: applicationId,
  })
}

export default async function PartnerKYCPage({ searchParams }: KYCPageProps) {
  const [params, pages] = await Promise.all([searchParams, getSitePages()])
  const submitted = params?.submitted === '1'
  const showForm = params?.step === 'form'
  const hasMissingFields = params?.error === 'missing'
  const hasApplicationError = params?.error === 'application'
  const applicationParam = toSingleParam(params?.application)
  const application = submitted ? null : ((await getApplication(applicationParam)) as PartnerApplication | null)

  return (
    <PageShell>
      <section className={partnerHeroClass}>
        <div className="max-w-[1120px] max-[760px]:max-w-80">
          <span className={`${eyebrowClass} text-[#f2bd2b]`}>{pages.kyc.eyebrow}</span>
          <h1 className="mt-[18px] max-w-[900px] text-[clamp(2.6rem,6.2vw,5.9rem)] font-black leading-[0.95] tracking-[0] text-white max-[760px]:text-[clamp(1.86rem,8.6vw,2.12rem)] max-[760px]:leading-[1.1]">
            {pages.kyc.title}
          </h1>
          <p className="mt-[18px] max-w-[760px] text-[1.08rem] text-white/80 max-[760px]:max-w-80 max-[760px]:text-[0.96rem] max-[760px]:leading-[1.48]">
            {pages.kyc.copy}
          </p>
        </div>
      </section>

      <section className={`${detailGridClass} items-start max-[760px]:gap-3 max-[760px]:px-3.5 max-[760px]:pb-10 max-[760px]:pt-[22px]`}>
        {submitted ? (
          <article className={kycCardClass}>
            <span className={eyebrowClass}>{pages.kyc.submittedEyebrow}</span>
            <h2 className={kycTitleClass}>{pages.kyc.submittedTitle}</h2>
            <p className={kycCopyClass}>
              {pages.kyc.submittedCopy}
            </p>
          </article>
        ) : application && !showForm && !hasMissingFields ? (
          <article className={`${kycCardClass} gap-[18px]`}>
            <span className={eyebrowClass}>{pages.kyc.applicationEyebrow}</span>
            <h2 className={kycTitleClass}>{pages.kyc.applicationTitle}</h2>
            <p className={kycCopyClass}>
              {pages.kyc.applicationCopy}
            </p>
            <div className={kycSummaryClass}>
              <span className={kycSummaryItemClass}>
                <strong className={kycSummaryLabelClass}>Applicant</strong>
                {application.applicantName}
              </span>
              <span className={kycSummaryItemClass}>
                <strong className={kycSummaryLabelClass}>Status</strong>
                KYC pending
              </span>
            </div>
            <div className={kycActionRowClass}>
              <Link className={`${primaryActionClass} max-[760px]:w-full`} href={`/partner/kyc?application=${application.id}&step=form`}>
                {pages.kyc.continueLabel}
              </Link>
              <Link className={`${secondaryActionClass} max-[760px]:w-full`} href="/">
                {pages.kyc.laterLabel}
              </Link>
            </div>
          </article>
        ) : application ? (
          <form action={submitPartnerKYC} className={formPanelClass}>
            <input name="applicationId" type="hidden" value={application.id} />
            <div className={panelHeadingClass}>
              <span className={panelKickerClass}>{pages.kyc.formKicker}</span>
              <strong className={panelTitleClass}>{application.applicantName}</strong>
            </div>

            {hasMissingFields ? (
              <p className={formErrorClass} role="alert">
                {pages.kyc.missingFieldsMessage}
              </p>
            ) : null}

            <label className={labelClass}>
              Government ID number
              <input className={inputClass} name="govtIdNumber" required type="text" />
            </label>

            <label className={labelClass}>
              Government ID photo
              <input className={`${inputClass} cursor-pointer py-[9px] max-[760px]:text-[0.84rem]`} accept="image/*" name="govtIdFile" required type="file" />
            </label>

            <div className={formTwoColumnClass}>
              <label className={labelClass}>
                Account holder name
                <input className={inputClass} autoComplete="name" name="bankAccountName" required type="text" />
              </label>
              <label className={labelClass}>
                Bank name
                <input className={inputClass} name="bankName" required type="text" />
              </label>
            </div>

            <div className={formTwoColumnClass}>
              <label className={labelClass}>
                Account number
                <input className={inputClass} inputMode="numeric" name="accountNumber" required type="text" />
              </label>
              <label className={labelClass}>
                IFSC code
                <input className={inputClass} name="ifscCode" required type="text" />
              </label>
            </div>

            <label className={labelClass}>
              Partner photo
              <input className={`${inputClass} cursor-pointer py-[9px] max-[760px]:text-[0.84rem]`} accept="image/*" name="partnerPhoto" required type="file" />
            </label>

            <button className={`${primaryActionClass} mt-1 cursor-pointer`} type="submit">{pages.kyc.submitLabel}</button>
            <p className={panelNoteClass}>{pages.kyc.formNote}</p>
          </form>
        ) : (
          <article className={kycCardClass}>
            <span className={eyebrowClass}>{pages.kyc.applicationNeededEyebrow}</span>
            <h2 className={kycTitleClass}>{pages.kyc.applicationNeededTitle}</h2>
            <p className={kycCopyClass}>
              {pages.kyc.applicationNeededCopy}
            </p>
            {hasApplicationError ? (
              <p className={formErrorClass} role="alert">
                {pages.kyc.applicationErrorMessage}
              </p>
            ) : null}
            <Link className={`${primaryActionClass} justify-self-start max-[760px]:w-full`} href="/partner">
              {pages.kyc.partnerFormLabel}
            </Link>
          </article>
        )}

        <article className={partnerReviewCardClass}>
          <span className={eyebrowClass}>{pages.kyc.adminEyebrow}</span>
          <h2 className={kycTitleClass}>{pages.kyc.adminTitle}</h2>
          <p className={kycCopyClass}>
            {pages.kyc.adminCopy}
          </p>
          <div className={partnerAdminStepsClass}>
            {pages.kyc.adminStatuses.map((status) => (
              <span className={partnerAdminStepClass} key={status}>{status}</span>
            ))}
          </div>
        </article>
      </section>
    </PageShell>
  )
}
