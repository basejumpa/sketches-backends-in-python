# Sketch a

Serve static files (e.g., images, CSS, JS) specifically.

## Run

In the Terminal, do

``` bash
cd sketch-a
poetry install
```

and then

```bash
poetry run uvicorn sketch_a.backend.main:app --reload
```

## Investigate

### Functionality

- Open http://127.0.0.1:8000 in browser. You see {"detail":"Not Found"}. In the Terminal, you see `404 Not Found`.
- http://127.0.0.1:8000/some.txt is found and displayed, leads to `200 OK`.
- http://127.0.0.1:8000/some.html is found and displayed formatted correctly. That means the browser interprets the html code.
- http://127.0.0.1:8000/some.js is found and its content is displayed.
- http://127.0.0.1:8000/use-js.html is found and its content is interpreted, the refered javascript file is loaded and executed. Works as expected.

### Implementation

- `FastAPI` app uses the method `mount` it has got inherited from Starlette.

### References

- https://fastapi.tiangolo.com/tutorial/first-steps/
- https://www.starlette.io/
- https://python-poetry.org/docs/basic-usage/

### Observations

- The serving of the files can be done with Starlette, FastAPI is not needed for that. But:
- There are the routes http://127.0.0.1:8000/docs and http://127.0.0.1:8000/redoc
- The OpenAPI specification is provided via the download link in the last route which is just
- http://127.0.0.1:8000/openapi.json



The listing of directory is not provided. See on that
- https://stackoverflow.com/questions/71276790/list-files-from-a-static-folder-in-fastapi
- https://github.com/Nearata/directory-listing

### By-catches

- Typer is cool! https://typer.tiangolo.com/

