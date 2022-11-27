FROM hayd/deno-lambda:1.28.2

COPY hello.ts .
RUN deno cache hello.ts

CMD ["hello.handler"]
