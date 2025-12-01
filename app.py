# app.py
from flask import Flask, render_template, request, jsonify, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html') 

@app.route('/login', methods=["POST", "GET"])
def login_fun():
    if request.method == "POST":
        username = request.form.get("emailOrPhone")
        password = request.form.get("password")
        if username == "0123456789" and password == "123":
            return jsonify({"valid": True, "redirect": url_for('index')})
        else:
            return jsonify({"valid": False})
    else:
        return render_template('login.html')

@app.route('/sign_up', methods=["POST", "GET"])
def sign_up():
    if request.method == "POST":
        username = "000"
        if username == "0123456789":
            return jsonify({"valid": True, "redirect": url_for('index')})
        else:
            return jsonify({"valid": False, "message": "هذا المستخدم موجود مسبقا"})
    else:
        return render_template('sign_up.html')

@app.route('/upload_missing', methods=["POST", "GET"])
def upload_missing():
    if request.method == "POST":
        image = request.files.get("image")
        if image:
            image.save("static/uploads/" + image.filename)
            return jsonify({'match': True})
        else:
            return jsonify({'match': False})
    else:
        return render_template('upload_user.html')

@app.route('/my_uploads')
def my_uploades():
    return render_template('my_uploads_user.html')

@app.route('/api/user_uploads')
def user_upload():
    uploads = [
        {
            "person_id": 12,
            "name": "احمد محمد احمد",
            "image_url": "static/uploads/hostage1.jpg",
            "match": False,
            "match_percentage": 89
        },
        {
            "person_id": 21,
            "name": "خالد مزمل محمد",
            "image_url": "static/uploads/hostage2.jpg",
            "match": True
        }
    ]
    return jsonify(uploads)

if __name__ == '__main__':
    app.run(debug=True)