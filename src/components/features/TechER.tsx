"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

export type Category = "printer" | "gps" | "computer" | "virus" | null;
export type BrandFilter = "HP" | "Canon" | "Epson" | "Brother" | undefined;

interface TechERProps {
  initialCategory?: Category;
  brandFilter?: BrandFilter;
  pageTrending?: string[];
}

const BRAND_DATA: Record<string, { name: string; color: string; bg: string; emoji: string; models: string[] }[]> = {
  printer: [
    { name: "HP",      color: "#0096D6", bg: "#e8f4fd", emoji: "🖨️", models: ["DeskJet 4155e","DeskJet 2755e","ENVY 6055e","OfficeJet Pro 9015e","LaserJet M404n"] },
    { name: "Canon",   color: "#CC0000", bg: "#fde8e8", emoji: "🖨️", models: ["PIXMA MX922","PIXMA TR4520","PIXMA MG3620","imageCLASS MF644Cdw"] },
    { name: "Epson",   color: "#007AB8", bg: "#e8f4fb", emoji: "🖨️", models: ["EcoTank ET-2720","EcoTank ET-4760","WorkForce WF-7720"] },
    { name: "Brother", color: "#004B9C", bg: "#e8eef8", emoji: "🖨️", models: ["MFC-L2710DW","HL-L2350DW","DCP-L2550DW"] },
  ],
  gps: [
    { name: "Garmin",   color: "#007CC0", bg: "#e8f4fb", emoji: "🗺️", models: ["DriveSmart 65","DriveSmart 55","nüvi Series","RV 890"] },
    { name: "TomTom",   color: "#E8000F", bg: "#fde8e8", emoji: "🗺️", models: ["GO 520","GO Comfort","START 52","GO 620"] },
    { name: "Magellan", color: "#FF6B00", bg: "#fff3e8", emoji: "🗺️", models: ["RoadMate 6630","Maestro 3200","eXplorist"] },
  ],
  computer: [
    { name: "Dell",    color: "#007DB8", bg: "#e8f4fb", emoji: "💻", models: ["Inspiron 15","Latitude E7470","XPS 15","OptiPlex 7080"] },
    { name: "HP",      color: "#0096D6", bg: "#e8f4fd", emoji: "💻", models: ["Pavilion 15","EliteBook 840","Spectre x360","HP Desktop"] },
    { name: "Lenovo",  color: "#E2231A", bg: "#fde8e8", emoji: "💻", models: ["IdeaPad 3","ThinkPad X1","Legion 5","IdeaCentre"] },
    { name: "Gateway", color: "#6B7280", bg: "#f3f4f6", emoji: "💻", models: ["GWTN156","Creator Series","Ultra Slim"] },
  ],
  virus: [
    { name: "Malwarebytes", color: "#00599C", bg: "#e8f0fb", emoji: "🛡️", models: ["Free Scan","Premium","Business"] },
    { name: "CCleaner",     color: "#005C97", bg: "#e8f0fb", emoji: "🧹", models: ["Free","Professional","Business"] },
    { name: "McAfee",       color: "#C0392B", bg: "#fde8e8", emoji: "🛡️", models: ["Total Protection","LiveSafe","AntiVirus Plus"] },
    { name: "Norton",       color: "#FDB71C", bg: "#fef9e8", emoji: "🛡️", models: ["360 Deluxe","AntiVirus Plus","LifeLock"] },
    { name: "Avast",        color: "#FF7900", bg: "#fff3e8", emoji: "🛡️", models: ["Free","Premium","Ultimate"] },
    { name: "AVG",          color: "#0085C7", bg: "#e8f4fb", emoji: "🛡️", models: ["AntiVirus Free","Internet Security","Ultimate"] },
  ],
};

const CAT_META = {
  printer:  { label: "Printer",          emoji: "🖨️", gradient: "from-blue-600 to-blue-800",    accent: "blue" },
  gps:      { label: "GPS",              emoji: "🗺️", gradient: "from-teal-500 to-emerald-700",  accent: "teal" },
  computer: { label: "Computer",         emoji: "💻", gradient: "from-violet-600 to-purple-800", accent: "violet" },
  virus:    { label: "Virus & Security", emoji: "🛡️", gradient: "from-rose-600 to-red-800",      accent: "rose" },
};

type WizardOption = { label: string; emoji: string; next?: string; fixKey?: string };
type WizardStep  = { id: string; question: string; subtitle?: string; options: WizardOption[] };

