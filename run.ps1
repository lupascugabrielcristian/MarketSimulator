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
else {
    Write-Host Rulez doar jarul
    Write-Host 1 - doar mvn package
    Write-Host 2 - doar jarul
    Write-Host 12 - package si jar
    java -jar .\target\MarketSimulation-0.0.1-SNAPSHOT.jar
}

Write-Host A terminat scriptul