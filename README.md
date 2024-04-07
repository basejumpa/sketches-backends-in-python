# Sketches of backends written in Python

- Sketch a: Serve directory for static files.
- Sketch b: Call external program (synchronously)


## Examine a sketch

First stablish prerequisites

```bash
pip install pipx
pipx ensurepath
pipx install poetry
```

then enter the directory of a sketch

```bash
cd sketch-a
```

and consult the sketch's `README.md`.


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
