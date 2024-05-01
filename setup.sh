#!/bin/bash

# Prompt for the virtual environment name
echo "Enter the name for the virtual environment:"
read venv_name

# Create the virtual environment
python3 -m venv $venv_name

# Activate the virtual environment
source $venv_name/bin/activate

# Install requirements
pip install -r requirements.txt

echo "Setup complete. Virtual environment '$venv_name' is ready and packages are installed."

echo Running the application...
python3 app.py

echo Server is up and running. Refer to the README on how to load the chrome extension. 