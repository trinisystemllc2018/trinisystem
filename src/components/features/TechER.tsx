"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════
   TECH ER — AI-Powered Diagnostic Engine
   Used on: /fix  /hp-printer-repair  /epson-printer-repair
            /canon-printer-repair  /reparacion-impresoras
═══════════════════════════════════════════════════════════════ */

export type AnswerMode = "steps" | "handover" | "collaborate";

type Step = {
  icon: string;
  title: string;
  detail: string;
  warn?: string | null;
  ok?: string | null;
};

type TreeNode = {
  q: string;
  yes: number | string;
  no: number | string;
};

type Fix = {
  id: string;
  title: string;
  brand: string;
  brandColor: string;
  brandBg: string;
  severity: "easy" | "medium" | "urgent";
  successRate: number;
  avgTime: string;
  summary: string;
  steps: Step[];
  tree: TreeNode[];
  treeAnswers: Record<string, { text: string; fix: string }>;
  walk: { icon: string; scene: string; narration: string }[];
  tags: string[];
};

/* ───────────────────────────────────────────────────────────────
   KNOWLEDGE BASE
─────────────────────────────────────────────────────────────── */
const FIXES: Fix[] = [
  {
    id: "hp-offline",
    title: "HP Printer Showing Offline",
    brand: "HP", brandColor: "#185FA5", brandBg: "#E6F1FB",
    severity: "easy", successRate: 94, avgTime: "8 min",
    summary: "Your PC lost contact with the printer — usually a stale IP address or driver glitch. This fixes itself 9 out of 10 times without any hardware replacement.",
    tags: ["hp","offline","not printing","hp printer","printer not working","hp support","fix hp"],
    steps: [
      { icon: "🔌", title: "Hard reset both devices", detail: "Power off your HP printer by holding the power button until it fully shuts off (not sleep). Unplug the power cord from the wall for 30 seconds. Do the same with your WiFi router.", ok: "Both devices are fully off and unplugged" },
      { icon: "📶", title: "Restart in the correct order", detail: "Plug in the router first. Wait a full 60 seconds for it to fully restart and assign IP addresses. Then plug in and power on the HP printer.", warn: "Do not skip the 60-second wait — the router needs time to assign a fresh IP to the printer" },
      { icon: "🖥️", title: "Remove the offline flag in Windows", detail: 'Go to Start → Settings → Bluetooth & Devices → Printers & Scanners. Click your HP printer → Open print queue. Click "Printer" in the menu bar → make sure "Use Printer Offline" is NOT checked.', ok: "No checkmark = printer should reconnect automatically" },
      { icon: "🖨️", title: "Set as default and test print", detail: "In Printers & Scanners, click your HP printer → Set as Default. Then click Print a test page.", ok: "Test page prints = you're done! Problem solved." },
      { icon: "⚙️", title: "Still offline? Reinstall the driver", detail: "Visit 123.hp.com and enter your exact model number. Download and run the HP Smart App installer. When it asks, choose Wireless setup. This creates a completely fresh connection.", warn: "Before reinstalling: right-click your printer in Printers & Scanners → Remove device first" },
    ],
    tree: [
      { q: "Is the HP printer powered on and showing lights on the front panel?", yes: 1, no: "A" },
      { q: "Is the wireless light on your printer solid (not blinking)?", yes: 2, no: "B" },
      { q: 'In Windows, is "Use Printer Offline" checked in the Printer menu?', yes: "C", no: 3 },
      { q: "After unchecking offline mode, does a test page print?", yes: "SOLVED", no: "D" },
    ],
    treeAnswers: {
      A: { text: "Power issue", fix: "Check that the power cable is firmly plugged into both the printer and the wall outlet. Try a different outlet. If the printer still won't power on, it may be a blown fuse or power board — call us for a free diagnosis." },
      B: { text: "WiFi not connected", fix: "Press the Wireless button on your HP printer (the antenna icon) and hold it for 3 seconds until the light blinks. Then run the Wireless Setup Wizard from the printer's touchscreen or the HP Smart App on your phone." },
      C: { text: "Offline flag is set", fix: 'Click "Printer" in the menu bar of the print queue window and uncheck "Use Printer Offline." The printer should come back online within 30 seconds.' },
      D: { text: "Driver needs full reinstall", fix: "Remove the printer from Printers & Scanners (right-click → Remove device). Then go to 123.hp.com, download the HP Smart full installer for your model, and choose Wireless during setup." },
    },
    walk: [
      { icon: "🔌", scene: "Unplug everything", narration: "Think of this like rebooting your relationship with the printer. Unplug both the printer AND the router from the wall. Not just power off — physically unplug. Leave them unplugged for 30 seconds while everything resets." },
      { icon: "📡", scene: "Router goes first", narration: "Plug in the router first. Watch the lights — they'll flash and then settle. Wait 60 seconds. This is the step most people skip and then wonder why nothing works. The router needs to assign a fresh IP address." },
      { icon: "🖨️", scene: "Power on the printer", narration: "Now plug in and power on the HP printer. Watch the wireless light on the front panel. It will blink while connecting, then go solid. That solid light means it's reconnected to your WiFi network." },
      { icon: "💻", scene: "Fix Windows", narration: "On your PC: Start → Settings → Bluetooth & Devices → Printers. Find your HP printer, click it, then Open print queue. In that window click Printer at the top and make sure Use Printer Offline has NO checkmark next to it." },
      { icon: "✅", scene: "Print your test page", narration: "Click Print a test page. If it prints — you fixed it yourself! If it still says offline, the driver needs a full reinstall. Visit 123.hp.com and download HP Smart. Or call us — we do this remotely in under 10 minutes." },
    ],
  },
  {
    id: "hp-error-code",
    title: "HP Printer Error Code",
    brand: "HP", brandColor: "#185FA5", brandBg: "#E6F1FB",
    severity: "medium", successRate: 87, avgTime: "12 min",
    summary: "HP error codes like OXc19a0035, 0x83c0000a, 49, 79 sound scary but most are firmware or communication errors — not hardware failures. Note down the exact code and follow these steps.",
    tags: ["hp error","error code","oxc19a0035","0x83","hp 49","hp 79","hp printer error","hp error message"],
    steps: [
      { icon: "📝", title: "Note the exact error code", detail: "Write down the complete error code shown on your HP printer display or computer screen. The exact code (e.g. OXc19a0035 vs 0x83c0000a) determines the fix. Take a photo if easier.", ok: "Error code noted" },
      { icon: "🔄", title: "Power cycle with a long wait", detail: "Turn off the printer and unplug from the wall. Wait 2 full minutes — longer than a normal restart. This clears the printer's memory buffers which often causes these errors.", ok: "Many error codes clear after a proper 2-minute power cycle" },
      { icon: "📥", title: "Update the HP firmware", detail: "On your PC, go to the HP Smart App → your printer → Firmware Update. Or visit support.hp.com, search your model, and download the latest firmware. Run it while the printer is connected via USB.", warn: "Do not interrupt a firmware update — this can brick the printer" },
      { icon: "🖨️", title: "Print from a different program", detail: "Sometimes error codes are caused by a corrupted print job. Open Notepad, type a few words, and print. If this works, the issue is with the original program's print driver.", ok: "Notepad prints = the original app or document was the problem" },
      { icon: "📞", title: "Specific codes need specific fixes", detail: "OXc19a0035 = ink system failure. 49/79 = firmware error. 0x83c0000a = cartridge problem. Each has a targeted fix. Call us with your exact code — we resolve HP error codes remotely every day.", warn: "Don't order replacement parts until you've confirmed the diagnosis with us" },
    ],
    tree: [
      { q: "Does the error code start with 0x or OX?", yes: 1, no: 2 },
      { q: "Is the error code OXc19a0035 specifically?", yes: "A", no: "B" },
      { q: "Is it error 49 or 79?", yes: "C", no: "D" },
    ],
    treeAnswers: {
      A: { text: "Ink system failure", fix: "OXc19a0035 is an ink system error on HP DeskJet/ENVY printers. First: remove all cartridges, check for any packing tape still on them, clean the copper contacts with a dry cloth, reinsert firmly. If that fails, call us — we run a remote ink system reset." },
      B: { text: "Cartridge or driver error", fix: "Most 0x errors are cartridge-related. Remove all ink cartridges, unplug the printer for 2 minutes, reinstall cartridges one at a time. Update drivers from 123.hp.com. If the error persists, call us with the exact code." },
      C: { text: "Firmware error 49/79", fix: "Error 49 and 79 are firmware communication errors. First, print from a different computer to rule out a corrupted print job. If that clears it, the original job was the issue. If the error persists, a firmware update from support.hp.com will fix it." },
      D: { text: "Other HP error", fix: "Every HP error code has a targeted fix. Call us with your exact error code — we have the HP service manual for every model and can tell you in 2 minutes what it means and how to fix it remotely." },
    },
    walk: [
      { icon: "📝", scene: "Capture the code", narration: "Before anything else, write down or photograph the exact error code. OXc19a0035 and 0x83c0000a look similar but have completely different fixes. The exact code is your key to the right solution." },
      { icon: "🔄", scene: "2-minute power cycle", narration: "Unplug the printer from the wall — not just power off. Wait 2 full minutes. This is longer than most people wait and it matters. The printer has capacitors that hold charge and keep error states alive." },
      { icon: "📥", scene: "Firmware update", narration: "Many HP error codes are caused by outdated firmware. Open HP Smart App, find your printer, look for a Firmware Update option. Or go to support.hp.com, search your exact model, and download the latest firmware file." },
      { icon: "🔬", scene: "Isolate the cause", narration: "Try printing a plain test page from the HP Smart App or from Notepad on your PC. If the test page prints fine but your document doesn't, the problem is with that specific document or application — not the printer hardware." },
      { icon: "📞", scene: "Get the right fix", narration: "HP error codes have specific fixes that require the HP service manual. Call us with your exact code — 347-953-1531. We'll tell you in 2 minutes whether it's a DIY fix or needs a remote session. Free diagnosis either way." },
    ],
  },
  {
    id: "epson-ink",
    title: "Epson EcoTank Ink Error",
    brand: "Epson", brandColor: "#0F6E56", brandBg: "#E1F5EE",
    severity: "medium", successRate: 88, avgTime: "12 min",
    summary: "Good news: EcoTank ink errors are almost never caused by actual ink. Even with full tanks the sensor gets confused. This is a calibration issue we reset remotely every single day.",
    tags: ["epson","ink error","ecotank","et-2720","et-4760","et-3850","ink system","epson ink","epson error","epson not printing","epson service"],
    steps: [
      { icon: "🔍", title: "Confirm all tanks are filled", detail: "Check each tank window on your EcoTank physically. All 4 tanks (Black, Cyan, Magenta, Yellow) must be at or above the minimum fill line. If any is below — top it up with genuine Epson ink before continuing.", warn: "Never use third-party ink in EcoTank printers — it permanently damages the sensor and voids warranty" },
      { icon: "🔄", title: "Run Head Cleaning from Epson Utility", detail: "On your PC, search for 'Epson' in Start menu and open the Epson Printer Utility. Click Maintenance → Head Cleaning. Let it run the full 2-minute cycle. Do NOT stop it midway.", ok: "Cleaning complete — move to next step" },
      { icon: "🖨️", title: "Print a Nozzle Check pattern", detail: "After cleaning, click Nozzle Check in the same Epson Utility. A test grid will print. Every row should be complete with no gaps or missing sections.", ok: "Complete grid with no gaps = printhead is clear, error was a sensor ghost" },
      { icon: "⚙️", title: "Reset ink counters if error persists", detail: "Some Epson models need an ink counter reset after a refill. This requires the Epson Adjustment Program which our technicians run remotely. It clears the error permanently in 15 minutes.", warn: "Do not download 'Epson Adjustment Program' from random sites — 90% of them are malware. Call us instead." },
    ],
    tree: [
      { q: "Are all 4 ink tanks visibly filled above the minimum line?", yes: 1, no: "A" },
      { q: "Have you run Head Cleaning from the Epson Utility?", yes: 2, no: "B" },
      { q: "Is the ink error still showing after cleaning?", yes: "C", no: "SOLVED" },
    ],
    treeAnswers: {
      A: { text: "Tanks need refilling", fix: "Top up any tanks below the minimum line using genuine Epson EcoTank ink for your specific model. The sensor is accurate — if it reads low, the ink level really is low. After filling, run a Head Cleaning cycle." },
      B: { text: "Run Head Cleaning first", fix: "Open the Epson Printer Utility on your PC (search 'Epson' in Start). Click Maintenance → Head Cleaning. Let it complete the full cycle, then print a Nozzle Check pattern to confirm the heads are clear." },
      C: { text: "Ink counter reset needed", fix: "The internal ink counter thinks the tank is empty even after refilling. This requires the Epson Adjustment Program to reset — a tool only available to authorized technicians. Call us at 347-953-1531. We run this remotely in 15 minutes." },
    },
    walk: [
      { icon: "🔍", scene: "Check the tanks", narration: "Look at each of the 4 ink tanks through the window on the side of your Epson EcoTank. Black, Cyan, Magenta, Yellow. Each tank has a small minimum fill line marked on it. Every tank must be above that line." },
      { icon: "⚙️", scene: "Open Epson Utility", narration: "Click Start on your PC and type 'Epson.' Open the Epson Printer Utility that appears. Go to the Maintenance tab. Find Head Cleaning and click it. Let the full cycle run without interrupting it — it takes about 2 minutes." },
      { icon: "🖨️", scene: "Print the nozzle check", narration: "After cleaning completes, click Nozzle Check. Your printer will print a small test grid with rows of lines. If every row is complete with no breaks or missing sections, the printhead is clear and your ink error was just a sensor glitch." },
      { icon: "🔁", scene: "Still erroring?", narration: "If the ink error keeps showing with full tanks and a clean head, the internal counter needs a software reset called the Epson Adjustment Program. This is only safe to run from an authorized source. Call us — we do it remotely in 15 minutes for free." },
    ],
  },
  {
    id: "epson-offline",
    title: "Epson Printer Offline or Won't Print",
    brand: "Epson", brandColor: "#0F6E56", brandBg: "#E1F5EE",
    severity: "easy", successRate: 91, avgTime: "10 min",
    summary: "Epson printers going offline after a Windows update or WiFi password change is extremely common. The printer remembers the old network details and needs to be reconnected.",
    tags: ["epson offline","epson won't print","epson not printing","epson wifi","epson repair near me","epson service nyc","epson printer repair new york"],
    steps: [
      { icon: "🔌", title: "Full restart sequence", detail: "Power off the Epson printer completely. Unplug from wall for 60 seconds. Restart your WiFi router too. Then power on the router first, wait 60 seconds, then power on the Epson.", ok: "Both devices restarted fresh" },
      { icon: "📶", title: "Reconnect to WiFi", detail: "On the Epson printer control panel, press the WiFi or Network button. Go to WiFi Setup → WiFi Setup Wizard. Select your network name from the list and enter your WiFi password carefully (it's case-sensitive).", warn: "If your WiFi password recently changed, this is almost certainly the cause" },
      { icon: "🖥️", title: "Remove and re-add in Windows", detail: "Go to Start → Settings → Printers & Scanners. Find your Epson printer → click it → Remove device. Then click Add a printer or scanner and let Windows find the Epson again on the network.", ok: "Epson appears in the list with a green checkmark" },
      { icon: "📲", title: "Use Epson iPrint app as backup", detail: "Download Epson iPrint on your phone. It often finds and connects to the printer faster than Windows. If you can print from your phone, the printer is fine — the issue is the Windows driver." },
    ],
    tree: [
      { q: "Did your WiFi password or router change recently?", yes: "A", no: 1 },
      { q: "Can you print from your phone using Epson iPrint app?", yes: "B", no: 2 },
      { q: "Does the Epson show an error light on the control panel?", yes: "C", no: "D" },
    ],
    treeAnswers: {
      A: { text: "WiFi password changed", fix: "The printer is still trying to connect with the old password. On the Epson control panel: press WiFi/Network → WiFi Setup Wizard → select your network → enter the new password. If the printer has no touchscreen, hold the WiFi button for 3 seconds to reset it." },
      B: { text: "Windows driver issue", fix: "The printer works fine on the network — the problem is Windows lost track of it. Go to Printers & Scanners, remove the Epson, then Add a printer. Windows will find it on your network. Alternatively, reinstall from epson.com/connect." },
      C: { text: "Check error light pattern", fix: "The flashing pattern of lights tells you what's wrong. On most Epson models: 1 flash = paper jam. 2 flashes = ink low. Continuous flash = WiFi error. Call us with the exact flash pattern — 347-953-1531 — and we'll tell you the fix in 60 seconds." },
      D: { text: "Driver reinstall needed", fix: "Visit epson.com/support, search your exact model, and download the full Epson Connect Printer Setup Utility. Run it and follow the wireless setup steps. This reinstalls the driver and reconnects to WiFi in one process." },
    },
    walk: [
      { icon: "🔌", scene: "Full restart", narration: "Unplug your Epson printer and WiFi router from the wall at the same time. Leave both unplugged for 60 seconds. Then plug the router in first, wait 60 seconds for it to fully start, then plug in and power on the Epson." },
      { icon: "📶", scene: "WiFi reconnection", narration: "On your Epson printer's control panel, find the WiFi or Network setup option. Run the WiFi Setup Wizard, choose your home network name from the list, and carefully type your WiFi password. It's case-sensitive — capitals matter." },
      { icon: "💻", scene: "Windows re-adds printer", narration: "On your PC, go to Start → Settings → Printers & Scanners. Remove your Epson printer completely. Then click Add a printer or scanner. Windows will scan the network and find the Epson again — click Add when it appears." },
      { icon: "✅", scene: "Test print", narration: "Print a test page. If it prints — you fixed it. If Windows can't find the Epson on the network, the next step is a full driver reinstall from epson.com/connect. Or call us — Epson WiFi issues are something we fix remotely every day." },
    ],
  },
  {
    id: "canon-b200",
    title: "Canon Printer Error B200",
    brand: "Canon", brandColor: "#A32D2D", brandBg: "#FCEBEB",
    severity: "urgent", successRate: 76, avgTime: "15 min",
    summary: "B200 appears on Canon PIXMA printers (MX922, MG3620, TR4520) and signals a printhead issue. Before you buy a new printer — 76% of B200 errors are overheating and ARE fixable without any parts.",
    tags: ["canon","b200","error b200","canon pixma","canon not printing","canon repair","canon printer repair near me","canon repair new york"],
    steps: [
      { icon: "🔴", title: "Understand what B200 means", detail: "B200 usually appears after heavy printing. The printhead overheats and triggers a safety error. The fix is a proper cool-down sequence — not a simple restart.", warn: "If you try to reset immediately without cooling down, the error will return within seconds" },
      { icon: "❄️", title: "Full cool-down procedure", detail: "Power off the printer and unplug from the wall. Open the printer lid and slide the ink cartridge holder manually to the CENTER of the rail (not all the way to one side). Close the lid. Wait 15 full minutes.", warn: "Do not rush this step — 15 minutes is the minimum for printhead temperature to normalize" },
      { icon: "🔌", title: "Power-on reset sequence", detail: "With the lid open, plug in the printer. Hold the Stop/Reset button (triangle symbol) while pressing the Power button. After 1 second, release Stop/Reset but keep holding Power for 5 seconds, then release Power.", ok: "If B200 clears — print a test page immediately" },
      { icon: "🧹", title: "Clean the electrical contacts", detail: "Remove all ink cartridges. Look at the gold electrical contacts on both the printhead and the cartridge carriage rail. Gently wipe them with a dry lint-free cloth (no water, no alcohol).", warn: "Do not touch the printhead nozzle plate — only clean the gold electrical contacts" },
      { icon: "📞", title: "Still showing B200?", detail: "If B200 persists after all steps, the printhead needs professional cleaning or replacement. Call us before ordering parts — we diagnose remotely whether replacement is truly necessary. Canon MX922 printhead is $25-40 — far cheaper than a new printer." },
    ],
    tree: [
      { q: "Has the printer been printing heavily in the last 60 minutes?", yes: "A", no: 1 },
      { q: "Did you complete the cool-down procedure (lid open, cartridge centered, 15 min)?", yes: 2, no: "B" },
      { q: "Did you try the Stop/Reset + Power button sequence?", yes: 3, no: "C" },
      { q: "Is B200 still showing after ALL steps above?", yes: "D", no: "SOLVED" },
    ],
    treeAnswers: {
      A: { text: "Overheating — cooling required", fix: "Unplug the printer immediately. Open the lid, slide the cartridge holder to center position, leave the lid open. Set a timer for 15 minutes. Do not attempt any reset until the printer has fully cooled. The printhead temperature sensor won't reset while still hot." },
      B: { text: "Complete the cool-down first", fix: "Unplug the printer. Open the lid. Slide the cartridge holder to the center of the rail. Leave the lid open and wait 15 full minutes. Then try: hold Stop/Reset, press Power, release Stop/Reset after 1 second, hold Power for 5 more seconds, then release." },
      C: { text: "Try the button reset sequence", fix: "With lid open and printer plugged in: hold the Stop/Reset button (triangle), then press the Power button while still holding Stop/Reset. After 1 second release Stop/Reset only. Keep holding Power for 5 seconds then release. This forces a hardware state reset." },
      D: { text: "Printhead needs attention", fix: "Call us at 347-953-1531. We'll diagnose remotely whether it's cleanable or needs replacement. Canon MX922 printhead costs $25-40 for parts — we'll tell you honestly whether it's worth replacing vs buying a new printer." },
    },
    walk: [
      { icon: "🔴", scene: "B200 appears", narration: "You're seeing B200 because the printhead overheated and Canon's protection system kicked in. Think of it like a car engine overheating — it doesn't mean the engine is broken, it just needs to cool down before it works again." },
      { icon: "❄️", scene: "Cool-down period", narration: "Unplug the printer completely from the wall. Open the top lid and manually slide the ink cartridge holder to the CENTER of the rail. Leave the lid open so air can circulate. Set a timer for 15 minutes — don't cut it short." },
      { icon: "🔌", scene: "The reset sequence", narration: "After 15 minutes, plug the printer back in with the lid still open. Press and hold the Stop/Reset button (the triangle on the control panel). While holding it, also press Power. After 1 second release Stop/Reset but keep Power held for 5 full seconds. Then release Power." },
      { icon: "🖨️", scene: "Test immediately", narration: "If B200 cleared, print a test page right now while the printer is still warm. If it prints well, your printer is fully recovered — the B200 was just a thermal overload. Avoid doing very large print jobs without letting the printer rest between them." },
      { icon: "📞", scene: "B200 persisting?", narration: "If B200 came back or the test page shows quality problems, the printhead may need professional cleaning or replacement. Call us — 347-953-1531. We've fixed hundreds of Canon B200 errors. In 76% of cases it's fixed without any new parts." },
    ],
  },
  {
    id: "canon-offline",
    title: "Canon Printer Not Printing or Offline",
    brand: "Canon", brandColor: "#A32D2D", brandBg: "#FCEBEB",
    severity: "easy", successRate: 92, avgTime: "9 min",
    summary: "Canon PIXMA printers going offline is the #1 support call we get. It's almost always a WiFi issue or a Windows driver conflict — neither requires any hardware repair.",
    tags: ["canon offline","canon not printing","canon wifi","canon driver","canon printer repair","canon technical support","canon repair near me","canon copier repair"],
    steps: [
      { icon: "🔌", title: "Restart everything in sequence", detail: "Power off the Canon printer completely. Unplug your WiFi router. Wait 60 seconds. Plug in router first, wait 60 seconds, then power on the Canon.", ok: "Network fully reset" },
      { icon: "📶", title: "Run Canon wireless setup", detail: "On the Canon printer touchscreen (or using the buttons): Menu → Network Settings → Wireless LAN Setup → Standard Setup. Follow the steps to reconnect to your home WiFi network.", warn: "Have your WiFi password ready — you'll need to enter it on the printer" },
      { icon: "🔄", title: "Reinstall the driver on Windows", detail: "Go to Start → Settings → Printers & Scanners. Remove your Canon printer. Then visit usa.canon.com/support, search your model, download and run the IJ Network Device Setup Utility. This automatically finds and reconnects the printer.", ok: "Canon printer reappears in Printers & Scanners" },
      { icon: "📱", title: "Use Canon PRINT app on your phone", detail: "Download the Canon PRINT Inkjet app on your iPhone or Android. Open it, let it scan for your printer. If it finds the Canon and you can print from your phone — the issue is only on your Windows PC, not the printer itself." },
    ],
    tree: [
      { q: "Can you print from your phone using the Canon PRINT app?", yes: "A", no: 1 },
      { q: "Does your Canon printer show any error lights or codes?", yes: "B", no: 2 },
      { q: "Did your WiFi network or password change recently?", yes: "C", no: "D" },
    ],
    treeAnswers: {
      A: { text: "Phone works, PC doesn't", fix: "The printer and WiFi network are fine — this is a Windows driver issue. Go to Printers & Scanners, remove the Canon, then go to usa.canon.com/support and download the IJ Network Device Setup Utility for your model. Run it to reinstall the driver." },
      B: { text: "Canon showing an error code", fix: "Canon error codes like E03, E04, 5100 each have specific fixes. Tell us your exact code — call 347-953-1531. We'll tell you the fix in 2 minutes. Don't guess with error codes as the wrong fix can make things worse." },
      C: { text: "WiFi changed", fix: "The Canon printer still has your old WiFi credentials saved. On the printer: Menu → Network Settings → Wireless LAN Setup → Standard Setup. Select your network and enter the new password. Then reinstall the Windows driver from usa.canon.com/support." },
      D: { text: "Full driver reinstall needed", fix: "Visit usa.canon.com/support and search your Canon model. Download the IJ Network Device Setup Utility. This is Canon's official network reconnection tool — it finds the printer on your network and reinstalls everything automatically." },
    },
    walk: [
      { icon: "🔌", scene: "Reset the network", narration: "The most common cause of Canon going offline is a stale network connection. Unplug both the printer and router. Wait 60 seconds. Plug the router in first, let it fully restart (watch the lights settle), then plug in and power on the Canon printer." },
      { icon: "📱", scene: "Test from your phone", narration: "Download the Canon PRINT Inkjet app on your phone. Open it and let it scan your WiFi network for the Canon printer. If your phone finds it and you can print a test — the printer hardware and WiFi are fine. The issue is only on your Windows PC." },
      { icon: "💻", scene: "Fix Windows", narration: "On your PC: Start → Settings → Printers & Scanners → find your Canon → click it → Remove device. This clears the broken connection completely. Then go to usa.canon.com/support and download the IJ Network Device Setup Utility to reinstall fresh." },
      { icon: "✅", scene: "Print and confirm", narration: "After reinstalling, print a test page from Word or Notepad. Canon should now show as Online in Printers & Scanners. If it's still showing offline after a fresh install, call us — this sometimes points to a firewall blocking the printer on your network." },
    ],
  },
  {
    id: "pc-slow",
    title: "Computer Running Slow",
    brand: "Windows", brandColor: "#185FA5", brandBg: "#E6F1FB",
    severity: "easy", successRate: 97, avgTime: "5 min",
    summary: "A slow Windows PC is almost always caused by junk files, too many startup programs, or a full disk — not broken hardware. Our free TriniCleaner fixes this in under 5 minutes.",
    tags: ["slow computer","pc slow","computer slow","windows slow","laptop slow","computer running slow","make computer faster","pc speed","virus","malware"],
    steps: [
      { icon: "⚡", title: "Download TriniCleaner (free)", detail: "Get our free TriniCleaner tool — no subscription, no tricks, no sign-up. 12MB file. Works on Windows 7, 8, 10 and 11. Download it from our website.", ok: "Downloaded and installed" },
      { icon: "🗑️", title: "Run a full junk file scan", detail: "Open TriniCleaner and click Scan Now. It finds temp files, browser cache, Windows update leftovers, broken shortcuts, and recycle bin contents. Average users find 4-8GB of junk slowing their PC.", ok: "Scan complete — click Clean All" },
      { icon: "🚀", title: "Fix startup programs", detail: "In TriniCleaner, click Startup Manager. You'll see every program that launches when Windows starts. Disable anything you don't use daily — especially McAfee or Norton trial software that came pre-installed.", warn: "Keep your active antivirus enabled — only disable programs you don't recognize or don't use" },
      { icon: "🔄", title: "Restart and time it", detail: "After cleaning, do a full restart (not sleep). Time how long it takes from pressing power to reaching the desktop. Most users see 40-60% faster startup after this process.", ok: "Under 2 minutes to desktop = great result. Under 1 minute = excellent!" },
    ],
    tree: [
      { q: "Is the computer slow mainly at startup (takes long to reach desktop)?", yes: "A", no: 1 },
      { q: "Is it slow while using programs (not just startup)?", yes: 2, no: "B" },
      { q: "Is the disk usage showing 90-100% in Task Manager?", yes: "C", no: "D" },
    ],
    treeAnswers: {
      A: { text: "Too many startup programs", fix: "Download TriniCleaner free from our website. Use the Startup Manager to disable programs that launch at startup. McAfee trial, Spotify, OneDrive, and Teams are common culprits that add 2-3 minutes to startup time each." },
      B: { text: "Background process issue", fix: "Press Ctrl+Alt+Delete → Task Manager → More Details. Click the CPU column to sort by usage. If one program is using 80%+ CPU constantly, that's the problem. Tell us the program name — 347-953-1531 — and we'll fix it in minutes." },
      C: { text: "Disk running at 100%", fix: "A disk at 100% usage is either Windows Search indexing (normal, wait 30 min), a failing hard drive (call us immediately), or a background program. In Task Manager under Disk column — which program is using the most? Call us with the answer." },
      D: { text: "RAM or general slowdown", fix: "Download TriniCleaner for a full system cleanup first — junk files alone often cause this. If still slow after cleaning, your computer may need a RAM upgrade or hard drive replacement. Call us for a free remote diagnosis." },
    },
    walk: [
      { icon: "🔍", scene: "Find what's using resources", narration: "Press Ctrl+Shift+Esc to open Task Manager. Click More Details if needed. Look at the CPU, Memory, and Disk columns. If any one program is using 80% or more of those resources, that single program is your problem." },
      { icon: "⚡", scene: "Download TriniCleaner", narration: "Our free TriniCleaner is specifically designed to fix Windows slowdowns without any technical knowledge. Download it from our website, install it like any program (takes 60 seconds), and open it." },
      { icon: "🗑️", scene: "Clean the junk", narration: "Click Scan Now in TriniCleaner. It finds all the hidden clutter Windows never automatically removes — temp files, old browser cache, Windows update remnants. The average user has 4-8 gigabytes of this stuff. Click Clean All." },
      { icon: "🚀", scene: "Fix what starts with Windows", narration: "Click Startup Manager. Every program listed launches automatically when you turn on your computer — whether you use it or not. Toggle off McAfee trial, Spotify, any toolbars, or anything you don't immediately recognize. This alone often cuts startup time in half." },
      { icon: "✅", scene: "Restart and enjoy", narration: "Do a full restart and time it. Most users see a dramatically faster startup. If the computer is still slow after TriniCleaner, call us — it may be a hardware issue like a failing hard drive that needs professional diagnosis. Free call, honest answer." },
    ],
  },
  {
    id: "garmin-update",
    title: "Garmin GPS Map Update",
    brand: "Garmin", brandColor: "#854F0B", brandBg: "#FAEEDA",
    severity: "easy", successRate: 95, avgTime: "25 min",
    summary: "Garmin map updates confuse a lot of people — especially when Garmin Express doesn't recognize the device or the download gets stuck. Follow these exact steps and it will work.",
    tags: ["garmin","gps","map update","garmin express","garmin not updating","gps update","garmin drivesmart","garmin nuvi","garmin rv","garmin support"],
    steps: [
      { icon: "💻", title: "Install Garmin Express (official only)", detail: "On your computer, go to garmin.com/express. Download and install the free Garmin Express software. This is the only official way to update Garmin maps.", warn: "Only download from garmin.com/express — other sites offering 'Garmin updates' are scams" },
      { icon: "🔌", title: "Connect GPS with USB cable", detail: "Use the original USB cable that came with your Garmin. Plug the small end (micro-USB) into the GPS while it's powered ON. Then plug the large end into a USB port on your computer. Garmin Express should detect the device within 30 seconds.", warn: "If not detected: try a different USB port, try a different cable, and make sure the GPS is powered on first" },
      { icon: "📧", title: "Sign in to your Garmin account", detail: "Create a free Garmin account if you don't have one, then sign in to Garmin Express. This links your device to your map license and activates any Lifetime Map updates that came with your GPS.", ok: "Your device and current map version will appear on screen" },
      { icon: "🗺️", title: "Download and install the map update", detail: "Click Add Map Updates or Install All. North America maps are 4-8GB — let the download run completely. Keep your computer on and the GPS connected throughout. Do not let the computer sleep.", warn: "Never disconnect the GPS mid-update — this can corrupt the map files and require a factory reset" },
      { icon: "✅", title: "Eject safely and verify", detail: "When Garmin Express shows 'Update complete,' click the eject button in the software before physically unplugging the cable. Turn on your GPS and go to Settings → About to confirm the new map date.", ok: "New map date visible = update successful!" },
    ],
    tree: [
      { q: "Do you have Garmin Express installed on your computer?", yes: 1, no: "A" },
      { q: "Is your GPS being detected by Garmin Express when plugged in?", yes: 2, no: "B" },
      { q: "Are map updates showing as available (not 'Maps up to date')?", yes: 3, no: "C" },
      { q: "Is the download completing without errors?", yes: "SOLVED", no: "D" },
    ],
    treeAnswers: {
      A: { text: "Install Garmin Express first", fix: "Go to garmin.com/express on your computer and download the free software. Install it, then connect your GPS with the USB cable while it's powered on." },
      B: { text: "GPS not detected", fix: "Try a different USB port (not a USB hub). Make sure the GPS is fully powered on before connecting. Try a different USB cable — the cable is often the issue. If still not detected, call us at 347-953-1531." },
      C: { text: "Maps showing as current", fix: "If maps show 'Up to date,' your GPS actually has the latest maps available for your region. If it's a Lifetime Maps device and it's been over 3 months since your last update, new maps may not be released yet — check back in a few weeks." },
      D: { text: "Download keeps failing", fix: "A failed download usually means insufficient disk space (you need 10GB+ free) or an unstable internet connection. Free up disk space, connect via ethernet instead of WiFi if possible, then restart Garmin Express and try again. Or call us — we do remote Garmin updates." },
    },
    walk: [
      { icon: "💻", scene: "Get Garmin Express", narration: "Go to garmin.com/express on your computer and download the free Garmin Express program. It's about 100MB and takes 2 minutes to install. This is the only official tool for Garmin updates — don't use any third-party update software." },
      { icon: "🔌", scene: "Connect your GPS", narration: "Find the USB cable from the Garmin box — it's a micro-USB (small connector). Power on your GPS first, then connect it to your computer. Open Garmin Express. Your device name and serial number should appear within 30 seconds." },
      { icon: "📧", scene: "Link your account", narration: "Sign in to your Garmin account or create one free at connect.garmin.com. Once signed in, Garmin Express links your device to your map license. If your GPS came with Lifetime Maps, all updates are free once your account is linked." },
      { icon: "🗺️", scene: "Start the update", narration: "Click Add Map Updates or Install All. The download is large — typically 4 to 8 gigabytes. Let it run. Don't disconnect the GPS, don't let your computer sleep, and don't close Garmin Express. It takes 30 to 90 minutes depending on your internet speed." },
      { icon: "✅", scene: "Eject and verify", narration: "When Garmin Express shows the update is complete, click the eject icon next to your device in the software before pulling out the USB cable. Unplug the cable, turn on your GPS, go to Settings then About, and check the new map date. Done!" },
    ],
  },
  {
    id: "internet-slow",
    title: "Internet Running Slow",
    brand: "Network", brandColor: "#534AB7", brandBg: "#EEEDFE",
    severity: "medium", successRate: 82, avgTime: "10 min",
    summary: "Slow internet in 2024 is almost always a router issue, a congested channel, or too many devices — not a problem with your ISP's service. 82% of cases are fixed with a router restart or placement change.",
    tags: ["internet slow","wifi slow","internet not working","slow internet","router problem","wifi problem","internet plans","network slow","buffering"],
    steps: [
      { icon: "📡", title: "Restart your router properly", detail: "Unplug your router and modem from the wall (both devices if you have two). Wait 60 full seconds. Plug in the modem first, wait 30 seconds. Then plug in the router. Wait 2 minutes before testing.", ok: "Router lights settle and stop flashing" },
      { icon: "🔍", title: "Test your actual speed", detail: "Go to fast.com or speedtest.net from a device connected via ethernet cable (not WiFi). This shows your true internet speed. Compare it to what you're paying for. If it's at least 80% of what you pay — your ISP is fine, the WiFi is the issue." },
      { icon: "📶", title: "Improve your WiFi signal", detail: "Move your router to a central, elevated location away from walls, microwaves, and other routers. The further you are from the router — and the more walls between you — the slower your WiFi. The router's position matters more than most people realize.", warn: "Microwaves and cordless phones operate on the same 2.4GHz frequency as older WiFi — keep them 6+ feet apart" },
      { icon: "📱", title: "Reduce connected devices", detail: "Every device using your WiFi splits your bandwidth. If you have 10+ devices connected (phones, tablets, smart TVs, smart speakers), disconnect ones you're not using. Check your router's app to see all connected devices." },
    ],
    tree: [
      { q: "Is the internet slow on ALL devices or just one device?", yes: 1, no: "A" },
      { q: "Have you restarted your router in the last 48 hours?", yes: 2, no: "B" },
      { q: "Is speedtest.net showing less than 50% of your expected speed?", yes: "C", no: "D" },
    ],
    treeAnswers: {
      A: { text: "One device issue", fix: "If only one device is slow, the problem is with that device — not your internet. For a Windows PC: download TriniCleaner to clear browser cache and junk. For a phone: restart it and forget and rejoin the WiFi network. Check if the device has a malware issue." },
      B: { text: "Restart the router first", fix: "Unplug both your router and modem from the wall for 60 seconds. Plug the modem in first, wait 30 seconds, then plug in the router. Wait 2 full minutes before testing. This clears the router's memory and reconnects fresh to your ISP." },
      C: { text: "ISP may be the issue", fix: "If your speed test shows less than half your subscribed speed even on ethernet, call your ISP and report the issue. Before calling, note the speed test result and the time you tested — ISPs respond faster when you have data. We can help you interpret the results too." },
      D: { text: "WiFi vs internet issue", fix: "If ethernet speed is good but WiFi is slow, your router placement or channel congestion is the issue. Move the router to a central location, try changing the WiFi channel in your router settings (channels 1, 6, or 11 are best for 2.4GHz), or consider a WiFi extender." },
    },
    walk: [
      { icon: "🔄", scene: "Restart router first", narration: "Before anything else, unplug your router from the wall — not just press the reset button, actually unplug the power cable. Wait 60 seconds. Then plug it back in and wait 2 full minutes. Router memory builds up over weeks and causes slow speeds." },
      { icon: "🔍", scene: "Test your real speed", narration: "Go to fast.com on your computer and run a speed test while connected via a physical ethernet cable if possible. Write down the result. This is your baseline. Compare it to what your internet plan says you should get." },
      { icon: "📍", scene: "Router placement matters", narration: "Your router broadcasts a sphere of signal. If it's on the floor in a corner, half that sphere is going into the ground and walls. Move it to a central, elevated spot — a shelf or on top of a cabinet. Every wall reduces signal strength by 30-50%." },
      { icon: "📱", scene: "Trim connected devices", narration: "Open your router app (or go to 192.168.1.1 in a browser). Look at connected devices. If you see 15-20 devices, every streaming TV, smart speaker, and phone is competing for bandwidth. Disconnect devices you're not actively using." },
      { icon: "📞", scene: "Still slow?", narration: "If you restarted, tested with ethernet, and moved the router — and internet is still slow — call your ISP and report it. Have your speed test result ready. Or call us at 347-953-1531. We set up home networks and troubleshoot slow internet remotely every day." },
    ],
  },
  {
    id: "router-setup",
    title: "Router Setup or WiFi Not Working",
    brand: "Network", brandColor: "#534AB7", brandBg: "#EEEDFE",
    severity: "medium", successRate: 90, avgTime: "15 min",
    summary: "New router setup and WiFi configuration is one of our most common remote support calls. Whether it's a new router, a forgotten password, or devices that won't connect — we walk you through every step.",
    tags: ["router setup","wifi setup","new router","router not working","wifi password","can't connect to wifi","router problem","internet plans","home network"],
    steps: [
      { icon: "🔌", title: "Connect the hardware", detail: "Connect the router's WAN/Internet port (usually blue or labeled 'Internet') to your modem using an ethernet cable. Connect the router's power. Wait 2 minutes for the router to fully boot — the lights will flash then settle.", ok: "Router shows solid internet/power lights" },
      { icon: "🌐", title: "Access router settings", detail: "On a computer connected to the router via ethernet cable, open any browser and type 192.168.1.1 (or 192.168.0.1) in the address bar. Log in with admin/admin or admin/password — check the sticker on the bottom of your router for the exact credentials.", warn: "Change the default password after logging in — leaving it as 'admin' is a security risk" },
      { icon: "📶", title: "Configure your WiFi name and password", detail: "In the router settings, find Wireless or WiFi settings. Set your Network Name (SSID) to something you'll recognize. Set a strong password — at least 12 characters mixing letters, numbers, and a symbol. Click Save.", ok: "New WiFi name and password saved" },
      { icon: "📱", title: "Connect your devices", detail: "On each phone, tablet, TV, and computer: go to WiFi settings, find your new network name, and enter the password. If a device shows 'Connected but no internet,' restart just that device first." },
    ],
    tree: [
      { q: "Is this a brand new router setup or an existing router with problems?", yes: 1, no: 2 },
      { q: "Is the router showing power and internet lights?", yes: "A", no: "B" },
      { q: "Can you access 192.168.1.1 in a browser on a connected computer?", yes: "C", no: "D" },
    ],
    treeAnswers: {
      A: { text: "Hardware is ready", fix: "Router is powered and connected. Now access the settings: type 192.168.1.1 in your browser while connected to the router via ethernet. Log in with the credentials on the router's sticker. Set up your WiFi name and password in the Wireless section." },
      B: { text: "Hardware connection issue", fix: "Check that the router's WAN/Internet port (blue port) is connected to your modem with an ethernet cable. Make sure both are plugged into wall power. If the internet light is red or off, there's no signal coming from the modem — call your ISP." },
      C: { text: "Access router settings", fix: "You're in the router admin panel. Go to Wireless or WiFi settings. Change the network name (SSID) to something you recognize. Set a password of at least 12 characters. Click Save and Apply. Then connect your devices to the new WiFi name." },
      D: { text: "Can't reach router admin panel", fix: "Try 192.168.0.1 instead. If neither works, check the sticker on the bottom of the router for the correct admin URL — some brands use different addresses. If you still can't access it, the router may need a factory reset. Call us at 347-953-1531." },
    },
    walk: [
      { icon: "🔌", scene: "Connect the hardware", narration: "Take the ethernet cable and connect one end to the blue or Internet-labeled port on your router. Connect the other end to your modem (the box your ISP gave you). Plug in the router power. Watch the lights — they'll flash for about 2 minutes then settle down." },
      { icon: "🌐", scene: "Get into router settings", narration: "Connect a computer to the router with another ethernet cable. Open any web browser — Chrome, Edge, Firefox — and in the address bar type 192.168.1.1 and press Enter. A login page should appear. Check the sticker on the bottom of your router for the username and password." },
      { icon: "📶", scene: "Set up your WiFi", narration: "Inside the router settings, find Wireless Settings or WiFi. You'll see your current network name — change it to something you'll recognize like 'HomeWiFi' or your name. Then set a strong password. Click Save. Your router will restart briefly." },
      { icon: "📱", scene: "Connect all your devices", narration: "Now go to the WiFi settings on each phone, tablet, smart TV, and computer in your home. Find your new network name in the list, tap it, and enter the password you just set. Give each device 30 seconds to connect fully." },
      { icon: "✅", scene: "Test everything", narration: "Open a website on your phone and computer to confirm internet is working. If a device says Connected but no internet — restart just that device. Still having trouble? Call us at 347-953-1531. We set up home networks remotely every day." },
    ],
  },
];

