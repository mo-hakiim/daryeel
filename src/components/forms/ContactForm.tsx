import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ExternalLink, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useI18n } from "@/i18n";
import { CONTACT, whatsappLink } from "@/lib/contact";
import { buildContactMessage } from "@/lib/messages";
import { Field, inputClass } from "./fields";

type Values = { name: string; message: string };

export function ContactForm() {
  const { t } = useI18n();
  const c = t.contact;
  const [sentUrl, setSentUrl] = useState<string>();
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, c.errors.name).max(100, c.errors.name),
        message: z.string().trim().min(5, c.errors.message).max(1000, c.errors.message),
      }),
    [c],
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: "", message: "" } });

  const onSubmit = (v: Values) => {
    const url = whatsappLink(buildContactMessage(t, v.name, v.message));
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Daryeel Wellness")}&body=${encodeURIComponent(watch("message") || "")}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Field id="m-name" label={c.name} error={errors.name?.message}>
        <input id="m-name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} {...register("name")} />
      </Field>
      <Field id="m-message" label={c.message} error={errors.message?.message}>
        <textarea id="m-message" rows={5} className={`${inputClass} h-auto resize-none py-3`} aria-invalid={!!errors.message} {...register("message")} />
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="whatsapp" size="lg">
          <WhatsAppIcon className="size-5" />
          {c.send}
        </Button>
        <a href={mailto} className="inline-flex items-center gap-2 break-all text-sm font-semibold text-primary hover:underline">
          <Mail className="size-4 shrink-0" />
          {c.emailInstead}
        </a>
      </div>
      <p className="text-xs text-muted-foreground">{c.formNote}</p>
      {sentUrl && (
        <p role="status" className="rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
          <span className="font-bold text-foreground">{t.consultation.openedTitle}. </span>
          {t.consultation.openedText}{" "}
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            {t.consultation.openAgain}
            <ExternalLink className="size-3" />
          </a>
        </p>
      )}
    </form>
  );
}
