from flask import Flask, request, redirect, url_for, render_template
from flask_cors import CORS
import os

app = Flask(__name__, template_folder='templates')
CORS(app, resources={r"/upload": {"origins": "*"}})  # Allow CORS for the /upload endpoint

# Use a directory that is writable by the application
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            return redirect(request.url)
        if file:
            if not os.path.exists(app.config['UPLOAD_FOLDER']):
                os.makedirs(app.config['UPLOAD_FOLDER'])
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
            # You can render a template with a success message
            return render_template('success.html', filename=file.filename)
    return render_template('upload.html')

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)