/* ───────────────────────────────────────────────────────────────
   SEARCH MATCHING
─────────────────────────────────────────────────────────────── */
function findFix(q: string): Fix | null {
  q = q.toLowerCase();
  let best: Fix | null = null;
  let bestScore = 0;
  for (const fix of FIXES) {
    const score = fix.tags.filter(t => q.includes(t) || t.includes(q.split(" ")[0])).length;
    if (score > bestScore) { bestScore = score; best = fix; }
  }
  if (bestScore > 0) return best;
  // fuzzy fallback
  for (const fix of FIXES) {
    const words = q.split(" ");
    const hits = words.filter(w => w.length > 2 && fix.tags.some(t => t.includes(w)));
    if (hits.length >= 2) return fix;
  }
  return null;
}

/* ───────────────────────────────────────────────────────────────
   SEND LEAD TO DISCORD (via /api/contact)
─────────────────────────────────────────────────────────────── */
async function sendLead(name: string, phone: string, problem: string) {
  try {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email: "", issue: "Tech ER Lead", message: problem }),
    });
  } catch {}
}

/* ───────────────────────────────────────────────────────────────
   SEVERITY COLORS
─────────────────────────────────────────────────────────────── */
const SEV = {
  easy:   { bg: "bg-emerald-50",  border: "border-emerald-200", text: "text-emerald-700",  label: "Easy fix"  },
  medium: { bg: "bg-amber-50",    border: "border-amber-200",   text: "text-amber-700",    label: "Moderate"  },
  urgent: { bg: "bg-red-50",      border: "border-red-200",     text: "text-red-700",      label: "Urgent"    },
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
interface TechERProps {
  brandFilter?: "HP" | "Epson" | "Canon" | "Spanish";
  pageTrending?: string[];
}

export function TechER({ brandFilter, pageTrending }: TechERProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [fix, setFix] = useState<Fix | null>(null);
  const [noResult, setNoResult] = useState(false);
  const [mode, setMode] = useState<AnswerMode>("steps");
  const [treeStack, setTreeStack] = useState<(number | string)[]>([]);
  const [walkIdx, setWalkIdx] = useState(0);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbSent, setCbSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultTrending = pageTrending ?? [
    "HP printer offline", "Epson ink error", "Canon B200 error",
    "Brother printer Windows 11", "Computer running slow", "Garmin GPS update",
    "Internet slow", "Router setup",
  ];

  const categories = [
    { icon: "🖨️", label: "Printer problem",  query: brandFilter === "HP" ? "HP printer offline" : brandFilter === "Epson" ? "Epson ink error" : brandFilter === "Canon" ? "Canon B200 error" : "HP printer offline" },
    { icon: "💻", label: "Computer problem", query: "computer running slow" },
    { icon: "📺", label: "TV / streaming",   query: "internet slow buffering" },
    { icon: "🌐", label: "Internet plans",   query: "internet running slow" },
    { icon: "📡", label: "Router problem",   query: "router setup wifi not working" },
    { icon: "🎮", label: "Gaming issue",     query: "internet slow gaming lag" },
  ];

  function runSearch(q: string) {
    setQuery(q);
    doSearch(q);
  }

  function doSearch(q: string) {
    if (!q.trim()) return;
    setLoading(true);
    setFix(null);
    setNoResult(false);
    setTreeStack([]);
    setWalkIdx(0);
    setChecked({});
    setMode("steps");
    setTimeout(() => {
      const found = findFix(q);
      if (found) {
        if (brandFilter && found.brand !== brandFilter && brandFilter !== "Spanish") {
          // still show it — user's problem might cross brands
        }
        setFix(found);
      } else {
        setNoResult(true);
      }
      setLoading(false);
    }, 800);
  }

  /* ── STEP BY STEP VIEW ── */
  function StepsView() {
    if (!fix) return null;
    const sev = SEV[fix.severity];
    const allDone = fix.steps.every((_, i) => checked[i]);
    return (
      <div className="space-y-4">
        <div className={`rounded-2xl p-4 ${sev.bg} border ${sev.border} flex items-center gap-3`}>
          <span className={`text-sm font-bold ${sev.text}`}>
            {fix.severity === "easy" ? "✅" : fix.severity === "medium" ? "⚠️" : "🔴"} {sev.label} — {fix.successRate}% success rate · Avg {fix.avgTime}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{fix.summary}</p>
        <div className="space-y-3">
          {fix.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`bg-white rounded-2xl border-2 p-5 transition-all ${checked[i] ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100"}`}
            >
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 ${checked[i] ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                  {checked[i] ? "✓" : i + 1}
                </div>
                <div className="text-xl shrink-0 mt-0.5">{step.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-bold mb-1 ${checked[i] ? "text-emerald-700 line-through" : "text-gray-900"}`}>{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
                  {step.warn && (
                    <div className="mt-2 flex items-start gap-2 bg-amber-50 border-l-2 border-amber-300 rounded-r-xl px-3 py-2">
                      <span className="text-amber-600 text-xs">⚠️</span>
                      <p className="text-amber-700 text-xs">{step.warn}</p>
                    </div>
                  )}
                  {step.ok && (
                    <div className="mt-2 flex items-start gap-2 bg-emerald-50 border-l-2 border-emerald-300 rounded-r-xl px-3 py-2">
                      <span className="text-emerald-600 text-xs">✅</span>
                      <p className="text-emerald-700 text-xs">{step.ok}</p>
                    </div>
                  )}
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input type="checkbox" checked={!!checked[i]}
                      onChange={e => setChecked(prev => ({ ...prev, [i]: e.target.checked }))}
                      className="w-4 h-4 rounded accent-emerald-600 cursor-pointer" />
                    <span className="text-xs text-gray-400">Done</span>
                  </label>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {allDone && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-600 rounded-2xl p-5 text-center">
              <p className="text-white font-black text-lg mb-1">🎉 All steps completed!</p>
              <p className="text-emerald-100 text-sm mb-4">Print a test page to confirm everything works.</p>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl text-sm">
                📞 Still need help? Call {PHONE}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        <CallCTA reason="Step-by-step didn't solve it?" />
      </div>
    );
  }

  /* ── HAND OVER / COLLABORATE VIEW ── */
  function HandoverView() {
    return (
      <div className="space-y-4">
        <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-3">🤝</div>
          <h3 className="font-black text-xl mb-2">Hand It Over — We Fix It</h3>
          <p className="text-blue-100 text-sm mb-4">
            Tell us your name and number. A real technician calls you back in under 5 minutes, connects to your device remotely, and fixes it while you watch — or you can just make a cup of tea and it'll be done.
          </p>
          {!cbSent ? (
            <div className="space-y-3 max-w-sm mx-auto">
              <input value={cbName} onChange={e => setCbName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl text-gray-900 text-sm outline-none" />
              <input value={cbPhone} onChange={e => setCbPhone(e.target.value)}
                placeholder="Your phone number"
                className="w-full px-4 py-3 rounded-xl text-gray-900 text-sm outline-none" />
              <input defaultValue={query}
                placeholder="Describe your problem"
                id="cb-problem"
                className="w-full px-4 py-3 rounded-xl text-gray-900 text-sm outline-none" />
              <button
                onClick={async () => {
                  if (!cbName || !cbPhone) return;
                  const problem = (document.getElementById("cb-problem") as HTMLInputElement)?.value || query;
                  await sendLead(cbName, cbPhone, problem);
                  setCbSent(true);
                }}
                className="w-full bg-white text-blue-700 font-black py-3 rounded-xl text-base hover:bg-blue-50 transition-colors"
              >
                📲 Request callback in 5 minutes
              </button>
              <p className="text-blue-200 text-xs">Free — no fix, no fee. We call YOU.</p>
            </div>
          ) : (
            <div>
              <div className="text-5xl mb-3">📞</div>
              <p className="font-black text-xl mb-1">Callback requested!</p>
              <p className="text-blue-100 text-sm mb-4">We'll call {cbName} at {cbPhone} within 5 minutes.</p>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl text-sm">
                Or call us now: {PHONE}
              </a>
            </div>
          )}
        </div>
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5">
          <h4 className="font-bold text-gray-900 mb-3">What happens when you hand it over:</h4>
          {[
            { icon: "📞", step: "We call you back in under 5 minutes" },
            { icon: "🖥️", step: "We connect to your computer/printer remotely (you give us permission)" },
            { icon: "🔧", step: "We fix the problem while you watch — or you can step away" },
            { icon: "✅", step: "We confirm it's fixed before we disconnect" },
            { icon: "💰", step: "No fix = no fee. You only pay if we solve it." },
          ].map(item => (
            <div key={item.step} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm text-gray-700">{item.step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function CollaborateView() {
    const currentNodeIdx = treeStack.filter(x => typeof x === "number").length;
    const node = fix?.tree[currentNodeIdx < (fix?.tree.length ?? 0) ? currentNodeIdx : (fix?.tree.length ?? 1) - 1];

    if (!fix || !node) return null;

    const isAnswerCode = typeof node.yes === "string" && node.yes !== "SOLVED";

    function answer(yes: boolean) {
      if (!fix || !node) return;
      const next = yes ? node.yes : node.no;
      setTreeStack(prev => [...prev, yes ? "yes" : "no"]);
      if (next === "SOLVED") {
        setTreeStack(prev => [...prev, "SOLVED"]);
      } else if (typeof next === "string") {
        setTreeStack(prev => [...prev, next]);
      }
    }

    const lastItem = treeStack[treeStack.length - 1];
    const isSolved = lastItem === "SOLVED";
    const answerCode = typeof lastItem === "string" && lastItem !== "SOLVED" && lastItem !== "yes" && lastItem !== "no" ? lastItem : null;
    const answerData = answerCode ? fix.treeAnswers[answerCode] : null;

    return (
      <div className="space-y-4">
        <div className="bg-white border-2 border-purple-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-purple-600 text-sm font-bold">🔬 We diagnose together</span>
          </div>

          {treeStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {treeStack.filter(x => x === "yes" || x === "no").map((ans, i) => (
                <span key={i} className={`text-xs px-3 py-1 rounded-full font-medium ${ans === "yes" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                  Q{i + 1}: {ans === "yes" ? "Yes ✓" : "No ✗"}
                </span>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {isSolved ? (
              <motion.div key="solved" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-4">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="font-black text-gray-900 text-lg mb-2">Problem identified and solved!</h3>
                <p className="text-gray-600 text-sm mb-4">Print a test page to confirm. Need further help?</p>
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl">
                  📞 Call {PHONE}
                </a>
              </motion.div>
            ) : answerData ? (
              <motion.div key="answer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Diagnosis: {answerData.text}</span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-2">Your fix:</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{answerData.fix}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button onClick={() => setTreeStack(prev => prev.slice(0, -2))}
                    className="text-sm text-gray-500 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                    ← Back
                  </button>
                  <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2 rounded-xl text-sm">
                    📞 Get help: {PHONE}
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div key={currentNodeIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <p className="text-xs text-gray-400 mb-1 font-medium">Question {currentNodeIdx + 1} of {fix.tree.length}</p>
                <h3 className="font-bold text-gray-900 text-base mb-4">{node.q}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => answer(true)}
                    className="py-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-base hover:bg-emerald-100 transition-colors">
                    ✅ Yes
                  </button>
                  <button onClick={() => answer(false)}
                    className="py-4 rounded-2xl border-2 border-red-200 bg-red-50 text-red-700 font-bold text-base hover:bg-red-100 transition-colors">
                    ✗ No
                  </button>
                </div>
                {treeStack.length > 0 && (
                  <button onClick={() => setTreeStack(prev => prev.slice(0, -2))}
                    className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    ← Previous question
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <CallCTA reason="Want us to just fix it for you?" />
      </div>
    );
  }

  /* ── WALKTHROUGH VIEW ── */
  function WalkthroughView() {
    if (!fix) return null;
    const scene = fix.walk[walkIdx];
    return (
      <div className="space-y-4">
        <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center min-h-[160px] flex flex-col items-center justify-center gap-3">
            <motion.div key={walkIdx}
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="text-6xl">{scene.icon}
            </motion.div>
            <motion.p key={`label-${walkIdx}`}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="text-white font-bold text-base">
              Step {walkIdx + 1} of {fix.walk.length}: {scene.scene}
            </motion.p>
          </div>
          <div className="p-5">
            <motion.p key={`narration-${walkIdx}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-gray-700 text-sm leading-relaxed mb-5">
              {scene.narration}
            </motion.p>
            <div className="flex items-center gap-3">
              <button onClick={() => setWalkIdx(i => Math.max(0, i - 1))} disabled={walkIdx === 0}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <div className="flex gap-1.5 flex-1 justify-center">
                {fix.walk.map((_, i) => (
                  <div key={i} onClick={() => setWalkIdx(i)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all ${i === walkIdx ? "bg-blue-600 w-6" : "bg-gray-200 w-3"}`} />
                ))}
              </div>
              {walkIdx < fix.walk.length - 1 ? (
                <button onClick={() => setWalkIdx(i => i + 1)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors">
                  Next →
                </button>
              ) : (
                <a href={PHONE_HREF}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors">
                  📞 Done / Need help
                </a>
              )}
            </div>
          </div>
        </div>
        <CallCTA reason="Want us to walk you through it live?" />
      </div>
    );
  }

  /* ── CALL CTA STRIP ── */
  function CallCTA({ reason }: { reason: string }) {
    return (
      <div className="flex items-center justify-between gap-4 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 flex-wrap">
        <div>
          <p className="font-bold text-gray-900 text-sm">{reason}</p>
          <p className="text-xs text-gray-500">Free diagnosis · 8 years experience · No fix = no fee</p>
        </div>
        <a href={PHONE_HREF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors whitespace-nowrap">
          📞 {PHONE}
        </a>
      </div>
    );
  }

  /* ── NO RESULT ── */
  function NoResult() {
    return (
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center space-y-4">
        <div className="text-5xl">🔍</div>
        <h3 className="font-black text-gray-900 text-lg">We didn't auto-match that</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
          Our technicians know every printer, PC, GPS, TV and router issue. Call us or leave your number — free diagnosis, no fix = no fee.
        </p>
        <a href={PHONE_HREF}
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-blue-700 transition-colors">
          📞 Call {PHONE} — Free Diagnosis
        </a>
        {!cbSent ? (
          <div className="space-y-3 max-w-xs mx-auto pt-2">
            <p className="text-xs text-gray-400 font-medium">Or request a callback:</p>
            <input value={cbName} onChange={e => setCbName(e.target.value)} placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400" />
            <input value={cbPhone} onChange={e => setCbPhone(e.target.value)} placeholder="Your phone number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400" />
            <button
              onClick={async () => {
                if (!cbName || !cbPhone) return;
                await sendLead(cbName, cbPhone, query);
                setCbSent(true);
              }}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors">
              Request callback in 5 min
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <p className="text-emerald-700 font-bold">✅ Callback requested!</p>
            <p className="text-emerald-600 text-sm">We'll call {cbName} at {cbPhone} in under 5 minutes.</p>
          </div>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* ── HERO ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Technician available now
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Do you have a<br />
            <span className="text-blue-600">tech problem?</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Computer · Printer · TV · Internet · Router · Gaming — write it in the search box. We have <strong>3 options</strong> for you:
          </p>

          {/* 3 mode pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {[
              { id: "steps" as AnswerMode,     icon: "📋", label: "Step-by-step solution",         sub: "Do it yourself" },
              { id: "handover" as AnswerMode,  icon: "🤝", label: "Hand over — sit back & relax", sub: "We fix it for you" },
              { id: "collaborate" as AnswerMode, icon: "🔬", label: "Work with us to resolve it", sub: "Diagnose together" },
            ].map(m => (
              <button key={m.id} onClick={() => { setMode(m.id); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 text-sm font-bold transition-all ${mode === m.id ? "border-blue-600 bg-blue-600 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"}`}>
                <span>{m.icon}</span>
                <div className="text-left">
                  <div>{m.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── CATEGORY BUTTONS ── */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
          {categories.map(cat => (
            <button key={cat.label} onClick={() => runSearch(cat.query)}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group text-center">
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-700 transition-colors leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ── SEARCH BAR ── */}
        <div className="relative mb-5">
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && doSearch(query)}
            placeholder="Type your problem here... e.g. HP printer offline, computer slow, WiFi not working"
            className="w-full text-base md:text-lg px-6 py-5 pr-16 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none bg-white transition-all shadow-sm"
          />
          <button onClick={() => doSearch(query)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors">
            →
          </button>
        </div>

        {/* Trending chips */}
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <span className="text-xs text-gray-400 font-medium">Popular:</span>
          {defaultTrending.map(t => (
            <button key={t} onClick={() => runSearch(t)}
              className="text-xs px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-700 border border-transparent hover:border-blue-200 transition-all font-medium">
              {t}
            </button>
          ))}
        </div>

        {/* ── LOADING ── */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-12">
              <div className="flex justify-center gap-2 mb-4">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <p className="text-gray-500 text-sm">Searching fix database...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RESULT HEADER ── */}
        <AnimatePresence>
          {fix && !loading && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              {/* Mode switcher */}
              <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-2xl">
                {[
                  { id: "steps" as AnswerMode,       icon: "📋", label: "Step-by-step" },
                  { id: "handover" as AnswerMode,    icon: "🤝", label: "Hand it over" },
                  { id: "collaborate" as AnswerMode, icon: "🔬", label: "Work with us" },
                ].map(m => (
                  <button key={m.id} onClick={() => { setMode(m.id); if (m.id === "collaborate") { setTreeStack([]); } }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === m.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                    {m.icon} <span className="hidden sm:inline">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Fix title */}
              <div className="flex items-center gap-3 mb-5">
                <div className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: fix.brandBg, color: fix.brandColor }}>
                  {fix.brand}
                </div>
                <h2 className="font-black text-gray-900 text-xl">{fix.title}</h2>
              </div>

              {/* Mode content */}
              {mode === "steps"       && <StepsView />}
              {mode === "handover"    && <HandoverView />}
              {mode === "collaborate" && <CollaborateView />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── NO RESULT ── */}
        <AnimatePresence>
          {noResult && !loading && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><NoResult /></motion.div>}
        </AnimatePresence>

        {/* ── BOTTOM CTA (always visible) ── */}
        {!fix && !noResult && !loading && (
          <div className="mt-8 bg-white border-2 border-gray-100 rounded-3xl p-6 text-center">
            <p className="text-2xl mb-3">📞</p>
            <h3 className="font-black text-gray-900 mb-1">Prefer to just call us?</h3>
            <p className="text-gray-500 text-sm mb-4">8 years · 5,000+ devices fixed · All 50 states · No fix = no fee</p>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg px-8 py-4 rounded-2xl transition-colors">
              📞 {PHONE}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
