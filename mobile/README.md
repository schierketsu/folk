# ФОЛК — React Native

Новое основное приложение находится в `mobile/`. Оно сделано на Expo SDK 58 и React Native. Содержание курса и изображения перенесены из Flutter-проекта `app/`. Переданный SVG служит визуальным ориентиром; последние согласованные изменения интерфейса применены поверх него.

## Запуск на своём телефоне через Android Studio

1. Откройте `mobile/android` в Android Studio. Папка уже создана в текущем рабочем пространстве. Если позже её не будет, из папки `mobile` выполните `npx expo prebuild --platform android`.
2. Подключите телефон USB-кабелем, включите отладку и подтвердите запрос доступа на телефоне. Телефон должен появиться в списке устройств вверху Android Studio.
3. Терминал Android Studio обычно открывается в `mobile/android`. Сначала выполните `cd ..`, затем `npx expo start --dev-client --localhost` из папки `mobile`, где находится `package.json`. Не закрывайте этот терминал во время работы.
4. В другом терминале выполните `& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" reverse tcp:8081 tcp:8081` (PowerShell). Это соединит телефон с локальным сервером React Native по USB. После переподключения кабеля команду нужно повторить.
5. В Android Studio выберите конфигурацию **app**, свой телефон и нажмите зелёную кнопку **Run ▶**. Первая сборка Gradle занимает заметное время; последующие изменения JS/TS появляются через Metro без новой Android-сборки.

Для повторной загрузки экрана нажмите `r` в терминале Expo. Для проверки проекта выполните `npm run check`. Сборка JS для Android: `npx expo export --platform android`.

### Подготовка Windows для нативной сборки

React Native создаёт длинные пути к C++ файлам. На этом компьютере установлены Android NDK 27.1, SDK 37 и CMake 3.31.6 (Ninja 1.12.1), в `%USERPROFILE%\.gradle\gradle.properties` задано `android.cmakeVersion=3.31.6`, а поддержка длинных путей Windows включена. После этих изменений локальная сборка `:app:assembleDebug` прошла успешно.

При настройке другого компьютера запустите PowerShell **от имени администратора**, выполните команду и перезагрузите компьютер:

```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

После перезагрузки откройте Android Studio и повторите **File → Sync Project with Gradle Files**. Подробности: [руководство Expo по ошибке длинных путей](https://docs.expo.dev/troubleshooting/windows-long-paths/).

## Структура

- `src/app/` — экраны и маршруты Expo Router.
- `src/data/course.json` — 12 уроков и 36 упражнений.
- `src/state/ProgressContext.tsx` — локальный прогресс в AsyncStorage.
- `src/assets/` и `assets/` — иконки, картинки и шрифты Nunito.
- `scripts/import_course.py` — импорт данных из старого Flutter-кода.

Данные прогресса старой Flutter-установки автоматически в новую установку не копируются. Пакеты приложения имеют разные Android ID (`ru.folk.app` и `ru.folk.mobile`), поэтому оба варианта можно держать на телефоне во время перехода.
