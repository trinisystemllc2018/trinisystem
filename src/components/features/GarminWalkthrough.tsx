"use client";

import { useState } from "react";
import type { WalkthroughScreen, WalkthroughBody } from "@/lib/garmin-apps-data";
import { GARMIN_THEME } from "@/lib/garmin-apps-data";

/* ═══════════════════════════════════════════════════════════════════
   GarminWalkthrough — Practice Mode walkthrough for Garmin Express,
   WebUpdater, Connect mobile, ActiveCaptain, Pilot, and Honda nav portal.

   Brand color: Garmin Blue (#0070BB)
   Renders 16 different screen kinds. Each screen shows pixel-similar
   chrome of the actual app being demoed, with a "PRACTICE MODE" watermark
   and an animated arrow pointing at the relevant control.
═══════════════════════════════════════════════════════════════════ */

const T = GARMIN_THEME;

type Props = { screens: WalkthroughScreen[] };

export default function GarminWalkthrough({ screens }: Props) {
  const [idx, setIdx] = useState(0);
  if (!screens || screens.length === 0) return null;
  const screen = screens[idx];
  const total = screens.length;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl"
      style={{ backgroundColor: T.bgPanel, border: `1px solid ${T.border}` }}
    >
      {/* HEADER STRIP */}
      <div
        className="flex items-center justify-between px-5 py-3 text-white"
        style={{ backgroundColor: T.primary }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider opacity-90">
            Practice Mode
          </span>
          <span className="text-xs opacity-75">Step {idx + 1} of {total}</span>
        </div>
        <button
          onClick={() => setIdx(0)}
          className="text-xs font-semibold underline opacity-90 hover:opacity-100"
        >
          Restart
        </button>
      </div>

      {/* TITLE & CAPTION */}
      <div className="px-5 py-4" style={{ backgroundColor: T.bgCard }}>
        <h3 className="text-xl md:text-2xl font-bold mb-1" style={{ color: T.text }}>
          {screen.title}
        </h3>
        <p className="text-base md:text-lg" style={{ color: T.textSecondary }}>
          {screen.caption}
        </p>
      </div>

      {/* SCREEN MOCKUP AREA */}
      <div
        className="relative px-5 py-6 md:py-8"
        style={{ backgroundColor: "#E8ECF0" }}
      >
        {/* Practice Mode watermark — diagonal */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            transform: "rotate(-18deg)",
            opacity: 0.08,
            fontSize: "min(8vw, 64px)",
            fontWeight: 900,
            color: T.primaryDark,
            letterSpacing: "0.1em",
            zIndex: 5,
          }}
        >
          PRACTICE MODE
        </div>

        {/* The mocked-up app screen */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <ScreenRenderer body={screen.body} />
        </div>

        {/* Animated arrow + tooltip */}
        <div
          className="relative z-20 mt-4 mx-auto max-w-md flex items-start gap-3 rounded-lg px-4 py-3"
          style={{ backgroundColor: T.bgWarning, border: `2px solid #E5A600` }}
        >
          <div className="text-2xl animate-pulse" style={{ color: T.textWarning }}>
            ↓
          </div>
          <div>
            <div className="font-bold text-base md:text-lg" style={{ color: T.textWarning }}>
              {screen.tooltipText}
            </div>
            {screen.warningNote && (
              <div className="text-sm md:text-base mt-1" style={{ color: T.textWarning }}>
                ⚠ {screen.warningNote}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div
        className="flex items-center justify-between px-5 py-4 gap-3"
        style={{ backgroundColor: T.bgCard, borderTop: `1px solid ${T.border}` }}
      >
        <button
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={idx === 0}
          className="px-5 py-3 rounded-lg font-semibold text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: idx === 0 ? T.border : T.bgCard,
            color: T.text,
            border: `2px solid ${T.border}`,
          }}
        >
          ← Back
        </button>
        <div className="flex gap-1.5">
          {screens.map((_, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ backgroundColor: i === idx ? T.primary : T.border }}
            />
          ))}
        </div>
        <button
          onClick={() => setIdx(Math.min(total - 1, idx + 1))}
          disabled={idx === total - 1}
          className="px-5 py-3 rounded-lg font-bold text-base text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: T.primary }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCREEN RENDERER — picks the right mockup component for each kind
───────────────────────────────────────────────────────────────── */

