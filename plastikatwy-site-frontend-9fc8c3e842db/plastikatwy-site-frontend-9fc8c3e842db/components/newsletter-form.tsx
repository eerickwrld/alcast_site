"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { twMerge } from "tailwind-merge"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
  email: string
}

const schema = yup.object().shape({
  email: yup.string().email().required()
})

export default function NewsletterForm() {
  const t = useTranslations("common")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email })
      })

      if (!response.ok) {
        throw new Error()
      }

      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
      }, 3000)

      // toast({
      //   title: t("newsletter_success_title"),
      //   description: t("newsletter_success_message"),
      //   variant: "default"
      // })


      
      reset()
    } catch (error) {
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 3000)
      // toast({
      //   title: t("newsletter_error_title"),
      //   description: t("newsletter_error_message"),
      //   variant: "destructive",
      //   action: (
      //     <ToastAction altText={t("newsletter_try_again")} onClick={() => onSubmit(data)}>
      //       {t("newsletter_try_again")}
      //     </ToastAction>
      //   )
      // })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="p-12">
      <div className="container mx-auto py-12 px-6 rounded-lg overflow-hidden bg-light-blue">
        <div className="max-w-[80%] mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-medium max-w-xl text-[#1A408A]">
                {t("newsletter")}
              </h2>
            </div>
            <div className="w-full max-w-md">
              <form 
                className="flex w-full flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="email@email.com"
                    className={twMerge(
                      "rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none",
                      errors.email && "border-red-500"
                    )}
                    disabled={isLoading}
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 mt-1">
                      {t("newsletter_email_required")}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  className={twMerge(
                    "rounded-md bg-[#1A408A] px-6 py-2 text-center text-white hover:bg-[#15346e]",
                    isLoading && "cursor-not-allowed opacity-50",
                    error && "bg-red-500 hover:bg-red-600",
                    success && "bg-green-500 hover:bg-green-600",
                  )}
                  disabled={isLoading}
                >
                  {!isLoading && !error && !success && t("button")}
                  {isLoading && t("newsletter_sending")}

                  {!isLoading && error && t("newsletter_error_title")}
                  {!isLoading && success && t("newsletter_success_title")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
