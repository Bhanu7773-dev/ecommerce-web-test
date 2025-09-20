# Ecommerce Web App Deployment Script

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Build Frontend
Write-Host "📦 Building frontend..." -ForegroundColor Yellow
Set-Location frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed" -ForegroundColor Red
    exit 1
}
Set-Location ..

# Commit and push changes
Write-Host "📝 Committing deployment files..." -ForegroundColor Yellow
git add .
git commit -m "Add deployment configurations and build frontend"
git push

Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps for deployment:" -ForegroundColor Cyan
Write-Host "1. Frontend (Vercel): Visit https://vercel.com/new and connect this GitHub repo"
Write-Host "2. Backend (Railway): Visit https://railway.app and connect this GitHub repo"
Write-Host "3. Alternative: Use Docker with the provided Dockerfile"
Write-Host ""
Write-Host "Environment Variables needed for backend:" -ForegroundColor Yellow
Write-Host "- MONGODB_URI: Your MongoDB connection string"
Write-Host "- JWT_SECRET: Secret key for JWT tokens"
Write-Host "- STRIPE_SECRET_KEY: Your Stripe secret key"
Write-Host "- NODE_ENV: production"