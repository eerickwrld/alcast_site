interface CertificationsProps {
  title?: string;
  images?: string[];
}

export default function Certifications({
  title = "Somos uma empresa certificada e comprometida com o meio ambiente",
  images = []
}: CertificationsProps) {
  const certifications = images.length > 0
    ? images.map((img, index) => ({
      name: `Certificação ${index + 1}`,
      image: img
    }))
    : []

  return (
    <section className="relative py-16 bg-white lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-20 text-center text-2xl text-[#1A408A] md:text-4xl">
          {title?.split(' ').length > 6 ? (
            <>
              {title?.split(' ').slice(0, Math.ceil(title?.split(' ').length / 2)).join(' ')}
              <br />
              {title?.split(' ').slice(Math.ceil(title?.split(' ').length / 2)).join(' ')}
            </>
          ) : title}
        </h2>

        <div className="flex flex-wrap gap-8 justify-center items-center md:gap-20">
          {certifications?.map((cert) => (
            <div key={cert.name} className="flex flex-col items-center">
              <img src={cert.image || "/placeholder.svg"} alt={cert.name} className="object-contain w-auto h-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
