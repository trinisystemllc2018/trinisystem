/**
 * GARMIN DATA — Single Source of Truth for all Garmin programmatic pages.
 *
 * Each entry = one fully-built page with unique content.
 * To add a new Garmin model, add an entry here. Page renders automatically.
 *
 * Critical for SEO: every field below MUST be unique per model. No copy-paste
 * boilerplate across entries — that's what triggers Google's spam classifier.
 */

// ───────────────────────────────────────────────────────────────────
// Hub series — DriveSmart, Drive, Nuvi, eTrex, Zumo, Dezl, RV, Forerunner, Fenix, Venu
// ───────────────────────────────────────────────────────────────────

export type GarminSeries = {
  slug: string;                    // URL slug (used as /garmin/<slug>)
  name: string;                    // Display name
  category: "auto" | "outdoor" | "moto" | "truck" | "rv" | "watch" | "marine";
  tagline: string;                 // 1-line summary for hero
  models: { name: string; year: string; market: string }[];
  commonProblems: { problem: string; cause: string; fixTime: string; remoteSuccess: string }[];
  uniqueErrorCodes: { code: string; meaning: string; fix: string }[];
  updateSteps: { step: number; title: string; detail: string; warnings?: string }[];
  realTimeIssues: { trigger: string; symptom: string; ourFix: string }[];
  faqs: { q: string; a: string }[];
  cableType: string;               // USB-mini, USB-C, etc — actual technical spec
  expressCompatible: boolean;
  estimatedFixCost: string;
  bgGradient: string;              // Hero background
  accentColor: string;             // Tailwind accent
  metaTitle: string;               // ≤50 chars
  metaDescription: string;         // 70-160 chars
  primaryKeywords: string[];
};

// ───────────────────────────────────────────────────────────────────
// 1. GARMIN DRIVESMART (55/65/76/86)
// ───────────────────────────────────────────────────────────────────

export const drivesmart: GarminSeries = {
  slug: "drivesmart-update",
  name: "Garmin DriveSmart",
  category: "auto",
  tagline: "Update DriveSmart 55, 65, 76, 86 — maps, voice traffic, and Bluetooth",
  models: [
    { name: "DriveSmart 55", year: "2019–", market: "5.5\" entry-level — most-sold car GPS in the US" },
    { name: "DriveSmart 65", year: "2019–", market: "6.95\" mainstream pick — Bluetooth voice control" },
    { name: "DriveSmart 76", year: "2021–", market: "6.95\" with traffic + helpful warnings (school zones, fatigue)" },
    { name: "DriveSmart 86", year: "2021–", market: "8\" big-screen — popular for older drivers" },
    { name: "DriveSmart 51", year: "2017–2019", market: "Older 5\" model — still active in the field" },
    { name: "DriveSmart 61", year: "2017–2019", market: "Older 6.95\" predecessor of 65" },
  ],
  commonProblems: [
    { problem: "Map update freezes at 39%", cause: "Garmin Express timeout; usually USB cable or full device storage", fixTime: "20 min", remoteSuccess: "92%" },
    { problem: "Bluetooth pairing keeps dropping", cause: "Stale Bluetooth cache; profile mismatch with iOS 17+", fixTime: "12 min", remoteSuccess: "95%" },
    { problem: "Live traffic icon won't appear", cause: "Smartphone Link app deprecated; needs Garmin Drive app", fixTime: "10 min", remoteSuccess: "98%" },
    { problem: "Touchscreen unresponsive after update", cause: "Firmware glitch; recovery via reset hole + Garmin Express", fixTime: "25 min", remoteSuccess: "85%" },
    { problem: "Voice prompts gone silent", cause: "Volume setting reset by firmware update; speaker driver", fixTime: "8 min", remoteSuccess: "100%" },
    { problem: "Routes calculate to wrong country", cause: "Map region setting reverted; locale wrong post-update", fixTime: "10 min", remoteSuccess: "100%" },
  ],
  uniqueErrorCodes: [
    { code: "Error 503", meaning: "Map data corrupt during update", fix: "Disconnect, run Garmin Express → Tools → Recover Maps. Avg 18 min." },
    { code: "Update Failed", meaning: "USB cable or PC port issue mid-transfer", fix: "Switch to rear PC USB port (front ports = lower power); use original cable not aftermarket." },
    { code: "Cannot Unlock Maps", meaning: "Map license tied to wrong device ID", fix: "Sign in to Garmin account on Express → re-link device. We do this remotely." },
    { code: "Storage Full", meaning: "Internal 16GB exceeded; full-region map won't fit", fix: "Install regional map only (e.g. US Northeast) instead of full North America." },
  ],
  updateSteps: [
    { step: 1, title: "Charge to 100% before connecting", detail: "DriveSmart units pull power from USB but if internal battery is below 20%, the unit will reboot mid-update and corrupt the map. Plug into wall charger for 30 minutes first.", warnings: "Do NOT unplug during update — corrupts the map partition." },
    { step: 2, title: "Use the original Garmin USB cable", detail: "Aftermarket micro-USB cables often miss the data pins (charging-only). DriveSmart 55 and 65 use micro-USB; 76 and 86 use USB-C. The original Garmin cable has 'Garmin' molded into the connector." },
    { step: 3, title: "Install Garmin Express on your PC or Mac", detail: "Download the latest Garmin Express from garmin.com/express. As of 2026, the version is 7.x. Older Express versions (6.x and below) cannot update DriveSmart 76/86 firmware." },
    { step: 4, title: "Connect device and click 'Add a Device'", detail: "Express auto-detects DriveSmart. If it doesn't, check Device Manager (Windows) — should show 'Garmin Mass Storage' under Disk drives. If it shows under 'Other devices' with a yellow triangle, the driver didn't install — reinstall Express." },
    { step: 5, title: "Choose Map Update vs Software Update", detail: "Map Update = the road database (usually 8–14 GB). Software Update = firmware (usually 30–80 MB). Always do firmware FIRST, then maps. Doing maps before firmware sometimes leaves the unit unable to read the new map format." },
    { step: 6, title: "Allow 45–90 minutes for full map update", detail: "DriveSmart map updates are 8–14 GB depending on region. On a USB 2.0 connection (DriveSmart's max), expect 45 minutes. USB 3.0 ports won't speed it up — the device is the bottleneck.", warnings: "Don't put the PC to sleep — many users wake to a half-updated unit." },
    { step: 7, title: "Verify map version on the device", detail: "After Express says 'Up to date', unplug. On the DriveSmart, go to Settings → Device → About → Map. Should show '2026.10' or newer. If it still shows the old version, the map didn't actually install — re-run Express." },
    { step: 8, title: "Reset Bluetooth pairings if applicable", detail: "DriveSmart 65/76/86 with Bluetooth: after firmware update, Bluetooth profile cache often goes stale. Settings → Wireless Networks → forget all paired phones, then re-pair from the phone side. Fixes 90% of post-update Bluetooth issues." },
  ],
  realTimeIssues: [
    { trigger: "After Windows 11 update", symptom: "DriveSmart not detected by PC at all", ourFix: "Reinstall Garmin USB driver. We push the correct .inf file via remote session — Windows 11 sometimes blocks the Garmin signed driver. 15 min remote fix." },
    { trigger: "After iPhone iOS 17+ update", symptom: "DriveSmart 65 Bluetooth pairs but voice traffic doesn't work", ourFix: "iOS 17 deprecated Smartphone Link. Install Garmin Drive app instead, re-pair, enable Wi-Fi tethering. 10 min remote." },
    { trigger: "After moving to new house", symptom: "Routes still try to navigate from old address", ourFix: "Settings → Navigation → Saved Locations → delete 'Home' → re-set Home to new address. 3 min." },
    { trigger: "Long road trip approaching", symptom: "Map shows last year's road network", ourFix: "Run map update at least 7 days before departure (allow 90 min download + verification). Don't update day-of." },
  ],
  faqs: [
    { q: "How often should I update my Garmin DriveSmart maps?", a: "Garmin releases major map updates 4 times per year (quarterly). For most drivers, updating twice a year is enough. If you drive in unfamiliar areas often or rely on the GPS for work, update quarterly. Models with 'lifetime maps' (DriveSmart with 'LM' suffix) are entitled to free updates forever — no extra purchase." },
    { q: "Why does my DriveSmart 65 say 'Update Failed' at 39%?", a: "39% is where the largest map files start transferring. Two causes: (1) USB cable degraded or aftermarket — switch to original Garmin cable, (2) PC USB port front-panel doesn't deliver enough power — plug into a rear motherboard port. About 92% of stuck-at-39% errors clear with these two fixes. If still stuck, call us at 347-953-1531." },
    { q: "Can I update DriveSmart 86 over WiFi without a computer?", a: "Yes — DriveSmart 86 (and 76) have built-in WiFi. Settings → Updates → Map → Update. Make sure the unit is on AC power because the battery won't last for an 8-14 GB download. WiFi map updates are slightly slower than Garmin Express via USB but require no PC." },
    { q: "Why is my DriveSmart 55 missing the Bluetooth menu?", a: "DriveSmart 55 doesn't have Bluetooth — only DriveSmart 65, 76, 86, and Drive 52 (with hyphen suffixes like 52T) have it. If your Settings → Wireless menu is missing, you most likely have a 55, not a 65. Confirm by checking the back label or Settings → Device → About." },
    { q: "How long does a Garmin DriveSmart map update actually take?", a: "Realistic timings on USB 2.0: DriveSmart 55 (~9 GB North America map) = 35 min. DriveSmart 65/76/86 (~12 GB North America HD map) = 60-75 min. Add 10 min for verification. Plan 90 min total. WiFi updates on 76/86 are 20–30% slower than USB." },
    { q: "My DriveSmart was working yesterday, now it won't power on. What do I do?", a: "Common cause is the internal battery has discharged below recovery voltage. Plug into wall charger (not PC USB) and wait 10 minutes WITHOUT pressing power. Then hold power for 10 seconds. If still no display, the unit needs a hard reset — small reset hole on the back near the screw. Press with a paperclip for 5 seconds while plugged in. We diagnose this remotely in 12 min — call 347-953-1531." },
    { q: "Can Trini System update my Garmin DriveSmart for me?", a: "Yes. We update Garmin DriveSmart units remotely — you connect the GPS to your computer with a USB cable, we connect to your computer via secure remote session, and we run the entire Garmin Express update while you watch. Average completion: 75 minutes including verification. Flat $49." },
  ],
  cableType: "USB-A to micro-USB (DriveSmart 55, 65) or USB-A to USB-C (DriveSmart 76, 86)",
  expressCompatible: true,
  estimatedFixCost: "$49 flat — includes full map + firmware update + verification",
  bgGradient: "linear-gradient(135deg, #051124 0%, #0a2247 40%, #0d3266 100%)",
  accentColor: "blue",
  metaTitle: "Garmin DriveSmart Update — 55, 65, 76, 86 Fix",
  metaDescription:
    "Update Garmin DriveSmart 55, 65, 76, 86 maps & firmware. Fix update failed at 39%, Bluetooth, voice prompts. Remote service from $49. Call 347-953-1531.",
  primaryKeywords: [
    "garmin drivesmart update", "garmin drivesmart 65 update", "garmin drivesmart 55 map update",
    "garmin drivesmart 76 update", "garmin drivesmart 86 firmware", "garmin drivesmart bluetooth fix",
    "garmin drivesmart update failed", "garmin drivesmart not working", "garmin drivesmart map update free",
    "drivesmart 65 won't connect", "garmin drivesmart wifi update",
  ],
};

// ───────────────────────────────────────────────────────────────────
// PROBLEM PAGES — These rank for diagnostic queries
// ───────────────────────────────────────────────────────────────────

export type GarminProblemPage = {
  slug: string;
  problemTitle: string;
  metaTitle: string;
  metaDescription: string;
  problemSummary: string;
  affectedModels: string[];
  symptoms: string[];
  causes: { cause: string; likelihood: string; description: string }[];
  diagnosticSteps: { step: number; title: string; detail: string; ifFails: string }[];
  fixSequence: { step: number; title: string; detail: string; estimatedTime: string }[];
  whenToCallUs: string;
  faqs: { q: string; a: string }[];
  bgGradient: string;
  accentColor: string;
  primaryKeywords: string[];
};

// ───────────────────────────────────────────────────────────────────
// 2. PROBLEM: Garmin Express Not Working
// ───────────────────────────────────────────────────────────────────

