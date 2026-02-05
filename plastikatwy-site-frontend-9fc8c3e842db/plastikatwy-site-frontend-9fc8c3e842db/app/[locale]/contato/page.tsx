"use client"

import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {twMerge} from "tailwind-merge"
import Header from "@/components/header"
import {Button} from "@/components/ui/button"
import HeroSlider from "@/components/hero-slider"
import {useTranslations} from "next-intl";
import {useEffect, useState, useRef} from "react";
import {PageResponse} from "@/services/types";
import {getPageBySlug} from "@/services/api";
import Footer, {SocialLinks} from "@/components/footer";
import {useConfig} from "@/contexts/config-context";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {useLanguage} from "@/contexts/language-context";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/plain.css'
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {LocalizedLink} from "@/components/Link";
import {localePagePathname} from "@/helpers/localePagePathname";

// Definição dos tipos para o formulário
type FormData = {
  name: string;
  email: string;
  phone: string;
  sector: string;
  message: string;
  newsletter: "yes" | "no";
}

const phoneLocales = {
  "pt-BR": "br",
  "pt_BR": "br",
  "en": "us",
  "es": "es",
}

export default function Contato({params}) {
  const {language} = useLanguage()
  const t = useTranslations("contact")
  const tf = useTranslations("common")

  const [pageData, setPageData] = useState<PageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const {config, isLoading, error} = useConfig()
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Definindo o schema de validação
  const schema = yup.object({
    name: yup.string().required(tf("errors.mandatory")),
    email: yup.string().email(tf("errors.mandatory")).required(tf("errors.mandatory")),
    phone: yup.string().required(tf("errors.mandatory")),
    sector: yup.string().required(tf("errors.mandatory")),
    message: yup.string().required(tf("errors.mandatory")),
    newsletter: yup.string().oneOf(["yes", "no"]).required(tf("errors.mandatory"))
  }).required();

  // Configurando react-hook-form com validação yup
  const {register, handleSubmit, control, watch, setValue, formState: {errors}, reset} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      sector: "",
      message: "",
      newsletter: "yes"
    }
  });

  // Função para submeter o formulário
  const onSubmit = async (data: FormData) => {
    // Resetar alertas anteriores
    setAlertSuccess(false);
    setAlertError(false);

    setSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(t("form.errors.submitError"));
      }

      setAlertSuccess(true);
      reset(); // Limpa o formulário após envio bem-sucedido

      // Role para o topo do formulário para mostrar o alerta
      window.scrollTo({
        top: document.getElementById('contact-form')?.offsetTop || 0,
        behavior: 'smooth'
      });
    } catch (error) {
      setAlertError(true);
      setErrorMessage(error instanceof Error ? error.message : t("form.errors.submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const pageParams = await params

      setLoading(true);
      try {
        const pageResponse = await getPageBySlug(localePagePathname("/contato", pageParams.locale), pageParams.locale);
        setPageData(pageResponse);
      } catch (err: any) {
        // console.error('Error fetching ESG page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header/>

      {/* Hero Section */}
      <HeroSlider
        slides={[
          {
            id: 1,
            title: pageData?.custom_fields_data?.["secao-hero"]?.title,
            description: pageData?.custom_fields_data?.["secao-hero"]?.description,
            subtitle: pageData?.custom_fields_data?.["secao-hero"]?.subtitle,
            image: pageData?.custom_fields_data?.["secao-hero"]?.image,
            bgPosition: "center center",
          }
        ]}
        curveColor="white"
        showCTA={false}
      />

      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Column - Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-[#1A408A] mb-6">
                {t("title")}
              </h2>

              <div className="mb-8">
                <p className="mb-1 font-medium text-gray-700">{config?.address?.country}</p>
                <p className="mb-1 text-gray-700">{config?.address?.city}/{config?.address?.state}</p>
                <p className="flex items-center mb-1 text-gray-700">
                  <span className="inline-flex justify-center items-center mr-2 w-5 h-5 text-xs bg-gray-300 rounded-full">
                    ☎
                  </span>
                  {config?.contact_info?.phone}
                </p>
                <p className="text-gray-700">
                  {config?.address?.address}
                </p>
                <div className="mt-4">
                  <SocialLinks links={config?.social_networks}/>
                </div>
              </div>

              {config?.address?.map && (
                <div className="mb-8">
                  <div className="h-[300px] w-full rounded-md overflow-hidden border border-gray-200">
                    <iframe
                      src={config?.address?.map}
                      width="100%"
                      height="100%"
                      style={{border: 0}}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-[#1A408A] mb-4">{getContentByLanguage(config?.footer_info?.policy_privacy?.title, language)}</h3>
                <p className="text-gray-700">
                  {getContentByLanguage(config?.footer_info?.policy_privacy?.description, language)}
                  {" "}
                  <LocalizedLink locale={language} href={config?.footer_info?.policy_privacy?.url} className="text-[#1A408A] hover:underline">{getContentByLanguage(config?.footer_info?.policy_privacy?.title, language)}.</LocalizedLink>
                </p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div id="contact-form">
              {/* Alert de Sucesso */}
              {alertSuccess && (
                <Alert className="mb-6 border-green-500 bg-green-50">
                  <AlertTitle className="text-green-800">{t("form.success.title")}</AlertTitle>
                  <AlertDescription className="text-green-700">
                    {t("form.success.description")}
                  </AlertDescription>
                </Alert>
              )}

              {/* Alert de Erro */}
              {alertError && (
                <Alert className="mb-6 border-red-500 bg-red-50">
                  <AlertTitle className="text-red-800">{t("form.errors.title")}</AlertTitle>
                  <AlertDescription className="text-red-700">
                    {errorMessage}
                  </AlertDescription>
                </Alert>
              )}

              <form
                id="contactForm"
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit(onSubmit)()
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block mb-1 text-gray-700">
                    {t("form.name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className={twMerge(
                      "px-3 py-2 w-full rounded-md border border-gray-300",
                      errors.name && "border-red-500"
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 text-gray-700">
                    {t("form.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className={twMerge(
                      "px-3 py-2 w-full rounded-md border border-gray-300",
                      errors.email && "border-red-500"
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-1 text-gray-700">
                    {t("form.phone")} <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    control={control}
                    name={"phone"}
                    render={({formState, field}) => {
                      return (
                        <PhoneInput
                          isValid={!formState.errors.phone}
                          key={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          containerClass="!font-manrope"
                          specialLabel=""
                          placeholder=""
                          country={phoneLocales[language] || phoneLocales["pt-BR"]}
                          inputClass="!w-full !rounded-md !h-auto !border !border-gray-300 !pr-3 !py-2 !text-base"
                          onlyCountries={["br", "us", "es"]}
                          autoFormat
                        />
                      )
                    }}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="sector" className="block mb-1 text-gray-700">
                    {t("form.sector")}
                  </label>
                  <select
                    {...register("sector")}
                    id="sector"
                    className={twMerge(
                      "px-3 py-2 w-full text-gray-700 rounded-md border border-gray-300",
                      errors.sector && "border-red-500"
                    )}
                  >
                    <option value="" disabled>
                      {t("form.sectors.placeholder")}
                    </option>
                    {config?.sectors?.map((sector: any) => {
                      const name = getContentByLanguage(sector.sectors.name, language);
                      return (
                        <option key={name} value={name}>{name}</option>
                      )
                    })}
                    {/*<option value="comercial">{t("form.sectors.comercial")}</option>*/}
                    {/*<option value="financeiro">{t("form.sectors.finance")}</option>*/}
                    {/*<option value="logistica">{t("form.sectors.logistic")}</option>*/}
                    {/*<option value="marketing">{t("form.sectors.marketing")}</option>*/}
                    {/*<option value="rh">{t("form.sectors.rh")}</option>*/}
                    {/*<option value="outros">{t("form.sectors.others")}</option>*/}
                  </select>
                  {errors.sector && (
                    <p className="mt-1 text-sm text-red-500">{errors.sector.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block mb-1 text-gray-700">
                    {t("form.message")}
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    className={twMerge(
                      "px-3 py-2 w-full text-gray-700 rounded-md border border-gray-300",
                      errors.message && "border-red-500"
                    )}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <div>
                  <p className="mb-2 text-gray-700">
                    {t("form.newsletter")}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        {...register("newsletter")}
                        type="radio"
                        id="newsletter-yes"
                        value="yes"
                        className="mr-2"
                      />
                      <label htmlFor="newsletter-yes" className="text-gray-700">
                        {t("form.yes")}
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        {...register("newsletter")}
                        type="radio"
                        id="newsletter-no"
                        value="no"
                        className="mr-2"
                      />
                      <label htmlFor="newsletter-no" className="text-gray-700">
                        {t("form.no")}
                      </label>
                    </div>
                  </div>
                  {errors.newsletter && (
                    <p className="mt-1 text-sm text-red-500">{errors.newsletter.message}</p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="g-recaptcha" data-sitekey="your-recaptcha-site-key"></div>

                  <Button
                    type="submit"
                    className="bg-[#1A408A] hover:bg-[#15346e] text-white px-12 py-2"
                    disabled={submitting}
                  >
                    {submitting ? t("form.submitting") : t("button")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </main>
  )
}