function ScreenRenderer({ body }: { body: WalkthroughBody }) {
  switch (body.kind) {
    case "garmin-download-page":
      return <GarminDownloadPage os={body.os} />;
    case "garmin-installer-windows":
      return <GarminInstallerWindows stage={body.stage} />;
    case "garmin-installer-mac":
      return <GarminInstallerMac />;
    case "garmin-express-empty":
      return <GarminExpressEmpty />;
    case "garmin-express-detect":
      return <GarminExpressDetect deviceFound={body.deviceFound} deviceName={body.deviceName} />;
    case "garmin-express-dashboard":
      return (
        <GarminExpressDashboard
          deviceType={body.deviceType}
          deviceName={body.deviceName}
          pendingUpdates={body.pendingUpdates}
          mapSize={body.mapSize}
        />
      );
    case "garmin-express-installing":
      return <GarminExpressInstalling percent={body.percent} itemName={body.itemName} />;
    case "garmin-express-complete":
      return <GarminExpressComplete />;
    case "garmin-express-error":
      return <GarminExpressError errorType={body.errorType} />;
    case "garmin-webupdater":
      return <GarminWebUpdater stage={body.stage} />;
    case "garmin-connect-mobile":
      return <GarminConnectMobile stage={body.stage} />;
    case "activecaptain-app":
      return <ActiveCaptainApp stage={body.stage} />;
    case "garmin-pilot":
      return <GarminPilot stage={body.stage} />;
    case "honda-portal":
      return <HondaPortal stage={body.stage} />;
    case "browser-frame":
      return <BrowserFrame url={body.url} pageContent={body.pageContent} />;
  }
}

/* ─── SHARED CHROME ─────────────────────────────────────────────── */

function AppFrame({ children, title = "Garmin Express" }: { children: React.ReactNode; title?: string }) {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg"
      style={{ border: `1px solid ${T.border}`, backgroundColor: T.bgCard }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 text-white text-sm"
        style={{ backgroundColor: T.primaryDark }}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold">{title}</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white/30" />
          <span className="w-3 h-3 rounded-full bg-white/30" />
          <span className="w-3 h-3 rounded-full bg-white/30" />
        </div>
      </div>
      {children}
    </div>
  );
}

function GarminLogo({ size = "text-xl" }: { size?: string }) {
  return (
    <div className={`font-extrabold ${size}`} style={{ color: T.primary, letterSpacing: "-0.02em" }}>
      GARMIN
    </div>
  );
}

/* ─── BROWSER FRAME ─────────────────────────────────────────────── */

function BrowserFrame({ url, pageContent }: { url: string; pageContent: string }) {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg"
      style={{ border: `1px solid ${T.border}`, backgroundColor: T.bgCard }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#E5E7EB" }}
      >
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div
          className="ml-3 flex-1 px-3 py-1.5 rounded text-sm"
          style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}
        >
          🔒 {url}
        </div>
      </div>
      <div className="p-6 min-h-[300px]" style={{ backgroundColor: T.bgCard }}>
        {pageContent === "garmin-express-download" || pageContent === "garmin-home" ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <GarminLogo size="text-2xl" />
              <div className="text-sm" style={{ color: T.textSecondary }}>Sign In</div>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: T.text }}>Garmin Express</h2>
            <p className="text-base mb-6" style={{ color: T.textSecondary }}>
              Update maps, software, and sync your Garmin device.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                className="px-6 py-3 rounded-lg text-white font-bold"
                style={{ backgroundColor: T.primary }}
              >
                Download for Windows
              </button>
              <button
                className="px-6 py-3 rounded-lg font-bold"
                style={{ backgroundColor: T.bgCard, color: T.primary, border: `2px solid ${T.primary}` }}
              >
                Download for Mac
              </button>
            </div>
          </div>
        ) : pageContent === "fly-garmin" ? (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GarminLogo size="text-xl" />
              <span className="text-base font-semibold" style={{ color: T.primaryDark }}>flyGarmin</span>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: T.text }}>Aviation Pilot Portal</h2>
            <p className="text-base mb-4" style={{ color: T.textSecondary }}>
              Manage aircraft, subscriptions, and aviation databases.
            </p>
            <div className="space-y-2">
              <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: T.bgPanel }}>
                ✈️ My Aircraft
              </div>
              <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: T.bgPanel }}>
                📅 Database Subscriptions
              </div>
              <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: T.bgPanel }}>
                📚 Pilot Logbook
              </div>
            </div>
          </div>
        ) : pageContent === "webupdater-page" ? (
          <div>
            <GarminLogo size="text-2xl" />
            <h2 className="text-2xl font-bold mt-4 mb-2" style={{ color: T.text }}>WebUpdater</h2>
            <p className="text-base mb-4" style={{ color: T.textSecondary }}>
              Legacy software updater for older Garmin devices.
            </p>
            <p className="text-sm mb-4" style={{ color: T.textSecondary }}>
              Updates device software (firmware) for products no longer supported by Garmin Express.
            </p>
            <div className="flex gap-3">
              <button className="px-5 py-2 rounded text-white font-semibold" style={{ backgroundColor: T.primary }}>
                Download for Windows
              </button>
              <button
                className="px-5 py-2 rounded font-semibold"
                style={{ backgroundColor: T.bgCard, color: T.primary, border: `2px solid ${T.primary}` }}
              >
                Download for Mac
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12" style={{ color: T.textSecondary }}>
            <GarminLogo />
            <p className="mt-4">Loading garmin.com...</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── DOWNLOAD PAGE ─────────────────────────────────────────────── */

function GarminDownloadPage({ os }: { os: "windows" | "mac" }) {
  return (
    <div className="rounded-lg p-6 shadow-md" style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between mb-6">
        <GarminLogo size="text-2xl" />
        <div className="text-xs" style={{ color: T.textSecondary }}>garmin.com/express</div>
      </div>
      <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ color: T.text }}>
        Garmin Express
      </h2>
      <p className="text-base mb-5" style={{ color: T.textSecondary }}>
        Free desktop app to update your Garmin device's maps and software.
      </p>
      <div
        className="px-4 py-3 rounded-lg mb-4 text-sm"
        style={{ backgroundColor: T.bgPanel, color: T.textSecondary }}
      >
        Detected: <span style={{ color: T.text, fontWeight: 600 }}>
          {os === "windows" ? "Windows 10/11" : "macOS 11+"}
        </span>
      </div>
      <button
        className="w-full px-6 py-4 rounded-lg text-white font-bold text-lg flex items-center justify-center gap-2"
        style={{ backgroundColor: T.primary }}
      >
        ↓ Download for {os === "windows" ? "Windows" : "Mac"}
      </button>
      <p className="text-xs mt-3 text-center" style={{ color: T.textSecondary }}>
        File size: about {os === "windows" ? "80 MB" : "95 MB"}
      </p>
    </div>
  );
}