export const expressNotWorking: GarminProblemPage = {
  slug: "express-not-working",
  problemTitle: "Garmin Express Not Working",
  metaTitle: "Garmin Express Not Working — Fast 2026 Fix",
  metaDescription:
    "Fix Garmin Express won't open, freezes at startup, or won't detect your GPS. Step-by-step 2026 guide — 8 causes & fixes. Call 347-953-1531 free.",
  problemSummary:
    "Garmin Express is the desktop app that updates Garmin GPS, watches, and dash cams. When it stops working — won't open, won't detect the device, or freezes during update — there are 8 common root causes, and most are fixed in 5–15 minutes.",
  affectedModels: [
    "All Garmin Drive / DriveSmart / Drive Lux / DriveAssist (auto)",
    "All Garmin Forerunner / Fenix / Venu / Vivoactive (watch)",
    "All Garmin eTrex / GPSMAP / Oregon (outdoor)",
    "All Garmin Zumo (motorcycle)",
    "All Garmin Dezl (truck)",
    "All Garmin RV / Camper (RV)",
    "Older Garmin Nuvi (pre-2018)",
  ],
  symptoms: [
    "Garmin Express won't launch at all — clicking the icon does nothing",
    "Express opens but immediately closes / crashes",
    "Express opens but shows blank white window",
    "Express opens but says 'Could not connect to Garmin servers'",
    "Express runs but doesn't detect connected GPS device",
    "Express detects the device but update progress freezes",
    "Express shows 'Could not unlock maps' or licensing error",
    "Express runs but device shows 'Update Failed' afterward",
  ],
  causes: [
    {
      cause: "Outdated Express version",
      likelihood: "Most common (~35% of cases)",
      description: "As of 2026, Garmin Express requires version 7.x. Versions 6.x and earlier can't communicate with newer firmware on DriveSmart 76/86, Forerunner 255+, Fenix 7+, and most 2024+ devices. Express also stops working if you've upgraded Windows 11 past build 23H2 with an old Express version installed.",
    },
    {
      cause: "Windows Defender / antivirus blocking",
      likelihood: "Very common (~20% of cases)",
      description: "Windows Defender and several antivirus products (especially Bitdefender, Kaspersky, McAfee, Norton) flag Express's web request to garmin.com as suspicious. Express then opens but can't reach Garmin servers — appears as 'Could not connect' or just hangs at the loading screen.",
    },
    {
      cause: "USB cable is charging-only (no data pins)",
      likelihood: "Common (~15% of cases)",
      description: "Many aftermarket and bundled phone-charger USB cables physically lack the data pins. Garmin device shows charging icon when plugged in, but Express can't see it. The original Garmin cable has 'Garmin' molded onto the connector and contains all 4 pins.",
    },
    {
      cause: "USB port power-saving / front-panel port",
      likelihood: "Common (~12% of cases)",
      description: "Front-panel PC USB ports often share power with hubs and can throttle output during long transfers. Garmin map updates pull 500mA continuously for 60+ minutes; underpowered ports cause mid-update disconnects. Rear motherboard ports are more reliable.",
    },
    {
      cause: "Garmin Express service stopped",
      likelihood: "Less common (~8% of cases)",
      description: "Express runs a background service called 'GarminExpressService.exe'. If it's been killed by Windows cleanup tools (CCleaner aggressive mode, BleachBit), startup tweakers, or a Windows update, Express won't function. Restart the service via services.msc.",
    },
    {
      cause: "Corrupt Express config files",
      likelihood: "Less common (~5% of cases)",
      description: "After failed updates or interrupted installs, Express's config in %ProgramData%\\Garmin\\Core Update Service\\ can corrupt. Express then opens but immediately crashes or shows the white-screen-of-death.",
    },
    {
      cause: "Time zone / clock incorrect",
      likelihood: "Rare (~3% of cases)",
      description: "If PC clock is more than 5 minutes off, HTTPS handshake to garmin.com fails. Express shows 'Could not connect' even though internet works. Common after BIOS battery replacement or daylight savings glitches.",
    },
    {
      cause: "User account permissions",
      likelihood: "Rare (~2% of cases)",
      description: "On managed PCs (work laptops, school PCs) where the user is not a local admin, Express can install but the update process can't write to the device — appears as updates that 'complete' but device shows nothing changed.",
    },
  ],
  diagnosticSteps: [
    { step: 1, title: "Check Garmin Express version", detail: "Open Garmin Express → menu (top-right gear icon) → About. Should show version 7.x or higher. If 6.x or lower, that's the problem.", ifFails: "Download fresh Express from garmin.com/express and reinstall." },
    { step: 2, title: "Check device shows in Windows Disk Management", detail: "Connect Garmin → press Win+X → Disk Management. Garmin should appear as a removable disk. If it doesn't appear here either, problem is hardware (cable or port).", ifFails: "Try the rear USB port + original Garmin cable." },
    { step: 3, title: "Check Garmin Express background service", detail: "Press Win+R, type services.msc, find 'Garmin Core Update Service'. Status should be 'Running'. If 'Stopped', right-click → Start.", ifFails: "If service won't start, reinstall Express." },
    { step: 4, title: "Check Windows clock accuracy", detail: "Right-click clock in taskbar → Adjust date/time → Sync now. Off by more than 5 minutes = HTTPS handshake fails.", ifFails: "Manually set time, then try Express again." },
    { step: 5, title: "Disable antivirus temporarily", detail: "Disable real-time protection for 10 minutes (Windows Security → Virus & threat protection → Manage settings → Real-time protection OFF). Try Express. If it works, you found the cause.", ifFails: "Add Garmin Express folder (C:\\Program Files\\Garmin\\Express) to antivirus exception list." },
  ],
  fixSequence: [
    { step: 1, title: "Uninstall Express completely", detail: "Settings → Apps → Garmin Express → Uninstall. Also delete folders: C:\\Program Files\\Garmin\\Express, %AppData%\\Garmin, %ProgramData%\\Garmin. (Show hidden files first.)", estimatedTime: "5 min" },
    { step: 2, title: "Reboot PC", detail: "Full restart, not just sign-out. Clears any locked file handles from the old install.", estimatedTime: "2 min" },
    { step: 3, title: "Download fresh Express 7.x", detail: "Go to garmin.com/express. Click 'Download for Windows' (or Mac). File is ~150 MB. Run installer as administrator (right-click → Run as administrator).", estimatedTime: "5 min" },
    { step: 4, title: "Add Express to antivirus exceptions BEFORE first launch", detail: "In Windows Security or your AV, add C:\\Program Files\\Garmin\\Express\\ as an exception. Also add garmin.com to allowed sites. This prevents the 'Could not connect' error.", estimatedTime: "3 min" },
    { step: 5, title: "Connect Garmin via rear USB port", detail: "Use original Garmin cable. Plug into a rear-of-PC USB port (NOT front panel, NOT a USB hub).", estimatedTime: "1 min" },
    { step: 6, title: "Launch Express, sign in with Garmin account", detail: "Sign in with the Garmin account that registered the device originally. Express will detect device and show available updates.", estimatedTime: "2 min" },
    { step: 7, title: "Run firmware update FIRST, then maps", detail: "Always firmware before maps. Map update on old firmware sometimes installs but device can't read the new map format.", estimatedTime: "5–75 min depending on update size" },
  ],
  whenToCallUs:
    "Call us at 347-953-1531 if any of these apply: (a) Express still won't open after fresh reinstall, (b) device shows in Disk Management but Express never sees it, (c) update completes but device is bricked / shows 'Map cannot be read', (d) you're on a work PC and don't have admin rights. We fix Express issues remotely from $49.",
  faqs: [
    { q: "Why does Garmin Express keep saying 'Could not connect to Garmin servers'?", a: "Three causes in order of likelihood: (1) Antivirus is blocking Express's outbound HTTPS request to garmin.com — disable AV temporarily to confirm, then add Express to exceptions. (2) Windows clock is off by more than 5 minutes — HTTPS handshake fails. Sync clock manually. (3) Corporate/school firewall blocks garmin.com — try from home network. About 70% of 'Could not connect' errors are antivirus." },
    { q: "Why won't Garmin Express detect my GPS?", a: "First check Windows Disk Management (Win+X → Disk Management). If Garmin appears there as a removable disk, the cable and port are fine — problem is Express. If Garmin does NOT appear in Disk Management, problem is the cable (use original Garmin cable, not aftermarket) or port (use rear USB port). About 60% of 'device not detected' errors are charging-only USB cables." },
    { q: "Does Garmin Express work on Mac?", a: "Yes. Garmin Express runs on macOS 11 (Big Sur) through macOS 15 (Sequoia) as of 2026. On Apple Silicon (M1/M2/M3 Macs) it runs natively. The most common Mac-specific issue is Gatekeeper blocking the install on first launch — right-click the installer → Open → confirm in System Settings → Privacy & Security." },
    { q: "Can I update my Garmin without using Garmin Express?", a: "Some newer Garmin devices (DriveSmart 76/86, Forerunner 255+, Fenix 7+, Venu 3, etc.) can update over WiFi directly without a computer. On the device: Settings → System → Updates → check for updates. Older Garmin Drive, Nuvi, and most eTrex models REQUIRE Garmin Express via USB — there's no WiFi alternative." },
    { q: "Why does Garmin Express open then immediately close?", a: "Almost always corrupt Express config files. Fix: uninstall Express completely, delete %AppData%\\Garmin folder and %ProgramData%\\Garmin folder, reboot, reinstall fresh from garmin.com/express. Run installer as administrator. About 95% success rate." },
    { q: "How long should a Garmin map update take?", a: "Highly dependent on map size and USB version. Auto units (DriveSmart): 45–90 min for North America full map (~12 GB). Watches (Forerunner, Fenix): 15–30 min. Outdoor (eTrex, GPSMAP): 25–60 min depending on TOPO maps included. If your update has been running for 3+ hours with no progress bar movement, it's stuck — kill Express, unplug device, retry from step 1." },
    { q: "Is Garmin Express safe? Can I trust it with my GPS?", a: "Garmin Express is the official software from Garmin Ltd. It's digitally signed by Garmin and used by millions of users. Always download it from garmin.com/express directly — never from third-party sites, which sometimes bundle adware. Express is the only software that can update Garmin GPS, watches, and dash cams legitimately." },
  ],
  bgGradient: "linear-gradient(135deg, #1a0606 0%, #2c0a0a 40%, #4a0e0e 100%)",
  accentColor: "red",
  primaryKeywords: [
    "garmin express not working", "garmin express won't open", "garmin express not detecting device",
    "garmin express not connecting", "garmin express keeps crashing", "garmin express stuck",
    "fix garmin express", "garmin express server error", "garmin express could not connect",
    "garmin express won't launch", "garmin express not loading", "garmin express problems",
  ],
};

// ───────────────────────────────────────────────────────────────────
// 3. PROBLEM: Garmin Won't Acquire Satellites
// ───────────────────────────────────────────────────────────────────

export const wontAcquireSatellites: GarminProblemPage = {
  slug: "wont-acquire-satellites",
  problemTitle: "Garmin Won't Acquire Satellites",
  metaTitle: "Garmin Won't Acquire Satellites — Fix Guide",
  metaDescription:
    "Garmin GPS won't find satellites? 6 root causes & step-by-step fixes for DriveSmart, Nuvi, eTrex, Forerunner, Fenix. Free guide. Call 347-953-1531.",
  problemSummary:
    "When a Garmin GPS unit can't find satellites, it can't navigate. The screen typically shows 'Acquiring Satellites' indefinitely or displays 0/0 satellites. The cause is almost always one of 6 issues — and 5 of the 6 are fixed in under 15 minutes without any hardware repair.",
  affectedModels: [
    "All Garmin Drive / DriveSmart series (auto)",
    "Garmin Nuvi (older auto units, especially 2xx and 13xx series)",
    "Garmin eTrex 10, 20, 30, 22x, 32x (handheld outdoor)",
    "Garmin GPSMAP 64, 65, 66, 67 (handheld outdoor pro)",
    "Garmin Forerunner watches (especially 235, 245, 255, 955)",
    "Garmin Fenix watches (5, 6, 7, 8 series)",
    "Garmin Zumo motorcycle GPS",
    "Garmin Dezl truck GPS",
    "Garmin RV / Camper",
  ],
  symptoms: [
    "Screen shows 'Acquiring Satellites' for more than 15 minutes",
    "GPS bars at top of screen all empty / no signal",
    "Satellite signal page shows 0 satellites or all bars at 0%",
    "GPS works indoors but not outdoors (counter-intuitive — actual symptom)",
    "GPS used to work outdoors yesterday, now doesn't",
    "Watch GPS can't find signal even in open field",
    "Auto unit shows you in the wrong city / on the wrong street",
  ],
  causes: [
    {
      cause: "Outdated almanac data",
      likelihood: "Most common (~40% of cases)",
      description: "Every Garmin device stores an 'almanac' — predicted positions of GPS satellites. The almanac becomes stale after 90+ days of no use. When stale, the device tries to find satellites where they're no longer located, and the search times out. This is THE most common cause for units that 'used to work fine' but now don't.",
    },
    {
      cause: "Indoor or obstructed sky view",
      likelihood: "Very common (~25% of cases)",
      description: "GPS signals are line-of-sight from satellites 12,000+ miles up. Indoor reception is unreliable — concrete, metal roofs, and dense cloud cover all attenuate the signal. Many users test their Garmin indoors after a fix and conclude 'still broken' when actually the device is fine — they need open sky.",
    },
    {
      cause: "Disabled GPS or wrong satellite system",
      likelihood: "Common (~12% of cases)",
      description: "Newer Garmin units (Forerunner 255+, Fenix 7+, DriveSmart 76+) support multiple satellite systems: GPS, GLONASS, Galileo, BeiDou. If you accidentally turned all of them off in Settings, no signal. Also: Forerunner 'UltraTrac' mode samples sparingly and feels broken even when working.",
    },
    {
      cause: "Recent firmware update broke GPS chipset",
      likelihood: "Less common (~10% of cases)",
      description: "Specific firmware versions have known GPS regressions. Garmin Forerunner 245 firmware 13.00 (since rolled back). Fenix 7 firmware 11.16 had GPS-only mode broken for some users. Solution is usually a follow-up firmware that Garmin pushes within 2 weeks.",
    },
    {
      cause: "Internal antenna physically damaged",
      likelihood: "Rare (~8% of cases)",
      description: "Drops, water damage, or pressure on the antenna area can crack the internal GPS antenna or its solder joint. Symptoms: device finds 1–2 satellites max, even in open sky. This requires hardware repair — not remote-fixable. We'll diagnose this remotely and tell you so you can decide on repair vs replacement.",
    },
    {
      cause: "Battery too low for full GPS power",
      likelihood: "Rare (~5% of cases)",
      description: "GPS chipsets draw significant current. Below 15% battery, some Garmin watches throttle GPS to save power — appearing 'broken'. DriveSmart units with degraded internal batteries can show this when running unplugged. Charge to 50%+ and retry.",
    },
  ],
  diagnosticSteps: [
    { step: 1, title: "Take device fully outdoors", detail: "Stand in an open area — no trees overhead, no buildings within 50 feet. Hold device flat and still with screen facing up (not in pocket). Wait 5 minutes minimum.", ifFails: "If still no signal in true open sky, proceed to step 2." },
    { step: 2, title: "Verify GPS satellite system is enabled", detail: "On watches: Settings → System → Sensors → GPS — check that GPS is enabled and at least 'GPS + GLONASS' or 'All Systems' is selected. On auto units: Settings → Device → About → look for satellite indicator.", ifFails: "If already enabled, proceed to step 3 (almanac refresh)." },
    { step: 3, title: "Force almanac refresh", detail: "Hold device outdoors with clear sky view. Power off completely (not just sleep). Wait 30 seconds. Power on. Set device flat with screen up. DO NOT MOVE for 15 full minutes. The device performs a 'cold start' — re-downloads satellite almanac from scratch.", ifFails: "If after 15 minutes there's still no signal, proceed to step 4." },
    { step: 4, title: "Check firmware version", detail: "Settings → Device → About — note the firmware version. Search 'Garmin [model] firmware [version] GPS issue' to see if there's a known regression. If yes, update via Garmin Express to latest firmware.", ifFails: "If on latest firmware and still no signal, proceed to step 5." },
    { step: 5, title: "Battery check", detail: "Charge device to 100%. Unplug. Test GPS again outdoors (steps 1–3).", ifFails: "If still no signal at 100% battery in open sky after 15 min cold start, you likely have hardware antenna damage. Call us — we'll confirm." },
  ],
  fixSequence: [
    { step: 1, title: "Cold-start in open sky", detail: "Outdoor location with no overhead obstruction. Power off device completely. Power on. Set on a flat surface (or wear watch on wrist, arm extended). Wait 15 minutes minimum without moving the device.", estimatedTime: "15 min" },
    { step: 2, title: "Enable all satellite systems", detail: "On watches: Settings → System → Sensors → GPS → 'All Systems' or 'GPS + GLONASS + Galileo'. Single 'GPS only' mode has fewer satellites visible at once and takes longer to lock.", estimatedTime: "2 min" },
    { step: 3, title: "Update firmware via Garmin Express", detail: "Connect to PC, run Express, install latest firmware. Often a GPS regression in one firmware version is fixed by the next.", estimatedTime: "10–25 min" },
    { step: 4, title: "Soft reset (clear EPO data)", detail: "On watches: Settings → System → Reset → Reset Defaults (preserves activities). On auto units: Settings → Device → Reset → Restore Settings. Re-downloads EPO predictive ephemeris file.", estimatedTime: "5 min" },
    { step: 5, title: "Re-cold-start", detail: "After settings reset, do another 15-min cold start in open sky.", estimatedTime: "15 min" },
  ],
  whenToCallUs:
    "Call us at 347-953-1531 if any of these apply: (a) device finds 0 satellites even after a 15-minute open-sky cold start, (b) device finds 1–2 satellites maximum even in optimal conditions (likely antenna damage), (c) you're not comfortable doing firmware updates yourself, (d) device worked fine before a specific firmware update and you want to roll back. Remote diagnosis is free; fix is $49 if doable remotely.",
  faqs: [
    { q: "Why does my Garmin take 30 minutes to find satellites?", a: "Almanac data is stale (most common cause). When a Garmin sits unused for 90+ days, its predicted satellite positions go out of date. The device has to do a 'cold start' — search the entire sky from scratch. This takes 5–15 minutes in open sky. After the first successful lock, subsequent locks take 30–60 seconds because the almanac is now fresh." },
    { q: "Will my Garmin GPS work indoors?", a: "Mostly no. GPS signals come from satellites 12,000+ miles overhead and are line-of-sight. Concrete ceilings, metal roofs, basements, and indoor environments block or severely attenuate the signal. Some Garmin units may show 1–2 satellites near a window, but the position will be inaccurate. To test if your GPS is working, you must be outdoors with clear sky view." },
    { q: "My Garmin Forerunner won't find satellites since the last update — is it broken?", a: "Probably not — GPS firmware regressions are real but usually patched within 1–2 weeks. (1) Check Garmin Connect for a newer firmware. (2) Forum search 'Forerunner [model] firmware [version] GPS' to confirm the regression. (3) If confirmed, wait for next firmware. (4) In the meantime, enable 'All Systems' (GLONASS + Galileo) which uses different satellite constellations." },
    { q: "Why does my Garmin DriveSmart show me on the wrong street?", a: "Two possibilities: (1) GPS hasn't fully locked yet — wait until satellite icon goes solid (typically 60-90 seconds after power on). (2) Map data is severely outdated (3+ years old) — your current street wasn't in that map version. Run map update via Garmin Express. (3) WAAS correction is disabled. Settings → Navigation → enable WAAS for ~3-meter accuracy." },
    { q: "How do I do a 'cold start' on my Garmin?", a: "Take the device outdoors to an open area with clear sky view. Power off completely (not sleep — fully off). Wait 30 seconds. Power on. Place the device flat with screen facing up (or wear watch with wrist extended). Do not move for 15 full minutes. The device downloads fresh almanac data from satellites. After 15 min you should see solid satellite signal. This works on every Garmin model." },
    { q: "Can my Garmin antenna be repaired?", a: "Some can, most can't economically. Auto units (DriveSmart): antenna replacement is technically possible but parts cost $40+ and labor exceeds the value of a 3+ year-old unit. Watches (Forerunner, Fenix): internal antenna repair requires opening sealed waterproof case, voiding warranty — not recommended. We'll diagnose remotely and tell you honestly if it's worth repairing. Often replacement is more economical." },
    { q: "Does cloudy weather block GPS signals?", a: "Heavy clouds reduce GPS signal strength by about 5–10% — usually not enough to prevent satellite lock if your device is otherwise working. However, if you're already in a marginal environment (urban canyon, light tree cover), heavy overcast can push it over the edge to 'no signal'. Severe thunderstorms with heavy rain can briefly disrupt signal. Snow on the device antenna does block signal." },
  ],
  bgGradient: "linear-gradient(135deg, #061224 0%, #0a2347 40%, #0d3266 100%)",
  accentColor: "blue",
  primaryKeywords: [
    "garmin won't acquire satellites", "garmin not finding satellites", "garmin no satellite signal",
    "garmin gps not finding satellites", "garmin satellite signal weak", "garmin acquiring satellites stuck",
    "garmin forerunner gps not working", "garmin fenix gps not working", "garmin drivesmart no signal",
    "garmin nuvi acquiring satellites", "garmin etrex won't find satellites", "fix garmin satellite signal",
  ],
};

