# Roadmap

The order the core of randomtask is built in. Each stage is built test-first and verified before the next one starts. Open questions for each stage are in [decisions.md](decisions.md).

1. **Task entity.** A task with a title. *Done.*
2. **Local database.** Save and load tasks on the device, with a minimal task list and an end-to-end test. *Done in 0.2.0.*
3. **Encryption.** Encrypt the database on the device, so only the user can read it. *Done:* an email and password (Standard Notes 004 keys) encrypt every task, and the app asks for the password at each launch.
4. **No account needed.** The app opens empty and ready to use. Tasks stay unencrypted until the user secures them with an email and password from the account menu. *Done:* until the server exists, the account is created on the device.
5. **The randomtask server.** In Rust: register and sign in as in Standard Notes, so accounts live on the server. *In progress:* the server registers, signs in, locks after failed sign-ins, refreshes sessions and signs out, and the desktop app registers with it when `RANDOMTASK_SERVER` is set. It's set up to host on an Infomaniak VPS ([deploy/README.md](../deploy/README.md)); next, putting it live and building its address into the desktop app.
6. **Stay signed in.** An opt-in "stay signed in on this device" keeps the key in the operating system's keychain.
7. **Subscription and sync.** Payment, then sync through the server into the user's own bucket, and restoring on another device.
8. **The web app.** The same frontend with the Rust core compiled to WebAssembly, as the site people reach. *In progress:* it runs locally with `npm run dev:web`, against the server on this machine.
9. **Two-way sync, two-factor authentication and recovery,** as in Standard Notes.
10. **Backups.** A local backup folder (on by default) with restore, then email backups.

The design for stages 3 to 10 is in [design/encryption-and-accounts.md](design/encryption-and-accounts.md). Following Standard Notes, the encryption keys come from the account password, so encryption and accounts may be built together.

## Release targets

Where people can get randomtask, alongside the stages above. Each step builds on the files the one before it publishes.

1. **Every desktop platform on GitHub Releases.** The release workflow also builds Linux (AppImage, `.deb` and `.rpm`), Windows (`.msi` and installer) and Intel Macs, next to the Apple Silicon `.dmg`. Apple notarization (a Developer ID, $99 a year) removes Gatekeeper's warning, and Windows code signing removes SmartScreen's.
2. **Linux and Windows package managers,** each kept up to date from the release, as the Homebrew tap is:
   - the **AUR** (`yay -S randomtask-bin`), from the `.deb`;
   - **Flathub**, built from source, which reaches every distribution and GNOME Software and KDE Discover;
   - an **apt repository** for Debian and Ubuntu, and **Fedora COPR** for `.rpm`;
   - the **Snap Store** and **Nixpkgs**;
   - **winget** and **Scoop** on Windows.
3. **Android without Google,** for GrapheneOS and other de-Googled phones, once the screens fit a phone (Tauri 2 builds the Android app):
   - a signed **APK on GitHub Releases**, which **Obtainium** installs and updates;
   - **Accrescent**, the store GrapheneOS recommends;
   - **F-Droid**, which builds from source; with reproducible builds it ships our signature, so its builds and ours update each other.
4. **The app stores:** **Google Play**, the **iOS App Store** (with TestFlight for betas), the **Microsoft Store** and the **Mac App Store**. They wait on two open questions in [decisions.md](decisions.md): the GPL and the stores' terms, and paying for Sync inside the apps. Until then, iPhone users can add the web app at randomtask.ch to their home screen.

Official Debian and Arch repositories aren't targets: their maintainers choose what to package.

Tags, smart lists and the UI build on these stages. A full list of features is still to be mapped out.