/* ─── INSTALLER WINDOWS ─────────────────────────────────────────── */

function GarminInstallerWindows({ stage }: { stage: "welcome" | "license" | "progress" | "complete" }) {
  return (
    <AppFrame title="Garmin Express Setup">
      <div className="p-6 min-h-[280px] flex flex-col">
        {stage === "welcome" && (
          <>
            <GarminLogo size="text-xl" />
            <h3 className="text-xl font-bold mt-4 mb-2" style={{ color: T.text }}>
              Welcome to Garmin Express Setup
            </h3>
            <p className="text-base mb-6" style={{ color: T.textSecondary }}>
              This wizard will guide you through installing Garmin Express on your computer.
              Click Next to continue.
            </p>
            <div className="mt-auto flex justify-end gap-2">
              <button className="px-4 py-2 rounded text-sm" style={{ border: `1px solid ${T.border}`, color: T.text }}>
                Cancel
              </button>
              <button className="px-5 py-2 rounded text-sm text-white font-semibold" style={{ backgroundColor: T.primary }}>
                Next →
              </button>
            </div>
          </>
        )}
        {stage === "license" && (
          <>
            <h3 className="text-lg font-bold mb-3" style={{ color: T.text }}>License Agreement</h3>
            <div
              className="flex-1 p-3 rounded text-xs overflow-hidden mb-4"
              style={{ backgroundColor: T.bgPanel, color: T.textSecondary, maxHeight: "120px" }}
            >
              GARMIN INTERNATIONAL, INC. SOFTWARE LICENSE AGREEMENT BY DOWNLOADING, INSTALLING,
              OR USING THE GARMIN EXPRESS SOFTWARE, YOU AGREE TO BE BOUND BY THE TERMS OF THIS
              LICENSE AGREEMENT. PLEASE READ CAREFULLY...
            </div>
            <label className="flex items-center gap-2 mb-4 text-sm" style={{ color: T.text }}>
              <input type="radio" defaultChecked /> I accept the terms in the License Agreement
            </label>
            <div className="mt-auto flex justify-end gap-2">
              <button className="px-4 py-2 rounded text-sm" style={{ border: `1px solid ${T.border}`, color: T.text }}>
                Back
              </button>
              <button className="px-5 py-2 rounded text-sm text-white font-semibold" style={{ backgroundColor: T.primary }}>
                Next →
              </button>
            </div>
          </>
        )}
        {stage === "progress" && (
          <>
            <h3 className="text-lg font-bold mb-3" style={{ color: T.text }}>Installing Garmin Express</h3>
            <p className="text-sm mb-6" style={{ color: T.textSecondary }}>
              Please wait while Setup installs Garmin Express. This may take a few minutes.
            </p>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
              <div className="h-full rounded-full transition-all" style={{ width: "65%", backgroundColor: T.accent }} />
            </div>
            <p className="text-xs mt-2" style={{ color: T.textSecondary }}>
              Copying program files... 65% complete
            </p>
          </>
        )}
        {stage === "complete" && (
          <>
            <div className="text-5xl text-center mb-2" style={{ color: T.accent }}>✓</div>
            <h3 className="text-xl font-bold mb-2 text-center" style={{ color: T.text }}>
              Installation Complete
            </h3>
            <p className="text-base mb-6 text-center" style={{ color: T.textSecondary }}>
              Garmin Express has been installed on your computer.
            </p>
            <label className="flex items-center gap-2 mb-4 text-sm justify-center" style={{ color: T.text }}>
              <input type="checkbox" defaultChecked /> Launch Garmin Express now
            </label>
            <div className="mt-auto flex justify-center">
              <button className="px-8 py-3 rounded text-base text-white font-bold" style={{ backgroundColor: T.primary }}>
                Finish
              </button>
            </div>
          </>
        )}
      </div>
    </AppFrame>
  );
}