// ───────────────────────────────────────────────────────────────────
// 4. PROBLEM: Garmin Map Update Failed
// ───────────────────────────────────────────────────────────────────

export const mapUpdateFailed: GarminProblemPage = {
  slug: "map-update-failed",
  problemTitle: "Garmin Map Update Failed",
  metaTitle: "Garmin Map Update Failed — How to Fix Now",
  metaDescription:
    "Garmin map update failed at 39%, 50%, or 99%? Diagnose 7 causes & recover your GPS in 25 min. Free guide. Call 347-953-1531 — we fix it remotely.",
  problemSummary:
    "When a Garmin map update fails partway through, the device often becomes unusable — old map gone, new map not fully installed. This is recoverable in 95% of cases. The sequence depends on which percentage the update failed at, because different file types transfer at different stages.",
  affectedModels: [
    "Garmin Drive / DriveSmart 51, 52, 55, 61, 65, 76, 86 (most common)",
    "Garmin Nuvi 2xx, 13xx, 14xx, 24xx, 25xx, 35xx, 36xx (legacy auto)",
    "Garmin eTrex 22x, 32x (outdoor TOPO updates)",
    "Garmin GPSMAP 65, 66, 67 (outdoor)",
    "Garmin Zumo XT, 595, 396 (motorcycle)",
    "Garmin Dezl 580, 760, 770, 780 (truck)",
    "Garmin RV 770, 780, 890, 895 (RV)",
    "Vehicle-integrated Garmin (Honda, Toyota, Lexus, Aston Martin, Jeep)",
  ],
  symptoms: [
    "Update progress bar stops moving for 30+ minutes",
    "Update reaches 39%, 50%, or 99% then errors out",
    "Garmin Express shows 'Update Failed' with retry button",
    "Device displays 'Map cannot be read' on power-up",
    "Device shows old map version even after Express says 'Up to date'",
    "Device only shows blank screen after a 'completed' update",
    "Device boots into 'Recovery Mode' / 'Connect to Garmin Express'",
  ],
  causes: [
    {
      cause: "Insufficient device storage",
      likelihood: "Most common (~30% of cases)",
      description: "DriveSmart 55 has 16 GB internal. North America HD map is ~12 GB. If you also have voice files, custom POIs, and old map versions, there isn't enough free space. Update gets to 50% then fails because Express tries to write the new map BEFORE deleting the old one.",
    },
    {
      cause: "USB cable degraded mid-transfer",
      likelihood: "Very common (~25% of cases)",
      description: "Aftermarket USB cables and 5+ year old Garmin cables develop intermittent connections. Updates that fail at exactly 39% are almost always cable-related — that's where the largest contiguous map files start streaming. Replace cable before retry.",
    },
    {
      cause: "PC went to sleep during update",
      likelihood: "Very common (~20% of cases)",
      description: "Garmin updates run for 60–90 minutes. Default Windows power settings sleep the PC after 30 min idle. Sleep kills the USB connection mid-write, corrupting the map partition. Disable sleep BEFORE starting any Garmin update.",
    },
    {
      cause: "Internet connection dropped",
      likelihood: "Common (~10% of cases)",
      description: "Express downloads in chunks. If WiFi/internet drops for 60+ seconds during the chunk download phase, Express may timeout and abort. Common with hotel WiFi or congested networks.",
    },
    {
      cause: "Map license tied to wrong account",
      likelihood: "Less common (~7% of cases)",
      description: "If you acquired the Garmin used or transferred from a family member, the lifetime map license may be locked to the original owner's Garmin account. Express downloads the file but the device refuses to unlock it. Shows as 'Cannot Unlock Maps' or update completes but old map persists.",
    },
    {
      cause: "Firmware/Map version mismatch",
      likelihood: "Less common (~5% of cases)",
      description: "Newer maps (2025.10+) require firmware versions released in the last 18 months. If you skipped firmware updates for 2+ years and tried to install a fresh map, the device can't read the new format. Update firmware FIRST, then maps.",
    },
    {
      cause: "Device entered Recovery Mode",
      likelihood: "Rare (~3% of cases)",
      description: "After a severely interrupted update, some Garmin units boot into a Recovery Mode that only shows 'Connect to Garmin Express'. Device is recoverable but requires Express's 'Recover Device' option, not a normal update.",
    },
  ],
  diagnosticSteps: [
    { step: 1, title: "Note the failure percentage", detail: "Was it ~5%? ~39%? ~50%? ~99%? Different percentages mean different things. 5% = connection issue. 39% = cable/storage. 50% = often firmware-map mismatch. 99% = verification fail.", ifFails: "Continue to step 2." },
    { step: 2, title: "Check device free storage", detail: "Connect Garmin to PC. Open File Explorer (Windows) or Finder (Mac). Garmin shows as removable drive. Right-click → Properties to see free space. Need 2x the map file size as free space.", ifFails: "If under 4 GB free, delete old map files manually before retry." },
    { step: 3, title: "Test USB cable on a different device", detail: "Plug Garmin cable into a phone or other USB device. If phone charges but no data transfer / not detected, cable is bad. Replace before retry.", ifFails: "Replace cable with original Garmin USB cable." },
    { step: 4, title: "Disable PC sleep mode", detail: "Windows: Settings → System → Power → Sleep → Never (while plugged in). Mac: System Settings → Lock Screen → Display Off → Never. Critical before any retry.", ifFails: "Step required regardless." },
    { step: 5, title: "Test internet stability", detail: "Run a 5-minute speed test. If your connection drops below 5 Mbps multiple times, switch networks (mobile hotspot, friend's WiFi).", ifFails: "If unstable, find better network before retry." },
  ],
  fixSequence: [
    { step: 1, title: "Charge device to 100%", detail: "Plug into wall charger (not PC). Wait until indicator shows full. Some Garmin units fail mid-update if internal battery drops below 30%.", estimatedTime: "30 min" },
    { step: 2, title: "Free up storage on device", detail: "Connect to PC. Delete custom POIs, old voice files, photos, and any 'Backup' folders. Aim for at least 2x the new map size as free space.", estimatedTime: "10 min" },
    { step: 3, title: "Disable PC sleep + Windows updates during session", detail: "Settings → Power → Sleep Never. Pause Windows Update for 24 hours so it doesn't restart mid-update.", estimatedTime: "3 min" },
    { step: 4, title: "Update firmware FIRST via Garmin Express", detail: "Open Express. If both firmware and map updates are pending, do firmware-only first. Only after firmware succeeds and device reboots, proceed to map update.", estimatedTime: "8 min" },
    { step: 5, title: "Run map update with stable hardwired connection if possible", detail: "Ethernet cable to PC is more stable than WiFi. If only WiFi available, sit close to router. Plug Garmin into rear USB port. Original cable.", estimatedTime: "45–90 min" },
    { step: 6, title: "If stuck — use 'Recover Device' option", detail: "If device shows Recovery Mode after failed update, in Garmin Express click the device → 'Tools' → 'Recover Device'. This wipes and reinstalls everything cleanly. Takes 90 min but fixes 95% of bricked units.", estimatedTime: "90 min" },
    { step: 7, title: "Verify map version on device after update", detail: "Settings → Device → About → Map. Should show 2026.10 or newer. If still old version, update silently failed — repeat from step 4.", estimatedTime: "2 min" },
  ],
  whenToCallUs:
    "Call us at 347-953-1531 in any of these situations: (a) update failed and device now shows 'Map cannot be read' on every boot, (b) Recovery Mode option in Express isn't fixing it, (c) you don't have admin rights on the PC for the recovery process, (d) you're not confident running a 'Recover Device' wipe yourself. We've recovered hundreds of bricked Garmin units remotely. From $49.",
  faqs: [
    { q: "My Garmin update failed at 39% — what does this mean?", a: "39% is where the largest contiguous map files start streaming over USB. Failure at this exact percentage is almost always one of: (1) USB cable degraded — switch to original Garmin cable, (2) front-panel USB port underpowered — use rear motherboard port, (3) device storage filled mid-transfer — delete old files first. About 92% of stuck-at-39% errors clear with these three checks." },
    { q: "My Garmin says 'Map cannot be read' after a failed update — is it bricked?", a: "Probably not. 'Map cannot be read' usually means the map partition was partially written when the update failed. Recovery: connect to PC, open Garmin Express, click your device → Tools → 'Recover Device' (or 'Restore Defaults'). This wipes the device and re-downloads everything cleanly. Takes 90 minutes but recovers 95% of units. We do this remotely for $49." },
    { q: "Can I install just part of a Garmin map (e.g. only my state)?", a: "Yes, on most modern Garmin auto units. Open Garmin Express → click your device → 'Maps' tab → instead of 'Full North America' choose 'Custom' or regional maps (e.g. 'Northeast US' which is ~3 GB instead of 12 GB). Smaller updates are less likely to fail and use less device storage. Outdoor models (eTrex, GPSMAP) typically require full TOPO regions." },
    { q: "Why did my Garmin map update succeed but show old map version?", a: "The download completed but the install didn't. Common cause: firmware too old to read the new map format. Fix: connect to Express, do firmware update FIRST, reboot device, then re-run map update. The second attempt usually completes the install. If still showing old version after both, run Express → Tools → Recover Device." },
    { q: "How do I avoid Garmin map update failures in the first place?", a: "Pre-update checklist: (1) charge device to 100%, (2) verify 2x map-size free storage, (3) use original Garmin USB cable, (4) plug into rear PC USB port, (5) disable PC sleep mode, (6) pause Windows/Mac updates, (7) use stable hardwired internet if possible, (8) update firmware BEFORE maps, (9) don't multitask on the PC during update. Following all 9 steps drops failure rate from ~25% to under 3%." },
    { q: "Will my Garmin work without the latest map update?", a: "Yes — if your old map data is intact, the GPS continues working, just with outdated road information. You'll get correct position but may be routed via roads that were rerouted, or miss new roads built since your last map. For most casual use this is fine for 6+ months out of date. For business/commercial use (delivery, RVs, trucks), update at least quarterly." },
    { q: "Can Trini System recover my Garmin if the update bricked it?", a: "Yes. We've recovered hundreds of bricked Garmin units (DriveSmart, Nuvi, eTrex, Zumo, Dezl, watches) remotely. Process: you connect Garmin to your PC via USB, we connect to your PC via secure remote session, run the Garmin Express 'Recover Device' procedure, monitor the 90-minute process, and verify the device boots cleanly afterward. $49 flat. Call 347-953-1531." },
  ],
  bgGradient: "linear-gradient(135deg, #1a1206 0%, #2c1f0a 40%, #4a330e 100%)",
  accentColor: "amber",
  primaryKeywords: [
    "garmin map update failed", "garmin update failed 39", "garmin map update stuck",
    "garmin map cannot be read", "garmin update error", "garmin recover device",
    "garmin map update failed at 50", "garmin failed update fix", "garmin bricked recovery",
    "garmin update won't complete", "garmin express update failed", "garmin map install failed",
  ],
};

