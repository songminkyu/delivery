param(
    [string]$Registry = "songminkyu",
    [string]$Tag = "latest"
)

$services = @("gateway", "notification", "order", "payment", "product", "user")

Write-Host "=== Docker Build and Push Script ===" -ForegroundColor Cyan
Write-Host "Registry: $Registry" -ForegroundColor White
Write-Host "Tag: $Tag" -ForegroundColor White
Write-Host "Services: $($services -join ', ')" -ForegroundColor White
Write-Host ""

# Docker login check
Write-Host "Checking Docker Hub login status..." -ForegroundColor Yellow
docker info | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Build phase
Write-Host "Starting Docker image build..." -ForegroundColor Green
$buildStartTime = Get-Date

foreach ($service in $services) {
    $imageTag = "$Registry/fc-nestjs-$service`:$Tag"
    Write-Host "[$($services.IndexOf($service) + 1)/$($services.Count)] Building: $imageTag" -ForegroundColor Yellow
    
    $buildTime = Measure-Command {
        # PowerShell에서 docker buildx 출력을 올바르게 처리하기 위해 cmd를 사용
        $process = Start-Process -FilePath "docker" -ArgumentList "buildx", "build", "--platform", "linux/amd64", "-t", $imageTag, "-f", "./apps/$service/Dockerfile", "--target", "production", "." -Wait -PassThru -NoNewWindow
        $global:LASTEXITCODE = $process.ExitCode
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Build completed: $service (Time: $($buildTime.Minutes)m $($buildTime.Seconds)s)" -ForegroundColor Green
    } else {
        Write-Host "Build failed: $service" -ForegroundColor Red
        exit 1
    }
}

$buildEndTime = Get-Date
$totalBuildTime = $buildEndTime - $buildStartTime
Write-Host "All builds completed (Total time: $($totalBuildTime.Minutes)m $($totalBuildTime.Seconds)s)" -ForegroundColor Green
Write-Host ""

# Push phase
Write-Host "Starting push to Docker Hub..." -ForegroundColor Green
$pushStartTime = Get-Date

foreach ($service in $services) {
    $imageTag = "$Registry/fc-nestjs-$service`:$Tag"
    Write-Host "[$($services.IndexOf($service) + 1)/$($services.Count)] Pushing: $imageTag" -ForegroundColor Yellow
    
    $pushProcess = Start-Process -FilePath "docker" -ArgumentList "push", $imageTag -Wait -PassThru -NoNewWindow
    $global:LASTEXITCODE = $pushProcess.ExitCode
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Push completed: $service" -ForegroundColor Green
    } else {
        Write-Host "Push failed: $service" -ForegroundColor Red
        exit 1
    }
}

$pushEndTime = Get-Date
$totalPushTime = $pushEndTime - $pushStartTime
$totalTime = $pushEndTime - $buildStartTime

Write-Host ""
Write-Host "=== Task Completed ===" -ForegroundColor Cyan
Write-Host "Build time: $($totalBuildTime.Minutes)m $($totalBuildTime.Seconds)s" -ForegroundColor White
Write-Host "Push time: $($totalPushTime.Minutes)m $($totalPushTime.Seconds)s" -ForegroundColor White
Write-Host "Total time: $($totalTime.Minutes)m $($totalTime.Seconds)s" -ForegroundColor White
Write-Host "All images pushed successfully!" -ForegroundColor Green