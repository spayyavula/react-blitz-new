
#!/bin/bash

echo "🚀 Deployment Setup for Bolt Clone"
echo "=================================="

echo "📦 Building React app for Vercel..."
npm run build

echo "✅ React build complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your GitHub repo to Vercel (vercel.com)"
echo "3. Connect your GitHub repo to Render (render.com)"
echo "4. Update the backend URL in vercel.json with your actual Render URL"
echo ""
echo "🔧 Manual Configuration:"
echo "- Vercel: Auto-detects React app, just import from GitHub"
echo "- Render: Select 'Web Service', connect GitHub repo, use 'main.py' as entry"
echo ""
echo "🌐 Don't forget to update CORS origins in main.py with your Vercel URL!"
