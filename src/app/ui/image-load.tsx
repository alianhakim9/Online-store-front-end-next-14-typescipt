import Image from "next/image";

interface Props {
  className: string;
  src: string;
  alt: string;
}

const ImageLoad = ({ className, src, alt }: Props) => {
  return (
    <div className={`${className} relative`}>
      <Image
        src={src}
        // objectFit="cover"
        alt={alt}
        className="rounded-md"
        loading="lazy"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default ImageLoad;
