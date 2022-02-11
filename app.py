import flask
from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/', methods = ["POST", "GET"])
@app.route('/intro', methods = ["POST", "GET"])
def introUI():
    if request.method == 'POST':
        #If the customer button is pressed, go to that page.
        if request.form.get('action1') == 'Customer':
            return flask.redirect('/customer')
        #If the waiter button is pressed, go to that page.
        elif request.form.get('action2') == 'Waiter':
            return flask.redirect('/waiter')
        #If the kitchen_staff button is pressed, go to that page.
        elif request.form.get('action3') == 'Kitchen Staff':
            return flask.redirect('/kitchen_staff')
        else:
            pass
    return render_template("index.html")
    #index.html contains the html for the Intro UI.

@app.route('/customer')
def customerUI():
    return render_template("burgers.html")

@app.route('/waiter')
def waiterUI():
    return '<h1>waiter</h1>'

@app.route('/kitchen_staff')
def kitchenStaffUI():
    return '<h1>kitchen staff</h1>'

@app.route('/burgers')
def burgerMenu():
    return render_template("burgers.html")

@app.route('/chicken')
def chickenMenu():
    return render_template("chicken.html")

@app.route('/meals')
def mealsMenu():
    return render_template("meals.html")

@app.route('/drinks')
def drinksMenu():
    return render_template("drinks.html")

@app.route('/kebab')
def kebabMenu():
    return render_template("kebab.html")

if __name__ == '__main__':
    app.run(debug=True)
