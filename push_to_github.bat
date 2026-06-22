@echo off
cd /d "D:\Sourav\Projects\Souravdeep-Portfolio-Website-main"
echo === Force pushing all your portfolio updates to GitHub ===
git push origin main-sync:main --force
echo.
if %errorlevel%==0 (
    echo SUCCESS - Your updated portfolio is now live!
    echo Visit: https://souravv2412.github.io/Souravv2412-Souravdeep-Portfolio-Website/
) else (
    echo FAILED - Something went wrong. Check above for errors.
)
pause
