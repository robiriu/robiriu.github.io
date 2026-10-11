# Face-Attendance Android App and Outlet Kiosk (Flutter)

**Status:** Ongoing | In daily production use since October 2026 as the company's attendance clock, distributed outside the Play Store

## Executive Summary

One Flutter codebase that ships as **two different products**:

- an **employee phone app**, covering face attendance inside a geofence, plus schedule, leave, overtime, corrections, notifications, personal data requests, claims, issue reporting and payslips;
- the **same binary in kiosk mode on an outlet tablet**, a shared clock-in station with no login and no session. It is locked down like an appliance, so a whole crew clocks by face on a device nobody owns.

It is built for kitchens and store floors rather than for a demo: bad signal is expected and queued, a tablet mid-service is never forced to update, no biometric computation happens on the device, and nothing the app claims about liveness is trusted by the server. Since going live, dozens of employees clock in on it every day.

This is the employee-facing half of the [HR & Face-Attendance Platform](hr-attendance-platform.md), which covers the backend, the HR dashboard and the compliance model.

---

## Key Results

| Metric | Value |
|--------|-------|
| Production use | Attendance clock of record since October 2026, used daily on outlet tablets |
| Codebase | ~7,600 lines of Dart plus a small native Kotlin layer for the kiosk lock |
| Releases | Over 35 builds shipped over the air in the first month, from 0.2.5 to 0.2.41 |
| Phone screens | sign-in and activation, home, clock in/out, enrollment, history, corrections, schedule, leave, overtime, notifications, my data, claims, issue reporting, team requests, payslip, profile |
| Kiosk screens | pairing, home clock, clock in/out, site enrollment, screensaver |
| Liveness | server-issued challenge, 3-frame burst, server-tuned coaching limits, verified server-side |
| Offline | file-backed clock queue, replayed in order with the original client timestamp |
| Distribution | self-update from a published manifest, one build per CPU architecture, silent install on kiosk tablets |

---

## The Phone App

*The app is internal to the company, so this page describes it without screenshots.*

The home screen answers the only question a crew member has at the start of a shift: am I clocked in, what shift am I on, and is my face enrolled yet. Everything else sits behind the tab bar as their own copy of their record:

- attendance history with a date picker, and corrections started from the day in question;
- schedule, leave and overtime requests, with a notification when HR decides;
- announcements, incident notes and signed warning letters;
- requests to change personal data, which go to an HR queue rather than straight into the record;
- payslips and an activity feed.

**Sign-in that costs nothing per login.** HR issues activation codes in bulk. An employee activates once, sets a six-digit PIN, and from then on signs in with their NIK and that PIN. No code is sent per login, so there is no per-message cost, and people without a phone number or email can still use the app. The account is **bound to the device** through a stable per-install fingerprint kept in secure storage. A released phone can be claimed by the next person, and re-binding is an explicit HR action, never something the app does quietly.

**Phone clocking is a permission, not a default.** Most staff clock on the outlet tablet. HR enables phone clocking per person, and the server enforces it, including for offline clocks queued before the permission changed.

---

## How a Clock-In Actually Works on the Device

The device is treated as hostile, because an attendance record is a payroll input.

**1. The server issues the challenge.** The app asks for a liveness challenge and gets back what this attempt must prove, how many frames to send, and the **coaching limits** to apply: the acceptable head angle and face distance. Because the limits come from the server, tightening or loosening them is a configuration change, not an APK release. The app also announces what it can coach (`can=straight`), so the server never asks an older build for a mode it does not know.

**2. The app coaches, ML Kit measures.** Google ML Kit face detection runs on the camera stream, and a small state machine walks the user through the capture. It retakes a frame that falls outside the limits and coaches the person to move closer or further away. Its job is to help the person succeed, not to decide anything.

**3. A three-frame burst goes up, not a single photo.** The server checks replay hashes so a burst captured once cannot be sent twice, scores texture, requires every frame to identify the same person, and only then compares the face against the enrolled templates. The comment in the app's own liveness module says it plainly: nothing the app claims about liveness is trusted any more.

**4. Location and device metadata ride along.** A GPS fix with its accuracy, the mock-location flag, the device fingerprint and the client timestamp are all part of the submission, and the backend decides the geofence verdict.

**No embedding is ever computed on the phone.** The face template lives only on the server, encrypted. That is what let thresholds, liveness mode and adaptive templates all change after go-live without a single forced update, and it keeps biometric data out of an APK that anyone can pull off a device.

### Making it fast on real tablets

The first tablet clocks took about a minute. Server inference for the whole burst was only 0.9 seconds, so the time was being lost on the device. Three causes, all fixed in the app:

- a frontal-pose gate that a wall- or counter-mounted tablet's viewing angle could never satisfy;
- head-turn measured against an absolute pose instead of the person's own neutral pose, which is how the server measures it;
- a hard-coded 270-degree frame rotation that was correct on phones and wrong on tablets.

A faster straight-on capture mode, about three times quicker, was then added for the shift-change rush. The server picks the mode.

---

## Offline Is the Normal Case

Kitchens and back-of-house corridors do not have signal, so an offline clock is a first-class path rather than an error state.

