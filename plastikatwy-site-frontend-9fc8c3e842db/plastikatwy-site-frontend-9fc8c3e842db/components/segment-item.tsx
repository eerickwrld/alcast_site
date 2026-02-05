import Image from "next/image"

export type SegmentItemProps = {
  title: string
  image: string
  alt?: string
}

export default function SegmentItem({ title, image, alt }: SegmentItemProps) {
  const content = (
    <>
      <div className="h-[300px] relative">
        <Image 
          src={image || "/placeholder.svg"} 
          alt={alt || title}
          fill
          className="object-cover"
        />
      </div>
      {/* <div className="p-4 text-center">
        <h3 className="text-base font-medium text-gray-800">{title}</h3>
      </div> */}
    </>
  );

  return (
    <div className="block overflow-hidden bg-white rounded-lg group">
      {content}
    </div>
  );
} 