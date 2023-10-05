# Display a list of available Makefile targets
help:
	@echo "Available targets:"
	@echo "  help            Display this help message"
	@echo "  build           Build Docker containers"
	@echo "  up              Start Docker containers"
	@echo "  f-up            Run the frontend"
	@echo "  down            Stop and remove Docker containers"
	@echo "  logs            View Docker container logs"
	@echo "  rebuild         Stop, build, and start Docker containers"

# Build Docker containers
build:
	docker compose build

# Start Docker containers
up:
	docker compose up

# Run 'npm start' in the frontend container
f-up:
	docker exec -it mern-overflow-pharmacy-web-1 /bin/bash -c "cd ../client;npm start"

# Stop and remove Docker containers
down:
	docker compose down

# Run tests
test:
	docker exec -it mern-overflow-pharmacy-web-1 /bin/bash -c "npm test"

# View Docker container logs
logs:
	docker compose logs -f

# Rebuild Docker containers stop, build, and start
rebuild:
	cd server &&npm install 
	cd client &&npm install
	docker compose down
	docker compose build
	docker compose up