A clock captured without connectivity is written to a **file-backed queue**: the photo alongside a JSON record carrying the event type, coordinates, accuracy, mock-location flag, device fingerprint and the original client timestamp. On reconnect the queue is replayed in order, still carrying that original timestamp, so the server records when the person actually clocked and flags the event as **late-synced**. HR sees that distinction on the dashboard instead of an offline clock silently pretending to be a normal one.

---

## Kiosk Mode: the Same App as a Shared Store Clock

High turnover and staff who would rather not install a work app on their own phone make the shared tablet the realistic clock for an outlet. The same binary becomes one when it is paired.

HR creates a tablet in the dashboard and gets a six-character pairing code. The tablet consumes it once and stores a long-lived kiosk token, and from then on it only ever shows kiosk screens. The code is single-use and expires; revoking the tablet kills the old token immediately. One tablet can serve several sites, for example units that share an entrance.

What changes in kiosk mode, beyond the layout:

- **No session at all.** The tablet holds no employee login and no templates. Every clock is a fresh identification request, matched only against the roster of the tablet's sites for that day.
- **Ambiguity falls back to a name.** A borderline match, a best match that fails to beat the runner-up by a margin, or frames that disagree about who is in front of the camera make the tablet ask for the employee's NIK and re-check one to one.
- **It says why.** A failed clock shows the reason and a "try again" button, and the idle screen shows how many people have clocked in today.
- **A screensaver HR controls.** Between clocks the tablet plays images and video that HR manages from the dashboard. Every file is downloaded once, matched by its fingerprint, and played from local storage, so the slideshow keeps going without internet and changing it never needs a release.

### Locking a tablet down without a paid kiosk app

The pilot used a third-party kiosk app that put a watermark on the screen and cost a licence per device. It was replaced by a native Kotlin layer of about 350 lines with three independent levels:

1. **Home screen.** While the device is a kiosk, an activity alias makes the app selectable as the tablet's launcher, so Home and a restart both land back on the clock. Phones never get the alias.
2. **Pinning.** The app pins itself with Android's lock task. Home, recents and the notification shade stop working. Getting out takes the tablet's own screen-lock PIN, asked by Android, so there is no new secret to manage.
3. **Device owner** (set up once per tablet). The pin needs no confirmation and has no system escape. Only the power menu stays, so a tablet can still be restarted by hand.

HR switches the lock on or off per tablet from the dashboard, and the tablet reports back which level it actually achieved, rather than HR assuming the setting took effect.

### A tablet that recovers by itself

An outlet tablet has no one to tap "open" after something goes wrong, so recovery had to be automatic:

- **After an update.** On a device-owner tablet the new build installs silently. A pinned screen blocks the system installer, so the app lifts its own pin for the install and re-pins when it comes back. A package-replaced receiver reopens the app afterwards.
- **After a power cut.** A boot receiver restarts the app. Android 15 only lets an app start itself while one of its overlay windows is visible, so the receiver shows an invisible one-pixel overlay, starts the app, and removes the overlay. It also posts a "tap to open" notification first, because Android may refuse the start without saying so. The app clears that notification once it is on screen.
- **Watched from the server.** Every poll reports the app version, and the backend emails HR when a tablet goes silent and again when it comes back.

---

## Shipping Without the Play Store

The app is distributed directly, which means updates had to be solved rather than assumed.

The server publishes a small version manifest next to the APKs. The app compares its own build number against it and offers to download and install the new one. A `min_build` field is the escape hatch for a release nobody may skip, such as a changed API contract or a fix that protects payroll data: below that number the notice stops being dismissible. Everything else stays a suggestion the person can defer to the end of a shift.

Two details that had to be discovered the hard way:

- **Flutter rewrites `versionCode` for per-architecture builds**, so an arm64 build reports 2006 where the real build is 6. Compared raw, every device would look permanently newer than any release and no update would ever be offered again. The app normalises the code, the native side reports which published architecture the device can actually run, and the publish script refuses build numbers at or above 1000.
- **The package-info plugin throws on an app installed from a computer**, because no installer is recorded. That silently switched the update check off on exactly the tablets set up by hand, so the running build is now read straight from Android.

---

## Technology Stack

| Concern | Choice |
|---------|--------|
| Framework | Flutter (Dart SDK 3.5+), Android |
| State and routing | Riverpod, go_router |
| Networking | dio, with a typed API client and rotating refresh tokens |
| Face and liveness | Google ML Kit face detection on device, server-tuned coaching, server-side ArcFace verification |
| Camera and media | camera plugin with three-frame burst capture, video_player for the kiosk screensaver |
| Location | geolocator with accuracy and mock-location reporting |
| Offline | file-backed clock queue with original timestamps |
| Security | flutter_secure_storage for the device fingerprint and tokens, NIK + PIN sign-in |
| Kiosk | native Kotlin layer: launcher alias, lock task, device owner, boot and update receivers, Android 15 overlay start, wakelock |
| Release | self-update from a published manifest, per-architecture builds, silent install on device-owner tablets |

---

## Status

The app is the company's official attendance clock. Shared tablets are live, dozens of employees clock in every day, and the phone app is enabled per person by HR. Next:

- more outlet tablets;
- face enrollment for the remaining staff at each site;

For the backend, the HR dashboard, the attendance rules, the contract and turnover intelligence and the personal-data model behind all of this, see the [HR & Face-Attendance Platform](hr-attendance-platform.md).

---

*Built for a private client. The app is internal, so it is described without screenshots, and the company name, brands, sites and employee data are omitted throughout.*
