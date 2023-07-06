$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath

$filepath = $dir + "\accounts"

Push-Location $filepath
Start-Process npm -ArgumentList "update","@testsequencer/common", "@testsequencer/common-backend", "typescript@latest", "ts-node-dev@latest" -wait
Pop-Location
$filepath = $dir + "\auth"

Push-Location $filepath
Start-Process npm -ArgumentList "update","@testsequencer/common", "@testsequencer/common-backend", "typescript@latest", "ts-node-dev@latest" -wait
Pop-Location
$filepath = $dir + "\client"

Push-Location $filepath
Start-Process npm -ArgumentList "update","@testsequencer/common", "@testsequencer/common-backend", "typescript@latest", "ts-node-dev@latest"-wait
Pop-Location
$filepath = $dir + "\products"

Push-Location $filepath
Start-Process npm -ArgumentList "update","@testsequencer/common", "@testsequencer/common-backend", "typescript@latest", "ts-node-dev@latest" -wait
Pop-Location
$filepath = $dir + "\tests"

Push-Location $filepath
Start-Process npm -ArgumentList "update","@testsequencer/common", "@testsequencer/common-backend", "typescript@latest", "ts-node-dev@latest" -wait
Pop-Location
$filepath = $dir + "\users"

Push-Location $filepath
Start-Process npm -ArgumentList "update","@testsequencer/common", "@testsequencer/common-backend", "typescript@latest", "ts-node-dev@latest" -wait