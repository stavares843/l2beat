import z from 'zod'

export const VerificationStatus = z.object({
  projects: z.record(z.optional(z.boolean())),
  // devId => address => boolean
  contracts: z.record(z.optional(z.record(z.optional(z.boolean())))),
})
export type VerificationStatus = z.infer<typeof VerificationStatus>
