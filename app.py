# from flask import Flask, render_template

# app = Flask(__name__)

# @app.route('/')
# def home():
#     return render_template('index.html')

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, render_template, url_for, send_from_directory
from flask_bootstrap import Bootstrap
import cv2
import base64

app = Flask(__name__)
bootstrap = Bootstrap(app)


# from flask import Flask, render_template
# app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/sketch_g_03')
def sketch1():
    return render_template('sketch_g_03.html')

@app.route('/sketch_g_02')
def sketch2():
    return render_template('sketch_g_02.html')

@app.route('/sketch_i_01')
def sketch3():
    return render_template('sketch_i_01.html')

@app.route('/sketch_b_01')
def sketch4():
    return render_template('sketch_b_01.html')

@app.route('/sketch5')
def sketch5():
    return render_template('sketch5.html')

@app.route('/sketch_b_02')
def sketch6():
    return render_template('sketch_b_02.html')

@app.route('/sketch_g_01')
def sketch7():
    return render_template('sketch_g_01.html')

@app.route('/sketch_i_02')
def sketch8():
    return render_template('sketch_i_02.html')

@app.route('/sketch_i_03')
def sketch9():
    return render_template('sketch_i_03.html')

@app.route('/sketch10')
def sketch10():
    return render_template('sketch10.html')

@app.route('/sketch_b_03')
def sketch11():
    return render_template('sketch_b_03.html')

if __name__ == '__main__':
    app.run(debug=True)

