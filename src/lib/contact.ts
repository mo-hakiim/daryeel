// Official Daryeel Wellness contact details (from the company profile). Edit here only.
export const CONTACT = {
  whatsappDisplay: "+25263800227",
  whatsappNumber: "25263800227",
  phones: ["0634029802", "0637999938"],
  email: "daryeelhargeisa07@gmail.com",
} as const;

/** Somaliland local numbers (06…) dial internationally as +252 6… */
export function telHref(local: string) {
  return `tel:+252${local.replace(/^0/, "")}`;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
