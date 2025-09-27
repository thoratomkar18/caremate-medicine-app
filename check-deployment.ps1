# Check if the latest deployment is live
Write-Host "Checking deployment status..." -ForegroundColor Yellow

# Fetch the main JS file to see if it contains our placeholder URLs
$response = Invoke-WebRequest -Uri "https://thoratomkar18.github.io/caremate-medicine-app/" -UseBasicParsing
$content = $response.Content

# Check if the page contains our new placeholder image URLs
if ($content -match "via\.placeholder\.com") {
    Write-Host "`n✅ SUCCESS: New deployment is live!" -ForegroundColor Green
    Write-Host "The site is now using external placeholder images." -ForegroundColor Green
    Write-Host "`nYou should see colored placeholder images with product names." -ForegroundColor Cyan
} else {
    Write-Host "`n⏳ WAITING: Old version still cached" -ForegroundColor Yellow
    Write-Host "The deployment might still be in progress or cached." -ForegroundColor Yellow
    Write-Host "`nTry:" -ForegroundColor Cyan
    Write-Host "1. Wait a few minutes for GitHub Pages to update" -ForegroundColor White
    Write-Host "2. Clear your browser cache (Ctrl+Shift+R)" -ForegroundColor White
    Write-Host "3. Try opening in an incognito/private window" -ForegroundColor White
}

Write-Host "`nPress any key to open the site in your default browser..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Start-Process "https://thoratomkar18.github.io/caremate-medicine-app/"