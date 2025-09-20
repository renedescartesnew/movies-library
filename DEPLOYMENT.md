# Firebase Deployment Guide

This guide will help you deploy the CineVault movies frontend to Firebase Hosting.

## Prerequisites

1. **Upgrade Node.js** (Required - current version v10.24.1 is too old)
   ```bash
   # Using nvm (recommended)
   nvm install 18
   nvm use 18
   
   # Or download from https://nodejs.org/
   ```

2. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

3. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Follow the setup wizard
   - Enable Firebase Hosting

## Deployment Steps

### 1. Install Dependencies
```bash
cd /Users/narektotolyan/movies-react-app/movies-frontend
npm install
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Project
```bash
firebase init hosting
```
- Select your Firebase project
- Set public directory to `dist`
- Configure as single-page app: **Yes**
- Set up automatic builds: **No** (for now)
- Overwrite index.html: **No**

### 4. Update Firebase Configuration
Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID:
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 5. Build and Deploy
```bash
# Build the application
npm run build:firebase

# Deploy to Firebase
firebase deploy
```

Or use the combined command:
```bash
npm run deploy
```

## Alternative: Manual Deployment

If you prefer to build manually:

```bash
# Build the application
npm run build:firebase

# Deploy only hosting
firebase deploy --only hosting
```

## Firebase Configuration

The project includes optimized Firebase configuration:

- **Public Directory**: `dist` (Vite build output)
- **SPA Routing**: Configured for React Router
- **Caching**: Optimized for static assets
- **Headers**: Proper cache control for JS, CSS, and images

## Post-Deployment

After successful deployment:

1. **Test the Application**: Visit your Firebase hosting URL
2. **Check Routing**: Navigate to different pages to ensure SPA routing works
3. **Verify Features**: Test film browsing, detail pages, and wishlist functionality

## Troubleshooting

### Common Issues:

1. **Node.js Version Error**
   - Solution: Upgrade to Node.js 18+ as shown above

2. **Build Errors**
   - Check that all dependencies are installed: `npm install`
   - Verify TypeScript compilation: `npm run build`

3. **Firebase CLI Not Found**
   - Install globally: `npm install -g firebase-tools`

4. **Authentication Issues**
   - Re-login: `firebase logout && firebase login`

5. **Project Not Found**
   - Verify project ID in `.firebaserc`
   - Check Firebase Console for correct project ID

## Environment Variables (Optional)

If you need environment variables for production:

1. Create `.env.production` file
2. Add your variables:
   ```
   VITE_API_URL=https://your-api-url.com
   VITE_APP_NAME=CineVault
   ```
3. Rebuild and deploy

## Custom Domain (Optional)

To use a custom domain:

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps
4. Update your domain's DNS records

## Continuous Deployment (Optional)

To set up automatic deployment on Git push:

1. Connect your repository to Firebase
2. Enable GitHub Actions or similar CI/CD
3. Configure automatic builds on push to main branch

## Performance Optimization

The deployment includes:

- ✅ **Code Splitting**: Automatic with Vite
- ✅ **Asset Optimization**: Minified JS/CSS
- ✅ **Caching Headers**: Optimized for static assets
- ✅ **SPA Routing**: Proper fallback to index.html
- ✅ **Compression**: Firebase handles gzip compression

## Monitoring

After deployment, monitor your app:

1. **Firebase Console**: Check hosting metrics
2. **Performance**: Use Lighthouse for performance audits
3. **Analytics**: Consider adding Firebase Analytics

## Support

If you encounter issues:

1. Check Firebase Console for error logs
2. Verify build output in `dist` folder
3. Test locally with `npm run preview`
4. Check Firebase documentation: https://firebase.google.com/docs/hosting