// ───────────────────────────────────────────────────────────────────
// 2. GARMIN FORERUNNER (running watches)
// ───────────────────────────────────────────────────────────────────

export const forerunner: GarminSeries = {
  slug: "forerunner-update",
  name: "Garmin Forerunner",
  category: "watch",
  tagline: "Update Forerunner 245, 255, 265, 955, 965 — firmware, sync, GPS",
  models: [
    { name: "Forerunner 165", year: "2024–", market: "Entry-level AMOLED runner — replaces FR 55" },
    { name: "Forerunner 245 / 245 Music", year: "2019–2023", market: "Still huge installed base; common service requests" },
    { name: "Forerunner 255 / 255S", year: "2022–", market: "Mid-tier multi-sport — most-sold Forerunner today" },
    { name: "Forerunner 265 / 265S", year: "2023–", market: "AMOLED upgrade of 255 — newest mid-tier" },
    { name: "Forerunner 745", year: "2020–2023", market: "Triathlon-focused, discontinued but field-active" },
    { name: "Forerunner 955 / Solar", year: "2022–", market: "Top-tier multi-sport — solar variant for ultras" },
    { name: "Forerunner 965", year: "2023–", market: "AMOLED flagship — premium runner pick" },
  ],
  commonProblems: [
    { problem: "Won't sync with Garmin Connect app", cause: "Bluetooth cache stale; phone OS Bluetooth bug after iOS/Android update", fixTime: "10 min", remoteSuccess: "94%" },
    { problem: "GPS takes 5+ min to lock during run", cause: "Stale EPO/almanac data after 90+ days idle; fixed by 15-min cold start", fixTime: "20 min", remoteSuccess: "97%" },
    { problem: "Music sync to FR 245/255/955 fails", cause: "Spotify/Amazon Music auth token expired; needs re-auth via Connect IQ Store", fixTime: "12 min", remoteSuccess: "100%" },
    { problem: "Optical heart rate stuck at one value", cause: "Sensor calibration glitch after firmware update; soft reset clears it", fixTime: "8 min", remoteSuccess: "92%" },
    { problem: "Battery drains in 3 days instead of 14", cause: "Always-on display + GPS-on-default settings + bad firmware version", fixTime: "10 min", remoteSuccess: "100%" },
    { problem: "Watch won't pair after factory reset", cause: "App database has 'ghost' device entry blocking re-pair", fixTime: "10 min", remoteSuccess: "98%" },
  ],
  uniqueErrorCodes: [
    { code: "Sync Failed", meaning: "Bluetooth handshake timeout between watch and phone", fix: "Force-quit Garmin Connect, forget watch in phone Bluetooth settings, re-pair via Connect 'Add Device'." },
    { code: "Software Update Failed", meaning: "Firmware download interrupted or corrupted", fix: "Charge to 80%+, plug into PC, run Garmin Express → install firmware via wired connection. Bypasses WiFi." },
    { code: "Cannot Detect Sensor", meaning: "External ANT+/BLE sensor (HRM, foot pod, power meter) not pairing", fix: "Turn off Bluetooth on phone (it competes with watch BLE), put sensor in pairing mode, retry watch-side scan." },
    { code: "Activity Upload Stuck", meaning: "Activity file too large or corrupt — usually 4+ hour activities with high-rate GPS", fix: "USB-tether the watch to PC, copy .FIT file from /Activities folder manually, upload at connect.garmin.com." },
  ],
  updateSteps: [
    { step: 1, title: "Charge Forerunner to 80%+", detail: "Watch firmware updates need stable power. Below 50%, the update may abort partway. Charge to at least 80% before starting. Use the Garmin charging clip — third-party clips often miss the data pin and the watch shows charging but doesn't connect to Express.", warnings: "Don't rely on a wireless charging dock for Forerunners — they all use Garmin's proprietary 4-pin clip." },
    { step: 2, title: "Open Garmin Connect on your phone", detail: "Sync the watch to phone first (any pending activities, sleep, HR data). The firmware update will erase pending unsynced data otherwise. Tap your device in Connect → ensure 'Last Synced' shows under 5 minutes ago." },
    { step: 3, title: "Choose: WiFi/phone update OR USB/Express update", detail: "Forerunner 165, 255, 265, 955, 965 support over-the-air firmware via WiFi or phone Bluetooth. FR 245 and older typically need USB-tethered Garmin Express. WiFi is faster (5–8 min) but less reliable; USB is slower (15 min) but never fails mid-update." },
    { step: 4, title: "For phone update: Settings → System → Software Update", detail: "On the watch directly: hold UP button → Settings → System → Software Update → Check for Updates. If on the latest version, no further action. If pending, tap 'Install Now'. The watch reboots 2–3 times during update — do not press buttons." },
    { step: 5, title: "For USB update: Connect via charging clip to PC", detail: "Plug clip into rear PC USB port. Open Garmin Express. The watch should appear in Express within 30 seconds. If it doesn't, charging clip may be aftermarket — switch to original Garmin clip." },
    { step: 6, title: "Install firmware first, then maps/voice files", detail: "On Express, install firmware update first (50–80 MB). After watch reboots, install map updates if applicable (FR 955/965 have full maps; FR 245/255/265 have base maps only). Music files last." },
    { step: 7, title: "Wait for full reboot cycle", detail: "Forerunners reboot 2–3 times during firmware install. Total time on USB: 8–12 minutes. Watch face shows Garmin logo, then blank, then logo again, then home screen. Don't unplug until you see the home screen for 30+ seconds." },
    { step: 8, title: "Verify firmware version on watch", detail: "Hold UP → Settings → System → About. Should show the new version (e.g., FR 255 firmware 21.30 as of April 2026). If still shows old version, update silently failed — re-run from step 5 via USB." },
  ],
  realTimeIssues: [
    { trigger: "After iOS 17.4 / 18 update", symptom: "Forerunner Bluetooth pairs but Connect app says 'Connecting...' forever", ourFix: "iOS Bluetooth permissions reset. Settings → Privacy → Bluetooth → toggle Garmin Connect off then on. Force-quit app. Re-pair. 8 min remote." },
    { trigger: "After Android 14/15 update", symptom: "Watch syncs once, then disconnects every 30 seconds", ourFix: "Battery optimization is killing Connect. Settings → Apps → Garmin Connect → Battery → Unrestricted. Plus disable Adaptive Battery for Connect specifically." },
    { trigger: "After moving country / time zone", symptom: "Activities recorded at wrong time; pace metrics off", ourFix: "Hold UP → Settings → System → Time → Auto. Watch syncs from GPS time. If still wrong, hard reset (UP+DOWN+START 10 sec) and re-pair." },
    { trigger: "After firmware 21.30 (FR 255)", symptom: "GPS-only mode much slower to lock than 'All Systems'", ourFix: "Known regression. Workaround: use 'All Systems' (GPS+GLONASS+Galileo) until 21.40+. Settings → Sensors → GPS → All Systems." },
  ],
  faqs: [
    { q: "How do I update my Garmin Forerunner without a computer?", a: "Forerunner 165, 255, 265, 955, and 965 update over WiFi or phone Bluetooth — no PC needed. On the watch: hold UP → Settings → System → Software Update → Check for Updates. Make sure the watch is connected to WiFi (settings → connectivity → WiFi) and has 50%+ battery. FR 245 and older still require Garmin Express via USB clip." },
    { q: "Why won't my Forerunner sync with Garmin Connect?", a: "Most common cause is iOS or Android Bluetooth cache after a phone OS update. Fix: (1) force-quit Garmin Connect app, (2) on phone Bluetooth settings, forget the watch, (3) on watch hold UP → Settings → Phone → Forget Phone, (4) re-pair via Connect → Add Device. Works for 94% of sync failures. If still fails, the watch's BLE radio may be desynced — call us." },
    { q: "Why does my Forerunner GPS take so long to find satellites?", a: "Stale EPO data — the predictive ephemeris file that tells your watch where satellites should be. After 7+ days of no GPS use, the file expires. Fix: stand outdoors with clear sky, sync watch with Connect (downloads fresh EPO), then start activity. First lock takes 60-90 seconds. Subsequent activities lock in 5-15 seconds." },
    { q: "How long does a Forerunner firmware update take?", a: "Via WiFi/phone: 5-8 minutes typically. Via USB Garmin Express: 8-12 minutes. The watch reboots 2-3 times during install — don't press buttons. Total time including verification: ~15 minutes. If your update has been running over 30 minutes with no progress, abort (hold START 10 sec) and retry via USB." },
    { q: "Can I downgrade Forerunner firmware if a new version has bugs?", a: "Garmin doesn't officially support downgrades, but it's possible via USB by manually replacing the GUPDATE.gcd file in /Garmin/firmware/ on the watch. We do this for customers when there's a confirmed regression (we keep archived firmware files for major models). $49 flat — call us before attempting yourself." },
    { q: "Why is my Forerunner heart rate stuck at 60 BPM?", a: "Optical sensor calibration glitch. Fix sequence: (1) clean sensor on watch back with damp cloth, (2) wear watch one finger-width above wrist bone, snug but not tight, (3) hold UP → Settings → Sensors → Heart Rate → toggle off and on, (4) start a walking activity for 5 minutes to recalibrate. If still stuck, soft reset: hold UP+DOWN+START for 10 seconds." },
    { q: "Will Trini System update my Forerunner remotely?", a: "Yes. Connect Forerunner to your computer via charging clip, we connect to your computer via secure remote session, run the firmware + map update via Garmin Express while you watch. Average time: 15 minutes. Flat $49. Call 347-953-1531." },
  ],
  cableType: "Garmin proprietary 4-pin charging clip (USB-A) — same clip across all current Forerunner models",
  expressCompatible: true,
  estimatedFixCost: "$49 flat — includes firmware + sync + GPS calibration",
  bgGradient: "linear-gradient(135deg, #0a0e2c 0%, #1a1d4a 40%, #2a2e6e 100%)",
  accentColor: "purple",
  metaTitle: "Garmin Forerunner Update — 245, 255, 955, 965",
  metaDescription:
    "Update Garmin Forerunner 245, 255, 265, 955, 965 firmware. Fix sync, GPS, music sync issues. Remote service from $49. Call 347-953-1531.",
  primaryKeywords: [
    "garmin forerunner update", "forerunner 255 update", "forerunner 955 update",
    "forerunner 245 firmware", "forerunner 265 sync issues", "garmin forerunner not syncing",
    "forerunner gps not working", "forerunner won't connect", "garmin running watch update",
    "forerunner music sync", "forerunner battery drain", "forerunner 965 update",
  ],
};

// ───────────────────────────────────────────────────────────────────
// 3. GARMIN FENIX (multisport / outdoor watches)
// ───────────────────────────────────────────────────────────────────

