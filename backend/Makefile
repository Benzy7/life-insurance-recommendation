# Python environment
PYTHON = python3
PIP = pip3
VENV = venv
OSVENV = bin

activate:
	@echo "Activating virtual environment..."
	. $(VENV)/$(OSVENV)/activate

run:
	@echo "Running Django development server..."
	. $(VENV)/$(OSVENV)/activate && $(PYTHON) manage.py runserver --settings=config.settings.dev

test:
	@echo "Running Django tests..."
	. $(VENV)/$(OSVENV)/activate && $(PYTHON) manage.py test --settings=config.settings.dev

makemigrations:
	@echo "Making migrations..."
	. $(VENV)/$(OSVENV)/activate && $(PYTHON) manage.py makemigrations --settings=config.settings.dev

migrate:
	@echo "Applying migrations..."
	. $(VENV)/$(OSVENV)/activate && $(PYTHON) manage.py migrate --settings=config.settings.dev

mergemigrations:
	@echo "Merging migrations..."
	. $(VENV)/$(OSVENV)/activate && $(PYTHON) manage.py makemigrations --merge --settings=config.settings.dev

freezereq:
	@echo "Freezing requirements..."
	. $(VENV)/$(OSVENV)/activate && $(PIP) list --format=freeze > requirements.txt

installreq:
	@echo "Installing requirements..."
	. $(VENV)/$(OSVENV)/activate && $(PIP) install -r requirements.txt
