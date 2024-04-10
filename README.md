# Sketches of backends written in Python

- Sketch a: Serve directory for static files.
- Sketch b: Call external program in own process (synchronously).
- Sketch c: Trigger external program as own process asynchronously (but do not capture anything from it).
- Sketch d: Trigger external program in own process, do something in parallel, then wait for completion and capture output.
- Sketch e: Communicate with frontend via REST, front- and backend use json, backend uses pydantic dataclasses to define protocol.
- Sketch i: TODO Communicate with frontend via websocket synchronously
- Sketch i: TODO Communicate with frontend via websocket synchronously but do not block server (use async capabilities of FastAPI)


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
cookiecutter add-sketch
```

- cd into the newly created sketch directory.
- Elaborate your sketch.
- Create a fork.
- Talk to me by means of a pull-request.


### Additional Comments

None
