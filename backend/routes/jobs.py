from flask import Blueprint, request, jsonify
from models import JobPosition, db
from marshmallow import Schema, fields

jobs_bp = Blueprint('jobs', __name__, url_prefix='/api/jobs')

class JobPositionSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    department = fields.Str(required=True)
    location = fields.Str(required=True)
    description = fields.Str()
    requirements = fields.Str()
    is_active = fields.Bool()
    created_at = fields.DateTime(dump_only=True)
    
    # Include candidate count in the response
    candidate_count = fields.Method("get_candidate_count")
    
    def get_candidate_count(self, job):
        return len(job.candidates)

@jobs_bp.route('', methods=['GET'])
def get_jobs():
    is_active = request.args.get('is_active', 'true').lower() == 'true'
    
    query = JobPosition.query
    if is_active:
        query = query.filter_by(is_active=True)
    
    jobs = query.all()
    schema = JobPositionSchema(many=True)
    return jsonify(schema.dump(jobs))

@jobs_bp.route('/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = JobPosition.query.get_or_404(job_id)
    schema = JobPositionSchema()
    return jsonify(schema.dump(job))

@jobs_bp.route('', methods=['POST'])
def create_job():
    data = request.get_json()
    schema = JobPositionSchema()
    job_data = schema.load(data)
    
    new_job = JobPosition(
        title=job_data['title'],
        department=job_data['department'],
        location=job_data['location'],
        description=job_data.get('description', ''),
        requirements=job_data.get('requirements', ''),
        is_active=job_data.get('is_active', True)
    )
    
    db.session.add(new_job)
    db.session.commit()
    
    return jsonify(schema.dump(new_job)), 201

@jobs_bp.route('/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    job = JobPosition.query.get_or_404(job_id)
    data = request.get_json()
    
    job.title = data.get('title', job.title)
    job.department = data.get('department', job.department)
    job.location = data.get('location', job.location)
    job.description = data.get('description', job.description)
    job.requirements = data.get('requirements', job.requirements)
    job.is_active = data.get('is_active', job.is_active)
    
    db.session.commit()
    
    schema = JobPositionSchema()
    return jsonify(schema.dump(job))