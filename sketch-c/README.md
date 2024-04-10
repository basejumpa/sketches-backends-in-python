# Sketch sketch-c

Trigger external program as own process asynchronously (but do not capture anything from it).

## Run

In the Terminal, do

``` bash
cd sketch-c
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

o capture `stdout` and `stderr` from a subprocess in Python, you can use the `subprocess.Popen` class with the `stdout` and `stderr` parameters set to `subprocess.PIPE`. This configuration allows you to capture the standard output and standard error streams of the subprocess.

Here’s how to execute a subprocess, capture its `stdout` and `stderr`, and then read those outputs:

```python
import subprocess

# Define your command and arguments
command = ["your_command", "arg1", "arg2"]

# Start the subprocess with stdout and stderr redirected
process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Wait for the subprocess to finish and capture stdout and stderr
stdout_data, stderr_data = process.communicate()

# Decode the byte strings to get regular strings, if necessary
stdout_data = stdout_data.decode('utf-8')
stderr_data = stderr_data.decode('utf-8')

# Use the captured output
print("STDOUT:")
print(stdout_data)
print("STDERR:")
print(stderr_data)

# Optionally, get the exit code of the subprocess
exit_code = process.returncode
print(f"Exit Code: {exit_code}")

```

Key Points:

- stdout=subprocess.PIPE and stderr=subprocess.PIPE tell Popen to capture the output streams.
- process.communicate() waits for the subprocess to finish and returns a tuple (stdout_data, stderr_data). It's the recommended way to capture output and errors, especially when you need to capture both simultaneously to avoid deadlocks.
- The output data (stdout_data and stderr_data) are bytes objects. If you're working with text output, you'll likely want to decode these bytes to strings using .decode('utf-8') or another appropriate encoding.
- process.returncode contains the exit code of the subprocess after it has finished. A return code of 0 usually indicates success, while any non-zero value indicates an error.

Make sure to replace `"your_command"`, `"arg1"`, and `"arg2"` with the actual command and arguments you wish to execute. This approach is quite flexible and allows for robust handling of subprocesses in Python scripts.

