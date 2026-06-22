@echo off
cd /d "D:\Sourav\Projects\Souravdeep-Portfolio-Website-main"
echo === Checking git remote ===
git remote -v
echo.
echo === Adding all changes ===
git add -A
echo.
echo === Committing ===
git commit -m "Update portfolio: EmailJS contact form, chatbot dark theme fix, smaller hero buttons, UI polish"
echo.
echo === Pushing to GitHub ===
git push origin main
echo.
echo === Done! ===
pause
