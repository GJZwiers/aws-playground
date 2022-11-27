FROM public.ecr.aws/lambda/nodejs:18

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

# Copy function code
COPY listFunctions.mjs .

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "listFunctions.handler" ]