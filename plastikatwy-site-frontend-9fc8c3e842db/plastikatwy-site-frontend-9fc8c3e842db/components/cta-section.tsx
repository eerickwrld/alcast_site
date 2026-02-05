import Image from "next/image"

export default function CtaSection({data}) {
  return (
    <section className={`w-full flex flex-col justify-center relative bg-cover bg-right h-[800px]`} style={{
      backgroundImage: `url(${data?.image})`
    }}>
      <div
        className="absolute inset-0 w-2/3 bg-gradient-to-r from-white/30 from-[20%] to-transparent to-[100%]"
      />

      <div className="z-10 p-10">
        <p className="text-2xl italic max-w-[550px] whitespace-pre-wrap text-primary">
          {data?.description}
        </p>
      </div>
    </section>
  )
}
