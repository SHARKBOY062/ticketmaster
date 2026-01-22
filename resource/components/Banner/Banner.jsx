import "./Banner.css";

export default function Banner() {
  return (
    <section className="tm-banner">
      <img
        src="/banner.jpg"
        alt="Banner mobile"
        className="tm-banner-img mobile"
      />

      <img
        src="/deskbanner.png"
        alt="Banner desktop"
        className="tm-banner-img desktop"
      />
    </section>
  );
}
