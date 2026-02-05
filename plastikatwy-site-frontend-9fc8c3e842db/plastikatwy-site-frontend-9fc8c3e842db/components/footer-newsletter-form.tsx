"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useTranslations} from "next-intl"
import {twMerge} from "tailwind-merge"
import {useToast} from "@/hooks/use-toast"
import {ToastAction} from "@/components/ui/toast"
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

type FormData = {
  email: string
}

const schema = yup.object().shape({
  email: yup.string().email().required()
})

export default function FooterNewsletterForm() {
  const t = useTranslations("common")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
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
        body: JSON.stringify({email: data.email})
      })

      if (!response.ok) {
        throw new Error()
      }

      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
      }, 3000)

      reset()
    } catch (error) {
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col w-full gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-sm font-medium">{t("newsletter")}</p>
      <div>
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
  )
}