const WIZARD: Record<string, WizardStep[]> = {
  printer: [
    { id: "issue", question: "What's happening with your printer?", subtitle: "Pick the closest match",
      options: [
        { label: "Printer is Offline",       emoji: "📵", next: "offline_check" },
        { label: "Error Code / Message",     emoji: "❌", next: "error_type" },
        { label: "Not Printing at All",      emoji: "🔇", next: "not_printing" },
        { label: "Poor Print Quality",       emoji: "🌫️", fixKey: "print_quality" },
        { label: "Paper Jam",                emoji: "📄", fixKey: "paper_jam" },
        { label: "Won't Connect to WiFi",    emoji: "📶", fixKey: "hp_offline" },
      ]},
    { id: "offline_check", question: "Is the printer powered on?",
      options: [
        { label: "Yes — lights are on",  emoji: "💡", next: "offline_win" },
        { label: "No lights at all",     emoji: "⚫", fixKey: "power_issue" },
        { label: "Blinking / flashing",  emoji: "🔄", fixKey: "hp_offline" },
      ]},
    { id: "offline_win", question: "What does your computer show?",
      options: [
        { label: "Shows 'Offline'",      emoji: "🚫", fixKey: "hp_offline" },
        { label: "Printer missing",      emoji: "❓", fixKey: "driver_missing" },
        { label: "Job stuck in queue",   emoji: "📥", fixKey: "stuck_queue" },
      ]},
    { id: "error_type", question: "Where is the error shown?",
      options: [
        { label: "On printer screen",    emoji: "📟", next: "error_screen" },
        { label: "On my computer",       emoji: "🖥️", fixKey: "hp_error" },
        { label: "In HP Smart / app",    emoji: "📱", fixKey: "hp_error" },
      ]},
    { id: "error_screen", question: "What does the error say?",
      options: [
        { label: "B200 (Canon)",              emoji: "🔴", fixKey: "canon_b200" },
        { label: "OXc19a0035 (HP)",           emoji: "❌", fixKey: "hp_error" },
        { label: "E04 / E03 (Canon)",         emoji: "🟠", fixKey: "canon_wifi" },
        { label: "Ink system error (Epson)",  emoji: "💧", fixKey: "epson_ink" },
        { label: "Other / Unknown",           emoji: "❓", fixKey: "hp_error" },
      ]},
    { id: "not_printing", question: "When did it last work?",
      options: [
        { label: "After a Windows update",  emoji: "🪟", fixKey: "driver_missing" },
        { label: "After moving / new WiFi", emoji: "🏠", fixKey: "hp_offline" },
        { label: "Never worked",            emoji: "📦", fixKey: "driver_missing" },
        { label: "Just stopped randomly",   emoji: "🎲", fixKey: "stuck_queue" },
      ]},
  ],
  gps: [
    { id: "issue", question: "What's the GPS problem?",
      options: [
        { label: "Maps are outdated",       emoji: "🗺️", next: "map_update" },
        { label: "Won't turn on",           emoji: "⚫", fixKey: "gps_power" },
        { label: "No satellite signal",     emoji: "📡", fixKey: "gps_signal" },
        { label: "Stuck on logo screen",    emoji: "🔄", fixKey: "gps_frozen" },
        { label: "Update error / failed",   emoji: "❌", fixKey: "gps_update_error" },
        { label: "Screen problem",          emoji: "📺", fixKey: "gps_screen" },
      ]},
    { id: "map_update", question: "How would you like to update?",
      options: [
        { label: "Using my computer",       emoji: "💻", fixKey: "gps_pc_update" },
        { label: "Via WiFi on the GPS",     emoji: "📶", fixKey: "gps_wifi_update" },
        { label: "I need Garmin Express help", emoji: "⬇", fixKey: "gps_pc_update" },
      ]},
  ],
  computer: [
    { id: "issue", question: "What's happening with your computer?",
      options: [
        { label: "Running very slow",       emoji: "🐌", next: "slow_check" },
        { label: "Won't start / boot",      emoji: "⚡", fixKey: "pc_wont_start" },
        { label: "Freezing / crashing",     emoji: "❄️", fixKey: "pc_freeze" },
        { label: "Windows 11 problems",     emoji: "🪟", fixKey: "pc_win11" },
        { label: "No internet connection",  emoji: "📶", fixKey: "pc_internet" },
        { label: "Making strange noises",   emoji: "🔊", fixKey: "pc_noise" },
      ]},
    { id: "slow_check", question: "How slow are we talking?",
      options: [
        { label: "Takes 5+ mins to start",  emoji: "⏳", fixKey: "pc_slow_startup" },
        { label: "Programs freeze often",   emoji: "🥶", fixKey: "pc_freeze" },
        { label: "Browser is slow",         emoji: "🌐", fixKey: "pc_browser" },
        { label: "Everything is slow",      emoji: "🐢", fixKey: "pc_slow_startup" },
      ]},
  ],
  virus: [
    { id: "issue", question: "What are you experiencing?",
      options: [
        { label: "Pop-up ads everywhere",   emoji: "💥", fixKey: "adware" },
        { label: "Computer acting strange", emoji: "👻", fixKey: "malware" },
        { label: "I was scammed online",    emoji: "🚨", fixKey: "scam_urgent" },
        { label: "Browser hijacked",        emoji: "🌐", fixKey: "adware" },
        { label: "Antivirus found threats", emoji: "🛡️", fixKey: "malware" },
        { label: "Files locked / encrypted",emoji: "🔐", fixKey: "ransomware" },
      ]},
  ],
};

interface FixGuide { title: string; summary: string; severity: "easy"|"medium"|"urgent"; successRate: number; avgTime: string; steps: { emoji: string; title: string; detail: string }[]; }

