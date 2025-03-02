from flask import Flask, render_template, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import datetime
import os

from config import Config
from database import db
from routes import candidates_bp, jobs_bp

def create_app(config_class=Config):
    app = Flask(__name__, template_folder='templates')
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    migrate = Migrate(app, db)  # Add Flask-Migrate

    # Register blueprints
    app.register_blueprint(candidates_bp)
    app.register_blueprint(jobs_bp)
    
    # Create database tables only if running in development
    with app.app_context():
        if app.config['ENV'] == 'development':
            db.create_all()
    
    # Default route
    @app.route('/')
    def index():
        return jsonify({
            'name': 'HR Management Hiring Tool API',
            'version': '1.0.0',
            'timestamp': datetime.now().isoformat()
        })
    
    # Handle 404 errors
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Resource not found'}), 404
    
    # Handle 500 errors
    @app.errorhandler(500)
    def server_error(e):
        return jsonify({'error': 'Server error'}), 500
    
    # Pass the current date to templates
    @app.context_processor
    def inject_now():
        return {'now': datetime.utcnow()}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
