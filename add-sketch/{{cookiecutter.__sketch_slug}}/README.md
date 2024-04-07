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
poetry update
```

and then

```bash
poetry run uvicorn {{ cookiecutter.__python_project }}.backend.main:app --reload
```

## Investigate

### Experience the Functionality

- Open http://127.0.0.1:8000 in browser. You see to_be_continued

### Work through the Implementation

### References

### Additional Observations

### By-catches

### Additional Comments
