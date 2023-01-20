import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faLock,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faEarthAmerica, faLock, faWarning);

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className={`printHidden`}>
      <div id={`divHeader`} className={`navbar navbar-fixed-top`}>
        <div className={`navbar-inner`}>
          <a className={`tempHide pull-right`} id={`icoWarningShow`}>
            <FontAwesomeIcon icon={faWarning} className={`icon-warning-sign`} />
          </a>
          <div className={`container`}>
            <a className={`brand logo`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={`SunNet Online Banking`} src={`/images/mainlogo.gif`} />
            </a>
            <div>
              <div className={`headerRight`}>
                <nav>
                  <ul
                    className={`nav topnav`}
                    style={{
                      listStyle: `none`,
                    }}
                  >
                    {[
                      {
                        icon: faLock,
                        text: ` Log Into SunNet`,
                      },
                      {
                        icon: faEarthAmerica,
                        text: ` SuncoastCreditUnion.com`,
                      },
                    ].map(({ icon, text }) => (
                      <li
                        key={text}
                        className={`dropdown primary`}
                        id={`individualMenuItem`}
                        style={{
                          cursor: `pointer`,
                        }}
                      >
                        <a>
                          <FontAwesomeIcon
                            icon={icon}
                            className={`icon-lock icon-white`}
                            size={`sm`}
                          />
                          {text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
