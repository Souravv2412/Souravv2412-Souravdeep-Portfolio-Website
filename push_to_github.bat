@echo off
cd /d "D:\Sourav\Projects\Souravdeep-Portfolio-Website-main"
echo === Pulling remote changes first ===
git pull origin main --rebase
echo.
echo === Adding all changes ===
git add -A
echo.
echo === Committing (if anything new) ===
git commit -m "Update portfolio: EmailJS contact form, chatbot dark theme fix, smaller hero buttons, UI polish" 2>nul || echo Nothing new to commit, continuing...
echo.
echo === Pushing local main-sync to remote main ===
git push origin main-sync:main
echo.
echo === Done! Check GitHub to confirm ===
pause
