from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from database import db
from routes import (
    auth_bp,
    service_bp,
    application_bp,
    integration_bp,
    admin_bp,
    notification_bp
)
from api.mock_external_apis import mock_external_bp
from seed_data import seed_database
import os

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for frontend Vite app
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize Database
db.init_app(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(service_bp, url_prefix='/api/services')
app.register_blueprint(application_bp, url_prefix='/api/applications')
app.register_blueprint(integration_bp, url_prefix='/api/integrations')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(notification_bp, url_prefix='/api/notifications')
app.register_blueprint(mock_external_bp, url_prefix='/api/external')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'system': 'Unified Government Citizen Service Portal API',
        'version': '1.0.0',
        'interoperability_layer': 'Active'
    })

# Initialize DB on first run
with app.app_context():
    db_file = os.path.join(Config.BASE_DIR, 'portal.db')
    if not os.path.exists(db_file):
        print("Database not found. Creating and seeding DB...")
        seed_database()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
