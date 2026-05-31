"use client";

import { Bell, Download } from "lucide-react";
import { useEffect, useState } from "react";

import { getMatchPushEnabled, setMatchPushEnabled } from "@/lib/localStorage";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PushNotificationPrompt() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setPushEnabled(getMatchPushEnabled());
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  async function enablePush() {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      setMatchPushEnabled(true);
      setPushEnabled(true);
    }
  }

  async function installApp() {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
      setInstallEvent(null);
    }
  }

  if (installed && permission === "granted" && pushEnabled) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 mx-auto max-w-md rounded-card border border-accent/40 bg-surface p-4 shadow-2xl md:bottom-6 md:left-auto md:right-6">
      <p className="text-sm font-bold text-accent">Stay match-ready</p>
      <p className="mt-1 text-xs leading-5 text-muted">
        Install the app and enable alerts 15 minutes before kickoff.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {installEvent && !installed ? (
          <button
            type="button"
            onClick={installApp}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-xs font-bold text-black"
          >
            <Download className="h-4 w-4" aria-hidden />
            Install app
          </button>
        ) : null}
        {permission !== "granted" ? (
          <button
            type="button"
            onClick={enablePush}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold text-muted hover:border-accent hover:text-accent"
          >
            <Bell className="h-4 w-4" aria-hidden />
            Enable notifications
          </button>
        ) : null}
      </div>
    </div>
  );
}
