@echo off
echo Initializing Git repository...
git init

echo Adding files...
git add .

echo Committing changes...
git commit -m "Initial commit"

echo Adding remote origin...
git remote add origin https://github.com/Emjaay20/Final-Year-Project.git

echo Pushing to remote...
git push -u origin master

echo Done!
echo Setup script finished.
