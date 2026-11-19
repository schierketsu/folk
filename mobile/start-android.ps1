$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$adbCommand = Get-Command adb -ErrorAction SilentlyContinue
$sdkRoot = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } elseif ($env:ANDROID_SDK_ROOT) { $env:ANDROID_SDK_ROOT } else { Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
$adbPath = if ($adbCommand) { $adbCommand.Source } else { Join-Path $sdkRoot 'platform-tools\adb.exe' }

if (-not (Test-Path -LiteralPath $adbPath)) {
    throw "ADB not found: $adbPath. Check Android SDK Platform-Tools."
}

$devices = & $adbPath devices
if ($LASTEXITCODE -ne 0 -or -not ($devices | Select-String '\sdevice$')) {
    throw 'No authorized phone found. Check the USB cable and accept the debugging prompt on the phone.'
}

& $adbPath reverse tcp:8081 tcp:8081
if ($LASTEXITCODE -ne 0) {
    throw 'Could not connect the phone to Metro through USB.'
}
Write-Host 'Phone connected to Metro through USB (port 8081).'

$metroRunning = $false
try {
    $status = Invoke-RestMethod -Uri 'http://127.0.0.1:8081/status' -TimeoutSec 2
    $metroRunning = $status -eq 'packager-status:running'
} catch {
    $metroRunning = $false
}

if ($metroRunning) {
    Write-Host 'Metro is already running. Open the app on the phone and tap Reload.'
    exit 0
}

Push-Location $projectRoot
try {
    & npx expo start --dev-client --localhost --port 8081
} finally {
    Pop-Location
}