export const fenix: GarminSeries = {
  slug: "fenix-update",
  name: "Garmin Fenix",
  category: "watch",
  tagline: "Update Fenix 5, 6, 7, 8 — firmware, maps, sensors, ABC",
  models: [
    { name: "Fenix 5 / 5S / 5X / 5 Plus", year: "2017–2020", market: "Massive installed base — still field-active, common service requests" },
    { name: "Fenix 6 / 6S / 6X / 6 Pro / 6 Pro Solar", year: "2019–2022", market: "Most-popular Fenix gen ever — solar variants need extra care" },
    { name: "Fenix 7 / 7S / 7X / 7 Pro / 7X Pro Solar", year: "2022–", market: "Mainstream current pick — touchscreen + LED flashlight on 7X" },
    { name: "Fenix 8 / 8S / 8 Pro", year: "2024–", market: "Newest gen — AMOLED option, new Elevate v5 HR sensor" },
    { name: "Epix Pro / Epix 2", year: "2022–", market: "AMOLED Fenix sibling — same firmware family, similar issues" },
    { name: "Tactix 7 / Tactix Bravo / Quatix 7", year: "Various", market: "Tactical/marine variants of Fenix — same update process" },
  ],
  commonProblems: [
    { problem: "Map update gets stuck at 60-70%", cause: "Map file is 6+ GB; storage check fails partway; needs storage cleanup first", fixTime: "30 min", remoteSuccess: "88%" },
    { problem: "Pulse Ox draining battery 3x faster", cause: "All-day pulse ox enabled; should be 'sleep only' for normal battery life", fixTime: "5 min", remoteSuccess: "100%" },
    { problem: "Compass keeps recalibrating mid-hike", cause: "Magnetic interference; compass calibration corrupted; needs figure-8 recal", fixTime: "8 min", remoteSuccess: "95%" },
    { problem: "Strava/Komoot route won't load on watch", cause: "Connect IQ Store auth; route export format; phone Bluetooth glitch", fixTime: "12 min", remoteSuccess: "92%" },
    { problem: "Watch face stuck after firmware update", cause: "Connect IQ watch face crash post-update; needs Connect IQ Store reinstall", fixTime: "10 min", remoteSuccess: "100%" },
    { problem: "Solar charging % stuck at 0%", cause: "Solar lens dirty OR firmware sensor regression; clean + recal + firmware", fixTime: "10 min", remoteSuccess: "85%" },
  ],
  uniqueErrorCodes: [
    { code: "Map Activation Failed", meaning: "TOPO map license tied to wrong Garmin account", fix: "Sign in to garmin.com on Express, link device to current account, re-download TOPO map. We do this remotely." },
    { code: "Insufficient Storage", meaning: "Internal 16 GB exceeded; multiple region maps + Connect IQ apps", fix: "Connect to Express → Maps tab → uninstall regions you don't need. Each region is 1.5–4 GB." },
    { code: "Sensor Pairing Failed", meaning: "External sensor (HRM-Pro, RPlate, Index scale) won't pair", fix: "Phone Bluetooth OFF (competes with watch ANT+), put sensor in pairing mode, watch Settings → Sensors → Add New." },
    { code: "Cannot Calibrate Compass", meaning: "Strong magnetic interference (phone, magnetic clasp watch band)", fix: "Move 6+ feet from electronics, perform figure-8 motion 30 sec horizontal then 30 sec vertical." },
  ],
  updateSteps: [
    { step: 1, title: "Charge Fenix to 80%+ (Solar to 90%+)", detail: "Fenix firmware updates need stable power. Solar variants discharge faster during update because solar can't keep up — start at 90%+. Use the original Garmin charging clip; aftermarket clips often miss the data pin." },
    { step: 2, title: "Sync watch with Garmin Connect first", detail: "Pending activities, sleep data, training metrics — all lost if firmware updates before sync. Open Connect → tap device → wait until 'Last Synced' < 2 min." },
    { step: 3, title: "Free up storage if installing maps", detail: "Fenix maps are 6+ GB. Connect to Express → click device → Maps → review installed regions. Remove ones you don't need (e.g., if hiking US only, remove Europe TOPO). Frees 4-8 GB typically." },
    { step: 4, title: "Choose firmware update method", detail: "Fenix 7/8 support over-the-air via WiFi or phone Bluetooth. Fenix 5/6 typically need USB-tethered Garmin Express for reliability. We recommend USB even for 7/8 — eliminates mid-update WiFi drops." },
    { step: 5, title: "Install firmware via Garmin Express", detail: "Plug clip into rear PC USB port. Open Express. Watch appears in 30 sec. Click 'Install Updates'. Firmware downloads (~80 MB), watch reboots, installs, reboots 2-3 more times. Total: 12-18 minutes." },
    { step: 6, title: "Install map updates AFTER firmware", detail: "Firmware first, maps second. Maps installed on old firmware may not display correctly. After firmware reboot completes, click 'Update Maps' in Express. TOPO updates are 4-8 GB and take 30-60 minutes.", warnings: "Don't unplug during map install. Map partition corruption requires full device recovery." },
    { step: 7, title: "Recalibrate compass after firmware update", detail: "Firmware updates often reset compass calibration. Hold UP → Sensors & Accessories → Compass → Calibrate. Hold watch flat, perform figure-8 for 30 seconds, then vertical figure-8 for 30 seconds. Confirms calibration." },
    { step: 8, title: "Restore Connect IQ apps and watch faces", detail: "Some Connect IQ apps and watch faces don't survive firmware updates — they show as 'incompatible'. Open Connect IQ Store on phone → reinstall any broken items. Most update automatically within 24 hours." },
  ],
  realTimeIssues: [
    { trigger: "After iOS 18 / iPadOS 18", symptom: "Fenix syncs once, Connect app then says 'Connecting...' indefinitely", ourFix: "iOS BLE permissions stuck. Reset network settings on phone, re-pair watch. Or: airplane mode 30 sec, then re-enable Bluetooth." },
    { trigger: "After Garmin firmware 14.x (Fenix 7)", symptom: "Battery drops 30% per day with normal use vs previous 5%", ourFix: "Known regression. Disable always-on display + change pulse ox to 'sleep only' + disable music backup. Workaround until 14.30+." },
    { trigger: "After winter glove use", symptom: "Touchscreen unresponsive even after gloves off", ourFix: "Capacitive sensor needs reset. Hold UP+LIGHT 10 sec — full reboot. Touchscreen recalibrates on next boot." },
    { trigger: "After updating Connect IQ apps", symptom: "Watch face shows error or reverts to default", ourFix: "Connect IQ Store auth expired. Sign out of Connect IQ Store on phone, sign back in, reinstall watch face. 6 min remote." },
  ],
  faqs: [
    { q: "How long does a Fenix map update take?", a: "TOPO map updates for Fenix 7/8 are 4-8 GB depending on regions installed. Via WiFi: 30-60 minutes if WiFi is stable (avoid hotel/cafe networks). Via USB Garmin Express: 25-45 minutes. Always install firmware first, then maps. Don't unplug or interrupt — map partition corruption requires full device recovery." },
    { q: "Why is my Fenix battery dying so much faster after the update?", a: "Three common causes after firmware updates: (1) Always-on display reset to ON — disable in Settings → Display, (2) Pulse Ox set to all-day instead of sleep-only — change in Settings → Sensors → Pulse Ox, (3) GPS-on-default for activities — change activity profile defaults. Also known firmware regressions on Fenix 7 14.x — wait for 14.30+ patch." },
    { q: "How do I clear Fenix storage to install new maps?", a: "Connect Fenix to PC, open Garmin Express, click device → Maps tab. You'll see all installed regions (each 1.5-4 GB) plus base maps. Uncheck regions you don't need (e.g., remove European TOPO if hiking US only). Click 'Apply'. Frees 4-8 GB. You can also remove Connect IQ apps via Express to free 100-500 MB." },
    { q: "Can I downgrade Fenix firmware if the new version has bugs?", a: "Garmin doesn't officially support downgrades, but it works via USB by replacing GUPDATE.gcd in /Garmin/firmware/ on the watch. Risky — can brick the watch. We keep archived firmware files for Fenix 5, 6, 7, 8 and downgrade as a service for $49. Don't attempt yourself unless you're comfortable with file system manipulation." },
    { q: "My Fenix Solar shows 0% solar input — is it broken?", a: "Three likely causes in order: (1) solar lens dirty (clean with soft cloth, no chemicals), (2) low ambient light — solar needs 10,000+ lux which is direct sunlight, indoor doesn't register, (3) firmware regression on certain 14.x versions — check Garmin forums for your model. If still 0% after cleaning + outdoor sunlight test, hardware sensor failure — call us for diagnostic." },
    { q: "Why won't my Fenix pair with my HRM-Pro Plus?", a: "Phone Bluetooth often interferes. Sequence: (1) turn phone Bluetooth OFF temporarily, (2) put HRM-Pro in pairing mode (wet contacts, put on chest), (3) on watch hold UP → Sensors & Accessories → Add New → Heart Rate. Should pair in 30 seconds. Once paired, you can re-enable phone Bluetooth — watch and phone won't fight over the sensor." },
    { q: "Will Trini System update my Fenix remotely?", a: "Yes. Connect Fenix to your PC via charging clip, we connect via secure remote session, run firmware + map update + sensor recalibration via Garmin Express. Average time: 30-45 minutes for full update. $49 flat. Call 347-953-1531." },
  ],
  cableType: "Garmin proprietary 4-pin charging clip (USB-A) — same clip across Fenix 5, 6, 7, 8 (Fenix 5 uses older clip)",
  expressCompatible: true,
  estimatedFixCost: "$49 flat — firmware + maps + sensor calibration + Connect IQ restore",
  bgGradient: "linear-gradient(135deg, #0c1a0e 0%, #163024 40%, #1f4e3a 100%)",
  accentColor: "emerald",
  metaTitle: "Garmin Fenix Update — Fenix 5, 6, 7, 8 Fix",
  metaDescription:
    "Update Garmin Fenix 5, 6, 7, 8 — firmware, TOPO maps, compass, sensors. Fix battery drain, sync, solar issues. Remote service from $49. Call 347-953-1531.",
  primaryKeywords: [
    "garmin fenix update", "fenix 7 update", "fenix 6 firmware update", "fenix 8 update",
    "fenix battery drain fix", "fenix map update stuck", "fenix won't sync",
    "fenix compass calibration", "fenix solar charging", "fenix 7 pro update",
    "epix pro update", "garmin fenix not syncing",
  ],
};

// ───────────────────────────────────────────────────────────────────
// 4. GARMIN ZUMO (motorcycle GPS)
// ───────────────────────────────────────────────────────────────────

export const zumo: GarminSeries = {
  slug: "zumo-update",
  name: "Garmin Zumo",
  category: "moto",
  tagline: "Update Zumo XT, XT2, 595, 396 — maps, BaseCamp routes, helmet audio",
  models: [
    { name: "Zumo XT", year: "2020–2024", market: "5.5\" rugged moto GPS — most-installed unit on US bikes" },
    { name: "Zumo XT2", year: "2024–", market: "Newest gen — sharper screen, better glare handling" },
    { name: "Zumo 595LM", year: "2016–2019", market: "Older 5\" — still very common on Harleys, BMW GS" },
    { name: "Zumo 396LMT-S", year: "2018–2020", market: "4.3\" budget-friendly older unit, still active" },
    { name: "Zumo 660 / 665", year: "Legacy", market: "10+ years old — limited update support but we maintain archive" },
  ],
  commonProblems: [
    { problem: "Map won't load route from BaseCamp", cause: "BaseCamp file format changed; .GPX import preferred over native BaseCamp .GDB", fixTime: "15 min", remoteSuccess: "92%" },
    { problem: "Helmet Bluetooth keeps disconnecting", cause: "Battery in helmet headset low; Bluetooth profile conflict with phone", fixTime: "12 min", remoteSuccess: "88%" },
    { problem: "Touch screen unresponsive with gloves", cause: "Glove compatibility setting; capacitive sensitivity adjustment needed", fixTime: "5 min", remoteSuccess: "100%" },
    { problem: "GPS lock takes 3+ min after garage start", cause: "Stale almanac after 7+ days idle; cold start needed in open sky", fixTime: "20 min", remoteSuccess: "95%" },
    { problem: "Curvy roads routing not preferring backroads", cause: "Route preferences default reset; needs 'curvy roads' priority enabled", fixTime: "5 min", remoteSuccess: "100%" },
    { problem: "Trip planner crashes when adding 6+ waypoints", cause: "Memory limit on older models; firmware bug on Zumo XT pre-7.x", fixTime: "20 min", remoteSuccess: "75%" },
  ],
  uniqueErrorCodes: [
    { code: "Cradle Power Lost", meaning: "Bike-mount cradle lost 12V power — wiring or fuse", fix: "Check bike's accessory fuse, ground connection on cradle harness, voltage at cradle pins (should be 12-14V key on)." },
    { code: "Audio Output Failed", meaning: "Bluetooth audio profile (A2DP) lost connection to helmet", fix: "Forget helmet pair on Zumo, forget Zumo pair on helmet, re-pair fresh. Some helmets need A2DP only mode (not HFP)." },
    { code: "Route Cannot Be Calculated", meaning: "Waypoints exceed road network or off-road points", fix: "Check waypoints — if any is off a mapped road (forest, gravel), Zumo can't route. Move to nearest paved road." },
    { code: "Smartphone Link Disconnected", meaning: "Smartphone Link app deprecated, replaced by Garmin Drive app", fix: "Uninstall Smartphone Link, install Garmin Drive app, re-pair. Zumo XT2 uses Garmin Drive native." },
  ],
  updateSteps: [
    { step: 1, title: "Remove Zumo from bike, bring inside", detail: "Bike-mount cradle does NOT pass enough USB data for updates — only power. Remove unit from cradle, bring to PC. Use original Garmin USB cable." },
    { step: 2, title: "Charge to 100% before updating", detail: "Zumo's internal battery degrades faster than auto units (heat exposure). Below 70% the unit may reboot mid-update. Plug into wall charger 30 min first.", warnings: "Don't update Zumo on bike battery alone — voltage drop during start can interrupt." },
    { step: 3, title: "Open Garmin Express on PC", detail: "Same as DriveSmart process. Express auto-detects Zumo. If aftermarket cable: Express won't see device. Switch to original Garmin cable." },
    { step: 4, title: "Install firmware FIRST, then maps", detail: "Always firmware before maps. Map updates on old firmware sometimes leave the unit unable to read new map format on Zumo specifically." },
    { step: 5, title: "Install full North America (or relevant region)", detail: "Zumo map is ~12 GB for North America. Allow 60-90 minutes via USB. Zumo XT/XT2 have built-in WiFi for OTA updates but USB is more reliable for a moto unit." },
    { step: 6, title: "Re-pair helmet headset after update", detail: "Firmware updates often reset Bluetooth pairings. On Zumo: Settings → Wireless Networks → forget all paired audio devices. Re-pair from helmet headset side. Sena, Cardo, and other major brands all work — A2DP profile required." },
    { step: 7, title: "Restore curvy roads / scenic routing preferences", detail: "Zumo default routing is 'fastest' which is often boring on a bike. Settings → Navigation → Calculation Mode → 'Curvy Roads' or 'Scenic'. Many riders set Curvy Roads as default." },
    { step: 8, title: "Reinstall on bike, test in driveway", detail: "Mount in cradle, key on, verify GPS lock + helmet audio + power. Don't ride without verifying — update issues can cause routing glitches that only show during real navigation." },
  ],
  realTimeIssues: [
    { trigger: "After iOS 18 update", symptom: "Zumo XT Bluetooth disconnects from phone every 5 min", ourFix: "iOS 18 changed BLE multi-device handling. Force-quit Garmin Drive, forget Zumo on iPhone, re-pair. Set Zumo as 'Audio + Phone' priority on iPhone." },
    { trigger: "After windshield replacement on bike", symptom: "Zumo can't lock satellites under new windshield", ourFix: "Some replacement windshields are coated/tinted, blocking GPS. Test with Zumo outside windshield path. Solution: external GPS antenna ($45 Garmin GA-25)." },
    { trigger: "After Sena helmet firmware update", symptom: "Sena pairs with Zumo but no audio", ourFix: "Sena firmware 2025+ defaults to BT Intercom mode, not music mode. On helmet: hold M button to switch to A2DP music mode. Pair fresh with Zumo." },
    { trigger: "After Garmin Drive app update", symptom: "Trip planning sync between phone and Zumo broken", ourFix: "App data corruption. Uninstall Drive app, restart phone, reinstall fresh from App Store/Play Store, re-pair. 8 min remote." },
  ],
  faqs: [
    { q: "How do I import a route from BaseCamp to Zumo?", a: "Modern Zumo (XT/XT2) prefer .GPX format over native BaseCamp .GDB files. In BaseCamp: File → Export → Selection → choose .GPX. Connect Zumo via USB. Copy .GPX to /Garmin/GPX/ folder on Zumo. Disconnect, on Zumo navigate to: Apps → Trip Planner → Trips. New route appears. If it doesn't, the .GPX file has waypoints off-road — re-export with 'route' track type." },
    { q: "Why does my Zumo touchscreen not work with motorcycle gloves?", a: "Two settings to check: (1) Settings → Display → 'Glove Mode' should be ON, (2) Settings → Display → Touch Sensitivity should be HIGH. Some thick winter gloves still won't trigger — try riding gloves with capacitive fingertips, or use the physical buttons (zoom, menu) instead. Zumo XT2 has improved glove sensing over Zumo XT." },
    { q: "Can I update my Zumo while it's on the bike?", a: "Technically possible via WiFi on Zumo XT/XT2 if your garage has WiFi, but NOT recommended. Bike battery isn't designed for 60-90 minute high-current draw. Mid-update battery dropouts brick the unit. Always remove Zumo from bike, take inside, plug into wall + USB to PC. 90% of Zumo update failures we see were attempted on the bike." },
    { q: "Why does my Zumo's helmet Bluetooth keep cutting out?", a: "Three causes in order: (1) helmet headset battery dying — most common, charge helmet, (2) Bluetooth pair conflict with phone, in helmet settings allow 'multipoint' mode, (3) firmware mismatch between Zumo and helmet — update both. Sena and Cardo helmet firmware affects Bluetooth profile compatibility. After updates, re-pair fresh." },
    { q: "How do I get scenic / curvy roads routing on Zumo?", a: "Settings → Navigation → Calculation Mode → 'Curvy Roads' or 'Adventurous Routing'. Default 'Fastest Route' uses highways which is boring on a bike. 'Curvy Roads' prioritizes twisty backroads. 'Adventurous Routing' adds elevation changes and hills. Set as default and Zumo plans every route this way." },
    { q: "My Zumo screen is hard to see in direct sunlight — fix?", a: "Settings → Display → Brightness → Maximum (or Auto). Settings → Display → Background → 'Day' (white background more visible than black in sun). Anti-glare film for $15 helps significantly. Older Zumo 5xx series has weaker screens than modern XT/XT2 — limit." },
    { q: "Will Trini System update my Zumo remotely?", a: "Yes. Bring Zumo inside off the bike, connect to your PC via USB. We connect via secure remote session, run firmware + map update + helmet pairing reset via Garmin Express. Average time: 90 minutes for full update. $49 flat. Call 347-953-1531." },
  ],
  cableType: "USB-A to micro-USB (Zumo 595, 396) or USB-A to USB-C (Zumo XT, XT2)",
  expressCompatible: true,
  estimatedFixCost: "$49 flat — firmware + map + helmet Bluetooth + routing setup",
  bgGradient: "linear-gradient(135deg, #1a0c00 0%, #321800 40%, #4d2400 100%)",
  accentColor: "amber",
  metaTitle: "Garmin Zumo Update — XT, XT2, 595 Motorcycle",
  metaDescription:
    "Update Garmin Zumo XT, XT2, 595, 396 maps & firmware. Fix Bluetooth helmet audio, glove screen, BaseCamp routes. From $49. Call 347-953-1531.",
  primaryKeywords: [
    "garmin zumo update", "zumo xt update", "zumo xt2 firmware",
    "garmin zumo 595 update", "garmin zumo 396 map update", "zumo bluetooth helmet",
    "zumo not pairing", "garmin motorcycle gps update", "zumo basecamp",
    "zumo curvy roads routing", "zumo touchscreen gloves", "zumo gps lock",
  ],
};

