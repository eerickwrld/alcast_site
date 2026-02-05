import SegmentItem, { SegmentItemProps } from "./segment-item"
import {getTranslations} from "next-intl/server";

type ApplicationsSectionProps = {
  applications: SegmentItemProps[]
  locale: string
}

export default async function ApplicationsSection({ applications, locale }: ApplicationsSectionProps) {
  if (!applications || applications.length === 0) return
  const t = await getTranslations({locale, namespace: 'common'});

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-[1200px] px-4 mx-auto md:px-6">
        <h2 className="text-2xl font-bold text-[#1A408A] mb-8">{t("productSegments")}</h2>

        <div className={`grid grid-cols-3 gap-6`}>
          {applications?.map((app, index) => (
            <SegmentItem
              key={index}
              image={app}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 