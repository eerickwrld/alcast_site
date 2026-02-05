import { Button } from "@/components/ui/button"
import {useTranslations} from "next-intl";
import {LocalizedLink} from "@/components/Link";
import {Link} from "@/i18n/navigation";

export default function OrcamentoSection({data, locale}) {
  const t = useTranslations("home")

  return (
    <section className="relative overflow-hidden bg-[#1A408A] py-0">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full">
        <img
          src="/images/cta-frame-lines.png"
          alt=""
          className="absolute right-0 -bottom-[50px] h-auto w-1/2 rotate-[4deg] object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="relative flex h-[350px] sm:h-[450px] md:h-[600px] w-full items-center justify-between overflow-hidden ">
        {/* White curved section */}
        <div className="hidden lg:block absolute left-0 top-0 h-full w-[60%] md:w-[50%]">
          <img src="/images/cta-frame-curve.png" alt="" className="object-cover w-full h-full" aria-hidden="true" />
        </div>

        {/* Content container */}
        <div className="container flex relative z-10 justify-between items-center px-4 mx-auto h-full md:px-6">
          {/* Text and button */}
          <div className="w-[50%] flex flex-col items-center justify-center md:w-[40%]">
            <h2 className="mb-4 text-2xl text-center lg:max-w-[400px] font-medium text-white lg:text-[#1A408A] sm:text-xl md:text-4xl">
              {data?.title}
            </h2>
            <Button
              asChild
              size="lg"
              className="bg-white lg:bg-[#1A408A] text-primary lg:text-white px-4 py-2 hover:bg-[#15346e] md:px-6 md:py-2"
            >
              <Link locale={locale} href="/orcamento">
                {data?.button_text}
              </Link>
            </Button>
          </div>

          {/* Woman image */}
          <div className="absolute bottom-0 right-0 h-full w-[50%] md:w-[60%]">
            <img
              src="/images/cta-woman.png"
              alt="Técnica com capacete segurando disco de alumínio"
              className="object-cover absolute right-0 bottom-0 w-full h-auto lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
