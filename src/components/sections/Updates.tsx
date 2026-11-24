import { BellRing } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useI18n } from "@/i18n";
import { whatsappLink } from "@/lib/contact";

/** Updates sign-up via WhatsApp (no mailing list service is connected). */
export function Updates() {
  const { t } = useI18n();
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-lime px-6 py-12 text-lime-foreground sm:px-14 sm:py-16">
          <div className="blob -right-10 -top-10 h-72 w-72 bg-card/50" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <BellRing className="size-7" />
              <h2 className="mt-4 text-3xl font-medium sm:text-4xl">{t.updates.title}</h2>
              <p className="mt-3 text-base leading-relaxed opacity-80 sm:text-lg">{t.updates.text}</p>
            </div>
            <Button asChild size="lg" variant="forest">
              <a href={whatsappLink(t.updates.message)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" />
                {t.updates.button}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
