import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import '../css/Common.css';
import '../css/Header.css';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://darshboard.com/#website",
                "url": "https://darshboard.com/",
                "name": "Darshboard",
                "description":
                  "Darshan Patel – Frontend Developer with 4+ years of experience building responsive React.js & WordPress websites.",
                "publisher": {
                  "@id": "https://darshboard.com/#organization"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://darshboard.com/#organization",
                "name": "Darshboard",
                "url": "https://darshboard.com/",
                "logo": {
                  "@type": "ImageObject",
                  "url":
                    "https://darshboard.com/wp-content/uploads/2025/06/darshboard_logo.svg"
                },
                "sameAs": [
                  "https://www.linkedin.com/in/pateldarshan8311",
                  "https://github.com/pateldarshan8311",
                  "https://www.youtube.com/@darshboard",
                  "https://www.behance.net/pateldarshan8311",
                  "https://dribbble.com/pateldarshan8311",
                  "https://stackoverflow.com/users/7642929/pateldarshan8311",
                  "https://www.quora.com/profile/Darshan-Patel-2422"
                ]
              },
              {
                "@type": "Person",
                "@id": "https://darshboard.com/#person",
                "name": "Darshan Patel",
                "url": "https://darshboard.com/",
                "image": {
                  "@type": "ImageObject",
                  "url":
                    "https://darshboard.com/wp-content/uploads/2025/06/darshboard_logo.svg"
                },
                "jobTitle": "Frontend Developer",
                "worksFor": {
                  "@id": "https://darshboard.com/#organization"
                },
                "sameAs": [
                  "https://www.linkedin.com/in/pateldarshan8311",
                  "https://github.com/pateldarshan8311",
                  "https://www.youtube.com/@darshboard",
                  "https://www.behance.net/pateldarshan8311",
                  "https://dribbble.com/pateldarshan8311",
                  "https://stackoverflow.com/users/7642929/pateldarshan8311",
                  "https://www.quora.com/profile/Darshan-Patel-2422"
                ]
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Your homepage JSX content here */}
    </>
  );
}



const Header = ({ menuItems = [], loading, logo, favicon }) => {
  const location = useLocation();

  // Dynamically update the favicon
  useEffect(() => {
    if (favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = favicon;
    }
  }, [favicon]);

  return (
    <header className="site_header">
      <div className="container">
        <div className="d_site_header_inner">

          {/* Logo */}
          <div className="d_logo">
            <Link to="/">
              {logo ? <img src={logo} alt="Site Logo" /> : <p>Loading Logo...</p>}
            </Link>
          </div>

          {/* Menu */}
          {loading ? (
            <p>⏳ Loading menu...</p>
          ) : menuItems.length > 0 ? (
            <ul className="d_main_menu">
              {menuItems.map((item, idx) => {
                const linkPath = item.url === '/about-me/' ? '/' : item.url;
                const isActive =
                  location.pathname === linkPath ||
                  (item.url === '/about-me/' && location.pathname === '/about-me/');

                return (
                  <li key={idx} className={isActive ? 'active' : ''}>
                    <Link to={linkPath}>
                      {item.icon && (
                        <span
                          className="menu_icon "
                          dangerouslySetInnerHTML={{
                            __html: `<img src="${item.icon}" alt="icon" />`,
                          }}
                        />
                      )}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>⚠ No menu items found.</p>
          )}

          {/* Email Section */}
          <div className="d_mail">
            <a href="mailto:hello@darshboard.com" className="d_mail_box">
              <ImageComponent imageId={54} />
              <span>hello@darshboard.com</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
