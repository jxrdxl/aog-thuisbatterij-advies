import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock notification to avoid external calls during tests
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("leads.submit", () => {
  it("successfully submits a lead with required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submit({
      name: "Jan de Vries",
      phone: "0612345678",
      solarPanelCount: "13-18",
      source: "website-form",
    });

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("leadId");
    expect(typeof result.leadId).toBe("number");
  });

  it("successfully submits a lead with all optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submit({
      name: "Maria Jansen",
      phone: "0698765432",
      email: "maria@example.nl",
      postalCode: "1234 AB",
      solarPanelCount: "7-12",
      currentProvider: "Eneco",
      homeOwner: true,
      annualIncome: "30k-60k",
      preferredContact: "phone",
      estimatedSavings: 1200,
      source: "facebook-ad",
      utmSource: "facebook",
      utmMedium: "cpc",
      utmCampaign: "thuisbatterij-2027",
    });

    expect(result.success).toBe(true);
    expect(result.leadId).toBeDefined();
  });

  it("rejects submission with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.leads.submit({
        name: "",
        phone: "0612345678",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with short phone number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.leads.submit({
        name: "Test User",
        phone: "123",
      })
    ).rejects.toThrow();
  });

  it("accepts submission with empty email string", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submit({
      name: "Test User",
      phone: "0612345678",
      email: "",
    });

    expect(result.success).toBe(true);
  });
});

describe("leads.list", () => {
  it("returns leads for admin users", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const leads = await caller.leads.list();
    expect(Array.isArray(leads)).toBe(true);
    // Should contain at least the leads we submitted above
    expect(leads.length).toBeGreaterThan(0);
  });

  it("returns empty array for non-admin users", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    const leads = await caller.leads.list();
    expect(Array.isArray(leads)).toBe(true);
    expect(leads.length).toBe(0);
  });
});
