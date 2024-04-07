# Sketch sketch-b

Call external program in own process (synchronously)

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

### Additional Comments

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

In Python, you can use the `subprocess` module to create new processes, connect to their input/output/error pipes, and obtain their return codes. To call a subprocess while feeding it with `stdin`, and then gathering `stdout`, `stderr`, and the exit code, you can use `subprocess.run()` in Python 3.5 and later. This function is recommended for high-level subprocess management as it encapsulates process creation and management quite efficiently.

Here’s a basic example:

```python
import subprocess

# Define your command and input data
command = ['your_command', 'arg1', 'arg2']
input_data = b"your input data here"

# Run the subprocess
result = subprocess.run(command, input=input_data, text=True, capture_output=True)

# Access the stdout, stderr, and exit code
stdout = result.stdout
stderr = result.stderr
exit_code = result.returncode

print(f"STDOUT: {stdout}")
print(f"STDERR: {stderr}")
print(f"Exit Code: {exit_code}")

```

- command should be a list where the first element is the command itself and the subsequent elements are any arguments to the command.
- input_data is the data you want to feed to the subprocess's stdin. In the example, it's a byte string (b""), which is necessary because the default mode for stdin/stdout/stderr is binary. If you’re using text instead, make sure to set text=True as in the example, which allows you to work with strings directly.
- Setting capture_output=True tells subprocess.run() to capture stdout and stderr from the subprocess. This is convenient for processing or logging the output.
- text=True treats input and output as text (decoded strings), not bytes, which is often what you want. If your input data is binary, or you're working with a process that outputs binary data, you might need to omit this or set it to False.
- The returncode attribute of the result contains the exit code of the process. A return code of 0 usually indicates that the process finished successfully, while any other value indicates an error.

Adjust `your_command`, `arg1`, `arg2`, and `your input data here` as per your requirements. This approach is robust for running subprocesses and handling their input and output in a Pythonic way.

The `b` prefix before a string literal in Python indicates that the string is a byte string. In Python, strings are sequences of Unicode characters, making them suitable for storing text. However, when working with binary data, files, or certain low-level system or network interfaces, it's often necessary to work with bytes rather than text.

A byte string is a sequence of bytes, which are 8-bit values, and is denoted by the `bytes` type in Python. Unlike regular strings (`str` type), which are used for text and can contain Unicode characters, byte strings are used for binary data, including encoded text. Here’s how they differ:

Regular String (str):

- Represented without the b prefix.
- Used to handle text data.
- Consists of Unicode characters.
- Example: hello = "Hello, world!"

Byte String (bytes):

- Represented with the b prefix.
- Used to handle binary data, including encoded text.
- Consists of bytes (values between 0 and 255).
- Example: hello_bytes = b"Hello, world!"

Here's a quick demonstration of using a byte string:

```python
# Byte string literal
data = b"This is a byte string."

# Regular string literal
text = "This is a regular string."

# Printing types to see the difference
print(type(data))  # Output: <class 'bytes'>
print(type(text))  # Output: <class 'str'>

```

When you’re working with functions or libraries that expect binary data (such as certain file operations, network communications, or subprocess inputs/outputs when dealing with non-text data), you’ll use byte strings. For text data, you would encode or decode byte strings to/from regular strings using specific character encodings (e.g., UTF-8).

For example, to encode a regular string to bytes:

```python
text = "Hello, world!"
encoded_text = text.encode('utf-8')  # Encode the string to bytes using UTF-8

```

And to decode bytes to a regular string:

```python
decoded_text = encoded_text.decode('utf-8')  # Decode the bytes back to a string

```

Understanding when and how to use byte strings is crucial for working with files, networking, and other binary data in Python.

