# 🚀 Deployment Guide

This guide will help you deploy your ecommerce web application.

## 📁 Project Structure

- `frontend/` - React + Vite application
- `backend/` - Node.js + Express API
- `vercel.json` - Vercel deployment configuration
- `railway.json` - Railway deployment configuration
- `deploy.ps1` - PowerShell deployment script

## 🌐 Frontend Deployment (Vercel)

1. Visit [Vercel](https://vercel.com/new)
2. Connect your GitHub account
3. Import this repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Deploy!

### Manual Frontend Deployment

```bash
npm install -g vercel
cd frontend
vercel --prod
```

## 🖥️ Backend Deployment Options

### Option 1: Railway (Recommended)

1. Visit [Railway](https://railway.app)
2. Connect your GitHub account
3. Create a new project from this repo
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `STRIPE_SECRET_KEY`
   - `NODE_ENV=production`
5. Deploy!

### Option 2: Render

1. Visit [Render](https://render.com)
2. Connect your GitHub account
3. Create a new Web Service
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables

### Option 3: Docker

```bash
cd backend
docker build -t ecommerce-backend .
docker run -p 5000:5000 \
  -e MONGODB_URI="your_mongodb_uri" \
  -e JWT_SECRET="your_jwt_secret" \
  -e STRIPE_SECRET_KEY="your_stripe_key" \
  -e NODE_ENV="production" \
  ecommerce-backend
```

## 🔧 Environment Variables

### Backend Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `STRIPE_SECRET_KEY` - Stripe secret key for payments
- `NODE_ENV` - Set to "production"
- `PORT` - Port number (usually provided by hosting service)

### Frontend Variables
- `VITE_API_URL` - Backend API URL
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

## 📋 Pre-deployment Checklist

- [ ] MongoDB database set up
- [ ] Stripe account configured
- [ ] Environment variables prepared
- [ ] Frontend built successfully
- [ ] Backend dependencies installed
- [ ] Repository pushed to GitHub

## 🏃‍♂️ Quick Deploy

Run the deployment script:

```powershell
.\deploy.ps1
```

This will:
1. Build the frontend
2. Commit changes
3. Push to GitHub
4. Show deployment instructions

## 🔄 CI/CD

For automatic deployments on push:
- Vercel automatically deploys on push to main
- Railway can be configured for auto-deploy
- GitHub Actions workflow can be added for custom CI/CD

## 🆘 Troubleshooting

1. **Build fails**: Check node version compatibility
2. **Environment variables**: Ensure all required vars are set
3. **CORS issues**: Update backend CORS configuration for production URLs
4. **Database connection**: Verify MongoDB URI and network access

## 📞 Support

For issues with deployment, check the logs in your respective hosting platform's dashboard.