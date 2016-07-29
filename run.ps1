# ca sa rulez asta din cmd comanda este de tipul "powershell -File "run.ps1" -Arguments 1"

if ($args[1] -eq 1) {
    mvn package
}
elseif ($args[1] -eq 2) {
    mvn spring-boot:run
}
elseif ($args[1] -eq 12) {
    mvn package
    mvn spring-boot:run
}
elseif ($args[1] -eq "h") {
    Write-Host "Comanda este: powershell -File run.ps1 -Arguments 1"
    Write-Host 1 - doar mvn package
    Write-Host 2 - doar jarul
    Write-Host 12 - package si jar
}
else {
    Write-Host Rulez doar jar-ul
    Write-Host 1 - doar mvn package
    Write-Host 2 - doar jarul
    Write-Host 12 - package si jar
    mvn spring-boot:run
}

Write-Host A terminat scriptul