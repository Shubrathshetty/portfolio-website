"use client";

import { useEffect } from "react";

export default function MailtoHandler() {
    useEffect(() => {
        const handleMailtoClick = (e: MouseEvent) => {
            const target = (e.target as Element).closest('a[href^="mailto:"]');
            if (target) {
                e.preventDefault();
                const href = target.getAttribute("href");
                if (href) {
                    // Check if it's already a gmail link to prevent infinite loop or double handling if we change logic later
                    // But here we're replacing the default behavior
                    const email = href.replace("mailto:", "");
                    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                        email
                    )}`;
                    window.open(gmailComposeUrl, "_blank");
                }
            }
        };

        document.addEventListener("click", handleMailtoClick);

        return () => {
            document.removeEventListener("click", handleMailtoClick);
        };
    }, []);

    return null;
}
