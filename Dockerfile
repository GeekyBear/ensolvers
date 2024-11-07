# Use a multi-stage build to build both frontend and backend

# Stage 1: Build backend
FROM node:18 as backend-builder
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend
RUN cd backend && npm run build

# Stage 2: Build frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Stage 3: Final stage
FROM node:18-alpine
WORKDIR /app

# Copy backend build
COPY --from=backend-builder /app/backend /app/backend

# Copy frontend build
COPY --from=frontend-builder /app/frontend /app/frontend

# Expose ports
EXPOSE 3000
EXPOSE 8080

# Command to run the backend and frontend
CMD ["sh", "-c", "cd /app/frontend && npx serve -s build -l 8080 & cd /app/backend && node dist/main.js"]