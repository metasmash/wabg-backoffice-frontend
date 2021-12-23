FROM 17-alpine3.12
WORKDIR /wabg-frontend
ENV PATH = "/node_modules/.bin:$PATH"
COPY . .
RUN npm run build:production
CMD ["npm", "start"]