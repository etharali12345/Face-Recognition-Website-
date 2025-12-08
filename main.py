from flask import Flask,render_template, url_for, flash, redirect,request
from forms import LoginForm,RegistratiionForm
#from flask_login import login_user,current_user,logout_user,login_required
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'a9f823jkf93n2f0sdfn2398h23hfsd923hsdf923'

@app.route('/')
def homePage():
    return render_template("home.html",title="'home Page")


@app.route('/sign_up', methods=['GET', 'POST'])
def signUp():
   # if current_user.is_authenticated:
        # return redirect(url_for('home'))
    form = RegistratiionForm()
    return render_template('sign_up.html', title="إنشاء الحساب", form=form)
    #if form.validate_on_submit():
     #   hashed_password= bcrypt.generate_password_hash(form.password.data).decode('utf-8')
      #  user = Users(username = form.username.data, email= form.email.data , password= hashed_password)
       # db.session.add(user)
        #db.session.commit()
       # flash(f' Hi {form.username.data} your account has been Created !', 'success')
        #return redirect(url_for('login'))
    

@app.route('/login', methods=['GET', 'POST'])
def login():
    #if current_user.is_authenticated:
     #    return redirect(url_for('homePage'))
   form = LoginForm()
   return render_template('login.html', title="تسجيل الدخول", form=form)
   ## if form.validate_on_submit():
     ##   user = Users.query.filter_by(email= form.email.data).first()
       ## if user and bcrypt.check_password_hash(user.password,form.password.data):
         ##   login_user(user, remember=form.remember.data)
           ## next_page = request.args.get('next')
            #flash( 'you Logedin !', 'success')
            #return redirect(next_page) if next_page else  redirect(url_for('home'))
        #else:
          #      flash( 'Unsuccessful Login Please Cheeck Your Password And email!', 'danger')
    



if __name__ == "__main__":
    app.run(debug=True)
