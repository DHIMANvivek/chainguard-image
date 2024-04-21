# Uploading or Publishing Image to Docker and AWS EMR

This guide outlines the steps to upload or publish an image to Docker and AWS EMR.

## Upload to Docker and AWS EMR

```bash
# Step 1: Build the Docker Image
docker build -t NAME_1 .

# Step 2: Run the Docker Image
docker run -p PORT NAME_1 .

# Step 3: Tag the Image
docker tag local-image:tagname username/repository:tagname

# Step 4: Log in to Docker
docker login

# Step 5: Push the Image to Docker Hub
docker push username/repository:tagname
