# Muda-Aufnahme – PWA für iPhone und iPad

Web-App zur Verschwendungsaufnahme in der Montage. Läuft nach der Installation wie eine App vom Home-Bildschirm, auch offline.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die App |
| `manifest.webmanifest` | App-Name, Farben, Icons |
| `sw.js` | Service Worker: speichert die App für den Offline-Betrieb |
| `icons/` | App-Icons |

## Veröffentlichen über GitHub Pages

1. Auf github.com ein neues Repository anlegen, z. B. `muda-aufnahme`. Sichtbarkeit **Public** (GitHub Pages ist bei privaten Repos nur mit bezahltem Plan möglich).
2. **Add file → Upload files**: alle Dateien und den Ordner `icons` hochladen (Struktur beibehalten), dann **Commit changes**.
3. **Settings → Pages**: unter *Build and deployment* Source = **Deploy from a branch**, Branch = **main**, Ordner = **/ (root)**, **Save**.
4. Nach 1–2 Minuten erscheint dort die Adresse: `https://<dein-benutzername>.github.io/muda-aufnahme/`

## Auf dem iPhone installieren

1. Die Adresse in **Safari** öffnen (nicht in Chrome oder einer anderen App).
2. Einmal online alle Reiter kurz antippen, damit alles im Offline-Speicher landet.
3. **Teilen-Symbol → Zum Home-Bildschirm** → **Hinzufügen**.
4. Ab jetzt über das Icon „Muda“ starten. Die App läuft im Vollbild und funktioniert auch ohne Netz.

## Wichtig zu den Daten

- Alle Messdaten liegen **nur auf dem Gerät**, in der installierten App. Safari und Home-Bildschirm-App haben getrennte Speicher.
- iOS kann Daten von Web-Apps löschen, wenn sie mehrere Wochen nicht geöffnet wurden. **Nach jeder Aufnahme exportieren** (Einrichtung & Export → Excel bzw. JSON-Sicherung).
- Der Export öffnet das iOS-Teilen-Menü: „In Dateien sichern“, Mail, Teams usw.
- Mit „JSON einlesen“ lässt sich eine Sicherung auf einem anderen Gerät wiederherstellen.

## Updates einspielen

1. Geänderte `index.html` auf GitHub hochladen.
2. In `sw.js` die Zeile `const VERSION = "muda-v4";` hochzählen (z. B. `muda-v5`) und ebenfalls hochladen.
3. App auf dem iPhone online öffnen, schließen, erneut öffnen.

## Hinweis zum Firmeneinsatz

GitHub Pages ist öffentlich erreichbar. Der App-Code ist öffentlich, die Messdaten aber nicht: Sie verlassen das Gerät nur beim Export.
