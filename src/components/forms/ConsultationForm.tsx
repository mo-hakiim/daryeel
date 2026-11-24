import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useI18n } from "@/i18n";
import { whatsappLink } from "@/lib/contact";
import { buildConsultationMessage, isValidPhone, todayISO, type ConsultationRequest } from "@/lib/messages";
import { Field, Segmented, inputClass } from "./fields";

export function ConsultationForm() {
  const { t, lang } = useI18n();
  const c = t.consultation;
  const [minDate, setMinDate] = useState<string>();
  const [sentUrl, setSentUrl] = useState<string>();

  useEffect(() => setMinDate(todayISO()), []);

  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().trim().min(2, c.errors.name).max(100, c.errors.name),
        phone: z.string().trim().refine(isValidPhone, c.errors.phone),
        language: z.enum(["en", "so"], { message: c.errors.required }),
        type: z.enum(["online", "inPerson"], { message: c.errors.required }),
        date: z
          .string()
          .min(1, c.errors.date)
          .refine((d) => d >= todayISO(), c.errors.date),
        subject: z.string().trim().min(2, c.errors.subject).max(200, c.errors.subject),
        message: z.string().max(1000).optional(),
      }),
    [c],
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationRequest>({
    resolver: zodResolver(schema),
    defaultValues: { language: lang, type: "online", fullName: "", phone: "", date: "", subject: "", message: "" },
  });

  const onSubmit = (data: ConsultationRequest) => {
    const url = whatsappLink(buildConsultationMessage(t, data));
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="c-name" label={c.fullName} error={errors.fullName?.message} className="sm:col-span-2">
        <input id="c-name" autoComplete="name" className={inputClass} aria-invalid={!!errors.fullName} {...register("fullName")} />
      </Field>
      <Field id="c-phone" label={c.phone} error={errors.phone?.message}>
        <input id="c-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="06…" className={inputClass} aria-invalid={!!errors.phone} {...register("phone")} />
      </Field>
      <Field id="c-date" label={c.date} error={errors.date?.message}>
        <input id="c-date" type="date" min={minDate} className={inputClass} aria-invalid={!!errors.date} {...register("date")} />
      </Field>
      <Field id="c-lang" label={c.preferredLanguage} error={errors.language?.message}>
        <Controller
          control={control}
          name="language"
          render={({ field }) => (
            <Segmented
              name="c-lang"
              label={c.preferredLanguage}
              value={field.value}
              onChange={field.onChange}
              options={[
                { value: "en", label: c.langEnglish },
                { value: "so", label: c.langSomali },
              ]}
            />
          )}
        />
      </Field>
      <Field id="c-type" label={c.type} error={errors.type?.message}>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Segmented
              name="c-type"
              label={c.type}
              value={field.value}
              onChange={field.onChange}
              options={[
                { value: "online", label: c.online },
                { value: "inPerson", label: c.inPerson },
              ]}
            />
          )}
        />
      </Field>
      <Field id="c-subject" label={c.subject} error={errors.subject?.message} className="sm:col-span-2">
        <input id="c-subject" placeholder={c.subjectPlaceholder} className={inputClass} aria-invalid={!!errors.subject} {...register("subject")} />
      </Field>
      <Field id="c-message" label={c.message} optional className="sm:col-span-2">
        <textarea id="c-message" rows={4} placeholder={c.messagePlaceholder} className={`${inputClass} h-auto resize-none py-3`} {...register("message")} />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" variant="forest" className="w-full sm:w-auto">
          <Send />
          {c.submit}
        </Button>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <WhatsAppIcon className="mt-0.5 size-3.5 shrink-0 text-whatsapp" />
          {c.howItWorks}
        </p>
      </div>

      <AnimatePresence>
        {sentUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="rounded-2xl border border-primary/30 bg-secondary p-4 text-sm sm:col-span-2"
          >
            <p className="font-bold text-foreground">{c.openedTitle}</p>
            <p className="mt-1 text-muted-foreground">
              {c.openedText}{" "}
              <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-2 hover:underline">
                {c.openAgain}
                <ExternalLink className="size-3" />
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