/* ─── INSTALLER MAC ─────────────────────────────────────────────── */

function GarminInstallerMac() {
  return (
    <div className="rounded-lg p-6 shadow-md" style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold" style={{ color: T.text }}>GarminExpress</span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>
      <div className="flex items-center justify-around py-12 gap-3">
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-2 text-white font-bold text-2xl shadow-lg"
            style={{ backgroundColor: T.primary }}
          >
            E
          </div>
          <p className="text-xs font-semibold" style={{ color: T.text }}>Garmin Express</p>
        </div>
        <div className="text-3xl animate-pulse" style={{ color: T.primary }}>→</div>
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-2 text-3xl shadow-lg"
            style={{ backgroundColor: T.bgPanel, border: `2px dashed ${T.primary}` }}
          >
            📁
          </div>
          <p className="text-xs font-semibold" style={{ color: T.text }}>Applications</p>
        </div>
      </div>
      <p className="text-center text-sm" style={{ color: T.textSecondary }}>
        Drag the Garmin Express icon onto the Applications folder to install
      </p>
    </div>
  );
}

/* ─── GARMIN EXPRESS APP — EMPTY ────────────────────────────────── */

function GarminExpressEmpty() {
  return (
    <AppFrame>
      <div className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
        <GarminLogo size="text-2xl" />
        <h3 className="text-xl font-bold mt-6 mb-2" style={{ color: T.text }}>
          Welcome to Garmin Express
        </h3>
        <p className="text-base mb-6 max-w-sm" style={{ color: T.textSecondary }}>
          Sign in to your Garmin account, then add a device to get started.
        </p>
        <button
          className="px-8 py-3 rounded-lg text-white font-bold mb-3"
          style={{ backgroundColor: T.primary }}
        >
          Sign In
        </button>
        <button
          className="text-sm font-semibold"
          style={{ color: T.primary }}
        >
          + Add a Device
        </button>
      </div>
    </AppFrame>
  );
}

/* ─── GARMIN EXPRESS — DETECT ───────────────────────────────────── */

function GarminExpressDetect({ deviceFound, deviceName }: { deviceFound: boolean; deviceName?: string }) {
  return (
    <AppFrame>
      <div className="p-6 min-h-[300px]">
        <h3 className="text-base font-semibold mb-4" style={{ color: T.text }}>
          {deviceFound ? "Device Found" : "Searching for your Garmin device..."}
        </h3>
        {!deviceFound ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 rounded-full border-4 animate-spin mb-4" style={{ borderColor: `${T.primary} transparent transparent transparent` }} />
            <p className="text-sm" style={{ color: T.textSecondary }}>
              Make sure your device is connected with a USB cable
            </p>
          </div>
        ) : (
          <div
            className="rounded-lg p-5 flex items-center gap-4"
            style={{ backgroundColor: T.bgPanel, border: `2px solid ${T.primary}` }}
          >
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0"
              style={{ backgroundColor: T.primary }}
            >
              ⌚
            </div>
            <div className="flex-1">
              <div className="text-base font-bold" style={{ color: T.text }}>{deviceName}</div>
              <div className="text-xs mt-1" style={{ color: T.textSecondary }}>
                Serial: 0123456789 · Firmware: v15.10
              </div>
            </div>
            <button
              className="px-4 py-2 rounded text-white font-semibold text-sm"
              style={{ backgroundColor: T.primary }}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </AppFrame>
  );
}

/* ─── GARMIN EXPRESS — DASHBOARD ────────────────────────────────── */

function GarminExpressDashboard({
  deviceType,
  deviceName,
  pendingUpdates,
  mapSize,
}: {
  deviceType: "watch" | "nuvi" | "drivesmart" | "dezl";
  deviceName: string;
  pendingUpdates: number;
  mapSize?: string;
}) {
  const icon = deviceType === "watch" ? "⌚" : deviceType === "dezl" ? "🚛" : "🧭";
  return (
    <AppFrame>
      <div className="p-5 min-h-[300px]">
        <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0"
            style={{ backgroundColor: T.primary }}
          >
            {icon}
          </div>
          <div className="flex-1">
            <div className="font-bold text-base" style={{ color: T.text }}>{deviceName}</div>
            <div className="text-xs" style={{ color: T.textSecondary }}>Connected · Ready</div>
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: pendingUpdates > 0 ? "#E5A600" : T.accent }}
          >
            {pendingUpdates} {pendingUpdates === 1 ? "update" : "updates"}
          </div>
        </div>
        <div className="space-y-2">
          {pendingUpdates > 0 && mapSize && (
            <UpdateRow icon="🗺" name="Map update" size={mapSize} />
          )}
          {pendingUpdates > 0 && (
            <UpdateRow icon="⚙" name={deviceType === "watch" ? "Watch software v15.20" : "Device software"} size={"68 MB"} />
          )}
          {pendingUpdates === 0 && (
            <div className="py-8 text-center" style={{ color: T.accent }}>
              ✓ Everything is up to date
            </div>
          )}
        </div>
        {pendingUpdates > 0 && (
          <button
            className="w-full mt-5 py-3 rounded-lg text-white font-bold"
            style={{ backgroundColor: T.primary }}
          >
            Install All
          </button>
        )}
      </div>
    </AppFrame>
  );
}

