# First Stage: Builder
FROM cgr.dev/chainguard/python:latest-dev as builder

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install -r requirements.txt --user

# Second Stage: Runtime
FROM cgr.dev/chainguard/python:latest

# Set the working directory
WORKDIR /app

EXPOSE 5001

# Copy installed dependencies from the builder stage
COPY --from=builder /home/nonroot/.local/lib/python3.12/site-packages /home/nonroot/.local/lib/python3.12/site-packages

# Copy the main Python file
COPY app.py .

# Specify the entry point
ENTRYPOINT ["python", "app.py"]
