from routes.auth_routes import auth_bp
from routes.service_routes import service_bp
from routes.application_routes import application_bp
from routes.integration_routes import integration_bp
from routes.admin_routes import admin_bp
from routes.notification_routes import notification_bp

__all__ = [
    'auth_bp',
    'service_bp',
    'application_bp',
    'integration_bp',
    'admin_bp',
    'notification_bp'
]
