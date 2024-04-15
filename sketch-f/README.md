# Sketch sketch-f

Using gRPC: Receive text message and respond with text message.

## Run

In the Terminal, do

``` bash
cd sketch-f
poetry update
```

and then start the **backend** by doing

```bash
poetry run python -m backend
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

```bash
@basejumpa ➜ /workspaces/experiments-backends-in-python/sketch-f $
poetry run python3 -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. protocols/*.proto


 ```


