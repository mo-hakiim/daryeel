import { describe, expect, it } from "vitest";

import { authMessage, checkNewPassword } from "@/admin/ui";
import { SupabaseError, sessionFromRecoveryLink } from "@/lib/supabase";

describe("admin sign-in messages", () => {
  it("explains a wrong email or password", () => {
    const e = new SupabaseError("Invalid login credentials", 400, "invalid_credentials");
    expect(authMessage(e)).toMatch(/^Wrong email or password/);
  });

  it("explains when the database can't be reached", () => {
    expect(authMessage(new SupabaseError("Could not reach Supabase", 0))).toMatch(
      /Can't reach the shop database/,
    );
  });

  it("explains an unconfirmed email, rate limits and expired reset links", () => {
    expect(
      authMessage(new SupabaseError("Email not confirmed", 400, "email_not_confirmed")),
    ).toMatch(/hasn't been confirmed/);
    expect(
      authMessage(new SupabaseError("Too many requests", 429, "over_request_rate_limit")),
    ).toMatch(/Too many attempts/);
    expect(
      authMessage(new SupabaseError("Email link is invalid or has expired", 400, "otp_expired")),
    ).toMatch(/expired or was already used/);
  });

  it("explains a wrong current password when changing it", () => {
    const e = new SupabaseError(
      "Your current password is not correct.",
      400,
      "wrong_current_password",
    );
    expect(authMessage(e)).toBe("Your current password is not correct.");
  });
});

describe("new password rules", () => {
  it("accepts a long password with letters and numbers that is repeated correctly", () => {
    expect(checkNewPassword("green-leaf-2026", "green-leaf-2026")).toBeNull();
  });
  it("rejects short, letters-only and mismatched passwords", () => {
    expect(checkNewPassword("abc12", "abc12")).toMatch(/at least 8/);
    expect(checkNewPassword("onlyletters", "onlyletters")).toMatch(/letters and numbers/);
    expect(checkNewPassword("green-leaf-2026", "green-leaf-2025")).toMatch(/don't match/);
  });
});

describe("password reset link", () => {
  it("reports an expired link from the URL fragment", async () => {
    const hash =
      "#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired";
    await expect(sessionFromRecoveryLink(hash)).rejects.toMatchObject({ code: "otp_expired" });
  });
  it("returns nothing when the page is opened without a link", async () => {
    await expect(sessionFromRecoveryLink("")).resolves.toBeNull();
  });
});
