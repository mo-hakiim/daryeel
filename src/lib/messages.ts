import type { Dictionary } from "@/i18n/en";

export type ConsultationRequest = {
  fullName: string;
  phone: string;
  language: "en" | "so";
  type: "online" | "inPerson";
  date: string;
  subject: string;
  message?: string | undefined;
};

/** Builds the WhatsApp message text for a consultation request. */
export function buildConsultationMessage(t: Dictionary, r: ConsultationRequest) {
  const c = t.consultation;
  const lines = [
    c.messageHeader,
    "",
    `${c.fullName}: ${r.fullName}`,
    `${c.phone}: ${r.phone}`,
    `${c.preferredLanguage}: ${r.language === "en" ? c.langEnglish : c.langSomali}`,
    `${c.type}: ${r.type === "online" ? c.online : c.inPerson}`,
    `${c.date}: ${r.date}`,
    `${c.subject}: ${r.subject}`,
  ];
  if (r.message?.trim()) lines.push(`${c.message}: ${r.message.trim()}`);
  return lines.join("\n");
}

export function buildContactMessage(t: Dictionary, name: string, message: string) {
  return `${t.contact.messageHeader}\n\n${message.trim()}\n\n— ${name.trim()}`;
}

/** Local date as YYYY-MM-DD. */
export function todayISO(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Phone numbers: digits with optional +, spaces or dashes; 7–15 digits. */
export function isValidPhone(v: string) {
  const digits = v.replace(/[\s\-()]/g, "");
  return /^\+?\d{7,15}$/.test(digits);
}
