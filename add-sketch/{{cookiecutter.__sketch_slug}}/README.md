# Sketch {{ cookiecutter.sketch_name }}

replace_by_matter

## Run

In the Terminal, do

``` bash
cd {{ cookiecutter.__sketch_slug }}
poetry update
```

and then start the **backend** by doing

```bash
poetry run python -m sketch_f.backend
```

Then, in Terminal seperate from the Terminal you started the backend, start the **frontend** mockup by either

```bash
poetry run python -m frontend_mockup
```

or

```bash
python3 -m http.server --directory frontend_mockup
```


## Investigate

### Experience the Functionality

### Work through the Implementation

### References

### Additional Observations

### Bycatches

### Additional Comments