const FIXES: Record<string, FixGuide> = {
  hp_offline:      { title: "Printer Offline — WiFi Fix",          summary: "Fixes 94% of offline cases — no new hardware needed.", severity: "easy",   successRate: 94, avgTime: "8 min",
    steps: [
      { emoji: "🔌", title: "Unplug printer from wall",            detail: "Hold the power button 5 sec. Pull the power cord from the wall." },
      { emoji: "📡", title: "Unplug your WiFi router",             detail: "Pull the router power cord. Wait a full 60 seconds." },
      { emoji: "🔁", title: "Restart router FIRST",               detail: "Plug router back in. Wait until all lights stabilise (~60 sec)." },
      { emoji: "🖨️", title: "Power printer back on",              detail: "Plug in and power on your printer. Watch for the wireless light to go solid." },
      { emoji: "🖥️", title: "Remove offline flag in Windows",     detail: "Settings → Bluetooth & Devices → Printers → your printer → Printer menu → uncheck 'Use Printer Offline'." },
      { emoji: "✅", title: "Print a test page",                   detail: "Set as Default → Print Test Page. If it prints — you're done!" },
    ]},
  driver_missing:  { title: "Printer Driver Missing",               summary: "Windows lost the driver after an update. Quick reinstall fixes it.", severity: "medium", successRate: 97, avgTime: "15 min",
    steps: [
      { emoji: "🗑️", title: "Remove old printer entry",           detail: "Settings → Printers → right-click printer → Remove device." },
      { emoji: "🌐", title: "Download official driver",            detail: "HP: 123.hp.com | Canon: usa.canon.com | Epson: epson.com/support | Brother: support.brother.com" },
      { emoji: "🔌", title: "Connect USB cable temporarily",       detail: "Use a USB cable for the install — then switch to WiFi after." },
      { emoji: "▶",  title: "Run the installer",                   detail: "Double-click the downloaded file. Choose 'Wireless' connection when asked." },
      { emoji: "📄", title: "Print test page to confirm",          detail: "Printers & Scanners → your printer → Print test page." },
    ]},
  stuck_queue:     { title: "Stuck Print Job in Queue",             summary: "A ghost job is blocking everything. 2-minute fix.", severity: "easy", successRate: 99, avgTime: "2 min",
    steps: [
      { emoji: "🛑", title: "Stop the Print Spooler",              detail: "Win+R → type 'services.msc' → find Print Spooler → right-click → Stop." },
      { emoji: "📁", title: "Delete the queue folder contents",    detail: "File Explorer → C:\Windows\System32\spool\PRINTERS → delete all files inside (not the folder)." },
      { emoji: "▶",  title: "Restart Print Spooler",               detail: "Services → Print Spooler → right-click → Start." },
      { emoji: "🖨️", title: "Try printing again",                 detail: "Open your document and print. The queue is now clear." },
    ]},
  canon_b200:      { title: "Canon B200 Error",                     summary: "80% of B200 errors are heat-related and fixable — don't buy a new printer yet.", severity: "urgent", successRate: 80, avgTime: "30 min",
    steps: [
      { emoji: "🔌", title: "Full power off + unplug",             detail: "Power off completely. Unplug from wall. Wait 15 minutes for print head to cool." },
      { emoji: "🖨️", title: "Open lid — slide cartridge to center",detail: "Manually slide the ink carrier to the middle position. Close lid slowly." },
      { emoji: "🔄", title: "Power on holding Stop button",        detail: "Hold Stop/Reset while pressing Power. Release both together. This triggers maintenance reset." },
      { emoji: "💻", title: "Run Canon head cleaning 2-3 times",   detail: "Canon My Printer → Maintenance → Head Cleaning → run 2-3 cycles." },
    ]},
  canon_wifi:      { title: "Canon WiFi / Offline Fix",             summary: "Most common after router changes or Windows updates.", severity: "easy", successRate: 95, avgTime: "12 min",
    steps: [
      { emoji: "🔄", title: "Restart printer & router",            detail: "Power both off. Restart router first, wait 60 sec, then power on printer." },
      { emoji: "📱", title: "Use Canon PRINT app",                 detail: "Download 'Canon PRINT Inkjet' on your phone → tap + → it reconnects via Bluetooth automatically." },
      { emoji: "💻", title: "Reinstall driver on PC",              detail: "usa.canon.com/support → your model → download MP Drivers → run → choose Wireless." },
    ]},
  epson_ink:       { title: "Epson Ink System Error",               summary: "Almost always a sensor issue — not real ink problem.", severity: "medium", successRate: 92, avgTime: "15 min",
    steps: [
      { emoji: "🔌", title: "Power cycle (unplug from back)",      detail: "Turn off. Unplug the power cable from the printer itself (not just wall). Wait 60 sec." },
      { emoji: "💻", title: "Run Epson Print & Scan Doctor",       detail: "Download from epson.com/support. Auto-detects and fixes ink sensor errors." },
      { emoji: "🧹", title: "Run Head Cleaning 3 times",           detail: "Epson Utility → Maintenance → Head Cleaning → 3 cycles → Nozzle Check after each." },
    ]},
  hp_error:        { title: "HP Printer Error Code",                summary: "OXc19a0035 and similar codes fixed in 88% of cases remotely.", severity: "medium", successRate: 88, avgTime: "20 min",
    steps: [
      { emoji: "📋", title: "Note the exact error code",           detail: "Photograph the code from the printer screen or HP Smart app." },
      { emoji: "🔌", title: "Full 60-second power cycle",          detail: "Turn printer fully off. Unplug from wall. Wait 60 seconds to clear memory." },
      { emoji: "🖨️", title: "Remove & reseat all cartridges",     detail: "Open cartridge door. Remove all ink. Wait 30 sec. Reinstall firmly until they click." },
      { emoji: "💻", title: "Update printer firmware",             detail: "HP Smart App → your printer → Printer Settings → Printer Updates → Check for Updates." },
    ]},
  print_quality:   { title: "Poor Print Quality Fix",               summary: "Streaks, faded, or blurry prints — fixed with cleaning cycles.", severity: "easy", successRate: 90, avgTime: "10 min",
    steps: [
      { emoji: "🧹", title: "Run print head cleaning",             detail: "HP: HP Smart → Printer Maintenance → Clean Printhead. Epson: Utility → Maintenance → Head Cleaning." },
      { emoji: "📄", title: "Print nozzle check pattern",          detail: "Print a nozzle check to see which colour channels are blocked. Repeat cleaning if needed." },
      { emoji: "🖨️", title: "Shake ink cartridges gently",        detail: "Remove cartridges. Shake gently side to side. Reinstall and try again." },
      { emoji: "💡", title: "Check ink levels",                    detail: "Low ink causes streaks. Check HP Smart / Canon app for actual levels." },
    ]},
  paper_jam:       { title: "Paper Jam Fix",                        summary: "Never pull paper forcefully — follow these steps.", severity: "easy", successRate: 98, avgTime: "3 min",
    steps: [
      { emoji: "🔌", title: "Power OFF printer first",             detail: "Always turn off before clearing a jam to avoid damaging gears." },
      { emoji: "🔍", title: "Check ALL paper paths",               detail: "Look inside the front, rear, and duplexer. Remove any torn scraps." },
      { emoji: "🤲", title: "Pull paper SLOWLY with both hands",   detail: "Grip firmly with both hands. Pull in direction of paper travel — never backward." },
      { emoji: "📄", title: "Reset paper tray",                    detail: "Remove tray completely. Check underneath for scraps. Reload and push firmly." },
      { emoji: "▶",  title: "Power on and test print",             detail: "Power on. Print test page to confirm jam is fully cleared." },
    ]},
  power_issue:     { title: "Printer Won't Power On",               summary: "Usually a power supply or outlet issue.", severity: "medium", successRate: 85, avgTime: "5 min",
    steps: [
      { emoji: "🔌", title: "Try a different wall outlet",         detail: "Plug into a completely different outlet. Surge protectors can fail silently." },
      { emoji: "🔋", title: "Check the power cable",               detail: "Inspect both ends. Wiggle the cable. If loose, replace the cable." },
      { emoji: "🖨️", title: "Hold power button 10 seconds",       detail: "Hold 10 full seconds — this forces a hard reset." },
      { emoji: "📞", title: "If still dead — call us",             detail: "The power board may need replacement. We diagnose remotely. Call 347-953-1531." },
    ]},
  gps_pc_update:   { title: "GPS Map Update via Computer",           summary: "Garmin Express makes map updates easy.", severity: "easy", successRate: 99, avgTime: "45-90 min",
    steps: [
      { emoji: "⬇", title: "Download Garmin Express",             detail: "Visit garmin.com/express. Download and install (it's free)." },
      { emoji: "🔌", title: "Connect GPS via USB cable",           detail: "Use the micro-USB cable that came with your device. Plug into your computer." },
      { emoji: "👤", title: "Sign in to Garmin account",           detail: "Sign in or create a free account. This activates your map subscription." },
      { emoji: "🗺️", title: "Check for available updates",        detail: "Garmin Express shows all available map and software updates." },
      { emoji: "⏳", title: "Download updates (30-90 min)",        detail: "Click Install. Map downloads take 30-90 minutes. Keep device connected." },
      { emoji: "✅", title: "Eject safely when done",              detail: "Click Eject in Garmin Express before unplugging your device." },
    ]},
  gps_wifi_update: { title: "GPS Map Update via WiFi",               summary: "No computer needed — updates directly on the device.", severity: "easy", successRate: 95, avgTime: "60 min",
    steps: [
      { emoji: "📶", title: "Connect GPS to home WiFi",            detail: "Garmin: Settings → Wi-Fi Networks → select your network → enter password." },
      { emoji: "🗺️", title: "Check for map updates",              detail: "Go to myMaps → Check for Updates." },
      { emoji: "⏳", title: "Download updates on the device",      detail: "Tap Install. Keep GPS plugged into power during download (1-2 hours)." },
      { emoji: "✅", title: "Restart GPS when complete",           detail: "Device restarts automatically. Your maps are now current." },
    ]},
  gps_power:       { title: "GPS Won't Turn On",                    summary: "Usually battery or firmware — rarely hardware failure.", severity: "medium", successRate: 88, avgTime: "10 min",
    steps: [
      { emoji: "🔌", title: "Charge for 30 minutes first",         detail: "Connect to car charger or wall adapter. Wait 30 min before pressing power." },
      { emoji: "🔄", title: "Hold power button 20 seconds",        detail: "Hold the power button for a full 20 seconds — forces hard reset." },
      { emoji: "💻", title: "Connect to computer",                 detail: "Connect via USB. If Garmin Express detects it, run a software update." },
      { emoji: "📞", title: "If still unresponsive — call us",     detail: "We diagnose GPS power issues remotely. Call 347-953-1531." },
    ]},
  gps_signal:      { title: "GPS No Satellite Signal",               summary: "Signal loss is almost always software or position — not hardware.", severity: "easy", successRate: 96, avgTime: "5 min",
    steps: [
      { emoji: "🚗", title: "Go outside to open area",             detail: "GPS needs clear sky view. Move away from buildings, trees, or covered areas." },
      { emoji: "⏳", title: "Wait 3-5 minutes",                    detail: "First-time acquisition takes a few minutes. Stay still and be patient." },
      { emoji: "🔄", title: "Restart the GPS device",              detail: "Power off completely. Wait 30 seconds. Power back on." },
      { emoji: "💻", title: "Update GPS software",                 detail: "Use Garmin Express to check for software updates — outdated firmware causes signal issues." },
    ]},
  gps_frozen:      { title: "GPS Frozen on Logo Screen",             summary: "Stuck boot is almost always firmware corruption — fixable.", severity: "medium", successRate: 90, avgTime: "20 min",
    steps: [
      { emoji: "🔄", title: "Force restart (hold 15 seconds)",     detail: "Hold the power button for 15 full seconds. Device should power off." },
      { emoji: "💻", title: "Connect to Garmin Express",           detail: "Connect to your computer via USB. Garmin Express can detect frozen devices." },
      { emoji: "🔧", title: "Install software update",             detail: "If detected, install available software updates. This often unfreezes the device." },
      { emoji: "📞", title: "If undetected — call us",             detail: "We can try recovery mode. Call 347-953-1531." },
    ]},
  gps_update_error:{ title: "GPS Update Error Fix",                  summary: "Update errors are usually connection or storage issues.", severity: "medium", successRate: 92, avgTime: "15 min",
    steps: [
      { emoji: "🔌", title: "Try a different USB cable",           detail: "Data cable issues cause 60% of update errors. Try a known-good cable." },
      { emoji: "💻", title: "Try a different USB port",            detail: "Use a port directly on your computer — not a hub or keyboard port." },
      { emoji: "🔄", title: "Reinstall Garmin Express",            detail: "Uninstall completely. Download fresh from garmin.com/express." },
      { emoji: "🗂️", title: "Check available storage",            detail: "Map updates need 3-8 GB free space. Delete old maps if needed." },
    ]},
  gps_screen:      { title: "GPS Screen Issue",                      summary: "Screen problems are often brightness settings or a soft reset.", severity: "easy", successRate: 80, avgTime: "5 min",
    steps: [
      { emoji: "☀️", title: "Check brightness settings",           detail: "Settings → Display → Brightness. Drag to maximum." },
      { emoji: "🔄", title: "Hard restart the device",             detail: "Hold power button 15 seconds. Power back on." },
      { emoji: "📞", title: "If screen is physically damaged",     detail: "Physical screen damage requires hardware repair. Call us to assess options." },
    ]},
  pc_slow_startup: { title: "Slow PC / Slow Startup Fix",            summary: "TriniCleaner fixes this 98% of the time — free download.", severity: "easy", successRate: 98, avgTime: "5 min",
    steps: [
      { emoji: "⬇", title: "Download TriniCleaner (free)",         detail: "Download from our site. No subscription. No sign-up. Instant download." },
      { emoji: "🔍", title: "Run Full System Scan",                 detail: "Open TriniCleaner → Full Scan. ~45 seconds. Average users find 4-8 GB of junk." },
      { emoji: "🗑️", title: "Click Clean Now",                    detail: "Review results → Clean Now. Removes junk files, temp files, registry errors." },
      { emoji: "🚀", title: "Disable startup programs",            detail: "TriniCleaner → Startup Manager. Disable Teams, OneDrive, Spotify, Adobe." },
      { emoji: "🔄", title: "Restart your PC",                     detail: "Restart and time your boot. Most users see 50-70% improvement immediately." },
    ]},
  pc_freeze:       { title: "PC Freezing & Crashing Fix",            summary: "Usually overheating, RAM, or driver issues — diagnosed remotely.", severity: "medium", successRate: 85, avgTime: "30 min",
    steps: [
      { emoji: "🌡️", title: "Check for overheating",              detail: "Feel the vents. Are they hot? Blocked vents cause freezing. Clean with compressed air." },
      { emoji: "💻", title: "Check for Windows Updates",           detail: "Settings → Windows Update → Check for updates. Pending updates cause freeze issues." },
      { emoji: "🔧", title: "Update all device drivers",           detail: "Device Manager → right-click each yellow item → Update Driver." },
      { emoji: "🛡️", title: "Run Windows Memory Diagnostic",      detail: "Search 'Windows Memory Diagnostic' → Restart now and check for problems." },
    ]},
  pc_wont_start:   { title: "PC Won't Start / Boot Issue",           summary: "Don't panic — most boot failures are software, not hardware.", severity: "urgent", successRate: 82, avgTime: "45 min",
    steps: [
      { emoji: "🔌", title: "Check all power cables",              detail: "Ensure power cable is firmly plugged into both PC and wall. Try different outlet." },
      { emoji: "🔄", title: "Force power off, then on",            detail: "Hold power button 10 seconds to force off. Wait 30 sec. Press power." },
      { emoji: "🖥️", title: "Watch for error messages",           detail: "If you see any text on screen, take a photo. Share it with us." },
      { emoji: "📞", title: "Call us now for remote diagnosis",    detail: "If it starts but doesn't load Windows, we fix it remotely. Call 347-953-1531." },
    ]},
  pc_win11:        { title: "Windows 11 Problems Fix",                summary: "Most Win11 issues are driver or compatibility problems.", severity: "medium", successRate: 91, avgTime: "25 min",
    steps: [
      { emoji: "🪟", title: "Run Windows Update",                  detail: "Settings → Windows Update → Check for Updates. Install ALL available updates." },
      { emoji: "🔧", title: "Update device drivers",               detail: "Device Manager → yellow ! items → right-click → Update Driver." },
      { emoji: "🛠️", title: "Run System File Checker",            detail: "Right-click Start → Windows Terminal (Admin) → type: sfc /scannow → Enter." },
      { emoji: "🔄", title: "Reset problematic apps",              detail: "Settings → Apps → find problem app → Advanced Options → Reset." },
    ]},
  pc_internet:     { title: "No Internet Connection Fix",             summary: "Usually a simple reset fixes connectivity in minutes.", severity: "easy", successRate: 95, avgTime: "8 min",
    steps: [
      { emoji: "🔄", title: "Restart router & modem",              detail: "Unplug both. Wait 60 seconds. Plug modem first, then router." },
      { emoji: "📶", title: "Reconnect to WiFi",                   detail: "Click WiFi icon → forget your network → reconnect and re-enter password." },
      { emoji: "💻", title: "Run Network Troubleshooter",          detail: "Settings → System → Troubleshoot → Internet Connections → Run." },
    ]},
  pc_browser:      { title: "Slow Browser Fix",                       summary: "Browser slowness is almost always extensions or cache.", severity: "easy", successRate: 97, avgTime: "5 min",
    steps: [
      { emoji: "🗑️", title: "Clear browser cache",                detail: "Chrome/Edge: Ctrl+Shift+Delete → All time → Clear data." },
      { emoji: "🔌", title: "Disable all extensions",              detail: "Chrome: Menu → Extensions → turn off ALL. Re-enable one by one." },
      { emoji: "🔄", title: "Reset browser to defaults",           detail: "Chrome: Settings → Reset settings → Restore settings to defaults." },
    ]},
  pc_noise:        { title: "Strange Computer Noises",                summary: "Clicking = hard drive warning. Loud fan = dust. Both fixable.", severity: "medium", successRate: 80, avgTime: "varies",
    steps: [
      { emoji: "🔍", title: "Identify the noise type",             detail: "Clicking/grinding = hard drive (urgent). Whirring/loud = dust. Buzzing = power supply." },
      { emoji: "💨", title: "Clean the vents",                     detail: "Use compressed air to blast dust from all vents. Loud fans = dust buildup." },
      { emoji: "📞", title: "Clicking noise = call us now",        detail: "Clicking inside the PC may signal hard drive failure. Back up data and call 347-953-1531." },
    ]},
  malware:         { title: "Malware / Virus Removal",                summary: "Don't enter passwords until your computer is clean.", severity: "urgent", successRate: 99, avgTime: "45-90 min",
    steps: [
      { emoji: "🚫", title: "Stop all online activity NOW",        detail: "Do NOT enter passwords, banking, or credit card info on this computer." },
      { emoji: "📵", title: "Disconnect from internet",            detail: "Unplug ethernet cable. Turn off WiFi. Stops malware sending your data." },
      { emoji: "📞", title: "Call us immediately",                 detail: "We connect remotely and run full scans with Malwarebytes + Windows Defender." },
      { emoji: "🔍", title: "Full system scan (we do this live)",  detail: "We scan all running processes, startup items, browser extensions, and registry." },
      { emoji: "🧹", title: "Remove all threats",                  detail: "Every virus, spyware, adware, or trojan is quarantined and removed." },
      { emoji: "🔑", title: "Change passwords (from another device)", detail: "After cleaning, change email and banking passwords from your phone or another PC." },
    ]},
  adware:          { title: "Adware / Pop-ups Removal",               summary: "Browser hijacks and pop-ups are usually a rogue extension.", severity: "medium", successRate: 98, avgTime: "20 min",
    steps: [
      { emoji: "🔌", title: "Disable all browser extensions",      detail: "Chrome: Menu → Extensions → turn off ALL." },
      { emoji: "🛡️", title: "Run Malwarebytes Free scan",         detail: "Download from malwarebytes.com. Run a Threat Scan." },
      { emoji: "🔄", title: "Reset browser to defaults",           detail: "Chrome: Settings → Reset settings → Restore to defaults." },
      { emoji: "🗑️", title: "Uninstall unknown programs",         detail: "Settings → Apps → sort by install date. Uninstall anything unfamiliar from recent weeks." },
    ]},
  scam_urgent:     { title: "🚨 URGENT — Tech Support Scam",          summary: "Act fast. Every minute matters when you have been scammed.", severity: "urgent", successRate: 95, avgTime: "60 min",
    steps: [
      { emoji: "🔌", title: "Unplug your internet RIGHT NOW",      detail: "Pull the ethernet cable OR turn off WiFi completely. The scammer may still have access." },
      { emoji: "💳", title: "Call your bank immediately",          detail: "If you paid or gave payment info — call your bank to freeze or reverse the transaction." },
      { emoji: "📞", title: "Call us — scam recovery",             detail: "We remove all scammer software and secure your computer. Call 347-953-1531 immediately." },
      { emoji: "🔑", title: "Change ALL passwords from another device", detail: "From your phone: change your email, banking, and important account passwords NOW." },
      { emoji: "🧹", title: "We remove scammer access tools",      detail: "Scammers install remote access software. We find and remove every trace." },
    ]},
  ransomware:      { title: "🔐 Ransomware — Emergency Help",          summary: "Do NOT pay the ransom. Call us immediately.", severity: "urgent", successRate: 70, avgTime: "varies",
    steps: [
      { emoji: "📵", title: "Disconnect from internet IMMEDIATELY",detail: "Ransomware spreads to other devices. Disconnect WiFi and ethernet cables NOW." },
      { emoji: "🚫", title: "Do NOT pay the ransom",               detail: "Payment rarely restores files and marks you as a target for repeat attacks." },
      { emoji: "📞", title: "Call us NOW — emergency line",        detail: "Call 347-953-1531. We assess the ransomware strain and recovery options." },
      { emoji: "💾", title: "Check your backups",                  detail: "External hard drive? Windows Backup? OneDrive? These may restore your files." },
    ]},
};

