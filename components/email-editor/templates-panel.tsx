"use client";

import React from "react";

import getConfiguration from "@/lib/email-templates/get-configuration";
import { resetDocument, useSamplesDrawerOpen } from "@/lib/editor/editor-store";

export const SAMPLES_DRAWER_WIDTH = 240;

const templates = [
  { href: "#", label: "Empty" },
  { href: "#sample/welcome", label: "Welcome email" },
  { href: "#sample/one-time-password", label: "One-time passcode (OTP)" },
  { href: "#sample/reset-password", label: "Reset password" },
  { href: "#sample/order-ecomerce", label: "E-commerce receipt" },
  { href: "#sample/subscription-receipt", label: "Subscription receipt" },
  { href: "#sample/reservation-reminder", label: "Reservation reminder" },
  { href: "#sample/post-metrics-report", label: "Post metrics" },
  { href: "#sample/respond-to-message", label: "Respond to inquiry" },
];

export default function TemplatesPanel() {
  const samplesDrawerOpen = useSamplesDrawerOpen();

  const handleTemplateClick = (href: string) => {
    resetDocument(getConfiguration(href));
  };

  if (!samplesDrawerOpen) {
    return null;
  }

  return (
    <div
      className="flex h-screen flex-col justify-between border-r border-gray-200 bg-white py-2 px-4"
      style={{ width: SAMPLES_DRAWER_WIDTH }}
    >
      <div className="space-y-4">
        <h1 className="px-2 py-1 text-xl font-semibold">EmailBuilder.js</h1>

        <div className="flex flex-col items-start space-y-1">
          {templates.map((template) => (
            <button
              key={template.href}
              onClick={() => handleTemplateClick(template.href)}
              className="w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
            >
              {template.label}
            </button>
          ))}
        </div>

        <hr className="border-gray-200" />
      </div>
    </div>
  );
}
