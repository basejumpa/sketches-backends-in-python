# Sketch {{ cookiecutter.sketch_name }}

replace_by_matter

## Establish prerequisites

```bash
pip install pipx
pipx ensurepath
pipx install poetry
```

## Run

In the Terminal, do

``` bash
cd {{ cookiecutter.__python_project }}
poetry install
```

and then

```bash
poetry run uvicorn {{ cookiecutter.__python_project }}.backend.main:app --reload
```

## Investigate

### Experience the functionality

- Open http://127.0.0.1:8000 in browser. You see {"detail":"Not Found"}. In the Terminal, you see `404 Not Found`.
- http://127.0.0.1:8000/some.txt is found and displayed, leads to `200 OK`.
- http://127.0.0.1:8000/some.html is found and displayed formatted correctly. That means the browser interprets the html code.
- http://127.0.0.1:8000/some.js is found and its content is displayed.
- http://127.0.0.1:8000/use-js.html is found and its content is interpreted, the refered javascript file is loaded and executed. Works as expected.

### Work through the implementation

### References

### Observations

### By-catches

