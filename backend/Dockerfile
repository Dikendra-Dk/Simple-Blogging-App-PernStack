FROM node:20-alpine

WORKDIR /app

# Copy only package files first so Docker can cache the npm install layer
# and skip it on rebuilds unless dependencies actually changed.
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]