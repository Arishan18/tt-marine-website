import os
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Add this before your route definitions
@app.context_processor
def inject_now():
    return {'now': datetime.now()}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/services/dredging')
def dredging():
    return render_template('services/dredging.html')

@app.route('/services/excavators')
def excavators():
    return render_template('services/excavators.html')

@app.route('/services/vibrocoring')
def vibrocoring():
    return render_template('services/vibrocoring.html')

@app.route('/services/hydrographic-surveys')
def hydrographic_surveys():
    return render_template('services/hydrographic_surveys.html')

@app.route('/generator-hire')
def generator_hire():
    return render_template('generator_hire.html')

@app.route('/equipment')
def equipment():
    return render_template('equipment.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/projects/<project_name>')
def project_detail(project_name):
    # Convert hyphenated URL to project title format
    project_title = project_name.replace('-', ' ').title()
    return render_template('project_detail.html', project_name=project_name, project_title=project_title)

@app.route('/equipment-sales')
def equipment_sales():
    return render_template('equipment_sales.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # In a real application, process the form data here
        # For now, just redirect back to the contact page with a success parameter
        return redirect(url_for('contact', success=True))
    
    success = request.args.get('success', False)
    return render_template('contact.html', success=success)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))