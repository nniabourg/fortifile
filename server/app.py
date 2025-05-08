from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)



@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()

    filename = data.get('filename')
    encrypted_data = data.get('data')

    if not filename or not encrypted_data:
        return jsonify({'error': 'Missing filename or data'}), 400

    # Save encrypted data as .enc file
    save_path = os.path.join(UPLOAD_FOLDER, f"{filename}.enc")

    try:
        with open(save_path, 'w') as f:
            f.write(encrypted_data)

        return jsonify({'message': 'File encrypted and stored successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))


from flask import send_file

@app.route('/download/<filename>', methods=['GET'])
def download(filename):
    try:
        path = os.path.join(UPLOAD_FOLDER, f"{filename}.enc")
        return send_file(path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 404
