import ImageLoad from "@/app/ui/image-load";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-100vh">
      <ImageLoad
        src="/images/not_found.png"
        className="w-32 h-32"
        alt="not-found"
      />
      <h1>404</h1>
      <p>Not Found :(</p>
    </div>
  );
}
