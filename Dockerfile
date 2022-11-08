FROM hayd/deno-lambda:1.26.0

COPY ddb.ts .
RUN deno cache ddb.ts

CMD ["hello.handler"]
