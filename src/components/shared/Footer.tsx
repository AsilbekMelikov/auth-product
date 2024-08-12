import { Link } from "react-router-dom";
import { footerNavs, socialMediaInfo } from "../../constants/mediaInfo";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="background-light900_dark200 light-border border-t"
    >
      <div className="container max-w-[1304px] px-6 py-20 sm:py-12 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {footerNavs.map((nav, index) => {
            return (
              <div key={index} className="flex-center pb-6">
                <Link
                  to={nav.path}
                  className="inline-flex-center base-medium text-dark200_light800 h-10 px-4 py-2 underline-offset-4 hover:underline"
                >
                  {nav.label}
                </Link>
              </div>
            );
          })}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {socialMediaInfo.map((media, index) => {
            return (
              <Link to={media.destination} key={index}>
                <span className="sr-only">{media.label}</span>
                <img
                  src={media.image}
                  alt={media.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-6"
                  width={24}
                  height={24}
                />
              </Link>
            );
          })}
        </div>
        <p className="mt-10 text-center text-[12px] leading-5">
          Protected Policy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