function UpdateRow({ icon, name, size }: { icon: string; name: string; size: string }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded"
      style={{ backgroundColor: T.bgPanel }}
    >
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <div className="font-semibold text-sm" style={{ color: T.text }}>{name}</div>
        <div className="text-xs" style={{ color: T.textSecondary }}>Size: {size}</div>
      </div>
      <button
        className="px-3 py-1.5 rounded text-xs text-white font-semibold"
        style={{ backgroundColor: T.primary }}
      >
        Install
      </button>
    </div>
  );
}

/* ─── GARMIN EXPRESS — INSTALLING ───────────────────────────────── */

function GarminExpressInstalling({ percent, itemName }: { percent: number; itemName: string }) {
  return (
    <AppFrame>
      <div className="p-6 min-h-[300px] flex flex-col">
        <h3 className="text-lg font-bold mb-2" style={{ color: T.text }}>Installing update</h3>
        <p className="text-sm mb-6" style={{ color: T.textSecondary }}>{itemName}</p>
        <div className="w-full h-4 rounded-full overflow-hidden mb-3" style={{ backgroundColor: T.border }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${percent}%`, backgroundColor: T.accent }} />
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: T.text, fontWeight: 600 }}>{percent}%</span>
          <span style={{ color: T.textSecondary }}>About {Math.max(1, Math.round((100 - percent) * 0.4))} minutes left</span>
        </div>
        <div
          className="mt-auto p-3 rounded text-xs"
          style={{ backgroundColor: T.bgWarning, color: T.textWarning, border: `1px solid #E5A600` }}
        >
          ⚠ Don't unplug your device or close this window during the update.
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── GARMIN EXPRESS — COMPLETE ─────────────────────────────────── */

function GarminExpressComplete() {
  return (
    <AppFrame>
      <div className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-white text-4xl"
          style={{ backgroundColor: T.accent }}
        >
          ✓
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: T.text }}>Update complete</h3>
        <p className="text-base mb-6 max-w-sm" style={{ color: T.textSecondary }}>
          Your Garmin device is up to date. You can safely disconnect it.
        </p>
        <button
          className="px-6 py-2.5 rounded-lg text-white font-semibold"
          style={{ backgroundColor: T.primary }}
        >
          Eject and disconnect
        </button>
      </div>
    </AppFrame>
  );
}

/* ─── GARMIN EXPRESS — ERROR ────────────────────────────────────── */

function GarminExpressError({ errorType }: { errorType: "device-not-found" | "update-failed" | "no-internet" | "low-storage" }) {
  const errors = {
    "device-not-found": {
      title: "Device not found",
      msg: "Garmin Express could not detect a connected device. Check your USB cable and try a different USB port.",
    },
    "update-failed": {
      title: "Update failed",
      msg: "The update could not be completed. This usually means the connection was interrupted. Please try again.",
    },
    "no-internet": {
      title: "No internet connection",
      msg: "Garmin Express needs an internet connection to download updates. Check your Wi-Fi or network connection.",
    },
    "low-storage": {
      title: "Not enough free space",
      msg: "Your device doesn't have enough free space for this update. Try inserting a microSD card or removing unused content.",
    },
  };
  const err = errors[errorType];
  return (
    <AppFrame>
      <div className="p-6 min-h-[280px]">
        <div
          className="rounded-lg p-5"
          style={{ backgroundColor: T.bgError, border: `2px solid ${T.textError}` }}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl flex-shrink-0">⚠</div>
            <div>
              <h3 className="text-lg font-bold mb-2" style={{ color: T.textError }}>{err.title}</h3>
              <p className="text-base" style={{ color: T.text }}>{err.msg}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 justify-end">
          <button className="px-4 py-2 rounded text-sm font-semibold" style={{ border: `1px solid ${T.border}`, color: T.text }}>
            Get Help
          </button>
          <button
            className="px-5 py-2 rounded text-sm text-white font-semibold"
            style={{ backgroundColor: T.primary }}
          >
            Retry
          </button>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── WEB UPDATER (LEGACY) ──────────────────────────────────────── */

function GarminWebUpdater({ stage }: { stage: "search" | "found" | "installing" }) {
  return (
    <div
      className="rounded-md overflow-hidden shadow-md"
      style={{ border: `2px solid #888`, backgroundColor: "#ECECEC" }}
    >
      <div
        className="px-3 py-1.5 text-white text-xs font-bold"
        style={{ backgroundColor: "#4A6FA5" }}
      >
        Garmin WebUpdater 2.5.8
      </div>
      <div className="p-5 min-h-[260px]" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="flex items-center gap-3 mb-4">
          <GarminLogo size="text-base" />
          <span className="text-xs font-semibold" style={{ color: "#555" }}>Software Updater</span>
        </div>
        {stage === "search" && (
          <>
            <p className="text-sm mb-4" style={{ color: "#222" }}>
              Click "Search" to look for available updates for your connected Garmin device.
            </p>
            <button
              className="px-5 py-2 text-sm font-semibold border"
              style={{ backgroundColor: "#E0E0E0", color: "#222", border: "1px solid #888" }}
            >
              Search for Updates
            </button>
          </>
        )}
        {stage === "found" && (
          <>
            <p className="text-sm mb-3" style={{ color: "#222" }}>
              Found device: <strong>nuvi 1450</strong>
            </p>
            <div
              className="p-3 rounded text-sm mb-4"
              style={{ backgroundColor: T.bgCard, border: "1px solid #888" }}
            >
              <strong>Available update:</strong><br />
              System Software v6.20 (4.2 MB)
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-1.5 text-sm font-semibold border"
                style={{ backgroundColor: "#E0E0E0", color: "#222", border: "1px solid #888" }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1.5 text-sm font-semibold text-white"
                style={{ backgroundColor: T.primary }}
              >
                Continue
              </button>
            </div>
          </>
        )}
        {stage === "installing" && (
          <>
            <p className="text-sm mb-3" style={{ color: "#222" }}>
              Installing update on nuvi 1450...
            </p>
            <div className="w-full h-3 mb-2" style={{ backgroundColor: "#D0D0D0", border: "1px solid #888" }}>
              <div className="h-full" style={{ width: "55%", backgroundColor: T.primary }} />
            </div>
            <p className="text-xs" style={{ color: "#555" }}>
              Transferring software to device... please do not disconnect.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── GARMIN CONNECT MOBILE ─────────────────────────────────────── */

function GarminConnectMobile({ stage }: { stage: "welcome" | "device-pick" | "pairing" | "synced" }) {
  return (
    <div
      className="mx-auto rounded-3xl overflow-hidden shadow-2xl"
      style={{ backgroundColor: "#000", border: "8px solid #1a1a1a", maxWidth: "320px" }}
    >
      <div
        className="px-5 py-2 text-white text-xs flex justify-between"
        style={{ backgroundColor: "#000" }}
      >
        <span>9:41</span>
        <span>📶 🔋</span>
      </div>
      <div
        className="px-4 py-3 text-white flex items-center gap-2"
        style={{ backgroundColor: T.primary }}
      >
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">G</div>
        <span className="font-bold text-base">Garmin Connect</span>
      </div>
      <div className="p-5 min-h-[360px]" style={{ backgroundColor: "#F5F5F5" }}>
        {stage === "welcome" && (
          <div className="text-center">
            <GarminLogo size="text-2xl" />
            <h3 className="text-lg font-bold mt-6 mb-2" style={{ color: T.text }}>
              Welcome to Garmin Connect
            </h3>
            <p className="text-sm mb-6" style={{ color: T.textSecondary }}>
              Track your fitness, sync your watch, and reach your goals.
            </p>
            <button
              className="w-full py-3 rounded-lg text-white font-bold mb-2"
              style={{ backgroundColor: T.primary }}
            >
              Sign In
            </button>
            <button
              className="w-full py-3 rounded-lg font-semibold"
              style={{ backgroundColor: T.bgCard, color: T.primary, border: `2px solid ${T.primary}` }}
            >
              Create Account
            </button>
          </div>
        )}
        {stage === "device-pick" && (
          <>
            <h3 className="text-base font-bold mb-4" style={{ color: T.text }}>Pick your Garmin device</h3>
            <div className="space-y-2">
              {["fenix 7", "Forerunner 265", "vivoactive 5", "venu 3"].map((d) => (
                <div
                  key={d}
                  className="px-3 py-3 rounded text-sm font-semibold"
                  style={{ backgroundColor: T.bgCard, color: T.text, border: `1px solid ${T.border}` }}
                >
                  ⌚ {d}
                </div>
              ))}
            </div>
          </>
        )}
        {stage === "pairing" && (
          <div className="text-center">
            <div className="text-4xl mb-3 animate-pulse">📱⟷⌚</div>
            <h3 className="text-base font-bold mb-2" style={{ color: T.text }}>Pair your watch</h3>
            <p className="text-sm mb-4" style={{ color: T.textSecondary }}>
              Enter the 6-digit code shown on your watch
            </p>
            <div
              className="text-2xl font-bold tracking-widest p-3 rounded mb-3"
              style={{ backgroundColor: T.bgCard, border: `2px solid ${T.primary}`, color: T.primaryDark }}
            >
              4 2 8 1 9 3
            </div>
            <button
              className="w-full py-3 rounded-lg text-white font-bold"
              style={{ backgroundColor: T.primary }}
            >
              Pair
            </button>
          </div>
        )}
        {stage === "synced" && (
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-white text-3xl"
              style={{ backgroundColor: T.accent }}
            >
              ✓
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: T.text }}>You're all set!</h3>
            <p className="text-sm mb-4" style={{ color: T.textSecondary }}>
              Your fenix 7 is now syncing with Garmin Connect.
            </p>
            <div
              className="p-3 rounded text-sm text-left"
              style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}
            >
              <div className="font-semibold mb-1" style={{ color: T.text }}>Today's stats</div>
              <div className="flex justify-between text-xs" style={{ color: T.textSecondary }}>
                <span>Steps: 5,234</span>
                <span>Heart rate: 68</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ACTIVECAPTAIN APP ─────────────────────────────────────────── */

function ActiveCaptainApp({ stage }: { stage: "home" | "charts" | "wifi-pair" }) {
  return (
    <div
      className="mx-auto rounded-3xl overflow-hidden shadow-2xl"
      style={{ backgroundColor: "#000", border: "8px solid #1a1a1a", maxWidth: "320px" }}
    >
      <div className="px-5 py-2 text-white text-xs flex justify-between" style={{ backgroundColor: "#000" }}>
        <span>9:41</span>
        <span>📶 🔋</span>
      </div>
      <div
        className="px-4 py-3 text-white flex items-center gap-2"
        style={{ backgroundColor: "#0E4A6B" }}
      >
        <span className="text-sm font-bold">⚓ ActiveCaptain</span>
      </div>
      <div className="min-h-[340px]" style={{ backgroundColor: "#E8F0F5" }}>
        {stage === "home" && (
          <div className="p-5">
            <h3 className="text-base font-bold mb-3" style={{ color: T.text }}>Connect your boat</h3>
            <p className="text-xs mb-4" style={{ color: T.textSecondary }}>
              Pair your Garmin chartplotter to sync charts and routes.
            </p>
            <div className="space-y-2">
              <div className="p-3 rounded" style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}>
                <div className="text-xs font-semibold" style={{ color: T.text }}>📡 Pair chartplotter</div>
              </div>
              <div className="p-3 rounded" style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}>
                <div className="text-xs font-semibold" style={{ color: T.text }}>🗺 My charts</div>
              </div>
              <div className="p-3 rounded" style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}>
                <div className="text-xs font-semibold" style={{ color: T.text }}>📍 Plan a trip</div>
              </div>
            </div>
            <button
              className="w-full mt-4 py-2.5 rounded text-white text-sm font-bold"
              style={{ backgroundColor: "#0E4A6B" }}
            >
              Sign In
            </button>
          </div>
        )}
        {stage === "wifi-pair" && (
          <div className="p-5 text-center">
            <div className="text-3xl mb-2">📡</div>
            <h3 className="text-base font-bold mb-2" style={{ color: T.text }}>Pair to chartplotter</h3>
            <p className="text-xs mb-4" style={{ color: T.textSecondary }}>
              Connect your phone to your boat's Wi-Fi to pair.
            </p>
            <div className="p-3 rounded mb-3 text-left" style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}>
              <div className="text-xs font-semibold" style={{ color: T.text }}>Wi-Fi network:</div>
              <div className="text-sm font-bold" style={{ color: T.primary }}>GarminMarine_42891</div>
              <div className="text-xs mt-1" style={{ color: T.textSecondary }}>Password: BoatNav2026</div>
            </div>
            <button
              className="w-full py-2.5 rounded text-white text-sm font-bold"
              style={{ backgroundColor: "#0E4A6B" }}
            >
              Open Wi-Fi Settings
            </button>
          </div>
        )}
        {stage === "charts" && (
          <div className="p-3">
            <h3 className="text-sm font-bold mb-2" style={{ color: T.text }}>Charts</h3>
            <div
              className="rounded h-48 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6BAED6 0%, #C6E2F0 50%, #FAD49E 100%)",
              }}
            >
              <div
                className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full"
                style={{ backgroundColor: T.textError }}
              />
              <div className="absolute top-1/2 right-1/3 text-xs font-bold" style={{ color: "#0E4A6B" }}>⚓</div>
              <div className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-white/80 font-semibold">
                Tap to download
              </div>
            </div>
            <div className="mt-3 p-2 rounded text-xs" style={{ backgroundColor: T.bgCard }}>
              <span style={{ color: T.text, fontWeight: 600 }}>Navionics+ US East</span> · <span style={{ color: T.accent }}>Subscribed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── GARMIN PILOT ──────────────────────────────────────────────── */

function GarminPilot({ stage }: { stage: "home" | "database-concierge" | "downloading" }) {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-xl mx-auto"
      style={{ backgroundColor: "#1a1a1a", border: `1px solid ${T.border}`, maxWidth: "500px" }}
    >
      <div
        className="px-4 py-2.5 text-white flex items-center justify-between"
        style={{ backgroundColor: "#0a3d62" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-bold">✈ Garmin Pilot</span>
        </div>
        <span className="text-xs opacity-75">N12345</span>
      </div>
      <div className="p-5 min-h-[280px]" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
        {stage === "home" && (
          <>
            <h3 className="text-base font-bold mb-4">Home</h3>
            <div className="grid grid-cols-2 gap-2">
              {["📋 Trip Planning", "🌦 Weather", "📡 Connext", "📚 Charts"].map((item) => (
                <div
                  key={item}
                  className="p-3 rounded text-xs font-semibold text-center"
                  style={{ backgroundColor: "#2a2a2a" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        )}
        {stage === "database-concierge" && (
          <>
            <h3 className="text-base font-bold mb-2">Connext › Database Concierge</h3>
            <p className="text-xs mb-4 opacity-75">
              Wireless transfer to your aircraft via Flight Stream 510
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: "#2a2a2a" }}>
                <span>Database Concierge</span>
                <div className="w-10 h-5 rounded-full relative" style={{ backgroundColor: T.accent }}>
                  <div className="w-4 h-4 rounded-full bg-white absolute right-0.5 top-0.5" />
                </div>
              </div>
              <div className="text-xs space-y-1 mt-3 opacity-75">
                <div>📅 NavData cycle 2606 (effective May 22, 2026)</div>
                <div>📅 SafeTaxi 26S2</div>
                <div>📅 FliteCharts 2026.06</div>
              </div>
            </div>
          </>
        )}
        {stage === "downloading" && (
          <>
            <h3 className="text-base font-bold mb-3">Downloading databases</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Jeppesen NavData</span>
                  <span className="opacity-75">847 MB / 1.2 GB</span>
                </div>
                <div className="w-full h-2 rounded" style={{ backgroundColor: "#333" }}>
                  <div className="h-full rounded" style={{ width: "70%", backgroundColor: T.primary }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>FliteCharts</span>
                  <span className="opacity-75">2.1 GB / 3.8 GB</span>
                </div>
                <div className="w-full h-2 rounded" style={{ backgroundColor: "#333" }}>
                  <div className="h-full rounded" style={{ width: "55%", backgroundColor: T.primary }} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── HONDA PORTAL ──────────────────────────────────────────────── */

function HondaPortal({ stage }: { stage: "vin-entry" | "download-options" }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md" style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}>
      <div
        className="px-4 py-3 text-white flex items-center justify-between"
        style={{ backgroundColor: "#CC0000" }}
      >
        <span className="font-bold text-sm">HONDA Navigation Update</span>
        <span className="text-xs opacity-90">Powered by Garmin</span>
      </div>
      <div className="p-5 min-h-[280px]">
        {stage === "vin-entry" && (
          <>
            <h3 className="text-lg font-bold mb-2" style={{ color: T.text }}>Enter your VIN</h3>
            <p className="text-sm mb-4" style={{ color: T.textSecondary }}>
              Your 17-character VIN is on the corner of your driver-side windshield or door jamb.
            </p>
            <input
              type="text"
              placeholder="1HGBH41JXMN109186"
              className="w-full px-4 py-3 rounded-lg text-base font-mono mb-4"
              style={{ border: `2px solid ${T.borderInput}` }}
            />
            <button
              className="w-full py-3 rounded-lg text-white font-bold"
              style={{ backgroundColor: "#CC0000" }}
            >
              Continue
            </button>
          </>
        )}
        {stage === "download-options" && (
          <>
            <h3 className="text-lg font-bold mb-1" style={{ color: T.text }}>Honda Pilot 2019 EX-L</h3>
            <p className="text-sm mb-4" style={{ color: T.textSecondary }}>
              Map version available: 2026.10 · Released April 2026
            </p>
            <div className="space-y-2 mb-4">
              <div
                className="p-3 rounded flex items-center justify-between"
                style={{ backgroundColor: T.bgPanel, border: `2px solid ${T.primary}` }}
              >
                <div>
                  <div className="font-bold text-sm" style={{ color: T.text }}>USB Download</div>
                  <div className="text-xs" style={{ color: T.textSecondary }}>5.4 GB · 30 minutes</div>
                </div>
                <button
                  className="px-3 py-1.5 rounded text-white text-xs font-semibold"
                  style={{ backgroundColor: T.primary }}
                >
                  Download
                </button>
              </div>
              <div className="p-3 rounded flex items-center justify-between" style={{ backgroundColor: T.bgCard, border: `1px solid ${T.border}` }}>
                <div>
                  <div className="font-semibold text-sm" style={{ color: T.text }}>DVD by mail</div>
                  <div className="text-xs" style={{ color: T.textSecondary }}>Ships in 5-7 days</div>
                </div>
                <button
                  className="px-3 py-1.5 rounded text-xs font-semibold"
                  style={{ border: `1px solid ${T.border}`, color: T.text }}
                >
                  Order
                </button>
              </div>
            </div>
            <div
              className="p-3 rounded text-xs"
              style={{ backgroundColor: T.bgSuccess, color: T.textSuccess }}
            >
              ✓ Eligible for complimentary first map update
            </div>
          </>
        )}
      </div>
    </div>
  );
}
