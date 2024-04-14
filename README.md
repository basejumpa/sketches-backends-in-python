# Sketches of backends written in Python

- Sketch a: Using FastAPI to: Serve directory for static files.
- Sketch b: Using FastAPI to: Call external program in own process (synchronously).
- Sketch c: Using FastAPI to: Trigger external program as own process asynchronously (but do not capture anything from it).
- Sketch d: Using FastAPI to: Trigger external program in own process, do something in parallel, then wait for completion and capture output.
- Sketch e: Using FastAPI to: Communicate with frontend via REST, front- and backend use json, backend uses pydantic dataclasses to define protocol.
- Sketch f: IN_WORK Using gRPC: Receive text message and respond with text message.
- Sketch i: TODO Using gRPC: Receive json message, interpret the message and respond with json message.
- Sketch i: TODO Using gRPC: Receive json message, interpret the message, call external program to calculate response and send response as a json message.
- Sketch i: POSTPONED Using FastAPI to: Communicate with frontend via websocket synchronously
- Sketch i: POSTPONED Using FastAPI to: Communicate with frontend via websocket synchronously but do not block server (use async capabilities of FastAPI)


## Examine a sketch

First stablish prerequisites

```bash
pip install pipx
pipx ensurepath
pipx install poetry
```

Consult the sketch's `sketch-?/README.md`.


## Cleanup before next sketch

Following command executed in the repository's root folder removes all virtual environments.

```bash
find . \( -name 'poetry.lock' -o -name '.venv' \) -exec rm -rf {} +
```


## Contribute

Here in this global README.md, in the upper list append the sketch.

Add boilerplate for a new sketch cd into repository root and run

```bash
pipx install cookiecutter
cookiecutter add-sketch
```

- cd into the newly created sketch directory.
- Elaborate your sketch.
- Create a fork.
- Talk to me by means of a pull-request.


### Additional Comments

None
