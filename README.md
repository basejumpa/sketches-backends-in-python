# Sketches of backends written in Python

- Sketch a: Serve directory for static files.
- Sketch b: Call external program in own process (synchronously).
- Sketch c: Trigger external program as own process asynchronously (but do not capture anything from it).
- Sketch d: Trigger external program in own process, do something in parallel, then wait for completion and capture output.
- Sketch e: Communicate with frontend via REST
- Sketch f: Communicate with frontend via websocket synchronously
- Sketch g: Communicate with frontend via websocket synchronously but do not block server (use async capabilities of FastAPI)


## Examine a sketch

First stablish prerequisites

```bash
pip install pipx
pipx ensurepath
pipx install poetry
```

Consult the sketch's `sketch-i/README.md`.

## Cleanup before next sketch

TODO: Descripe here.

```bash
rm -rf poetry.lock .venv/
```


## Contribute

Establish Prerequisites

```bash
pip install -r requirements.txt
```

Add boilerplate for a new sketch cd into repository root and run

```bash
cookiecutter add-sketch
```

Here in this global README.md, in the upper list append the sketch.

cd into the newly created sketch directory.

Elaborate the sketch.

Create a pull-request.

### Additional Comments

Following command executed in the repository's root folder removes all virtual environments.

```bash
find . \( -name 'poetry.lock' -o -name '.venv' \) -exec rm -rf {} +
```

