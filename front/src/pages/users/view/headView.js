import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { BsDownload } from "react-icons/bs";

import "../details.user.css";
import "./head.css";

export default function HeadView({ details }) {
  return (
    <>
      <div className="container-fluid">
        <div className="page-header min-height-200 border-radius-lg mt-0 p-3 d-flex flex-column flex-md-row align-items-center justify-content-between">
          <span className="mask bg-primary opacity-9"></span>
          {/* Profile Section */}
          <div className="profile-container d-flex flex-column flex-md-row align-items-center mb-4">
            {/* Profile Image */}
            <div className="profile-img me-md-3 mb-3 mb-md-0 u-img">
              <img
                src={process.env.REACT_APP_SUN_COMPLET_URL + details.pic}
                alt="profile_image"
              />
            </div>

            {/* Profile Info */}
            <div className="profile-info text-center text-md-start">
              <h2 className="mb-1 text-white font-weight-bold">
                {details && <>{details.im}</>}
              </h2>
              <h5 className="mb-1 text-white font-weight-bold">
                {details && (
                  <>
                    {details.nom} {details.prenom}
                  </>
                )}
              </h5>
              <p className="mb-0 text-white text-sm">
                BOA / {details && <>{details.departement}</>}
              </p>
            </div>
          </div>
          
          {/* QR Code Section */}
          <div className="qrCodeSection d-flex justify-content-center position-relative">
            {details && details.qrCodeValue && (
              <>
                <img
                  src={details.qrCodeValue}
                  className="profile-img qrCode-img me-md-3 mb-3 mb-md-0"
                  alt="QR Code"
                />
                <a
                  href={details.qrCodeValue}
                  download="QRCode.png"
                  className="download-icon"
                >
                  <BsDownload />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
