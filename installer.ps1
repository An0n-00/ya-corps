# automated installation script
clear-host
write-host "██╗   ██╗ █████╗        ██████╗ ██████╗ ██████╗ ██████╗ ███████╗"
write-host "╚██╗ ██╔╝██╔══██╗      ██╔════╝██╔═══██╗██╔══██╗██╔══██╗██╔════╝"
write-host " ╚████╔╝ ███████║█████╗██║     ██║   ██║██████╔╝██████╔╝███████╗"
write-host "  ╚██╔╝  ██╔══██║╚════╝██║     ██║   ██║██╔══██╗██╔═══╝ ╚════██║"
write-host "   ██║   ██║  ██║      ╚██████╗╚██████╔╝██║  ██║██║     ███████║"
write-host "   ╚═╝   ╚═╝  ╚═╝       ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚══════╝"
Write-Host "`nWelcome to YA-CORPS!`n"
Write-Host "Booting YA-CORPS: Your simple, powerfull and easy-to-use CORS Proxy Server" -NoNewline
[int] $i = 0
do {
    $i++
    Start-Sleep -Seconds 2
    Write-Host "." -NoNewline
}until ($i -eq 4)
Write-Host "`n"

Clear-Host

Read-Host "This is the installation script for YA-CORPS. Only continue if you want to install this git repo and run it. Press Enter to continue..."

# ask where user wants to install
$installPath = Read-Host "Enter the installation path (leave blank for default: $env:USERPROFILE\ya-corps)"
if (-not $installPath) {
    $installPath = "$env:USERPROFILE\ya-corps"
}

# create installation directory if it doesn't exist
if (-not (Test-Path -Path $installPath)) {
    New-Item -ItemType Directory -Path $installPath
}

# navigate to installation directory
Set-Location -Path $installPath

# git clone
git clone https://github.com/An0n-00/ya-corps.git

# install dependencies
cd ya-corps
npm install

# rename .env
Copy-Item -Path ".env.example" -Destination ".env"

# run 
npm run main