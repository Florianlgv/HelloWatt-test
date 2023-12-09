import React from "react";
import "/static/css/ResponsiveImage.css";

export default function ResponsiveImage({ src, alt }) {
	return <img src={src} alt={alt} className="responsiveImage" />;
}
