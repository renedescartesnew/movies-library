# 🚀 Firebase Deployment Setup

## Quick Start

### 1. Upgrade Node.js (Required)
```bash
# Using nvm
nvm install 18
nvm use 18

# Verify version
node --version  # Should show v18.x.x
```

### 2. Run Deployment Script
```bash
cd /Users/narektotolyan/movies-react-app/movies-frontend
./deploy.sh
```

## Manual Setup

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
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
- Public directory: `dist`
- Single-page app: **Yes**
- Overwrite index.html: **No**

### 4. Update Project ID
Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID.

### 5. Deploy
```bash
npm run deploy
```

## Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enable Firebase Hosting
4. Note your project ID

## Configuration Files

- `firebase.json` - Firebase hosting configuration
- `.firebaserc` - Project ID configuration
- `deploy.sh` - Automated deployment script
- `.github/workflows/firebase-deploy.yml` - CI/CD workflow

## Build Output

The application builds to the `dist` folder with:
- Optimized static assets
- SPA routing configuration
- Proper caching headers
- Minified JavaScript and CSS

## Troubleshooting

### Node.js Version Error
```
ERROR: npm is known not to run on Node.js v10.24.1
```
**Solution**: Upgrade to Node.js 18+ using nvm or download from nodejs.org

### Firebase CLI Not Found
```
command not found: firebase
```
**Solution**: Install Firebase CLI with `npm install -g firebase-tools`

### Build Errors
**Solution**: Ensure all dependencies are installed with `npm install`

## Production URL

After successful deployment, your app will be available at:
```
https://your-project-id.web.app
```

## Features Included

✅ **SPA Routing** - React Router support  
✅ **Asset Optimization** - Minified and compressed  
✅ **Caching Headers** - Optimized for performance  
✅ **Error Handling** - Proper 404 fallbacks  
✅ **Security Headers** - Basic security configuration  

## Next Steps

1. **Custom Domain**: Add your own domain in Firebase Console
2. **Analytics**: Enable Firebase Analytics
3. **Performance**: Monitor with Firebase Performance
4. **CI/CD**: Set up automatic deployment on Git push
