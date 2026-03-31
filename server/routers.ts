import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createLead, getLeads } from "./db";
import { sendLeadEmail } from "./_core/mail";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Naam is verplicht"),
          phone: z.string().min(8, "Telefoonnummer is verplicht"),
          email: z.string().email("Ongeldig e-mailadres").optional().or(z.literal("")),
          postalCode: z.string().optional(),
          solarPanelCount: z.string().optional(),
          currentProvider: z.string().optional(),
          homeOwner: z.boolean().optional(),
          annualIncome: z.string().optional(),
          preferredContact: z.string().optional(),
          estimatedSavings: z.number().optional(),
          source: z.string().optional(),
          utmSource: z.string().optional(),
          utmMedium: z.string().optional(),
          utmCampaign: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const lead = await createLead({
          name: input.name,
          phone: input.phone,
          email: input.email || undefined,
          postalCode: input.postalCode,
          solarPanelCount: input.solarPanelCount,
          currentProvider: input.currentProvider,
          homeOwner: input.homeOwner,
          annualIncome: input.annualIncome,
          preferredContact: input.preferredContact,
          estimatedSavings: input.estimatedSavings,
          source: input.source || "website",
          utmSource: input.utmSource,
          utmMedium: input.utmMedium,
          utmCampaign: input.utmCampaign,
        });

        // Send email notification about new lead
        try {
          await sendLeadEmail({
            name: input.name,
            phone: input.phone,
            email: input.email || undefined,
            postalCode: input.postalCode,
            solarPanelCount: input.solarPanelCount,
            homeOwner: input.homeOwner,
            estimatedSavings: input.estimatedSavings,
            source: input.source || "website",
            utmSource: input.utmSource,
            utmMedium: input.utmMedium,
            utmCampaign: input.utmCampaign,
          });
        } catch (e) {
          console.warn("[Mail] Failed to send lead email notification:", e);
        }

        return {
          success: true,
          leadId: lead?.id,
        };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        return [];
      }
      return getLeads();
    }),
  }),
});

export type AppRouter = typeof appRouter;
