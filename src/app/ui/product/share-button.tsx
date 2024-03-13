import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

export function SharedProductButton() {
  return (
    <div className="flex flex-col gap-1 mt-5">
      <p className="font-semibold">Bagikan produk ini</p>
      <div className="flex gap-2 items-center mt-4">
        <FaFacebook size={24} />
        <FaTwitter size={24} />
        <FaInstagram size={24} />
        <FaWhatsapp size={24} />
      </div>
    </div>
  );
}