// ── Tiny animated category icons ─────────────────────────────
function CatIcon({ cat, active }: { cat: Category; active: boolean }) {
  if (cat === "printer") return (
    <div className="relative w-12 h-10">
      <motion.div animate={active ? {y:[0,-3,0]} : {}} transition={{duration:0.8,repeat:Infinity}}
        className="w-12 h-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded border-2 border-gray-300 flex items-end justify-center pb-0.5">
        <div className="w-8 h-1 bg-gray-400 rounded" />
      </motion.div>
      {active && <motion.div initial={{y:0,opacity:0}} animate={{y:[0,12,12],opacity:[0,1,0]}}
        transition={{duration:1,repeat:Infinity}} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-white border border-gray-200 rounded shadow-sm" />}
    </div>
  );
  if (cat === "gps") return (
    <div className="relative w-10 h-14">
      <div className="w-10 h-14 bg-gray-800 rounded-lg border-2 border-gray-600 flex items-center justify-center shadow-md">
        <span className="text-lg">📍</span>
      </div>
      {active && [0,1].map(i=>(
        <motion.div key={i} animate={{scale:[1,2],opacity:[0.5,0]}} transition={{duration:1.5,repeat:Infinity,delay:i*0.7}}
          className="absolute inset-0 rounded-lg border-2 border-teal-400 pointer-events-none" />
      ))}
    </div>
  );
  if (cat === "computer") return (
    <div className="relative w-16 h-12">
      <div className="w-16 h-10 bg-gray-800 rounded border-2 border-gray-600 flex items-center justify-center overflow-hidden">
        {active ? <motion.div animate={{x:[-30,30]}} transition={{duration:1.2,repeat:Infinity,ease:"linear"}}
          className="w-6 h-1 bg-violet-400 rounded blur-sm" /> : <span className="text-lg">💻</span>}
      </div>
      <div className="w-18 h-1 bg-gray-700 rounded mx-auto mt-0.5" />
    </div>
  );
  if (cat === "virus") return (
    <motion.div animate={active?{scale:[1,1.1,1]}:{}} transition={{duration:0.8,repeat:Infinity}} className="text-4xl">🛡️</motion.div>
  );
  return null;
}

// ── Processing overlay ────────────────────────────────────────
function Processing({ cat, label }: { cat: Category; label: string }) {
  const [f, setF] = useState(0);
  const frames = ["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"];
  useEffect(() => { const t = setInterval(()=>setF(p=>(p+1)%8), 110); return ()=>clearInterval(t); },[]);
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <CatIcon cat={cat} active />
      <div className="flex items-center gap-3">
        <span className="text-2xl font-mono text-blue-500">{frames[f]}</span>
        <p className="text-gray-700 font-semibold text-lg">{label}</p>
      </div>
      <div className="w-56 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div className="h-full bg-blue-500 rounded-full" style={{width:"45%"}} animate={{x:["-100%","220%"]}} transition={{duration:1,repeat:Infinity,ease:"easeInOut"}} />
      </div>
    </div>
  );
}