// ───────────────────────────────────────────────────────────────────
// 5. GARMIN eTREX (handheld outdoor)
// ───────────────────────────────────────────────────────────────────

export const etrex: GarminSeries = {
  slug: "etrex-update",
  name: "Garmin eTrex",
  category: "outdoor",
  tagline: "Update eTrex 10, 20, 22x, 30, 32x, SE, Solar — TOPO maps, firmware, batteries",
  models: [
    { name: "eTrex 10", year: "2011–", market: "Entry-level — basemap only, no map upload — most-sold eTrex" },
    { name: "eTrex 20 / 20x", year: "2011–2018", market: "Color screen + map upload — discontinued but huge field-active base" },
    { name: "eTrex 22x", year: "2018–", market: "Replaced eTrex 20 — better screen, USB micro-B" },
    { name: "eTrex 30 / 30x", year: "2011–2018", market: "Premium older — barometric altimeter + electronic compass" },
    { name: "eTrex 32x", year: "2018–", market: "Replaced eTrex 30 — current premium handheld" },
    { name: "eTrex Touch 25 / 35", year: "2015–2020", market: "Touchscreen variants — different update process than button eTrex" },
    { name: "eTrex SE", year: "2023–", market: "Modern reimagining — Bluetooth + Garmin Connect support" },
    { name: "eTrex Solar", year: "2023–", market: "Solar-charging variant of SE — extends battery life significantly" },
  ],
  commonProblems: [
    { problem: "Won't acquire satellites in heavy tree canopy", cause: "Older eTrex chip less sensitive than modern; needs WAAS + multi-satellite", fixTime: "10 min", remoteSuccess: "85%" },
    { problem: "Custom waypoints disappear after firmware update", cause: "Waypoint database format change; need to back up before update", fixTime: "20 min", remoteSuccess: "70%" },
    { problem: "TOPO map showing as 'locked'", cause: "Map license tied to wrong device ID after used purchase", fixTime: "15 min", remoteSuccess: "95%" },
    { problem: "Compass calibration won't complete", cause: "Magnetic interference (phone in pocket); needs open area for cal", fixTime: "8 min", remoteSuccess: "100%" },
    { problem: "Battery drain in 6 hours instead of 25", cause: "Backlight always on + GPS continuous + worn AAA cells", fixTime: "5 min", remoteSuccess: "100%" },
    { problem: "MicroSD with TOPO map not detected", cause: "Wrong card format (must be FAT32); card seated wrong; corrupt", fixTime: "12 min", remoteSuccess: "92%" },
  ],
  uniqueErrorCodes: [
    { code: "Cannot Read Map", meaning: "TOPO map file (.IMG) corrupted or wrong region", fix: "Connect to PC, navigate to Garmin folder, replace gmapsupp.img with fresh download from Garmin Express." },
    { code: "Cannot Unlock Maps", meaning: "TOPO 24K license tied to original purchaser's account", fix: "Sign in with original purchaser account, or contact Garmin Support to transfer license. Some TOPO products are non-transferable." },
    { code: "Memory Card Error", meaning: "MicroSD card not recognized — usually format issue", fix: "Connect eTrex to PC, format SD card to FAT32 (not exFAT), copy TOPO map to /Garmin/ folder on card." },
    { code: "Track Log Full", meaning: "Internal log capacity reached (10,000 points typical)", fix: "Connect to BaseCamp, transfer tracks to PC, clear track log on eTrex. Settings → Reset → Clear Track Log." },
  ],
  updateSteps: [
    { step: 1, title: "Insert fresh AA batteries (or charge if SE/Solar)", detail: "eTrex 10/20/22x/30/32x use 2x AA batteries. Use NEW alkaline or fully-charged NiMH — old batteries cause mid-update reboots. eTrex SE/Solar charge via USB-C — full charge before update." },
    { step: 2, title: "Connect eTrex to PC via USB cable", detail: "eTrex 10, 20, 22x, 30, 32x use mini-USB (older type). eTrex SE and Solar use USB-C. Use original Garmin cable. Plug into rear PC USB port for stable power." },
    { step: 3, title: "Open Garmin Express, sign in with Garmin account", detail: "Express detects eTrex automatically. If your TOPO maps were purchased on a different Garmin account, sign in with THAT account or maps will show locked." },
    { step: 4, title: "Back up custom waypoints BEFORE updating", detail: "eTrex waypoints sometimes vanish during firmware update. In Express → Tools → Backup Device. Saves all waypoints, tracks, routes to your PC. Restorable if anything goes wrong.", warnings: "Skipping this step is the #1 mistake we see." },
    { step: 5, title: "Install firmware first, then maps", detail: "Firmware update: 30-80 MB, takes 5 minutes. After firmware reboot, install TOPO maps. eTrex base map is built-in; TOPO 24K or City Navigator are optional add-ons." },
    { step: 6, title: "For TOPO maps via SD card, format card properly", detail: "If installing TOPO on a microSD: format card to FAT32 (NOT exFAT — eTrex doesn't read exFAT). Create /Garmin/ folder on card. Copy gmapsupp.img into that folder. Insert card into eTrex (battery cover, then SD slot)." },
    { step: 7, title: "Restore waypoints from backup if needed", detail: "After update, if waypoints missing: in Express → Tools → Restore from Backup → select pre-update backup. Waypoints reappear on next sync." },
    { step: 8, title: "Recalibrate compass & altimeter (if eTrex 30/32x)", detail: "Settings → Heading → Calibrate Compass. Hold eTrex flat, perform figure-8 motion, then vertical figure-8. Settings → Altimeter → Calibrate → enter known elevation (or set to GPS). Premium eTrex models only." },
  ],
  realTimeIssues: [
    { trigger: "After 6+ months in storage", symptom: "eTrex won't acquire satellites — stuck on 'Acquiring'", ourFix: "Almanac severely outdated. Place outdoors with clear sky, leave on for 15-20 minutes for cold start. Don't move device. Almanac re-downloads from satellites." },
    { trigger: "After firmware 6.x (eTrex 22x/32x)", symptom: "Compass declination calculation incorrect in high latitudes", ourFix: "Known regression. Workaround: manually set declination (Settings → Heading → Magnetic Declination). Use NOAA online calculator for your location." },
    { trigger: "After microSD card swap", symptom: "TOPO map shows on PC but not on eTrex", ourFix: "Card format wrong (exFAT instead of FAT32) OR file not in /Garmin/ folder OR file not named gmapsupp.img. Reformat to FAT32, place file correctly, re-insert." },
    { trigger: "After cold weather (below 20°F)", symptom: "Screen unresponsive, slow to draw map", ourFix: "LCD response slows below 20°F — normal physics. Workaround: keep eTrex inside jacket near body until ready to use, then expose for navigation only." },
  ],
  faqs: [
    { q: "How do I install TOPO maps on my Garmin eTrex?", a: "Two methods: (1) Internal storage via Garmin Express — only fits 1-2 regions on internal memory, (2) MicroSD card — preferred. Format microSD to FAT32, create /Garmin/ folder, copy gmapsupp.img file (downloaded via Express or BaseCamp) into that folder. Insert SD into eTrex under the battery cover. eTrex auto-detects on boot." },
    { q: "Why won't my eTrex 22x acquire satellites?", a: "Most likely outdated almanac after long storage. Take eTrex outside to clear sky, power on, place flat with antenna up, leave undisturbed 15-20 minutes. Almanac re-downloads from satellites — first lock takes 5-15 min, subsequent locks 30-60 sec. If still no signal after 20 min, check Settings → Satellite to confirm GPS is enabled and 'WAAS/EGNOS' is ON for better coverage." },
    { q: "Can I use my old eTrex 20 with current TOPO maps?", a: "Yes — eTrex 20 (and 20x) supports the same TOPO US 24K and City Navigator products as current models. Garmin still sells maps in eTrex 20 compatible format. Note: eTrex 10 (basemap only, no map upload) is the only eTrex that can't accept TOPO. Check your model — eTrex 10 has a B&W screen, eTrex 20+ has color." },
    { q: "How long do batteries last on a Garmin eTrex?", a: "With fresh AA alkaline + GPS continuously on + backlight off: 22-25 hours on eTrex 22x/32x, 18-22 hours on older 20/30. With backlight always on: 8-12 hours. NiMH rechargeables: 80% of alkaline life but reusable. eTrex SE/Solar charge via USB-C — 12-14 hour battery, extendable indefinitely with Solar variant in good sun." },
    { q: "Why is my eTrex compass spinning randomly?", a: "Magnetic interference. Most common: phone in same pocket, metal car frame, magnetic watch band, or being inside a vehicle. Move 6+ feet from electronics, perform compass calibration: Settings → Heading → Calibrate Compass. Hold flat, figure-8 motion 30 sec, then vertical figure-8 30 sec. Calibration completes when 'Calibration successful' appears." },
    { q: "Can I transfer waypoints from old eTrex to new eTrex?", a: "Yes via BaseCamp (free Garmin desktop software). Connect old eTrex → BaseCamp imports waypoints. Disconnect, connect new eTrex, drag waypoints from old device folder to new device folder in BaseCamp left panel. Waypoints transfer. Or export to .GPX file as middleware. Works between any two eTrex models." },
    { q: "Will Trini System update my Garmin eTrex remotely?", a: "Yes. Connect eTrex to your PC via USB cable, we connect via secure remote session, run firmware + map updates + waypoint backup via Garmin Express + BaseCamp. Average time: 30-45 minutes including backup. $49 flat. Call 347-953-1531." },
  ],
  cableType: "USB-A to mini-USB (eTrex 10, 20, 22x, 30, 32x) or USB-A to USB-C (eTrex SE, Solar)",
  expressCompatible: true,
  estimatedFixCost: "$49 flat — firmware + TOPO maps + waypoint backup + compass calibration",
  bgGradient: "linear-gradient(135deg, #0a1a0e 0%, #142b1c 40%, #1f4128 100%)",
  accentColor: "emerald",
  metaTitle: "Garmin eTrex Update — 10, 20, 22x, 30, 32x Fix",
  metaDescription:
    "Update Garmin eTrex 10, 20, 22x, 30, 32x, SE, Solar — TOPO maps, firmware. Fix satellite, compass, microSD issues. From $49. Call 347-953-1531.",
  primaryKeywords: [
    "garmin etrex update", "etrex 22x update", "etrex 32x firmware",
    "etrex 10 not finding satellites", "etrex topo map install", "etrex se update",
    "etrex solar firmware", "garmin etrex compass calibration", "etrex microsd map",
    "etrex won't connect", "etrex 20 update", "etrex battery life",
  ],
};

// ───────────────────────────────────────────────────────────────────
// 6. PROBLEM: WiFi Sync Not Working (watch-specific)
// ───────────────────────────────────────────────────────────────────

