# Sketch sketch-c

Trigger external program asynchronously (but do not capture anything from it)

## Establish prerequisites

```bash
pip install pipx
pipx ensurepath
pipx install poetry
```

## Run

In the Terminal, do

``` bash
cd sketch_c
poetry update
```

and then

```bash
poetry run uvicorn sketch_c.backend.main:app --reload
```

## Investigate

### Experience the Functionality

- Open http://127.0.0.1:8000 in browser. You see to_be_continued

### Work through the Implementation

### References

### Additional Observations

### By-catches

### Additional Comments

To run a subprocess in Python without waiting for it to complete, you can use the `subprocess.Popen` class from the `subprocess` module. Unlike `subprocess.run()`, which waits for the command to complete and then returns a `CompletedProcess` instance, `subprocess.Popen` starts the subprocess and immediately returns a `Popen` object, allowing your program to continue running concurrently with the subprocess.

Here’s an example of how to use `subprocess.Popen`:

```python
import subprocess

# Define the command as a list of program arguments
command = ['your_command', 'arg1', 'arg2']

# Start the subprocess without waiting for it to finish
process = subprocess.Popen(command)

# Your Python program can continue doing other things here
print("Subprocess started. Python program continues without waiting.")
# Optionally, you can wait for the subprocess to complete later
# process.wait()

# Or check if the process has ended and get the exit code
# if process.poll() is not None:
#     print(f"Subprocess finished with exit code {process.returncode}")

```

In this example:

- subprocess.Popen(command) starts the specified command as a subprocess. Replace 'your_command', 'arg1', and 'arg2' with your actual command and its arguments.
- The Python script continues to execute subsequent lines immediately after the subprocess is started, without waiting for it to finish.
- You can uncomment process.wait() if you have a point later in your script where you need to wait for the subprocess to complete before proceeding.
- process.poll() checks if the subprocess has terminated. If it has, poll() returns the exit code of the process; otherwise, it returns None.

This approach is useful when you need to run a subprocess in the background or when your script needs to perform other tasks without being blocked by the subprocess's execution.


You can provide input to a subprocess started with `subprocess.Popen` in Python by setting the `stdin` parameter. You have several options depending on how you want to provide the input:

1. Direct input through the subprocess.PIPE mechanism: This allows you to write to the subprocess's stdin directly from your Python script.
2. Redirecting from a file: You can use a file's descriptor with the stdin parameter to direct the contents of a file to the subprocess's input.

Direct Input through subprocess.PIPE

Here's how you can provide input directly to the subprocess:

```python
import subprocess

# Define the command as a list of program arguments
command = ['your_command', 'arg1', 'arg2']

# Start the subprocess with stdin=subprocess.PIPE to enable input
process = subprocess.Popen(command, stdin=subprocess.PIPE)

# Write your input data to the subprocess and close stdin
input_data = b"your input data"
process.stdin.write(input_data)
process.stdin.close()

# Continue with your program
# Optionally, wait for the subprocess to complete or handle its output
```

In this example, `input_data` is a byte string (`b"your input data"`), as the data written to `stdin` should be in bytes. If you have a string, you can encode it to bytes using `your_string.encode('utf-8')`.

Redirecting Input from a File

If you want to provide input from a file, you can do so by passing a file object to `Popen`. Here’s an example:

```python
import subprocess

# Open the file with input data
with open('input_file.txt', 'rb') as input_file:
    # Define your command
    command = ['your_command', 'arg1', 'arg2']

    # Start the subprocess with stdin redirected from the file
    process = subprocess.Popen(command, stdin=input_file)

    # Wait for the subprocess to finish if necessary
    process.wait()

```

In this case, the subprocess reads its input directly from `input_file.txt`. The file is opened in binary mode (`'rb'`) because subprocesses expect byte streams for their inputs.

Both methods allow you to provide `stdin` input to a subprocess, offering flexibility depending on your specific requirements, whether it's programmatically sending data directly or redirecting input from a file.
