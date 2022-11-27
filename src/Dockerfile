FROM hayd/deno-lambda:1.26.0

COPY hello.ts .
RUN deno cache hello.ts

CMD ["hello.handler"]
