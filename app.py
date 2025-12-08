from flask import Flask, render_template, request, jsonify, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html') 

#login
#POST => 1- emailOrPhone 2-password
@app.route('/login', methods=["POST", "GET"])
def login_fun():
    global login
    if request.method == "POST":
        username = request.form.get("emailOrPhone")
        password = request.form.get("password")
        if username == "0123456789" and password == "123":
            #JSON
            data = {
                "valid": True, 
                "user": {
                    "role": "user"
                },
                "redirect": url_for('index')
            }
            return jsonify(data)
        else:
            #JSON 
            data = {
                'valid': False
            }
            return jsonify(data)
    else:
        return render_template('login.html')


#POST => 1-fname 2-lname 3-emailOrPhone 4-password
@app.route('/sign_up', methods=["POST", "GET"])
def sign_up():
    if request.method == "POST":
        username = "000"
        if username == "0123456789":
            #JSON
            data = {
                "valid": True, 
                "user": {
                    "role": "user"
                },
                "redirect": url_for('index')
            }
            return jsonify(data)
        else:
            #JSON
            data = {
                'valid': False,
                'message': 'هذا المستخدم موجود مسبقا'
            }
            return jsonify(data)
    else:
        return render_template('sign_up.html')
    

#3rd upload missing 
#POST => 1-image 2-name 3-age 4-gender 5-lastSeenDate 6-lastSeenLocation 7-phoneNum1 8-phoneNum2 
@app.route('/upload_missing', methods=["POST", "GET"])
def upload_missing():
    if request.method == "POST":
        image = request.files.get("image")
        phone = request.form.get("phoneNum1")
        if image:
            image.save("static/uploads/" + image.filename)
            if phone == '0123456789':
                #JSON
                data = {
                    'valid': True,
                    'match': True,
                    'match_id': 243254354,
                }
                return jsonify(data)
            else:
                #JSON
                data = {
                    'valid': True,
                    'match': False
                }
                return jsonify(data)
        else:
            #JSON
            data = {
                'valid': False,
                'message': 'يةجد العديد من الاضخاث في الصورة'
            }
            return jsonify(data)
    else:
        return render_template('upload_missing.html')

@app.route('/my_uploads')
def my_uploades():
    return render_template('missing_list.html')

@app.route('/api/user_uploads')
def user_upload():
    #JSON
    uploads = [
        {
            "id": 12,
            "name": "احمد محمد احمد",
            "image_url": "static/uploads/hostage2.jpg",
            "match": True,
            "match_id": 3435435,
            "match_percentage": 89
        },
        {
            "id": 21,
            "name": "خالد مزمل محمد",
            "image_url": "static/uploads/facetest.jpg",
            "match": False
        },
        
    ]
    return jsonify(uploads)

#match_id in the URL
@app.route('/api/get_match/<int:match_id>')
def get_missing_match(match_id):
    match = {
        'image_url': 'static/uploads/hostage1.jpg',
        'percent': 70,
        'name': "احمد محمد احمد",
        'age': 35,
        'sex': "ذكر",
        'condition': "سليم",
        'dateOfFounding': "2025/12/12",   
        'findingEntity': "منظمة الهلال الاحمر فرع الشمالية",
        'location': "الشمالية - وادي حلفا",
        'contact': "002496564646",
        'contact2': "0024965465656"
    }

    return jsonify(match)


if __name__ == '__main__':
    app.run(debug=True)