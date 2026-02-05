import {getTranslations} from "next-intl/server";
import {getContentByLanguage} from "@/helpers/getContentByLanguage";

export default async function Units({image, locale, units}) {
  const t = await getTranslations({locale, namespace: 'common'});

  console.log(units)

  return (
    <section className="py-12 bg-gradient-to-r from-[#081735] to-[#1b3e91]">
      <div className="container px-4 mx-auto md:px-6">
        <h2 className="mb-8 text-2xl font-bold text-white">{t('units')}</h2>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left side - 2x2 grid of locations (50% width on desktop) */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
              {units.map((unit, index) => (
                <div key={index}>
                  {getContentByLanguage(unit.name, locale)
                    ? <h3 className="mb-4 text-lg font-medium text-white">{getContentByLanguage(unit.name, locale)}</h3>
                    : <div className="h-[44px]"/>
                  }
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={unit.image}
                      alt={getContentByLanguage(unit.name, locale) || `Unidade ${index + 1}`}
                      className="w-full sm:w-[366px] h-auto sm:h-[221px] object-cover"
                      width={366}
                      height={221}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - SVG Map (50% width on desktop) */}
          <div className="flex justify-center items-center w-full lg:w-1/2">
            <div className="flex justify-center items-center w-full h-full">
              <img
                src={image}
                alt="Mapa das unidades Alcast no Brasil"
                className="w-full h-auto max-w-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