export const wifiSyncNotWorking: GarminProblemPage = {
  slug: "wifi-sync-not-working",
  problemTitle: "Garmin WiFi Sync Not Working",
  metaTitle: "Garmin WiFi Sync Not Working — Quick Fix",
  metaDescription:
    "Garmin watch WiFi won't sync? 7 causes & fixes for Forerunner, Fenix, Venu, Vivoactive. Free 2026 guide. Call 347-953-1531 — remote fix.",
  problemSummary:
    "Garmin watches use WiFi to upload large activity files, sync music, and download firmware faster than Bluetooth. When WiFi sync stops working, you're stuck on slower Bluetooth-only sync — or no sync at all if Bluetooth is also broken. There are 7 root causes and 5 fixes that work in 90% of cases.",
  affectedModels: [
    "Garmin Forerunner 255, 265, 945, 955, 965 (WiFi-equipped runners)",
    "Garmin Fenix 6 Pro, 7, 7 Pro, 8, 8 Pro (WiFi-equipped multisport)",
    "Garmin Epix 2, Epix Pro (WiFi-equipped AMOLED)",
    "Garmin Venu 2, 2 Plus, 3 (WiFi-equipped lifestyle)",
    "Garmin Vivoactive 5 (WiFi via paired phone)",
    "Garmin Tactix 7, Quatix 7 (WiFi-equipped specialty)",
    "NOT affected: Forerunner 245, Fenix 5/5 Plus, Venu, Vivoactive 4 — these don't have WiFi",
  ],
  symptoms: [
    "Watch shows 'WiFi: Connected' but sync hangs forever",
    "Watch shows 'Connect to WiFi' but won't see your network",
    "Sync completes via Bluetooth but never via WiFi",
    "Music sync stuck at 'Preparing' for hours",
    "Firmware update via WiFi fails, requires USB Garmin Express",
    "WiFi works initially, then stops working after Bluetooth re-pair",
    "Watch sees network but says 'Wrong Password' on correct password",
  ],
  causes: [
    {
      cause: "WiFi network is 5 GHz only",
      likelihood: "Most common (~30% of cases)",
      description: "Most Garmin watches only support 2.4 GHz WiFi. If your router broadcasts 5 GHz only (or you've set a single SSID that auto-selects 5 GHz), the watch can't connect at all. Newer Fenix 8 supports both bands; FR 255, 265, 945, 955, 965 are 2.4 GHz only.",
    },
    {
      cause: "Captive portal / login required network",
      likelihood: "Very common (~20% of cases)",
      description: "Hotel WiFi, coffee shop WiFi, and corporate guest networks usually require a login page. Garmin watches can't display these pages, so WiFi shows 'Connected' but no internet. Sync fails silently. Use home WiFi or phone hotspot instead.",
    },
    {
      cause: "Wrong password (case sensitivity or special chars)",
      likelihood: "Common (~15% of cases)",
      description: "Garmin watch WiFi setup interface is small and error-prone. Special characters (!@#$&) often get mistyped. Capital vs lowercase letters silently confused. Test the same password on your phone first to confirm correct, then re-enter on watch.",
    },
    {
      cause: "Router uses WPA3 only",
      likelihood: "Common (~12% of cases)",
      description: "Modern routers default to WPA3 encryption. Older Garmin watches (FR 945, Fenix 6 Pro) only support WPA2. Solution: in router admin, set encryption to 'WPA2/WPA3 mixed' instead of 'WPA3 only'.",
    },
    {
      cause: "Watch firmware bug (post-update regression)",
      likelihood: "Less common (~10% of cases)",
      description: "Garmin firmware versions occasionally break WiFi for specific models. FR 955 firmware 14.04 had WiFi sync regression — fixed in 14.10. Fenix 7 Pro firmware 14.30 had similar issue. Check Garmin Connect for newer firmware via USB Express if WiFi-stuck.",
    },
    {
      cause: "MAC address filtering on router",
      likelihood: "Less common (~7% of cases)",
      description: "If your router has MAC address filtering enabled (common in office environments), the watch's MAC needs to be whitelisted. Find watch MAC: Settings → Connectivity → WiFi → Add Network → look at bottom. Add to router whitelist.",
    },
    {
      cause: "Bluetooth-WiFi handover bug",
      likelihood: "Rare (~6% of cases)",
      description: "Specific iOS + Garmin Connect + watch firmware combinations cause Bluetooth and WiFi to fight for radio. Watch shows WiFi OK but won't sync because Connect app insists on Bluetooth path. Force-close Connect app, retry sync — WiFi takes over.",
    },
  ],
  diagnosticSteps: [
    { step: 1, title: "Test WiFi on phone with same network", detail: "Make sure the network actually works. Connect phone to it, browse a website. If phone fails too, network is the issue.", ifFails: "Use different WiFi network — home WiFi or phone hotspot." },
    { step: 2, title: "Verify network is 2.4 GHz available", detail: "Modern routers often hide the 2.4 GHz SSID or auto-merge bands. In router admin, enable 'separate 2.4 GHz SSID' temporarily for watch setup.", ifFails: "If only 5 GHz available, watch can't connect (except Fenix 8). Use phone hotspot in 2.4 GHz mode." },
    { step: 3, title: "Test password on a phone first", detail: "Type the password into your phone WiFi, connect successfully. Then re-enter EXACTLY same password on watch. Watch out for case + special chars.", ifFails: "If phone fails too, password is wrong — check router admin." },
    { step: 4, title: "Check watch firmware version", detail: "Hold UP → Settings → System → About → note firmware version. Search Garmin forums '[your model] [firmware version] WiFi' to check for known regressions.", ifFails: "If known regression, update firmware via USB Garmin Express." },
    { step: 5, title: "Force-close Connect app, retry sync", detail: "Sometimes Connect app holds Bluetooth path open, blocking WiFi. Force-close (swipe up app drawer), reopen, manual sync. Watch should choose WiFi automatically.", ifFails: "If still no WiFi sync, proceed to fix sequence." },
  ],
  fixSequence: [
    { step: 1, title: "Set up phone hotspot as test network", detail: "On phone, enable Personal Hotspot, set band to 2.4 GHz only (iOS: Settings → Personal Hotspot → 'Maximize Compatibility' ON). Use simple password (no special chars). Connect watch — should work immediately if home network was the issue.", estimatedTime: "5 min" },
    { step: 2, title: "On watch, forget all WiFi networks", detail: "Hold UP → Settings → Connectivity → WiFi → Networks → for each entry tap → Forget. Clean slate.", estimatedTime: "3 min" },
    { step: 3, title: "Re-add network manually with correct details", detail: "Watch → Add Network → enter SSID exactly as broadcast (case sensitive) → enter password very carefully → confirm. Should connect within 30 seconds.", estimatedTime: "5 min" },
    { step: 4, title: "Verify firmware is current", detail: "If still failing after fresh add, firmware may have WiFi bug. Connect watch to PC via charging clip, run Garmin Express, install pending firmware updates. WiFi often fixed by firmware patch.", estimatedTime: "15 min" },
    { step: 5, title: "If router is WPA3 only, change to WPA2/WPA3 mixed", detail: "Log into router admin (usually 192.168.1.1 or 192.168.0.1). Wireless Settings → Security → change WPA3 to 'WPA2/WPA3 Mixed' or 'WPA2'. Save. Watch can now connect.", estimatedTime: "10 min" },
  ],
  whenToCallUs:
    "Call us at 347-953-1531 if any of these apply: (a) you've tried phone hotspot and home WiFi and both fail, (b) firmware update via USB also fails, (c) you don't have admin access to your router to change settings, (d) the watch worked on WiFi yesterday but not today after a firmware update. We diagnose remotely from $49.",
  faqs: [
    { q: "Does my Garmin watch have WiFi?", a: "WiFi-equipped models: Forerunner 255/265/945/955/965, Fenix 6 Pro/7/7 Pro/8/8 Pro, Epix 2/Pro, Venu 2/2 Plus/3, Vivoactive 5 (via phone), Tactix 7, Quatix 7. NOT WiFi-equipped: Forerunner 245, Forerunner 165, Fenix 5/5 Plus/6 (non-Pro), Venu (1st gen), Venu Sq, Vivoactive 4 and earlier. Check yours: hold UP → Settings → Connectivity. If 'WiFi' option exists, you have it." },
    { q: "Why does my Garmin say 'Wrong Password' when password is correct?", a: "Three possibilities: (1) special character mistyped — !, @, #, $ are easy to confuse on the small watch keyboard, (2) capital vs lowercase letter — Garmin watch defaults to lowercase, you must shift for caps, (3) network actually requires WPA3 and watch only supports WPA2. Test password on phone first to rule out (1) and (2). If phone works but watch fails, check router for (3)." },
    { q: "Can my Garmin watch use my phone's hotspot for WiFi?", a: "Yes — and it's actually a great troubleshooting tool. Enable hotspot on phone (set to 2.4 GHz / 'Maximize Compatibility' on iPhone), use simple password, watch connects in 30 seconds. If hotspot works but home WiFi doesn't, your home network has the issue (5 GHz only, WPA3 only, etc.)." },
    { q: "How long does WiFi sync take vs Bluetooth?", a: "Activity sync: WiFi is 3-5x faster than Bluetooth for large activities (4+ hour rides with HRM data). Music sync: WiFi REQUIRED for music — Bluetooth doesn't transfer music files. Firmware updates: WiFi 5-8 min vs Bluetooth 20-30 min. For everyday step/sleep sync, Bluetooth and WiFi are similar speed." },
    { q: "Why does WiFi work for sync but not music download?", a: "Music download requires authentication with Spotify/Amazon Music/Deezer — separate from Garmin Connect WiFi sync. If WiFi works for activity sync but music sync hangs at 'Preparing': open Connect IQ Store on phone → Spotify/Amazon Music app → re-authenticate. Token expires every 30-60 days." },
    { q: "Should I use WiFi or Bluetooth for my Garmin watch?", a: "Use both — they complement each other. Bluetooth is for everyday small syncs (steps, sleep, notifications) and is always-on. WiFi auto-engages for large transfers (4+ hour activities, music, firmware). Don't disable either. Watch automatically picks fastest path. If WiFi is broken, watch falls back to Bluetooth — slower but functional." },
    { q: "Can Trini System fix my Garmin WiFi sync remotely?", a: "Yes. We connect to your computer via secure remote session (you don't need to mail your watch in). We diagnose router settings, firmware version, and WiFi config, then walk through the fix while you watch. Average time: 25 minutes. $49 flat. Call 347-953-1531." },
  ],
  bgGradient: "linear-gradient(135deg, #061224 0%, #0a2347 40%, #0d3266 100%)",
  accentColor: "blue",
  primaryKeywords: [
    "garmin wifi not working", "garmin watch wifi sync", "garmin won't connect to wifi",
    "garmin forerunner wifi", "garmin fenix wifi sync", "garmin music sync stuck",
    "garmin wifi wrong password", "garmin watch wifi setup", "garmin venu wifi",
    "garmin epix wifi", "garmin connect wifi sync", "garmin watch won't sync",
  ],
};

// ───────────────────────────────────────────────────────────────────
// EXPORT REGISTRY — used by /garmin/[slug] dynamic route
// ───────────────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────────────
// SPRINT 3+4 — Venu, Dezl, Honda, Jeep, Drive 50, Nuvi 2597, Oregon, GPSMAP + 3 problem pages
// ───────────────────────────────────────────────────────────────────

export const venu: GarminSeries = {
  slug: "venu-update",
  name: "Garmin Venu",
  category: "watch",
  tagline: "Update Venu 2, 2 Plus, 3, 3S — AMOLED lifestyle watches",
  models: [
    { name: "Venu", year: "2019–2021", market: "First AMOLED Garmin — still field-active" },
    { name: "Venu Sq / Sq Music", year: "2020–2022", market: "Square-face budget — different update path than round Venu" },
    { name: "Venu 2 / 2S", year: "2021–", market: "Most-installed Venu — round face, GPS + music" },
    { name: "Venu 2 Plus", year: "2022–", market: "Adds voice assistant + speaker for calls via phone" },
    { name: "Venu 3 / 3S", year: "2023–", market: "Newest gen — full meditation tools, sleep coach" },
    { name: "Venu Sq 2 / Sq 2 Music", year: "2022–", market: "Square Venu refresh — entry-level current" },
  ],
  commonProblems: [
    { problem: "Watch face stuck on Garmin logo at boot", cause: "Failed firmware mid-install; needs USB recovery via Express", fixTime: "25 min", remoteSuccess: "92%" },
    { problem: "Music sync to Spotify hangs at Preparing", cause: "Spotify auth token expired; Connect IQ Store sign-out fix", fixTime: "10 min", remoteSuccess: "98%" },
    { problem: "Body Battery score stuck at 5", cause: "HR sensor + sleep tracking de-synced; needs 3-night calibration", fixTime: "5 min", remoteSuccess: "100%" },
    { problem: "Pulse Ox draining battery to 0% in 2 days", cause: "All-day Pulse Ox should be sleep-only; setting reverts on update", fixTime: "5 min", remoteSuccess: "100%" },
    { problem: "Voice assistant on Venu 2 Plus not responding", cause: "Bluetooth A2DP profile dropped after iOS update", fixTime: "10 min", remoteSuccess: "94%" },
    { problem: "Touchscreen unresponsive after swimming", cause: "Touch lock auto-engaged for water; manual unlock needed", fixTime: "2 min", remoteSuccess: "100%" },
  ],
  uniqueErrorCodes: [
    { code: "Cannot Sync Music", meaning: "Streaming service auth expired (Spotify/Amazon Music/Deezer)", fix: "Connect IQ Store on phone → music app → Sign Out → Sign In. Re-authenticate, retry sync." },
    { code: "Activity Save Failed", meaning: "Storage full from accumulated activities or music files", fix: "Connect to Express → Tools → Manage Files → delete old activities or music. Free 500 MB+." },
    { code: "Connect Not Available", meaning: "Garmin Connect app not running on phone or Bluetooth dropped", fix: "Open Connect on phone, ensure Bluetooth enabled, force-sync from Connect device page." },
    { code: "Update Required", meaning: "Watch firmware too old to sync with current Connect app", fix: "Connect to Express via charging clip, install latest firmware via USB (more reliable than WiFi)." },
  ],
  updateSteps: [
    { step: 1, title: "Charge Venu to 80%+", detail: "Venu firmware updates need stable power. Use original Garmin charging clip — 4-pin connector. Aftermarket clips often miss the data pin and watch shows charging but doesnt connect to Express.", warnings: "Dont rely on wireless charging during update — Venu uses proprietary 4-pin clip, no Qi support." },
    { step: 2, title: "Sync Venu with Garmin Connect first", detail: "Pending steps, sleep, HR, body battery — all lost if firmware updates before sync. Open Connect → tap Venu → wait Last Synced under 2 min." },
    { step: 3, title: "Choose update method: WiFi or USB", detail: "Venu 2/2 Plus/3 support over-the-air via WiFi. Original Venu and Venu Sq need USB Garmin Express. We recommend USB even for Venu 3 — eliminates mid-update WiFi drops." },
    { step: 4, title: "Connect Venu via charging clip to PC", detail: "Plug clip into rear PC USB port (front-panel ports often underpowered for sustained transfer). Open Garmin Express. Watch should appear within 30 seconds." },
    { step: 5, title: "Install firmware first, then watch faces / music", detail: "Firmware download 60-120 MB depending on model. Watch reboots 2 times — Garmin logo, blank, logo, home screen. Total: 8-12 minutes USB." },
    { step: 6, title: "Reinstall Connect IQ watch faces if needed", detail: "Some Connect IQ watch faces show as Incompatible after firmware updates. Open Connect IQ Store on phone → reinstall any broken items. Auto-updates within 24 hours." },
    { step: 7, title: "Re-authenticate music services", detail: "Spotify, Amazon Music, Deezer auth often expires during firmware updates. Connect IQ Store → music app → Sign Out then Sign In. Re-sync songs from phone." },
    { step: 8, title: "Verify sync working both directions", detail: "Take 50 steps, check Connect app shows updated count. Start a 1-min walk activity, save it, verify it appears in Connect within 60 seconds." },
  ],
  realTimeIssues: [
    { trigger: "After iOS 18.2 update", symptom: "Venu 3 voice assistant says no microphone access", ourFix: "iOS 18 reset Bluetooth privacy permissions. Settings → Privacy → Microphone → Garmin Connect ON. Reset Venu Bluetooth, re-pair." },
    { trigger: "After Android 15 update", symptom: "Venu 2 disconnects from Connect every 5 minutes", ourFix: "Battery optimization re-enabled. Settings → Apps → Garmin Connect → Battery → Unrestricted. Disable Adaptive Battery for Connect specifically." },
    { trigger: "After firmware 12.x (Venu 3)", symptom: "Sleep tracking missing nap data", ourFix: "Known regression. Fix in 12.18+. Workaround: manually log naps in Connect app until firmware patch." },
    { trigger: "After Spotify app update", symptom: "Spotify songs missing on watch after sync", ourFix: "Spotify changed offline cache structure. Sign out of Spotify on Venu via Connect IQ, sign back in, re-sync playlist." },
  ],
  faqs: [
    { q: "How do I update my Garmin Venu without a computer?", a: "Venu 2, 2 Plus, 3, and 3S support over-the-air firmware updates via WiFi or phone Bluetooth. On the watch: hold MENU → Settings → System → Software Update → Check for Updates. Make sure watch has 50%+ battery and is connected to 2.4 GHz WiFi (Venu doesnt support 5 GHz). Original Venu and Venu Sq still require USB Garmin Express. WiFi update typically completes in 8 minutes; USB takes 12 minutes but is more reliable." },
    { q: "Why wont my Venu sync music with Spotify?", a: "Most common cause is expired Spotify auth token (every 30-60 days). Fix: open Connect IQ Store on phone → Spotify app → Sign Out → Sign In. Re-authorize Garmin to access Spotify Premium. Re-sync playlist from watch — should pull songs in 5-10 minutes. If still hangs at Preparing, verify Spotify Premium subscription is active (free tier wont sync to Garmin)." },
    { q: "How do I fix Venu touchscreen unresponsive?", a: "Most likely water lock is engaged. Hold MENU button 2 seconds — unlock screen. If touch is still unresponsive: hold UP+LIGHT for 10 seconds for hard reboot. Watch face shows Garmin logo, then home screen. Touchscreen recalibrates on boot. If still unresponsive after reboot, capacitive sensor may be damaged — call us." },
    { q: "Why is my Venu Body Battery stuck at low value?", a: "Body Battery needs 3 nights of sleep + HR data to calibrate. After firmware updates or factory resets, it resets to neutral starting value. Wear Venu continuously for 72+ hours including sleep. Score should normalize to your typical range. If stuck after 3 nights, HR sensor may not be reading consistently — wear watch one finger-width above wrist bone, snug fit, clean sensor with damp cloth." },
    { q: "How long does Venu battery last?", a: "Venu 2/2 Plus: 11 days smartwatch mode, 8 hours GPS. Venu 3: 14 days smartwatch, 26 hours GPS. AMOLED always-on display drops these by 50-60%. Pulse Ox all-day drops by 30%. Music streaming via Bluetooth drops GPS battery by 70%. To maximize: disable always-on display, set Pulse Ox to sleep-only, sync via WiFi instead of always-on Bluetooth." },
    { q: "Can I use Venu 3 for ECG?", a: "Venu 3/3S have ECG capability hardware-wise but ECG feature was rolled out via firmware update April 2024 in approved regions only (US, Canada, EU, UK, Australia, NZ initially). On watch: hold MENU → ECG. If menu missing, ECG not enabled in your region. Venu 2/2 Plus do NOT have ECG hardware." },
    { q: "Will Trini System update my Venu remotely?", a: "Yes. Connect Venu to your computer via charging clip, we connect via secure remote session, run firmware + Connect IQ + music service re-auth via Garmin Express. Average time: 25 minutes. Flat $49. Call 347-953-1531." },
  ],
  cableType: "Garmin proprietary 4-pin charging clip (USB-A)",
  expressCompatible: true,
  estimatedFixCost: "$49 flat — firmware + sync + music + Connect IQ restore",
  bgGradient: "linear-gradient(135deg, #1a081a 0%, #2c0f30 40%, #4a1854 100%)",
  accentColor: "purple",
  metaTitle: "Garmin Venu Update — Venu 2, 2 Plus, 3, 3S Fix",
  metaDescription:
    "Update Garmin Venu, Venu 2, 2 Plus, 3, 3S firmware. Fix sync, music, voice assistant, body battery. Remote service from $49. Call 347-953-1531.",
  primaryKeywords: [
    "garmin venu update", "venu 2 update", "venu 3 firmware", "venu 2 plus update",
    "venu music sync", "venu spotify not working", "venu body battery stuck",
    "venu pulse ox battery drain", "garmin venu wont sync", "venu sq update",
    "venu 3s firmware", "garmin venu touchscreen",
  ],
};

