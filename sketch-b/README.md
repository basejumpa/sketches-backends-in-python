# Sketch sketch-b

Call external program (synchronously)

## Run

In the Terminal, do

``` bash
poetry install
```

and then

```bash
poetry run uvicorn sketch_b.backend.main:app --reload
```

## Investigate

### Experience the Functionality

- Open http://127.0.0.1:8000 in browser. You see the information about the call of the external program.
- Press reload several times. The timestamps show you that the program is called freshly every time.

### Additionnal Comments

Some commands used while constructing this sketch:

```bash
rm -rf poetry.lock .venv/
poetry run python main.py
poetry run python sketch_b/main.py
poetry run python sketch_b/backend/main.py
poetry run python -m sketch_b/backend/main.py
poetry run python -m sketch_b.backend.main
poetry run python sketch_b/backend/main.py
poetry run python -m sketch_b.backend.main
poetry run python -m sketch_b.backend.some_program
poetry run echo "stdin" | python -m sketch_b.backend.some_program
echo $?
poetry run echo "stdin" | python -m sketch_b.backend.some_program arg1 -arg2 --arg3 arg4=value4 --arg5=value5
./backend/some_program.sh a b c d e
```
