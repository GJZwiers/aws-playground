FROM hayd/deno-lambda:1.28.3

COPY listFunctions.ts .

RUN deno cache listFunctions.ts

CMD ["listFunctions.handler"]
