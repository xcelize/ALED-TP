## Lancer l'application

* Installer Chocolatey avec la commande
```Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))```
* Installer NodeJs et openjdk-11 ```choco install -y nodejs-lts microsoft-openjdk11```
* Demarrer votre emulateur
* Lancer ```npx react-native run-android```
* L'application devrait ce lancer

## APK - Génération

* ```cd @~/android```
* ``` ./gradlew clean ```
* ```npx react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res```
* ```./gradlew assembleRelease ```
* Une APK de la dernière version est à la racine de ce dépôt