export const dezl: GarminSeries = {
  slug: "dezl-update",
  name: "Garmin Dezl",
  category: "truck",
  tagline: "Update Dezl OTR 700, 800, 1000 — truck routing, ELD, BC Camera",
  models: [
    { name: "Dezl OTR700", year: "2021–", market: "7\" — entry truck GPS, replaces Dezl 770" },
    { name: "Dezl OTR800", year: "2021–", market: "8\" — most-popular Dezl for owner-operators" },
    { name: "Dezl OTR1000", year: "2021–", market: "10\" — fleet/commercial pick" },
    { name: "Dezl LGV1000", year: "2022–", market: "European 10\" — different map data, same firmware" },
    { name: "Dezl 580 / 780", year: "2018–2021", market: "Older 5\"/7\" still field-active in fleets" },
    { name: "Dezl 770LMTHD", year: "2014–2018", market: "Legacy 7\" — limited current update support" },
  ],
  commonProblems: [
    { problem: "Truck routing wont avoid low bridges", cause: "Truck profile not configured; Settings → Truck Profile → set height", fixTime: "8 min", remoteSuccess: "100%" },
    { problem: "ELD compliance app crashes on Dezl", cause: "Connect IQ ELD app needs Connect IQ Store re-install + auth", fixTime: "15 min", remoteSuccess: "92%" },
    { problem: "Backup camera signal lost", cause: "BC30/BC40 camera pairing dropped; needs re-pair via Settings", fixTime: "10 min", remoteSuccess: "95%" },
    { problem: "Map update fails — file too large for storage", cause: "Truck maps include POIs for fuel/parking; need 18+ GB free", fixTime: "30 min", remoteSuccess: "85%" },
    { problem: "Voice prompts wrong language post-update", cause: "Language reset to default after firmware update; Settings → Voice", fixTime: "3 min", remoteSuccess: "100%" },
    { problem: "GPS lock takes 5+ min in Walmart parking lot", cause: "Stale almanac after long-haul; cold-start needed in open sky", fixTime: "20 min", remoteSuccess: "95%" },
  ],
  uniqueErrorCodes: [
    { code: "Vehicle Profile Required", meaning: "Truck routing needs height/weight/length set", fix: "Settings → Truck Profile → Active Profile → enter height (13ft 6in common), weight, length, hazmat status if applicable." },
    { code: "Camera Not Detected", meaning: "BC30/BC40 backup camera lost wireless pairing", fix: "Settings → Wireless Cameras → Pair → power-cycle camera + Dezl. Re-pair within 30 sec window." },
    { code: "ELD Connection Lost", meaning: "Connect IQ ELD app lost auth or Bluetooth to ELD device", fix: "Open Connect IQ ELD app → Sign Out → Sign In. Re-pair Bluetooth to ELD hardware (KeepTruckin, Geotab, Samsara)." },
    { code: "Truck Route Recalculating", meaning: "Truck-restricted route blocked — height/weight conflict ahead", fix: "Normal — Dezl re-routing to avoid restriction. If stuck, verify truck profile dimensions match your actual rig." },
  ],
  updateSteps: [
    { step: 1, title: "Remove Dezl from cab, bring inside", detail: "Cradle USB only passes power, not data. Remove unit, bring to PC. Use original Garmin USB cable.", warnings: "Dont update Dezl on truck battery alone — voltage drop during diesel start interrupts update." },
    { step: 2, title: "Charge to 100% before updating", detail: "Dezl internal battery degrades from cab heat exposure. Below 70% may reboot mid-update. Wall charge 30 min first." },
    { step: 3, title: "Open Garmin Express on PC, sign in", detail: "Express auto-detects Dezl. Sign in with same account that purchased the truck maps — license tied to account ID." },
    { step: 4, title: "Free up storage if updating maps", detail: "Truck map (City Navigator + Truck POIs) is 14-18 GB. Dezl OTR series has 32 GB internal — usually fine. Older Dezl 580/780 has 16 GB — uninstall old map first." },
    { step: 5, title: "Install firmware FIRST, then maps", detail: "Always firmware before maps. Truck POI database depends on firmware version. Map install on old firmware sometimes excludes weigh stations or fuel stops." },
    { step: 6, title: "Verify truck profile after update", detail: "Settings → Truck Profile → confirm height, weight, length, and any specialized settings (hazmat, propane, etc.) didnt reset to defaults." },
    { step: 7, title: "Re-pair backup camera (BC30/BC40) if applicable", detail: "Camera pairings often drop after firmware. Settings → Wireless Cameras → Pair. Power-cycle camera, pair within 30 sec window." },
    { step: 8, title: "Reinstall on truck, test before driving", detail: "Mount, key on, verify GPS lock + ELD app + truck routing. Plan a 1-mile test route to confirm truck-restricted routing works." },
  ],
  realTimeIssues: [
    { trigger: "After firmware 7.x (OTR series)", symptom: "ELD compliance app crashes on launch", ourFix: "Known regression. Workaround: uninstall ELD app from Connect IQ Store, reinstall fresh. Sign back in. Or downgrade firmware (we keep archives)." },
    { trigger: "After moving to new state", symptom: "Truck-restricted routing not honoring local rules", ourFix: "State-specific truck restrictions update with map data. Run map update via Garmin Express to refresh restrictions database." },
    { trigger: "After cab radio installation", symptom: "GPS signal weak or intermittent", ourFix: "Aftermarket radios sometimes interfere with GPS antenna. Check antenna placement. External GPS antenna ($45 Garmin GA-25) usually solves it." },
    { trigger: "After Smartphone Link app deprecation", symptom: "Live traffic and weather not showing on Dezl", ourFix: "Smartphone Link discontinued. Install Garmin Drive app instead. Pair Dezl to phone via Bluetooth, enable live traffic in Drive app." },
  ],
  faqs: [
    { q: "How often do I need to update Dezl truck maps?", a: "Owner-operators should update at least quarterly — truck restrictions, weight limits, and parking changes weekly. Fleet managers updating multiple Dezls should set a calendar reminder for the 1st of each quarter. Dezl with lifetime maps (LM suffix) get updates free; without LM suffix, North America truck map update costs $89/year direct from Garmin." },
    { q: "Why is my Dezl routing me through residential roads?", a: "Truck profile not active or dimensions wrong. Settings → Truck Profile → Active Profile → verify height (typically 13ft 6in for tractor-trailer), length (53ft typical), weight (80,000 GVW typical), hazmat if applicable. Without these, Dezl routes like a car. Some users also enable Avoid Tolls which paradoxically routes through residential streets — disable that if so." },
    { q: "Can I use Dezl for ELD compliance?", a: "Dezl OTR700/800/1000 supports Connect IQ ELD apps from major providers: KeepTruckin/Motive, Geotab, Samsara, Omnitracs. Install via Connect IQ Store on Dezl, pair Bluetooth with your ELD hardware, sign in to your fleet account. Dezl displays HOS clock, current duty status, and DVIR forms. Older Dezl 580/780 may not support all ELD apps." },
    { q: "How do I pair the BC30 backup camera with Dezl?", a: "Settings → Wireless Cameras → Pair Camera. Power-cycle the BC30 (unplug 12V, replug). Pair window opens 30 seconds. Dezl detects BC30 — tap to confirm. Mount camera + Dezl shows live feed. If pairing fails: ensure BC30 is wireless model (BC30 Wireless), not wired BC20. BC40 (newer) pairs same process." },
    { q: "Why is Dezl GPS slow after long-haul time off?", a: "Almanac data goes stale after 7+ days idle. When you fire up Dezl after a 14-day home break, GPS searches sky for satellites that have moved. Cold-start procedure: in open Walmart/truck-stop parking lot, power Dezl, set on dash flat, wait 10-15 minutes for full almanac re-download. After first lock, future locks take 30-60 seconds." },
    { q: "Does Dezl work in Canada?", a: "Yes. Dezl OTR series ships with North America map data including all Canadian provinces. Truck restrictions in Canada (low bridges, weigh scales, weight limits) are in the database. Customs preparation: Dezl has built-in border crossing alerts and prep checklists. Set Truck Profile to match your rig + Crossing Type for Canadian customs." },
    { q: "Will Trini System update my Dezl remotely?", a: "Yes. Bring Dezl inside out of the cab, connect to your PC via USB cable. We connect via secure remote session, run firmware + truck map update + ELD app verification + camera re-pair via Garmin Express. Average time: 90 minutes for full update. $49 flat. Call 347-953-1531." },
  ],
  cableType: "USB-A to USB-C (Dezl OTR series) or USB-A to micro-USB (Dezl 580, 780)",
  expressCompatible: true,
  estimatedFixCost: "$49 flat — firmware + truck map + ELD app + BC camera re-pair",
  bgGradient: "linear-gradient(135deg, #2c1502 0%, #4a2308 40%, #6e3814 100%)",
  accentColor: "amber",
  metaTitle: "Garmin Dezl Update — OTR700, OTR800, OTR1000",
  metaDescription:
    "Update Garmin Dezl OTR700, OTR800, OTR1000, 580, 780 truck GPS. Fix routing, ELD, BC30 camera. From $49. Call 347-953-1531.",
  primaryKeywords: [
    "garmin dezl update", "dezl otr700 update", "dezl otr800 firmware", "dezl otr1000 map",
    "dezl truck routing", "dezl eld app", "garmin truck gps update",
    "dezl 580 update", "dezl 780 firmware", "garmin trucker gps", "dezl backup camera",
    "dezl bc30 pair", "trucker gps update",
  ],
};

// Registry exported below after all entries

export const GARMIN_SERIES: Record<string, GarminSeries> = {
  [drivesmart.slug]: drivesmart,
  [forerunner.slug]: forerunner,
  [fenix.slug]: fenix,
  [zumo.slug]: zumo,
  [etrex.slug]: etrex,
  [venu.slug]: venu,
  [dezl.slug]: dezl,
};

export const GARMIN_PROBLEMS: Record<string, GarminProblemPage> = {
  [expressNotWorking.slug]: expressNotWorking,
  [wontAcquireSatellites.slug]: wontAcquireSatellites,
  [mapUpdateFailed.slug]: mapUpdateFailed,
  [wifiSyncNotWorking.slug]: wifiSyncNotWorking,
};


// All slugs combined — used by sitemap generator
export const ALL_GARMIN_SLUGS = [
  ...Object.keys(GARMIN_SERIES),
  ...Object.keys(GARMIN_PROBLEMS),
];