// ── Lead capture ──────────────────────────────────────────────
function LeadForm({ onSubmit, cat }: { onSubmit:(d:{name:string;email:string;phone:string})=>void; cat: Category }) {
  const [form, setForm] = useState({name:"",email:"",phone:""});
  const [err, setErr] = useState("");
  const meta = cat ? CAT_META[cat] : CAT_META.printer;
  const go = () => {
    if (!form.name.trim()||!form.phone.trim()){setErr("Name and phone are required");return;}
    fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name:form.name,email:form.email,phone:form.phone,issue:`TechER — ${meta.label}`,message:"Lead captured mid-wizard"})
    }).catch(()=>{});
    onSubmit(form);
  };
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-5">
      <div className="text-center mb-2">
        <div className="text-5xl mb-3">👋</div>
        <h3 className="text-2xl font-black text-gray-900">Almost there!</h3>
        <p className="text-gray-500 mt-1 text-sm">Enter your details and we will send your personalised fix guide + have a technician ready if needed</p>
      </div>
      {[
        {k:"name",  label:"Your Name *",     ph:"e.g. Mary Johnson",  type:"text"},
        {k:"phone", label:"Phone Number *",  ph:"(555) 000-0000",     type:"tel"},
        {k:"email", label:"Email (optional)",ph:"you@email.com",      type:"email"},
      ].map(f=>(
        <div key={f.k}>
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 block">{f.label}</label>
          <input value={(form as any)[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} type={f.type} placeholder={f.ph}
            className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none text-base transition-all font-medium" />
        </div>
      ))}
      {err && <p className="text-red-500 text-sm font-semibold">{err}</p>}
      <button onClick={go} className={`w-full py-4 rounded-2xl text-white font-black text-lg bg-gradient-to-r ${meta.gradient} hover:opacity-90 active:scale-[.98] transition-all shadow-lg`}>
        See My Fix Guide →
      </button>
      <p className="text-center text-xs text-gray-400">🔒 No spam. No sharing. Just your fix.</p>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
export function TechER({ initialCategory, brandFilter, pageTrending }: TechERProps) {
  const [cat, setCat]           = useState<Category>(initialCategory??null);
  const [brand, setBrand]       = useState<string|null>(brandFilter??null);
  const [path, setPath]         = useState<string[]>([]);
  const [fixKey, setFixKey]     = useState<string|null>(null);
  const [busy, setBusy]         = useState(false);
  const [busyMsg, setBusyMsg]   = useState("");
  const [showLead, setShowLead] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [userName, setUserName] = useState<string|null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Pick up ?cat= from URL
  useEffect(()=>{
    const p = new URLSearchParams(window.location.search);
    const c = p.get("cat") as Category;
    if(c&&["printer","gps","computer","virus"].includes(c)) setCat(c);
    if(brandFilter) setBrand(brandFilter);
  },[brandFilter]);

  // Scroll tool into view when cat lands
  useEffect(()=>{
    if((cat||initialCategory)&&ref.current) ref.current.scrollIntoView({behavior:"smooth",block:"start"});
  },[cat,initialCategory]);

  const meta   = cat ? CAT_META[cat] : null;
  const steps  = cat ? WIZARD[cat]??[] : [];
  const cur    = path.length>0 ? steps.find(s=>s.id===path[path.length-1]) : steps[0];
  const fix    = fixKey ? FIXES[fixKey] : null;
  const total  = steps.length + (cat?3:0);
  const done   = (path.length+(brand?1:0)+(fixKey?1:0)+(captured?1:0));
  const pct    = Math.min(100, fixKey ? 100 : Math.round((done/Math.max(total,4))*90));

  const run = (msg: string, fn: ()=>void, ms=1100) => {
    setBusy(true); setBusyMsg(msg);
    setTimeout(()=>{ setBusy(false); fn(); }, ms);
  };

  const pickCat  = (c:Category) => run("Identifying device type...", ()=>{setCat(c);setBrand(null);setPath([]);setFixKey(null);setShowLead(false);}, 800);
  const pickBrand= (b:string)   => run(`Checking ${b} issues...`, ()=>setBrand(b), 900);
  const pickOpt  = (opt:WizardOption) => run("Diagnosing your problem...", ()=>{
    if(opt.fixKey){
      if(path.length>=1&&!captured){ setPath(p=>[...p,opt.fixKey!]); setFixKey(opt.fixKey); setShowLead(true); }
      else setFixKey(opt.fixKey);
    } else if(opt.next) {
      setPath(p=>[...p,opt.next!]);
    }
  });

  const handleLead = (d:{name:string;email:string;phone:string}) => {
    run("Preparing your personalised fix guide...", ()=>{ setCaptured(true); setUserName(d.name); setShowLead(false); }, 1400);
  };

  const back = () => {
    if(showLead){setShowLead(false);setFixKey(null);return;}
    if(fixKey&&!captured){setFixKey(null);return;}
    if(path.length>0){setPath(p=>p.slice(0,-1));setFixKey(null);return;}
    if(brand){setBrand(null);return;}
    if(cat){setCat(null);return;}
  };

  const reset = () => { setCat(null);setBrand(null);setPath([]);setFixKey(null);setShowLead(false);setCaptured(false);setUserName(null);setBusy(false); };

  const sevStyle = fix ? {
    easy:   { bar:"bg-emerald-500", chip:"bg-emerald-50 text-emerald-700 border-emerald-200", label:"🟢 Easy Fix",  stripe:"bg-emerald-50 border-emerald-200" },
    medium: { bar:"bg-amber-500",   chip:"bg-amber-50 text-amber-700 border-amber-200",       label:"🟡 Moderate",  stripe:"bg-amber-50 border-amber-200" },
    urgent: { bar:"bg-red-500",     chip:"bg-red-50 text-red-700 border-red-200",             label:"🔴 Urgent",    stripe:"bg-red-50 border-red-200" },
  }[fix.severity] : null;

  return (
    <div ref={ref} className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-blue-200">
            🧠 Interactive Diagnostic Tool
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            What&apos;s the Problem?<span className="block text-gradient"> We&apos;ll Walk You Through the Fix.</span>
          </h2>
          {pageTrending&&pageTrending.length>0&&!cat&&(
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest self-center">🔥 Trending:</span>
              {pageTrending.map(t=>(
                <span key={t} className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">{t}</span>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-hidden">
          {/* Progress */}
          <div className="h-2 bg-gray-100">
            <motion.div className={`h-full rounded-full ${meta?`bg-gradient-to-r ${meta.gradient}`:"bg-blue-500"}`}
              animate={{width:`${pct}%`}} transition={{duration:0.6,ease:"easeOut"}} />
          </div>

          {/* Header strip */}
          {cat && (
            <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-gray-50">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl">{meta!.emoji}</span>
                <span className="font-black text-gray-900 text-sm">{meta!.label}</span>
                {brand&&<span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold">{brand}</span>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-semibold hidden sm:inline">{pct}% complete</span>
                <button onClick={back} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>Back
                </button>
                <button onClick={reset} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Reset</button>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">

              {/* BUSY */}
              {busy && (
                <motion.div key="busy" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <Processing cat={cat} label={busyMsg} />
                </motion.div>
              )}

              {/* STAGE 0 — Category picker */}
              {!busy&&!cat&&(
                <motion.div key="cats" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest text-center mb-2">Step 1 of 5</p>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-8">What type of device?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {(Object.entries(CAT_META) as [NonNullable<Category>, typeof CAT_META[keyof typeof CAT_META]][]).map(([id, c],i)=>(
                      <motion.button key={id} onClick={()=>pickCat(id)}
                        initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
                        whileHover={{y:-3,scale:1.02}} whileTap={{scale:0.97}}
                        className="group flex flex-col items-center gap-3 p-8 rounded-3xl border-2 border-gray-100 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all shadow-soft hover:shadow-md">
                        <span className="text-6xl group-hover:scale-110 transition-transform">{c.emoji}</span>
                        <span className="font-black text-gray-900 text-xl">{c.label}</span>
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-8">
                    Or call: <a href={PHONE_HREF} className="text-blue-600 font-bold hover:underline">{PHONE}</a> — 24/7 · No fix = no fee
                  </p>
                </motion.div>
              )}

              {/* STAGE 1 — Brand picker */}
              {!busy&&cat&&!brand&&!fixKey&&!showLead&&(
                <motion.div key="brands" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}}>
                  <div className="flex justify-center mb-4"><CatIcon cat={cat} active={false} /></div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest text-center mb-1">Step 2 — Select Brand</p>
                  <h3 className="text-2xl font-black text-gray-900 text-center mb-6">
                    {cat==="virus"?"Which security software?":cat==="computer"?"What brand is your computer?":"What brand is your printer?"}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(BRAND_DATA[cat]??[]).map((b,i)=>(
                      <motion.button key={b.name} onClick={()=>pickBrand(b.name)}
                        initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:i*0.06}}
                        whileHover={{y:-3,scale:1.04}} whileTap={{scale:0.97}}
                        className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all shadow-soft hover:shadow-md">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black"
                          style={{background:b.bg,color:b.color}}>{b.emoji}</div>
                        <span className="font-black text-gray-900 text-lg">{b.name}</span>
                        <span className="text-xs text-gray-400 text-center leading-tight">{b.models[0]}</span>
                      </motion.button>
                    ))}
                    <motion.button onClick={()=>pickBrand("Other")} whileHover={{y:-2}} whileTap={{scale:0.97}}
                      className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-dashed border-gray-200 hover:border-gray-400 bg-gray-50 transition-all">
                      <span className="text-4xl">🤷</span>
                      <span className="font-black text-gray-600">Other / Not Sure</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2 — Wizard questions */}
              {!busy&&cat&&brand&&!fixKey&&!showLead&&cur&&(
                <motion.div key={cur.id} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}}>
                  <div className="flex justify-center mb-2"><CatIcon cat={cat} active={false} /></div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest text-center mb-1">Step {path.length+3} · {brand}</p>
                  <h3 className="text-2xl font-black text-gray-900 text-center mb-1">{cur.question}</h3>
                  {cur.subtitle&&<p className="text-gray-500 text-sm text-center mb-6">{cur.subtitle}</p>}
                  {!cur.subtitle&&<div className="mb-6"/>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cur.options.map((opt,i)=>(
                      <motion.button key={opt.label} onClick={()=>pickOpt(opt)}
                        initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
                        whileHover={{scale:1.02,y:-1}} whileTap={{scale:0.98}}
                        className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all text-left group">
                        <span className="text-3xl shrink-0">{opt.emoji}</span>
                        <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors text-base flex-1">{opt.label}</span>
                        <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STAGE 3 — Lead capture */}
              {!busy&&showLead&&!captured&&(
                <motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                  <LeadForm onSubmit={handleLead} cat={cat} />
                </motion.div>
              )}

              {/* STAGE 4 — Fix guide */}
              {!busy&&fix&&(captured||!showLead)&&sevStyle&&(
                <motion.div key="fix" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} exit={{opacity:0}}>
                  <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${sevStyle.chip}`}>{sevStyle.label}</span>
                      <span className="text-xs text-gray-400 font-semibold">{fix.successRate}% success · avg {fix.avgTime}</span>
                    </div>
                    <button onClick={reset} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Start over</button>
                  </div>

                  {userName&&<p className="text-emerald-600 font-semibold text-sm mb-3">✓ Hi {userName}! Your personalised guide is ready.</p>}

                  <div className="flex items-start gap-4 mb-4">
                    <CatIcon cat={cat} active />
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-gray-900">{fix.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{fix.summary}</p>
                    </div>
                  </div>

                  <div className={`rounded-2xl border-2 ${sevStyle.stripe} p-5 mb-5`}>
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-5">📋 Step-by-Step Fix Guide — Follow in Order</p>
                    <ol className="space-y-5">
                      {fix.steps.map((step,i)=>(
                        <motion.li key={i} className="flex items-start gap-4"
                          initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border-2 ${sevStyle.chip}`}>{i+1}</div>
                          <div className="flex-1">
                            <p className="font-black text-gray-900 text-base mb-0.5">{step.emoji} {step.title}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
                            <motion.div initial={{width:0}} animate={{width:"100%"}} transition={{delay:0.6+i*0.1,duration:0.5}}
                              className="h-0.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                              <div className={`h-full ${sevStyle.bar} rounded-full`} />
                            </motion.div>
                          </div>
                        </motion.li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={PHONE_HREF} className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r ${meta!.gradient} text-white font-black py-4 px-6 rounded-2xl shadow-lg hover:opacity-90 transition-all`}>
                      📞 {PHONE} — Get Live Help
                    </a>
                    <a href={DOWNLOAD_URL} className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-800 font-bold py-4 px-6 rounded-2xl border-2 border-emerald-200 hover:bg-emerald-100 transition-all">
                      ⬇ Free TriniCleaner
                    </a>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-3">No fix = no fee · Remote · All 50 states · Est. 2016</p>

                  <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500 mb-2">Have another problem?</p>
                    <button onClick={reset} className="text-blue-600 font-bold text-sm hover:underline">Start a new diagnosis →</button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
