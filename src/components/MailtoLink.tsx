"use client";

import React from "react";

interface MailtoLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    email: string;
    children: React.ReactNode;
}

const MailtoLink = ({ email, children, className, ...props }: MailtoLinkProps) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
            email
        )}`;
        window.open(gmailComposeUrl, "_blank");
    };

    return (
        <a
            href={`mailto:${email}`}
            onClick={handleClick}
            className={className}
            {...props}
        >
            {children}
        </a>
    );
};

export default MailtoLink;
