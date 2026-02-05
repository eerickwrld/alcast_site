import { LocalizedLink as Link } from "@/components/Link"

export default function FlexibilitySection({data}) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-[1557px]">
        <div className="flex overflow-hidden flex-col rounded-3xl lg:flex-row">
          {/* Left side - Image */}
          <div className="w-full lg:w-3/5 h-[300px] md:h-[400px] relative overflow-hidden rounded-3xl lg:rounded-r-none">
            <img
              src={data?.image || ""}
              alt="Trabalhador da Alcast de costas com jaqueta azul em ambiente industrial"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right side - Blue panel with text and button */}
          <div className="w-full lg:w-2/5 bg-[#1A408A] p-8 md:p-12 flex flex-col justify-center rounded-3xl lg:rounded-l-none">
            <h2 className="mb-6 text-2xl font-medium text-white md:text-3xl">
              {data?.description}
            </h2>

            <Link
              href={data?.link_url || ""}
              className="bg-white text-[#1A408A] px-6 py-3 rounded-md inline-flex items-center w-fit hover:bg-gray-100 transition-colors"
            >
              {data?.link_text} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
