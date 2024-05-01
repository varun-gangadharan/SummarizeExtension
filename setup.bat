@echo off
echo Please enter the name for the virtual environment:
set /p venv_name=

python3 -m venv %venv_name%

call %venv_name%\Scripts\activate

pip install -r requirements.txt

echo Setup complete. Virtual environment '%venv_name%' is ready and packages are installed.

echo Running the application...
python3 app.py

echo Server is up and running. Refer to the README on how to load the chrome extension. 