import React from "react";

export default function ResponsiveImage({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            style={{
                width: "60%",
                minWidth: "200px",
                height: "auto",
                objectFit: "cover",
            }}
        />
    );
}
